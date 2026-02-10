import { NextRequest, NextResponse } from 'next/server'

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'

function normalizeUrl(input: string) {
  try {
    const url = new URL(input)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    return url
  } catch {
    return null
  }
}

function extractTitle(html: string) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return match?.[1]?.trim()
}

function parseAttributes(tag: string) {
  const attrs: Record<string, string> = {}
  const regex = /([^\s=]+)=(?:"([^"]*)"|'([^']*)')/g
  let match: RegExpExecArray | null
  while ((match = regex.exec(tag))) {
    const key = match[1].toLowerCase()
    attrs[key] = (match[2] ?? match[3] ?? '').trim()
  }
  return attrs
}

function extractMeta(html: string, key: string) {
  const metaTags = html.match(/<meta[^>]*>/gi) ?? []
  for (const tag of metaTags) {
    const attrs = parseAttributes(tag)
    if (attrs.property?.toLowerCase() === key.toLowerCase()) return attrs.content
    if (attrs.name?.toLowerCase() === key.toLowerCase()) return attrs.content
  }
  return undefined
}

function extractIcon(html: string) {
  const linkTags = html.match(/<link[^>]*>/gi) ?? []
  for (const tag of linkTags) {
    const attrs = parseAttributes(tag)
    const rel = attrs.rel?.toLowerCase()
    if (!rel) continue
    if (rel.includes('icon') && attrs.href) return attrs.href
  }
  return undefined
}

export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get('url')
  if (!urlParam) {
    return NextResponse.json({ error: 'MISSING_URL' }, { status: 400 })
  }

  const normalized = normalizeUrl(urlParam)
  if (!normalized) {
    return NextResponse.json({ error: 'INVALID_URL' }, { status: 400 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 6000)

  try {
    const response = await fetch(normalized.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'ko,en;q=0.8',
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'FETCH_FAILED' }, { status: 502 })
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html')) {
      return NextResponse.json(
        { url: normalized.toString() },
        { headers: { 'Cache-Control': 'public, max-age=3600' } }
      )
    }

    const html = (await response.text()).slice(0, 200_000)

    const ogTitle = extractMeta(html, 'og:title')
    const ogDescription = extractMeta(html, 'og:description')
    const ogImage = extractMeta(html, 'og:image')
    const ogSiteName = extractMeta(html, 'og:site_name')
    const metaDescription = extractMeta(html, 'description')
    const title = ogTitle || extractTitle(html)

    let icon = extractIcon(html)
    if (icon) {
      try {
        icon = new URL(icon, normalized).toString()
      } catch {
        icon = undefined
      }
    }

    let image = ogImage
    if (image) {
      try {
        image = new URL(image, normalized).toString()
      } catch {
        image = undefined
      }
    }

    return NextResponse.json(
      {
        url: normalized.toString(),
        title,
        description: ogDescription || metaDescription,
        image,
        siteName: ogSiteName,
        favicon: icon,
      },
      { headers: { 'Cache-Control': 'public, max-age=3600' } }
    )
  } catch {
    return NextResponse.json({ error: 'FETCH_ERROR' }, { status: 500 })
  } finally {
    clearTimeout(timeout)
  }
}

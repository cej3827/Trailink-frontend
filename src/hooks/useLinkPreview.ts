'use client'

//링크 미리보기 데이터 가져오기

import { useQuery } from '@tanstack/react-query'

export interface LinkPreviewData {
  url: string
  title?: string
  description?: string
  image?: string
  siteName?: string
  favicon?: string
}

async function fetchLinkPreview(url: string): Promise<LinkPreviewData> {
  const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`)
  if (!response.ok) {
    throw new Error('LINK_PREVIEW_FAILED')
  }
  return response.json()
}

export function useLinkPreview(url?: string, enabled = true) {
  return useQuery({
    queryKey: ['link-preview', url],
    queryFn: () => fetchLinkPreview(url as string),
    enabled: enabled && !!url,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

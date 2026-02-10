import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          background: 'white',
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800 }}>Trailink</div>
        <div style={{ marginTop: 18, fontSize: 36, fontWeight: 600 }}>
          정리하고 · 공유하고 · 탐색하세요
        </div>
        <div style={{ marginTop: 18, fontSize: 22, color: '#444' }}>
          북마크를 “사용 가능한 지식”으로 바꾸는 서비스
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

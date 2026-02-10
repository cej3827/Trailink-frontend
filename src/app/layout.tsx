import '@/styles/globals.scss';
import { ReactQueryProvider } from './reactQueryProvider';
import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Trailink - 정리하고 · 공유하고 · 탐색하세요',
  description: '쌓아둔 링크를 카테고리로 정리하고, 친구와 공유하고, 필요한 링크를 더 빨리 찾으세요.',
  openGraph: {
    title: 'Trailink',
    description: '정리하고 · 공유하고 · 탐색하세요',
    type: 'website',
  },
}

export default function RootLayout({ children } : { children: React.ReactNode; }) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster 
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}

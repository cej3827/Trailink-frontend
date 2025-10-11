import '@/styles/globals.scss';
import { ReactQueryProvider } from './reactQueryProvider';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'trailink',
  description: '북마크 관리 서비스',
}

export default function RootLayout({ children } : { children: React.ReactNode; }) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster 
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}

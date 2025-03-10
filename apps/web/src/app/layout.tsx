import { Metadata } from 'next';
import { NextTamaguiProvider } from './NextTamaguiProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Healthcare App',
  description: 'Your healthcare application',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  );
}

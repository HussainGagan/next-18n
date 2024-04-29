import React from 'react';
import ChangeLocale from '../components/ChangeLocale';
import {LocaleProvider} from '../hooks/locale-provider';
import {getLocale} from '../i18n/server';
import '../styles/tailwind.css';
import Link from 'next/link';

export const metadata = {
  title: 'Next.js i18n',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const locale = getLocale();
  return (
    <html lang={locale}>
      <body className="p-3">
        <div className="flex gap-2">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
        <LocaleProvider value={locale}>
          <ChangeLocale />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}

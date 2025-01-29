import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeRegistry } from '@/components/ThemeRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VaultVerify - NFT Portfolio Health & Fraud Shield',
  description: 'Analyze your NFT portfolio health, detect fraud, and get real-time alerts for your digital assets.',
  keywords: ['NFT', 'blockchain', 'crypto', 'portfolio', 'fraud detection', 'digital assets'],
  authors: [{ name: 'VaultVerify Team' }],
  openGraph: {
    title: 'VaultVerify - NFT Portfolio Health & Fraud Shield',
    description: 'Secure and analyze your NFT portfolio with real-time fraud detection',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}
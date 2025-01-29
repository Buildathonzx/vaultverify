import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-16">
          <nav className="flex-1 bg-white border-r">
            <div className="px-4 py-5 space-y-1">
              <a href="/dashboard" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 bg-gray-100">
                Dashboard
              </a>
              <a href="/portfolio" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                Portfolio
              </a>
              <a href="/alerts" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                Alerts
              </a>
              <a href="/verify" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                Verify NFT
              </a>
            </div>
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 md:ml-64">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
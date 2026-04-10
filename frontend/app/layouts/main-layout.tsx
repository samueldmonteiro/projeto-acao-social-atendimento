import { Outlet } from 'react-router';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function MainLayout() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30">
      {/* Background blobs for premium feel */}
      <div className="fixed top-0 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 -right-4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        
        <main className="grow">
          {/* We can wrap the Outlet with a container if we want a default max-width */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

import '~/global.css';

import { AppSidebar } from '@/components/app-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import ReactQueryProvider from '@/providers/query-provider';
import { SocketProvider } from '@/providers/socket-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arm Stabilizer | Dashboard',
  description: 'Arm Stabilizer Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <SocketProvider>
              <SidebarProvider>
                <AppSidebar />
                <main className="flex flex-col w-full py-8 px-4 md:px-8">
                  <div className="flex items-center gap-2 mb-2">
                    <SidebarTrigger />
                    <ThemeToggle />
                  </div>
                  {children}
                </main>
              </SidebarProvider>
            </SocketProvider>
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

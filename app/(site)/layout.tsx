import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import { SiteProvider } from "@/components/SiteProvider";
import Topbar from "@/components/Topbar";
import { getAbout, getSite } from "@/lib/content";

/**
 * Public pages refresh their content from Supabase at most every 5 minutes on their own;
 * saving in the admin panel refreshes them straight away (see app/api/revalidate).
 */
export const revalidate = 300;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [site, about] = await Promise.all([getSite(), getAbout()]);

  return (
    <SiteProvider value={{ site, about }}>
      <Preloader />
      <Topbar />
      <Header />
      <main>
        <article>{children}</article>
      </main>
      <Footer />
      <FloatingActions />
    </SiteProvider>
  );
}

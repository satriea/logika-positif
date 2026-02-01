import { useEffect } from "react"; // Tambahkan useEffect
import { Helmet } from "react-helmet-async";
import useSectionTitle from "./hooks/useSectionTitle";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import BookGallery from "./components/BookGallery";
import Reviews from "./components/Reviews";
import Forum from "./components/Forum";
import Team from "./components/Team";
import Footer from "./components/Footer";
import AnimateSection from "./components/AnimateSection";

function App() {
  const { activeTitle, setManualTitle } = useSectionTitle();
  
  const baseUrl = "https://logika-positif.vercel.app";
  const siteName = "Logika Positif";
  const defaultDesc = "Ruang refleksi dan literasi karya Diaz Hardika untuk berpikir lebih jernih dan positif.";

  // --- LOGIKA PAKSA JUDUL BROWSER ---
  useEffect(() => {
    const fullTitle = activeTitle 
      ? `${activeTitle} | ${siteName}` 
      : `${siteName} — Refleksi & Literasi Positif`;
    
    // Perintah langsung ke browser
    document.title = fullTitle; 
  }, [activeTitle]); // Jalan setiap kali activeTitle berubah
  // ---------------------------------

  const getDynamicDescription = () => {
    switch (activeTitle) {
      case "Buku":
        return "Jelajahi koleksi buku dan karya literasi terbaik dari Diaz Hardika.";
      case "Forum":
        return "Mari berdiskusi dan berbagi pandangan positif di Forum Logika Positif.";
      case "Esai":
        return "Kumpulan refleksi dan esai mendalam untuk nalar yang lebih jernih.";
      default:
        return defaultDesc;
    }
  };

  return (
    <div className="font-sans antialiased text-slate-900 bg-white">
      <Helmet defer={false}>
        <title>{activeTitle ? `${activeTitle} | ${siteName}` : `${siteName} — Refleksi & Literasi Positif`}</title>
        <meta name="description" content={getDynamicDescription()} />
        <link rel="canonical" href={activeTitle ? `${baseUrl}/#${activeTitle.toLowerCase()}` : baseUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={activeTitle ? `${activeTitle} | ${siteName}` : siteName} />
        <meta property="og:description" content={getDynamicDescription()} />
        <meta property="og:url" content={activeTitle ? `${baseUrl}/#${activeTitle.toLowerCase()}` : baseUrl} />
        
        {/* Twitter */}
        <meta name="twitter:title" content={activeTitle ? `${activeTitle} | ${siteName}` : siteName} />
        <meta name="twitter:description" content={getDynamicDescription()} />
      </Helmet>

      <Navbar activeSection={activeTitle} onManualClick={setManualTitle} />

      <main id="home">
        <Hero />

        <AnimateSection id="about">
          <About />
        </AnimateSection>

        <AnimateSection id="books">
          <BookGallery />
        </AnimateSection>

        <AnimateSection id="reviews">
          <Reviews />
        </AnimateSection>

        <AnimateSection id="forum">
          <Forum />
        </AnimateSection>

        <AnimateSection id="team">
          <Team />
        </AnimateSection>
      </main>

      <Footer />
    </div>
  );
}

export default App;
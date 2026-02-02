import { useEffect } from "react";
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

  // --- 1. LOGIKA SCROLL DINAMIS (Intersection Observer) ---
  useEffect(() => {
    // Ambil semua section yang punya ID
    const sections = document.querySelectorAll("section[id], main[id]");
    
    const observerOptions = {
      root: null,
      // rootMargin: "Top Right Bottom Left"
      // Kita buat area deteksi di tengah layar agar perpindahan menu terasa pas
      rootMargin: "-30% 0px -60% 0px", 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Kita hanya update jika section tersebut masuk ke area pandang (intersecting)
        if (entry.isIntersecting) {
          const id = entry.target.id;
          
          const idToLabel = {
            home: "Beranda",
            about: "Tentang",
            books: "Buku",
            reviews: "Esai",
            forum: "Forum",
            team: "Tim",
          };
          
          if (idToLabel[id]) {
            setManualTitle(idToLabel[id]);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setManualTitle]);

  // --- 2. LOGIKA PAKSA JUDUL BROWSER ---
  useEffect(() => {
    const fullTitle = activeTitle 
      ? `${activeTitle} | ${siteName}` 
      : `${siteName} — Refleksi & Literasi Positif`;
    
    document.title = fullTitle; 
  }, [activeTitle]);

  const getDynamicDescription = () => {
    switch (activeTitle) {
      case "Buku": return "Jelajahi koleksi buku dan karya literasi terbaik dari Diaz Hardika.";
      case "Forum": return "Mari berdiskusi dan berbagi pandangan positif di Forum Logika Positif.";
      case "Esai": return "Kumpulan refleksi dan esai mendalam untuk nalar yang lebih jernih.";
      default: return defaultDesc;
    }
  };

  return (
    <div className="font-sans antialiased text-slate-900 bg-white">
      <Helmet defer={false}>
        <title>{activeTitle ? `${activeTitle} | ${siteName}` : `${siteName} — Refleksi & Literasi Positif`}</title>
        <meta name="description" content={getDynamicDescription()} />
        <link rel="canonical" href={activeTitle ? `${baseUrl}/#${activeTitle.toLowerCase()}` : baseUrl} />

        {/* Open Graph / FB */}
        <meta property="og:title" content={activeTitle ? `${activeTitle} | ${siteName}` : siteName} />
        <meta property="og:description" content={getDynamicDescription()} />
        <meta property="og:url" content={activeTitle ? `${baseUrl}/#${activeTitle.toLowerCase()}` : baseUrl} />
        
        {/* Twitter */}
        <meta name="twitter:title" content={activeTitle ? `${activeTitle} | ${siteName}` : siteName} />
        <meta name="twitter:description" content={getDynamicDescription()} />
      </Helmet>

      {/* Navbar sekarang menerima status activeTitle yang terupdate otomatis saat scroll */}
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
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Tambahkan ini
import { Helmet, HelmetProvider } from "react-helmet-async";
import useSectionTitle from "./hooks/useSectionTitle";

// Komponen Pendukung
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import BookGallery from "./components/BookGallery";
import Reviews from "./components/Reviews";
import Forum from "./components/Forum";
import Team from "./components/Team";
import Footer from "./components/Footer";
import AnimateSection from "./components/AnimateSection";
import AdminDashboard from './components/AdminDashboard';

// Komponen Bungkus untuk Halaman Utama agar rapi
const MainSite = ({ activeTitle, setManualTitle, siteName, baseUrl, getDynamicDescription }) => {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id], main[id]");
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px", 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const idToLabel = {
            home: "Beranda", about: "Tentang", books: "Buku",
            reviews: "Esai", forum: "Forum", team: "Tim",
          };
          if (idToLabel[id]) setManualTitle(idToLabel[id]);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setManualTitle]);

  return (
    <>
      <Navbar activeSection={activeTitle} onManualClick={setManualTitle} />
      <main id="home">
        <Hero />
        <AnimateSection id="about"><About /></AnimateSection>
        <AnimateSection id="books"><BookGallery /></AnimateSection>
        <AnimateSection id="reviews"><Reviews /></AnimateSection>
        <AnimateSection id="forum"><Forum /></AnimateSection>
        <AnimateSection id="team"><Team /></AnimateSection>
      </main>
      <Footer />
    </>
  );
};

function App() {
  const { activeTitle, setManualTitle } = useSectionTitle();
  const baseUrl = "https://logika-positif.vercel.app";
  const siteName = "Logika Positif";
  const defaultDesc = "Ruang refleksi dan literasi karya Diaz Hardika.";

  useEffect(() => {
    const fullTitle = activeTitle 
      ? `${activeTitle} | ${siteName}` 
      : `${siteName} — Refleksi & Literasi Positif`;
    document.title = fullTitle; 
  }, [activeTitle]);

  const getDynamicDescription = () => {
    switch (activeTitle) {
      case "Buku": return "Jelajahi koleksi buku Diaz Hardika.";
      case "Forum": return "Mari berdiskusi di Forum Logika Positif.";
      case "Esai": return "Kumpulan refleksi dan esai mendalam.";
      default: return defaultDesc;
    }
  };

  return (
    <HelmetProvider>
      <div className="font-sans antialiased text-slate-900 bg-white">
        <Helmet defer={false}>
          <title>{activeTitle ? `${activeTitle} | ${siteName}` : siteName}</title>
          <meta name="description" content={getDynamicDescription()} />
        </Helmet>

        {/* --- SISTEM ROUTING --- */}
        <Router>
          <Routes>
            {/* Halaman Landing Page */}
            <Route path="/" element={
              <MainSite 
                activeTitle={activeTitle} 
                setManualTitle={setManualTitle} 
                siteName={siteName}
                baseUrl={baseUrl}
                getDynamicDescription={getDynamicDescription}
              />
            } />

            {/* Halaman Admin Dashboard */}
            <Route path="/admin-logika-positif" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </div>
    </HelmetProvider>
  );
}

export default App;
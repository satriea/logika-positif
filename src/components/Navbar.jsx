import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ activeSection, onManualClick }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek untuk mendeteksi scroll agar navbar adaptif
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { label: "Beranda", id: "home", href: "#home" },
    { label: "Tentang", id: "about", href: "#about" },
    { label: "Buku", id: "books", href: "#books" },
    { label: "Esai", id: "reviews", href: "#reviews" },
    { label: "Forum", id: "forum", href: "#forum" },
    { label: "Tim", id: "team", href: "#team" },
  ];

  const handleClick = (id) => {
    setOpen(false);
    if (onManualClick) onManualClick(id);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-2xl py-3 border-b border-black/5" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        
        {/* LOGO - Minimalist Box Style */}
        <motion.a 
          href="#home" 
          onClick={() => handleClick("home")}
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-black text-[#F2A69A] w-10 h-10 flex items-center justify-center rounded-xl font-black text-xl transition-transform group-hover:rotate-12 shadow-lg shadow-black/10">
            L
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-black font-black text-lg tracking-tighter uppercase">Logika</span>
            <span className="text-black/40 font-bold text-[9px] uppercase tracking-[0.4em]">Positif</span>
          </div>
        </motion.a>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-10">
          {menu.map((item) => {
            // Normalisasi perbandingan agar active state akurat
            const isActive = activeSection?.toLowerCase() === item.label.toLowerCase();
            return (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => handleClick(item.id)}
                className={`relative text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
                  isActive ? "text-black" : "text-black/30 hover:text-black"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#F2A69A] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden lg:block">
          <motion.a
            href="#books"
            onClick={() => handleClick("books")}
            className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-xl shadow-black/10 inline-block border-2 border-black hover:bg-transparent hover:text-black transition-all"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Mulai Membaca
          </motion.a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={() => setOpen(!open)} 
          className="lg:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
        >
          <motion.div animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="w-6 h-0.5 bg-black rounded-full" />
          <motion.div animate={{ opacity: open ? 0 : 1 }} className="w-4 h-0.5 bg-black rounded-full ml-auto" />
          <motion.div animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="w-6 h-0.5 bg-black rounded-full" />
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
            <nav className="flex flex-col items-center gap-12 relative z-10">
              {menu.map((item, index) => (
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={item.label} 
                  href={item.href} 
                  onClick={() => handleClick(item.id)}
                  className={`text-3xl font-black uppercase tracking-[0.2em] ${
                    activeSection?.toLowerCase() === item.label.toLowerCase() ? "text-[#F2A69A]" : "text-black/20"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
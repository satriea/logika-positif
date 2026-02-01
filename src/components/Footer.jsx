import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white px-8 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#F2A69A] rounded-lg flex items-center justify-center font-black text-black">
                L
              </div>
              <h3 className="font-black text-xl uppercase tracking-tighter">
                Logika<span className="text-[#F2A69A]">Positif</span>
              </h3>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm font-medium">
              Ruang berbagi tulisan, ide, dan refleksi. Dibuat dengan dedikasi 
              penuh pada pengalaman membaca yang nyaman dan pemikiran yang jernih.
            </p>
          </div>

          {/* SUPPORT COLUMN */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F2A69A]">
              Support the Writer
            </h4>
            <div className="group">
              <p className="text-sm text-white/60 italic mb-4">
                "Dukung perjalanan literasi ini dengan secangkir kopi."
              </p>
              <a
                href="https://saweria.co/namakamu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest border-b-2 border-[#F2A69A] pb-1 hover:text-[#F2A69A] transition-colors"
              >
                Dukung di Saweria <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* NAVIGATION COLUMN (Quick Links) */}
          <div className="md:col-span-3 space-y-6 md:text-right">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F2A69A]">
              Sitemap
            </h4>
            <nav className="flex flex-col gap-3 text-sm font-bold text-white/40 uppercase tracking-widest">
              <a href="#about" className="hover:text-white transition-colors">Tentang</a>
              <a href="#books" className="hover:text-white transition-colors">Koleksi</a>
              <a href="#forum" className="hover:text-white transition-colors">Diskusi</a>
            </nav>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            <span>© {new Date().getFullYear()} Logika Positif</span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span>Built by Diaz & Team</span>
          </div>

          <div className="flex gap-6">
            {/* Social Icons Placeholder */}
            {['Instagram', 'Twitter', 'Medium'].map((social) => (
              <a key={social} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-[#F2A69A] transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* PREMIUM SCROLL TO TOP */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-10 right-10 z-[60] w-14 h-14 bg-[#F2A69A] text-black rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(242,166,154,0.3)] hover:scale-110 transition-transform active:scale-95"
          >
            <ArrowUp size={24} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
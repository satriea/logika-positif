import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowUpRight, Instagram, Twitter, PenTool } from "lucide-react";

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

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={14} />, href: '#' },
    { name: 'Twitter', icon: <Twitter size={14} />, href: '#' },
    { name: 'Medium', icon: <PenTool size={14} />, href: '#' },
  ];

  return (
    <footer className="bg-black text-white px-8 py-20 relative overflow-hidden">
      {/* Garis Aksen Atas - Gradasi Halus */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F2A69A]/30 to-transparent" />

      {/* Dekorasi Cahaya Tipis di Latar Belakang */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A69A]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={scrollToTop}>
              <div className="w-9 h-9 bg-[#F2A69A] rounded-xl flex items-center justify-center font-black text-black transition-transform group-hover:rotate-12">
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
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F2A69A]">
              Dukungan Kreator
            </h4>
            <div className="group">
              <p className="text-sm text-white/60 italic mb-4 font-serif">
                "Dukung perjalanan literasi ini dengan secangkir kopi."
              </p>
              <motion.a
                whileHover={{ x: 5 }}
                href="https://saweria.co/logikapositif"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-black text-[11px] uppercase tracking-widest border-b-2 border-[#F2A69A] pb-1 hover:text-[#F2A69A] transition-colors"
              >
                Dukung di Saweria <ArrowUpRight size={14} className="text-[#F2A69A]" />
              </motion.a>
            </div>
          </div>

          {/* NAVIGATION COLUMN */}
          <div className="md:col-span-3 space-y-6 md:text-right">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F2A69A]">
              Sitemap
            </h4>
            <nav className="flex flex-col gap-4 text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">
              <a href="#about" className="hover:text-[#F2A69A] transition-colors">Tentang Kami</a>
              <a href="#books" className="hover:text-[#F2A69A] transition-colors">Koleksi Buku</a>
              <a href="#reviews" className="hover:text-[#F2A69A] transition-colors">Esai Terbaru</a>
              <a href="#forum" className="hover:text-[#F2A69A] transition-colors">Forum Diskusi</a>
            </nav>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            <span className="hover:text-white/40 transition-colors">© {new Date().getFullYear()} Logika Positif</span>
            <span className="hidden md:block w-1.5 h-1.5 bg-[#F2A69A]/20 rounded-full" />
            <span className="hover:text-white/40 transition-colors tracking-[0.3em]">Built by Diaz & Team</span>
          </div>

          <div className="flex items-center gap-8">
            {socialLinks.map((social) => (
              <motion.a 
                key={social.name} 
                href={social.href} 
                whileHover={{ y: -3, color: "#F2A69A" }}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 transition-colors"
              >
                {social.icon}
                <span className="hidden sm:inline">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* PREMIUM SCROLL TO TOP */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.5 }}
            whileHover={{ scale: 1.1, shadow: "0 20px 40px rgba(242,166,154,0.4)" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-[60] w-14 h-14 bg-[#F2A69A] text-black rounded-2xl flex items-center justify-center shadow-2xl transition-all"
          >
            <ArrowUp size={24} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
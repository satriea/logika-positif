import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ activeSection, onManualClick }) {
  const [open, setOpen] = useState(false);

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
    <header className="fixed top-0 w-full z-50 bg-[#F2A69A]/80 backdrop-blur-2xl border-b border-black/[0.08]">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        
        {/* LOGO - Minimalist Box Style */}
        <motion.a 
          href="#home" 
          onClick={() => handleClick("home")}
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-black text-[#F2A69A] w-9 h-9 flex items-center justify-center rounded-lg font-black text-xl transition-transform group-hover:rotate-12">
            L
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-black font-black text-lg tracking-tighter uppercase">Logika</span>
            <span className="text-black/60 font-medium text-[10px] uppercase tracking-[0.3em]">Positif</span>
          </div>
        </motion.a>

        {/* DESKTOP NAV - Spacing & Typography */}
        <nav className="hidden lg:flex items-center gap-10">
          {menu.map((item) => {
            const isActive = activeSection === item.label;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => handleClick(item.id)}
                className={`relative text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-500 ${
                  isActive ? "text-black" : "text-black/40 hover:text-black"
                }`}
              >
                {item.label}
                
                {/* Underline Animasi (Shared LayoutId) */}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-black rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* CTA - Premium Button Style */}
        <div className="hidden lg:block">
          <motion.a
            href="#books"
            onClick={() => handleClick("books")}
            className="px-7 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-black/10 inline-block"
            whileHover={{ 
              y: -4, 
              backgroundColor: "#222",
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)" 
            }}
            whileTap={{ scale: 0.97 }}
          >
            Mulai Membaca
          </motion.a>
        </div>

        {/* MOBILE MENU TOGGLE - Custom Icon */}
        <button 
          onClick={() => setOpen(!open)} 
          className="lg:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          aria-label="Toggle Menu"
        >
          <motion.div 
            animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
            className="w-6 h-0.5 bg-black rounded-full" 
          />
          <motion.div 
            animate={{ opacity: open ? 0 : 1 }}
            className="w-6 h-0.5 bg-black rounded-full" 
          />
          <motion.div 
            animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
            className="w-6 h-0.5 bg-black rounded-full" 
          />
        </button>
      </div>

      {/* MOBILE MENU - Premium Slide Down */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute top-0 left-0 w-full bg-[#F2A69A] z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {menu.map((item, index) => (
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={item.label} 
                  href={item.href} 
                  onClick={() => handleClick(item.id)}
                  className={`text-2xl font-black uppercase tracking-[0.2em] ${
                    activeSection === item.label ? "text-black" : "text-black/30"
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
import React from "react";
import { motion } from "framer-motion";
import HeroPicture from "../assets/images/Hero.png"; 
import { ShoppingBag } from "lucide-react";

const Hero = () => {
  // Definisikan data buku utama di sini agar tidak terjadi ReferenceError
  const currentBook = {
    title: "Logika Positif",
    whatsappNumber: "6281234567890" // Ganti dengan nomor WA Anda
  };

  // Fungsi WhatsApp
  const handleOrder = (bookTitle) => {
    const message = encodeURIComponent(`Halo Diaz, saya ingin memesan/pre-order buku: ${bookTitle}`);
    window.open(`https://wa.me/${currentBook.whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section
      id="home"
      className="relative bg-[#F2A69A] pt-32 pb-24 px-8 overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* SISI KIRI: Narasi & CTA */}
        <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[13px] uppercase tracking-[0.4em] text-black/60 font-black mb-4">
              Trigger diri untuk berpikir lebih positif
            </p>
            
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] text-black tracking-tighter uppercase">
              Logika <br />
              <span className="text-white drop-shadow-md">Positif</span>
            </h1>
          </motion.div>

          <motion.div 
            className="max-w-lg space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-black/80 font-medium italic border-l-4 border-black pl-6 py-2">
              “Kenyataan memperluas tindakan, tindakan memperluas mimpi, mimpi memperluas kenyataan.”
            </p>
            
            <p className="text-base leading-relaxed text-black/70 font-medium">
              Ruang refleksi dan literasi oleh <span className="text-black font-black">Diaz Hardika.</span> Didesain untuk menuntun Anda menemukan perspektif baru setiap harinya.
            </p>
          </motion.div>

          {/* Tombol Navigasi */}
          <motion.div 
            className="flex flex-wrap items-center gap-5 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="#books" 
              className="px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-2xl shadow-black/20 flex items-center justify-center min-w-[200px]"
            >
              Baca Sinopsis
            </a>

            <button 
              onClick={() => handleOrder(currentBook.title)}
              className="group relative px-10 py-4 bg-[#F2A69A] text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:scale-105 hover:bg-white shadow-[0_15px_30px_rgba(242,166,154,0.3)] min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <ShoppingBag size={18} />
                Pesan Sekarang
              </span>

              {/* Efek Kilatan Cahaya */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12"
              />
            </button>
          </motion.div>
        </div>

        {/* SISI KANAN: Visual Cover Buku */}
        <motion.div 
          className="lg:col-span-5 flex justify-center lg:justify-end relative order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute -z-10 w-80 h-80 bg-yellow-300 rounded-full blur-[80px] opacity-40 animate-pulse" />
          
          <div className="relative group">
            <div className="relative z-10 w-64 md:w-80 aspect-[3/4.5] overflow-hidden rounded-2xl border-4 border-black shadow-[25px_25px_0px_0px_rgba(0,0,0,1)] transition-transform duration-500 group-hover:-translate-y-6 group-hover:-translate-x-2">
              <img 
                src={HeroPicture} 
                alt="Logika Positif Cover" 
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div 
              animate={{ rotate: [12, -12, 12] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-24 h-24 bg-white border-4 border-black rounded-full flex items-center justify-center text-center p-3 shadow-2xl z-20"
            >
              <span className="text-[10px] font-black leading-tight uppercase text-black">Edisi<br/>Terupdate<br/>2026</span>
            </motion.div>

            <div className="absolute -bottom-6 -right-10 grid grid-cols-4 gap-2 opacity-20 hidden md:grid">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-black rounded-full" />
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
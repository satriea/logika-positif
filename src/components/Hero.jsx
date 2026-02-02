import React from "react";
import { motion } from "framer-motion";
import HeroPicture from "../assets/images/Hero.png"; 

const Hero = () => {
  return (
    <section
      id="home"
      className="relative bg-[#F2A69A] pt-32 pb-24 px-8 overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* SISI KIRI: Narasi & CTA (Fokus Teks) */}
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
              “Kenyataan memperluas tindakan, tindakan memperluas mimpi,
              mimpi memperluas kenyataan.”
            </p>
            
            <p className="text-base leading-relaxed text-black/70 font-medium">
              Ruang refleksi dan literasi oleh <span className="text-black font-black">Diaz Hardika.</span> Didesain untuk menuntun Anda menemukan perspektif baru setiap harinya.
            </p>
          </motion.div>

          {/* Tombol Navigasi */}
          <motion.div 
            className="flex flex-wrap gap-5 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#books" className="px-10 py-4 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-2xl shadow-black/20">
              Baca Buku
            </a>
            <a href="#reviews" className="px-10 py-4 border-2 border-black text-black text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-black hover:text-white transition-all">
              Baca Esai
            </a>
          </motion.div>
        </div>

        {/* SISI KANAN: Visual Cover Buku (Fokus Gambar) */}
        <motion.div 
          className="lg:col-span-5 flex justify-center lg:justify-end relative order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Animasi Cahaya di belakang buku */}
          <div className="absolute -z-10 w-80 h-80 bg-yellow-300 rounded-full blur-[80px] opacity-40 animate-pulse" />
          
          <div className="relative group">
            {/* Bingkai Buku Brutalist */}
            <div className="relative z-10 w-64 md:w-80 aspect-[3/4.5] overflow-hidden rounded-2xl border-4 border-black shadow-[25px_25px_0px_0px_rgba(0,0,0,1)] transition-transform duration-500 group-hover:-translate-y-6 group-hover:-translate-x-2">
              <img 
                src={HeroPicture} 
                alt="Logika Positif Cover" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Badge Premium Melayang */}
            <motion.div 
              animate={{ rotate: [12, -12, 12] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-24 h-24 bg-white border-4 border-black rounded-full flex items-center justify-center text-center p-3 shadow-2xl z-20"
            >
               <span className="text-[10px] font-black leading-tight uppercase">Edisi<br/>Terupdate<br/>2026</span>
            </motion.div>

            {/* Ornamen Titik Dekoratif */}
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
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      // Menggunakan warna Pink yang sedikit lebih deep dan tekstur subtle
      className="relative bg-[#F2A69A] pt-32 pb-24 px-8 overflow-hidden"
    >
      {/* Background Decor - Elemen artistik premium */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* TEXT CONTENT - Mengambil 7 kolom */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[13px] uppercase tracking-[0.4em] text-black/60 font-bold mb-4">
              Trigger diri untuk berpikir lebih positif
            </p>
            
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-black tracking-tighter">
              Logika <br />
              <span className="text-white drop-shadow-sm">Positif</span>
            </h1>
            
            <h2 className="sr-only">Refleksi dan literasi untuk berpikir lebih positif</h2>
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
            
            <p className="text-base leading-relaxed text-black/70">
              Ruang refleksi dan literasi, tempat kata-kata disusun dengan nalar jernih, 
              empati, dan kesadaran diri. Didesain untuk menuntun Anda menemukan 
              perspektif baru setiap harinya.
            </p>
          </motion.div>

          {/* BUTTONS */}
          <motion.div 
            className="flex flex-wrap gap-5 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#books"
              className="px-8 py-4 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-black/20"
            >
              Baca Buku
            </a>

            <a
              href="#reviews"
              className="px-8 py-4 border-2 border-black text-black text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-black hover:text-white transition-all duration-500"
            >
              Baca Esai
            </a>
          </motion.div>
        </div>

        {/* BOOK VISUAL - Mengambil 5 kolom */}
        <motion.figure 
          className="lg:col-span-5 flex justify-center lg:justify-end relative"
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Decorative Ring */}
          <div className="absolute inset-0 border-[40px] border-white/10 rounded-full scale-125 blur-sm" />
          
          <div className="relative group">
            {/* The Book */}
            <div className="bg-yellow-400 w-72 h-[420px] rounded-2xl border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between transform transition-transform group-hover:-translate-y-4 duration-500">
              <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center text-xl">
                💡
              </div>

              <div>
                <h3 className="text-3xl font-black leading-none tracking-tighter italic">
                  LOGIKA<br />POSITIF
                </h3>
                <div className="w-12 h-1.5 bg-black mt-4" />
                <p className="text-[10px] uppercase tracking-widest font-bold mt-4 opacity-70">
                  Mindset & Literasi
                </p>
              </div>

              <div className="flex items-end justify-between border-t border-black/10 pt-4">
                <figcaption className="text-sm font-black uppercase">
                  Diaz Hardika
                </figcaption>
                <span className="text-[10px] font-bold">2026</span>
              </div>
            </div>
            
            {/* Badge Premium */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white border-4 border-black rounded-full flex items-center justify-center text-center p-2 shadow-xl rotate-12">
               <span className="text-[10px] font-black leading-tight uppercase">Best <br/> Reflection</span>
            </div>
          </div>
        </motion.figure>

      </div>
    </section>
  );
};

export default Hero;
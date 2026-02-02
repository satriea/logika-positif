import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Hash, PenTool, X, Send } from "lucide-react";

const Reviews = () => {
  const [isWriting, setIsWriting] = useState(false);
  
  const essaysData = [
    {
      id: 1,
      category: "Refleksi",
      title: "Melihat Jernih di Tengah Hiruk Pikuk Dunia",
      excerpt: "Bagaimana nalar jernih menjadi kompas di era informasi yang berlebihan dan distraksi tanpa henti.",
      readTime: "5 min",
      date: "02 Feb",
      author: "Diaz Hardika"
    },
    {
      id: 2,
      category: "Logika",
      title: "Paradoks Kebahagiaan: Antara Keinginan dan Penerimaan",
      excerpt: "Seringkali kebahagiaan menjauh saat kita terlalu keras mengejarnya. Mari membedah nalar di baliknya.",
      readTime: "8 min",
      date: "28 Jan",
      author: "Iskarahman"
    },
    {
      id: 3,
      category: "Literasi",
      title: "Seni Membangun Kebiasaan Menulis Harian",
      excerpt: "Menulis bukan tentang bakat, melainkan tentang keberanian untuk jujur pada pikiran sendiri setiap pagi.",
      readTime: "6 min",
      date: "15 Jan",
      author: "Satriea"
    }
  ];

  return (
    <section id="reviews" className="bg-white px-8 py-32 relative overflow-hidden">
      {/* Decorative Watermark */}
      <div className="absolute top-10 right-[-5%] text-[15rem] font-black text-black/[0.02] leading-none select-none uppercase pointer-events-none">
        Journal
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* SISI KIRI: Sticky Header & Action */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-black leading-[0.85] tracking-tighter uppercase mb-6">
                Esai <br />
                <span className="text-[#F2A69A]">Pembaca</span>
              </h2>
              <div className="w-16 h-1 bg-black mb-8" />
              <p className="text-black/50 text-lg leading-relaxed font-medium max-w-xs">
                Ruang bagi setiap nalar untuk berbagi refleksi dan perspektif positif.
              </p>
            </motion.div>

            {/* Tombol Tulis Esai Premium */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsWriting(true)}
              className="w-full py-6 bg-black text-white rounded-2xl flex items-center justify-center gap-4 group transition-all shadow-xl shadow-black/10"
            >
              <PenTool size={20} className="group-hover:text-[#F2A69A] transition-colors" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Tulis Esai Anda</span>
            </motion.button>

            {/* Stats Kecil */}
            <div className="pt-8 border-t border-black/5 flex gap-8">
              <div>
                <p className="text-2xl font-black italic">42</p>
                <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Kontribusi</p>
              </div>
              <div>
                <p className="text-2xl font-black italic">12k</p>
                <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Pembaca</p>
              </div>
            </div>
          </div>

          {/* SISI KANAN: Essay Feed */}
          <div className="lg:col-span-8 space-y-8">
            {essaysData.map((essay, idx) => (
              <motion.article
                key={essay.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white border border-black/[0.06] p-8 md:p-10 rounded-[2.5rem] hover:bg-[#FFF5F2]/50 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Date Circle */}
                  <div className="flex-shrink-0 w-16 h-16 border-2 border-black rounded-full flex flex-col items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    <span className="text-lg font-black leading-none">{essay.date.split(' ')[0]}</span>
                    <span className="text-[8px] font-bold uppercase">{essay.date.split(' ')[1]}</span>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-[#F2A69A]">
                      <span className="flex items-center gap-1"><Hash size={10}/> {essay.category}</span>
                      <span className="text-black/20">•</span>
                      <span className="text-black/40 italic">Oleh {essay.author}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-black leading-tight tracking-tighter group-hover:text-[#F2A69A] transition-colors duration-300">
                      {essay.title}
                    </h3>
                    
                    <p className="text-black/50 text-sm leading-relaxed font-medium line-clamp-2">
                      {essay.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4">
                       <span className="flex items-center gap-1.5 text-[10px] font-bold text-black/20 uppercase tracking-widest">
                         <Clock size={12} /> {essay.readTime}
                       </span>
                       <motion.div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                         Baca Selengkapnya <ArrowUpRight size={14} />
                       </motion.div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Load More Button */}
            <div className="flex justify-center pt-10">
               <button className="px-8 py-3 border-2 border-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-black hover:text-white transition-all">
                  Lihat Arsip Lengkap
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY MENULIS ESAI (FOCUS MODE) */}
      <AnimatePresence>
        {isWriting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center overflow-y-auto px-8 py-12"
          >
            <div className="max-w-4xl w-full">
              <header className="flex justify-between items-center mb-24">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center font-black">L</div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Mode Menulis</span>
                </div>
                <button 
                  onClick={() => setIsWriting(false)}
                  className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </header>

              <div className="space-y-12">
                <motion.input 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  type="text" 
                  placeholder="Judul Refleksi Anda..."
                  className="w-full text-4xl md:text-7xl font-black outline-none placeholder:text-black/5 tracking-tighter"
                />
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <textarea 
                    placeholder="Tuangkan pikiran Anda di sini secara jernih..."
                    className="w-full h-[400px] text-xl md:text-2xl leading-relaxed outline-none font-serif text-black/70 resize-none border-l-4 border-black/5 pl-8 focus:border-[#F2A69A] transition-colors"
                  />
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-black/5"
                >
                  <p className="text-xs text-black/40 font-medium italic max-w-xs">
                    "Tulisan Anda akan dikurasi oleh tim Logika Positif sebelum diterbitkan di jurnal utama."
                  </p>
                  <button className="group flex items-center gap-6 px-12 py-5 bg-black text-white rounded-full hover:bg-[#F2A69A] hover:text-black transition-all shadow-2xl shadow-black/20">
                    <span className="text-xs font-black uppercase tracking-[0.4em]">Kirim Esai</span>
                    <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reviews;
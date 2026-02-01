import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Forum = () => {
  const [isExpanding, setIsExpanding] = useState(false);

  return (
    <section
      id="forum"
      // Menggunakan warna latar yang sangat bersih namun maskulin
      className="bg-[#1A1A1A] px-8 py-32 relative overflow-hidden"
    >
      {/* Dekorasi Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2A69A]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Header & Stats - Sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter uppercase mb-6">
                Ruang <br />
                <span className="text-[#F2A69A]">Diskusi</span>
              </h2>
              <p className="text-white/50 text-lg font-medium leading-relaxed mb-10">
                Wadah bertukar nalar. Ajukan pertanyaan atau bagikan refleksi Anda dari buku Logika Positif.
              </p>

              {/* Forum Stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                <div>
                  <p className="text-2xl font-black text-white">124+</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Diskusi Aktif</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">12</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Topik Hari Ini</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Forum Feed */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* INTERACTIVE INPUT FORM */}
            <motion.div 
              className="bg-[#222] border border-white/5 rounded-3xl p-2 shadow-2xl"
              layout
            >
              <div className={`p-6 ${isExpanding ? 'space-y-4' : 'flex items-center gap-4'}`}>
                <div className="w-12 h-12 rounded-full bg-[#F2A69A] flex items-center justify-center font-black text-black">
                  U
                </div>
                
                {!isExpanding ? (
                  <button 
                    onClick={() => setIsExpanding(true)}
                    className="flex-1 text-left px-6 py-3 bg-white/5 rounded-full text-white/40 text-sm font-medium hover:bg-white/10 transition-all"
                  >
                    Apa yang sedang Anda refleksikan hari ini?
                  </button>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="w-full space-y-4"
                  >
                    <input 
                      autoFocus
                      placeholder="Judul topik diskusi..."
                      className="w-full bg-transparent border-b border-white/10 py-2 text-white font-bold focus:outline-none focus:border-[#F2A69A] transition-colors"
                    />
                    <textarea 
                      placeholder="Tuliskan pemikiran atau pertanyaan Anda secara mendalam..."
                      rows="4"
                      className="w-full bg-white/5 rounded-2xl p-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#F2A69A] resize-none"
                    />
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => setIsExpanding(false)}
                        className="px-6 py-2 text-xs font-bold text-white/40 hover:text-white transition-colors"
                      >
                        Batal
                      </button>
                      <button className="px-8 py-2 bg-[#F2A69A] text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
                        Kirim Diskusi
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* DISCUSSION FEED */}
            <div className="space-y-6">
              {[1, 2].map((item) => (
                <motion.article 
                  key={item}
                  className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/[0.07] transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-[#F2A69A]/10 text-[#F2A69A] text-[10px] font-black uppercase tracking-widest rounded-full">
                      Mindset
                    </span>
                    <span className="text-[10px] text-white/20 font-medium">2 jam yang lalu</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#F2A69A] transition-colors">
                    Manakah yang lebih berperan antara motivasi internal dan motivasi eksternal?
                  </h3>

                  <blockquote className="bg-white/[0.03] border-l-2 border-[#F2A69A] p-5 rounded-r-2xl italic text-white/60 text-sm mb-6 leading-relaxed">
                    “Saya sering merasa semangat di awal karena pujian orang lain, tapi cepat redup. Bagaimana Logika Positif memandang ini?”
                  </blockquote>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] font-bold text-black">
                        DH
                      </div>
                      <div className="leading-none">
                        <p className="text-[11px] font-black text-white uppercase tracking-wider">Diaz Hardika</p>
                        <p className="text-[9px] text-white/30 uppercase font-bold mt-1">Penulis • Menjawab</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-[#F2A69A] hover:underline">
                      Lihat 12 Jawaban
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Forum;
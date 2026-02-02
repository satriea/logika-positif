import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User } from "lucide-react";

const Forum = () => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [activeThread, setActiveThread] = useState(null);

  const discussions = [
    {
      id: 1,
      tag: "Mindset",
      time: "2 jam yang lalu",
      question: "Manakah yang lebih berperan antara motivasi internal dan motivasi eksternal?",
      quote: "Saya sering merasa semangat di awal karena pujian orang lain, tapi cepat redup. Bagaimana Logika Positif memandang ini?",
      author: "Diaz Hardika",
      replies: [
        { name: "Andi", text: "Menurut saya internal tetap kuncinya, eksternal hanya bensin tambahan.", role: "Pembaca" },
        { name: "Diaz Hardika", text: "Betul Andi. Motivasi eksternal itu seperti kafein, memberikan lonjakan tapi tidak sustain.", role: "Penulis" }
      ]
    },
    {
      id: 2,
      tag: "Kebiasaan",
      time: "5 jam yang lalu",
      question: "Bagaimana cara konsisten menulis saat sedang tidak ada ide?",
      quote: "Menulis harian terasa berat ketika pikiran sedang kosong. Apakah harus dipaksa atau menunggu inspirasi?",
      author: "Satriea",
      replies: [
        { name: "Iskarahman", text: "Tulis saja apa yang kamu rasakan saat kosong itu. Kadang kekosongan adalah ide itu sendiri.", role: "Pembaca" }
      ]
    }
  ];

  return (
    <section id="forum" className="bg-[#1A1A1A] px-8 py-32 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2A69A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Header & Stats */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter uppercase mb-6">
                Ruang <br /> <span className="text-[#F2A69A]">Diskusi</span>
              </h2>
              <p className="text-white/50 text-lg font-medium leading-relaxed mb-10">
                Wadah bertukar nalar. Ajukan pertanyaan atau bagikan refleksi Anda.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                <div>
                  <p className="text-2xl font-black text-white">{discussions.length + 122}+</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Diskusi Aktif</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">08</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Topik Baru</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Forum Feed */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* INTERACTIVE INPUT FORM */}
            <motion.div className="bg-[#222] border border-white/5 rounded-3xl p-2 shadow-2xl" layout>
              <div className={`p-6 ${isExpanding ? 'space-y-4' : 'flex items-center gap-4'}`}>
                <div className="w-12 h-12 rounded-full bg-[#F2A69A] flex items-center justify-center font-black text-black shrink-0">U</div>
                {!isExpanding ? (
                  <button onClick={() => setIsExpanding(true)} className="flex-1 text-left px-6 py-3 bg-white/5 rounded-full text-white/40 text-sm font-medium hover:bg-white/10 transition-all">
                    Apa yang sedang Anda refleksikan hari ini?
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-4">
                    <input autoFocus placeholder="Judul topik diskusi..." className="w-full bg-transparent border-b border-white/10 py-2 text-white font-bold focus:outline-none focus:border-[#F2A69A] transition-colors" />
                    <textarea placeholder="Tuliskan pemikiran atau pertanyaan Anda..." rows="4" className="w-full bg-white/5 rounded-2xl p-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#F2A69A] resize-none" />
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setIsExpanding(false)} className="px-6 py-2 text-xs font-bold text-white/40 hover:text-white transition-colors">Batal</button>
                      <button className="px-8 py-2 bg-[#F2A69A] text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform">Kirim</button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* FEED */}
            <div className="space-y-6">
              {discussions.map((item) => (
                <motion.article 
                  key={item.id} 
                  className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/[0.08] transition-all group cursor-pointer"
                  onClick={() => setActiveThread(item)}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-[#F2A69A]/10 text-[#F2A69A] text-[10px] font-black uppercase tracking-widest rounded-full">{item.tag}</span>
                    <span className="text-[10px] text-white/20 font-medium">{item.time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#F2A69A] transition-colors">{item.question}</h3>
                  <blockquote className="bg-white/[0.03] border-l-2 border-[#F2A69A] p-5 rounded-r-2xl italic text-white/60 text-sm mb-6 leading-relaxed">“{item.quote}”</blockquote>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] font-bold text-black uppercase">{item.author.charAt(0)}</div>
                      <p className="text-[11px] font-black text-white uppercase tracking-wider">{item.author}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#F2A69A]">
                      <MessageSquare size={14} /> {item.replies.length} Jawaban
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY THREAD DISKUSI */}
      <AnimatePresence>
        {activeThread && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex justify-end"
            onClick={() => setActiveThread(null)}
          >
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-[#1A1A1A] h-full shadow-2xl p-8 md:p-12 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setActiveThread(null)} className="mb-12 text-white/30 hover:text-white flex items-center gap-2 uppercase text-[10px] font-black tracking-widest">
                <X size={20} /> Tutup Diskusi
              </button>

              <div className="space-y-10">
                <header>
                  <span className="text-[#F2A69A] text-[10px] font-black uppercase tracking-[0.4em]">{activeThread.tag}</span>
                  <h2 className="text-3xl font-black text-white mt-4 leading-tight">{activeThread.question}</h2>
                  <div className="mt-8 p-6 bg-white/5 rounded-2xl italic text-white/70 border-l-4 border-[#F2A69A]">
                    {activeThread.quote}
                  </div>
                </header>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Jawaban ({activeThread.replies.length})</h4>
                  {activeThread.replies.map((reply, i) => (
                    <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black ${reply.role === 'Penulis' ? 'bg-[#F2A69A] text-black' : 'bg-white/10 text-white'}`}>
                          {reply.name.charAt(0)}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{reply.name}</span>
                        {reply.role === 'Penulis' && <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded text-white/40 tracking-widest uppercase">Author</span>}
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed">{reply.text}</p>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="pt-8 border-t border-white/5">
                  <div className="flex gap-4">
                    <input placeholder="Tulis jawaban Anda..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm text-white focus:outline-none focus:border-[#F2A69A]" />
                    <button className="w-12 h-12 bg-[#F2A69A] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Forum;
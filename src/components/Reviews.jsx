import React from "react";
import { motion } from "framer-motion";

const Reviews = () => {
  const reviewsData = [
    {
      username: "@ISKARAHMAN",
      comment: "Bagus sekali, bahasanya sangat membumi namun tetap logis.",
      role: "Pembaca Setia",
    },
    {
      username: "@SATRIEA",
      comment: "Saya sangat tercerahkan karena buku ini. Membantu saya melihat rutinitas dengan kacamata yang berbeda.",
      role: "Wiraswasta",
    },
  ];

  return (
    <section
      id="reviews"
      // Warna Pink yang sangat muda/krem untuk kelembutan visual
      className="bg-[#FFF5F2] px-8 py-32 relative overflow-hidden"
    >
      {/* Background Decor - Floating Quote Icon */}
      <div className="absolute -top-10 -right-10 text-[20rem] font-black text-[#F2A69A]/10 leading-none select-none">
        “
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Section Header & Mini Book Card */}
          <div className="lg:col-span-4 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tighter uppercase mb-6">
                Catatan <br />
                <span className="text-[#F2A69A]">Pembaca</span>
              </h2>
              <p className="text-black/60 text-lg leading-relaxed font-medium">
                Beberapa kesan dan refleksi pembaca setelah 
                menyelesaikan perjalanan bersama Logika Positif.
              </p>
            </motion.div>

            {/* Mini Context Card */}
            <motion.div 
              className="bg-white border-2 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 bg-yellow-400 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Current Read</span>
              </div>
              <h3 className="font-black text-black text-lg mb-2 uppercase tracking-tighter">
                Logika Positif
              </h3>
              <p className="text-xs text-black/50 italic mb-8">
                Trigger Diri Untuk Berpikir Lebih Positif
              </p>
              <button className="w-full text-[10px] font-black uppercase tracking-widest bg-black text-white py-4 rounded-xl hover:bg-[#F2A69A] transition-colors">
                Beli Sekarang
              </button>
            </motion.div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-8 space-y-12">
            {reviewsData.map((rev, idx) => (
              <motion.blockquote
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative bg-white/50 backdrop-blur-sm p-10 rounded-3xl border border-black/[0.05] hover:border-[#F2A69A] transition-colors group"
              >
                {/* Large Quote Mark */}
                <div className="absolute top-6 left-6 text-4xl text-[#F2A69A] opacity-20 group-hover:opacity-100 transition-opacity">
                   “
                </div>
                
                <div className="relative z-10 pl-4">
                  <p className="text-2xl md:text-3xl font-bold text-black/80 leading-snug tracking-tight mb-8 font-serif italic">
                    {rev.comment}
                  </p>
                  
                  <footer className="flex items-center gap-4 border-t border-black/5 pt-6">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-xs font-black uppercase">
                       {rev.username.charAt(1)}
                    </div>
                    <div>
                      <cite className="not-italic text-sm font-black uppercase tracking-widest block text-black">
                        {rev.username}
                      </cite>
                      <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                        {rev.role}
                      </span>
                    </div>
                  </footer>
                </div>
              </motion.blockquote>
            ))}

            <motion.div 
              className="flex items-center gap-4 text-black/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
               <div className="h-[1px] w-20 bg-black/10" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em]">Logika Positif Archive</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Reviews;
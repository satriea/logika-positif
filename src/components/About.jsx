import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="bg-[#FAFAFA] px-8 py-32 relative overflow-hidden"
    >
      {/* Decorative Watermark */}
      <div className="absolute top-10 right-10 text-[15rem] font-black text-black/[0.02] leading-none select-none uppercase pointer-events-none">
        Story
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* HEADER SECTION - Sticky on Desktop */}
          <header className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-black leading-none tracking-tighter mb-8 uppercase">
                Tentang <br />
                <span className="text-[#F2A69A]">Penulis</span>
              </h2>
              <div className="w-20 h-2 bg-black mb-8" />
              
              {/* Profile Brief Card */}
              <div className="bg-black text-white p-8 rounded-2xl space-y-4 shadow-xl">
                 <p className="text-xs font-black uppercase tracking-[0.4em] text-[#F2A69A]">Diaz Hardika</p>
                 <p className="text-sm leading-relaxed text-white/70 font-medium">
                   Seorang karyawan swasta, pemimpin keluarga muda, dan penutur nalar positif yang percaya bahwa setiap pengalaman adalah tinta bagi sebuah karya.
                 </p>
              </div>
            </motion.div>
          </header>

          {/* CONTENT SECTION - Detail Narasi */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* PARAGRAPH 1: Perjalanan Karier */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black/30">Pengalaman & Karier</h3>
              <p className="text-xl leading-relaxed text-black/80 font-medium">
                Menapaki usia paruh baya sebagai kepala keluarga muda, saya membawa bekal pengalaman lebih dari <span className="text-black font-black">10 tahun</span> melintasi berbagai industri—mulai dari Otomotif, Ekspedisi, hingga Elektronik.
              </p>
              <p className="text-lg leading-relaxed text-black/60">
                Perjalanan karier saya adalah kanvas yang beragam; mencakup bidang <span className="font-bold text-black">Training, Marketing, Quality Control, Data Analyst, hingga Audit</span>. Dari berbagai tantangan inilah saya belajar bahwa setiap pertemuan dan pengalaman memiliki esensi yang layak untuk dibagikan.
              </p>
            </motion.div>

            {/* PARAGRAPH 2: Akar Kreativitas (Stickman ke Twitter) */}
            <motion.div 
              className="bg-white border-2 border-black p-10 rounded-3xl shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#F2A69A]">Evolusi Kreatif</h3>
              <p className="text-lg leading-relaxed text-black/80">
                Kreativitas saya bermula dari hobi menggambar komik <span className="italic">stickman</span> saat kecil, yang kemudian berkembang menjadi penulisan cerita imajinatif di masa SMA.
              </p>
              <div className="p-6 bg-[#FAFAFA] rounded-xl border-l-4 border-black font-mono text-sm text-black/70">
                #LogikaPositif — Fondasi ini lahir dari kebiasaan saya membagikan kata-kata bijak di Twitter selama masa kuliah, yang kini berevolusi menjadi gagasan utama buku ini.
              </div>
            </motion.div>

            {/* PARAGRAPH 3: Harapan & Visi */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black/30">Mimpi & Harapan</h3>
              <p className="text-lg leading-relaxed text-black/70">
                Tahun ini menandai langkah serius saya dalam dunia literasi. Melahirkan sebuah buku bukan hanya sekadar ambisi, melainkan kebahagiaan untuk menyebarkan dampak positif kepada siapa pun yang membuka halamannya.
              </p>
              
              <blockquote className="text-3xl font-black text-black tracking-tighter leading-[1.1] uppercase italic">
                “Membaca lebih dalam, <br />
                menulis lebih banyak, <br />
                dan menyebarkan hal positif.”
              </blockquote>

              <p className="text-base text-black/50 leading-relaxed font-medium">
                Harapan saya sederhana: semoga buku pertama ini menjadi pemantik bagi ide-ide selanjutnya yang masih berakar pada nalar jernih. Mari menyebarkan kebaikan bersama.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
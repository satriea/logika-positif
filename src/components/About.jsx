import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      // Menggunakan warna Off-White agar kontras dengan Hero
      className="bg-[#FAFAFA] px-8 py-32 relative overflow-hidden"
    >
      {/* Dekorasi Nomor Section - Subtle Watermark */}
      <div className="absolute top-10 right-10 text-[15rem] font-black text-black/[0.02] leading-none select-none">
        01
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Header & Intro - Sticky on Desktop */}
          <header className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2
                id="about-heading"
                className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tighter mb-6 uppercase"
              >
                Tentang <br />
                <span className="text-[#F2A69A]">Penulis</span>
              </h2>

              <div className="w-20 h-1 bg-black mb-8" />

              <p className="text-lg text-black/60 leading-relaxed font-medium italic">
                “Sebuah pengantar singkat tentang perjalanan, latar belakang, 
                dan alasan di balik lahirnya Logika Positif.”
              </p>
              
              <h3 className="sr-only">Profil dan latar belakang penulis Logika Positif</h3>
            </motion.div>
          </header>

          {/* Main Content Area */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Main Story */}
            <motion.div 
              className="text-black/80 text-lg leading-loose space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                Perkenalkan, nama saya <strong className="text-black font-black underline decoration-[#F2A69A] decoration-4 underline-offset-4">Diaz Hardika</strong>. 
                Seorang laki-laki yang kini menapaki usia paruh baya dan sedang belajar menjalani peran sebagai kepala keluarga muda.
              </p>

              <p>
                Dalam perjalanan hidup dan karier, saya bekerja sebagai karyawan swasta dengan pengalaman lebih dari sepuluh tahun di berbagai bidang—mulai dari otomotif hingga audit. Dari sana, saya belajar bahwa <span className="font-bold text-black">logika, disiplin, dan refleksi diri</span> adalah fondasi penting dalam pengambilan keputusan.
              </p>

              <div className="py-8">
                <blockquote className="text-2xl font-black text-black tracking-tight leading-snug border-l-8 border-[#F2A69A] pl-8">
                  Melalui tulisan, saya ingin berbagi sudut pandang yang lebih jernih dan membumi.
                </blockquote>
              </div>

              <p>
                Mimpi saya sederhana: melahirkan sebuah buku yang bisa dibaca banyak orang, dan semoga memberi dampak positif, sekecil apa pun itu. Menulis bukan lagi sekadar hobi, melainkan proses berdamai dengan pikiran sendiri.
              </p>
            </motion.div>

            {/* Side Note / Highlight Card */}
            <motion.aside
              aria-label="Catatan pribadi penulis"
              className="bg-white border-2 border-black p-10 rounded-2xl shadow-[12px_12px_0px_0px_rgba(242,166,154,1)]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
                  ✎
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black">
                  Catatan Penulis
                </h3>
              </div>

              <p className="text-lg italic text-black/70 leading-relaxed font-serif">
                “Tahun ini adalah kali pertama saya menekuni penulisan buku secara serius. Ini adalah janji saya pada diri sendiri untuk terus bertumbuh melalui kata-kata.”
              </p>
            </motion.aside>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React from "react";
import { motion } from "framer-motion";

const BookGallery = () => {
  const books = [
    {
      id: 1,
      title: "Logika Positif",
      subtitle: "Trigger Diri Untuk Berpikir Lebih Positif",
      tag: "Main Edition",
      color: "bg-yellow-400"
    },
    {
      id: 2,
      title: "Logika Positif",
      subtitle: "Edisi Pengembangan Diri",
      tag: "Special Edition",
      color: "bg-[#F2A69A]" // Menggunakan Pink Navbar
    },
    {
      id: 3,
      title: "Logika Positif",
      subtitle: "Membangun Kebiasaan Baru",
      tag: "Workbook",
      color: "bg-white"
    },
  ];

  return (
    <section
      id="books"
      aria-labelledby="books-heading"
      // Background Gelap untuk kesan Premium & Fokus
      className="bg-[#111111] px-8 py-32 relative overflow-hidden"
    >
      {/* Decorative Text Background */}
      <div className="absolute top-20 left-0 text-[10rem] font-black text-white/[0.03] whitespace-nowrap select-none">
        COLLECTIONS • COLLECTIONS • COLLECTIONS
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              id="books-heading"
              className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase"
            >
              Karya & <span className="text-[#F2A69A]">Buku</span>
            </h2>
            <div className="w-24 h-2 bg-[#F2A69A] mt-6 mb-8" />
            <p className="text-white/50 text-lg max-w-lg leading-relaxed font-medium">
              Kumpulan buku dan tulisan yang lahir dari proses berpikir, 
              refleksi, dan pengalaman personal Diaz Hardika.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:block"
          >
            <span className="text-white/20 text-xs font-black uppercase tracking-[0.5em] vertical-text">
              Premium Content
            </span>
          </motion.div>
        </header>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {books.map((book, index) => (
            <motion.article
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              itemScope
              itemType="https://schema.org/Book"
              className="group cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative">
                {/* Book Shadow/Depth Effect */}
                <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-2xl transition-transform group-hover:translate-x-5 group-hover:translate-y-5" />
                
                {/* Main Card */}
                <div className={`relative aspect-[3/4.5] ${book.color} border-2 border-black rounded-2xl p-8 flex flex-col justify-between overflow-hidden transition-transform duration-500 group-hover:-translate-y-4`}>
                  
                  {/* Grain Overlay */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

                  {/* Header Book */}
                  <div className="flex justify-between items-start relative z-10">
                    <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center text-xl shadow-sm">
                      💡
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-3 py-1 rounded-full">
                      {book.tag}
                    </span>
                  </div>

                  {/* Body Book */}
                  <div className="relative z-10">
                    <h3
                      itemProp="name"
                      className="text-3xl font-black leading-[0.9] uppercase tracking-tighter text-black mb-4"
                    >
                      {book.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </h3>

                    <p
                      itemProp="alternativeHeadline"
                      className="text-sm font-bold italic text-black/60 leading-tight border-t border-black/10 pt-4"
                    >
                      {book.subtitle}
                    </p>
                  </div>

                  {/* Footer Book */}
                  <div className="flex items-center justify-between relative z-10">
                     <span className="text-[10px] font-black uppercase tracking-widest">Diaz Hardika</span>
                     <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        →
                     </div>
                  </div>
                </div>
              </div>

              {/* Outside Caption */}
              <div className="mt-8 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-xs font-black uppercase tracking-widest">Detail Explorer</p>
                <div className="h-0.5 bg-[#F2A69A] w-0 group-hover:w-full transition-all duration-700" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookGallery;
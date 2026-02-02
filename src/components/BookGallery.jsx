import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const BookGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const books = [
    {
      id: 1,
      title: "Logika Positif",
      subtitle: "Trigger Diri Untuk Berpikir Lebih Positif",
      tag: "Main Edition",
      color: "bg-yellow-400",
      content: "Buku ini adalah fondasi dari seluruh pemikiran Logika Positif. Di dalamnya, kita mengeksplorasi bagaimana nalar jernih dapat membantu kita berdamai dengan kenyataan yang seringkali tidak sesuai ekspektasi. Diaz Hardika merangkai kata demi kata untuk mengajak pembaca merekonstruksi pola pikir dari destruktif menjadi konstruktif melalui refleksi harian yang membumi."
    },
    {
      id: 2,
      title: "Edisi Pengembangan",
      subtitle: "Mengenal Diri Melalui Kata",
      tag: "Special Edition",
      color: "bg-[#F2A69A]",
      content: "Fokus pada pengembangan karakter melalui literasi. Edisi ini membedah lebih dalam tentang bagaimana tulisan bisa menjadi terapi bagi jiwa yang lelah. Diaz membagikan teknik-teknik refleksi yang ia gunakan selama sepuluh tahun berkarir untuk menjaga kewarasan mental di tengah tekanan profesional yang tinggi."
    },
    {
      id: 3,
      title: "Workbook Refleksi",
      subtitle: "Membangun Kebiasaan Baru",
      tag: "Practice",
      color: "bg-white",
      content: "Bukan sekadar bacaan, ini adalah ruang bagi Anda untuk menuliskan narasi Anda sendiri. Dilengkapi dengan prompt harian yang menantang kejujuran diri. Buku kerja ini didesain minimalis agar fokus tetap pada aliran pikiran Anda, membantu Anda menciptakan kebiasaan positif yang bertahan lama."
    },
    {
      id: 4,
      title: "Nalar Jernih",
      subtitle: "Seni Mengolah Emosi",
      tag: "New Release",
      color: "bg-emerald-400",
      content: "Karya terbaru yang fokus pada kecerdasan emosional. Bagaimana logika tidak seharusnya membunuh emosi, melainkan membimbingnya. Sebuah eksplorasi tentang empati terhadap diri sendiri sebelum kita mampu berempati secara tulus kepada orang lain di sekitar kita."
    },
  ];

  // Kunci scroll saat overlay terbuka
  useEffect(() => {
    if (selectedIndex !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedIndex]);

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % books.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  const currentBook = selectedIndex !== null ? books[selectedIndex] : null;

  return (
    <section id="books" className="bg-[#111111] px-8 py-32 relative overflow-hidden">
      {/* Decorative Text Background */}
      <div className="absolute top-20 left-0 text-[10rem] font-black text-white/[0.03] whitespace-nowrap select-none uppercase">
        Collections • Collections
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
              Karya & <span className="text-[#F2A69A]">Buku</span>
            </h2>
            <div className="w-24 h-2 bg-[#F2A69A] mt-6 mb-8" />
            <p className="text-white/50 text-lg max-w-lg leading-relaxed font-medium">
              Kumpulan buku dan tulisan yang lahir dari proses berpikir Diaz Hardika.
            </p>
          </motion.div>
        </header>

        {/* BOOK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {books.map((book, index) => (
            <motion.article
              key={book.id}
              onClick={() => setSelectedIndex(index)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-2xl transition-transform group-hover:translate-x-5 group-hover:translate-y-5" />
                <div className={`relative aspect-[3/4.5] ${book.color} border-2 border-black rounded-2xl p-6 flex flex-col justify-between overflow-hidden transition-transform duration-500 group-hover:-translate-y-4`}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                  <div className="flex justify-between items-start relative z-10">
                    <div className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center text-lg">💡</div>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-black text-white px-3 py-1 rounded-full">{book.tag}</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black leading-[0.9] uppercase tracking-tighter text-black mb-3">{book.title}</h3>
                    <p className="text-[11px] font-bold italic text-black/60 pt-3 border-t border-black/10">{book.subtitle}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* OVERLAY DETAIL DENGAN NAVIGASI */}
      <AnimatePresence>
        {currentBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-black/95 backdrop-blur-2xl"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Navigasi Kiri */}
            <button onClick={handlePrev} className="absolute left-4 md:left-10 z-[110] text-white/30 hover:text-[#F2A69A] transition-colors p-4">
              <ChevronLeft size={60} strokeWidth={1} />
            </button>

            {/* Navigasi Kanan */}
            <button onClick={handleNext} className="absolute right-4 md:right-10 z-[110] text-white/30 hover:text-[#F2A69A] transition-colors p-4">
              <ChevronRight size={60} strokeWidth={1} />
            </button>

            {/* Tombol Close */}
            <button onClick={() => setSelectedIndex(null)} className="absolute top-8 right-8 z-[110] text-white/50 hover:text-white transition-colors">
              <X size={32} />
            </button>

            <motion.div 
              key={currentBook.id} // Kunci agar animasi berganti saat navigasi
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center"
            >
              {/* Visual Buku */}
              <div className="hidden md:flex justify-center">
                <div className={`w-80 h-[480px] ${currentBook.color} rounded-2xl border-4 border-black shadow-[25px_25px_0px_0px_#F2A69A] p-10 flex flex-col justify-between transform rotate-3`}>
                    <BookOpen size={40} className="text-black/20" />
                    <h3 className="text-4xl font-black leading-none uppercase tracking-tighter">{currentBook.title}</h3>
                </div>
              </div>

              {/* Konten */}
              <div className="text-white space-y-8">
                <header>
                   <span className="text-[#F2A69A] text-xs font-black uppercase tracking-[0.5em]">{currentBook.tag}</span>
                   <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-4 leading-none">{currentBook.title}</h2>
                   <p className="text-white/40 italic mt-6 text-lg">{currentBook.subtitle}</p>
                </header>

                <div className="h-[1px] w-full bg-white/10" />

                <div className="space-y-6 text-xl leading-loose text-white/70 font-serif">
                  <p>{currentBook.content}</p>
                </div>

                <div className="pt-8 flex items-center gap-6">
                   <button className="px-10 py-4 bg-[#F2A69A] text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors shadow-xl shadow-[#F2A69A]/10">
                      Baca Sekarang
                   </button>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Halaman 0{selectedIndex + 1} / 0{books.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BookGallery;
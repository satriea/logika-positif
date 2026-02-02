import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, BookOpen, Search, Sparkles, ShoppingBag } from "lucide-react";
// Impor gambar lampu sebagai aset
import LogoTag from "../assets/images/Lampu.png"; 

const BookGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua"); 

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
      title: "Edisi Keren",
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
    {
      id: 5,
      title: "Nalar Keruh",
      subtitle: "Seni Mengolah Bahagia",
      tag: "New Release",
      color: "bg-indigo-400",
      content: "Karya terbaru yang fokus pada kecerdasan emosional. Bagaimana logika tidak seharusnya membunuh emosi, melainkan membimbingnya. Sebuah eksplorasi tentang empati terhadap diri sendiri sebelum kita mampu berempati secara tulus kepada orang lain di sekitar kita."
    },
    {
      id: 6,
      title: "Nalar Embuh",
      subtitle: "Seni Mengolah Bahagia",
      tag: "New Release",
      color: "bg-green-400",
      content: "Karya terbaru yang fokus pada kecerdasan emosional. Bagaimana logika tidak seharusnya membunuh emosi, melainkan membimbingnya. Sebuah eksplorasi tentang empati terhadap diri sendiri sebelum kita mampu berempati secara tulus kepada orang lain di sekitar kita."
    },
    {
      id: 7,
      title: "Nalar Keruh",
      subtitle: "Seni Mengolah Bahagia",
      tag: "New Release",
      color: "bg-yellow-400",
      content: "Karya terbaru yang fokus pada kecerdasan emosional. Bagaimana logika tidak seharusnya membunuh emosi, melainkan membimbingnya. Sebuah eksplorasi tentang empati terhadap diri sendiri sebelum kita mampu berempati secara tulus kepada orang lain di sekitar kita."
    },
    {
      id: 8,
      title: "Nalar Keruh",
      subtitle: "Seni Mengolah Bahagia",
      tag: "New Release",
      color: "bg-blue-400",
      content: "Karya terbaru yang fokus pada kecerdasan emosional. Bagaimana logika tidak seharusnya membunuh emosi, melainkan membimbingnya. Sebuah eksplorasi tentang empati terhadap diri sendiri sebelum kita mampu berempati secara tulus kepada orang lain di sekitar kita."
    },
  ];

  const categories = ["Semua", "New Release", "Main Edition", "Special Edition", "Practice"];

  // --- LOGIKA FILTER BERLAPIS (Indeks disinkronkan ke sini) ---
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === "Semua" || book.tag === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, filteredBooks.length - itemsPerPage);

  const nextCarousel = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevCarousel = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (searchQuery !== "" || viewAll || activeCategory !== "Semua") return;
    const timer = setInterval(nextCarousel, 5000);
    return () => clearInterval(timer);
  }, [maxIndex, itemsPerPage, searchQuery, viewAll, activeCategory]);

  useEffect(() => {
    if (selectedIndex !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedIndex]);

  // Handler Navigasi Modal yang diperbaiki agar sinkron dengan filteredBooks
  const handleModalNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % filteredBooks.length);
  };

  const handleModalPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + filteredBooks.length) % filteredBooks.length);
  };

  const currentBook = selectedIndex !== null ? filteredBooks[selectedIndex] : null;

  // Fungsi WhatsApp
  const handleOrder = (bookTitle) => {
    const message = encodeURIComponent(`Halo Diaz, saya ingin memesan/pre-order buku: ${bookTitle}`);
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  };

  return (
    <section id="books" className="bg-[#111111] px-6 md:px-8 py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-20 left-0 text-[6rem] md:text-[10rem] font-black text-white/[0.03] whitespace-nowrap select-none uppercase pointer-events-none">
        Collections • Collections
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
              Karya & <span className="text-[#F2A69A]">Buku</span>
            </h2>
            <div className="w-20 md:w-24 h-2 bg-[#F2A69A] mt-4 md:mt-6 mb-6 md:mb-8 mx-auto md:ml-0" />
            <p className="text-white/50 text-base md:text-lg max-w-lg leading-relaxed font-medium">
              Kumpulan buku dan tulisan yang lahir dari proses berpikir Diaz Hardika.
            </p>
          </motion.div>

          <div className="flex justify-center gap-4">
            <button onClick={prevCarousel} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#F2A69A] hover:text-black transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextCarousel} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#F2A69A] hover:text-black transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        {/* --- FILTER & SEARCH BAR --- */}
        <div className="mb-16 space-y-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentIndex(0); }}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? "bg-white text-black shadow-lg shadow-white/10" 
                  : "bg-white/5 text-white/40 hover:bg-white/10"
                }`}
              >
                {cat === "New Release" && <Sparkles size={12} className="inline mr-2 mb-0.5" />}
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-md group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#F2A69A] transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text"
              placeholder="Cari judul atau nalar..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentIndex(0); }}
              className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-[#F2A69A]/50 transition-colors font-medium placeholder:text-white/20"
            />
          </div>
        </div>

        {/* CAROUSEL / GRID VIEWPORT */}
        <div className="relative overflow-visible min-h-[500px]">
          <motion.div 
            layout
            className={`flex gap-6 md:gap-10 ${viewAll ? "flex-wrap justify-center" : "flex-nowrap"}`}
            animate={!viewAll ? { x: `calc(-${currentIndex * (100 / itemsPerPage)}% - ${currentIndex * (itemsPerPage === 1 ? 1.5 : 2.5)}rem)` } : { x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <motion.article
                    key={book.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSelectedIndex(index)} // Perbaikan indeks klik
                    className={`group cursor-pointer shrink-0 transition-all duration-500 ${
                      viewAll 
                        ? "w-[280px]" 
                        : itemsPerPage === 1 ? "w-full" : itemsPerPage === 2 ? "w-[calc(50%-0.75rem)]" : "w-[calc(25%-1.875rem)]"
                    }`}
                  >
                    <div className="relative p-2">
                      <span className="absolute -top-4 -left-2 text-7xl font-black text-white/[0.05] italic group-hover:text-[#F2A69A]/20 transition-colors duration-700 select-none">
                        0{book.id}
                      </span>
                      <div className={`relative aspect-[3/4.6] ${book.color} rounded-[2.5rem] p-7 md:p-9 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-2 border-black`}>
                        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                        <div className="flex justify-between items-start relative z-10">
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/40 blur-xl rounded-full scale-150" />
                            <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-transform group-hover:rotate-12 duration-500">
                              <img src={LogoTag} alt="Logo" className="w-full h-full object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]" />
                            </div>
                          </div>
                          <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg ${book.tag === 'New Release' ? 'bg-[#F2A69A] text-black animate-pulse' : 'bg-black text-white'}`}>
                            {book.tag}
                          </span>
                        </div>
                        <div className="relative z-10 space-y-4">
                          <h3 className="text-2xl md:text-3xl font-black leading-[0.9] uppercase tracking-tighter text-black">
                            {book.title.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                          </h3>
                          <div className="pt-4 border-t border-black/20">
                            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-black/50 leading-tight">
                              {book.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="w-full py-20 text-center">
                   <div className="inline-block p-10 rounded-full bg-white/5 mb-6 text-white/10">
                    <BookOpen size={60} strokeWidth={1} />
                   </div>
                   <p className="text-white/20 font-black uppercase tracking-[0.3em] italic">Tidak ada koleksi ditemukan...</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* OVERLAY DETAIL (Modal) */}
      <AnimatePresence>
        {currentBook && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-2xl overflow-y-auto"
            onClick={() => setSelectedIndex(null)}
          >
            <button onClick={handleModalPrev} className="hidden lg:block absolute left-4 md:left-10 z-[110] text-white/30 hover:text-[#F2A69A] transition-colors p-4">
              <ChevronLeft size={60} strokeWidth={1} />
            </button>
            <button onClick={handleModalNext} className="hidden lg:block absolute right-4 md:right-10 z-[110] text-white/30 hover:text-[#F2A69A] transition-colors p-4">
              <ChevronRight size={60} strokeWidth={1} />
            </button>
            
            <button onClick={() => setSelectedIndex(null)} className="absolute top-6 right-6 md:top-8 md:right-8 z-[110] text-white/50 bg-white/10 p-2 rounded-full">
              <X size={28} />
            </button>

            <motion.div 
              key={currentBook.id} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center py-8"
            >
              <div className="flex justify-center">
                <div className={`w-56 h-80 md:w-80 md:h-[480px] ${currentBook.color} rounded-[2.5rem] border-4 border-black shadow-[25px_25px_0px_0px_#F2A69A] p-6 md:p-10 flex flex-col justify-between transform rotate-2 relative`}>
                    <img src={LogoTag} alt="Logo" className="absolute top-10 left-10 w-20 opacity-10 grayscale" />
                    <BookOpen size={40} className="text-black/20" />
                    <h3 className="text-2xl md:text-4xl font-black leading-none uppercase tracking-tighter text-black">{currentBook.title}</h3>
                </div>
              </div>

              <div className="text-white space-y-6 md:text-left text-center px-4">
                <header>
                   <span className="text-[#F2A69A] text-[10px] md:text-xs font-black uppercase tracking-[0.5em]">{currentBook.tag}</span>
                   <h2 className="text-3xl md:text-7xl font-black tracking-tighter mt-4 leading-none uppercase">{currentBook.title}</h2>
                   <p className="text-white/40 italic mt-6 text-base md:text-lg">{currentBook.subtitle}</p>
                </header>
                <div className="h-[1px] w-full bg-white/10" />
                <div className="space-y-6 text-sm md:text-xl leading-relaxed text-white/70 font-serif">
                  <p>{currentBook.content}</p>
                </div>
                
                <div className="pt-4 md:pt-8 flex flex-col md:flex-row gap-4">
                  {/* TOMBOL BACA SEKARANG (Warna Default) */}
                  <button className="flex-1 px-10 py-4 bg-white/10 border border-white/20 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">
                    Baca Sekarang
                  </button>

                  {/* TOMBOL PRE-ORDER (Muncul di semua buku, mengarah ke WA) */}
                  <button 
                    onClick={() => handleOrder(currentBook.title)}
                    className="flex-1 group relative px-10 py-4 bg-[#F2A69A] text-black font-black uppercase tracking-widest rounded-xl overflow-hidden transition-all hover:bg-white shadow-[0_0_20px_rgba(242,166,154,0.3)]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <ShoppingBag size={20} />
                      Pre-Order WA
                    </span>
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    />
                  </button>
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
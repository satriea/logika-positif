import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, Save, Layout, CheckCircle, BookOpen, LogOut, Upload, X } from "lucide-react";
import LogoTag from "../assets/images/Lampu.png";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    tag: "New Release",
    color: "#10b981", 
    content: "",
    image: null 
  });

  useEffect(() => {
    const authStatus = sessionStorage.getItem("is_logika_positif_admin");
    if (authStatus === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("is_logika_positif_admin", "true");
      setError("");
    } else {
      setError("Akses Ditolak");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5014/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
        setFormData({ title: "", subtitle: "", tag: "New Release", color: "#10b981", content: "", image: null });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // --- LOGIKA SMART MULTI-CARD (Auto-split berdasarkan paragraf atau panjang teks) ---
  const getContentCards = () => {
    if (!formData.content) return [];

    const maxLength = 300; // Batas karakter agar teks tidak meluap keluar kartu
    const result = [];
    
    // 1. Pisahkan berdasarkan paragraf (Enter)
    const paragraphs = formData.content.split('\n').filter(p => p.trim() !== "");

    paragraphs.forEach((paragraph) => {
      // 2. Jika satu paragraf terlalu panjang, potong otomatis setiap 300 karakter
      if (paragraph.length > maxLength) {
        // Regex untuk membagi string setiap n karakter
        const chunks = paragraph.match(new RegExp(`.{1,${maxLength}}`, 'g'));
        if (chunks) result.push(...chunks);
      } else {
        result.push(paragraph);
      }
    });

    return result;
  };

  if (!isAuthenticated) {
    return (
        <div className="fixed inset-0 w-full h-full bg-[#050505] flex items-center justify-center p-4 font-sans text-white overflow-hidden">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full max-w-[360px] z-10" >
            <div className="relative bg-[#111111] border border-white/10 rounded-[2rem] p-8 shadow-2xl">
              <div className="flex flex-col items-center mb-8">
                <img src={LogoTag} alt="Logo" className="w-12 h-12 mb-4" />
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-center">Portal <span className="text-[#F2A69A]">Penulis</span></h2>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="KODE AKSES" className="w-full bg-black/50 border border-white/5 rounded-xl py-3 text-white text-center tracking-[0.5em] font-black outline-none focus:border-[#F2A69A]/30 transition-all" />
                <button className="w-full bg-[#F2A69A] text-black font-black uppercase py-3.5 rounded-xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"> Masuk <ArrowRight size={16} /> </button>
              </form>
              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] text-center mt-4 font-black uppercase">{error}</motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      );
  }

  return (
    <div className="h-screen bg-[#050505] text-white p-4 lg:p-6 font-sans overflow-hidden italic flex flex-col">
      <header className="max-w-[1800px] w-full mx-auto flex justify-between items-center border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <img src={LogoTag} alt="Logo" className="w-6 h-6" />
            </div>
            <div>
                <h1 className="text-xl font-black uppercase tracking-tighter italic leading-none">Master <span className="text-[#F2A69A]">Dashboard</span></h1>
                <p className="text-white/80 text-[8px] font-bold uppercase tracking-[0.4em] mt-0.5 italic text-white/30">Creative Mode</p>
            </div>
        </div>
        <button onClick={() => {sessionStorage.removeItem("is_logika_positif_admin"); window.location.reload();}} className="px-5 py-2 bg-white/5 hover:bg-red-500/10 rounded-full text-[9px] font-black uppercase border border-white/10 flex items-center gap-2 transition-all">
          <LogOut size={12}/> Logout
        </button>
      </header>
      
      <main className="max-w-[1800px] w-full mx-auto grid xl:grid-cols-12 gap-4 flex-1 overflow-hidden italic">
          
          <section className="xl:col-span-4 bg-[#111111] border border-white/5 p-6 rounded-[2rem] flex flex-col h-full overflow-hidden shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-2 scrollbar-hide flex-1">
                <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-white/90 uppercase tracking-widest ml-1 italic">Judul Karya</label>
                    <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-5 text-base font-black focus:border-[#F2A69A]/40 outline-none transition-all italic placeholder:text-white/5" placeholder="Input Title..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-white/90 uppercase tracking-widest ml-1 italic">Tag</label>
                        <select value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 font-bold text-[10px] uppercase outline-none focus:border-[#F2A69A]/40 appearance-none italic cursor-pointer">
                            <option value="New Release">New Release</option>
                            <option value="Main Edition">Main Edition</option>
                            <option value="Practice">Practice</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-white/90 uppercase tracking-widest ml-1 italic">Pilih Warna</label>
                        <div className="flex gap-2 items-center px-3 bg-black/40 border border-white/5 rounded-xl h-[42px]">
                            <input type="color" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full h-6 bg-transparent cursor-pointer border-none" />
                            <span className="text-[8px] font-mono text-white/90 uppercase">{formData.color}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-white/90 uppercase tracking-widest ml-1 italic">Subtitle</label>
                        <input value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-5 text-xs focus:border-[#F2A69A]/40 outline-none italic" placeholder="Input Subtitle..." />
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-white/90 uppercase tracking-widest ml-1 italic">Upload Gambar Cover</label>
                        <div className="flex gap-2">
                           <button type="button" onClick={() => fileInputRef.current.click()} className="flex-1 bg-white/5 border border-dashed border-white/20 rounded-xl py-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase hover:bg-white/10 transition-all">
                              <Upload size={14}/> {formData.image ? "Ganti Gambar" : "Pilih File"}
                           </button>
                           {formData.image && (
                              <button type="button" onClick={removeImage} className="px-3 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all"><X size={14}/></button>
                           )}
                           <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col">
                    <label className="text-[9px] font-black text-white/90 uppercase tracking-widest ml-1 italic">Konten Narasi</label>
                    <textarea required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full flex-1 bg-black/40 border border-white/5 rounded-2xl py-4 px-6 focus:border-[#F2A69A]/40 outline-none transition-all resize-none italic font-serif text-base leading-relaxed text-white/80 min-h-[120px]" placeholder="Setiap paragraf baru akan menciptakan kartu preview baru..." />
                </div>

                <button type="submit" className="w-full bg-[#F2A69A] text-black font-black uppercase py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shrink-0 italic">
                    {isSuccess ? <CheckCircle size={18} /> : <Save size={18} />} PUBLISH
                </button>
            </form>
          </section>

          <section className="xl:col-span-8 w-full bg-white/[0.01] p-6 rounded-[2.5rem] border border-white/5 h-full overflow-y-auto scrollbar-hide italic flex flex-col gap-8">
             
             <div className="flex items-center gap-3 mb-2 text-white/80 uppercase tracking-[0.4em] text-[8px] font-black italic">
                <Layout size={12} /> Narrative Gallery Preview ({getContentCards().length + 1} Cards)
             </div>

             <div className="flex flex-wrap gap-12 justify-center lg:justify-start">
                
                {/* 1. KARTU UTAMA (COVER) */}
                <div className="shrink-0 scale-[0.85] origin-top">
                    <div className="relative">
                        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-[2.5rem]" />
                        <div className="relative w-[260px] aspect-[3/4.6] rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl border-4 border-black transition-colors" style={{ backgroundColor: formData.color }}>
                            <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                            <div className="flex justify-between items-start relative z-10">
                                <img src={LogoTag} alt="Logo" className="w-10 h-10 grayscale opacity-80" />
                                <span className="text-[8px] font-black uppercase bg-black text-white px-3 py-1.5 rounded-full">{formData.tag}</span>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center">
                                {formData.image ? (
                                    <img src={formData.image} className="w-full h-full object-cover rounded-2xl rotate-3 shadow-2xl border-2 border-black" alt="Main" />
                                ) : (
                                    <div className="w-16 h-16 bg-black/10 rounded-full blur-2xl" />
                                )}
                            </div>
                            <div className="relative z-10 space-y-2 text-black text-center">
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic break-words leading-none">{formData.title || "JUDUL"}</h3>
                                <div className="w-full h-[1px] bg-black/20" />
                                <p className="text-[9px] font-bold uppercase italic leading-tight opacity-50">{formData.subtitle || "Cover Card"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. KARTU KONTEN DINAMIS (Auto Pagination) */}
                <AnimatePresence>
                    {getContentCards().map((text, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="shrink-0 scale-[0.85] origin-top"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-[2.5rem]" />
                                <div className="relative w-[260px] aspect-[3/4.6] bg-white rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl border-4 border-black">
                                    <div className="flex justify-between items-center relative z-10 text-black/20">
                                        <BookOpen size={14} />
                                        <span className="text-[8px] font-black uppercase tracking-widest italic text-black/40">Part {index + 1}</span>
                                    </div>

                                    <div className="relative z-10 flex flex-col items-center text-justifiy">
                                        <div className="w-1 bg-black/5 h-8 mb-4 rounded-full" />
                                        <p className="text-[13px] font-serif italic font-bold text-black/80 leading-relaxed break-words">
                                            "{text}"
                                        </p>
                                        <div className="w-1 bg-black/5 h-8 mt-4 rounded-full" />
                                    </div>

                                    <div className="relative z-10 space-y-2 text-black/40">
                                        <div className="w-full h-[1px] bg-black/5" />
                                        <p className="text-[8px] font-black uppercase text-center tracking-widest italic">{formData.title || "Untitled"}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

             </div>
          </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
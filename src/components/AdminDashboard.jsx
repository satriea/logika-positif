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
    color: "#10b981", // Kita ganti ke hex agar dinamis
    content: "",
    image: null // Untuk menyimpan preview gambar
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

  // --- LOGIKA UPLOAD GAMBAR ---
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
    // Catatan: Jika ingin menyimpan gambar ke database, Anda perlu mengirim FormData 
    // atau mengubah gambar ke Base64 (untuk gambar kecil).
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

  if (!isAuthenticated) {
    return (
        <div className="fixed inset-0 w-full h-full bg-[#050505] flex items-center justify-center p-4 font-sans text-white overflow-hidden">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[360px] z-10" >
            <div className="relative bg-[#111111] border border-white/10 rounded-[2rem] p-8 shadow-2xl">
              <div className="flex flex-col items-center mb-8">
                <img src={LogoTag} alt="Logo" className="w-12 h-12 mb-4" />
                <h2 className="text-xl font-black uppercase tracking-tighter italic">Portal <span className="text-[#F2A69A]">Penulis</span></h2>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="KODE AKSES" className="w-full bg-black/50 border border-white/5 rounded-xl py-3 text-white text-center tracking-[0.5em] font-black outline-none focus:border-[#F2A69A]/30 transition-all" />
                <button className="w-full bg-[#F2A69A] text-black font-black uppercase py-3.5 rounded-xl flex items-center justify-center gap-3"> Masuk <ArrowRight size={16} /> </button>
              </form>
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
                <h1 className="text-xl font-black uppercase tracking-tighter italic">Master <span className="text-[#F2A69A]">Dashboard</span></h1>
                <p className="text-white/30 text-[8px] font-bold uppercase tracking-[0.4em] mt-0.5 italic">Creative Mode</p>
            </div>
        </div>
        <button onClick={() => {sessionStorage.removeItem("is_logika_positif_admin"); window.location.reload();}} className="px-5 py-2 bg-white/5 hover:bg-red-500/10 rounded-full text-[9px] font-black uppercase border border-white/10 flex items-center gap-2 transition-all">
          <LogOut size={12}/> Logout
        </button>
      </header>
      
      <main className="max-w-[1800px] w-full mx-auto grid xl:grid-cols-12 gap-4 flex-1 overflow-hidden italic">
          
          {/* INPUT SECTION */}
          <section className="xl:col-span-4 bg-[#111111] border border-white/5 p-6 rounded-[2rem] flex flex-col h-full overflow-hidden shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-2 scrollbar-hide flex-1">
                
                {/* Title */}
                <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1 italic">Judul Karya</label>
                    <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-5 text-base font-black focus:border-[#F2A69A]/40 outline-none transition-all italic" />
                </div>

                {/* Tag & Color Picker Dinamis */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1 italic">Tag</label>
                        <select value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 font-bold text-[10px] uppercase outline-none focus:border-[#F2A69A]/40 appearance-none italic cursor-pointer">
                            <option value="New Release">New Release</option>
                            <option value="Main Edition">Main Edition</option>
                            <option value="Practice">Practice</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1 italic">Pilih Warna</label>
                        <div className="flex gap-2 items-center px-3 bg-black/40 border border-white/5 rounded-xl h-[42px]">
                            <input 
                              type="color" 
                              value={formData.color} 
                              onChange={(e) => setFormData({...formData, color: e.target.value})}
                              className="w-full h-6 bg-transparent cursor-pointer border-none"
                            />
                            <span className="text-[8px] font-mono text-white/40 uppercase">{formData.color}</span>
                        </div>
                    </div>
                </div>

                {/* Subtitle & Image Upload */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1 italic">Subtitle</label>
                        <input value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-5 text-xs focus:border-[#F2A69A]/40 outline-none italic" />
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1 italic">Upload Gambar Cover</label>
                        <div className="flex gap-2">
                           <button 
                              type="button" 
                              onClick={() => fileInputRef.current.click()}
                              className="flex-1 bg-white/5 border border-dashed border-white/20 rounded-xl py-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase hover:bg-white/10 transition-all"
                           >
                              <Upload size={14}/> {formData.image ? "Ganti Gambar" : "Pilih File"}
                           </button>
                           {formData.image && (
                              <button type="button" onClick={removeImage} className="px-3 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all">
                                <X size={14}/>
                              </button>
                           )}
                           <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1 flex flex-col">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1 italic">Konten Narasi</label>
                    <textarea required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full flex-1 bg-black/40 border border-white/5 rounded-2xl py-4 px-6 focus:border-[#F2A69A]/40 outline-none transition-all resize-none italic font-serif text-base leading-relaxed text-white/80 min-h-[120px]" />
                </div>

                <button type="submit" className="w-full bg-[#F2A69A] text-black font-black uppercase py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shrink-0 italic">
                    {isSuccess ? <CheckCircle size={18} /> : <Save size={18} />} PUBLISH
                </button>
            </form>
          </section>

          {/* PREVIEW SECTION */}
          <section className="xl:col-span-8 w-full flex flex-row gap-6 items-start bg-white/[0.01] p-6 rounded-[2.5rem] border border-white/5 h-full overflow-hidden italic">
             
             {/* COVER PREVIEW */}
             <div className="shrink-0 scale-[0.85] origin-top">
                <div className="flex items-center gap-3 mb-4 text-white/10 uppercase tracking-[0.4em] text-[8px] font-black italic">
                    <Layout size={12} /> Cover View
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-[2.5rem]" />
                    <div 
                      className="relative w-[260px] aspect-[3/4.6] rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl border-4 border-black transition-colors duration-500"
                      style={{ backgroundColor: formData.color }}
                    >
                        <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                        <div className="flex justify-between items-start relative z-10">
                            <img src={LogoTag} alt="Logo" className="w-10 h-10 grayscale opacity-80" />
                            <span className="text-[8px] font-black uppercase bg-black text-white px-3 py-1.5 rounded-full">{formData.tag}</span>
                        </div>

                        {/* GAMBAR TENGAH DINAMIS */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center">
                            {formData.image ? (
                                <motion.img 
                                  initial={{ scale: 0.8, opacity: 0 }} 
                                  animate={{ scale: 1, opacity: 1 }}
                                  src={formData.image} 
                                  className="w-full h-full object-cover rounded-2xl rotate-3 shadow-2xl border-2 border-black" 
                                />
                            ) : (
                                <div className="w-16 h-16 bg-black/10 rounded-full blur-2xl animate-pulse" />
                            )}
                        </div>

                        <div className="relative z-10 space-y-2">
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-black italic break-words">{formData.title || "JUDUL"}</h3>
                            <div className="w-full h-[1px] bg-black/20" />
                            <p className="text-[9px] font-bold text-black/50 uppercase tracking-[0.1em] italic leading-tight">{formData.subtitle || "Subtitle..."}</p>
                        </div>
                    </div>
                </div>
             </div>

             {/* READING MODE PREVIEW */}
             <div className="flex-1 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4 text-white/10 uppercase tracking-[0.4em] text-[8px] font-black italic">
                    <BookOpen size={12} /> Reading Mode
                </div>
                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 overflow-y-auto scrollbar-hide">
                    <header className="space-y-4 text-center mb-10">
                        <span className="text-[#F2A69A] text-[9px] font-black uppercase tracking-[0.4em] italic">{formData.tag}</span>
                        <h2 className="text-4xl font-black uppercase italic leading-none">{formData.title || "Judul Utama"}</h2>
                        
                        {/* Preview Gambar di Dalam Konten */}
                        {formData.image && (
                           <div className="flex justify-center my-6">
                              <img src={formData.image} className="max-w-[150px] rounded-xl shadow-xl border border-white/10" alt="Preview" />
                           </div>
                        )}
                        
                        <p className="text-white/40 italic text-sm">{formData.subtitle || "Subtitle..."}</p>
                    </header>
                    <div className="h-[1.5px] w-16 mx-auto bg-[#F2A69A]/20 mb-8 rounded-full" />
                    <div className="space-y-6 text-white/60 font-serif italic text-lg leading-relaxed text-center px-4">
                        {formData.content ? formData.content.split('\n').map((line, i) => <p key={i}>{line}</p>) : <p className="text-white/5">Isi narasi...</p>}
                    </div>
                </div>
             </div>
          </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
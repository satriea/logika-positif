import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, ArrowRight, Save, Layout, CheckCircle, 
  BookOpen, LogOut, Upload, X, Loader2, User 
} from "lucide-react";
import LogoTag from "../assets/images/Lampu.png";
import { API_ENDPOINTS } from "../utility/apiConfig";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [username, setUsername] = useState(""); 
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
    image: null,      // Untuk preview UI (Base64/URL)
    imageFile: null   // PENTING: Untuk menyimpan file asli yang akan dikirim ke server
  });

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    const storedUser = sessionStorage.getItem("user_info");
    if (token) {
      setIsAuthenticated(true);
      if (storedUser) setAdminInfo(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("admin_token", data.token);
        sessionStorage.setItem("user_info", JSON.stringify(data.user));
        setAdminInfo(data.user);
        setIsAuthenticated(true);
      } else {
        setError(data.message || "Akses Ditolak");
      }
    } catch (err) {
      setError("Koneksi ke server gagal");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("user_info");
    setIsAuthenticated(false);
    setAdminInfo(null);
    setUsername("");
    setPassword("");
  };

  // --- HANDLER IMAGE (SEKARANG MENYIMPAN FILE ASLI) ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simpan file asli untuk dikirim ke backend
      setFormData(prev => ({ ...prev, imageFile: file }));

      // Buat preview untuk UI dashboard
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null, imageFile: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- SUBMIT FORM MENGGUNAKAN FORMDATA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("admin_token");

    if (!formData.content) return alert("Konten narasi tidak boleh kosong!");

    setIsLoading(true);
    
    // Gunakan FormData karena kita mengirim FILE, bukan sekedar teks JSON
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("subtitle", formData.subtitle);
    dataToSend.append("tag", formData.tag);
    dataToSend.append("color", formData.color);
    dataToSend.append("content", formData.content);
    
    // Append file gambar jika ada
    if (formData.imageFile) {
      dataToSend.append("image", formData.imageFile);
    }

    try {
      const response = await fetch(API_ENDPOINTS.BOOKS, {
        method: "POST",
        headers: {
          // PENTING: Jangan tambahkan 'Content-Type', browser akan otomatis
          // mengaturnya menjadi 'multipart/form-data' dengan boundary yang benar.
          "Authorization": `Bearer ${token}`
        },
        body: dataToSend,
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
        // Reset Form
        setFormData({
          title: "", subtitle: "", tag: "New Release",
          color: "#10b981", content: "", image: null, imageFile: null
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Gagal menyimpan data.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  const getContentCards = () => {
    if (!formData.content) return [];
    const maxLength = 300;
    const result = [];
    const paragraphs = formData.content.split('\n').filter(p => p.trim() !== "");

    paragraphs.forEach((paragraph) => {
      if (paragraph.length > maxLength) {
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
      <div className="fixed inset-0 w-full h-full bg-[#050505] flex items-center justify-center p-4 font-sans text-white overflow-hidden italic">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[380px] z-10">
          <div className="relative bg-[#111111] border border-white/10 rounded-[3rem] p-10 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <img src={LogoTag} alt="Logo" className="w-14 h-14 mb-4 drop-shadow-xl" />
              <h2 className="text-2xl font-black uppercase tracking-tighter italic text-center">Portal <span className="text-[#F2A69A]">Admin</span></h2>
              <p className="text-[8px] tracking-[0.4em] opacity-30 mt-2 font-bold uppercase text-center">Identity Verification Required</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#F2A69A] transition-colors">
                    <User size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="USERNAME" 
                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold outline-none focus:border-[#F2A69A]/40 transition-all uppercase tracking-widest placeholder:tracking-normal placeholder:opacity-20" 
                />
              </div>

              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#F2A69A] transition-colors">
                    <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="PASSWORD" 
                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold outline-none focus:border-[#F2A69A]/40 transition-all tracking-[0.3em] placeholder:tracking-normal placeholder:opacity-20" 
                />
              </div>

              <button 
                disabled={isLoading}
                className="w-full bg-[#F2A69A] text-black font-black uppercase py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all hover:bg-white disabled:opacity-50 mt-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Akses Dashboard <ArrowRight size={18} /></>}
              </button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-[10px] text-center mt-6 font-black uppercase tracking-widest">{error}</motion.p>
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
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
            <img src={LogoTag} alt="Logo" className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter italic leading-none">
              {adminInfo?.username || "Master"} <span className="text-[#F2A69A]">Dashboard</span>
            </h1>
            <p className="text-[8px] font-bold uppercase tracking-[0.4em] mt-1 text-white/30 italic">Role: {adminInfo?.role || "Admin"}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="px-6 py-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-full text-[10px] font-black uppercase border border-white/10 flex items-center gap-2 transition-all group">
          <LogOut size={14} className="group-hover:rotate-12 transition-transform"/> Logout
        </button>
      </header>
      
      <main className="max-w-[1800px] w-full mx-auto grid xl:grid-cols-12 gap-6 flex-1 overflow-hidden">
        <section className="xl:col-span-4 bg-[#111111] border border-white/5 p-8 rounded-[3rem] flex flex-col h-full overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Save size={120} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto pr-2 scrollbar-hide flex-1 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Judul Karya</label>
              <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-base font-black focus:border-[#F2A69A]/40 outline-none transition-all placeholder:text-white/5" placeholder="The Silent Forest..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Tag</label>
                <select value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 px-5 font-bold text-[11px] uppercase outline-none focus:border-[#F2A69A]/40 appearance-none cursor-pointer">
                  <option value="New Release">New Release</option>
                  <option value="Main Edition">Main Edition</option>
                  <option value="Practice">Practice</option>
                  <option value="Coming Soon">Coming Soon</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Accent Color</label>
                <div className="flex gap-3 items-center px-4 bg-black/40 border border-white/5 rounded-2xl h-[52px]">
                  <input type="color" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-8 h-8 bg-transparent cursor-pointer border-none scale-125" />
                  <span className="text-[10px] font-mono text-white/60 uppercase">{formData.color}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Subtitle</label>
              <input value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-[11px] focus:border-[#F2A69A]/40 outline-none" placeholder="A journey of thousand miles..." />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Cover Image</label>
              <div className="flex gap-3">
                 <button type="button" onClick={() => fileInputRef.current.click()} className="flex-1 bg-white/5 border border-dashed border-white/10 rounded-2xl py-3 flex items-center justify-center gap-3 text-[11px] font-black uppercase hover:bg-white/10 transition-all">
                    <Upload size={16}/> {formData.image ? "Change" : "Upload Image"}
                 </button>
                 {formData.image && (
                    <button type="button" onClick={removeImage} className="px-4 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition-all"><X size={18}/></button>
                 )}
                 <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
            </div>

            <div className="space-y-2 flex-1 flex flex-col min-h-[200px]">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Narration Content</label>
              <textarea required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full flex-1 bg-black/40 border border-white/5 rounded-[2rem] py-5 px-7 focus:border-[#F2A69A]/40 outline-none transition-all resize-none italic font-serif text-base leading-relaxed text-white/80 scrollbar-hide" placeholder="Tuliskan ceritamu..." />
            </div>

            <button type="submit" disabled={isLoading} className={`w-full font-black uppercase py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shrink-0 ${isLoading ? "bg-white/10 text-white/20" : "bg-[#F2A69A] text-black hover:bg-white hover:scale-[1.02]"}`}>
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : isSuccess ? <CheckCircle size={20} /> : <Save size={20} />}
              <span className="tracking-widest">{isLoading ? "Processing" : isSuccess ? "Success" : "Publish Work"}</span>
            </button>
          </form>
        </section>

        <section className="xl:col-span-8 w-full bg-white/[0.01] p-8 rounded-[3.5rem] border border-white/5 h-full overflow-y-auto scrollbar-hide flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white/40 uppercase tracking-[0.5em] text-[9px] font-black">
                <Layout size={14} /> Live Gallery Preview
              </div>
              <div className="bg-white/5 px-4 py-1.5 rounded-full text-[9px] font-black text-[#F2A69A]">
                {getContentCards().length + 1} TOTAL CARDS
              </div>
            </div>

            <div className="flex flex-wrap gap-16 justify-center lg:justify-start pb-20">
              <div className="shrink-0 scale-90 lg:scale-100 origin-top">
                <div className="relative group">
                  <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-[3rem] blur-sm opacity-50" />
                  <div className="relative w-[280px] aspect-[3/4.8] rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden shadow-2xl border-[6px] border-black transition-all" style={{ backgroundColor: formData.color }}>
                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                    <div className="flex justify-between items-start relative z-10">
                      <img src={LogoTag} alt="Logo" className="w-12 h-12 grayscale brightness-0" />
                      <span className="text-[9px] font-black uppercase bg-black text-white px-4 py-2 rounded-full tracking-tighter">{formData.tag}</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 flex items-center justify-center">
                      {formData.image ? (
                        <motion.img initial={{ scale: 0.8, rotate: -5 }} animate={{ scale: 1, rotate: 3 }} src={formData.image} className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-black" />
                      ) : (
                        <div className="w-20 h-20 bg-black/10 rounded-full blur-3xl animate-pulse" />
                      )}
                    </div>
                    <div className="relative z-10 space-y-3 text-black text-center">
                      <h3 className="text-3xl font-black uppercase tracking-tighter leading-none break-words px-2">{formData.title || "Untitled"}</h3>
                      <div className="w-12 h-[2px] bg-black/30 mx-auto rounded-full" />
                      <p className="text-[10px] font-bold uppercase italic opacity-40 line-clamp-2">{formData.subtitle || "Narrative Series"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {getContentCards().map((text, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="shrink-0 scale-90 lg:scale-100 origin-top">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-[3rem] blur-sm opacity-20" />
                      <div className="relative w-[280px] aspect-[3/4.8] bg-white rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden shadow-2xl border-[6px] border-black">
                        <div className="flex justify-between items-center relative z-10 text-black/10">
                          <BookOpen size={18} />
                          <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Part {index + 1}</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-1.5 bg-[#F2A69A] h-10 mb-6 rounded-full" />
                          <p className="text-[15px] font-serif italic font-bold text-black/80 leading-relaxed text-center">"{text}"</p>
                          <div className="w-1.5 bg-black/5 h-10 mt-6 rounded-full" />
                        </div>
                        <div className="relative z-10 space-y-3 text-black/20">
                          <div className="w-full h-[1px] bg-black/5" />
                          <p className="text-[9px] font-black uppercase text-center tracking-[0.2em]">{formData.title || "Logika Positif"}</p>
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
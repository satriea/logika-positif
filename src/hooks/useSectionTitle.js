import { useState, useEffect, useCallback, useRef } from 'react';

const sectionTitles = {
  home: 'Beranda',
  about: 'Tentang',
  books: 'Buku',
  reviews: 'Esai',
  forum: 'Forum',
  team: 'Tim'
};

export default function useSectionTitle() {
  const [activeTitle, setActiveTitle] = useState(sectionTitles.home);
  const isManualRef = useRef(false); // Penanda apakah sedang klik manual

  const setManualTitle = useCallback((id) => {
    if (sectionTitles[id]) {
      isManualRef.current = true; // Kunci agar observer tidak ganggu
      setActiveTitle(sectionTitles[id]);

      // Buka kunci setelah 1 detik (setelah scroll selesai)
      setTimeout(() => {
        isManualRef.current = false;
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll('main section[id], main div[id]')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualRef.current) return; // JANGAN jalankan jika user sedang klik menu

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const id = entry.target.id;
            if (sectionTitles[id]) {
              setActiveTitle(sectionTitles[id]);
            }
          }
        });
      },
      { threshold: [0.5, 0.8], rootMargin: '-10% 0px -70% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return { activeTitle, setManualTitle };
}

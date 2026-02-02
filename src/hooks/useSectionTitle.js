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
  const isManualRef = useRef(false);

  const setManualTitle = useCallback((input) => {
    isManualRef.current = true;

    // Cek apakah input itu ID (home) atau Label (Beranda)
    const foundByLabel = Object.values(sectionTitles).find(
      (val) => val === input
    );
    const foundById = sectionTitles[input];

    if (foundByLabel) {
      setActiveTitle(foundByLabel);
    } else if (foundById) {
      setActiveTitle(foundById);
    }

    setTimeout(() => {
      isManualRef.current = false;
    }, 1000);
  }, []);

  useEffect(() => {
    // Pastikan selector ini mengenai id yang ada di AnimateSection
    const sections = document.querySelectorAll(
      'section[id], main[id], div[id]'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualRef.current) return;

        entries.forEach((entry) => {
          // Perkecil threshold agar lebih sensitif saat scroll cepat
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (sectionTitles[id]) {
              setActiveTitle(sectionTitles[id]);
            }
          }
        });
      },
      {
        threshold: 0.2, // Lebih sensitif
        rootMargin: '-25% 0px -65% 0px'
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return { activeTitle, setManualTitle };
}

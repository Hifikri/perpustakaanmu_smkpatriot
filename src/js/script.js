window.onscroll = function () {
  // 1. Ambil semua elemen yang kita butuhkan
  const header = document.querySelector("header");
  const toTop = document.querySelector("#to-top"); // Tombol Back-to-Top
  const scrollPosition = window.pageYOffset; // Simpan posisi scroll saat ini

  // --- LOGIKA UNTUK NAVBAR (PUTIH ATAU BLUR) ---
  // Pemicunya adalah > 0 pixel
  if (scrollPosition > 0) {
    // Jika sudah di-scroll (walaupun sedikit), tambahkan blur.
    header.classList.add("navbar-blur");
  } else {
    // Jika kembali di posisi paling atas (0), hapus blur agar jadi putih.
    header.classList.remove("navbar-blur");
  }

  // --- LOGIKA UNTUK TOMBOL BTT (HILANG ATAU MUNCUL) ---
  // Pemicunya adalah > 100 pixel (angka ini bisa Anda ubah)
  if (toTop) {
    // Pastikan elemen #to-top ada
    if (scrollPosition > 100) {
      // Jika sudah di-scroll cukup jauh, tampilkan tombol BTT.
      toTop.classList.remove("hidden");
      toTop.classList.add("flex");
    } else {
      // Jika masih di area atas, sembunyikan tombol BTT.
      toTop.classList.remove("flex");
      toTop.classList.add("hidden");
    }
  }
};

//typingText
const texts = ["Mudah", "Cepat", "Nyaman", "Praktis", "Efisien"];
const typingText = document.getElementById("typingText");
let index = 0;
let charIndex = 0;
let isDeleting = false;
let currentText = texts[index];

function type() {
  if (typingText) {
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex--);
    } else {
      typingText.textContent = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), 1000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
      currentText = texts[index];
    }

    const speed = isDeleting ? 40 : 80;
    setTimeout(type, speed);
  }
}

document.addEventListener("DOMContentLoaded", type);

// Sweeper.Js
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".testimonial-swiper", {
    loop: true,
    grabCursor: true,

    slidesPerView: 1,
    spaceBetween: 24,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
});

// --- PENGUMUMAN BERJALAN (SETUP FRONTEND) ---

document.addEventListener("DOMContentLoaded", function () {
  const dummyAnnouncements = [
    "Pengembalian buku paket kelas XII paling lambat tanggal 20 Juni 2025. Harap tidak ada keterlambatan.",
    "Selamat! Perpustakaan SMK Model Patriot IV Ciawigebang meraih Akreditasi A tingkat nasional.",
    "Diharapkan untuk seluruh siswa agar menjaga ketenangan dan kebersihan di area perpustakaan. Terima kasih.",
  ];

  const announcementTextElement = document.getElementById("announcement-text");
  let currentAnnouncementIndex = 0;

  // Durasi animasi marquee dari input.css adalah 20s
  // Kita akan menggunakan ini sebagai dasar waktu tunggu sebelum ganti pengumuman
  const marqueeAnimationDuration = 20000; // 20 detik dalam milidetik

  function showNextAnnouncement() {
    if (!announcementTextElement || dummyAnnouncements.length === 0) {
      announcementTextElement.textContent = "Tidak ada pengumuman saat ini.";
      return;
    }

    // Set teks pengumuman
    announcementTextElement.textContent = dummyAnnouncements[currentAnnouncementIndex];

    // Reset animasi dengan membuat dan menghapus kelas, atau mengubah properti
    // Ini memaksa browser untuk "memulai ulang" animasi CSS
    announcementTextElement.style.animation = "none";
    announcementTextElement.offsetHeight; /* trigger reflow */
    announcementTextElement.style.animation = ""; // Memulai ulang animasi marquee yang ada di CSS

    // Pindah ke pengumuman berikutnya setelah durasi animasi selesai
    setTimeout(() => {
      currentAnnouncementIndex = (currentAnnouncementIndex + 1) % dummyAnnouncements.length;
      showNextAnnouncement(); // Panggil fungsi lagi untuk menampilkan pengumuman berikutnya
    }, marqueeAnimationDuration);
  }

  // Mulai pengumuman pertama kali
  if (announcementTextElement) {
    showNextAnnouncement();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  // -- ELEMEN GLOBAL --
  const viewport = document.getElementById("carousel-viewport");
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const originalItems = Array.from(track.children);

  let currentCarouselState = {}; // Untuk menyimpan state carousel saat ini

  // -- FUNGSI UTAMA UNTUL MEMBANGUN CAROUSEL --
  function initCarousel() {
    let isMoving = false;

    // 1. Tentukan jumlah item berdasarkan ukuran layar
    const getItemsToShow = () => {
      if (window.innerWidth >= 1024) return 4; // lg (Desktop)
      if (window.innerWidth >= 768) return 2; // md (Tablet)
      return 1; // Default (HP)
    };

    const itemsToShow = getItemsToShow();

    // Jangan jalankan jika item tidak cukup
    if (originalItems.length <= itemsToShow) {
      viewport.style.visibility = "hidden"; // Sembunyikan jika tidak perlu carousel
      return;
    } else {
      viewport.style.visibility = "visible";
    }

    // Simpan state saat ini untuk perbandingan saat resize
    currentCarouselState.items = itemsToShow;

    // Reset track dengan item original
    track.innerHTML = "";
    originalItems.forEach((item) => track.appendChild(item.cloneNode(true)));

    // 2. KLONING ITEM UNTUK EFEK INFINITE
    const items = Array.from(track.children);
    // Kloning item terakhir dan taruh di awal
    for (let i = 0; i < itemsToShow; i++) {
      const clone = items[items.length - 1 - i].cloneNode(true);
      track.prepend(clone);
    }
    // Kloning item pertama dan taruh di akhir
    for (let i = 0; i < itemsToShow; i++) {
      const clone = items[i].cloneNode(true);
      track.append(clone);
    }

    const allItems = Array.from(track.children);
    let currentIndex = itemsToShow;

    // 3. ATUR POSISI AWAL
    const updatePosition = () => {
      const itemWidth = track.clientWidth / itemsToShow;
      track.style.transition = "none";
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease-in-out";
      }, 50);
    };
    updatePosition(); // Panggil untuk set posisi awal

    // 4. FUNGSI NAVIGASI
    const moveSlide = (direction) => {
      if (isMoving) return;
      isMoving = true;
      currentIndex += direction;
      const itemWidth = track.clientWidth / itemsToShow;
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };

    // Buat event listener baru untuk tombol (hapus yang lama jika ada)
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    newNextBtn.addEventListener("click", () => moveSlide(1));

    const newPrevBtn = prevBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    newPrevBtn.addEventListener("click", () => moveSlide(-1));

    // 5. RESET POSISI SETELAH ANIMASI
    track.ontransitionend = () => {
      isMoving = false;
      if (currentIndex >= items.length + itemsToShow) {
        currentIndex = itemsToShow;
        updatePosition();
      }
      if (currentIndex < itemsToShow) {
        currentIndex = items.length + itemsToShow - 1;
        updatePosition();
      }
    };

    // Simpan fungsi update untuk digunakan saat resize
    currentCarouselState.updateFunc = updatePosition;
  }

  // -- EVENT LISTENER UNTUK RESIZE --
  let resizeTimer;
  window.addEventListener("resize", () => {
    // Debounce: Tunda eksekusi agar tidak berjalan terus-menerus saat resize
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newItemsToShow = (() => {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 2;
        return 1;
      })();

      // Hanya bangun ulang carousel jika jumlah item yang ditampilkan berubah
      if (newItemsToShow !== currentCarouselState.items) {
        initCarousel();
      } else if (currentCarouselState.updateFunc) {
        // Jika tidak, cukup update posisi (lebar item mungkin berubah)
        currentCarouselState.updateFunc();
      }
    }, 250);
  });

  // -- INISIALISASI PERTAMA KALI --
  initCarousel();
});

// LN Dashboard
// Ambil elemen dari HTML
const themeToggleBtn = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

// Fungsi untuk mengaplikasikan tema
const applyTheme = (theme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  }
};

// Cek tema yang tersimpan di localStorage atau preferensi sistem pengguna saat halaman dimuat
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  applyTheme(savedTheme);
} else if (prefersDark) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

// Tambahkan event listener pada tombol
themeToggleBtn.addEventListener("click", () => {
  // Cek apakah mode gelap sedang aktif
  const isDarkMode = document.documentElement.classList.contains("dark");

  if (isDarkMode) {
    applyTheme("light");
    localStorage.setItem("theme", "light");
  } else {
    applyTheme("dark");
    localStorage.setItem("theme", "dark");
  }
});

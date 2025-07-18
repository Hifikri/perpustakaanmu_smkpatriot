document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("chart-line").getContext("2d");

  const myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      datasets: [
        {
          label: "Pengunjung",
          data: [1500, 1800, 2200, 2000, 2500, 2800, 2600, 3000, 3200, 3100, 2900, 3500], // Contoh data hipotetis
          borderColor: "rgb(5, 150, 105)", // Warna emerald-600
          backgroundColor: "rgba(5, 150, 105, 0.2)",
          tension: 0.4, // Membuat garis lebih melengkung
          fill: false, // Agar tidak ada area yang diisi di bawah garis
        },
        {
          label: "Peminjam Buku",
          data: [300, 400, 550, 500, 600, 650, 580, 700, 750, 720, 680, 800], // Contoh data hipotetis
          borderColor: "rgb(59, 130, 246)", // Warna blue-500
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.4,
          fill: false,
        },
        {
          label: "Pengembalian Buku",
          data: [280, 380, 500, 480, 580, 630, 550, 680, 720, 700, 650, 780], // Contoh data hipotetis
          borderColor: "rgb(234, 88, 12)", // Warna orange-600
          backgroundColor: "rgba(234, 88, 12, 0.2)",
          tension: 0.4,
          fill: false,
        },
        {
          label: "Peminjaman & Pengembalian Barang",
          data: [50, 60, 80, 70, 90, 100, 85, 110, 120, 115, 105, 130], // Contoh data hipotetis
          borderColor: "rgb(139, 92, 246)", // Warna violet-500
          backgroundColor: "rgba(139, 92, 246, 0.2)",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#333",
          },
        },
        title: {
          display: true,
          text: "Statistik Perpustakaan Bulanan", // Judul chart
          color: "#333",
          font: {
            size: 18,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Jumlah",
            color: "#333",
          },
          ticks: {
            color: "#666",
          },
          grid: {
            color: "rgba(200, 200, 200, 0.2)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Bulan",
            color: "#333",
          },
          ticks: {
            color: "#666",
          },
          grid: {
            color: "rgba(200, 200, 200, 0.2)",
          },
        },
      },
    },
  });
});

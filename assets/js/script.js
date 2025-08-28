AOS.init()

// ==============================
// Music Setup
// ==============================
var tempMusic = ''; // isi URL musik kalau mau ganti
var music = document.querySelector('.music');
if (tempMusic) {
    music.src = tempMusic;
}

// ==============================
// Door Mulai
// ==============================
function mulai() {
    // Pastikan posisi di atas
    window.scrollTo(0, 0);

    // Mainkan suara pintu
    var soundDoor = document.querySelector('.sound-door');
    if (soundDoor) soundDoor.play();

    // Ambil elemen door section
    var doorSection = $('.door-selection');
    var doors = document.querySelectorAll('.door');

    // Animasi pintu kiri & kanan
    doors.forEach(function (door, index) {
        if (index === 0) {
            door.style.transform = 'rotateY(-100deg)'; // pintu kiri
        } else {
            door.style.transform = 'rotateY(100deg)';  // pintu kanan
        }
        door.style.transition = "transform 1s ease"; // kasih transisi biar smooth
    });

    // Mainkan musik setelah pintu terbuka
    setTimeout(function () {
        if (typeof music !== "undefined") music.play();
        doorSection.css({
            "transform": "scale(6)",
            "transition": "transform 1s ease"
        });
    }, 600);

    // Hilangkan door section setelah animasi selesai
    setTimeout(function () {
        doorSection.css({
            "opacity": 0,
            "visibility": "hidden",
            "transition": "opacity 1s ease"
        });

        // Aktifkan scroll body setelah pintu hilang
        $("body").removeClass("overflow-hidden").addClass("transition");

        // Bener-bener hilangkan elemen
        setTimeout(function () {
            doorSection.css("display", "none");
        }, 1000); // tunggu transisi opacity
    }, 2000);
}


// ==============================
// Button Music Toggle
// ==============================
var isPlaying = true;

function toggleMusic(event) {
    event.preventDefault();

    const musicButton = document.getElementById('music-button');

    if (isPlaying) {
        musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>';
        musicButton.classList.remove('rotate');
        musicButton.style.transform = 'translateY(0)';
        music.pause();
    } else {
        musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>';
        musicButton.classList.add('rotate');
        music.play();
    }

    isPlaying = !isPlaying;
}

// Countdown
var countdownDate = new Date("Sep 25, 2025 08:00:00").getTime();

var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countdownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown-wedding').innerHTML = `
        <div class="col-lg-1 col-3">
            <div class="text-center p-2 rounded text-light">
                <h5>${days}</h5> Hari
            </div>
        </div>
        <div class="col-lg-1 col-3">
            <div class="text-center p-2 rounded text-light">
                <h5>${hours}</h5> Jam
            </div>
        </div>
        <div class="col-lg-1 col-3">
            <div class="text-center p-2 rounded text-light">
                <h5>${minutes}</h5> Menit
            </div>
        </div>
        <div class="col-lg-1 col-3">
            <div class="text-center p-2 rounded text-light">
                <h5>${seconds}</h5> Detik
            </div>
        </div>
    `;

    // Kalau countdown sudah selesai
    if (distance < 0) {
        clearInterval(x);
        document.getElementById('countdown-wedding').innerHTML =
            `<span class="text-center p-3 rounded text-light m-2">
                <h2>Sudah Dimulai!</h2>
            </span>`;
    }
}, 1000);

// Nama sambutan 
const urlParams = new URLSearchParams(window.location.search);
const panggilan = urlParams.get('p') || ''; // biar ga error kalau kosong
const nama = urlParams.get('n') || '';
const namaSambutan = document.querySelector('#nama-sambutan');
namaSambutan.innerText = `${panggilan} ${nama}`.trim();


// copy text
function copyText(el) {
    // Ambil isi nomor rekening/nomor hp
    var content = jQuery(el).siblings(`div.card-container`).find(`div.card-number`).text().trim();

    // Hilangkan spasi
    content = content.replace(/\s+/g, '');

    // Buat textarea temporer
    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = content;
    temp.select();

    // Copy ke clipboard
    document.execCommand("copy");

    // Hapus textarea
    document.body.removeChild(temp);

    // Ubah tombol jadi teks sukses
    jQuery(el).text(`Berhasil di copy`);

    // Balikin ke icon copy setelah 2 detik
    setTimeout(function () {
        jQuery(el).html(`<i class="fas fa-fw fa-copy">copy</i>`);
    }, 2000);
}


// RSVP
window.addEventListener("load", function () {
    const form = document.getElementById("rsvp-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault()

        const status = document.getElementById("status").value;
        const nama = document.getElementById("nama").value.trim();

        // Validasi nama
        if (nama === "") {
            Swal.fire({
                icon: "error",
                text: "Nama harus diisi"
            });
            return;
        }

        // Validasi status
        if (status == "") {
            Swal.fire({
                icon: "error",
                text: "Pilih salah satu status terlebih dahulu"
            })
            return;
        }

        const data = new FormData(form);
        const action = e.target.action;
        const input = form.querySelectorAll("input, select, button")
        // Disable semua input
        input.forEach(input => {
            input.disabled = true
        })

        fetch(action, {
            method: "POST",
            body: data
        })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: `Konfirmasi kehadiran berhasil terkirim`
                })
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    text: console
                })
            })
            .finally(() => {
                // Aktifkan lagi input
                input.forEach(input => {
                    input.disabled = false

                })
            })
    })
})

// komentar
const scriptURL = "https://script.google.com/macros/s/AKfycbxNYgcJOPGrLnomnKjGNDDaTwTlY02FMz8btxkhypMb3ilS3lR3jfHbTU0dRByk_n98/exec"; 

const form = document.getElementById("komentar-form");
const list = document.getElementById("list-komentar");
const komentarCount = document.getElementById("komentar-count");

// Fungsi ambil komentar
async function loadKomentar() {
  list.innerHTML = "<p>Loading...</p>";
  try {
    const res = await fetch(scriptURL);
    const data = await res.json();
    list.innerHTML = "";

    // tampilkan jumlah komentar
    komentarCount.textContent = `Total Komentar: ${data.length}`;

    // tampilkan terbaru di atas
    data.reverse().forEach(item => {
      const div = document.createElement("div");
      div.className = "card mb-2 p-2 shadow-sm";
      div.innerHTML = `
        <strong>${item.nama}</strong><br>
        <span>${item.komentar}</span><br>
        <small class="text-muted">${new Date(item.tanggal).toLocaleString()}</small>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    list.innerHTML = "<p class='text-danger'>Gagal memuat komentar</p>";
    komentarCount.textContent = "";
    console.error(err);
  }
}

// Fungsi submit form
form.addEventListener("submit", async e => {
  e.preventDefault();
  const nama = document.getElementById("ucapan-nama").value.trim();
  const komentar = document.getElementById("ucapan-teks").value.trim();

  if (!nama || !komentar) return;

  try {
    await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify({ nama, komentar })
    });
    form.reset();
    loadKomentar(); // refresh daftar komentar

    // ✅ Pemberitahuan pakai SweetAlert
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Selamat, ucapan Anda sudah terkirim 🎉",
      showConfirmButton: false,
      timer: 2000
    });

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Gagal mengirim komentar!",
    });
    console.error(err);
  }
});

// Jalankan saat pertama kali halaman dibuka
loadKomentar();

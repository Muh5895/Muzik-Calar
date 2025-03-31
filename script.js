// Şarkı listesi (dosya yollarını ve şarkı isimlerini güncelleyin)
const songs = [
  { title: "Şarkı 1", src: "assets/song1.mp3" },
  { title: "Şarkı 2", src: "assets/song2.mp3" },
  { title: "Şarkı 3", src: "assets/song3.mp3" }
];

let currentSongIndex = 0;

const audio = document.getElementById("audio");
const songTitle = document.getElementById("song-title");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const volumeSlider = document.getElementById("volume-slider");

// Şarkıyı yükleme
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
}

// Oynat/Duraklat
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "Duraklat";
  } else {
    audio.pause();
    playBtn.textContent = "Oynat";
  }
}

// Sonraki şarkı
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.textContent = "Duraklat";
}

// Önceki şarkı
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.textContent = "Duraklat";
}

// Ses kontrolü
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Event listenerlar
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Şarkı bittiğinde otomatik sonraki şarkıya geç
audio.addEventListener("ended", nextSong);

// İlk şarkıyı yükle
loadSong(currentSongIndex);

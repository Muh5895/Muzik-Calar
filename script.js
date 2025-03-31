document.getElementById('add-music-btn').addEventListener('click', function() {
  const audio = document.getElementById('audio');
  // Eğer henüz bir müzik dosyası yüklenmediyse, kaynak dosya ayarlanıyor.
  if (!audio.src) {
    // assets klasörünüzde bulunan bir müzik dosyasını buraya ekleyin.
    audio.src = "assets/song1.mp3";
  }
  // Müziği oynatmaya başlıyoruz.
  audio.play().then(() => {
    console.log("Müzik çalıyor...");
  }).catch(err => {
    console.error("Müzik çalınırken hata oluştu:", err);
  });
});

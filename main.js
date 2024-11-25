/* elementlere ulasip obje olarak kullanma, yakalama*/
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

//sira
let index;

//döngu
let loop = true;

//liste
const songsList = [
  {
    name: "Gelo Ew Ki Bu",
    link: "assets/gelo-ew-ki-bu.mp3",
    artist: "Aram Tigran",
    image: "assets/aram-tigran.jpeg",
  },
  {
    name: "Gitme Kal",
    link: "assets/yara-bere-icindeyim.mp3",
    artist: "Hira-i Zerdust",
    image: "assets/hirai.jpeg",
  },
  {
    name: "Aramam",
    link: "assets/aramam.mp3",
    artist: "Ibrahim Tatlises",
    image: "assets/ibrahim-tatlises.jpeg",
  },
  {
    name: "Ax Eman",
    link: "assets/ax-eman.mp3",
    artist: "Rewsan Celiker",
    image: "assets/rewsan-celiker.jpeg",
  },
  {
    name: "Dinle",
    link: "assets/dinle.mp3",
    artist: "Mahsun Kirmizigul",
    image: "assets/mahsun.jpeg",
  },
];

//sarki atama  4
const setSong = (arrayIndex) => {
  console.log(arrayIndex);
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  //sureyi ayarla
  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playListContainer.classList.add('hide')
  playAudio()
};

// zamani istenilen formatta duzenleme
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60); // 3,25
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60); // 25
  second = second < 10 ? "0" + second : second;
  return `${minute}:${minute}`;
};

//Sarkiyi cal
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

// sarkiyi durdur
const pauseAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//sonraki sarkiya git
const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
  } else {
    // rastgele sira olustur
    let randIndex = Math.floor(Math.random() * songsList.length * 10);
    index = randIndex;
  }
  setSong(index);
  playAudio();
};

// onceki sarkiya gitme
const previousSong = () => {
  pauseAudio();
  if (index > 0) {
    index -= 1; //index = index -1
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
};

//play butonuna tiklandiginda
playButton.addEventListener("click", playAudio);

// durdur butonuna tiklandiginda
pauseButton.addEventListener("click", pauseAudio);

// sonraki sarkiya gec butonu tiklandiginda

nextButton.addEventListener("click", nextSong);

//onceki sarkiya gec butonu tiklanildiginda
prevButton.addEventListener("click", previousSong);

// karistirma butonuna tiklanildiinda
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
  } else {
    shuffleButton.classList.add("active");
    loop = false;
  }
});

// tekrar et butonuna tilaildiginda
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    loop = false;
  } else {
    repeatButton.classList.add("active");
    loop = true;
  }
});

// progress bar a tiklanildiginda arkadaki (gri alan)

progressBar.addEventListener("click", (event) => {
  //baslangic /sol
  let coordStart = progressBar.getBoundingClientRect().left;

  //bitis
  let coordEnd = event.clientX;

  let progresss = (coordEnd - coordStart) / progressBar.offsetWidth;
  currentProgress.style.width = progresss * 100 + "%";

  // zamani guncelle
  audio.currentTime = progresss * audio.duration; //300

  // oynat kismi
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

// liste acma butonuna tiklanildiginda 
playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

// oynatma listesini kapat butonuna tiklanildiginda 
closeButton.addEventListener('click',()=>{
    playListContainer.classList.add('hide')
})

// ekran yuklenince
setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

// zaman guncellendiginde
audio.addEventListener("timeupadte", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

// sonraki sarkiya gecis
audio.onended = () => {
  nextSong();
};

//oynatma listesini olustur
const initializePlaylist = () =>{
    for (let i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
            <div class="playlist-image-container">
                <img src="${songsList[i].image}" />
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>
        `
    }
}

//ekran yuklendiginde
window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlaylist();
};

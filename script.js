console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

// ✅ Put song names and covers into HTML list
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// ✅ Function: reset all play icons in list
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

// ✅ Function: play a song by index
const playSong = (index) => {
  songIndex = index;

  makeAllPlays(); // reset all small icons

  // Update audio
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();

  // Update UI
  gif.style.opacity = 1;

  // ✅ MASTER button icon update
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  // ✅ Update the correct list icon
  let currentBtn = document.getElementById(songIndex.toString());
  if (currentBtn) {
    currentBtn.classList.remove("fa-circle-play");
    currentBtn.classList.add("fa-circle-pause");
  }
};

// ✅ Handle play/pause click (master button)
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();

    // ✅ MASTER icon play->pause
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

    gif.style.opacity = 1;

    // update list icon too
    makeAllPlays();
    let currentBtn = document.getElementById(songIndex.toString());
    if (currentBtn) {
      currentBtn.classList.remove("fa-circle-play");
      currentBtn.classList.add("fa-circle-pause");
    }
  } else {
    audioElement.pause();

    // ✅ MASTER icon pause->play
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");

    gif.style.opacity = 0;

    makeAllPlays();
  }
});

// ✅ Update seek bar
audioElement.addEventListener("timeupdate", () => {
  if (!isNaN(audioElement.duration)) {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
  }
});

// ✅ Seekbar change
myProgressBar.addEventListener("change", () => {
  if (!isNaN(audioElement.duration)) {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
  }
});

// ✅ Click on song list play button
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    let clickedIndex = parseInt(e.target.id);
    playSong(clickedIndex);
  });
});

// ✅ Next button
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  playSong(songIndex);
});

// ✅ Previous button
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  playSong(songIndex);
});

// ✅ When song ends, automatically go next
audioElement.addEventListener("ended", () => {
  if (songIndex >= songs.length - 1) songIndex = 0;
  else songIndex += 1;
  playSong(songIndex);
});

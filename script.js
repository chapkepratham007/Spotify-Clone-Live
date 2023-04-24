console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Tu Maan Meri Jaan", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "kesariya tera", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "me rooyaan", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Raabta -arjit singh", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Galliyan", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sanu Ek pal chain dj", filePath: "songs/6.mp3", coverPath: "covers/7.jpg"},
    {songName: "Samjhawan", filePath: "songs/7.mp3", coverPath: "covers/8.jpg"},
    {songName: "Ek DIn Pyaar -MC stan", filePath: "songs/8.mp3", coverPath: "covers/9.jpg"},
    {songName: "tuje kitna chane lage hum", filePath: "songs/9.mp3", coverPath: "covers/10.jpg"},
    {songName: "Kahani Suno", filePath: "songs/10.mp3", coverPath: "covers/2.jpg"},
    {songName: "your eyes x teri najoro ne ", filePath: "songs/11.mp3", coverPath: "covers/4.jpg"},
    {songName: "Kyu diya dard hame", filePath: "songs/12.mp3", coverPath: "covers/3.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=12){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
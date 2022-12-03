
let allMusic =[
    {
    name:"Justin  Bieber - Sorry",
    artist:"Justin Bieber",
    img:"justinbiebersorry.jpg",
    src:"Justin Bieber - Sorry (Official).mp3",
},
{
    name:"Justin Bieber - What Do You Mean",
    artist:"Justin Bieber",
    img:"justinbieberwhatdoyoumean.webp",
    src:"Justin Bieber - What Do You Mean (Official Music Video).mp3",
},
{
    name:"At My Worst- Pink Sweats$",
    artist:"Uknown",
    img:"atmyworst.jpg",
    src:"AT MY WORST - Pink Sweat (Female Cover by Kristel Fulgar).mp3",
},
{
    name:"Work - Rihanna(feat.Drake)",
    artist:"Rihanna",
    img:"workrihanna.jpg",
    src:"Work - Rihanna ft. Drake.mp3",
},
{
    name:"Ever After High",
    artist:"Nickelodeon",
    img:"everafterhigh.jpg",
    src:"Ever After High.mp3",
},
{
    name:"Alec Benjamin- Devil Doesn't Bargain",
    artist:"Beatnaija",
    img:"devilbargain.jpg",
    src:"Alec Benjamin  Devil Doesnt Bargain.mp3",
}
]

const wrapper=document.querySelector(".wrapper")
let musicImg = wrapper.querySelector(".img-area .myimg")
let musicName = wrapper.querySelector(".name");
let musicArtist = wrapper.querySelector(".song-details .artist");
let mainAudio = wrapper.querySelector(".main-audio")
playPauseBtn=wrapper.querySelector(".play-pause");
let nextBtn=wrapper.querySelector("#next")
let prevBtn=wrapper.querySelector("#prev")
progressBar = wrapper.querySelector(".progress-bar")
progressArea = wrapper.querySelector(".progress-area")
musicList = wrapper.querySelector(".music-list")
showMoreBtn = wrapper.querySelector("#more-music")
hideMusicBtn = musicList.querySelector("#close")
favoriteBtn=wrapper.querySelector("#favorite");
optionBtn= wrapper.querySelector("#opt-btn");
optionBar =wrapper.querySelector(".options")
let musicIndex= Math.floor((Math.random()* allMusic.length))


window.addEventListener("load",() =>{
loadMusic(musicIndex)
playingNow();

    })
function loadMusic(musicIndex){
musicName.textContent = allMusic[musicIndex].name
musicArtist.textContent = allMusic[musicIndex].artist
musicImg.src = allMusic[musicIndex].img
mainAudio.src = allMusic[musicIndex].src
}

// optionBtn.addEventListener("click",()=>{
//     optionBar.style.transition="all 5s linear";
// optionBar.classList.toggle("optshow")
//     })
$(document).ready(function(){
    $(".options").css({"display":"none"});
    $("#opt-btn").click(function(){
        let text = ($("#opt-btn").text())
        switch(text){
        case "expand_more":$("#opt-btn").text("expand_less");
        break;
        case "expand_less":$("#opt-btn").text("expand_more");
    }
    $(".options").slideToggle("520");
});
});

favoriteBtn.addEventListener("click",()=>{
    let  getClass= favoriteBtn.classList;
    let  getText=favoriteBtn.innerText;
      if(getClass.contains("blue")){
    favoriteBtn.classList.remove("blue");
    favoriteBtn.classList.add("anim");
    }
    else{
        favoriteBtn.classList.remove("anim");
        favoriteBtn.classList.add("blue");
        }
    switch(getText){
        case "favorite_border":favoriteBtn.innerText="favorite";
        alert("Added To Favorites!")
        break;
        case "favorite":favoriteBtn.innerText="favorite_border";
        alert("Removed From Favorites!")
        break;
    }
})

playPauseBtn.addEventListener("click",()=>{
    let isMusicPlaying= wrapper.classList.contains("paused")
    isMusicPlaying? pauseMusic():playMusic();
    playingNow();
})
function playMusic(){
    wrapper.classList.add("paused")
    mainAudio.play()
    playPauseBtn.querySelector(".material-icons").innerText= "pause"
}
function pauseMusic(){
    wrapper.classList.remove("paused")
    playPauseBtn.querySelector(".material-icons").innerText= "play_arrow"
    mainAudio.pause()
}

nextBtn.addEventListener("click",()=>{
    nextMusic()
})
prevBtn.addEventListener("click",()=>{
    prevMusic()
})

function nextMusic(){
    musicIndex++;
    musicIndex >allMusic.length? musicIndex = 0 :musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
    playingNow()
    
}
function prevMusic(){
    musicIndex--;
    musicIndex < 0? musicIndex = allMusic.length :musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
    playingNow()
}
mainAudio.addEventListener("timeupdate",(e)=>{
    const currentTime =e.target.currentTime;
    const duration =e.target.duration;
    let progressWidth= (currentTime / duration)*100;
    progressBar.style.width= `${progressWidth}%`;
    let musicCurrentTime= wrapper.querySelector(".current")
    mainAudio.addEventListener("loadeddata",()=>{
        musicDuration=wrapper.querySelector(".duration");
        
        let audioDuration=mainAudio.duration;
        let audioMin = Math.floor(audioDuration/60);
        let audioSec= Math.floor(audioDuration % 60);
        if (audioSec < 10){audioSec= `0${audioSec}`};
        musicDuration.textContent= `${audioMin}:${audioSec}`
        
});
let currentMin=Math.floor(currentTime / 60);
let currentSec=Math.floor(currentTime % 60);
if(currentSec < 10){ currentSec= `0${currentSec}`}
musicCurrentTime.innerText =`${currentMin}:${currentSec}`

progressArea.addEventListener("click", (e) => {
    let progressWidthval=progressArea.clientWidth;
    let clickedOffSetX= e.offsetX;
    let songDuration=mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic()
})

})
const repeatBtn=wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click",()=>{
    let getText=repeatBtn.innerText
    switch(getText){
        case "repeat":repeatBtn.innerText="repeat_one";
        repeatBtn.setAttribute("title","Single Loop");
        break;
        case "repeat_one":repeatBtn.innerText="shuffle";
        repeatBtn.setAttribute("title","Shuffle")
        break;
        case "shuffle":repeatBtn.innerText="repeat";
        repeatBtn.setAttribute("title","Repeat")
        break;
        default:;
    }
})

mainAudio.addEventListener("ended",() => {
    let getText=repeatBtn.innerText;
    switch(getText){
        case "repeat":
        nextMusic();
        break;
        case "repeat_one":
        mainAudio.currentTime=0;
        loadMusic(musicIndex);
        playMusic()
        break;
        case "shuffle":
        let ranIndex= Math.floor((Math.random()* allMusic.length));;
        do{
        ranIndex == Math.floor((Math.random()* allMusic.length));
        }while(musicIndex == ranIndex);
            musicIndex = ranIndex
            loadMusic(musicIndex) 
            playMusic();
            playingNow()
        break;
        default:;
    }
})

showMoreBtn.addEventListener("click",()=>{
    musicList.classList.toggle("show");
})
hideMusicBtn.addEventListener("click",()=>{
    showMoreBtn.click()
});

const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {
    let liTag= `<li li-index=${i}>
    <div class="row">
    <span>${allMusic[i].name}</span>
    <p>${allMusic[i].artist}</p>
    </div>
    <audio class="music${i}" src="${allMusic[i].src}"></audio>
    <span id="music${i}" class="audio-duration" >3:40</span>
    </li>`
    ulTag.insertAdjacentHTML("beforeend",liTag);
   
    let liAudioDuration =ulTag.querySelector(`#music${i}`)
    let liAudioTag=ulTag.querySelector(`.music${i}`)

    liAudioTag.addEventListener("loaded",()=>{
    let audioDuration=liAudioTag.duration;
        let audioMin = Math.floor(audioDuration/60);
        let audioSec= Math.floor(audioDuration % 60);
        if (audioSec < 10){audioSec= `0${audioSec}`};
        liAudioDuration.textContent= `${audioMin}:${audioSec}`
    }
)}

const allLiTags= ulTag.querySelectorAll("li");
function playingNow(){
    for (let j = 0; j < allLiTags.length; j++) {

    let audioTag =allLiTags[j].querySelector(".audio-duration")

    if(allLiTags[j].classList.contains("playing")){
    allLiTags[j].classList.remove("playing")
    audioTag.textContent=""
}
    if(allLiTags[j].getAttribute("li-index")==musicIndex){
        allLiTags[j].classList.add("playing");
audioTag.innerText="Playing"
    }
    allLiTags[j].setAttribute("onclick","clicked(this)");
    
}

}

function clicked(element){
    let getLiIndex= element.getAttribute("li-index");
    musicIndex=getLiIndex;
    loadMusic(musicIndex)
    playMusic()
    playingNow()
}
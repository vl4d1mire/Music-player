const music = document.querySelector('audio')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const title = document.getElementById('title')
const author = document.getElementById('author')
const image = document.querySelector('img')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const durationEl = document.getElementById('duration')
const currentTimeEl = document.getElementById('current-time')

const listMusics = [
    {
        src: 'assets/music/Elysium–The Lyndhurst Orchestra, Hans Zimmer, Lisa Gerrard.mp3',
        author: 'The Lyndhurst Orchestra, Hans Zimmer, Lisa Gerrard',
        displayName: 'Elysium',
        img: 'assets/images/photo-Elysium–The Lyndhurst Orchestra, Hans Zimmer, Lisa Gerrard.jpg'
    },
    {
        src: 'assets/music/omar_akram_-_a_vision_of_you.mp3',
        author: 'Omar Akram',
        displayName: 'a_vision_of_you',
        img: 'assets/images/photo-omar_akram_-_a_vision_of_you.jpg'
    },
    {
        src: 'assets/music/omar_akram_-_dancing_with_the_wind.mp3',
        author: 'Omar Akram',
        displayName: 'dancing_with_the_wind',
        img: 'assets/images/photo-omar_akram_-_dancing_with_the_wind.jpg'
    },
    {
        src: 'assets/music/omar_akram_-_love_of_my_heart.mp3',
        author: 'Omar Akram',
        displayName: 'love_of_my_heart',
        img: 'assets/images/photo-omar_akram_-_love_of_my_heart.jpg'
    },
    {
        src: 'assets/music/omar_akram_-_take_my_hand.mp3',
        author: 'Omar Akram',
        displayName: 'take_my_hand',
        img: 'assets/images/photo-omar_akram_-_take_my_hand.jpg'
    },
]

let isPlaying = false

function loadSong(song) {
    title.textContent = song.displayName
    author.textContent = song.author
    music.src = `${song.src}`
    image.src = `${song.img}`
}

function playAudio() {
    isPlaying = true
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

function pauseAudio() {
    isPlaying = false
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

let songIndex = 0

function nextSong() {
    songIndex++
    if (songIndex > listMusics.length - 1) {
        songIndex = 0
    }
    loadSong(listMusics[songIndex])
    playAudio()
}

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = listMusics.length - 1
    }
    loadSong(listMusics[songIndex])
    playAudio()
}

loadSong(listMusics[songIndex])

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime} = e.srcElement
        const percentProgress = (currentTime / duration) * 100
        progress.style.width = `${percentProgress}%`
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const { duration } = music
    music.currentTime = ( clickX / width ) * duration
}

playBtn.addEventListener('click', () => isPlaying ? pauseAudio() : playAudio())
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)

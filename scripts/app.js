//Loading script first. so wait until dom loads to run init
document.addEventListener("DOMContentLoaded", function(){
    window.main = document.getElementById('main')
    window.vid = document.getElementById("video1")

    document.body.style.height = main.clientHeight + 'px'
    window.cliHeight = document.documentElement.clientHeight

    window.scrDisplay = document.getElementById("scrDisplay")
},false)

//(c)ontainer y pos, (s)croll y pos - this stores where the user has scrolled to
let cy = sy = 0
const f = .06 //Friction

document.onscroll = () => { sy = window.pageYOffset }

//Run every animation frame tick
function animateFrame(){
    //Run only when sy has changed (User has scrolled)
    // cant use equal param. Two numbers are never the same, so use a range. Larger the range, the less smooth the animation but less the code is fired.
    if(Math.abs(cy - sy) > .5){
        //Calculate momentum pos using linear interpolation
        cy = Math.floor(((1 - f) * cy + f * sy) * 100) / 100
        
        //Move the container
        main.style.transform = `translate3d(0,-${cy}px,0)`

        //Find percentage of page scrolled. Go to that percentage of the video. Allows the page to be dynamically sized
        //Closer the length of video to the length of the page, the better
        vid.currentTime = Math.floor((cy / (document.documentElement.scrollHeight - cliHeight)) * vidLen * 100) / 100

        scrDisplay.innerText = vid.currentTime + " / " + vidLen
    }
    window.requestAnimationFrame(animateFrame) //loop
}
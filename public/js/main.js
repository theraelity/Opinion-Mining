window.addEventListener('load',init);

function init(){
    console.log('Init() is called.');
    var startButton = document.querySelector('#startButton');
    startButton.addEventListener('click',getStarted)
}
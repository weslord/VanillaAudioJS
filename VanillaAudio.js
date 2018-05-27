(function() {
  var audioNodes = document.querySelectorAll('audio[controls]');

  audioNodes.forEach(function(audioNode) {
    // create replacement
    var audioContainer = document.createElement('div');
        audioContainer.classList.add('audio-container');

      var audioButton = document.createElement('div');
          audioButton.classList.add('audio-button');

      var audioProgCont = document.createElement('div');
          audioProgCont.classList.add('audio-bar-container');
        var audioBar = document.createElement('div');
            audioBar.classList.add('audio-bar');
          var audioProgInd = document.createElement('div');
              audioProgInd.classList.add('audio-bar-progress');
          var audioCursor = document.createElement('div');
              audioCursor.classList.add('audio-bar-cursor');

        var audioTimestamp = document.createElement('span');
            audioTimestamp.classList.add('audio-current-time');
            audioTimestamp.innerText = '0:00';
        var audioDuration = document.createElement('span');
            audioDuration.classList.add('audio-total-time');
            audioDuration.innerText = '??:??';

    audioContainer.append(audioButton);
    audioContainer.append(audioProgCont);
      audioProgCont.append(audioBar);
        audioBar.append(audioProgInd);
        audioBar.append(audioCursor);
      audioProgCont.append(audioTimestamp);
      audioProgCont.append(audioDuration);


    audioButton.addEventListener('click', function (e) {
      if (audioNode.paused) {
        audioNode.play();
      } else {
        audioNode.pause();
      }
    });

    audioProgCont.addEventListener('click', function(e) {
      if (audioNode.duration) {
        audioNode.currentTime = e.offsetX/audioProgCont.offsetWidth * audioNode.duration;
      } else {
        audioNode.load();
      }
    });

/*
    audioProgCont.addEventListener('mousemove', function(e) {
      if (audioNode.duration) {
        audioCursor.setAttribute('style', 'left: '+ e.offsetX +'px;');
        var t = (e.offsetX / audioProgCont.offsetWidth) * audioNode.duration;
        audioTimestamp.innerText = MS(t);
      }
    });
*/

    audioNode.addEventListener('play', playStarted);
    audioNode.addEventListener('playing', playStarted);
    //audioNode.addEventListener('seeked', playStarted);
    function playStarted(e) {
      audioButton.setAttribute('style', 'background-image: url(css/pause.svg);');
    }

    audioNode.addEventListener('pause', playStopped);
    //audioNode.addEventListener('waiting', playStopped);
    //audioNode.addEventListener('ended', playStopped);
    //audioNode.addEventListener('seeking', playStopped);
    function playStopped(e) {
      audioButton.setAttribute('style', 'background-image: url(css/play.svg);');
    }

    audioNode.addEventListener('durationchange', function(e) {
      //TODO: better display when duration=infinity on safari
      audioDuration.innerText = MS(audioNode.duration);
    });

    audioNode.addEventListener('timeupdate', function(e) {
      var w = audioNode.currentTime / audioNode.duration * 100;
      audioProgInd.setAttribute('style', 'width: '+ w +'%;');
      audioCursor.setAttribute('style', 'left: '+ w +'%;'); // TODO: use calc()
      audioTimestamp.innerText = MS(audioNode.currentTime);
    });


    audioNode.insertAdjacentElement('afterend', audioContainer);
    audioNode.removeAttribute('controls');
  });


  function MS(t) {
    var M = Math.floor(t / 60);
    var S = Math.floor(t % 60);
   
    M = M >= 10 ? ''+ M : '0' + M;
    S = S >= 10 ? ''+ S : '0' + S;

    return M +':'+ S;
  }

})();

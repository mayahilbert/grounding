var $toggleMute = document.getElementById("toggleMute");
var $togglePlay = document.getElementById("togglePlay");
var hours = "";
var minutes = "";
var seconds = "";
var count = "";

var vids = [
  "https://player.vimeo.com/video/846645071?h=133aa8f5f9",
  "https://player.vimeo.com/video/847206434?h=518f940caa",
  "https://player.vimeo.com/video/847229743?h=8fe609ec3f",
  "https://player.vimeo.com/video/847227641?h=058b81b952",
  "https://player.vimeo.com/video/847224739?h=3f607c27e0",
  "https://player.vimeo.com/video/847222638?h=a433127870",
  "https://player.vimeo.com/video/847220837?h=b6634367d1",
  "https://player.vimeo.com/video/847218849?h=9d8456860e",
  "https://player.vimeo.com/video/847216982?h=b4fef8c696",
  "https://player.vimeo.com/video/847215096?h=39e5a4a6b3",
  "https://player.vimeo.com/video/847213433?h=00b41f3c75",
  "https://player.vimeo.com/video/847211428?h=3c743c6e74",
  "https://player.vimeo.com/video/847209962?h=af1d12d246",
];
var currentTime = new Date();
var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
var seconds = currentTime.getSeconds();

if (hours == 1) {
  count = "7";
} else if (hours == 2) {
  count = "8";
} else if (hours == 3) {
  count = "9";
} else if (hours == 4) {
  count = "10";
} else if (hours == 5) {
  count = "11";
} else if (hours == 6) {
  count = "0";
} else if (hours == 7) {
  count = "1";
} else if (hours == 8) {
  count = "2";
} else if (hours == 9) {
  count = "3";
} else if (hours == 10) {
  count = "4";
} else if (hours == 11) {
  count = "5";
} else if (hours == 12) {
  count = "6";
} else if (hours == 13) {
  count = "7";
} else if (hours == 14) {
  count = "8";
} else if (hours == 15) {
  count = "9";
} else if (hours == 16) {
  count = "10";
} else if (hours == 17) {
  count = "11";
} else if (hours == 18) {
  count = "12";
} else if (hours == 19) {
  count = "0";
} else if (hours == 20) {
  count = "1";
} else if (hours == 21) {
  count = "2";
} else if (hours == 22) {
  count = "3";
} else if (hours == 23) {
  count = "4";
} else if (hours == 24) {
  count = "5";
}

var v = "Time Loaded: " + hours + ":" + minutes + ":" + seconds;

document.getElementById("p1").innerHTML = v;
document.getElementById("p2").innerHTML =
  "You are watching hour " + count + " of <br>Teaching Capitalism to Nature.";

var player = new Vimeo.Player("player", {
  id: vids[count],
  background: true,
  autoplay: true,
  playsinline: true,
  muted: true,
  loop: false,
  controls: false,
});

player
  .setCurrentTime(minutes * 60 + seconds)
  .then(function (seconds) {
    // `seconds` indicates the actual time that the player seeks to
  })
  .catch(function (error) {
    switch (error.name) {
      case "RangeError":
        // The time is less than 0 or greater than the video's duration
        break;
      default:
        // Some other error occurred
        break;
    }
  });

player.on("ended", function (data) {
  // `data` is an object containing properties specific to that event
  location.reload();
});

player.ready().then(() => {
  var $iframe = document.querySelector("iframe");
  $iframe.style.pointerEvents = "none";
  $iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");

  Promise.all([player.getVideoWidth(), player.getVideoHeight()]).then(
    (dimensions) => {
      const width = dimensions[0];
      const height = dimensions[1];
      const aspectRatio = width / height;

      $iframe.width = window.innerWidth - 13;
      $iframe.height = Math.round((1 / aspectRatio) * window.innerWidth - 13);
    }
  );
});

$toggleMute.addEventListener("click", function () {
  if (player) {
    player.getMuted().then((isMuted) => {
      player
        .setMuted(!isMuted)
        .then((muted) => {
          console.log("video is on mute:" + muted);
        })
        .catch((err) => {
          console.error("fail to toggle mute", err);
        });
    });
  }
});

$togglePlay.addEventListener("click", function () {
  if (player) {
    player.getPaused().then((paused) => {
      if (paused) {
        player.play();
      } else {
        player.pause();
      }
    });
  }
});

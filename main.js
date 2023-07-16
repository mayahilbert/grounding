var colors = new Array([39, 135, 189], [246, 94, 104], [137, 155, 237]);
var colors2 = new Array([3, 13, 18], [255, 255, 255], [217, 215, 237]);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1];

//transition speed
var gradientSpeed = 0.001;

function updateGradient() {
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c0_2 = colors2[colorIndices[0]];
  var c0_3 = colors2[colorIndices[1]];

  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);

  var color1 = "#" + ((r1 << 16) | (g1 << 8) | b1).toString(16);

  var r2 = Math.round(istep * c0_2[0] + step * c0_3[0]);
  var g2 = Math.round(istep * c0_2[1] + step * c0_3[1]);
  var b2 = Math.round(istep * c0_2[2] + step * c0_3[2]);
  var color2 = "#" + ((r2 << 16) | (g2 << 8) | b2).toString(16);

  $(".gradient-animate").css({
    background:
      "-webkit-radial-gradient(center, circle contain, " +
      color1 +
      ", transparent 100%)",
  });
  $(".gradient-animate-2").css({
    background:
      "-webkit-radial-gradient(center, circle contain, " +
      color2 +
      ", transparent 100%)",
  });
  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] =
      (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
  }
}

setInterval(updateGradient, 10);

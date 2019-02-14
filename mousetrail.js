var starwidth;

var mx; //mousex
var yx; //mousey


var trackx = new Array(25);
var tracky = new Array(25);





function setup() {
  createCanvas(1600, 900);
  stroke(255);
  starwidth = 40;
  
  for(var r = 0; r < trackx.length; r++){
  trackx[r] = 790;
  tracky[r] = 440;
  }
  

}

function draw() {

if(mouseX == 0 && mouseY ==0){
  mx = 790;
  my = 440;
  }
  else {
    mx = mouseX;
    my = mouseY;
  }

 

  background(0);

  fill(255);
  stroke(255);
  

  stroke(255);
  fill(255);

  

  //game ACTIVE 
    //mouse stuff
    trackx.unshift(mx);
    tracky.unshift(my);
    trackx.pop();
    tracky.pop();

    for (var e = 0; e < trackx.length; e++) {
      if (e * 7 > 50) {
        var H1 = 360 - (e * 7);
      } else {
        var H1 = 50 - (e * 7);
      }
      var H2 = 50;
      var H3 = 100;
      colorMode(HSB);
      fill(H1, H2, H3);
      stroke(H1, H2, H3);
      ellipse(trackx[e], tracky[e], starwidth - (2 * e), starwidth - (2 * e));
    }
    fill(50, H2, H3);
    stroke(50, H2, H3);
    ellipse(mx, my, starwidth, starwidth);
    colorMode(RGB);
    stroke(255);
    fill(255);
    //mouse
}






var time;
var score;
var highscore;
var scoresave;
var count;

var pause;

var startmenu;
var help;

var immortal;

var fallX;
var fallY;
var ballWid;
var starwidth;

var mx; //mousex
var yx; //mousey
var timespace;

var balls = new Array(15);
var trackx = new Array(25);
var tracky = new Array(25);



//game over
var endtextvar;
var textup;

var over;
var falling;

function setup() {

  immortal = false;

  help = false;

  pause = false;
  startmenu = true;

  createCanvas(1000, 750);

  stroke(255);
  time = 0;
  score = 0;
  highscore = 0;
  count = 0;

  falling = true;
  fallX = 500;
  fallY = 0;
  ballWid = 70;
  starwidth = 40;

  timespace = 100;


  textup = true;

  endtextvar = 0;
  over = false;

  //balls[1] = new Ball();
  // balls[1].activate(); testing functions


  for (var x = 0; x < balls.length; x++) {
    balls[x] = new Ball();
  }
}

function draw() {

  if (mouseX > width) {
    mx = width;
  } else if (mouseX < 0) {
    mx = 0;
  } else {
    mx = mouseX;
  }

  if (mouseY > height) {
    my = height;
  } else if (mouseY < 0) {
    my = 0;
  } else {
    my = mouseY;
  }

  textSize(15);
  if (pause == false && startmenu == false) {
    time++;
    score++;
    count++;
  }
  //background(	'#FF0000');
  background(0);
  stroke(255);
  fill(255);

  //start menu
  if (startmenu == true) {

    textSize(25);

    text("The aim of the game is to survive for as", 275, 350);
    text("long as you can. Keep your mouse away from the", 225, 375);
    text("falling stars or else it will be game over.", 275, 400);
    text("Hit start when you're ready to play!", 300, 425);

    if (mx >= 400 && mx <= 550) {
      if (my >= 250 && my <= 300) {
        stroke(75);
        fill(75);
      } else {
        stroke(200);
        fill(200);
      }
    } else {
      stroke(200);
      fill(200);
    }
    textSize(70);
    text("Start", 400, 300);

    stroke(255);
    fill(255);

  }



  if (startmenu == false) {
    //pause 
    if (mx >= 25 && mx <= 90) {
      if (my >= 15 && my <= 90) {
        stroke(75);
        fill(75);
      } else {
        stroke(175);
        fill(175);
      }
    } else {
      stroke(175);
      fill(175);
    }

    if (pause == false) {
      rect(30, 20, 15, 40);
      rect(55, 20, 15, 40);
      textSize(30);
      text("Menu", 17, 90);
    } else {
      textSize(30);
      text("Unpause", 17, 90);
      triangle(30, 20, 70, 40, 30, 60);
    }



    //game over stuff
    if (over == true) {
      stroke(255);
      fill(255);
      if (endtextvar > 8) {
        textup = false;
      } else if (endtextvar < -8) {
        textup = true;
      }

      if (textup == true) {
        endtextvar = endtextvar + 0.2;
      } else if (textup == false) {
        endtextvar = endtextvar - 0.2;
      }

      textSize(40);
      text("Highscore: " + highscore, 350, 250);
      textSize(50);
      text("Game over", 360, 340 + endtextvar);
      textSize(40);
      text("Score: " + scoresave, 390, 200);
      if (mouseX >= 390 && mouseX <= 575) {
        if (mouseY >= 370 && mouseY <= 400) {
          stroke(75);
          fill(75);
        } else {
          stroke(175);
          fill(175);
        }
      } else {
        stroke(175);
        fill(175);
      }
      //rect(422, 380, 120, 20);
      text("start over", 390, 400);

      if (mouseX >= 305 && mouseX <= 675) {
        if (mouseY >= 420 && mouseY <= 450) {
          stroke(75);
          fill(75);
        } else {
          stroke(175);
          fill(175);
        }
      } else {
        stroke(175);
        fill(175);
      }
      //rect(422, 380, 120, 20);
      text("Return to main menu", 305, 450);
    }
    //game over text finish



    //game ACTIVE 

    if (over == false) {
      if (pause == false) {
        //balls[1].fall();
        //balls[1].drawball(); //testiing functions
        if (timespace > 5) {
          if (count >= 100) {
            timespace -= 5;
            count = 0;
          }
        }


        if (time > timespace) { //trigger new drop
          for (var a = 0; a < balls.length; a++) { //ACTIVATE FIRST NON ACTIVE BALL EVERY X SECONDS
            if (balls[a].active != true) {
              balls[a].activate();
              time = 0;
              break;
            }
          }
        }
      }

      for (var b = 0; b < balls.length; b++) { //CHECK THROUGH EVERY FREE SLOT 
        if (balls[b].active) { //ONLY DO THIS SHIT TO ACTIVELY DROPPING BALLS
          if (pause == false) {
            balls[b].fall();
          }
          if (balls[b].collide() == true) { //check for collisions >> game over m888
            if (pause == false) {
              if (immortal == false) {
                gameover();
                break;
              }
            }
          }
        }
        //MOVE BALL LOWER
        balls[b].drawball(); //DRAW THE DAMN THING
      }
      textSize(20);
      text("Score: " + score, 90, 50);
    }


    //score
    //text("timespace: " + timespace, 15, 35);
    // text("time: " + time, 15, 55);

    stroke(255);
    fill(255);


    //pause menu
    if (pause == true) {
      if (help == false) {
        textSize(70);
        text("Paused", 360, 300);

        textSize(25);

        if (mx >= 360 && mx <= 595) {
          if (my >= 325 && my <= 350) {
            stroke(75);
            fill(75);
          } else {
            stroke(175);
            fill(175);

          }
        } else {
          stroke(175);
          fill(175);
        }
        text("Return to main menu", 360, 350);

        if (mx >= 425 && mx <= 515) {
          if (my >= 375 && my <= 400) {
            stroke(75);
            fill(75);
          } else {
            stroke(175);
            fill(175);
          }
        } else {
          stroke(175);
          fill(175);
        }
        text("Restart", 430, 400);

        if (mx >= 445 && mx <= 495) {
          if (my >= 430 && my <= 455) {
            stroke(75);
            fill(75);
          } else {
            stroke(175);
            fill(175);
          }
        } else {
          stroke(175);
          fill(175);
        }

        text("Help", 445, 450);

        stroke(0);
        fill(0);

      } else if (help == true) {

        if (mx >= 445 && mx <= 495) {
          if (my >= 430 && my <= 455) {
            stroke(75);
            fill(75);
          } else {
            stroke(175);
            fill(175);
          }
        } else {
          stroke(175);
          fill(175);
        }
        textSize(25);
        text("Back", 445, 450);

        stroke(255);
        fill(255);

        text("The aim of the game is to survive for as", 250, 325);
        text("long as you can. Keep your mouse away from the", 200, 350);
        text("falling stars or else it will be game over.", 250, 375);

        stroke(0);
        fill(0);
      }
    }
  }

  //mouse stuff
  trackx.unshift(mx);
  tracky.unshift(my);
  if (trackx.length > 25) {
    trackx.pop();
    tracky.pop();
  }
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

function gameover() {
  over = true;
  falling = false;
  fallY = 0;
  time = 0;
  timespace = 100;
  count = 0;

  scoresave = score;


  //reset each ball
  for (var s = 0; s < balls.length; s++) {
    balls[s].deactivate();
  }

  //score stuff
  if (highscore <= scoresave) {
    highscore = scoresave;
  }

}

function startover() {
  over = false;
  fallY = 0;
  time = 0;
  score = 0;
  count = 0;
  timespace = 100;

  for (var s = 0; s < balls.length; s++) {
    balls[s].deactivate();
  }

}


function mousePressed() {
  if (over == true) {
    if (mouseX >= 305 && mouseX <= 675) {
      if (mouseY >= 420 && mouseY <= 450) {
         window.location = "menu.html";
      }
    }
    if (mouseX >= 390 && mouseX <= 575) {
      if (mouseY >= 370 && mouseY <= 400) {
        startover();
      }
    }
  }


  if (startmenu == true) {
    if (mx >= 400 && mx <= 550) {
      if (my >= 250 && my <= 300) {

        startmenu = false;
      }
    }
  }

  if (pause == true) {
    if (mx >= 360 && mx <= 595) {
      if (my >= 325 && my <= 350) {
        window.location = "menu.html";
      }
    }
    if (mx >= 425 && mx <= 515) {
      if (my >= 375 && my <= 400) {
        falling = false;
        fallY = 0;
        time = 0;
        timespace = 100;
        count = 0;

        scoresave = score;


        //reset each ball
        for (var K = 0; K < balls.length; K++) {
          balls[K].deactivate();
        }
        startover();
        pause = false;
      }
    }
    if (mx >= 445 && mx <= 495) {
      if (my >= 430 && my <= 455) {
        if (help == false) {
          help = true;
        } else {
          help = false;
        }
      }
    }
  }


  if (startmenu == false) {
  if (mx >= 25 && mx <= 90) {
    if (my >= 15 && my <= 90) {
        if (over == false) {
          if (pause == true) {
            pause = false;
            help = false;
          } else if (pause == false) {
            pause = true;
          }
        }
      }
    }
  }
}

function Ball() {
  this.wid = random(ballWid, ballWid + 125);
  this.active = false;
  this.y = 0 - ballWid;

  this.activate = function() {
    this.x = random(0, width);
    this.y = 0 - this.wid;
    this.active = true;
  }

  this.deactivate = function() {
    this.y = 0 - this.wid;
    this.active = false;
  }

  this.active = function() {
    return this.active;
  }

  this.collide = function() {

    for (var d = 0; d < this.wid; d += 1) {
      if (mx + (starwidth / 3) >= (this.x - ((this.wid - (3 * d)) / 2)) && mx - (starwidth / 3) <= (this.x + ((this.wid - (3 * d)) / 2))) {
        if (my + (starwidth / 3) >= (this.y - (d * 5) - ((this.wid - (3 * d)) / 2)) && my - (starwidth / 3) <= (this.y - (d * 5) + ((this.wid - (3 * d)) / 2))) {
          if ((255 - (d * 5)) >= 25) {
            return true;
          }
        }
      }
    }
  }

  this.fall = function() {
    this.y += 5 +(score/250);
    if (this.y > (height + (this.wid * 5))) {
      this.active = false;
    }
  };

  this.drawball = function() {
    for (var d = this.wid; d > 0; d -= 1) {
      if (pause == false) {
        stroke(225 - (5 * d));
        fill(225 - (5 * d));
      } else {
        stroke(155 - (5 * d));
        fill(155 - (5 * d));
      }
      if ((255 - (d * 5)) >= 25) {
        var u1 = this.x;
        var u2 = this.y;
        var usize = (this.wid - (3 * d)) / 7;

        push();
        translate(u1, u2 - (d * 5));
        push();

        rotate((d) + (u2 / 100));
        translate(-u1, -u2);

        triangle(u1 - (3 * usize), u2 - (2 * usize), u1 + (3 * usize), u2 - (2 * usize), u1, u2 + (3 * usize));
        triangle(u1 - (3 * usize), u2 + (1 * usize), u1 + (3 * usize), u2 + (1 * usize), u1, u2 - (4 * usize));
        pop();

        pop();

      }
    }
    if (pause == false) {
      stroke(255);
      fill(255);
    } else {
      stroke(125);
      fill(125);
    }

    var u1 = this.x;
    var u2 = this.y;
    var usize = this.wid / 6;
    push();
    translate(u1, u2);

    push();

    rotate(u2 / 100);
    translate(-u1, -u2);

    triangle(u1 - (3 * usize), u2 - (2 * usize), u1 + (3 * usize), u2 - (2 * usize), u1, u2 + (3 * usize));
    triangle(u1 - (3 * usize), u2 + (1 * usize), u1 + (3 * usize), u2 + (1 * usize), u1, u2 - (4 * usize));
    pop();
    // triangle(u1 - (3 * usize), u2 + (1 * usize), u1 + (3 * usize), u2 + (1 * usize), u1, u2 - (4 * usize));
    // ellipse(this.x, this.y - (5 * d), this.wid - d, this.wid - d);
    pop();

    //ellipse(this.x, this.y, this.wid, this.wid); //actual ball
  }
}
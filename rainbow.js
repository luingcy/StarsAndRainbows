var time;
var score;
var highscore;
var scoresave;
var count;


var pause;

var startmenu;
var help;
var spin;

var fallX;
var fallY;
var ballWid;
var starwidth;

var mx; //mousex
var yx; //mousey
var timespace;

var balls = new Array(10);
var trackx = new Array(25);
var tracky = new Array(25);

var timer;

//game over
var endtextvar;
var textup;

var over;
var falling;





function setup() {

  back = 0;

  pause = false;
  startmenu = true;
  help = false;
  spin = 0;

  createCanvas(1000, 750);


  stroke(0);
  time = 0;
  timer = 2700;
  score = 0;
  highscore = 0;
  count = 0;

  falling = true;
  fallX = 500;
  fallY = 0;
  ballWid = 60;
  starwidth = 40;

  timespace = 30;


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
    count++;
    timer--;
  }
  
  background('#c9e9f8');
  stroke(0);
  fill(0);

  if (back > 360) {
    back = 0;
  } else {
    back++;
  }

  //start menu
  if (startmenu == true) {

    textSize(25);

    text("You have 90 seconds to catch", 325, 350);
    text("as many falling rainbows as", 340, 375);
    text("you can using your mouse.", 345, 400);
    text("Hit start when youre ready to play!", 310, 425);


    if (mx >= 400 && mx <= 550) {
      if (my >= 250 && my <= 300) {
        stroke(200);
        fill(200);
      } else {
        stroke(75);
        fill(75);
      }
    } else {
      stroke(75);
      fill(75);
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
        stroke(175);
        fill(175);
      } else {
        stroke(75);
        fill(75);
      }
    } else {
      stroke(75);
      fill(75);
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

    if (timer <= 0) {
      gameover();
    }



    //game over stuff
    if (over == true) {
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

      stroke(75);
      fill(75);

      textSize(40);
      text("Highscore: " + highscore, 375, 250);
      textSize(50);
      text("Time's up!", 360, 340 + endtextvar);
      textSize(40);
      text("Score: " + score, 410, 200);
      if (mouseX >= 390 && mouseX <= 575) {
        if (mouseY >= 370 && mouseY <= 400) {
          stroke(150);
          fill(150);
        } else {
          stroke(0);
          fill(0);
        }
      } else {
        stroke(0);
        fill(0);
      }
      //rect(422, 380, 120, 20);
      text("start over?", 390, 400);

      if (mouseX >= 305 && mouseX <= 675) {
        if (mouseY >= 420 && mouseY <= 450) {
          stroke(150);
          fill(150);
        } else {
          stroke(0);
          fill(0);
        }
      } else {
        stroke(0);
        fill(0);
      }
      //rect(422, 380, 120, 20);
      text("Return to main menu", 305, 450);
    }
    //game over text finish



    //game ACTIVE 

    if (over == false) {
      if (pause == false) {
        if (timespace >= 0) {
          if (count >= 100) {
            //timespace -= 5;
            count = 0;
          }
        }
      }

      if (pause == false) {
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
          if (balls[b].collide() == true) { //check for collisions >> game over m888
            if (balls[b].clicked == false) {
              if (pause == false) {
                balls[b].clickit();
                score += 5;
              }
            }
          }

          if (pause == false) {
            balls[b].fall(); //MOVE BALL LOWER
          }
          if (balls[b].clicked == true && balls[b].exploded == false) {
            balls[b].collapse();
          } else if (balls[b].exploded == true) {
            balls[b].explode();
          } else {
            balls[b].drawball();
          } //DRAW THE DAMN THING
        }
      }
      stroke(75);
      fill(75);
      textSize(20);
      text("Score: " + score, 100, 20);
      //score
      // text("timespace: " + timespace, 15, 35);
      // text("timespace: " + timespace, 15, 35);
      var t1 = timer / 30;
      var t2 = t1.toFixed(0);
      text("time: " + t2, 840, 20);
    }

    stroke(0);
    fill(0);

    //pause menu
    if (pause == true) {
      if (help == false) {
        textSize(70);
        text("Paused", 360, 300);

        textSize(25);

        if (mx >= 360 && mx <= 595) {
          if (my >= 325 && my <= 350) {
            stroke(175);
            fill(175);
          } else {
            stroke(75);
            fill(75);

          }
        } else {
          stroke(75);
          fill(75);
        }
        text("Return to main menu", 360, 350);

        if (mx >= 425 && mx <= 515) {
          if (my >= 375 && my <= 400) {
            stroke(175);
            fill(175);
          } else {
            stroke(75);
            fill(75);
          }
        } else {
          stroke(75);
          fill(75);
        }
        text("Restart", 430, 400);

        if (mx >= 445 && mx <= 495) {
          if (my >= 430 && my <= 455) {
            stroke(175);
            fill(175);
          } else {
            stroke(75);
            fill(75);
          }
        } else {
          stroke(75);
          fill(75);
        }

        text("Help", 445, 450);
        stroke(0);
        fill(0);
      } else if (help == true) {

        if (mx >= 445 && mx <= 495) {
          if (my >= 430 && my <= 455) {
            stroke(175);
            fill(175);
          } else {
            stroke(75);
            fill(75);
          }
        } else {
          stroke(75);
          fill(75);
        }
        textSize(25);
        text("Back", 445, 450);

        stroke(0);
        fill(0);

        text("You have 90 seconds to catch", 300, 350);
        text("as many falling rainbows as", 315, 375);
        text("you can using your mouse.", 325, 400);

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
  for (var e = trackx.length; e > 0; e -= 1) {
    fill(100 + (6 * e));
    stroke(100 + (6 * e));
    var u1 = trackx[e];
    var u2 = tracky[e];
    var usize = (starwidth - (e)) / 7;

    push();
    translate(u1, u2)

    push();
    scale(((trackx.length - e) / starwidth), ((trackx.length - e) / starwidth));
    rotate(e);
    translate(-u1, -u2);

    triangle(u1 - (3 * usize), u2 - (2 * usize), u1 + (3 * usize), u2 - (2 * usize), u1, u2 + (3 * usize));
    triangle(u1 - (3 * usize), u2 + (1 * usize), u1 + (3 * usize), u2 + (1 * usize), u1, u2 - (4 * usize));
    pop();
    // triangle(u1 - (3 * usize), u2 + (1 * usize), u1 + (3 * usize), u2 + (1 * usize), u1, u2 - (4 * usize));
    // ellipse(this.x, this.y - (5 * d), this.wid - d, this.wid - d);
    pop();
    //ellipse(trackx[e], tracky[e], starwidth - (2 * e), starwidth - (2 * e));
  }
  fill(100);
  stroke(100);
  push();
  translate(u1, u2)

  push();
  rotate(spin / 30);
  translate(-u1, -u2);
  triangle(u1 - (3 * usize), u2 - (2 * usize), u1 + (3 * usize), u2 - (2 * usize), u1, u2 + (3 * usize));
  triangle(u1 - (3 * usize), u2 + (1 * usize), u1 + (3 * usize), u2 + (1 * usize), u1, u2 - (4 * usize));
  pop();

  pop();
  fill(0);
  //mouse
  spin++;
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
  time = 0;
  timer = 2700;
  score = 0;
  count = 0;
  timespace = 100;
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

function Ball() {
  this.wid = random(ballWid - 20, ballWid);
  this.active = false;
  this.clicked = false;
  this.exploded = false;
  this.y = 0 - ballWid;
  this.F = this.wid;
  this.r1 = random(-5, 5);
  this.r2 = random(-5, 5);
  this.r3 = random(-5, 5);
  this.r4 = random(-5, 5);
  this.r5 = random(-5, 5);


  this.explodetimer = 0;

  this.activate = function() {
    this.x = random(this.wid, (width - this.wid));
    this.y = 0 - this.wid;
    this.active = true;
    this.clicked = false
  }

  this.clickit = function() {
    this.clicked = true;
  }

  this.clicked = function() {
    return this.clicked;
  }

  this.deactivate = function() {
    this.y = 0 - this.wid;
    this.active = false;
    this.exploded = false;
    this.clicked = false
    this.F = this.wid;
  }

  this.active = function() {
    return this.active;
  }

  this.collide = function() {
    for (var d = 0; d < this.wid; d += 2) {
      if (mx + (starwidth / 3) >= (this.x - (this.wid - d) / 2) && mx - (starwidth / 3) <= (this.x + (this.wid - d) / 2)) {
        if (my + (starwidth / 3) >= ((this.y - (5 * d)) - (this.wid - d) / 2) && my - (starwidth / 3) <= ((this.y - (5 * d)) + (this.wid - d) / 2)) {
          if ((255 - (d * 5)) >= 30) {
            return true;
          }
        }
      }
    }
  }

  this.fall = function() {
    if (this.clicked == false) {
      this.y += 15 + (2700 - timer) / 100;
      if (this.y > (height + (this.wid * 5))) {
        this.active = false;
      }
    }
  }

  this.drawball = function() {
    //if (this.clicked == false) {
    colorMode(HSB);
    if (pause == false) {
      fill(50, 50, 100);
      stroke(50, 50, 100);
    } else {
      fill(50, 10, 100);
      stroke(50, 10, 100);
    }
    ellipse(this.x, this.y, this.wid, this.wid); //actual ball
    for (var d = 0; d < this.wid; d += 2) {
      var M = 175 / (this.wid / 2);
      if (d * M > 50) {
        var H1 = 410 - (d * M);
      } else {
        var H1 = 50 - (d * M);
      }
      if (pause == false) {
        var H2 = 50;
        var H3 = 100;
      } else {
        var H2 = 10;
        var H3 = 100;
      }
      colorMode(HSB);
      fill(H1, H2, H3);
      stroke(H1, H2, H3);
      ellipse(this.x, this.y - (5 * d), this.wid - d, this.wid - d);
    }
    colorMode(RGB);
    stroke(0);
    fill(0);

    // }
  }

  this.collapse = function() {
    for (var d = 0; d < this.wid; d += 1) { //iterate up the line
      //colour changes blah bla fucking blah
      var M = 175 / (this.wid / 2);
      if (d * M > 50) {
        var H1 = 410 - (d * M);
      } else {
        var H1 = 50 - (d * M);
      }
      var H2 = 50;
      var H3 = 100;
      colorMode(HSB);
      fill(H1, H2, H3);
      stroke(H1, H2, H3);


      // if clause to only draw certain ones
      if (d <= this.F) {
        ellipse(this.x, this.y - (5 * d), this.wid - d, this.wid - d);
      }
      //drawing of each circle
      if (0 >= this.F) {
        this.exploded = true;
      }
    }
    colorMode(RGB);
    stroke(0);
    fill(0);
    this.F -= 5;
  }

  this.explode = function() {
    if (this.explodetimer <= 40) {
      colorMode(HSB);
      noStroke();
      fill(50, 70 - this.explodetimer, 100);
      ellipse(this.x + (this.r1 * this.explodetimer), this.y, this.wid - this.explodetimer, this.wid - this.explodetimer);
      fill(50, 65 - this.explodetimer, 100);
      ellipse(this.x + (this.r2 * this.explodetimer), this.y, this.wid - this.explodetimer, this.wid - this.explodetimer);
      fill(50, 60 - this.explodetimer, 100);
      ellipse(this.x + (this.r3 * this.explodetimer), this.y + (this.r3 * this.explodetimer), this.wid - this.explodetimer, this.wid - this.explodetimer);
      fill(50, 55 - this.explodetimer, 100);
      ellipse(this.x, this.y + (this.r4 * this.explodetimer), this.wid - this.explodetimer, this.wid - this.explodetimer);
      fill(50, 50 - this.explodetimer, 100);
      ellipse(this.x, this.y + (this.r5 * this.explodetimer), this.wid - this.explodetimer, this.wid - this.explodetimer);
      colorMode(RGB);
      stroke(0);
      fill(0);
      this.explodetimer++;
    } else {
      this.explodetimer = 0;
      this.deactivate();
    }
  }
}
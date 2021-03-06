var scenes = new SceneManager();

// /* GUI Params */
// var Menu_Hide = true;
// var Lake_Color = '#7bceef';
// var menui;

/* Compatibility Check Elements */
var compatBoard;

/* Opening Menu Elements */
var introBoard;
var introStartDys;
var introStartIntmdt;
var introStartProd;
var introStartDys;
var introStartDysProd;
var visitedHelp = false;
var secondHelp = false;

/* Menu Colors */
var colorBackgroundPrimary = 0;
var colorBackgroundAccent = 50;
//
var colorTextPrimary = 200;
var colorTextSecondary = 175;
//
var colorTextHighlight = [75, 75, 255];
//
var colorButtonBackground = [100, 200, 300];
var colorButtonText = [255, 255, 255];

/* Simulator Elements */
var D0;
var submitButton;
var goBack;
var measurements;     // the display panel
var drawMeasurements = true;
var attemptsLeftBoard;
var clearPass = 0;
var intermediatePass = 0;
var productivePass = 0;
var dystrophicPass = 0;
var dystrophicProductivePass = 0;

/* Lake Variables */
var lakeType;                 // String
var lakeColor;                // Color
var lakeDepth;                // Double
var lakeTarget;               // Double

var message = "Please begin.";

var clearLakeAttempts;
var intermediateLakeAttempts;
var productiveLakeAttempts;
var dystrophicLakeAttempts;
var dystrophicProductiveLakeAttempts;

/* Reading Results Elements */
var resultsBoard;
var resultsRestart;
var failedMessage;
/* Results Variables */
var attemptsLeft = 3;
var measuredDepth;            // Double
var measuredError;            // Double
var measuredErrorRel;         // Double
var measuredTolerance;        // String
/* Animation Variable on Results Page*/
var animationY;


var clearLake;
var clearLakeFinal;
var intermediateLake;
var intermediateLakeFinal;       //For using images in the future
var productiveLake;
var productiveLakeFinal;
var dystrophicLake;
var dystrophicLakeFinal;
var dystrophicProductiveLake;
var dystrophicProductiveLakeFinal;
var tapepic1;
var tapepic2;
var secchiReadings;
var secchiSkyPerson;
var secchiSolo;
var secchiDisk;
var manWithSecchi;


function preload() {
    clearLake = loadImage('libraries/clearLake.png');
    clearLakeFinal = loadImage('libraries/clearFinal.png');
    intermediateLake = loadImage('libraries/intermediateLake.png');
    intermediateLakeFinal = loadImage('libraries/intermediateFinal.png');
    productiveLake = loadImage('libraries/productiveLake.png');
    productiveLakeFinal = loadImage('libraries/productiveFinal.png');
    dystrophicLake = loadImage('libraries/dystrophicLake.png');
    dystrophicLakeFinal = loadImage('libraries/dystrophicFinal.png');
    dystrophicProductiveLake = loadImage('libraries/dystrophicProductiveLake.png');
    dystrophicProductiveLakeFinal = loadImage('libraries/dystrophicProductiveFinal.png');
}


function setup() {

  windowWidth = 1200;     //Static Window Width and Height
  windowHeight = 600;

  /* --- Compatibility Check Scene --- */
  scenes.addScene(new Scene(windowWidth, windowHeight,
    function() {
      // setup
      background(0);
      compatBoard = new TextBoard(width / 6, height / 4, width * 2 / 3, height / 2);
    },
    function() {
      // draw

      // If the compatbility check passes, skip to the full app
      if (compatCheck()) {
        scenes.nextScene();
        scenes.setup();
      }

      scenes.background(0);
      // compatBoard.draw();
    }
  ));

  /* --- Opening Menu Scene --- */
  scenes.addScene(new Scene(windowWidth, windowHeight,
  function() {
    // setup()
    var left = width / 7;
    var right = width - left;
    var top = height / 4;
    var bottom = height - top  / 6;

    introBoard = new TextBoard(25, 23, windowWidth - 50, windowHeight - 50);
    introBoard.background = color(255, 255, 250);
    introBoard.addTab();
    introBoard.addTab();
    introBoard.addText("Secchi Reading Simulator", color(56, 32, 0), 60, "Helvetica", BOLD);
    introBoard.addParagraph();
    introBoard.addParagraph();
    introBoard.addParagraph();
    introBoard.addText("  Volunteers need to take only one qualifying reading for re-certification. Please select a lake type that is most similar to the lake that you monitor.", color(45, 84, 116), 16, "Helvetica");
    introBoard.addParagraph();
    introBoard.addParagraph();
    introBoard.addTab();
    introBoard.addTab();
    introBoard.addText("  (If you are not sure which lake is closest to the one you monitor, please select the Clear Lake)");
    introBoard.addParagraph();
    introBoard.addParagraph();
   // introBoard.addText("Select Your Lake Type", 240, 20, "Helvetica", BOLD);
    introBoard.addParagraph();
    introBoard.addParagraph();
    introBoard.addText("    Lake Type", color(56, 32, 0), 16, "Helvetica");
    introBoard.addTab();
    introBoard.addText("    Description");
    introBoard.addTab();
    introBoard.addTab();
    introBoard.addTab();
    introBoard.addTab();
    introBoard.addText("                  Completion Status");
    introBoard.addParagraph();
    introBoard.addParagraph();
    introBoard.addParagraph();
    introBoard.addParagraph();
    introBoard.addTab();
    introBoard.addTab();
    introBoard.addText("    Bluish color, with readings deeper than 4 meters", color(45, 84, 116), 16, "Helvetica");
    introBoard.addTab();
    if (clearPass === 0){
      introBoard.addText("                   Incomplete", color(240,0,0), 16, "Helvetica");
    } else if (clearPass == 1) {
        introBoard.addText("                   Complete", color(0,240,0), 16, "Helvetica");
      }
    introBoard.addParagraph();
    introBoard.addParagraph();
    introBoard.addParagraph();
    introBoard.addParagraph();
    introBoard.addTab();
    introBoard.addTab();
    introBoard.addText("    Blue or green-brown, with readings between 4 and 7 meters", color(45, 84, 116), 16, "Helvetica");
    introBoard.addTab();
      if (intermediatePass === 0){
      introBoard.addText("                   Incomplete", color(240,0,0), 16, "Helvetica");
    } else if (intermediatePass == 1) {
        introBoard.addText("                   Complete", color(0,240,0), 16, "Helvetica");
      }
      introBoard.addParagraph();
      introBoard.addParagraph();
      introBoard.addParagraph();
      introBoard.addParagraph();
      introBoard.addTab();
      introBoard.addTab();
      introBoard.addText("    Green Background, high algae content, readings shallower than 3 meters", color(45, 84, 116), 16, "Helvetica");
      if (productivePass === 0){
      introBoard.addText("        Incomplete", color(240,0,0), 16, "Helvetica");
    } else if (productivePass == 1) {
        introBoard.addText("        Complete", color(0,240,0), 16, "Helvetica");
      }
      introBoard.addParagraph();
      introBoard.addParagraph();
      introBoard.addParagraph();
      introBoard.addTab();
      introBoard.addTab();
      introBoard.addText("    Dystrophic lakes have a distinct tea or rootbeer color with typically", color(45, 84, 116), 16, "Helvetica");
      introBoard.addParagraph();
      introBoard.addTab();
      introBoard.addTab();
      introBoard.addText("    shallower Secchi readings", color(45, 84, 116), 16, "Helvetica");
      introBoard.addTab();
      introBoard.addTab();
      introBoard.addTab();
      if (dystrophicPass === 0){
      introBoard.addText("                   Incomplete", color(240,0,0), 16, "Helvetica");
    } else if (dystrophicPass == 1) {
        introBoard.addText("                   Complete", color(0,240,0), 16, "Helvetica");
      }
      introBoard.addParagraph();
      introBoard.addParagraph();
      introBoard.addParagraph();
      introBoard.addParagraph();
      introBoard.addTab();
      introBoard.addTab();
      introBoard.addText("    Green-brown and murky, readings shallower than 3 meters", color(45, 84, 116), 16, "Helvetica");
      introBoard.addTab();
        if (dystrophicProductivePass === 0){
      introBoard.addText("                   Incomplete", color(240,0,0), 16, "Helvetica");
    } else if (dystrophicProductivePass == 1) {
        introBoard.addText("                   Complete", color(0,240,0), 16, "Helvetica");
      }
        // "Productive     Green background, high algae, readings lower than 3 meters\n" +
        // "Dystrophic     Distinct tea or rootbeer color, readings lower than  meters");
    introStartClear = new Button(50, 275, 160, 40, "Clear",
      function() {
        // Button Selected
          setLakeType(1);
          if(!visitedHelp)
          {
            scenes.nextScene();
            scenes.setup();
          }
          else
          {
            scenes.setScene(4);
            scenes.setup();
          }
      },
      function() {}
    );
    introStartClear.fontColor = 255;
    introStartClear.fontSize = 16;

    introStartIntmdt = new Button(50, 335, 160, 40, "Intermediate",

      function() {
        // Button Selected
        setLakeType(2);
        if(!visitedHelp)
          {
            scenes.nextScene();
            scenes.setup();
          }
          else
          {
            scenes.setScene(4);
            scenes.setup();
          }
      },
      function() {}
    );
    introStartIntmdt.fontColor = 255;
    introStartIntmdt.fontSize = 16;

    introStartProd = new Button(50, 395, 160, 40, "Productive",

      function() {
        // Button Selected
          setLakeType(3);
          if(!visitedHelp)
          {
            scenes.nextScene();
            scenes.setup();
          }
          else
          {
            scenes.setScene(4);
            scenes.setup();
          }
      },
      function() {}
    );
    introStartProd.fontColor = 255;
    introStartProd.fontSize = 16;

    introStartDys = new Button(50, 455, 160, 40, "Dystrophic",
      function() {
        // Button Selected
          setLakeType(4);
          if(!visitedHelp)
          {
            scenes.nextScene();
            scenes.setup();
          }
          else
          {
            scenes.setScene(4);
            scenes.setup();
          }
      },
      function() {}
    );
    introStartDys.fontColor = 255;
    introStartDys.fontSize = 16;

    introStartDysProd = new Button(50, 515, 160, 40, "Dystrophic Productive",
      function() {
        // Button Selected
          setLakeType(5);
          if(!visitedHelp)
          {
            scenes.nextScene();
            scenes.setup();
          }
          else
          {
            scenes.setScene(4);
            scenes.setup();
          }
      },
      function() {}
    );
    introStartDysProd.fontColor = 255;
    introStartDysProd.fontSize = 14;

    homeButton = new Button(1000, 515, 160, 40, "MaineVLMP Home",
        function()
        {
          window.location.href = '../show_tests.php?';
        }
      );

    helpButton = new Button(1000, 455, 160, 40, "Instructions",
        function()
        {
          secondHelp = true;
          scenes.setScene(3);
          scenes.setup();
        }
      );
    homeButton.fontColor = 255;
    helpButton.fontColor = 255;
    homeButton.fontSize = 16;
    helpButton.fontSize = 16;
  },
  function() {
    // draw()
    background(45, 84, 116);
    introBoard.draw();
    introStartClear.run();
    introStartIntmdt.run();
    introStartProd.run();
    introStartDys.run();
    introStartDysProd.run();
    homeButton.run();
    helpButton.run();
    stroke(56, 32, 0);
    line(45, 265, 980, 265);
    line(45, 325, 980, 325);
    line(45, 385, 980, 385);
    line(45, 445, 980, 445);
    line(45, 505, 980, 505);

    line(215, 230, 215, 560);
    line(800, 230, 800, 560);
  })
);
  /* --- End Intro Menu Scene --- */

  /* --- Instruction Scene --- */
  scenes.addScene(new Scene(windowWidth, windowHeight,
    function() {

      var left = windowWidth / 12;
      var right = windowWidth - left;
      var top = windowHeight / 12;
      var bottom = windowHeight - top;

      descBoard = new TextBoard(25, 23, windowWidth - 50, windowHeight - 50);
      descBoard.background = 255;
      descBoard.accent = colorBackgroundAccent;
      fill(255,0,0);
      descBoard.addText("  How to Use the Secchi Disk Simulator", color(56, 32, 0), 60, "Helvetica", BOLD);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addTab();
      descBoard.addTab();
      descBoard.addText("        The ", color(56, 32, 0), 18, "Helvetica");
      descBoard.addText("up and down arrows ", color(47, 135, 66), 18, "Helvetica");
      descBoard.addText("on your keyboard control the movement of the secchi disk.", color(56, 32, 0), 18, "Helvetica");
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addTab();
      descBoard.addTab();
      descBoard.addText("        The ");
      descBoard.addText("down arrow ", color(47, 135, 66), 18, "Helvetica");
      descBoard.addText("moves the disk further into the water, and the ", color(56, 32, 0), 18, "Helvetica");
      descBoard.addText("up arrow ", color(47, 135, 66), 18, "Helvetica");
      descBoard.addText("retrieves it.", color(56, 32, 0), 18, "Helvetica");
      descUpArrow = new RoundedBox(150, 400, 80, 60);
      descDownArrow = new RoundedBox(150, 500, 80, 60);
      descLeftArrow = new RoundedBox(50, 500, 80, 60);
      descRightArrow = new RoundedBox(250, 500, 80, 60);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addTab();

      // descBoard.addTab(1);
      descBoard.addText("Holding down ", color(47, 135, 66), 18, "Helvetica");
      descBoard.addText("the arrow keys will ", color(56, 32, 0), 18, "Helvetica");
      descBoard.addText("build up momentum", color(47, 135, 66), 18, "Helvetica");
      descBoard.addText(", if you want to move it with ", color(56, 32, 0), 18, "Helvetica");
      descBoard.addText("precision", color(47, 135, 66), 18, "Helvetica");
      descBoard.addText(", only ", color(56, 32, 0), 18, "Helvetica");
      descBoard.addText("tap the arrow keys.", color(47, 135, 66), 18, "Helvetica");

      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      // descBoard.addTab(1);
      descBoard.addText("          Measure the depth at which the disk has ", color(56, 32, 0), 18, "Helvetica");
      descBoard.addText("just disappeared", color(47, 135, 66), 18, "Helvetica");
      descBoard.addText(" out of view. Click ", color(56, 32, 0), 18, "Helvetica");
      descBoard.addText("submit", color(47, 135, 66), 18, "Helvetica");
      descBoard.addText(" when you think the reading is accurate.", color(56, 32, 0), 18, "Helvetica");

      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addParagraph(5);
      descBoard.addTab();
      descBoard.addTab();
      descBoard.addTab();
      // descBoard.addTab(1);
      descBoard.addText("        You will have ");
      descBoard.addText("three attempts", color(47, 135, 66), 18, "Helvetica");
      descBoard.addText(" to take a proper measurement", color(56, 32, 0), 18, "Helvetica");

      descBoardClear = new Button(1050, 500, 100, 60, "Continue",
        function() {
          // Button Selected
            if(!secondHelp)
            {
              scenes.nextScene();
              scenes.setup();
            }
            else
            {
              scenes.setScene(2);
              secondHelp = false;
            }
        },
        function() {}
      );
      descBoardClear.fontSize = 18;
      descBoardClear.fontColor = colorButtonText;
    },
    function() {
      background(45, 84, 116);
      descBoard.draw();
      descBoardClear.run();
      descUpArrow.run();
      visitedHelp = true;
      // descDownArrow.run();
    })
  );
  /* --- End Instruction Scene --- */

  /* --- Simulator Scene --- */
  scenes.addScene(new Scene(windowWidth, windowHeight,
    function() {
      // setup()
      D0 = new disk();

      attemptsLeft = 3;
      message = "Please begin.";

      submitButton = new Button2(width - 300, height - 340, 110, 50, "Submit",
        function() {
        // Button Selected
        // Analyze trial and give feedback
        // NOTE: THESE SELECT AND DESELECT FUNCTIONS ARE THE SAME BECAUSE IT ALTERNATES PER PRESS

        if (D0.currentDepth != -0.1) {
          measuredDepth = D0.currentDepth;
          if (analyzeTrial()) {                          // if correct move to next scene, otherwise the run section below
            scenes.nextScene();                        // will deal with the case of no chances left
            scenes.setup();
            attemptsLeft--;
            if (lakeType == "Clear") {
              clearPass = 1;
              var depthClear = createDiv().hide().id("depthValuesClear").value(
                [
                  1,
                  floor(D0.currentDepth*100)/100,
                  floor(lakeTarget*100)/100,
                  3-attemptsLeft
                ]
                );
            }
            if (lakeType == "Intermediate") {
              intermediatePass = 1;
              var depthIntermediate = createDiv().hide().id("depthValuesIntermediate").value(
                [
                  2,
                  floor(D0.currentDepth*100)/100,
                  floor(lakeTarget*100)/100,
                  3-attemptsLeft
                ]
                );
            }
            if (lakeType == "Productive"){
              productivePass = 1;
              var depthProductive = createDiv().hide().id("depthValuesProductive").value(
                [
                  3,
                  floor(D0.currentDepth*100)/100,
                  floor(lakeTarget*100)/100,
                  3-attemptsLeft
                ]
                );
            }
            if (lakeType == "Dystrophic") {
              dystrophicPass = 1;
              var depthDystrophic = createDiv().hide().id("depthValuesDystrophic").value(
                [
                  4,
                  floor(D0.currentDepth*100)/100,
                  floor(lakeTarget*100)/100,
                  3-attemptsLeft
                ]
                );
            }
            if (lakeType == "Dystrophic Productive") {
              dystrophicProductivePass = 1;
              var depthDystrophicProductive = createDiv().hide().id("depthValuesDProductive").value(
                [
                  5,
                  floor(D0.currentDepth*100)/100,
                  floor(lakeTarget*100)/100,
                  3-attemptsLeft
                ]
                );
            }
            } else {
              attemptsLeft--;
            }
          }
        },
        function() {
          // Button Deselected
          // if (D0.currentDepth != 0) {
            // measuredDepth = D0.currentDepth;
            // if (analyzeTrial()) {
            // 	scenes.nextScene();
            // 	scenes.setup();
            // 	} else {
            // 		// console.log(attemptsLeft);
          //      message = "You're too far off. Try again!";
            // 		attemptsLeft--;
            // 	}
          //  }
        }
      );
      submitButton.fontColor = 255;

      goBack = new Button(width - 170, height - 340, 110, 50, "Switch Types",
        function() {
          scenes.setScene(2);
          scenes.setup();
        }
      );
      goBack.fontColor = 255;
      goBack.fontSize = 16;
      submitButton.fontSize = 16;

    },
    function() {                                    // THIS IS WHERE THE STUFF FOR THE SIM IS DRAWN
      scenes.background(colorBackgroundAccent);

        // fill(lakeColor);
        strokeWeight(5);
        ellipse(width/3+30,height/2,width*.55, height*1.1);
        if (lakeType == "Clear") {
          image(clearLake, -100, -200);
        }
        if (lakeType == "Intermediate") {
          image(intermediateLake, -100, -200);
        }
        if (lakeType == "Productive"){
          image(productiveLake, -100, -200);
        }
        if (lakeType == "Dystrophic") {
          image(dystrophicLake, -100, -200);
        }
        if (lakeType == "Dystrophic Productive") {
          image(dystrophicProductiveLake, -100, -200);
        }

        strokeWeight(0);
        fill("black");
        rect(width - width/4.5, 0, width, height);

        D0.maxDepth = ceil(lakeDepth)-1;
        D0.run();
        // Make the button do
        submitButton.run();
        goBack.run();



      titleBackground = new TextBoxBackground(width - 300, height - 540, 240, 110, "", function(){});
      titleBackground.run();
      measureDepth = new TextBox(width - 295, height - 535, 230, 100, "Secchi Disk\nSimulator", function(){});
      measureDepth.fontSize = 35;
      measureDepth.run();

      depthBackground = new TextBoxBackground(width - 300, height - 425, 240, 80, "", function(){});
      depthBackground.run();
      simInfo = new TextBox3(width - 295, height - 420, 230, 70, "Current Depth: \n" + floor(D0.currentDepth*100)/100 + " Meters", function(){});
      simInfo.run();

      attemptBackground = new TextBoxBackground(width - 300, height - 285, 240, 60, "", function(){});
      attemptBackground.run();
      visualAttempts = new TextBox(width - 295, height - 280, 230, 50, "Attempts Left: " + attemptsLeft, function(){});
      if(attemptsLeft == 3){
        visualAttempts.fontColor = color(0, 230, 0);
      }
      if(attemptsLeft == 2){
        visualAttempts.fontColor = color(255, 165, 0);
      }
      if(attemptsLeft == 1){
        visualAttempts.fontColor = color(230, 0, 0);
      }
      visualAttempts.run();

      simBackground = new TextBoxBackground(width - 300, height - 220, 240, 160, "", function(){});
      simBackground.run();
      messageDisplay = new TextBox(width - 295, height - 215, 230, 150, message, function(){});
      messageDisplay.run();





      // If chances are zero, move to results
      if(attemptsLeft == 0)
      {
      	scenes.nextScene();
        scenes.setup();
      }

      strokeWeight(0);
      dropShadow(0, 0, 0, 0);

      push();
      fill(0, 0, 0, 0);
      strokeWeight(50);
      stroke(colorBackgroundAccent);
      rect(0, 0, 1200, 600);
      pop();
    })
  );
  /* --- End Simulator Scene --- */

  /* --- Reading Results Scene --- */
  scenes.addScene(new Scene(windowWidth, windowHeight,
    function() {
      // setup()
      animationY = windowHeight/12;

      resultsBoard =  new TextBoard(25, 23, windowWidth - 50, windowHeight - 50);

      resultsBoard.background = color(255);

      resultsBoard.accent = colorBackgroundAccent;
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addText("       Reading Results", color(56, 32, 0), 50, "Helvetica", BOLD);
      resultsBoard.addParagraph(5);
      resultsBoard.addParagraph(5);
      resultsBoard.addParagraph(5);
      resultsBoard.addParagraph(5);
      resultsBoard.addParagraph(5);
      resultsBoard.addParagraph(5);
      resultsBoard.addParagraph(5);
      resultsBoard.addParagraph(5);
      resultsBoard.addParagraph(5);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addText("Lake Information", 100, 18, "Helvetica", BOLD);
      resultsBoard.addTab(1);
      resultsBoard.addText("Your Results");

     //("Words", color, size, font, type);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addText("Lake Type", 20, 20, "Helvetica", BOLD);
      resultsBoard.addTab(1);
      resultsBoard.addText(lakeType, color(45, 84, 116), 20, "Helvetica", BOLD);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addText("Target Depth", 20, 20, "Helvetica", BOLD);
      resultsBoard.addTab(1);
      resultsBoard.addText(lakeTarget.toFixed(2) + " meters", color(45, 84, 116), 20, "Helvetica", BOLD);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addText("Measured Depth", 20, 20, "Helvetica", BOLD);
      resultsBoard.addTab(1);
      resultsBoard.addText(measuredDepth.toFixed(2) + " meters", color(45, 84, 116), 20, "Helvetica", BOLD);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addText("Error (absolute)", 20, 20, "Helvetica", BOLD);
      resultsBoard.addTab(1);
      resultsBoard.addText(measuredError.toFixed(2) + " meters", color(45, 84, 116), 20, "Helvetica", BOLD);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addText("Error (relative)", 20, 20, "Helvetica", BOLD);
      resultsBoard.addTab(1);
      resultsBoard.addText(measuredErrorRel.toFixed(2) + "%", color(45, 84, 116), 20, "Helvetica", BOLD);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addParagraph(3);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addTab(1);
      resultsBoard.addText("Within Tolerance?", 20, 20, "Helvetica", BOLD);
      resultsBoard.addText("       " + measuredTolerance, color(45, 84, 116), 20, "Helvetica", BOLD);

      introStartDysProd.fontSize = 14;

      submitResults = new Button(505, 150, 125, 50, "Submit Results",
        function() {
          serverConnect();
          scenes.setScene(2);
          scenes.setup();
        });
      submitResults.fontColor = 240;
      submitResults.fontSize = 14;
    },
    function() {
      // draw()
      var animationWindowX = 1000;
      var animationWindowY = 25;
      var animationWindowW = 175;
      var animationWindowH = 550;
      var diskH = 5;
      var diskW = 400/3;
      var tapeW = 6;

      var percentMeasuredY = measuredDepth/lakeDepth;
      var measuredY = animationWindowY + (animationWindowH * percentMeasuredY);

      var percentY = lakeTarget/lakeDepth;
      var targetY = animationWindowY + (animationWindowH * percentY);
      //tolerance is +-0.10 meters
      var percentToleranceY = .1/lakeDepth;
      var upperToleranceY = targetY - (animationWindowH * percentToleranceY);
      var lowerToleranceY = targetY + (animationWindowH * percentToleranceY);
      var greenZone = lowerToleranceY - upperToleranceY;

      background(45, 84, 116);
      resultsBoard.draw();
      push();

      //lake background
      if (lakeType == "Clear") {
          image(clearLakeFinal, animationWindowX, animationWindowY-2);
        }
        if (lakeType == "Intermediate") {
          image(intermediateLakeFinal, animationWindowX, animationWindowY-2);
        }
        if (lakeType == "Productive"){
          image(productiveLakeFinal, animationWindowX, animationWindowY-2);
        }
        if (lakeType == "Dystrophic") {
          image(dystrophicLakeFinal, animationWindowX, animationWindowY-2);
        }
        if (lakeType == "Dystrophic Productive") {
          image(dystrophicProductiveLakeFinal, animationWindowX, animationWindowY-2);
        }
      //green area
      fill(100,255,100,200);
      rect(animationWindowX, upperToleranceY, animationWindowW, greenZone);
      if (greenZone > animationWindowX + animationWindowH) {
        greenZone = animationWindowX + animationWindowH;
      }

      resultsRestart = new Button(350, 150, 125, 50, "Test Again",
        function() {
          // Button Selected
          var rawValuesClear = document.getElementById("depthValuesClear");
          var rawValuesIntermediate = document.getElementById("depthValuesIntermediate");
          var rawValuesProductive = document.getElementById("depthValuesProductive");
          var rawValuesDystrophic = document.getElementById("depthValuesDystrophic");
          var rawValuesDProductive = document.getElementById("depthValuesDProductive");

          rawValuesClear == null ? true : rawValuesClear.parentNode.removeChild(rawValuesClear);
          rawValuesIntermediate == null ? true : rawValuesIntermediate.parentNode.removeChild(rawValuesIntermediate);
          rawValuesProductive == null ? true : rawValuesProductive.parentNode.removeChild(rawValuesProductive);
          rawValuesDystrophic == null ? true : rawValuesDystrophic.parentNode.removeChild(rawValuesDystrophic);
          rawValuesDProductive == null ? true : rawValuesDProductive.parentNode.removeChild(rawValuesDProductive);

          scenes.setScene(2);
          scenes.setup();
        },
        function() {}
      );
      resultsRestart.fontColor = 240;
      resultsRestart.fontSize = 18;

      //lines
      strokeWeight(1);
      stroke(255, 0, 0, 255);
      //target line
      line(animationWindowX + 1, targetY, animationWindowX + animationWindowW - 1, targetY);
      //upper bound
      line(animationWindowX + 1, upperToleranceY, animationWindowX + (animationWindowW*1/29) - 1, upperToleranceY);
      line(animationWindowX + (animationWindowW*2/29), upperToleranceY, animationWindowX + (animationWindowW*3/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*4/29), upperToleranceY, animationWindowX + (animationWindowW*5/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*6/29), upperToleranceY, animationWindowX + (animationWindowW*7/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*8/29), upperToleranceY, animationWindowX + (animationWindowW*9/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*10/29), upperToleranceY, animationWindowX + (animationWindowW*11/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*12/29), upperToleranceY, animationWindowX + (animationWindowW*13/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*14/29), upperToleranceY, animationWindowX + (animationWindowW*15/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*16/29), upperToleranceY, animationWindowX + (animationWindowW*17/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*18/29), upperToleranceY, animationWindowX + (animationWindowW*19/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*20/29), upperToleranceY, animationWindowX + (animationWindowW*21/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*22/29), upperToleranceY, animationWindowX + (animationWindowW*23/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*24/29), upperToleranceY, animationWindowX + (animationWindowW*25/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*26/29), upperToleranceY, animationWindowX + (animationWindowW*27/29), upperToleranceY);
      line(animationWindowX + (animationWindowW*28/29), upperToleranceY, animationWindowX + animationWindowW - 1, upperToleranceY);
      //lower bound
      line(animationWindowX + 1, lowerToleranceY, animationWindowX + (animationWindowW*1/29) - 1, lowerToleranceY);
      line(animationWindowX + (animationWindowW*2/29), lowerToleranceY, animationWindowX + (animationWindowW*3/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*4/29), lowerToleranceY, animationWindowX + (animationWindowW*5/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*6/29), lowerToleranceY, animationWindowX + (animationWindowW*7/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*8/29), lowerToleranceY, animationWindowX + (animationWindowW*9/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*10/29), lowerToleranceY, animationWindowX + (animationWindowW*11/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*12/29), lowerToleranceY, animationWindowX + (animationWindowW*13/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*14/29), lowerToleranceY, animationWindowX + (animationWindowW*15/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*16/29), lowerToleranceY, animationWindowX + (animationWindowW*17/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*18/29), lowerToleranceY, animationWindowX + (animationWindowW*19/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*20/29), lowerToleranceY, animationWindowX + (animationWindowW*21/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*22/29), lowerToleranceY, animationWindowX + (animationWindowW*23/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*24/29), lowerToleranceY, animationWindowX + (animationWindowW*25/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*26/29), lowerToleranceY, animationWindowX + (animationWindowW*27/29), lowerToleranceY);
      line(animationWindowX + (animationWindowW*28/29), lowerToleranceY, animationWindowX + animationWindowW - 1, lowerToleranceY);
      //tape
      fill(255,255,255,255);
      noStroke();
      rect((animationWindowX + (animationWindowW/2)) - (tapeW/2), animationWindowY, tapeW, animationY);
      //disk
      rect((animationWindowX + (animationWindowW/2)) - (diskW/2), animationY + animationWindowY, diskW, diskH);
      fill(255,0,0);
      stroke(0);
      strokeWeight(1);
      triangle(animationWindowX - 15, (animationY + animationWindowY) - 10, animationWindowX + 5, (animationY + animationWindowY), animationWindowX - 15, (animationY + animationWindowY) +10);
      animationY = animationY + 2;
        if (animationY > measuredY - animationWindowY) {
          animationY = measuredY - animationWindowY;
          animationY = animationY + 0;
        };
      pop();
      resultsRestart.run();
      submitResults.run();

    })
  );
  /* --- End Reading Results Scene --- */
}

function draw() {
  scenes.draw();
}

function compatCheck () {
  return true;
}

function setLakeType (type) {
  /* type : int
   * Clear : 1
   * Intermediate : 2
   * Productive : 3
   * Dystrophic : 4
   * Dystrophic Productive : 5
   */

   switch (type) {
      case 1:
        lakeType = "Clear";
        lakeColor = "#6fa5fc";
        lakeDepth = 7;
        lakeTarget = random(4, 7);
        break;
      case 2:
        lakeType = "Intermediate";
        lakeColor = "#bfc18b";
        lakeDepth = 7;
        lakeTarget = random(3.5, 7);
        break;
      case 3:
        lakeType = "Productive";
        lakeColor = "#6b8474";
        lakeDepth = 5;
        lakeTarget = random(2, 3);
        break;
      case 4:
        lakeType = "Dystrophic";
        lakeColor = "#82753a";
        lakeDepth = 5;
        lakeTarget = random(2, 3);
        break;
      case 5:
        lakeType = "Dystrophic Productive";
        lakeColor = "#8a9663";
        lakeDepth = 5;
        lakeTarget = random(1, 3);
        break;
   }
}



/*
 * Trial Analysis Skeleton
 * Actual Target Value: #.## (+-0.10) meters
 * measuredDepth: #.## meters
 * measuredError (absolute): #.## meters
 * measuredErrorRel (relative): ##.##%
 * measuredTolerance: "Yes"/"No"
 *
 */
 function analyzeTrial() {
   measuredError = abs(measuredDepth - lakeTarget);
   measuredErrorRel = measuredError / lakeTarget * 100;
   if (measuredDepth < lakeTarget) {
     message = "You're too shallow! Try again.";
   }
   if (measuredDepth > lakeTarget) {
     message = "You're too deep! Try again.";
   }

   if (measuredErrorRel < 2.0) {
     measuredTolerance = "Yes";
     return true;
   } else {
     measuredTolerance = "No";
     return false;
   }
 }

function disk(){ //THE BIG DISK CLASS
 this.P0 = createVector(width/6, height/6); // BEGIN POINT    // changed from height/8
 this.P1 = createVector(width/2+70, height/2+70); // END POINT

 this.maxDepth = lakeDepth; //10; // MAXIMUM DEPTH OF DISK

 this.currentDepth = 0; //CURRENT DEPTH OF DISK
 this.deltaDepth = 0;
 this.deltaDelta = 0;

 this.x = 0; //  X POSITON OF THE DISK, INITIALIZE TO BEGIN POINT
 this.y = 0 //  Y POSITON OF THE DISK, INITIALIZE TO BEGIN POINT

 this.rad = 0;  // RADIUS OF DISK
 this.hide = false; // DO YA WANNA SEE IT OR NA?

 this.dx = 0; // USE THIS FOR PERLIN NOISE
 this.detheta = 0; // VARIATION OF POSITION

 this.meterPos = createVector(width - width/3-10, height/10); // POSITION OF THE DEPTH METER

this.disp = function(){
  if(this.hide == false){ // WE DON'T WANT TO DRAW THE DISK IF IT'S HIDDEN
     //******* DRAW THE DISK
    push();

    var t = this.currentDepth; // a temp value for the lerp below                            // I think this is where the disk opacity is defined; old text below \/

    //New Opacity
    var alpha = ((1 - map(t,0,lakeTarget,0,1)) * 255 + map(t,0,lakeTarget,0,1) * 0);
    var delta = ((1 - map(t,0,lakeTarget,0,1)) * 255 + map(t,0,lakeTarget,0,1) * 0);

    stroke(255, alpha);
    noFill();
    ellipse(this.x, this.y, this.rad + delta, this.rad + delta);

    noStroke();
    fill(0, alpha);
    arc(this.x, this.y, this.rad, this.rad, 0, PI/2);
    arc(this.x, this.y, this.rad, this.rad, PI, 3*PI/2);

    fill(255, alpha);
    arc(this.x, this.y, this.rad, this.rad, PI/2, PI);
    arc(this.x, this.y, this.rad, this.rad, 3*PI/2, 0);



    pop();

    push();
    //Put a measuring tape on the secchi disk

    function gradientRect(x1, y1, x2, y2, x3, y3, x4, y4, color1, color2)
    {
      var xO = (x1+x2)/2;
      var xT = (x4+x3)/2;
      var yO = (y1+y2)/2;
      var yT = (y4+y3)/2;

      var grad = this.drawingContext.createLinearGradient(xO, yO, xT, yT);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);

      this.drawingContext.fillStyle = grad;

      beginShape();
        vertex(x1, y1);
        vertex(x2, y2);
        vertex(x3, y3);
        vertex(x4, y4);
      endShape();
    }


    gradientRect(-25, -25, -25, 75, this.x, this.y+this.rad/40, this.x, this.y-this.rad/40, color(255, 255, 255, 255), color(255, 255, 255, alpha));




    //For the depth of the lake, put a major tick mark on the measuring tape
    for(i = 1; i <= lakeDepth; i++)
    {
      //Finds where on the x and y axis to put the lines
      tickTimeX = map(i, 0, this.currentDepth+1, this.x, -25);
      tickTimeYBottom = map(i, 0, this.currentDepth+1, this.y + this.rad/40, 75);
      tickTimeYTop = map(i, 0, this.currentDepth+1, this.y - this.rad/40, -25);

      stroke("black");
      strokeWeight(3);
      line(tickTimeX, tickTimeYBottom, tickTimeX, tickTimeYTop);
      strokeWeight(1);
      //The 1 comes in weird, this is how I "fixed" it
      if(this.currentDepth > .68)
      {
        textSize(50*i/this.currentDepth);
        fill("black");
        text(i, tickTimeX, tickTimeYBottom);
      }
      else
      {
        textSize(50*i/this.currentDepth);
        fill("black");
        text(i, tickTimeX, tickTimeYTop);
      }
    }

    noFill();
    stroke(0);
    strokeWeight(174);
    ellipse(width/3+30,height/2,width*.7, height*1.4);
    rect(850, 0, 40, 900);
    strokeWeight(0);
    noStroke();

    noFill();
    stroke(40, 40, 40);
    strokeWeight(10);
    ellipse(width/3+30,height/2,width*.55, height*1.1);
    strokeWeight(0);
    noStroke();

    pop();

    push();
    //This draws the depth meter rectangle based on variables defined above
    strokeWeight(0);
    fill("white");
    dropShadow(4, 4, 4, "rgba(0, 0, 0, 0.2)");
    rect(this.meterPos.x, this.meterPos.y, 100, height/1.25);
    dropShadow(0, 0, 0, 0);
    fill(0, 0, 0, 0);
    strokeWeight(3);
    var depthMeter = rect(this.meterPos.x, this.meterPos.y, 100, height/1.25);
    //This adds the major tick marks to the depth meter
    for(var i = 0; i < lakeDepth; i++)
    {
      //Map values from 0 to the depth of lake to beginning of box to end of box in y direction and add tick marks along evenly
      var theta = map(i, 0, lakeDepth, this.meterPos.y, this.meterPos.y+height/1.25);
      strokeWeight(3);
      line(this.meterPos.x, theta, this.meterPos.x+25, theta);
      if(i > 0)
      {
        textSize(32);
        fill("black");
        text(i, this.meterPos.x+50, theta+12);
      }
      //This adds the smaller tick marks in between the other larger ones created right before this
      for(var j = 0; j < 10; j++)
      {
        var iota = map(j, 0, 10, this.meterPos.y, this.meterPos.y+height/1.25)/lakeDepth;
        strokeWeight(1);
        line(this.meterPos.x, theta+iota-2, this.meterPos.x+15, theta+iota-2);
      }
    }

    //This bit draws the moving triangle along the side of the rectangle, t is the current depth of the secchi disk
    fill("red");
    var tip = map(t, 0, lakeDepth, this.meterPos.y, this.meterPos.y+height/1.25);
    var depthTriangle = triangle(this.meterPos.x-15, tip+8, this.meterPos.x+15, tip, this.meterPos.x-15, tip-8);

    pop();
   }
 }

 this.update = function(){
   if(this.hide == false){ // WE DON'T WANT TO DRAW THE DISK IF IT'S HIDDEN

     this.dx += .005;
     var noiz = noise(this.dx/2);
     var dTheta = map(noiz, 0, .8, 0, 100);  //UPDATE PERLIN NOISE, HIGHER RANGE GREATER FLUCTUATION

     this.detheta += .02;
     var dRadius = map(noiz, 0, 1, 0, 20);
     var changeInDir = createVector(this.P1.x + dRadius*cos(3*this.detheta) , this.P1.y + dRadius*sin(2*this.detheta));

     var d0 = dist(this.P0.x, this.P0.y, this.P1.x, this.P1.y);

     //******* UPDATE X, Y POSITON OF DISK GIVEN DEPTH
     //this.currentDepth += .01; //UPDATE CURRENT DEPTH

     var direction = createVector(changeInDir.x - this.P0.x, changeInDir.y - this.P0.y);
     direction.normalize();

     this.deltaDelta = -.03*this.deltaDepth;

     if(keyIsDown(DOWN_ARROW) && this.currentDepth < lakeDepth)            // gets input only if the disk is under the limit
     	this.deltaDepth += .0005
     if(keyIsDown(UP_ARROW) && this.currentDepth >= 0)                // get input only when the disk is at or above 0
     	this.deltaDepth += -.0005
     if((this.currentDepth >= lakeDepth && this.deltaDepth > 0)|| (this.currentDepth < 0 && this.deltaDepth < 0))     // if the disk is at the limit and is still going up, or below zero and going down, stop it
     	this.deltaDepth = 0;
     this.deltaDepth += this.deltaDelta;
     this.currentDepth += this.deltaDepth;

     this.x = this.P0.x + (direction.x*(this.currentDepth * 60 + dTheta))%(d0*cos(atan(direction.y/direction.x)));
     this.y = this.P0.y + (direction.y*(this.currentDepth * 60 + dTheta))%(d0/direction.y);

     this.rad = dist(this.x, this.y, this.P1.x-10, this.P1.y-10);// decrease size of disk as it gets closer to the center

   }
 }

 this.sendIt = function(dir){
   // this.deltaDepth += dir*.005;        // Input is now handled in the update method
 }


 this.run = function(){
  this.update();
  this.disp();
 }

}

function RoundedBox(cornerX, cornerY, width, height)
{
  this.position = createVector(cornerX, cornerY);
  this.width = width;
  this.height = height;

  this.run = function()
  {
      fill(200, 200, 200);
      strokeWeight(5);
      stroke(100, 100, 100);

      rect(cornerX, cornerY, width, height, 5);
      rect(cornerX, cornerY+height+20, width, height, 5);
      rect(cornerX + 100, cornerY + height + 20, width, height, 5);
      rect(cornerX - 100, cornerY + height + 20, width, height, 5);

      fill("red");
      strokeWeight(0);

      triangle(cornerX+(width/4), cornerY+height+20+(height/3), cornerX+(width/2), cornerY+height+20+(3*(height/4)), cornerX+(3*(width/4)), cornerY+height+20+(height/3));
      triangle(cornerX+(width/4), cornerY+(2*(height/3)), cornerX+(width/2), cornerY+(height/4), cornerX+(3*(width/4)), cornerY+(2*(height/3)));
      fill("white");
  }
}

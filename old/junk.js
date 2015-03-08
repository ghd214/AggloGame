
  /*function beginLoop() {
      var frameId = 0,
          lastFrame = Date.now(),
          gameBoard;

      function loop() {
          var thisFrame = Date.now();
          var elapsed = thisFrame - lastFrame;

          canvas.setAttribute('width', window.innerWidth);
          canvas.setAttribute('height', window.innerWidth / 2);

          console.log(canvas.width);

          frameId = window.requestAnimationFrame(loop);

          gameBoard.update(elapsed);
          gameBoard.draw(surface);

          lastFrame = thisFrame;
      }

      loop();
  }

  surface = canvas.getContext('2d');

  mouse = (function (target) {
    var isButtonDown = false;

    target.addEventListener('mousedown', function () {
      isButtonDown = true;
    });
    target.addEventListener('mouseup', function () {
      isButtonDown = false;
    });

    return {
      isButtonDown: function () {
        return isButtonDown;
      }
    };
  }(document));

  gameBoard = (function (input) {
    var wasButtonDown = false;

    function draw(ctx, elapsed) {

    }

    function update() {

      hue += 1 * direction;
      if (hue > 255) direction = -1;
      if (hue < 1) direction = 1;

      var isButtonDown = input.isButtonDown();
      var mouseJustClicked = !isButtonDown && wasButtonDown;

      if (mouseJustClicked && !transitioning) {
        transitioning = true;
        // do something here to transition to the actual game
        title = 'Start Playing!';
      }

      wasButtonDown = isButtonDown;
    }

    return {
      draw: draw,
      update: update
    };
  }(mouse));

  beginLoop();*/
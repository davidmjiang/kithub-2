$(function () { // wait for document ready
    console.log($(window).width())
    var flightpath = {
      leave : {
        curviness: 1.25,
        autoRotate: true,
        values: [
        {x: -500,  y: -50},

          // {x: -1000,  y: 0},
            {x: -2000,  y: 100}

          ]
      },

      entry : {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: $(window).width(),  y: 0},
            {x: 100,  y: 630},

            {x: 300,  y: 900}
          ]
      }
    };
    // init controller
    var controller = new ScrollMagic.Controller();

    // create tween
    var tween = new TimelineMax()
      .add(TweenMax.to($("#paper"), 1.2, {css:{bezier:flightpath.entry}, ease:Power1.easeInOut}))
      // .add(TweenMax.to($("#paper"), 2, {css:{bezier:flightpath.looping}, ease:Power1.easeInOut}))
      .add(TweenMax.to($("#paper"), 1, {css:{bezier:flightpath.leave}, ease:Power1.easeInOut}));

    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: "#paper-trigger", duration: 500, offset: 100})
            .setPin("#paper-target")
            .setTween(tween)
            .addIndicators() // add indicators (requires plugin)
            .addTo(controller);
  })
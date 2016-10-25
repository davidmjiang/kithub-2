$(function () { // wait for document ready
  var flightpath = {
    entry : {
      curviness: 1.25,
      autoRotate: true,
      values: [
          {x: 100,  y: -300},
          {x: 300,  y: -190}
        ]
    },
    looping : {
      curviness: 1.25,
      autoRotate: true,
      values: [
          {x: 510,  y: -140},
          {x: 620,  y: -260},
          {x: 500,  y: -300},
          {x: 380,  y: -180},
          {x: 500,  y: -140},
          {x: 580,  y: -180},
          {x: 620,  y: -185}
        ]
    },
    leave : {
      curviness: 1.25,
      autoRotate: true,
      values: [
          {x: 660,  y: -180},
          {x: 800,  y: -100},
          {x: $(window).width() + 300,  y: -300},
        ]
    }
  };
  // init controller
  var controller = new ScrollMagic.Controller();

  // create tween
  var tween = new TimelineMax()
    .add(TweenMax.to($("#plane"), 1.2, {css:{bezier:flightpath.entry}, ease:SlowMo.easeInOut}))
    .add(TweenMax.to($("#plane"), 2, {css:{bezier:flightpath.looping}, ease:SlowMo.easeInOut}))
    .add(TweenMax.to($("#plane"), 1, {css:{bezier:flightpath.leave}, ease:SlowMo.easeInOut}));

  // build scene
  var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: 500, offset: 100})
          .setPin("#plane-target")
          .setTween(tween)
          .addIndicators() // add indicators (requires plugin)
          .addTo(controller);
})
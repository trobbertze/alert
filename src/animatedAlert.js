AnimatedAlert = function(options){
  // Famous Modules
  require("famous/core/famous");
  var View             = require('famous/core/View');
  var Surface          = require('famous/core/Surface');
  var Transform        = require('famous/core/Transform');
  var StateModifier    = require('famous/modifiers/StateModifier');
  var Transitionable   = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');

  Transitionable.registerMethod('spring', SpringTransition);

  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _AnimatedAlert(options) {
    View.apply(this);

    this.background = new Surface({
      size: [undefined, undefined],
      properties: {
        backgroundColor: "rgba(0,0,0, 0.2)",
        zIndex: 100
      }
    });

    this.backgroundModifier = new StateModifier({
      origin: [300,100],
      transform: Transform.translate(0, -window.innerHeight - 200),
      opacity: 0
    });


    this.messageSurface = new Surface({
      size: [ true, true ],
      properties: {
        padding: "2em",
        zIndex: 120
      },
      classes: [
        "alert",
        "alert-danger"
      ]
    });

    this.messageSurface.on("click", this.onClick.bind(this));

    this.messageModifier = new StateModifier({
      transform: Transform.translate(0, -window.innerHeight)
    });

    this.add(this.backgroundModifier).add(this.background);
    this.add(this.messageModifier).add(this.messageSurface);

  }
  // ---------------------------------------------------------------------------
  _AnimatedAlert.prototype = Object.create(View.prototype);
  _AnimatedAlert.prototype.constructor = _AnimatedAlert;
  // ---------------------------------------------------------------------------
  _AnimatedAlert.prototype.show = function(message, type) {
    this.messageModifier.halt();

    this.backgroundModifier.setTransform(
      Transform.translate(0, 0, 0)
    );

    this.backgroundModifier.setOpacity(1);

    this.messageSurface.setContent(message);

    this.messageModifier.setTransform(
      Transform.translate(0, 0, 0),
      {
        method: 'spring',
        period: 400,
        dampingRatio: 0.5
      }
    );
  };
  // ---------------------------------------------------------------------------
  _AnimatedAlert.prototype.hide = function() {
    this.messageModifier.halt();

    this.backgroundModifier.setOpacity(0);

    this.backgroundModifier.setTransform(
      Transform.translate(0, -window.innerHeight - 200, 0)
    );

    this.messageModifier.setTransform(
      Transform.translate(0, -window.innerHeight, 0),
      {
        method: 'spring',
        period: 500,
        dampingRatio: 0.3
      }
    );
  };
  // ---------------------------------------------------------------------------
  _AnimatedAlert.prototype.onClick = function(evt) {
    evt.stopPropagation();
    this.hide();
  };
  // ---------------------------------------------------------------------------
  return new _AnimatedAlert(options);
};

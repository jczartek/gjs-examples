#!/usr/bin/env gjs

//The code based on the example from https://developer.gnome.org/gtkmm-tutorial/stable/sec-drawing-clock-example.html.en

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const Cairo = imports.cairo;
const MainLoop = imports.mainloop;

const ClockWindow = new Lang.Class ({
  Name: 'ClockWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'Clock Cairo',
      default_width: 400,
      default_height: 400,
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect ('delete-event', Gtk.main_quit);

    this.drawingArea = new Clock ();
    this.add (this.drawingArea);

    this.timeout_id = MainLoop.timeout_add (1000, Lang.bind (this, function () {
      this.drawingArea.queue_draw();
      return true;
    }), 0);
  },

  run: function () {
    this.show_all ();
  }
});

const Clock = new Lang.Class ({
  Name: 'Clock',
  Extends: Gtk.DrawingArea,

  _init: function () {
    this.parent ();
    this.radius = 0.42;
    this.lineWidth = 0.05;
  },

  vfunc_draw: function (cxt) {
    const width = this.get_allocated_width();
    const height = this.get_allocated_height ();

    cxt.scale (width, height);
    cxt.translate (0.5, 0.5);
    cxt.setLineWidth (this.lineWidth);

    cxt.save ();
    cxt.setSourceRGBA (0.337, 0.612, 0.117, 0.9);
    cxt.paint ();
    cxt.restore ();
    cxt.arc (0, 0, this.radius, 0, 2 * Math.PI);
    cxt.save ();
    cxt.setSourceRGBA (1.0, 1.0, 1.0, 0.8);
    cxt.fillPreserve ();
    cxt.restore ();
    cxt.strokePreserve ();
    cxt.clip ();

    for (let i = 0; i < 12; i++) {
      let inset = 0.05;
      cxt.save ();
      cxt.setLineCap (Cairo.LineCap.ROUND);

      if (i % 3 != 0) {
        inset *= 0.8;
        cxt.setLineWidth (0.03);
      }

      cxt.moveTo ((this.radius - inset) * Math.cos (i * Math.PI / 6),
                  (this.radius - inset) * Math.sin (i * Math.PI / 6));
      cxt.lineTo (this.radius  * Math.cos (i * Math.PI / 6),
                  this.radius  * Math.sin (i * Math.PI / 6));
      cxt.stroke ();
      cxt.restore ();
    }

    let time = new Date ();

    let minutes = time.getMinutes () * Math.PI / 30;
    let hours = time.getHours () * Math.PI / 6;
    let seconds = time.getSeconds () * Math.PI / 30;

    cxt.save ();
    cxt.setLineCap (Cairo.LineCap.ROUND);

    // draw the seconds hand
    cxt.save ();
    cxt.setLineWidth (this.lineWidth / 3);
    cxt.setSourceRGBA (0.7, 0.7, 0.7, 0.8);
    cxt.moveTo (0, 0);
    cxt.lineTo (Math.sin (seconds) *(this.radius * 0.9),
               -Math.cos(seconds) * (this.radius * 0.9));
    cxt.stroke ();
    cxt.restore ();

    //draw the minutes hand
    cxt.setSourceRGBA (0.117, 0.337, 0.612, 0.9);
    cxt.moveTo (0, 0);
    cxt.lineTo (Math.sin (minutes + seconds / 60) * (this.radius * 0.8),
                -Math.cos (minutes + seconds / 60) * (this.radius * 0.8));
    cxt.stroke ();

    //draw the hours hand
    cxt.setSourceRGBA (0.337, 0.612, 0.117, 0.9);
    cxt.moveTo (0, 0);
    cxt.lineTo (Math.sin (hours + minutes / 12.0) * (this.radius * 0.5),
               -Math.cos (hours + minutes / 12.0) * (this.radius * 0.5));
    cxt.stroke ();
    cxt.restore ();

    cxt.arc (0, 0, this.lineWidth / 3.0, 0 , 2 * Math.PI);
    cxt.fill ();

    return true;

  }
});


function main () {
  Gtk.init (null, null);
  var win = new ClockWindow ();
  win.run ();
  Gtk.main ();
}

main ();

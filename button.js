#!/usr/bin/gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const Win = new Lang.Class ({
  Name: 'MyWin',
  Extends: Gtk.Window,

  _init: function (args) {
    this.parent({
      title: 'MyWindow',
      default_width: 400,
      default_height: 50,
      type: Gtk.WindowType.TOPLEVEL,
      window_position: Gtk.WindowPosition.CENTER
    });

    this.connect('delete-event', Gtk.main_quit);

    this.box = new Gtk.Box({spacing: 6});
    this.add (this.box);

    this.button1 = new Gtk.Button ({label: 'Hello'});
    this.button1.connect ('clicked', Lang.bind (this,
                          function () {print ('Hello!')}));
    this.box.pack_start (this.button1, true, true, 0);

    this.button2 = new Gtk.Button ({label: 'Goodbye'});
    this.button2.connect ('clicked', Lang.bind (this,
                          function () {print ('Goodbye!')}));
    this.box.pack_start (this.button2, true, true, 0);
  },

  run: function () {
    this.show_all ();
  }
});

Gtk.init (null, null);

var win = new Win ();
win.run ()

Gtk.main ()

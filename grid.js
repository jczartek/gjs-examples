#!/usr/bin/gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const GridWindow = new Lang.Class ({
  Name: 'GridWindow',
  Extends: Gtk.Window,

  _init: function (args) {
    this.parent ({
      title: 'Grid Example',
      window_position: Gtk.WindowPosition.CENTER
    });

    this.connect ('delete-event', Gtk.main_quit);

    let grid = new Gtk.Grid ();
    this.add (grid);

    let button1 = new Gtk.Button ({label: 'Button1'});
    let button2 = new Gtk.Button ({label: 'Button2'});
    let button3 = new Gtk.Button ({label: 'Button3'});
    let button4 = new Gtk.Button ({label: 'Button4'});
    let button5 = new Gtk.Button ({label: 'Button5'});
    let button6 = new Gtk.Button ({label: 'Button6'});

    grid.add (button1);
    grid.attach (button2, 1, 0, 2, 1);
    grid.attach_next_to (button3, button1, Gtk.PositionType.BOTTOM, 1, 2);
    grid.attach_next_to (button4, button3, Gtk.PositionType.RIGHT, 2, 1);
    grid.attach (button5, 1, 2, 1, 1);
    grid.attach_next_to (button6, button5, Gtk.PositionType.RIGHT, 1, 1);
  },

  run: function () {
    this.show_all ();
  }
});

Gtk.init (null, null);

var win = new GridWindow ();
win.run ();

Gtk.main ();

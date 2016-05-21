#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const ButtonWindow = new Lang.Class ({
  Name: 'ButtonWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'Button Demo',
      window_position: Gtk.WindowPosition.CENTER,
      border_width: 10
    });
    this.connect ('delete-event', Gtk.main_quit);

    let hbox = new Gtk.Box ({spacing: 6});
    this.add (hbox);

    let button =  new Gtk.Button ({label: 'Click Me'});
    button.connect ('clicked', function (){
      print ('\"Click me\" button was clicked');
    });
    hbox.pack_start (button, true, true, 0);

    button = Gtk.Button.new_with_mnemonic ('_Open');
    button.connect ('clicked', function () {
      print ('\"Open\" button was clicked');
    });
    hbox.pack_start (button, true, true, 0);

    button = Gtk.Button.new_with_mnemonic ('_Close');
    button.connect ('clicked', function (){
      print ('Closing application');
      Gtk.main_quit ();
    });
    hbox.pack_start (button, true, true, 0);
  },

  run: function () {
    this.show_all ();
  }
});

Gtk.init (null, null);

var win = new ButtonWindow ();
win.run ();

Gtk.main ();

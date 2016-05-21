#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const ToogleButton = new Lang.Class ({
  Name: 'ToggleButton',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'ToggleButton',
      border_width: 10,
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect ('delete-event', Gtk.main_quit);

    let hbox = new Gtk.Box ({spacing: 6});
    this.add (hbox);

    let button = new Gtk.ToggleButton ({label: 'Button 1'});
    button.connect ('toggled', Lang.bind (null, this._on_button_toggled, '1'));
    hbox.pack_start (button, true, true, 0);

    button = new Gtk.ToggleButton ({
      label: 'Bu_tton 2',
      use_underline: true
    });
    button.set_active (true);
    button.connect ('toggled', Lang.bind (null, this._on_button_toggled, '2'));
    hbox.pack_start (button, true, true, 0);

  },

  _on_button_toggled: function (button, name) {

    let state = button.get_active () ? 'on' : 'off';

    print ('Button ' + name + ' was turned ' + state);
  },

  run: function () {
    this.show_all ();
  }
});


Gtk.init (null, null);

var win = new ToogleButton ();
win.run ();

Gtk.main ();

#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const SpinnerAnimationWindow = new Lang.Class ({
  Name: 'SpinnerAnimationWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'Spinner',
      window_position: Gtk.WindowPosition.CENTER,
      border_width: 3
    });
    this.connect ('delete-event', Gtk.main_quit);

    let spinner = new Gtk.Spinner ();

    let button = new Gtk.ToggleButton ({label: 'Start Spinning'});
    button.connect ('toggled', Lang.bind (null, this._onButtonToggled, spinner));
    button.set_active (false);

    let grid = new Gtk.Grid ();
    grid.attach (button, 1, 1, 1, 1);
    grid.attach (spinner, 1, 2, 1, 1);

    this.add (grid);

  },

  _onButtonToggled: function (button, spinner) {
    if (button.get_active ()) {
      spinner.start ();
      button.set_label ('Stop Spinning');
    } else {
      spinner.stop ();
      button.set_label ('Start Spinning');
    }
  },

  run: function () {
    this.show_all ();
  }
});

function main () {
  Gtk.init (null, null);

  var win = new SpinnerAnimationWindow ();
  win.run ();

  Gtk.main ();
}

main ();

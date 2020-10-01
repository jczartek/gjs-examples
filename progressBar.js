#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const MainLoop = imports.mainloop;

const ProgressBarWindow = new Lang.Class ({
  Name: 'ProgressBarWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'ProgressBar Demo',
      window_position: Gtk.WindowPosition.CENTER,
      border_width: 10
    });
    this.connect ('delete-event', Gtk.main_quit);

    let vbox = new Gtk.Box ({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 6
    });
    this.add (vbox);

    this.progressbar = new Gtk.ProgressBar ();
    vbox.pack_start (this.progressbar, true, true, 0);

    let button = new Gtk.CheckButton ({label: 'Show text'});
    button.connect ('toggled', Lang.bind (this, this._onShowTextToggled));
    vbox.pack_start (button, true, true, 0);

    button = new Gtk.CheckButton ({label: 'Activiti mode'});
    button.connect ('toggled', Lang.bind (this, this._onActivityModeToggled));
    vbox.pack_start (button, true, true, 0);

    button = new Gtk.CheckButton ({label: 'Right to Left'});
    button.connect ('toggled', Lang.bind (this, this._onRightToLeftToggled));
    vbox.pack_start (button, true, true, 0);

    this.timeout_id = MainLoop.timeout_add (1000, Lang.bind (this, this._onTimeOut), null);    this.activity_mode = false;
  },

  _onShowTextToggled: function (button) {
    let show_text = button.get_active ();
    let text = show_text  ? 'hello' : null;

    this.progressbar.set_text (text);
    this.progressbar.set_show_text (show_text);
  },

  _onActivityModeToggled: function (button) {
    this.activity_mode = button.get_active ();

    if (this.activity_mode) {
      this.progressbar.pulse ();
    } else {
      this.progressbar.set_fraction (0.0);
    }
  },

  _onRightToLeftToggled: function (button) {
    this.progressbar.set_inverted (button.get_active ());
  },

  _onTimeOut: function () {

    if (this.activity_mode) {
      this.progressbar.pulse ();
    } else {
      let new_value = this.progressbar.get_fraction () + 0.01;

      if (new_value > 1) {
        new_value = 0;
      }
      this.progressbar.set_fraction (new_value);
    }
    return true;
  },

  run: function () {
    this.show_all ();
  }
});

function main () {
  Gtk.init (null, null);

  var win = new ProgressBarWindow ();
  win.run ();

  Gtk.main ();
}


main ();

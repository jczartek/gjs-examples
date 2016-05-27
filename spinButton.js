#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const SpinButtonWindow = new Lang.Class ({
  Name: 'SpinButtonWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'SpinButton Demo',
      border_width: 10,
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect ('delete-event', Gtk.main_quit);

    let hbox = new Gtk.Box ({spacing: 6});
    this.add (hbox);

    let adjustment = new Gtk.Adjustment ({
      value: 0,
      lower: 0,
      upper: 100,
      step_increment: 1,
      page_increment: 10,
      page_size: 0
    });

    this.spinButton = new Gtk.SpinButton ();
    this.spinButton.set_adjustment (adjustment);
    hbox.pack_start (this.spinButton, false, false, 0);

    let checkNumeric = new Gtk.CheckButton ({label: 'Numeric'});
    checkNumeric.connect ('toggled', Lang.bind (this, function (button){
      this.spinButton.set_numeric (button.get_active ());
    }));
    hbox.pack_start (checkNumeric, false, false, 0);

    let checkIfValid = new Gtk.CheckButton ({label: 'If Valid'});
    checkIfValid.connect ('toggled', Lang.bind (this, function (button) {
      let policy = button.get_active () ? Gtk.SpinButtonUpdatePolicy.IF_VALID : Gtk.SpinButtonUpdatePolicy.ALWAYS;
      this.spinButton.set_update_policy (policy);
    }));
    hbox.pack_start (checkIfValid, false, false, 0);
  },

  run: function () {
    this.show_all ();
  }
});

function main () {
  Gtk.init (null, null);
  var win = new SpinButtonWindow ();
  win.run ();
  Gtk.main ();
}

main ();

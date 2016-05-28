#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const SwitcherWindow = new Lang.Class ({
  Name: 'SwitcherWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'Switch Demo',
      border_width: 10,
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect ('delete-event', Gtk.main_quit);

    let hbox = new Gtk.Box ({spacing: 6});
    this.add (hbox);

    let switch1 = new Gtk.Switch ();
    switch1.connect ('notify::active', this._onSwitchActivated);
    switch1.set_active (false);
    hbox.pack_start (switch1, true, true, 0);

    let switch1 = new Gtk.Switch ();
    switch1.connect ('notify::active', this._onSwitchActivated);
    switch1.set_active (true);
    hbox.pack_start (switch1, true, true, 0);

  },
  _onSwitchActivated: function (s, p) {
    let state = s.get_active () ? 'on' : 'off';

    print ('Switch was turned ' + state);
  },

  run: function functionName() {
    this.show_all ();
  }
});

function main () {
  Gtk.init (null, null);
  var win = new SwitcherWindow ();
  win.run ();
  Gtk.main ();
}

main ();

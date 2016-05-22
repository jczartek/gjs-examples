#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const RadioButtonWindow = new Lang.Class ({
  Name: 'RadioButtonWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'RadioButton Demo',
      border_width: 10,
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect ('delete-event', Gtk.main_quit);

    let hbox = new Gtk.Box ({spacing: 6});
    this.add (hbox);

    let button1 = new Gtk.RadioButton ({label: 'Button 1'});
    button1.connect ('toggled', Lang.bind (null, this._on_button_toggled, '1'));
    hbox.pack_start (button1, false, false, 0);

    let button2 = Gtk.RadioButton.new_with_label_from_widget (button1, 'Button 2');
    button2.connect ('toggled', Lang.bind (null, this._on_button_toggled, '2'));
    hbox.pack_start (button2, false, false, 0);

    let button3 = Gtk.RadioButton.new_from_widget (button1);
    button3.set_label ('Button 3');
    button3.connect ('toggled', Lang.bind (null, this._on_button_toggled, '3'));
    hbox.pack_start (button3, false, false, 0);

    let button4 = Gtk.RadioButton.new_with_mnemonic_from_widget (button1, 'B_utton 4');
    button3.connect ('toggled', Lang.bind (null, this._on_button_toggled, '4'));
    hbox.pack_start (button4, false, false, 0);
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

var win = new RadioButtonWindow ();
win.run ();

Gtk.main ();

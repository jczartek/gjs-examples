#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const DialogInfo = new Lang.Class ({
  Name: 'DialogInfo',
  Extends: Gtk.Dialog,

  _init: function (p) {
    this.parent ({
      title: 'Dialog Info',
      use_header_bar: true
    });

    this.set_default_size (150, 150);
    this.set_transient_for (p);
    this.add_button ('Cancel', Gtk.ResponseType.CANCEL);
    this.add_button ('Ok', Gtk.ResponseType.OK);

    let label = new Gtk.Label ({label: 'This is a dialog to display additional information.'});
    let box = this.get_content_area ();

    box.add (label);
    this.show_all ();
  }
});

const DialogWindow = new Lang.Class ({
  Name: 'DialogWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'Dialog Example',
      window_position: Gtk.WindowPosition.CENTER,
      border_width: 10
    });
    this.connect ('delete-event', Gtk.main_quit);

    let button = new Gtk.Button ({label: 'Open Dialog'});
    button.connect ('clicked', Lang.bind (this, function (widget) {
      let dialog = new DialogInfo (this);
      let response = dialog.run ();

      if (response === Gtk.ResponseType.OK) {
        print ("The ok button was clicked!");
      } else if (response === Gtk.ResponseType.CANCEL) {
        print ("The Cancel button was clicked!");
      }

      dialog.destroy ();
    }));

    this.add (button);
  },

  run: function () {
    this.show_all ();
  }
});

function main () {
  Gtk.init (null, null);
  var win = new DialogWindow ();
  win.run();
  Gtk.main ();
}

main ();

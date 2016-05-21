#!/usr/bin/gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;

const HeaderBarWindow = new Lang.Class ({
  Name: 'HeaderBarWindow',
  Extends: Gtk.Window,

  _init: function (args) {
    this.parent ({
      title: 'HeaderBar Demo',
      type: Gtk.WindowType.TOPLEVEL,
      default_width: 400,
      default_height: 200,
      border_width: 10,
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect ('delete-event', Gtk.main_quit);

    let hb = new Gtk.HeaderBar ({
      title: 'HeaderBar example',
      show_close_button: true
    });
    this.set_titlebar (hb);

    let button = new Gtk.Button ();
    let icon = new Gio.ThemedIcon ({name: 'mail-send-receive-symbolic'});
    let image = new Gtk.Image ({
      gicon: icon,
      icon_size: Gtk.IconSize.BUTTON
    });
    button.add (image);
    hb.pack_end (button);

    let box = new Gtk.Box ({orientation: Gtk.Orientation.HORIZONTAL});
    box.get_style_context ().add_class ('linked');

    button = new Gtk.Button ();
    button.add (new Gtk.Arrow ({
      arrow_type: Gtk.ArrowType.LEFT,
      shadow_type: Gtk.ShadowType.NONE
    }));
    box.add (button);

    button = new Gtk.Button ();
    button.add (new Gtk.Arrow ({
      arrow_type: Gtk.ArrowType.RIGHT,
      shadow_type: Gtk.ShadowType.NONE
    }));
    box.add (button);

    hb.pack_start (box);

    this.add (new Gtk.TextView());

  },

  run: function () {
    this.show_all ();
  }
});

Gtk.init (null, null);

var win = new HeaderBarWindow ();
win.run ();

Gtk.main ();

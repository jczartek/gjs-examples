#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;
const GdkPixbuf = imports.gi.GdkPixbuf;

const IconViewWindow = new Lang.Class ({
  Name: 'IconViewWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'IconView Demo',
      default_width: 200,
      default_height: 300,
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect ('delete-event', Gtk.main_quit);

    let listStore = new Gtk.ListStore ();
    listStore.set_column_types ([GdkPixbuf.Pixbuf, GObject.TYPE_STRING]);

    let iconView = new Gtk.IconView ({
      model: listStore,
      pixbuf_column: 0,
      text_column: 1
    });
    
    ["edit-cut-symbolic",
     "edit-paste-symbolic",
     "edit-copy-symbolic"].forEach (function (icon) {
      let pixbuf = Gtk.IconTheme.get_default().load_icon (icon, 64, 0);
      listStore.set (listStore.append(), [0,1], [pixbuf, icon]);
    });

    this.add (iconView);
  },

  run: function () {
    this.show_all ();
  }
});

function main () {
  Gtk.init (null, null);
  var win = new IconViewWindow ();
  win.run ();
  Gtk.main ();
}

main ();

#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const LinkButtonWindow = Lang.Class ({
  Name: 'LinkButtonWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'LinkButton Demo',
      window_position: Gtk.WindowPosition.CENTER,
      border_width: 10
    });
    this.connect ('delete-event', Gtk.main_quit);

    this.add (new Gtk.LinkButton ({
      label: 'Visit GTK+ Homepage',
      uri: 'http://www.gtk.org'
    }));
  },

  run: function () {
    this.show_all ();
  }
});

Gtk.init (null, null);

var win = new LinkButtonWindow ();
win.run ();

Gtk.main ();

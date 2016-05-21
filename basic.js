#!/usr/bin/gjs

const Gtk = imports.gi.Gtk;

Gtk.init (null, null);

let win = new Gtk.Window ({type: Gtk.WindowType.TOPLEVEL});
win.connect ('delete-event', Gtk.main_quit);
win.show_all()
Gtk.main()

#!/usr/bin/env gjs

const Gtk = imports.gi.Gtk;

Gtk.init(null);

function on_open_location(placessidebar, location, flags)
{
    print("Selected location: " + location.get_uri());
}

var window = new Gtk.Window();
window.set_title("PlacesSidebar");
window.connect("destroy", Gtk.main_quit);

var placessidebar = new Gtk.PlacesSidebar();
placessidebar.connect("open-location", on_open_location);
window.add(placessidebar);

window.show_all();

Gtk.main();

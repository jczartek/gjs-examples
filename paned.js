#!/usr/bin/env gjs

const Gtk = imports.gi.Gtk;

Gtk.init(null);

function on_radio_button_toggled(radiobutton)
{
    if (radiobutton.get_active())
    {
        if (radiobutton.id == 1)
            paned.set_orientation(Gtk.Orientation.VERTICAL);
        else
            paned.set_orientation(Gtk.Orientation.HORIZONTAL);
    }
}

var window = new Gtk.Window();
window.set_title("Paned");
window.set_default_size(300, 300);
window.connect("destroy", Gtk.main_quit);

var grid = new Gtk.Grid();
window.add(grid);

var paned = new Gtk.Paned();
paned.set_vexpand(true);
paned.set_hexpand(true);
grid.attach(paned, 0, 0, 2, 1);

var label1 = new Gtk.Label({label: "Label in Paned section 1"});
paned.add1(label1);
var label2 = new Gtk.Label({label: "Label in Paned section 2"});
paned.add2(label2);

var radiobutton1 = new Gtk.RadioButton({label: "Vertical"});
radiobutton1.connect("toggled", function() {on_radio_button_toggled(radiobutton1)});
radiobutton1.id = 1;
grid.attach(radiobutton1, 0, 1, 1, 1);
var radiobutton2 = new Gtk.RadioButton({label: "Horizontal"});
radiobutton2.id = 2;
radiobutton2.join_group(radiobutton1);
radiobutton2.set_active(true);
radiobutton2.connect("toggled", function() {on_radio_button_toggled(radiobutton2)});
grid.attach(radiobutton2, 1, 1, 1, 1);

window.show_all();

Gtk.main();

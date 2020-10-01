#!/usr/bin/gjs

const Gtk = imports.gi.Gtk;

Gtk.init(null);

function on_popover_launched()
{
    popover.show_all();
}

var window = new Gtk.Window();
window.set_default_size(250, 250);
window.set_title('Popover');
window.connect('destroy', Gtk.main_quit);

var box = new Gtk.Box();
box.set_orientation(Gtk.Orientation.VERTICAL);
window.add(box);

var button = new Gtk.Button({label: 'Popover Launcher'});
button.connect('clicked', on_popover_launched);
box.add(button);

var popover = new Gtk.Popover();
popover.set_position(Gtk.PositionType.RIGHT);
popover.set_relative_to(button);

var box = new Gtk.Box();
box.set_orientation(Gtk.Orientation.VERTICAL);
box.set_spacing(5);
popover.add(box);

var label = new Gtk.Label({label: 'A Label Widget'});
box.add(label);

var checkbutton = new Gtk.CheckButton({label: 'A CheckButton Widget'});
box.add(checkbutton);

var radiobutton = new Gtk.RadioButton({label: 'A RadioButton Widget'});
box.add(radiobutton);

window.show_all();

Gtk.main();

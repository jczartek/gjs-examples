#!/usr/bin/gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const StackWindow = new Lang.Class ({
  Name: 'StackWin',
  Extends: Gtk.Window,

  _init: function (args)
  {
    this.parent({
      title: 'Stack Demo',
      type: Gtk.WindowType.TOPLEVEL,
      window_position: Gtk.WindowPosition.CENTER
    });

    this.connect ('delete-event', Gtk.main_quit);
    this.set_border_width (10);

    let vbox = new Gtk.Box ({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 6
    });
    this.add (vbox);

    let stack = new Gtk.Stack ();
    stack.set_transition_type (Gtk.StackTransitionType.SLIDE_LEFT_RIGHT);
    stack.set_transition_duration (1000);

    let checkbutton = new Gtk.CheckButton ({label: "Click me!"});
    stack.add_titled (checkbutton, 'check', 'Check Button');

    let label = new Gtk.Label ();
    label.set_markup ('<big><b>A fancy label</b></big>');
    stack.add_titled (label, 'label', "A label");

    let stack_switcher = new Gtk.StackSwitcher ();
    stack_switcher.set_stack (stack);

    vbox.pack_start (stack_switcher, true, true, 0);
    vbox.pack_start (stack, true, true, 0);
  },

  run: function () {
    this.show_all ();
  }
});


Gtk.init (null, null);

var win = new StackWindow ();
win.run ();

Gtk.main ();

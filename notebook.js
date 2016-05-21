#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;


const NotebookWindow = new Lang.Class ({
  Name: 'NotebookWindow',
  Extends: Gtk.Window,

  _init: function (args) {
    this.parent ({
      title: 'Simple Notebook Example',
      type: Gtk.WindowType.TOPLEVEL,
      window_position: Gtk.WindowPosition.CENTER,
      border_width: 3,
      default_width: 300
    });
    this.connect ('delete-event', Gtk.main_quit);

    this.notebook = new Gtk.Notebook ();
    this.add (this.notebook);

    let page = new Gtk.Box ({border_width: 10});
    page.add (new Gtk.Label ({label: 'Default Page!'}));
    this.notebook.append_page (
      page,
      new Gtk.Label ({label: 'Plain Title'})
    );

    page = new Gtk.Box ({border_width: 10});
    page.add (new Gtk.Label ({label: 'A page with an image for a Title.'}));
    this.notebook.append_page (
      page,
      Gtk.Image.new_from_icon_name ('help-about', Gtk.IconSize.MENU)
    );

  },

  run: function () {
    this.show_all ();
  }
});

Gtk.init (null, null);

var win = new NotebookWindow ();
win.run ();

Gtk.main ();

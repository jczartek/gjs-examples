#!/usr/bin/gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const SimpleWin = new Lang.Class({
    Name: 'SimpleWin',
    Extends: Gtk.Window,
    _init: function(args) {
        this.parent({
            title: 'Hello World!',
            default_width: 400,
            default_height: 200,
            type: Gtk.WindowType.TOPLEVEL,
            window_position: Gtk.WindowPosition.CENTER
        });

        this.connect('delete-event', Gtk.main_quit);

        this.button = new Gtk.Button({
          label: 'Click!'
        });
        this.button.connect ('clicked',
                             Lang.bind(this, function () {print ('Click!')}));
        this.add (this.button);
    },

    run: function() {
        this.show_all();
    }
});

Gtk.init(null, null);
var win = new SimpleWin();
win.run();
Gtk.main();

#!/usr/bin/gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const Gdk = imports.gi.Gdk;
const Cairo = imports.cairo;

const FlowBoxWindow = new Lang.Class ({
  Name: 'FlowBoxWindow',
  Extends: Gtk.Window,

  _init: function (args)
  {
    this.parent ({
      title: 'FlowBox Demo',
      border_width: 10,
      default_width: 300,
      default_height: 250,
      type: Gtk.WindowType.TOPLEVEL,
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect ('delete-event', Gtk.main_quit);

    let header = new Gtk.HeaderBar ({
      title: 'Flow Box',
      subtitle: 'Sample FlowBox app',
      show_close_button: true
    });
    this.set_titlebar (header);

    let scrolled = new Gtk.ScrolledWindow ();
    scrolled.set_policy (Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC);

    let flowbox = new Gtk.FlowBox ({
      valign: Gtk.Align.START,
      max_children_per_line: 30,
      selection_mode: Gtk.SelectionMode.NONE
    });

    this._create_flowbox (flowbox);

    scrolled.add (flowbox);
    this.add (scrolled);
  },

  _color_swatch_new: function (str_color)
  {
    let button = new Gtk.Button ()

    let area = new Gtk.DrawingArea ();
    area.set_size_request (24, 24);

    area.connect ('draw', function (w, cr){
      let rgba = new Gdk.RGBA ();
      if (rgba.parse (str_color))
      {
        Gdk.cairo_set_source_rgba (cr, rgba);
        cr.paint ();
      }
    });

    button.add (area);

    return button;
  },

  _create_flowbox: function (flowbox) {
    let colors = [
        'AliceBlue',
        'AntiqueWhite',
        'AntiqueWhite1',
        'AntiqueWhite2',
        'AntiqueWhite3',
        'AntiqueWhite4',
        'aqua',
        'aquamarine',
        'aquamarine1',
        'aquamarine2',
        'aquamarine3',
        'aquamarine4',
        'azure',
        'azure1',
        'azure2',
        'azure3',
        'azure4',
        'beige',
        'bisque',
        'bisque1',
        'bisque2',
        'bisque3',
        'bisque4',
        'black',
        'BlanchedAlmond',
        'blue',
        'blue1',
        'blue2',
        'blue3',
        'blue4',
        'BlueViolet',
        'brown',
        'brown1',
        'brown2',
        'brown3',
        'brown4',
        'burlywood',
        'burlywood1',
        'burlywood2',
        'burlywood3',
        'burlywood4',
        'CadetBlue',
        'CadetBlue1',
        'CadetBlue2',
        'CadetBlue3',
        'CadetBlue4',
        'chartreuse',
        'chartreuse1',
        'chartreuse2',
        'chartreuse3',
        'chartreuse4',
        'chocolate',
        'chocolate1',
        'chocolate2',
        'chocolate3',
        'chocolate4',
        'coral',
        'coral1',
        'coral2',
        'coral3',
        'coral4'
      ];

    colors.forEach (function (el) {
      let button = this._color_swatch_new (el);
      flowbox.add (button);
    }, this);

  },

  run: function ()
  {
    this.show_all ();
  }
});

Gtk.init (null, null);

var win = new FlowBoxWindow ();
win.run ();
Gtk.main ();

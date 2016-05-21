#!/usr/bin/gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;


const ListBoxRowWithData = new Lang.Class ({
  Name: 'ListBoxRowWithData',
  Extends: Gtk.ListBoxRow,

  _init: function (data) {
    this.parent ();
    this.data = data;
    this.add (new Gtk.Label ({label: data}));
  }
});

const ListBoxWindow = Lang.Class ({
  Name: 'ListBoxWindow',
  Extends: Gtk.Window,

  _init: function (args) {
    this.parent ({
      title: 'ListBox Demo',
      window_position: Gtk.WindowPosition.CENTER
    });
    this.set_border_width (10);
    this.connect ('delete-event', Gtk.main_quit);

    let box_outer = new Gtk.Box ({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 6
    });
    this.add (box_outer);

    let listbox = new Gtk.ListBox ();
    listbox.set_selection_mode (Gtk.SelectionMode.NONE);
    box_outer.pack_start(listbox, true, true, 0);

    let row = new Gtk.ListBoxRow ();
    let hbox = new Gtk.Box ({
      orientation: Gtk.Orientation.HORIZONTAL,
      spacing: 50
    });
    row.add (hbox);
    let vbox = new Gtk.Box ({orientation: Gtk.Orientation.VERTICAL});
    hbox.pack_start (vbox, true, true, 0);

    let label1 = new Gtk.Label ({
      label: 'Automatic Date & Time',
      xalign: 0
    });
    let label2 = new Gtk.Label ({
      label: 'Requires internet acces',
      xalign: 0
    });
    vbox.pack_start(label1, true, true, 0);
    vbox.pack_start(label2, true, true, 0);

    let sw = new Gtk.Switch ({valign: Gtk.Align.CENTER});
    hbox.pack_start (sw, false, true, 0);

    listbox.add (row);

    row = new Gtk.ListBoxRow ();
    hbox = new Gtk.Box ({
      orientation: Gtk.Orientation.HORIZONTAL,
      spacing: 50
    });
    row.add (hbox);
    let label = new Gtk.Label ({
      label: 'Enable Automatic Update',
      xalign: 0
    });
    let check = new Gtk.CheckButton ();
    hbox.pack_start (label, true, true, 0);
    hbox.pack_start (check, false, true, 0);

    listbox.add (row);

    row = new Gtk.ListBoxRow ();
    hbox = new Gtk.Box ({
      orientation: Gtk.Orientation.HORIZONTAL,
      spacing: 50
    });
    row.add (hbox);
    label = new Gtk.Label ({
     label: 'Date Format',
     xalign: 0
     });
     let combo = new Gtk.ComboBoxText ();
     combo.insert (0, '0', '24-hour');
     combo.insert (1, '1', 'AM/PM');
     hbox.pack_start (label, true, true, 0);
     hbox.pack_start (combo, false, true, 0);

     listbox.add (row);

     let listbox_2 = new Gtk.ListBox ();
     let items = 'This is a sorted ListBox Fail'.split(" ");

     items.forEach (function (item) {
       listbox_2.add (new ListBoxRowWithData (item));
     });

     listbox_2.set_sort_func (function (row1, row2) {
       return row1.data.toLowerCase () > row2.data.toLowerCase ();
       });

     listbox_2.set_filter_func (function (row) {
       return row.data == 'Fail' ? false : true;
     });

     listbox_2.connect ('row-activated', function (box, row) {
       print (row.data);
     });

     listbox_2.show_all ();
     box_outer.pack_start (listbox_2, true, true, 0);
  },

  run: function () {
    this.show_all ();
  }
});

Gtk.init (null, null)

var win = new ListBoxWindow ();
win.run ();

Gtk.main ();

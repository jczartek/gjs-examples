#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const MainLoop = imports.mainloop;

const EntryWindow = new Lang.Class ({
  Name: 'EntryWindow',
  Extends: Gtk.Window,
  _init: function () {
    this.parent ({
      title: 'Entry Demo',
      default_width: 200,
      default_height: 100,
      type: Gtk.WindowType.TOPLEVEL,
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect ('delete-event', Gtk.main_quit);

    this.timeout_id = null;

    let vbox = new Gtk.Box ({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 6
    });
    this.add (vbox);

    this.entry = new Gtk.Entry ();
    this.entry.set_text ('Hello World!');
    vbox.pack_start (this.entry, true, true, 0);

    let hbox = new Gtk.Box ({
      spacing: 6
    });
    vbox.pack_start (hbox, true, true, 0);

    this.check_editable = new Gtk.CheckButton ({label: 'Editable'});
    this.check_editable.connect ('toggled', Lang.bind (this, this._on_editable_toggled));
    this.check_editable.set_active (true);
    hbox.pack_start (this.check_editable, true, true, 0);

    this.check_visible = new Gtk.CheckButton ({label: 'Visible'});
    this.check_visible.connect ('toggled', Lang.bind (this, this._on_visible_toggled));
    this.check_visible.set_active (true);
    hbox.pack_start (this.check_visible, true, true, 0);

    this.pulse = new Gtk.CheckButton ({label: 'Pulse'});
    this.pulse.connect ('toggled', Lang.bind (this, this._on_pulse_toggled));
    this.pulse.set_active (false);
    hbox.pack_start (this.pulse, true, true, 0);

    this.eicon = new Gtk.CheckButton ({label: 'Icon'});
    this.eicon.connect ('toggled', Lang.bind (this, this._on_icon_toggled));
    this.eicon.set_active (false);
    hbox.pack_start (this.eicon, true, true, 0);
  },

  _on_editable_toggled: function (button) {
    let value = button.get_active ();
    this.entry.set_editable (value);
  },

  _on_visible_toggled: function (button) {
    let value = button.get_active ();
    this.entry.set_visibility (value);
  },

  _on_pulse_toggled: function (button) {
    if (button.get_active ())
    {
      this.entry.set_progress_pulse_step (0.2);
      this.timeout_id = MainLoop.timeout_add (100,
        Lang.bind (this, function (){
          this.entry.progress_pulse ();
          return true;
        }), 0);
    } else {
      MainLoop.source_remove (this.timeout_id);
      this.timeout_id = null;
      this.entry.set_progress_pulse_step (0);
    }
  },

  _on_icon_toggled: function (button) {
    let icon_name;
    if (button.get_active ()) {
      icon_name = 'system-search-symbolic';
    } else {
      icon_name = null;
    }

    this.entry.set_icon_from_icon_name (Gtk.EntryIconPosition.PRIMARY, icon_name);
  },

  run: function () {
    this.show_all ();
  }
});

Gtk.init (null, null);

var win = new EntryWindow ();
win.run ();

Gtk.main ();

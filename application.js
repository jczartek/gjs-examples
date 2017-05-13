#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const System = imports.system;

const MENU_XML =
"<?xml version='1.0' encoding='UTF-8'?> \
<interface> \
  <menu id='app-menu'> \
    <section> \
      <attribute name='label' translatable='yes'>Change label</attribute> \
      <item> \
        <attribute name='action'>win.change_label</attribute> \
        <attribute name='target'>String 1</attribute> \
        <attribute name='label' translatable='yes'>String 1</attribute> \
      </item> \
      <item> \
        <attribute name='action'>win.change_label</attribute> \
        <attribute name='target'>String 2</attribute> \
        <attribute name='label' translatable='yes'>String 2</attribute> \
      </item> \
      <item> \
        <attribute name='action'>win.change_label</attribute> \
        <attribute name='target'>String 3</attribute> \
        <attribute name='label' translatable='yes'>String 3</attribute> \
      </item> \
    </section> \
    <section> \
      <item> \
        <attribute name='action'>win.maximize</attribute> \
        <attribute name='label' translatable='yes'>Maximize</attribute> \
      </item> \
    </section> \
    <section> \
      <item> \
        <attribute name='action'>app.about</attribute> \
        <attribute name='label' translatable='yes'>_About</attribute> \
      </item> \
      <item> \
        <attribute name='action'>app.quit</attribute> \
        <attribute name='label' translatable='yes'>_Quit</attribute> \
        <attribute name='accel'>&lt;Primary&gt;q</attribute> \
    </item> \
    </section> \
  </menu> \
</interface>";

const AppWindow = new Lang.Class ({
  Name: "AppWindow",
  Extends: Gtk.ApplicationWindow,
  _init: function(params) {
    this.parent (params);

    var max_action = Gio.SimpleAction.new_stateful ("maximize", null,
                                                    GLib.Variant.new_boolean (false));
    max_action.connect('change-state', (action, value) => {
      action.set_state(value);

      if (value.get_boolean()) {
        this.maximize ();
      } else {
        print ("unmaximize");
        this.unmaximize ();
      }
    });
    this.add_action(max_action);
    this.connect ('notify::is-maximized', (obj, pspec) => {
      max_action.set_state(GLib.Variant.new_boolean (obj.is_maximized));
    });

    var lbl_variant = GLib.Variant.new_string("String 1");
    var lbl_action = Gio.SimpleAction.new_stateful ("change_label", lbl_variant.get_type(),
                                                    lbl_variant);

    lbl_action.connect('change-state', (action, value) => {
      action.set_state (value);
      this.label.set_text (value.get_string()[0]);
    });
    this.add_action (lbl_action);

    this.label = new Gtk.Label ({ margin: 30 });
    this.label.set_label (lbl_variant.get_string ()[0]);
    this.add (this.label);
    this.label.show ();
  }
});

const Application = new Lang.Class ({
  Name: 'Application',
  Extends: Gtk.Application,
  _init: function () {
    this.parent ({
      application_id: "org.example.myapp",
      flags: Gio.ApplicationFlags.HANDLES_COMMAND_LINE
    });

    this.add_main_option ("test", "t".charCodeAt(0), GLib.OptionFlags.NONE,
                          GLib.OptionArg.NONE, "Command line test", null);
    this.window = null;
  },

  vfunc_startup: function () {
    this.parent ();

    var action = new Gio.SimpleAction ({name: "about"});
    action.connect('activate', (action, param) => {
      var about_dialog = new Gtk.AboutDialog ({
        transient_for: this.window,
        modal: true
      });
      about_dialog.present ();
    });
    this.add_action (action);

    action = new Gio.SimpleAction ({name: "quit"});
    action.connect('activate', (action, param) => {
      this.quit ();
    });
    this.add_action (action);

    var builder = Gtk.Builder.new_from_string (MENU_XML, MENU_XML.length);
    this.set_app_menu (builder.get_object("app-menu"));
  },

  vfunc_activate: function () {
    if (!this.window) {
      this.window = new AppWindow({
        application: this,
        title: "MainWindow",
        default_width: 350,
        default_height: 200,
        window_position: Gtk.WindowPosition.CENTER
      });
    }
    this.window.present ();
  },

  vfunc_command_line: function (command_line) {
    var options = command_line.get_options_dict ();

    if(options.contains("test")) {
      print("Test argument recieved!!!!");
    }

    this.activate ();
    return 0;
  }
});

function main (args) {
  var app = new Application ();
  app.run (args);
}

main ([System.programInvocationName].concat(ARGV));

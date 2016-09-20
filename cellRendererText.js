const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;

const CellRendererTextWindow = new Lang.Class ({
  Name: 'CellRendererTextWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'CellRendererText Example',
      window_position: Gtk.WindowPosition.CENTER,
      default_height: 200,
      default_width: 200
    });

    this.liststore = new Gtk.ListStore ();
    this.liststore.set_column_types ([
      GObject.TYPE_STRING,
      GObject.TYPE_STRING
    ]);
    this.connect ('delete-event', Gtk.main_quit);
    this.liststore.set (this.liststore.append (), [0,1], ["Fedora", "http://fedoraproject.org/"]);
    this.liststore.set (this.liststore.append (), [0,1], ["Slackware", "http://www.slackware.com/"]);
    this.liststore.set (this.liststore.append (), [0,1], ["Sidux", "http://sidux.com/"]);

    let treeview = new Gtk.TreeView ({
      model: this.liststore
    });

    let renderer = new Gtk.CellRendererText ();
    let column = new Gtk.TreeViewColumn ({title: "Text"});
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "text", 0);
    treeview.append_column (column);

    let renderer = new Gtk.CellRendererText ({editable: true});
    let column = new Gtk.TreeViewColumn ({title: "Editable Text"});
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "text", 1);
    renderer.connect ("edited", Lang.bind (this, function (widget, path, text) {
      let iter = this.liststore.get_iter (Gtk.TreePath.new_from_string(path))[1];
      this.liststore.set_value (iter, 1, text);
    }));
    treeview.append_column (column);

    this.add (treeview);
  },

  run: function () {
    this.show_all ();
  }
});


function main() {
  Gtk.init (null, null);

  var win = new CellRendererTextWindow ();
  win.run ();

  Gtk.main ();
}

main ();

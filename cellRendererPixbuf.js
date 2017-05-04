const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;

const CellRendererPixbufWindow = new Lang.Class ({
  Name: 'CellRendererPixbufWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: "CellRendererPixbuf Example",
      window_position: Gtk.WindowPosition.CENTER,
      default_width: 200,
      default_height: 200
    });
    this.connect ('delete-event', Gtk.main_quit);

    this.liststore = new Gtk.ListStore ();
    this.liststore.set_column_types ([
      GObject.TYPE_STRING,
      GObject.TYPE_STRING,
      GObject.TYPE_STRING
    ]);
    this.liststore.set (this.liststore.append(), [0,1,2], ["New", "document-new", "document-new-symbolic"]);
    this.liststore.set (this.liststore.append(), [0,1,2], ["Open", "document-open", "document-open-symbolic"]);
    this.liststore.set (this.liststore.append(), [0,1,2], ["Save", "document-save", "document-save-symbolic"]);

    let treeview = new Gtk.TreeView ({
      model: this.liststore
    });

    let renderer = new Gtk.CellRendererText ();
    let column = new Gtk.TreeViewColumn ({title: "Text"});
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "text", 0);
    treeview.append_column (column);

    renderer = new Gtk.CellRendererPixbuf ();
    column = new Gtk.TreeViewColumn ({title: "Image"});
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "icon_name",1);
    treeview.append_column (column);

    renderer = new Gtk.CellRendererPixbuf ();
    column = new Gtk.TreeViewColumn ({title: "Image Symbolic"});
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "icon_name", 2);
    treeview.append_column (column);

    this.add (treeview);
  },

  run: function () {
    this.show_all ();
  }
});

function main () {
  var win;
  Gtk.init (null, null);

  win = new CellRendererPixbufWindow ();
  win.run ();
  Gtk.main ();
}

main ();

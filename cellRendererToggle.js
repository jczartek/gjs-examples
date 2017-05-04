const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;

const CellRendererToggleWindow = new Lang.Class ({
  Name: 'CellRendererToggleWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'CellRendererToggleExampl',
      window_position: Gtk.WindowPosition.CENTER,
      default_width: 400,
      default_height: 300
    });
    this.connect ('delete-event', Gtk.main_quit);

    this.liststore = new Gtk.ListStore ();
    this.liststore.set_column_types ([
      GObject.TYPE_STRING,
      GObject.TYPE_BOOLEAN,
      GObject.TYPE_BOOLEAN
    ]);

    this.liststore.set (this.liststore.append(), [0,1,2], ["Debian", false, true]);
    this.liststore.set (this.liststore.append(), [0,1,2], ["OpenSuse", true, false]);
    this.liststore.set (this.liststore.append(), [0,1,2], ["Fedora", false, false]);

    this.treeview = new Gtk.TreeView ({
      model: this.liststore
    });

    let renderer = new Gtk.CellRendererText ();
    let column = new Gtk.TreeViewColumn ({
      title: "Text",
      sizing: Gtk.TreeViewColumnSizing.FIXED});
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "text", 0);
    this.treeview.append_column (column);

    renderer = new Gtk.CellRendererToggle ();
    column = new Gtk.TreeViewColumn ({
      title: "Toggle",
      sizing: Gtk.TreeViewColumnSizing.FIXED});
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "active", 1);
    this.treeview.append_column (column);
    renderer.connect ("toggled", (cellRenderer, path) => {
      let iter = this.liststore.get_iter (Gtk.TreePath.new_from_string(path))[1];
      let val =  this.liststore.get_value (iter, 1);
      this.liststore.set_value (iter, 1, !val);
    });

    renderer = new Gtk.CellRendererToggle ();
    column = new Gtk.TreeViewColumn ({
      title: "Radio",
      sizing: Gtk.TreeViewColumnSizing.FIXED});
    renderer.set_radio (true);
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "active", 2);
    this.treeview.append_column (column);
    renderer.connect ("toggled", (cellRenderer, selected_path) => {
      this.liststore.foreach ((model, path, iter, data) => {
        this.liststore.set_value (iter, 2, path.to_string() === selected_path);
      }, null);
    });

    this.add (this.treeview);
  },

  run: function () {
    this.show_all ();
  }
});

function main () {
  var win;

  Gtk.init (null, null);
  win = new CellRendererToggleWindow ();
  win.run ();
  Gtk.main ();
}

main ();

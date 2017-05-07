const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;
const MainLoop = imports.mainloop;

const CellRendererProgressWindow = new Lang.Class ({
  Name: 'CellRendererProgressWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'CellRendererProgress Example',
      window_position: Gtk.WindowPosition.CENTER,
      default_width: 250,
      default_height: 200
    });
    this.connect ('delete-event', Gtk.main_quit);

    this.liststore = new Gtk.ListStore ();
    this.liststore.set_column_types ([
      GObject.TYPE_STRING,
      GObject.TYPE_INT,
      GObject.TYPE_BOOLEAN
    ]);
    this.current_iter = this.liststore.append ();
    this.liststore.set (this.current_iter, [0,1,2], ["Sabayon", 0, false]);
    this.liststore.set (this.liststore.append(), [0,1,2], ["Zenwalk", 0, false]);
    this.liststore.set (this.liststore.append(), [0,1,2], ["SimplyMepis", 0, false]);

    let treeview = new Gtk.TreeView ({
      model: this.liststore
    });

    let renderer = new Gtk.CellRendererText ();
    let column = new Gtk.TreeViewColumn ({ title: "Text" });
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "text", 0);
    treeview.append_column (column);

    renderer = new Gtk.CellRendererProgress ();
    column = new Gtk.TreeViewColumn ({ title: "Progress" });
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "value", 1);
    treeview.append_column (column);

    renderer = new Gtk.CellRendererToggle ();
    column = new Gtk.TreeViewColumn ({ title: "Inverted" });
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "active", 2);
    renderer.connect ("toggled", (cellRenderer, path) => {
      let iter = this.liststore.get_iter (Gtk.TreePath.new_from_string(path))[1];
      let val =  this.liststore.get_value (iter, 2);
      this.liststore.set_value (iter, 2, !val);
    });
    treeview.append_column (column);
    this.add (treeview);

    this.timeoutId = MainLoop.timeout_add(30, () => {
      let new_value = this.liststore.get_value (this.current_iter, 1) + 1;
      if (new_value > 100) {
        if (!this.liststore.iter_next (this.current_iter)) {
          return false;
        }
        new_value = this.liststore.get_value (this.current_iter, 1) + 1;
      }
      this.liststore.set_value (this.current_iter, 1, new_value);
      return true;
    });
  },
  run: function () {
    this.show_all ();
  }
});

function main () {
  Gtk.init (null, null);
  var win = new CellRendererProgressWindow ();
  win.run ();
  Gtk.main ();
}

main ();

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;

const CellRendererSpinWindow = new Lang.Class ({
  Name: 'CellRendererSpinWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'CellRendererSpin Example',
      window_position: Gtk.WindowPosition.CENTER,
      default_width: 200,
      default_height: 200
    });
    this.connect ('delete-event', Gtk.main_quit);

    this.liststore = new Gtk.ListStore ();
    this.liststore.set_column_types ([
      GObject.TYPE_STRING,
      GObject.TYPE_INT
    ]);
    this.liststore.set (this.liststore.append(), [0,1], ["Oranges", 5]);
    this.liststore.set (this.liststore.append(), [0,1], ["Apples", 4]);
    this.liststore.set (this.liststore.append(), [0,1], ["Bananas", 2]);

    let treeview = new Gtk.TreeView ({
      model: this.liststore
    });

    let renderer = new Gtk.CellRendererText ();
    let column = new Gtk.TreeViewColumn ({title: "Fruit"});
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "text", 0);
    treeview.append_column (column);

    let adjustment = new Gtk.Adjustment ({
      value: 0,
      lower: 0,
      upper: 100,
      step_increment: 1,
      page_increment: 10,
      page_size: 0
    });
    renderer = new Gtk.CellRendererSpin ({
      editable: true,
      adjustment: adjustment
    });
    column = new Gtk.TreeViewColumn ({title: "Amount"});
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "text", 1);
    renderer.connect ("edited", (widget, path, value) => {
      let iter = this.liststore.get_iter (Gtk.TreePath.new_from_string(path))[1];
      this.liststore.set_value (iter, 1, parseInt(value, 10));
    });
    treeview.append_column (column);

    this.add (treeview);
  },

  run: function () {
    this.show_all ();
  }
});

function main() {
  Gtk.init (null, null);
  var win = new CellRendererSpinWindow ();
  win.run ();
  Gtk.main ();
}

main ();

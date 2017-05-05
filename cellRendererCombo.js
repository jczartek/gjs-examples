const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;

const CellRendererComboWindow = new Lang.Class ({
  Name: 'CellRendererComboWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: "CellRendererCombo Example",
      window_position: Gtk.WindowPosition.CENTER,
      default_width: 240,
      default_height: 200
    });
    this.connect ('delete-event', Gtk.main_quit);

    let liststore_manufacturers = new Gtk.ListStore ();
    liststore_manufacturers.set_column_types ([GObject.TYPE_STRING]);

    for (let item of ["Sony", "LG", "Panasonic", "Toshiba", "Nokia", "Samsung"]) {
      liststore_manufacturers.set (liststore_manufacturers.append(), [0], [item]);
    }

    this.liststore_hardware = new Gtk.ListStore ();
    this.liststore_hardware.set_column_types ([
      GObject.TYPE_STRING,
      GObject.TYPE_STRING
    ]);
    this.liststore_hardware.set (this.liststore_hardware.append(), [0,1], ["Television", "Samsung"]);
    this.liststore_hardware.set (this.liststore_hardware.append(), [0,1], ["Mobile Phone", "LG"]);
    this.liststore_hardware.set (this.liststore_hardware.append(), [0,1], ["DVD Player", "Sony"]);

    let treeview = new Gtk.TreeView ({ model: this.liststore_hardware });

    let renderer = new Gtk.CellRendererText ();
    let column = new Gtk.TreeViewColumn ( {title: "Text"} );
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "text", 0);
    treeview.append_column (column);

    renderer = new Gtk.CellRendererCombo ({
      editable: true,
      model: liststore_manufacturers,
      text_column: 0,
      has_entry: false
    });
    column = new Gtk.TreeViewColumn ( {title: "Combo"} );
    column.pack_start (renderer, true);
    column.add_attribute (renderer, "text", 1);
    treeview.append_column (column);
    renderer.connect ("edited", (widget, path, value) => {
      let iter = this.liststore_hardware.get_iter (Gtk.TreePath.new_from_string(path))[1];
      this.liststore_hardware.set_value (iter, 1, value);
    });

    this.add (treeview);
  },

  run: function () {
    this.show_all ();
  }
});

function main () {
  Gtk.init (null);
  var win = new CellRendererComboWindow ();
  win.run ();
  Gtk.main ();
}

main ();

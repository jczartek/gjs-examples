const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;

var software_list = [["Firefox", 2002, "C++"],
                     ["Eclipse", 2004, "Java"],
                     ["Pitivi", 2004, "Python"],
                     ["Netbeans", 1996, "Java"],
                     ["Filezilla", 2001, "C++"],
                     ["Bazaar", 2005, "Python"],
                     ["Git", 2005, "C"],
                     ["Linux Kernel", 1991, "C"],
                     ["GCC", 1987, "C"],
                     ["Frostwire", 2004, "Java"]
                    ];

const TreeViewFilterWindow = new Lang.Class ({
  Name: 'TreeViewFilterWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'TreeView Filter Demo',
      window_position: Gtk.WindowPosition.CENTER,
      border_width: 10,
      default_height: 300,
      default_width: 500
    });

    this.connect ('delete-event', Gtk.main_quit);
    this.grid = new Gtk.Grid ();
    this.grid.set_column_homogeneous (true);
    this.grid.set_row_homogeneous (true);
    this.add (this.grid);

    // Creating the ListStore model
    this.software_liststore = new Gtk.ListStore ();
    this.software_liststore.set_column_types ([
      GObject.TYPE_STRING,
      GObject.TYPE_INT,
      GObject.TYPE_STRING
    ]);
    software_list.forEach (function (item, index, array) {
      this.software_liststore.set (this.software_liststore.append (),
        [0,1,2],
        [item[0], item[1], item[2]]);
    }, this);
    this.current_filter_language = null;

    // Creating the filter, feeding it with the liststore model
    this.language_filter = this.software_liststore.filter_new (null);
    // Setting the filter function
    this.language_filter.set_visible_func (Lang.bind (this, function (model, iter) {
      if (this.current_filter_language == null || this.current_filter_language == "None")
      {
        return true;
      } else {
        return model.get_value (iter, 2) == this.current_filter_language;
      }
    }));
    // Creating the treeview, making it use the filter as a model.
    //this.treeview = Gtk.TreeView.new_with_model (this.software_liststore);
    this.treeview = new Gtk.TreeView ({
      expand: true,
      //model: this.software_liststore
      model: this.language_filter
    });

    ["Sofware", "Release Year", "Program"].forEach (function (item, index, array) {
      let renderer = new Gtk.CellRendererText ();
      let column = new Gtk.TreeViewColumn ({ title: item});
      column.pack_start (renderer, true);
      column.add_attribute (renderer, "text", index);
      this.treeview.append_column (column);
    }, this);
    // setting up the layout, putting the treeview in a scrollwindow,
    // and the buttons in a row
    this.scrollable_treelist = new Gtk.ScrolledWindow ({
      vexpand: true
    });
    this.grid.attach(this.scrollable_treelist, 0, 0, 8, 10);
    ["Java", "C", "C++", "Python", "None"].forEach (function (item, index, array) {

      let button = new Gtk.Button ({label: item});
      button.connect ("clicked", Lang.bind (this, function (widget) {
        this.current_filter_language = widget.get_label ();
        this.language_filter.refilter ();
        print (this.current_filter_language + " language selected!")
      }));
      this.grid.attach (button, index, 10, 1, 1);

    },this);
    this.scrollable_treelist.add(this.treeview);
  },

  run: function () {
    this.show_all ();
  }
});

function main() {
  Gtk.init (null, null);

  var win = new TreeViewFilterWindow ();
  win.run();

  Gtk.main ();
}

main ();

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;


const ComboBoxWindow = new Lang.Class ({
  Name: 'ComboBoxWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'ComboBox Example',
      window_position: Gtk.WindowPosition.CENTER,
      border_width: 10
    });
    this.connect ('delete-event', Gtk.main_quit);

    let name_store = new Gtk.ListStore ();
    name_store.set_column_types ([
      GObject.TYPE_INT,
      GObject.TYPE_STRING
    ]);

    for (let item of [[1, "Billy Bob"], [11, "Billy Bob Junior"], [12, "Sue Bob"],
                      [2, "Joey Jojo"], [3, "Rob McRoberts"], [31, "Xavier McRobets"]])
      {
        name_store.set (name_store.append(), [0,1], [item[0], item[1]]);
      }

    let vbox = new Gtk.Box ({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 6
    });

    let name_combo = new Gtk.ComboBox({
      model: name_store,
      has_entry: true
    });
    name_combo.set_entry_text_column(1);
    name_combo.connect ('changed', (combo) => {
      let [is_exist, iter] = combo.get_active_iter ();
      if (is_exist) {
        let model = combo.get_model ();
        let row_id = model.get_value (iter, 0);
        let name = model.get_value (iter, 1);
        print("Selected: ID=" + row_id + ", name=" + name);
      } else {
        let entry = combo.get_child ();
        print("Entered: " + entry.get_text ());
      }
    });
    vbox.pack_start (name_combo, false, false, 0);

    let country_store = new Gtk.ListStore ();
    country_store.set_column_types ([GObject.TYPE_STRING]);
    let countries = ["Austria", "Brazil", "Belgium", "France", "Germany",
                     "Switzerland", "United Kingdom", "United States of America",
                     "Uruguay"];
    for (let country of countries) {
      country_store.set (country_store.append(), [0], [country]);
    }
    let country_combo = new Gtk.ComboBox ({ model: country_store});
    let renderer = new Gtk.CellRendererText ();
    country_combo.pack_start (renderer, true);
    country_combo.add_attribute (renderer, "text", 0);
    country_combo.connect ('changed', (combo) => {
      let [is_exist, iter] = combo.get_active_iter ();
      if (is_exist) {
        let model = combo.get_model ();
        let country = model.get_value (iter, 0);
        print("Selected: country=" + country);
      }
    });
    vbox.pack_start (country_combo, false, false, 0);

    let currencies = ["Euro", "US Dollars", "British Pound", "Japanese Yen",
                      "Russian Ruble", "Mexican peso", "Swiss franc"];
    let currency_combo = new Gtk.ComboBoxText ();
    currency_combo.set_entry_text_column(0);
    currency_combo.connect ('changed', (combo) => {
      let text = combo.get_active_text ();
      if (text !== null) {
        print("Selected: currency=" + text);
      }
    });
    for (let currency of currencies) {
      currency_combo.append_text (currency);
    }
    vbox.pack_start (currency_combo, false, false, 0);

    this.add (vbox);
  },

  run: function () {
    this.show_all ();
  }
});

function main () {
  Gtk.init (null, null);
  var win = new ComboBoxWindow ();
  win.run ();
  Gtk.main ();
}

main ();

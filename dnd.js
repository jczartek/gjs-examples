const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const Gdk = imports.gi.Gdk;
const GObject = imports.gi.GObject;
const GdkPixbuf = imports.gi.GdkPixbuf;

const COLUMN_TEXT = 0;
const COLUMN_PIXBUF = 1;
const TARGET_ENTRY_TEXT = 0;
const TARGET_ENTRY_PIXBUF = 1;
const DRAG_ACTION = Gdk.DragAction.COPY;

const DragDropWindow = new Lang.Class({
  Name: 'DragDropWindow',
  Extends: Gtk.Window,

  _init: function() {
    this.parent({
      title: 'Drag and Drop Demo',
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect('delete-event', Gtk.main_quit);

    var vbox = new Gtk.Box({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 6
    });
    this.add(vbox);

    var hbox = new Gtk.Box({
      orientation: Gtk.Orientation.HORIZONTAL,
      spacing: 12
    });
    vbox.pack_start(hbox, true, true, 0);

    this.iconview = new DragSourceIconView();
    this.drop_area = new DropArea();

    hbox.pack_start(this.iconview, true, true, 0);
    hbox.pack_start(this.drop_area, true, true, 0);

    var button_box = new Gtk.Box ({ spacing: 6 });
    vbox.pack_start(button_box, true, true, 0);

    var image_button = Gtk.RadioButton.new_with_label_from_widget(null, 'Images');
    image_button.connect('toggled', (button) => {
      let targets = new Gtk.TargetList (null);
      targets.add_image_targets(TARGET_ENTRY_PIXBUF, true);

      this.drop_area.drag_dest_set_target_list(targets);
      this.iconview.drag_source_set_target_list(targets);
    });
    button_box.pack_start(image_button, true, false, 0);

    var text_button = Gtk.RadioButton.new_with_label_from_widget(image_button, 'Text');
    text_button.connect('toggled', (button) => {
      this.drop_area.drag_dest_set_target_list(null);
      this.iconview.drag_source_set_target_list(null);

      this.drop_area.drag_dest_add_text_targets();
      this.iconview.drag_source_add_text_targets();
    });
    button_box.pack_start(text_button, true, false, 0);
  },

  run: function() {
    this.show_all();
  }
});

const DragSourceIconView = new Lang.Class({
  Name: 'DragSourceIconView',
  Extends: Gtk.IconView,
  _init: function() {
    this.parent();
    this.set_text_column(COLUMN_TEXT);
    this.set_pixbuf_column(COLUMN_PIXBUF);

    var model = new Gtk.ListStore();
    model.set_column_types ([GObject.TYPE_STRING, GdkPixbuf.Pixbuf]);
    this.set_model(model);
    this.add_item('Item 1', 'image-missing');
    this.add_item('Item 2', 'help-about');
    this.add_item('Item 2', 'edit-copy');

    this.enable_model_drag_source(Gdk.ModifierType.BUTTON1_MASK, [], DRAG_ACTION);
    this.connect('drag-data-get', (widget, drag_context, data, info, time) => {
      let selected_path = this.get_selected_items()[0];
      let selected_iter = this.get_model().get_iter(selected_path)[1];

      if (info === TARGET_ENTRY_TEXT) {
        let text = this.get_model().get_value(selected_iter, COLUMN_TEXT);
        data.set_text(text, -1);
      } else if (info === TARGET_ENTRY_PIXBUF) {
        let pixbuf = this.get_model().get_value(selected_iter, COLUMN_PIXBUF);
        data.set_pixbuf(pixbuf);
      }
    })
  },

  add_item: function (text, icon_name) {
    var pixbuf = Gtk.IconTheme.get_default().load_icon(icon_name, 16, 0);
    var model = this.get_model();
    model.set(model.append(), [0,1], [text, pixbuf]);
  }
});

const DropArea = Lang.Class({
  Name: 'DropArea',
  Extends: Gtk.Label,

  _init: function() {
    this.parent({
      label: 'Drop something on me!'
    });
    this.drag_dest_set(Gtk.DestDefaults.ALL, [], DRAG_ACTION);
    this.connect('drag-data-received', (widget, drag_context, x, y, data, info, time) => {
      if (info === TARGET_ENTRY_TEXT) {
        let text = data.get_text();
        print('Received text ' + text);
      } else if (info === TARGET_ENTRY_PIXBUF) {
        let pixbuf = data.get_pixbuf();
        let width = pixbuf.get_width();
        let height = pixbuf.get_height();
        print('Received pixbuf with width ' + width + 'px and height ' + height + 'px');
      }
    });
  }
});

function main() {
  Gtk.init(null, null);
  var win = new DragDropWindow();
  win.run();
  Gtk.main();
}

main();

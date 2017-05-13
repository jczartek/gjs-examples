const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const Gdk = imports.gi.Gdk;


const ClipboardWindow = new Lang.Class({
  Name: 'ClipboardWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent({
      title: 'Clipboard Example',
      window_position: Gtk.WindowPosition.CENTER
    });
    this.connect('delete-event', Gtk.main_quit);

    var grid = new Gtk.Grid();

    this.clipboard = Gtk.Clipboard.get_default(this.get_display());
    this.entry = new Gtk.Entry ();
    this.image = Gtk.Image.new_from_icon_name("process-stop", Gtk.IconSize.MENU);

    var button_copy_text = new Gtk.Button( {label: "Copy Text"} );
    button_copy_text.connect('clicked', (button) => {
      this.clipboard.set_text(this.entry.get_text(), -1);
    });
    var button_paste_text = new Gtk.Button( {label: "Paste Text"} );
    button_paste_text.connect('clicked', (button) => {
      let text = this.clipboard.wait_for_text();
      if (text !== null) {
        this.entry.set_text(text);
      } else {
        print("No text on the clipboard.");
      }
    });
    var button_copy_image = new Gtk.Button( {label: "Copy Image "} );
    button_copy_image.connect('clicked', (button) => {
      if(this.image.get_storage_type() === Gtk.ImageType.PIXBUF) {
        this.clipboard.set_image(this.image.get_pixbuf());
      } else {
        print("No image has been pasted yet");
      }
    });
    var button_paste_image = new Gtk.Button( {label: "Paste Image "});
    button_paste_image.connect('clicked', (button) => {
      let image = this.clipboard.wait_for_image();
      if (image != null) {
        this.image.set_from_pixbuf(image);
      }
    });

    grid.attach(this.entry, 0, 1, 1, 1);
    grid.attach(this.image, 0, 2, 1, 1);
    grid.attach(button_copy_text, 1,1,1,1);
    grid.attach(button_paste_text, 2, 1, 1, 1);
    grid.attach(button_copy_image, 1,2,1,1);
    grid.attach(button_paste_image, 2,2,1,1);

    this.add(grid);
  },
  run: function () {
    this.show_all();
  }
});

function main() {
  Gtk.init(null, null);

  var win = new ClipboardWindow();
  win.run();
  Gtk.main();
}

main();

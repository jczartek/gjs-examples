const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const Pango = imports.gi.Pango;

const SearchDialog = new Lang.Class ({
  Name: 'SearchDialog',
  Extends: Gtk.Dialog,

  _init: function (p) {
    this.parent ({
      title: 'Dialog Info',
      use_header_bar: true
    });

    this.set_default_size (150, 150);
    this.set_transient_for (p);
    this.add_button ('Cancel', Gtk.ResponseType.CANCEL);
    this.add_button ('Find', Gtk.ResponseType.OK);

    let label = new Gtk.Label ({label: 'Insert text you want to search for:'});
    let box = this.get_content_area ();
    box.add (label);

    this.entry = new Gtk.Entry();
    box.add (this.entry);
    this.show_all ();
  }
});


const TextViewWidnow = new Lang.Class({
  Name: 'TextViewWidnow',
  Extends: Gtk.Window,
  _init: function () {
    this.parent({
      title: 'TextView',
      window_position: Gtk.WindowPosition.CENTER,
      default_width: -1,
      default_height: 350
    });
    this.connect('delete-event', Gtk.main_quit);

    this.grid = new Gtk.Grid();
    this.add(this.grid);


    this.create_textview();
    this.create_toolbar();
    this.create_buttons();
  },

  create_toolbar: function () {
    let toolbar = new Gtk.Toolbar();
    this.grid.attach(toolbar, 0, 0, 3, 1);

    let button_bold = new Gtk.ToolButton();
    button_bold.set_icon_name('format-text-bold-symbolic');
    toolbar.insert(button_bold, 0);

    let button_italic = new Gtk.ToolButton();
    button_italic.set_icon_name('format-text-italic-symbolic');
    toolbar.insert(button_italic, 1);

    let button_underline = new Gtk.ToolButton();
    button_underline.set_icon_name('format-text-underline-symbolic');
    toolbar.insert(button_underline, 2);

    button_bold.connect('clicked', Lang.bind(this, this._on_button_clicked, this.tag_bold));
    button_italic.connect('clicked', Lang.bind(this, this._on_button_clicked, this.tag_italic));
    button_underline.connect('clicked', Lang.bind(this, this._on_button_clicked, this.tag_underline));

    toolbar.insert(new Gtk.SeparatorToolItem(), 3);
    let radio_justifyleft = new Gtk.RadioToolButton();
    radio_justifyleft.set_icon_name('format-justify-left-symbolic');
    toolbar.insert(radio_justifyleft, 4);

    let radio_justifycenter = Gtk.RadioToolButton.new_from_widget(radio_justifyleft);
    radio_justifycenter.set_icon_name('format-justify-center-symbolic');
    toolbar.insert(radio_justifycenter, 5);

    let radio_justifyright = Gtk.RadioToolButton.new_from_widget(radio_justifyleft);
    radio_justifyright.set_icon_name('format-justify-right-symbolic');
    toolbar.insert(radio_justifyright, 6);

    let radio_justifyfill = Gtk.RadioToolButton.new_from_widget(radio_justifyleft);
    radio_justifyfill.set_icon_name('format-justify-fill-symbolic');
    toolbar.insert(radio_justifyfill, 7);

    radio_justifyleft.connect('toggled', Lang.bind(this, this._on_justify_toggled, Gtk.Justification.LEFT));
    radio_justifycenter.connect('toggled', Lang.bind(this, this._on_justify_toggled, Gtk.Justification.CENTER));
    radio_justifyright.connect('toggled', Lang.bind(this, this._on_justify_toggled, Gtk.Justification.RIGHT));
    radio_justifyfill.connect('toggled', Lang.bind(this, this._on_justify_toggled, Gtk.Justification.FILL));

    toolbar.insert(new Gtk.SeparatorToolItem(), 8);
    let button_clear = new Gtk.ToolButton();
    button_clear.set_icon_name('edit-clear-symbolic');
    button_clear.connect('clicked', (widget) => {
      let start = this.textbuffer.get_start_iter();
      let end = this.textbuffer.get_end_iter();
      this.textbuffer.remove_all_tags(start, end);
    });
    toolbar.insert(button_clear, 9);

    toolbar.insert(new Gtk.SeparatorToolItem(), 10);

    let button_search = new Gtk.ToolButton();
    button_search.set_icon_name('system-search-symbolic');
    button_search.connect('clicked', (widget) => {
      let dialog = new SearchDialog(this);
      let response = dialog.run();

      if(response === Gtk.ResponseType.OK) {
        let cursor_mark = this.textbuffer.get_insert();
        let start = this.textbuffer.get_iter_at_mark(cursor_mark);
        if((start.get_offset()) ===  (this.textbuffer.get_char_count())) {
          start = this.textbuffer.get_start_iter();
        }

        this.search_and_mark(dialog.entry.get_text(), start);
      }

      dialog.destroy();
    });
    toolbar.insert(button_search, 11);
  },

  create_textview: function () {
    let scrolledwindow = new Gtk.ScrolledWindow();
    scrolledwindow.set_hexpand(true);
    scrolledwindow.set_vexpand(true);
    this.grid.attach(scrolledwindow, 0, 1, 3, 1);

    this.textview = new Gtk.TextView();
    this.textbuffer = this.textview.get_buffer();
    this.textbuffer.set_text("This is some text inside of a Gtk.TextView. "
       + "Select text and click one of the buttons 'bold', 'italic', "
       + "or 'underline' to modify the text accordingly.", -1);
       scrolledwindow.add(this.textview);

    let tagtable = this.textbuffer.get_tag_table();
    this.tag_bold = new Gtk.TextTag({
      name: 'bold',
      weight: Pango.Weight.BOLD
    });
    tagtable.add(this.tag_bold);

    this.tag_italic = new Gtk.TextTag({
      name: 'italic',
      style: Pango.Style.ITALIC
    });
    tagtable.add(this.tag_italic);

    this.tag_underline = new Gtk.TextTag({
      name: 'underline',
      underline: Pango.Underline.SINGLE
    });
    tagtable.add(this.tag_underline);

    this.tag_found = new Gtk.TextTag({
      name: 'found',
      background: 'yellow' });
    tagtable.add(this.tag_found);
  },

  create_buttons: function () {
    let check_editable = Gtk.CheckButton.new_with_label('Editable');
    check_editable.set_active(true);
    check_editable.connect('toggled', (button) => {
      this.textview.set_editable(button.get_active());
    });
    this.grid.attach(check_editable, 0, 2, 1, 1);

    let check_cursor = Gtk.CheckButton.new_with_label('Cursor Visible');
    check_cursor.set_active(true);
    check_cursor.connect('toggled', (widget) => {
      this.textview.set_cursor_visible(widget.get_active());
    });
    this.grid.attach_next_to(check_cursor, check_editable, Gtk.PositionType.RIGHT, 1, 1);

    let radio_wrapnone = Gtk.RadioButton.new_with_label_from_widget(null, 'No Wrapping');
    this.grid.attach(radio_wrapnone, 0, 3, 1, 1);

    let radio_wrapchar = Gtk.RadioButton.new_with_label_from_widget(radio_wrapnone, 'Character Wrapping');
    this.grid.attach_next_to(radio_wrapchar, radio_wrapnone, Gtk.PositionType.RIGHT, 1, 1);

    let radio_wrapword = Gtk.RadioButton.new_with_label_from_widget(radio_wrapnone, 'Word Wrapping');
    this.grid.attach_next_to(radio_wrapword, radio_wrapchar, Gtk.PositionType.RIGHT, 1, 1);

    radio_wrapnone.connect('toggled', Lang.bind(this, this._on_wrap_toggled, Gtk.WrapMode.NONE));
    radio_wrapchar.connect('toggled', Lang.bind(this, this._on_wrap_toggled, Gtk.WrapMode.CHAR));
    radio_wrapword.connect('toggled', Lang.bind(this, this._on_wrap_toggled, Gtk.WrapMode.WORD));
  },

  search_and_mark: function(text, start) {
    let end = this.textbuffer.get_end_iter();
    let match = start.forward_search(text, 0, end);

    if(match[0] !== false) {
      let match_start = match[1];
      let match_end = match[2];
      this.textbuffer.apply_tag(this.tag_found, match_start, match_end);
      this.search_and_mark(text, match_end);
    }
  },

  _on_wrap_toggled: function (widget, mode) {
    this.textview.set_wrap_mode(mode);
  },

  _on_button_clicked: function (widget, tag) {
    let bounds = this.textbuffer.get_selection_bounds();
    if(bounds[0]) {
      let start = bounds[1];
      let end = bounds[2];
      this.textbuffer.apply_tag(tag, start, end);
    }
  },

  _on_justify_toggled: function (widget, justification) {
    this.textview.set_justification(justification);
  },

  run: function () {
    this.show_all();
  }
});


function main () {
  Gtk.init(null, null)
  var win = new TextViewWidnow();
  win.run();
  Gtk.main();
}

main();

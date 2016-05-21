#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;

const LabelWindow = new Lang.Class ({
  Name: 'LabelWindow',
  Extends: Gtk.Window,

  _init: function () {
    this.parent ({
      title: 'Label Example',
      type: Gtk.WindowType.TOPLEVEL,
      window_position: Gtk.WindowPosition.CENTER,
      default_width: 600,
      border_width: 5
    });
    this.connect ('delete-event', Gtk.main_quit);

    let hbox = new Gtk.Box ({
      spacing: 10,
      homogeneous: false
    });

    let vbox_left = new Gtk.Box ({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 10,
      homogeneous: false
    });

    let vbox_right = new Gtk.Box ({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 10,
      homogeneous: false
    });

    hbox.pack_start (vbox_left, true, true, 0);
    hbox.pack_start (vbox_right, true, true, 0);

    let label = new Gtk.Label ({
      label: 'This is a normal label'
    });
    vbox_left.pack_start (label, true, true, 0);

    label = new Gtk.Label ();
    label.set_text ('This is a left-justified label.\nWith multiple lines.');
    label.set_justify (Gtk.Justification.LEFT);
    vbox_left.pack_start (label, true, true, 0);

    label = new Gtk.Label ({
      label: 'This is a right-justified label.\nWith multiple lines.',
      justify: Gtk.Justification.RIGHT
    });
    vbox_left.pack_start (label, true, true, 0);

    label = new Gtk.Label ({
      label: 'This is an example of a line-wrapped label.   It ' +
             'should not be taking up the entire               ' +
             'width allocated to it, but automatically '         +
             'wraps the words to fit.\n'                         +
             '     It supports multiple paragraphs correctly,'   +
             ' nad correctly    adds '                           +
             'many         extra spaces.'
    });
    label.set_line_wrap (true);
    vbox_right.pack_start (label, true, true, 0);

    label = new Gtk.Label ({
      label: 'This is an example of a line-wrapped, filled label. ' +
             'It should be taking '                                 +
             'up the entire          width allocated to it.'        +
             'Here is a sentence to prove '                         +
             'my point. Here is another sentence. '                 +
             'Here comes the sun, do de do de do.\n'                +
             '    This is a new paragraph.\n'                       +
             '    This is another newer, longer, better '           +
             'paragraph.   It is coming to an end,'                 +
             'unfortunately.',
      wrap: true,
      justify: Gtk.Justification.FILL
    });
    vbox_right.pack_start (label, true, true, 0);

    label = new Gtk.Label ();
    label.set_markup ('Text can be <small>small</small>, <big>big</big>, ' +
                      '<b>bold</b>, <i>italic</i> and even point to '      +
                      'somewhere in the <a href=\"http://www.gtk.org\" '   +
                      'title=\"Click to find out more\">iternets</a>.');
    label.set_line_wrap (true);
    vbox_left.pack_start (label, true, true, 0);

    label = Gtk.Label.new_with_mnemonic (
      '_Press Alt + P to select button to the right');
    vbox_left.pack_start (label, true, true, 0);
    label.set_selectable (true);

    let button = new Gtk.Button ({
      label: 'Click at your own risk'
    });
    label.set_mnemonic_widget (button);
    vbox_right.pack_start (button, true, true, 0);

    this.add (hbox);
  },

  run: function () {
    this.show_all ();
  }
});

Gtk.init (null, null);

var win = new LabelWindow ();
win.run ();

Gtk.main ();

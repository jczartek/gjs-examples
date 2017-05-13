const Lang = imports.lang;
const GObject = imports.gi.GObject;

const MyInterface = new Lang.Interface ({
  Name: 'MyInterface',
  Requires: [ GObject.Object ],
  Properties: {
    'name-prop': GObject.ParamSpec.string ('name-prop', 'Interface property',
                                           'Must be overriden in implementation',
                                           GObject.ParamFlags.READWRITE, 'unknown')
  },
  sayHello: Lang.Interface.UNIMPLEMENTED
});

const MyObject = new Lang.Class ({
  Name: 'MyObject',
  Extends: GObject.Object,
  Implements: [ MyInterface ],
  Signals: {
    'my-signal': {
      flags: GObject.SignalFlags.RUN_LAST,
      param_types: [ GObject.TYPE_INT ]
    }
  },
  Properties: {
    'int-prop': GObject.ParamSpec.int ('int-prop', 'integer prop', 'A property that contains an intager',
                                         GObject.ParamFlags.READWRITE, 1, 5, 2),
    'name-prop': GObject.ParamSpec.override ('name-prop', MyInterface)
  },

  _init: function () {
    this.parent ();

    this._int_prop = 2;
    this._name_prop = 'unknown';
  },

  sayHello: function () {
    print ("Hello " + this.name_prop + "!!!");
  },

  emit_my_signal: function (arg) {
    this.emit ('my-signal', 42);
  },

  on_my_signal: function (arg) {
    print("class method for `my_signal` called with argument: " + arg);
  },

  get int_prop () {
    return this._int_prop;
  },

  set int_prop (val) {
    if (val < 1 || val > 5) {
      return;
    }
    this._int_prop = val;
  },

  get name_prop () { return this._name_prop },
  set name_prop (val) { this._name_prop = val }
});

function main() {
  var obj = new MyObject ({});

  obj.name_prop = 'John'
  obj.sayHello ();
  obj.emit_my_signal (42);
  print ("Property: `int-prop` = " + obj.int_prop);
  obj.int_prop = 5;
  print ("Property: `int-prop` = " + obj.int_prop);
}

main ();

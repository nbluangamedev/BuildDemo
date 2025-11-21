System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseManager.ts', './GameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioSource, resources, AudioClip, BaseManager, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioSource = module.AudioSource;
      resources = module.resources;
      AudioClip = module.AudioClip;
    }, function (module) {
      BaseManager = module.BaseManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "15149Zx5LdC47Gsa+4kWRfN", "AudioManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AudioManager = exports('AudioManager', (_dec = ccclass('AudioManager'), _dec2 = property(AudioSource), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(AudioManager, _BaseManager);

        function AudioManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;
          _this._soundMap = new Map();
          _this._sfxSources = [];

          _initializerDefineProperty(_this, "audioSFXSource", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = AudioManager.prototype;

        _proto.onLoad = function onLoad() {
          _BaseManager.prototype.onLoad.call(this);

          this.loadAllSounds();
        };

        _proto.loadAllSounds = function loadAllSounds() {
          var _this2 = this;

          resources.loadDir('Audios', AudioClip, function (err, clips) {
            if (err) {
              console.error('❌ Error loading audios:', err);
              return;
            }

            clips.forEach(function (clip) {
              _this2._soundMap.set(clip.name, clip);
            });
          });
        };

        _proto.playSFXEffect = function playSFXEffect(key, volume) {
          if (volume === void 0) {
            volume = 1;
          }

          if (!GameManager.isSEOn) return;

          var clip = this._soundMap.get(key);

          if (!clip) {
            console.warn("\u26A0\uFE0F Can't find audio with key: " + key);
            return;
          }

          var source = this._sfxSources.find(function (s) {
            return !s.playing;
          });

          if (!source) {
            source = this.node.addComponent(AudioSource);

            this._sfxSources.push(source);
          }

          source.playOneShot(clip, volume);
        };

        return AudioManager;
      }(BaseManager), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioSFXSource", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, _decorator, director, Node, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "3a357hdv7VEHIxDeBLnWsKQ", "BaseManager", undefined);

      var ccclass = _decorator.ccclass;
      var BaseManager = exports('BaseManager', (_dec = ccclass('BaseManager'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BaseManager, _Component);

        function BaseManager() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = BaseManager.prototype;

        _proto.onLoad = function onLoad() {
          var clazz = this.constructor;
          console.log("BaseManager onLoad called for " + clazz.name + "<" + this.name + ">");

          if (BaseManager._instances.has(clazz)) {
            console.warn(this.name + " already exists");
            this.node.destroy();
            return;
          }

          console.log(this.name + " created");
          director.addPersistRootNode(this.node);

          BaseManager._instances.set(clazz, this);
        };

        _createClass(BaseManager, null, [{
          key: "instance",
          get: function get() {
            if (!this._instances) this._instances = new Map();

            var inst = this._instances.get(this);

            if (inst) return inst;
            var scene = director.getScene();

            if (!scene) {
              console.error("[" + this.name + "] Cannot create instance: no active scene");
              return null;
            } // ⚠️ KIỂM TRA node đã có sẵn trong scene chưa


            var node = scene.getChildByName(this.name);

            if (node) {
              // ✅ Dùng lại component gắn sẵn
              inst = node.getComponent(this);

              if (!inst) {
                inst = node.addComponent(this);
              }
            } else {
              // ✅ Nếu chưa có thì mới tạo mới
              node = new Node(this.name);
              scene.addChild(node);
              inst = node.addComponent(this);
            }

            this._instances.set(this, inst);

            return inst;
          }
        }]);

        return BaseManager;
      }(Component), _class2._instances = new Map(), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseNotify.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, UIType, BaseUI;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      UIType = module.UIType;
      BaseUI = module.BaseUI;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "dbfd6MWYPFHhZJxchacHq+G", "BaseNotify", undefined);

      var ccclass = _decorator.ccclass;
      var BaseNotify = exports('BaseNotify', (_dec = ccclass('BaseNotify'), _dec(_class = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(BaseNotify, _BaseUI);

        function BaseNotify() {
          return _BaseUI.apply(this, arguments) || this;
        }

        var _proto = BaseNotify.prototype;

        _proto.init = function init() {
          _BaseUI.prototype.init.call(this);

          this.uiType = UIType.Notify;
        };

        _proto.show = function show(data) {
          _BaseUI.prototype.show.call(this, data);
        };

        _proto.hide = function hide() {
          _BaseUI.prototype.hide.call(this);
        };

        return BaseNotify;
      }(BaseUI)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseOverlap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, UIType, BaseUI;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      UIType = module.UIType;
      BaseUI = module.BaseUI;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "c18f3YBH3xPKYO0V3RTbudP", "BaseOverlap", undefined);

      var ccclass = _decorator.ccclass;
      var BaseOverlap = exports('BaseOverlap', (_dec = ccclass('BaseOverlap'), _dec(_class = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(BaseOverlap, _BaseUI);

        function BaseOverlap() {
          return _BaseUI.apply(this, arguments) || this;
        }

        var _proto = BaseOverlap.prototype;

        _proto.init = function init() {
          _BaseUI.prototype.init.call(this);

          this.uiType = UIType.Overlap;
        };

        _proto.show = function show(data) {
          _BaseUI.prototype.show.call(this, data);
        };

        _proto.hide = function hide() {
          _BaseUI.prototype.hide.call(this);
        };

        return BaseOverlap;
      }(BaseUI)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BasePopup.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Vec3, tween, UIType, BaseUI;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      tween = module.tween;
    }, function (module) {
      UIType = module.UIType;
      BaseUI = module.BaseUI;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "aa8a2hP7CdGfpmZq20yrPXb", "BasePopup", undefined);

      var ccclass = _decorator.ccclass;
      var BasePopup = exports('BasePopup', (_dec = ccclass('BasePopup'), _dec(_class = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(BasePopup, _BaseUI);

        function BasePopup() {
          return _BaseUI.apply(this, arguments) || this;
        }

        var _proto = BasePopup.prototype;

        _proto.init = function init() {
          _BaseUI.prototype.init.call(this);

          this.uiType = UIType.Popup;
        };

        _proto.show = function show(data) {
          _BaseUI.prototype.show.call(this, data);

          this.node.scale = new Vec3(0, 0, 0);
          tween(this.node).to(0.5, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'quadOut'
          }).start();
        };

        _proto.hide = function hide() {
          _BaseUI.prototype.hide.call(this);
        };

        return BasePopup;
      }(BaseUI)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, UIType, BaseUI;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      UIType = module.UIType;
      BaseUI = module.BaseUI;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "55719i6quRDVowLNH6aCTH4", "BaseScreen", undefined);

      var ccclass = _decorator.ccclass;
      var BaseScreen = exports('BaseScreen', (_dec = ccclass('BaseScreen'), _dec(_class = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(BaseScreen, _BaseUI);

        function BaseScreen() {
          return _BaseUI.apply(this, arguments) || this;
        }

        var _proto = BaseScreen.prototype;

        _proto.init = function init() {
          _BaseUI.prototype.init.call(this);

          this.uiType = UIType.Screen;
        };

        _proto.show = function show(data) {
          _BaseUI.prototype.show.call(this, data);
        };

        _proto.hide = function hide() {
          _BaseUI.prototype.hide.call(this);
        };

        return BaseScreen;
      }(BaseUI)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, _decorator, UIOpacity, BlockInputEvents, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      BlockInputEvents = module.BlockInputEvents;
      Component = module.Component;
    }],
    execute: function () {
      exports('UIType', void 0);

      var _dec, _class;

      cclegacy._RF.push({}, "b35b37DeWlIXYLAQgAV8zaP", "BaseUI", undefined);

      var ccclass = _decorator.ccclass;
      var UIType;

      (function (UIType) {
        UIType["Screen"] = "Screen";
        UIType["Popup"] = "Popup";
        UIType["Notify"] = "Notify";
        UIType["Overlap"] = "Overlap";
      })(UIType || (UIType = exports('UIType', {})));

      var BaseUI = exports('BaseUI', (_dec = ccclass('BaseUI'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BaseUI, _Component);

        function BaseUI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.uiType = UIType.Screen;
          _this.isShow = false;
          _this.isInited = false;
          return _this;
        }

        var _proto = BaseUI.prototype;

        _proto.init = function init() {
          if (this.isInited) return;
          this.isInited = true;

          if (!this.getComponent(UIOpacity)) {
            this.uiOpacity = this.addComponent(UIOpacity);
          } else {
            this.uiOpacity = this.getComponent(UIOpacity);
          }

          if (!this.getComponent(BlockInputEvents)) {
            this.blockInput = this.addComponent(BlockInputEvents);
          } else {
            this.blockInput = this.getComponent(BlockInputEvents);
          }

          this.node.active = true;
        };

        _proto.show = function show(data) {
          this.node.active = true;
          this.isShow = true;
          this.setCanvasGroupActive(true);
        };

        _proto.hide = function hide() {
          this.isShow = false;
          this.setCanvasGroupActive(false);
        };

        _proto.setCanvasGroupActive = function setCanvasGroupActive(isActive) {
          if (this.uiOpacity) {
            this.uiOpacity.opacity = isActive ? 255 : 0;
          }

          if (this.blockInput) {
            this.blockInput.enabled = isActive;
          }
        } // check primitive
        ;

        _proto.isType = function isType(value, type) {
          return typeof value === type;
        };

        _proto.isEnumValue = function isEnumValue(enumType, value) {
          for (var key in enumType) {
            if (typeof enumType[key] === "number" && enumType[key] === value) {
              return true;
            }
          }

          return false;
        };

        _createClass(BaseUI, [{
          key: "IsShow",
          get: function get() {
            return this.isShow;
          }
        }, {
          key: "IsInited",
          get: function get() {
            return this.isInited;
          }
        }, {
          key: "UIType",
          get: function get() {
            return this.uiType;
          }
        }]);

        return BaseUI;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BetBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ObserverManager.ts', './UIManager.ts', './ScreenGame.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Component, ObserverManager, ObserverEvent, UIManager, ScreenGame;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Component = module.Component;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      ScreenGame = module.ScreenGame;
    }],
    execute: function () {
      exports('BetType', void 0);

      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "4ccc5myKwhCsoQUqsGppTpW", "BetBase", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BetType;

      (function (BetType) {
        BetType[BetType["None"] = 0] = "None";
        BetType[BetType["Big"] = 1] = "Big";
        BetType[BetType["Small"] = 2] = "Small";
      })(BetType || (BetType = exports('BetType', {})));

      var BetBase = exports('BetBase', (_dec = ccclass('BetBase'), _dec2 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BetBase, _Component);

        function BetBase() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.betType = void 0;
          _this._lockHand = false;

          _initializerDefineProperty(_this, "betButton", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = BetBase.prototype;

        _proto.onLoad = function onLoad() {
          ObserverManager.on(ObserverEvent.LockHand, this.onLockHand.bind(this));
          ObserverManager.on(ObserverEvent.NumberBet, this.onBetNumber.bind(this));
          this.betButton.node.on(Button.EventType.CLICK, this.onBet, this);
        };

        _proto.onDestroy = function onDestroy() {
          ObserverManager.off(ObserverEvent.LockHand, this.onLockHand.bind(this));
          ObserverManager.off(ObserverEvent.NumberBet, this.onBetNumber.bind(this));
        };

        _proto.onBet = function onBet() {
          var _UIManager$getExistUI;

          if (this._lockHand) return; // GameManager.betType = this.betType;

          (_UIManager$getExistUI = UIManager.getExistUI(ScreenGame)) == null ? void 0 : _UIManager$getExistUI.showBottom();
        };

        _proto.onLockHand = function onLockHand(isLock) {
          console.log('BetBase onLockHand', isLock);
          this._lockHand = isLock;
        };

        return BetBase;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "betButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BigBet.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BetBase.ts', './GameManager.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, BetType, BetBase, GameManager;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      BetType = module.BetType;
      BetBase = module.BetBase;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "e628flcL8dM4JJjquu6Bkno", "BigBet", undefined);

      var ccclass = _decorator.ccclass;
      var BigBet = exports('BigBet', (_dec = ccclass('BigBet'), _dec(_class = /*#__PURE__*/function (_BetBase) {
        _inheritsLoose(BigBet, _BetBase);

        function BigBet() {
          return _BetBase.apply(this, arguments) || this;
        }

        var _proto = BigBet.prototype;

        _proto.start = function start() {
          this.betType = BetType.Big;
        };

        _proto.onBetNumber = function onBetNumber(number) {
          if (this.betType !== GameManager.betType) return;
          GameManager.numberPlayerBigBet++;
          GameManager.bigBetTotal += number;
          GameManager.numberBigBetOfPlayer += number;
        };

        return BigBet;
      }(BetBase)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BubbleLabel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Tween, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Tween = module.Tween;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "52cf4H7F81DprBn33tyGYn0", "BubbleLabel", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BubbleLabel = exports('BubbleLabel', (_dec = ccclass('BubbleLabel'), _dec2 = property({
        type: Label
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BubbleLabel, _Component);

        function BubbleLabel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "label", _descriptor, _assertThisInitialized(_this));

          _this.DURATION = 1;
          return _this;
        }

        var _proto = BubbleLabel.prototype;

        _proto.show = function show(text, worldPosition, direction, color, duration) {
          var _this2 = this;

          if (duration === void 0) {
            duration = this.DURATION;
          }

          Tween.stopAllByTarget(this.node);
          console.log('show bubble label ' + text);
          this.node.active = true;
          this.label.string = text;
          this.label.color = color;
          this.node.setWorldPosition(worldPosition);
          this.node.setScale(1, 1, 1);
          var dir = direction.clone();
          dir.normalize();
          var targetPos = this.node.getPosition().clone().add(dir.multiplyScalar(50));
          tween(this.node).parallel(tween().target(this.node).to(duration, {
            scale: new Vec3(1.5, 1.5, 1.5)
          }, {
            easing: 'quadOut'
          }), tween().target(this.node).to(duration, {
            position: targetPos
          }, {
            easing: 'quartInOut'
          })).call(function () {
            tween(_this2.node).to(duration, {
              scale: new Vec3(0.01, 0.01, 0.01)
            }, {
              easing: 'quadOut'
            }).call(function () {
              _this2.node.active = false;
            }).start();
          }).start();
        };

        return BubbleLabel;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChipMoveEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "ea825ousm5PV63VDCd3J5/n", "ChipMoveEffect", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ChipMoveEffect = exports('ChipMoveEffect', (_dec = ccclass('ChipMoveEffect'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ChipMoveEffect, _Component);

        function ChipMoveEffect() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = ChipMoveEffect.prototype;

        _proto.start = function start() {};

        _proto.update = function update(deltaTime) {};

        return ChipMoveEffect;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CoverResultController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ObserverManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, Vec3, UITransform, Vec2, Component, ObserverManager, ObserverEvent;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      Vec2 = module.Vec2;
      Component = module.Component;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "42ed00GfDFO/IZ9MsnvunSI", "CoverResultController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var CoverController = exports('CoverController', (_dec = ccclass('CoverController'), _dec2 = property(Node), _dec3 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CoverController, _Component);

        function CoverController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "coverResultNode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timerLabel", _descriptor2, _assertThisInitialized(_this));

          _this._offset = new Vec3();
          _this._localPos = new Vec3();
          _this._originPosition = new Vec3();
          _this._timer = 0;
          _this.TIME_CHECK = 6;
          return _this;
        }

        var _proto = CoverController.prototype;

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          if (!this.coverResultNode) return;
          this._parentUI = this.coverResultNode.parent.getComponent(UITransform);
          this.coverResultNode.on(Node.EventType.TOUCH_START, function (event) {
            var touchPos = event.getLocation();
            _this2._localPos = _this2._parentUI.convertToNodeSpaceAR(new Vec3(touchPos.x, touchPos.y, 0));
            _this2._offset = _this2.coverResultNode.position.clone().subtract(_this2._localPos);
          });
          this.coverResultNode.on(Node.EventType.TOUCH_MOVE, function (event) {
            var touchPos = event.getLocation();
            _this2._localPos = _this2._parentUI.convertToNodeSpaceAR(new Vec3(touchPos.x, touchPos.y, 0));

            _this2.coverResultNode.setPosition(_this2._localPos.add(_this2._offset));
          });
          this.coverResultNode.on(Node.EventType.TOUCH_END, function () {
            return _this2.checkPosition();
          });
          this.coverResultNode.on(Node.EventType.TOUCH_CANCEL, function () {
            return _this2.checkPosition();
          });
        };

        _proto.start = function start() {
          this._originPosition = this.coverResultNode.position.clone();
        };

        _proto.update = function update(deltaTime) {
          if (!this.coverResultNode.active) return;
          this.timerLabel.node.active = true;
          this._timer += deltaTime;

          if (this._timer >= this.TIME_CHECK) {
            this.timerLabel.node.active = false;
            this._timer = 0;
            this.checkPosition(true);
          }

          this.timerLabel.string = Math.floor(this.TIME_CHECK - this._timer).toString();
        };

        _proto.checkPosition = function checkPosition(forceHide) {
          if (forceHide === void 0) {
            forceHide = false;
          }

          if (forceHide || this.checkOutRadius(Vec2.clone(this.coverResultNode.position))) {
            this.coverResultNode.active = false;
            this.timerLabel.node.active = false;
            this._timer = 0;
            ObserverManager.emit(ObserverEvent.CoverResult, false);
            this.coverResultNode.setPosition(this._originPosition);
          }
        };

        _proto.checkOutRadius = function checkOutRadius(touchPos) {
          var uiTransform = this.coverResultNode.getComponent(UITransform);
          var radius = uiTransform.width * .5;
          console.log('radius: ', radius);
          var nodePos = new Vec2(this._originPosition.x, this._originPosition.y);
          console.log('distance: ', Vec2.distance(touchPos, nodePos));
          return Vec2.distance(touchPos, nodePos) > radius;
        };

        return CoverController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "coverResultNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DemoScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NetworkService.ts', './protocol.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Button, Component, NetworkService, MessageTypes;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Component = module.Component;
    }, function (module) {
      NetworkService = module.default;
    }, function (module) {
      MessageTypes = module.MessageTypes;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "07ff0yuJ4RF56pRz9HM1hcR", "DemoScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DemoScene = exports('DemoScene', (_dec = ccclass('DemoScene'), _dec2 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DemoScene, _Component);

        function DemoScene() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "btnBetSmall", _descriptor, _assertThisInitialized(_this));

          _this.userId = '';
          _this.balance = 0;
          _this.currentBet = 10;
          _this.tableId = '';
          _this.roundId = '';
          _this.phase = 'idle';
          _this.timeLeftCounter = 0;
          return _this;
        }

        var _proto = DemoScene.prototype;

        _proto.start = function start() {};

        _proto.onLoad = function onLoad() {
          console.log("onEnable SicboGame...");
          NetworkService.instance.on(MessageTypes.WS_OPEN, this.onWsOpen, this);
          NetworkService.instance.on(MessageTypes.SICBO_BETTING_OPEN, this.onUpdatePhase, this); // Network.instance.on(MessageTypes.SICBO_BET_PHASE, this.onBetPhase, this);
          // Network.instance.on(MessageTypes.SICBO_SHOW_RESULT, this.onShowResult, this);

          NetworkService.instance.on(MessageTypes.PING, this.onPingSent, this);
          NetworkService.instance.on(MessageTypes.PONG, this.onPongReceived, this);
          NetworkService.instance.on('new_round', function (data) {
            console.log("SicboGame:" + data);
          }, this);
          NetworkService.instance.on('bet_accepted', function (data) {
            console.log("SicboGame:" + data);
          }, this);
          NetworkService.instance.on('reveal_result', function (data) {
            console.log("SicboGame:" + data);
          }, this);
          NetworkService.instance.on('payout', function (data) {
            console.log("SicboGame:" + data);
          }, this);
          NetworkService.instance.on('game_over', function (data) {
            console.log("SicboGame:" + data);
          }, this);
        };

        _proto.onDisable = function onDisable() {
          if (NetworkService.instance) {
            NetworkService.instance.off(MessageTypes.WS_OPEN, this.onWsOpen, this);
            NetworkService.instance.off(MessageTypes.SICBO_BETTING_OPEN, this.onUpdatePhase, this); // Network.instance.off(MessageTypes.SICBO_BET_PHASE, this.onBetPhase, this);
            // Network.instance.off(MessageTypes.SICBO_SHOW_RESULT,( this.onShowResult), this);

            NetworkService.instance.off(MessageTypes.PING, this.onPingSent, this);
            NetworkService.instance.off(MessageTypes.PONG, this.onPongReceived, this);
          }
        };

        _proto.onWsOpen = function onWsOpen() {
          console.log("WS SICBO OPEN...");
          this.phase = 'login';
          this.updatePhaseUI('LOGIN...');
          this.login();
        } // Phase 1: LOGIN
        ;

        _proto.login = /*#__PURE__*/function () {
          var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return NetworkService.instance.send("subscribe_rounds");

                  case 3:
                    _context.sent;
                    _context.next = 9;
                    break;

                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](0);
                    console.error('Login request error', _context.t0);

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[0, 6]]);
          }));

          function login() {
            return _login.apply(this, arguments);
          }

          return login;
        }();

        _proto.onUpdatePhase = function onUpdatePhase(data) {
          console.log('onUpdatePhase received', data);
        } // Phase 2: BET TIME (server push)
        ;

        _proto.onBetPhase = function onBetPhase(data) {
          console.log('BET PHASE received', data);
          this.phase = 'betting';
          this.roundId = data.roundId;
          this.updatePhaseUI("BET TIME (" + data.timeLeft + "s)"); // Start countdown

          this.startTimeLeftCounter(data.timeLeft);
        };

        _proto.startTimeLeftCounter = function startTimeLeftCounter(duration) {
          var _this2 = this;

          this.timeLeftCounter = duration;
          this.schedule(function () {
            _this2.timeLeftCounter--;
          }, 1);
        } // Bet buttons
        ;

        _proto.onBetBigClick = function onBetBigClick() {
          console.log('[CLIENT] onBetBigClick');
          this.placeBet('TAI', this.currentBet);
        };

        _proto.onBetSmallClick = function onBetSmallClick() {
          console.log('[CLIENT] onBetSmallClick');
          this.placeBet('XIU', this.currentBet);
        };

        _proto.placeBet = /*#__PURE__*/function () {
          var _placeBet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(area, amount) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(this.balance < amount)) {
                      _context2.next = 3;
                      break;
                    }

                    console.warn('Insufficient balance');
                    return _context2.abrupt("return");

                  case 3:
                    this.balance -= amount; // Send bet to server

                    ({
                      userId: this.userId,
                      roundId: this.roundId,
                      bets: [{
                        area: area,
                        amount: amount
                      }],
                      total: amount
                    });
                    console.log('[CLIENT] sending sicbo:bet', {
                      roundId: this.roundId,
                      area: area,
                      amount: amount
                    });
                    _context2.prev = 6;
                    _context2.next = 9;
                    return NetworkService.instance.send("place_bet", {
                      roundId: "R1",
                      side: area,
                      amount: amount
                    });

                  case 9:
                    _context2.sent;
                    _context2.next = 15;
                    break;

                  case 12:
                    _context2.prev = 12;
                    _context2.t0 = _context2["catch"](6);
                    console.error('Bet error', _context2.t0);

                  case 15:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this, [[6, 12]]);
          }));

          function placeBet(_x, _x2) {
            return _placeBet.apply(this, arguments);
          }

          return placeBet;
        }();

        _proto.onPingSent = function onPingSent(payload) {
          console.log('[CLIENT] ping sent', payload);
        };

        _proto.onPongReceived = function onPongReceived(payload) {
          console.log('[CLIENT] pong received', payload);
        } // Phase 3: SHOW RESULT (server push — dice rolled, showing)
        ;

        _proto.onShowResult = function onShowResult(data) {
          console.log('SHOW RESULT', data);
          this.phase = 'showing';
          this.updatePhaseUI('SHOWING RESULT'); // Display dice
          // if (this.lblDice) {
          //     this.lblDice.string = `Dice: ${data.dice[0]}, ${data.dice[1]}, ${data.dice[2]} (Total: ${data.total})`;
          // }
        } // Phase 4: RESULT TIME (server push — settle, payout)
        ;

        _proto.onResultTime = function onResultTime(data) {
          var _this3 = this;

          console.log('RESULT TIME', data);
          this.phase = 'settling';
          this.updatePhaseUI('SETTLING...'); // Show result

          var resultText = "Dice: " + data.dice[0] + ", " + data.dice[1] + ", " + data.dice[2] + " (Total: " + data.total + ")\n";
          resultText += "Winning Areas: " + data.winningAreas.join(', ') + "\n";
          resultText += "Payouts:\n";

          for (var _iterator = _createForOfIteratorHelperLoose(data.results), _step; !(_step = _iterator()).done;) {
            var r = _step.value;
            resultText += r.area + ": " + (r.outcome === 'win' ? '+' : '-') + r.payout + "\n";
          }

          this.updateUI(); // Wait a moment then go back to betting or idle

          this.schedule(function () {
            _this3.unschedule(_this3.onResultTime);
          }, 3);
        };

        _proto.updatePhaseUI = function updatePhaseUI(phaseText) {//if (this.lblPhase) this.lblPhase.string = phaseText;
        };

        _proto.updateUI = function updateUI() {// if (this.lblBalance) this.lblBalance.string = `Balance: ${this.balance}`;
        };

        _proto.onBetResponse = function onBetResponse(data) {
          console.log('Bet response (push)', data); // Handled by sendRequest Promise in placeBet()
        };

        return DemoScene;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnBetSmall", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DiceRotateEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, sp, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "f849e3xxCdEE4x9oy6yGCjx", "DiceRotateEffect", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DiceRotateEffect = exports('DiceRotateEffect', (_dec = ccclass('DiceRotateEffect'), _dec2 = property(sp.Skeleton), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DiceRotateEffect, _Component);

        function DiceRotateEffect() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "skeleton", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = DiceRotateEffect.prototype;

        _proto.onEnable = function onEnable() {
          var _this2 = this;

          this.skeleton.setAnimation(0, 'Idle', false);
          this.skeleton.setCompleteListener(function () {
            _this2.node.active = false;
          });
        };

        return DiceRotateEffect;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "skeleton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DotResult.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ObserverManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Sprite, SpriteFrame, Component, ObserverManager, ObserverEvent;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "dae91uCHpdMCp21M1+Ey5FN", "DotResult", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DotResult = exports('DotResult', (_dec = ccclass('DotResult'), _dec2 = property([Sprite]), _dec3 = property([SpriteFrame]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DotResult, _Component);

        function DotResult() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "dots", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dotFrames", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = DotResult.prototype;

        _proto.start = function start() {
          ObserverManager.on(ObserverEvent.UpdateDotResult, this.updateDotResult.bind(this)); // this.updateDotResult(GameManager.dotResult);
        };

        _proto.updateDotResult = function updateDotResult(dotResult) {
          for (var i = 0; i < dotResult.length; i++) {
            this.dots[i].spriteFrame = this.dotFrames[dotResult[i] ? 1 : 0];
          }
        };

        return DotResult;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dots", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dotFrames", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseManager.ts', './UIManager.ts', './OverlapLoading.ts', './LiveData.ts', './NetworkService.ts', './protocol.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, BaseManager, UIManager, OverlapLoading, OverlapType, LiveData, NetworkService, MessageTypes;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      BaseManager = module.BaseManager;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      OverlapLoading = module.OverlapLoading;
      OverlapType = module.OverlapType;
    }, function (module) {
      LiveData = module.LiveData;
    }, function (module) {
      NetworkService = module.default;
    }, function (module) {
      MessageTypes = module.MessageTypes;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "d6b74u6GkhKg4RJYWEKGHMj", "GameManager", undefined);

      var ccclass = _decorator.ccclass;
      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(GameManager, _BaseManager);

        function GameManager() {
          return _BaseManager.apply(this, arguments) || this;
        }

        var _proto = GameManager.prototype; //#endregion
        //#endregion
        //#region Methods

        _proto.onLoad = function onLoad() {
          _BaseManager.prototype.onLoad.call(this);

          NetworkService.instance.connect();
          NetworkService.instance.on(MessageTypes.WS_OPEN, this.onWsOpen, this);
        };

        _proto.start = function start() {
          GameManager.isSEOn = GameManager.isSEOnData.get();
          UIManager.showOverlap(OverlapLoading, OverlapType.ShowScreenHome, true);
        };

        _proto.onDestroy = function onDestroy() {
          NetworkService.instance.off(MessageTypes.WS_OPEN, this.onWsOpen, this);
        };

        GameManager.delay = function delay(ms) {
          return new Promise(function (resolve) {
            return setTimeout(resolve, ms);
          });
        };

        GameManager.formatNumber = function formatNumber(value) {
          return value.toLocaleString('de-DE', {
            maximumFractionDigits: 0
          });
        };

        GameManager.convertNumberToString = function convertNumberToString(value) {
          if (value >= 1000000000) {
            return (value / 1000000000).toFixed(value % 1000000000 === 0 ? 0 : 1) + 'B';
          } else if (value >= 1000000) {
            return (value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1) + 'M';
          } else if (value >= 1000) {
            return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + 'K';
          } else return value.toString();
        };

        GameManager.is = function is(value, type) {
          // built-in primitive types
          if (type === "string") return typeof value === "string";
          if (type === "number") return typeof value === "number";
          if (type === "boolean") return typeof value === "boolean";
          if (type === "array") return Array.isArray(value); // class / constructor check

          if (typeof type === "function") {
            return value instanceof type;
          } // enum check (object)


          if (typeof type === "object" && type !== null) {
            var keys = Object.keys(type); // enum thật sẽ có dạng: {0:"A",1:"B",A:0,B:1}

            var hasNumberKeys = keys.some(function (k) {
              return !isNaN(Number(k));
            });
            var hasStringKeys = keys.some(function (k) {
              return isNaN(Number(k));
            }); // enum check (object)

            if (typeof type === "object" && type !== null) {
              var vals = keys.map(function (k) {
                return type[k];
              });
              return vals.indexOf(value) !== -1;
            }
          }

          return false;
        } //#endregion
        //#region LiveData
        ; //#endregion
        //#region WS


        _proto.onWsOpen = function onWsOpen() {
          console.log("on WS Open...");
          this.SubcribeToServer();
        };

        _proto.SubcribeToServer = /*#__PURE__*/function () {
          var _SubcribeToServer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    try {
                      console.log("on subscribe SicboGame...");
                      NetworkService.instance.send(MessageTypes.SICBO_SUBSCRIBE);
                      GameManager.isWsOpen = true;
                    } catch (e) {
                      console.error('Subscribe request error', e);
                    }

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function SubcribeToServer() {
            return _SubcribeToServer.apply(this, arguments);
          }

          return SubcribeToServer;
        }();

        GameManager.GetPayload = function GetPayload(data) {
          if (!data) return undefined;

          if (typeof data === 'string') {
            try {
              var msg = JSON.parse(data);
              return msg.payload;
            } catch (e) {
              console.warn('Invalid JSON:', data, e);
              return undefined;
            }
          }

          if (typeof data === 'object') {
            var _payload;

            return (_payload = data.payload) != null ? _payload : data;
          }

          return undefined;
        } //#endregion
        ;

        _createClass(GameManager, null, [{
          key: "isWsOpen",
          get: //#region Fields
          //#region Properties
          function get() {
            return this._isWsOpen;
          },
          set: function set(value) {
            this._isWsOpen = value;
          }
        }, {
          key: "isSEOn",
          get: function get() {
            return this._isSEOn;
          },
          set: function set(value) {
            this._isSEOn = value;
            this.isSEOnData.set(value);
          }
        }]);

        return GameManager;
      }(BaseManager), _class2._isWsOpen = false, _class2._isSEOn = true, _class2.isSEOnData = LiveData.create('isSEOn', true), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HandButtonController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, SpriteFrame, Sprite, Component, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "9ded5iLhk5Ntr+XEi8fefoS", "HandButtonController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var HandButtonController = exports('HandButtonController', (_dec = ccclass('HandButtonController'), _dec2 = property(Button), _dec3 = property([SpriteFrame]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(HandButtonController, _Component);

        function HandButtonController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "handButton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "handSpriteFrames", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = HandButtonController.prototype;

        _proto.start = function start() {
          this.handButton.node.on(Button.EventType.CLICK, this.onHandButtonClick, this);
        };

        _proto.onHandButtonClick = function onHandButtonClick() {
          if (GameManager.isShowHand) {
            GameManager.isShowHand = false;
            this.handButton.node.getComponent(Sprite).spriteFrame = this.handSpriteFrames[1];
          } else {
            GameManager.isShowHand = true;
            this.handButton.node.getComponent(Sprite).spriteFrame = this.handSpriteFrames[0];
          }
        };

        return HandButtonController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handSpriteFrames", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LightRotateEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Vec3, tween, Tween, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      tween = module.tween;
      Tween = module.Tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "bd30e29MAxDzJPjiNA8c8cv", "LightRotateEffect", undefined);

      var ccclass = _decorator.ccclass;
      var LightRotateEffect = exports('LightRotateEffect', (_dec = ccclass('LightRotateEffect'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LightRotateEffect, _Component);

        function LightRotateEffect() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = LightRotateEffect.prototype;

        _proto.showLight = function showLight(position) {
          if (position === void 0) {
            position = Vec3.ZERO;
          }

          try {
            console.log('showLight', position);
            if (position !== Vec3.ZERO) this.node.setWorldPosition(position);
            this.node.active = true;
            tween(this.node).to(1, {
              scale: new Vec3(3, 3, 3),
              angle: 180
            }).to(1, {
              scale: new Vec3(2, 2, 2),
              angle: 360
            }).union().repeatForever().start();
            console.log('Light tween started OK');
          } catch (e) {
            console.error('showLight error:', e);
          }
        };

        _proto.hideLight = function hideLight() {
          Tween.stopAllByTarget(this.node);
          this.node.active = false;
        };

        return LightRotateEffect;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LiveData.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "572adb2WlxGWabTYx4eG6BO", "LiveData", undefined);

      var LiveData = exports('LiveData', /*#__PURE__*/function () {
        function LiveData(key, setter, getter, defaultValue) {
          this.key = void 0;
          this.setter = void 0;
          this.getter = void 0;
          this.defaultValue = void 0;
          this.bindings = [];
          this.key = key;
          this.setter = setter;
          this.getter = getter;
          this.defaultValue = defaultValue;
        }

        LiveData.create = function create(key, defaultValue) {
          var type = typeof defaultValue; // NUMBER

          if (type === "number") {
            return new LiveData(key, function (k, v) {
              return localStorage.setItem(k, String(v));
            }, function (k) {
              var v = localStorage.getItem(k);
              if (v === null || v === undefined) return defaultValue;
              var num = Number(v);
              return isNaN(num) ? defaultValue : num;
            }, defaultValue);
          } // STRING
          else if (type === "string") {
              return new LiveData(key, function (k, v) {
                return localStorage.setItem(k, v);
              }, function (k) {
                var v = localStorage.getItem(k);
                return v !== null ? v : defaultValue;
              }, defaultValue);
            } // BOOLEAN
            else if (type === "boolean") {
                return new LiveData(key, function (k, v) {
                  return localStorage.setItem(k, v ? "true" : "false");
                }, function (k) {
                  var v = localStorage.getItem(k);

                  if (v === null || v === undefined) {
                    return defaultValue;
                  }

                  return v === "true";
                }, defaultValue);
              }

          console.error("Type " + type + " is not supported by LiveData.");
          return null;
        } // ============================================
        ;

        var _proto = LiveData.prototype;

        _proto.set = function set(value, notify) {
          if (notify === void 0) {
            notify = false;
          }

          this.setter(this.key, value);
          if (notify) this.bindings.forEach(function (cb) {
            return cb(value);
          });
        };

        _proto.get = function get() {
          var v = localStorage.getItem(this.key);

          if (v === null) {
            console.warn("LiveData: " + this.key + " not found, return default: " + this.defaultValue);
            return this.defaultValue; // FIX — đảm bảo đúng hành vi
          }

          return this.getter(this.key);
        };

        _proto.binding = function binding(callback, invokeImmediately) {
          if (invokeImmediately === void 0) {
            invokeImmediately = true;
          } // Use indexOf for compatibility with older JS/TS targets, as includes may not exist


          if (this.bindings.indexOf(callback) === -1) {
            this.bindings.push(callback);
            if (invokeImmediately) callback(this.get());
          }
        };

        _proto.unbinding = function unbinding(callback) {
          var index = this.bindings.indexOf(callback);
          if (index !== -1) this.bindings.splice(index, 1);
        };

        return LiveData;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./BetBase.ts', './BigBet.ts', './SmallBet.ts', './AudioManager.ts', './BaseManager.ts', './GameManager.ts', './ObserverManager.ts', './UIManager.ts', './BaseNotify.ts', './BaseOverlap.ts', './BasePopup.ts', './BaseScreen.ts', './BaseUI.ts', './OverlapLoading.ts', './PopupHelp.ts', './PopupSettings.ts', './ScreenGame.ts', './ScreenHome.ts', './ScreenSmallTable.ts', './BubbleLabel.ts', './ChipMoveEffect.ts', './CoverResultController.ts', './DemoScene.ts', './DiceRotateEffect.ts', './DotResult.ts', './HandButtonController.ts', './LightRotateEffect.ts', './LiveData.ts', './NetworkService.ts', './ToggleEventButton.ts', './WebViewController.ts', './protocol.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/NetworkService.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './protocol.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, EventTarget, Component, MessageTypes;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventTarget = module.EventTarget;
      Component = module.Component;
    }, function (module) {
      MessageTypes = module.MessageTypes;
      exports('MessageTypes', module.MessageTypes);
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _class3;

      cclegacy._RF.push({}, "00fa1JD/yZP0YHrYJuEYMd8", "NetworkService", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
              v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      }

      var NetworkService = exports('default', (_dec = ccclass('NetworkService'), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NetworkService, _Component);

        function NetworkService() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "url", _descriptor, _assertThisInitialized(_this));

          _this.ws = null;
          _this.eventBus = new EventTarget();
          _this.pendingRequests = new Map();
          _this.heartbeatInterval = 15000;
          _this.heartbeatTimer = null;
          _this.missedPongs = 0;
          _this.maxMissedPongs = 3;
          _this.reconnectDelay = 1000;
          _this.maxReconnectDelay = 30000;
          return _this;
        }

        var _proto = NetworkService.prototype;

        _proto.onLoad = function onLoad() {
          NetworkService.instance = this;
        } // --------------------- CONNECT ---------------------
        ;

        _proto.connect = function connect() {
          var _this2 = this;

          if (this.ws) return;
          this.ws = new WebSocket(this.url);
          this.ws.binaryType = 'blob'; // Browser default

          this.ws.onopen = function () {
            console.log('WS Connected');

            _this2.eventBus.emit(MessageTypes.WS_OPEN); // this.startHeartbeat();
            // reset reconnect delay


            _this2.reconnectDelay = 1000;
          };

          this.ws.onmessage = function (ev) {
            if (typeof ev.data !== 'string') return;

            try {
              var msg = JSON.parse(ev.data); // console.log('Received msg:', msg);

              if (msg.action === MessageTypes.PONG) {
                _this2.missedPongs = 0;

                _this2.eventBus.emit(MessageTypes.PONG, msg.payload);

                return;
              }

              if (msg.action) _this2.eventBus.emit(msg.action, msg.payload);
            } catch (e) {
              console.warn('Invalid JSON', ev.data);
            }
          };

          this.ws.onclose = function () {
            console.warn('WS Closed');

            _this2.eventBus.emit(MessageTypes.WS_CLOSE);

            _this2.ws = null;

            _this2.stopHeartbeat(); // try reconnect


            _this2.scheduleReconnect();
          };
        } // --------------------- SEND ---------------------
        ;

        _proto.send = function send(action, payload) {
          if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
          var msg = JSON.stringify({
            action: action,
            payload: payload
          });
          console.log("Sending msg:", msg);
          this.ws.send(msg);
        };

        _proto.sendRequest = function sendRequest(action, payload, timeoutMs) {
          var _this3 = this;

          if (timeoutMs === void 0) {
            timeoutMs = 5000;
          }

          return new Promise(function (resolve, reject) {
            if (!_this3.ws || _this3.ws.readyState !== WebSocket.OPEN) {
              return reject(new Error('WS not open'));
            }

            var requestId = uuidv4();
            var timer = setTimeout(function () {
              _this3.pendingRequests["delete"](requestId);

              reject(new Error('timeout'));
            }, timeoutMs);

            _this3.pendingRequests.set(requestId, {
              resolve: resolve,
              reject: reject,
              timer: timer
            });

            var envelope = {
              action: action,
              payload: payload
            };
            var msg = JSON.stringify(envelope); //console.log("Sending msg:", msg);

            _this3.ws.send(msg);
          });
        } // --------------------- HEARTBEAT ---------------------
        ;

        _proto.startHeartbeat = function startHeartbeat() {
          var _this4 = this;

          this.stopHeartbeat();
          this.heartbeatTimer = setInterval(function () {
            if (!_this4.ws || _this4.ws.readyState !== WebSocket.OPEN) return; // send ping
            // const requestId = { requestId: Date.now() };
            // this.ws.send(JSON.stringify({ action: MessageTypes.PING, payload }));

            var requestId = Date.now();
            var msg = JSON.stringify({
              action: MessageTypes.PING,
              requestId: requestId
            });
            console.log("Sending ping:", msg);

            _this4.ws.send(msg); // emit ping action locally so UI can show heartbeat send


            _this4.eventBus.emit(MessageTypes.PING, requestId);

            _this4.missedPongs++;

            if (_this4.missedPongs > _this4.maxMissedPongs) {
              console.warn('Missed pongs, closing ws');

              try {
                _this4.ws.close();
              } catch (e) {}
            }
          }, this.heartbeatInterval);
        };

        _proto.stopHeartbeat = function stopHeartbeat() {
          if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
          }

          this.missedPongs = 0;
        } // --------------------- RECONNECT ---------------------
        ;

        _proto.scheduleReconnect = function scheduleReconnect() {
          var _this5 = this;

          var delay = Math.min(this.reconnectDelay, this.maxReconnectDelay);
          this.eventBus.emit(MessageTypes.WS_RECONNECTING, {
            delay: delay
          });
          setTimeout(function () {
            console.log('Reconnecting...');

            _this5.connect(); // exponential backoff


            _this5.reconnectDelay = Math.min(_this5.reconnectDelay * 2, _this5.maxReconnectDelay);
          }, delay);
        } // --------------------- LISTEN ---------------------
        ;

        _proto.on = function on(event, handler, target) {
          this.eventBus.on(event, handler, target);
        };

        _proto.off = function off(event, handler, target) {
          this.eventBus.off(event, handler, target);
        };

        _proto.safeParse = function safeParse(data) {
          if (typeof data === "string") {
            return JSON.parse(data);
          }

          if (typeof data === "object") {
            return data; // server đã gửi object
          }

          return null;
        };

        return NetworkService;
      }(Component), _class3.instance = void 0, _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "url", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'ws://localhost:8080';
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ObserverManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseManager.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, BaseManager;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      BaseManager = module.BaseManager;
    }],
    execute: function () {
      exports('ObserverEvent', void 0);

      var _dec, _class, _class2;

      cclegacy._RF.push({}, "ad949BefgJOF6dMkY2fSBfp", "ObserverManager", undefined);

      var ccclass = _decorator.ccclass;
      var ObserverEvent;

      (function (ObserverEvent) {
        ObserverEvent["UpdatePlayerMoneyLabel"] = "updatePlayerMoneyLabel";
        ObserverEvent["RollDice"] = "rollDice";
        ObserverEvent["DiceResult"] = "diceResult";
        ObserverEvent["UpdateTimer"] = "updateTimer";
        ObserverEvent["NumberBet"] = "numberBet";
        ObserverEvent["UpdateTotalBetLabel"] = "updateTotalBetLabel";
        ObserverEvent["UpdateBigBetTotalLabel"] = "updateBigBetTotalLabel";
        ObserverEvent["UpdateSmallBetTotalLabel"] = "updateSmallBetTotalLabel";
        ObserverEvent["UpdateDotResult"] = "updateDotResult";
        ObserverEvent["LockHand"] = "lockHand";
        ObserverEvent["UpdateNumberBigBetOfPlayerLabel"] = "updateNumberBigBetPlayerLabel";
        ObserverEvent["UpdateNumberSmallBetOfPlayerLabel"] = "updateNumberSmallBetPlayerLabel";
        ObserverEvent["CoverResult"] = "coverResult";
        ObserverEvent["UpdateNumberPlayerBigBetLabel"] = "updateNumberPlayerBigBetLabel";
        ObserverEvent["UpdateNumberPlayerSmallBetLabel"] = "updateNumberPlayerSmallBetLabel";
      })(ObserverEvent || (ObserverEvent = exports('ObserverEvent', {})));

      var ObserverManager = exports('ObserverManager', (_dec = ccclass('ObserverManager'), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(ObserverManager, _BaseManager);

        function ObserverManager() {
          return _BaseManager.apply(this, arguments) || this;
        }

        ObserverManager.on = function on(eventName, callback) {
          if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set());
          }

          this._events.get(eventName).add(callback);
        };

        ObserverManager.off = function off(eventName, callback) {
          if (!this._events.has(eventName)) return;

          if (!callback) {
            this._events["delete"](eventName);
          } else {
            this._events.get(eventName)["delete"](callback);
          }
        };

        ObserverManager.emit = function emit(eventName) {
          if (!this._events.has(eventName)) return;

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          for (var _iterator = _createForOfIteratorHelperLoose(this._events.get(eventName)), _step; !(_step = _iterator()).done;) {
            var cb = _step.value;
            cb.apply(void 0, args);
          }
        };

        ObserverManager.clearAll = function clearAll() {
          this._events.clear();
        };

        return ObserverManager;
      }(BaseManager), _class2._events = new Map(), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OverlapLoading.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseOverlap.ts', './GameManager.ts', './UIManager.ts', './ScreenHome.ts', './ScreenSmallTable.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Slider, Label, Sprite, Node, director, BaseOverlap, GameManager, UIManager, ScreenHome, ScreenSmallTable;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Slider = module.Slider;
      Label = module.Label;
      Sprite = module.Sprite;
      Node = module.Node;
      director = module.director;
    }, function (module) {
      BaseOverlap = module.BaseOverlap;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      ScreenHome = module.ScreenHome;
    }, function (module) {
      ScreenSmallTable = module.ScreenSmallTable;
    }],
    execute: function () {
      exports('OverlapType', void 0);

      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "a77fbkGB9ZFj5X8/yfFffjk", "OverlapLoading", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var OverlapType;

      (function (OverlapType) {
        OverlapType[OverlapType["LoadScene"] = 0] = "LoadScene";
        OverlapType[OverlapType["ShowScreenHome"] = 1] = "ShowScreenHome";
        OverlapType[OverlapType["ShowScreenSmallTable"] = 2] = "ShowScreenSmallTable";
        OverlapType[OverlapType["ShowScreenMediumTable"] = 3] = "ShowScreenMediumTable";
        OverlapType[OverlapType["ShowScreenBigTable"] = 4] = "ShowScreenBigTable";
      })(OverlapType || (OverlapType = exports('OverlapType', {})));

      var OverlapLoading = exports('OverlapLoading', (_dec = ccclass('OverlapLoading'), _dec2 = property(Slider), _dec3 = property(Label), _dec4 = property(Sprite), _dec5 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseOverlap) {
        _inheritsLoose(OverlapLoading, _BaseOverlap);

        function OverlapLoading() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseOverlap.call.apply(_BaseOverlap, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "progressSlider", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "percentText", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "loadingBarSprite", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "handleEffectNode", _descriptor4, _assertThisInitialized(_this));

          _this._fakeProgress = 0;
          _this._realPreloadDone = false;
          _this._loadStartTime = 0;
          _this._minLoadTime = 2;
          _this._overlapType = OverlapType.LoadScene;
          return _this;
        }

        var _proto = OverlapLoading.prototype;

        _proto.init = function init() {
          _BaseOverlap.prototype.init.call(this);

          console.log('init overlap loading');
        };

        _proto.show = function show(data) {
          _BaseOverlap.prototype.show.call(this, data);

          console.log('show overlap loading');

          if (data && this.isEnumValue(OverlapType, data)) {
            this._overlapType = data;
          }

          this.progressSlider.progress = 0;
          this.percentText.string = '0%';
          this.startLoading('');
        };

        _proto.hide = function hide() {
          _BaseOverlap.prototype.hide.call(this);

          console.log('hide overlap loading');
          this.loadingBarSprite.fillRange = 0;
          this.progressSlider.progress = 0;
          this.percentText.string = '0%';
          this._overlapType = OverlapType.LoadScene;
        };

        _proto.startLoading = function startLoading(sceneName) {
          var _this2 = this;

          this._fakeProgress = 0;
          this._realPreloadDone = false;
          this._loadStartTime = performance.now() / 1000;

          if (this._overlapType !== OverlapType.LoadScene) {
            this._realPreloadDone = true;
          } else director.preloadScene(sceneName, null, function () {
            return _this2._realPreloadDone = true;
          });

          this.scheduleOnce(function () {
            _this2.updateProgress(sceneName);
          }, 0);
        };

        _proto.updateProgress = function updateProgress(sceneName) {
          var _this3 = this;

          this.schedule(function () {
            _this3.handleEffectNode.active = true;

            var elapsed = performance.now() / 1000 - _this3._loadStartTime;

            _this3._fakeProgress = Math.min(elapsed / _this3._minLoadTime, 0.99);
            _this3.progressSlider.progress = _this3._fakeProgress;
            _this3.loadingBarSprite.fillRange = _this3._fakeProgress;
            _this3.percentText.string = Math.floor(_this3._fakeProgress * 99) + "%";

            if (_this3._fakeProgress >= 0.99 && _this3._realPreloadDone && GameManager.isWsOpen) {
              _this3.progressSlider.progress = 1;
              _this3.loadingBarSprite.fillRange = 1;
              _this3.percentText.string = "100%";
              _this3.handleEffectNode.active = false;

              _this3.unscheduleAllCallbacks();

              _this3.scheduleOnce(function () {
                if (_this3._overlapType === OverlapType.LoadScene) director.loadScene(sceneName);else if (_this3._overlapType === OverlapType.ShowScreenHome) UIManager.showScreen(ScreenHome, null, true);else if (_this3._overlapType === OverlapType.ShowScreenSmallTable) UIManager.showScreen(ScreenSmallTable, null, true);

                _this3.hide();
              }, 0.5);
            }
          }, 0);
        };

        return OverlapLoading;
      }(BaseOverlap), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "progressSlider", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "percentText", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loadingBarSprite", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "handleEffectNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PopupHelp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BasePopup.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, BasePopup;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
    }, function (module) {
      BasePopup = module.BasePopup;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "b9b1eQKr8hE4K5cYoajeORb", "PopupHelp", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PopupHelp = exports('PopupHelp', (_dec = ccclass('PopupHelp'), _dec2 = property({
        type: Button,
        group: 'Node'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_BasePopup) {
        _inheritsLoose(PopupHelp, _BasePopup);

        function PopupHelp() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BasePopup.call.apply(_BasePopup, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "closeButton", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PopupHelp.prototype;

        _proto.init = function init() {
          _BasePopup.prototype.init.call(this);

          console.log('init popup help');
          this.closeButton.node.on(Button.EventType.CLICK, this.hide, this);
        };

        _proto.show = function show(data) {
          _BasePopup.prototype.show.call(this, data);

          console.log('show popup help');
          this.closeButton.interactable = true;
        };

        _proto.hide = function hide() {
          _BasePopup.prototype.hide.call(this);

          console.log('hide popup help');
          this.closeButton.interactable = false;
        };

        return PopupHelp;
      }(BasePopup), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PopupSettings.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BasePopup.ts', './GameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Toggle, BasePopup, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Toggle = module.Toggle;
    }, function (module) {
      BasePopup = module.BasePopup;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "74891cs7ktKO7goa9N+UcQY", "PopupSettings", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PopupSettings = exports('PopupSettings', (_dec = ccclass('PopupSettings'), _dec2 = property({
        type: Button
      }), _dec3 = property({
        type: Toggle
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_BasePopup) {
        _inheritsLoose(PopupSettings, _BasePopup);

        function PopupSettings() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BasePopup.call.apply(_BasePopup, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "closeButton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "soundToggle", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PopupSettings.prototype;

        _proto.init = function init() {
          _BasePopup.prototype.init.call(this);

          console.log('init popup settings');
          this.soundToggle.node.on(Toggle.EventType.TOGGLE, this.onSoundToggle, this);
          this.closeButton.node.on(Button.EventType.CLICK, this.onCloseButtonClick, this);
        };

        _proto.show = function show(data) {
          _BasePopup.prototype.show.call(this, data);

          console.log('show popup settings');
          this.soundToggle.isChecked = GameManager.isSEOn;
          this.closeButton.interactable = true;
        };

        _proto.hide = function hide() {
          _BasePopup.prototype.hide.call(this);

          console.log('hide popup settings');
        };

        _proto.onSoundToggle = function onSoundToggle(event) {
          GameManager.isSEOn = event.target.isChecked;
        };

        _proto.onCloseButtonClick = function onCloseButtonClick() {
          this.hide();
          this.closeButton.interactable = false;
        };

        return PopupSettings;
      }(BasePopup), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "soundToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/protocol.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "09651X9k21FtqEO2ghQs/IQ", "protocol", undefined);

      var MessageTypes = exports('MessageTypes', {
        // lifecycle
        WS_OPEN: 'ws:open',
        WS_CLOSE: 'ws:close',
        WS_RECONNECTING: 'ws:reconnecting',
        // heartbeat
        PING: 'ping',
        PONG: 'pong',
        //#region NoUse
        // auth / account
        AUTH_REQUEST: 'auth:request',
        AUTH_RESPONSE: 'auth:response',
        ACCOUNT_BALANCE_UPDATE: 'account:balance:update',
        // lobby
        LOBBY_LIST_REQUEST: 'lobby:list:request',
        LOBBY_LIST_RESPONSE: 'lobby:list:response',
        // game generic
        GAME_STATE: 'game:state',
        BET_PLACE: 'bet:place',
        BET_RESPONSE: 'bet:response',
        ROUND_START: 'round:start',
        ROUND_END: 'round:end',
        // slot
        SLOT_SPIN_REQUEST: 'slot:spin:request',
        SLOT_SPIN_RESPONSE: 'slot:spin:response',
        SLOT_REEL_STATE: 'slot:reelState',
        // sicbo
        // SICBO_LOGIN: 'sicbo:login',
        // SICBO_LOGIN_RESPONSE: 'sicbo:login:response',
        // SICBO_BET_PHASE: 'sicbo:bet:phase',
        // SICBO_BET: 'sicbo:bet',
        // SICBO_BET_RESPONSE: 'sicbo:bet:response',
        // SICBO_SHOW_RESULT: 'sicbo:show:result',
        // SICBO_RESULT_TIME: 'sicbo:result:time',
        // misc
        CHAT_MESSAGE: 'chat:message',
        BROADCAST_ANNOUNCE: 'broadcast:announcement',
        ERROR: 'error',
        //#endregion
        //#region SICBO Messages
        //============================= SICBO Messages ============================
        SICBO_SUBSCRIBE: 'subscribe_rounds',
        SICBO_BETTING_OPEN: 'round_state',
        SICBO_BET_ACCEPTED_RESPONSE: 'bet_accepted',
        SICBO_BETTING_CLOSE: 'round_state',
        SICBO_DICE_RESULT: 'reveal_result',
        SICBO_PAYOUT: 'payout',
        SICBO_FINISH_ROUND: 'round_state',
        SICBO_PLACE_BET: 'place_bet' //#endregion

      }); //#region NoUse
      // --- Interfaces for common messages ---

      var protocol = exports('default', null);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScreenGame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseScreen.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, BaseScreen;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "d684fbG8ARLZaEvkCsCpxej", "ScreenGame", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ScreenGame = exports('ScreenGame', (_dec = ccclass('ScreenGame'), _dec(_class = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(ScreenGame, _BaseScreen);

        function ScreenGame() {
          return _BaseScreen.apply(this, arguments) || this;
        }

        return ScreenGame;
      }(BaseScreen)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScreenHome.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseScreen.ts', './UIManager.ts', './OverlapLoading.ts', './PopupSettings.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, BaseScreen, UIManager, OverlapLoading, OverlapType, PopupSettings;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      OverlapLoading = module.OverlapLoading;
      OverlapType = module.OverlapType;
    }, function (module) {
      PopupSettings = module.PopupSettings;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "6c17aizMUpDl6i8Eg1QzUZk", "ScreenHome", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ScreenHome = exports('ScreenHome', (_dec = ccclass('ScreenHome'), _dec2 = property({
        type: Button
      }), _dec3 = property({
        type: Button
      }), _dec4 = property({
        type: Button
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(ScreenHome, _BaseScreen);

        function ScreenHome() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "smallButton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "settingsButton", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "clearDataButton", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ScreenHome.prototype;

        _proto.init = function init() {
          _BaseScreen.prototype.init.call(this);

          console.log('init screen home');
          this.smallButton.node.on(Button.EventType.CLICK, this.onPlayButtonClick, this);
          this.settingsButton.node.on(Button.EventType.CLICK, this.onSettingsButtonClick, this);
          this.clearDataButton.node.on(Button.EventType.CLICK, this.onClearDataButtonClick, this);
        };

        _proto.show = function show(data) {
          _BaseScreen.prototype.show.call(this, data);

          console.log('on show screen home');
          this.smallButton.interactable = true;
        };

        _proto.hide = function hide() {
          _BaseScreen.prototype.hide.call(this);

          console.log('on hide screen home');
        };

        _proto.onDestroy = function onDestroy() {
          this.smallButton.node.off(Button.EventType.CLICK, this.onPlayButtonClick, this);
          this.settingsButton.node.off(Button.EventType.CLICK, this.onSettingsButtonClick, this);
          this.clearDataButton.node.off(Button.EventType.CLICK, this.onClearDataButtonClick, this);
        };

        _proto.onPlayButtonClick = function onPlayButtonClick() {
          this.hide();
          this.smallButton.interactable = false;
          UIManager.showOverlap(OverlapLoading, OverlapType.ShowScreenSmallTable, true);
        };

        _proto.onSettingsButtonClick = function onSettingsButtonClick() {
          UIManager.showPopup(PopupSettings, true);
        };

        _proto.onClearDataButtonClick = function onClearDataButtonClick() {
          localStorage.clear();
        };

        return ScreenHome;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "smallButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "settingsButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clearDataButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScreenSmallTable.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseScreen.ts', './LightRotateEffect.ts', './BubbleLabel.ts', './ObserverManager.ts', './UIManager.ts', './GameManager.ts', './PopupHelp.ts', './OverlapLoading.ts', './PopupSettings.ts', './NetworkService.ts', './protocol.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Button, Label, Node, Sprite, Animation, SpriteFrame, Vec3, Color, tween, instantiate, Tween, BaseScreen, LightRotateEffect, BubbleLabel, ObserverManager, ObserverEvent, UIManager, GameManager, PopupHelp, OverlapLoading, OverlapType, PopupSettings, NetworkService, MessageTypes;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Label = module.Label;
      Node = module.Node;
      Sprite = module.Sprite;
      Animation = module.Animation;
      SpriteFrame = module.SpriteFrame;
      Vec3 = module.Vec3;
      Color = module.Color;
      tween = module.tween;
      instantiate = module.instantiate;
      Tween = module.Tween;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      LightRotateEffect = module.LightRotateEffect;
    }, function (module) {
      BubbleLabel = module.BubbleLabel;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      PopupHelp = module.PopupHelp;
    }, function (module) {
      OverlapLoading = module.OverlapLoading;
      OverlapType = module.OverlapType;
    }, function (module) {
      PopupSettings = module.PopupSettings;
    }, function (module) {
      NetworkService = module.default;
    }, function (module) {
      MessageTypes = module.MessageTypes;
    }],
    execute: function () {
      exports({
        BetSide: void 0,
        GamePhase: void 0
      });

      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _descriptor39, _descriptor40, _descriptor41;

      cclegacy._RF.push({}, "31bfby8BC1EC78s2CE+Dc8q", "ScreenSmallTable", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GamePhase;

      (function (GamePhase) {
        GamePhase["Idle"] = "idle";
        GamePhase["Joined"] = "joined";
        GamePhase["BettingOpen"] = "bettingOpen";
        GamePhase["BettingClose"] = "bettingClose";
        GamePhase["DiceResult"] = "diceResult";
        GamePhase["Payout"] = "payout";
      })(GamePhase || (GamePhase = exports('GamePhase', {})));

      var BetSide;

      (function (BetSide) {
        BetSide["TAI"] = "TAI";
        BetSide["XIU"] = "XIU";
      })(BetSide || (BetSide = exports('BetSide', {})));

      var ScreenSmallTable = exports('ScreenSmallTable', (_dec = ccclass('ScreenSmallTable'), _dec2 = property({
        type: Button,
        group: 'Buttons'
      }), _dec3 = property({
        type: Button,
        group: 'Buttons'
      }), _dec4 = property({
        type: Button,
        group: 'Buttons'
      }), _dec5 = property({
        type: Label,
        group: 'Timer'
      }), _dec6 = property({
        type: Node,
        group: 'Timer'
      }), _dec7 = property({
        type: Node,
        group: 'Dice'
      }), _dec8 = property({
        type: Sprite,
        group: 'Dice'
      }), _dec9 = property({
        type: Sprite,
        group: 'Dice'
      }), _dec10 = property({
        type: Sprite,
        group: 'Dice'
      }), _dec11 = property({
        type: Node,
        group: 'Dice'
      }), _dec12 = property({
        type: Animation,
        group: 'Dice'
      }), _dec13 = property({
        type: [SpriteFrame],
        group: 'Dice'
      }), _dec14 = property({
        type: Button,
        group: 'Buttons'
      }), _dec15 = property({
        type: Label,
        group: 'Big'
      }), _dec16 = property({
        type: Label,
        group: 'Big'
      }), _dec17 = property({
        type: Label,
        group: 'Big'
      }), _dec18 = property({
        type: Button,
        group: 'Buttons'
      }), _dec19 = property({
        type: Label,
        group: 'Small'
      }), _dec20 = property({
        type: Label,
        group: 'Small'
      }), _dec21 = property({
        type: Label,
        group: 'Small'
      }), _dec22 = property({
        type: Label,
        group: 'PlayerInfo'
      }), _dec23 = property({
        type: Label,
        group: 'PlayerInfo'
      }), _dec24 = property({
        type: Button,
        group: 'Buttons'
      }), _dec25 = property({
        type: Button,
        group: 'Buttons'
      }), _dec26 = property({
        type: Button,
        group: 'Buttons'
      }), _dec27 = property({
        type: Button,
        group: 'Buttons'
      }), _dec28 = property({
        type: Button,
        group: 'Buttons'
      }), _dec29 = property({
        type: Button,
        group: 'Buttons'
      }), _dec30 = property({
        type: Button,
        group: 'Buttons'
      }), _dec31 = property({
        type: Button,
        group: 'Buttons'
      }), _dec32 = property({
        type: Button,
        group: 'Buttons'
      }), _dec33 = property({
        type: Node,
        group: 'VFX'
      }), _dec34 = property({
        type: Node,
        group: 'VFX'
      }), _dec35 = property({
        type: LightRotateEffect,
        group: 'VFX'
      }), _dec36 = property({
        type: LightRotateEffect,
        group: 'VFX'
      }), _dec37 = property({
        type: BubbleLabel,
        group: 'VFX'
      }), _dec38 = property({
        type: Sprite,
        group: 'VFX'
      }), _dec39 = property({
        type: [SpriteFrame],
        group: 'VFX'
      }), _dec40 = property({
        type: [Node],
        group: 'VFX'
      }), _dec41 = property({
        type: [Node],
        group: 'VFX'
      }), _dec42 = property({
        type: [Node],
        group: 'VFX'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(ScreenSmallTable, _BaseScreen);

        function ScreenSmallTable() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "backButton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "settingsButton", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "helpButton", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timerLabel", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timerFXNode", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceResultNode", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice1Sprite", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice2Sprite", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice3Sprite", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceAnimationNode", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceAnimation", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceSprites", _descriptor12, _assertThisInitialized(_this));

          _this.dice1Number = 0;
          _this.dice2Number = 0;
          _this.dice3Number = 0;
          _this.totalNumber = 0;
          _this._dotResult = [];

          _initializerDefineProperty(_this, "bigBetButton", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberPlayerBigBetLabel", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "totalBigBetLabel", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberBigBetOfPlayerLabel", _descriptor16, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "smallBetButton", _descriptor17, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberPlayerSmallBetLabel", _descriptor18, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "totalSmallBetLabel", _descriptor19, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberSmallBetOfPlayerLabel", _descriptor20, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playerNameLabel", _descriptor21, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playerMoneyLabel", _descriptor22, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chip1kButton", _descriptor23, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chip5kButton", _descriptor24, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chip10kButton", _descriptor25, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chip50kButton", _descriptor26, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chip100kButton", _descriptor27, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chip500kButton", _descriptor28, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "reBetButton", _descriptor29, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "depositButton", _descriptor30, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "withdrawButton", _descriptor31, _assertThisInitialized(_this));

          _this.TWEEN_TEXT_DURATION = 0.25;
          _this.TWEEN_SCALE_FACTOR = 1.25;

          _initializerDefineProperty(_this, "rotateEffectNode", _descriptor32, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipEffectNode", _descriptor33, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lightResultBigEffect", _descriptor34, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lightResultSmallEffect", _descriptor35, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bubbleLabel", _descriptor36, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipSprite", _descriptor37, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipSprites", _descriptor38, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startChipPositions", _descriptor39, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "targetBigChipPositions", _descriptor40, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "targetSmallChipPositions", _descriptor41, _assertThisInitialized(_this));

          _this._numberChipToBet = 0;
          _this._chipSpriteIndex = 0;
          _this._chipNodes = [];
          _this._chipPrices = ['1K', '5K', '10K', '50K', '100K', '500K'];
          _this._chipValues = [1000, 5000, 10000, 50000, 100000, 500000];
          _this._lastBets = {};
          _this._playerBalance = 0;
          _this._numberPlayerBigBet = 0;
          _this._bigBetTotal = 0;
          _this._numberBigBetOfPlayer = 0;
          _this._numberPlayerSmallBet = 0;
          _this._smallBetTotal = 0;
          _this._numberSmallBetOfPlayer = 0;
          _this.PHASE = GamePhase.Idle;
          _this._playerId = '';
          _this._tableId = '';
          _this._roundId = '';
          _this._currentWinSide = BetSide.TAI;
          _this._timeLeftCounter = void 0;
          _this._timerHandler = null;
          _this._betSide = BetSide.TAI;
          _this._isNewRound = true;
          _this._audioClips = ['Coin1', 'Coin2', 'Coin3'];
          return _this;
        }

        var _proto = ScreenSmallTable.prototype; //#endregion
        //#region Lifecycle

        _proto.init = function init() {
          _BaseScreen.prototype.init.call(this);

          this._dotResult = Array.from({
            length: 10
          }, function () {
            return Math.random() < 0.5;
          });
        };

        _proto.show = function show(data) {
          console.log('show ScreenSmallTable');

          _BaseScreen.prototype.show.call(this, data);

          this.bindingEvents();
          this.reBetButton.interactable = false;
          this.backButton.interactable = true; //TODO: Get player balance from server
          //TODO: Move Phase to GameManager
          //TODO: Check phase, if phase open, close,...

          this.playerBalance += 50000;
          this._timeLeftCounter = 0;
        };

        _proto.hide = function hide() {
          _BaseScreen.prototype.hide.call(this);

          this.unbindingEvents();
        };

        _proto.onDestroy = function onDestroy() {
          this.unbindingEvents();
        };

        _proto.bindingEvents = function bindingEvents() {
          NetworkService.instance.on(MessageTypes.SICBO_BETTING_OPEN, this.onBettingOpen, this);
          NetworkService.instance.on(MessageTypes.SICBO_BETTING_CLOSE, this.onBettingClose, this);
          NetworkService.instance.on(MessageTypes.SICBO_DICE_RESULT, this.onDiceResult, this);
          NetworkService.instance.on(MessageTypes.SICBO_PAYOUT, this.onPayout, this);
          NetworkService.instance.on(MessageTypes.SICBO_BET_ACCEPTED_RESPONSE, this.onBetAcceptedResponse, this);
          this.chip1kButton.node.on(Button.EventType.CLICK, this._1kChip, this);
          this.chip5kButton.node.on(Button.EventType.CLICK, this._5kChip, this);
          this.chip10kButton.node.on(Button.EventType.CLICK, this._10kChip, this);
          this.chip50kButton.node.on(Button.EventType.CLICK, this._50kChip, this);
          this.chip100kButton.node.on(Button.EventType.CLICK, this._100kChip, this);
          this.chip500kButton.node.on(Button.EventType.CLICK, this._500kChip, this);
          this.backButton.node.on(Button.EventType.CLICK, this.onBack, this);
          this.settingsButton.node.on(Button.EventType.CLICK, this.showSettings, this);
          this.helpButton.node.on(Button.EventType.CLICK, this.showHelp, this);
          this.reBetButton.node.on(Button.EventType.CLICK, this.reBetChip, this);
          this.depositButton.node.on(Button.EventType.CLICK, this.deposit, this);
          this.withdrawButton.node.on(Button.EventType.CLICK, this.withdraw, this);
          this.bigBetButton.node.on(Button.EventType.CLICK, this.bigBet, this);
          this.smallBetButton.node.on(Button.EventType.CLICK, this.smallBet, this);
        };

        _proto.unbindingEvents = function unbindingEvents() {
          NetworkService.instance.off(MessageTypes.SICBO_BETTING_OPEN, this.onBettingOpen, this);
          NetworkService.instance.off(MessageTypes.SICBO_BETTING_CLOSE, this.onBettingClose, this);
          NetworkService.instance.off(MessageTypes.SICBO_DICE_RESULT, this.onDiceResult, this);
          NetworkService.instance.off(MessageTypes.SICBO_PAYOUT, this.onPayout, this);
          NetworkService.instance.off(MessageTypes.SICBO_BET_ACCEPTED_RESPONSE, this.onBetAcceptedResponse, this);
          this.chip1kButton.node.off(Button.EventType.CLICK, this._1kChip, this);
          this.chip5kButton.node.off(Button.EventType.CLICK, this._5kChip, this);
          this.chip50kButton.node.off(Button.EventType.CLICK, this._50kChip, this);
          this.chip100kButton.node.off(Button.EventType.CLICK, this._100kChip, this);
          this.chip500kButton.node.off(Button.EventType.CLICK, this._500kChip, this);
          this.backButton.node.off(Button.EventType.CLICK, this.onBack, this);
          this.settingsButton.node.off(Button.EventType.CLICK, this.showSettings, this);
          this.helpButton.node.off(Button.EventType.CLICK, this.showHelp, this);
          this.reBetButton.node.off(Button.EventType.CLICK, this.reBetChip, this);
          this.depositButton.node.off(Button.EventType.CLICK, this.deposit, this);
          this.withdrawButton.node.off(Button.EventType.CLICK, this.withdraw, this);
          this.bigBetButton.node.off(Button.EventType.CLICK, this.bigBet, this);
          this.smallBetButton.node.off(Button.EventType.CLICK, this.smallBet, this);
        } //#endregion
        //#region Gameplay
        ;

        _proto.animationRollDice = /*#__PURE__*/function () {
          var _animationRollDice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(callback) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log('animationRollDice');
                    this.timerLabel.node.active = false;
                    this.diceAnimationNode.active = true;
                    this.rotateEffectNode.active = true;
                    this.diceAnimation.play();
                    _context.next = 7;
                    return GameManager.delay(1250);

                  case 7:
                    callback();

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function animationRollDice(_x) {
            return _animationRollDice.apply(this, arguments);
          }

          return animationRollDice;
        }();

        _proto.showResultDiceSprites = function showResultDiceSprites() {
          console.log('show Result Dice Sprites');
          this.timerLabel.node.active = false;
          this.diceAnimationNode.active = false;
          this.rotateEffectNode.active = false;
          this.diceResultNode.active = true;
        };

        _proto.showResultEffect = function showResultEffect(forceShow) {
          if (forceShow) {
            this.timerFXNode.active = false;

            try {
              if (this.totalNumber < 11) {
                this._currentWinSide = BetSide.XIU;
                this.playerBalance += this._numberSmallBetOfPlayer * 2;

                this._dotResult.push(true);

                this.lightResultSmallEffect.showLight();
              } else {
                this._currentWinSide = BetSide.TAI;
                this.playerBalance += this._numberBigBetOfPlayer * 2;

                this._dotResult.push(false);

                this.lightResultBigEffect.showLight();
              }
            } catch (e) {
              console.error('showResultEffect error:', e);
            }

            this.clearChipNode(this._currentWinSide == BetSide.TAI ? this._numberBigBetOfPlayer * 2 : this._numberSmallBetOfPlayer * 2);

            this._dotResult.shift();

            this.bigBetTotal = 0;
            this.numberPlayerBigBet = 0;
            this.numberBigBetOfPlayer = 0;
            this.smallBetTotal = 0;
            this.numberPlayerSmallBet = 0;
            this.numberSmallBetOfPlayer = 0;
            ObserverManager.emit(ObserverEvent.UpdateDotResult, this._dotResult);
            ObserverManager.emit(ObserverEvent.LockHand, false);
            this._isNewRound = true;
            this.reBetButton.interactable = true;
            this.ShowChipButtonEffect(false);
          }

          this.showResultDiceSprites();
        } //#endregion
        //#region Listeners
        ;

        _proto.onBettingOpen = function onBettingOpen(data) {
          console.log("on Betting Open:" + data + "time now: " + Math.floor(Date.now() / 1000));
          this.PHASE = GamePhase.BettingOpen;
          var payload = GameManager.GetPayload(data);
          this._roundId = payload.roundId;
          this._timeLeftCounter = Math.floor(payload.closeAt / 1000) - Math.floor(payload.openAt / 1000);
          this.startTimeLeftCounter();
        };

        _proto.onBettingClose = function onBettingClose(data) {
          var _this2 = this;

          console.log("on Betting Close:" + data + "time now: " + Math.floor(Date.now() / 1000));
          this.PHASE = GamePhase.BettingClose;
          var payload = GameManager.GetPayload(data);
          console.log("payload:", payload);
          this.animationRollDice(function () {
            return _this2.showResultEffect(true);
          });
        };

        _proto.onDiceResult = function onDiceResult(data) {
          console.log("on Get Dice Result:" + data + "time now: " + Math.floor(Date.now() / 1000));
          this.PHASE = GamePhase.DiceResult;
          var payload = GameManager.GetPayload(data);
          console.log('payload:', payload);
          this.dice1Number = payload.dice[0];
          this.dice2Number = payload.dice[1];
          this.dice3Number = payload.dice[2];
          this.totalNumber = payload.sum;
          this.dice1Sprite.spriteFrame = this.diceSprites[this.dice1Number - 1];
          this.dice2Sprite.spriteFrame = this.diceSprites[this.dice2Number - 1];
          this.dice3Sprite.spriteFrame = this.diceSprites[this.dice3Number - 1];
        };

        _proto.onPayout = function onPayout(data) {
          console.log("on Payout:" + data + "time now: " + Math.floor(Date.now() / 1000));
          this.PHASE = GamePhase.Payout;
          var payload = GameManager.GetPayload(data);
          if (payload.payout > 0) this.playerBalance += payload.payout;
        };

        _proto.onBetAcceptedResponse = function onBetAcceptedResponse(data) {
          console.log("on Bet accepted response:" + data);
          var payload = GameManager.GetPayload(data);
          var side = payload.side;
          if (side === BetSide.TAI) this.numberBigBetOfPlayer += payload.amount;else this.numberSmallBetOfPlayer += payload.amount;
        } //#endregion
        //#region Buttons
        ;

        _proto.onBack = function onBack() {
          this.hide();
          UIManager.showOverlap(OverlapLoading, OverlapType.ShowScreenHome, true);
        };

        _proto.showSettings = function showSettings() {
          UIManager.showPopup(PopupSettings, null, true);
        };

        _proto.showHelp = function showHelp() {
          UIManager.showPopup(PopupHelp, null, true);
        };

        _proto._1kChip = function _1kChip() {
          var _this3 = this;

          this.ShowChipButtonEffect(0, this.chip1kButton.node, function (isShow) {
            if (isShow) {
              _this3._numberChipToBet = 1000;
              _this3._chipSpriteIndex = 0;
            } else _this3._numberChipToBet = 0;
          });
        };

        _proto._5kChip = function _5kChip() {
          var _this4 = this;

          this.ShowChipButtonEffect(1, this.chip5kButton.node, function (isShow) {
            if (isShow) {
              _this4._numberChipToBet = 5000;
              _this4._chipSpriteIndex = 1;
            } else _this4._numberChipToBet = 0;
          });
        };

        _proto._10kChip = function _10kChip() {
          var _this5 = this;

          this.ShowChipButtonEffect(2, this.chip10kButton.node, function (isShow) {
            if (isShow) {
              _this5._numberChipToBet = 10000;
              _this5._chipSpriteIndex = 2;
            } else _this5._numberChipToBet = 0;
          });
        };

        _proto._50kChip = function _50kChip() {
          var _this6 = this;

          this.ShowChipButtonEffect(3, this.chip50kButton.node, function (isShow) {
            if (isShow) {
              _this6._numberChipToBet = 50000;
              _this6._chipSpriteIndex = 3;
            } else _this6._numberChipToBet = 0;
          });
        };

        _proto._100kChip = function _100kChip() {
          var _this7 = this;

          this.ShowChipButtonEffect(4, this.chip100kButton.node, function (isShow) {
            if (isShow) {
              _this7._numberChipToBet = 100000;
              _this7._chipSpriteIndex = 4;
            } else _this7._numberChipToBet = 0;
          });
        };

        _proto._500kChip = function _500kChip() {
          var _this8 = this;

          this.ShowChipButtonEffect(5, this.chip500kButton.node, function (isShow) {
            if (isShow) {
              _this8._numberChipToBet = 500000;
              _this8._chipSpriteIndex = 5;
            } else _this8._numberChipToBet = 0;
          });
        };

        _proto.bigBet = function bigBet() {
          if (!this.chipEffectNode.activeInHierarchy) return;

          if (this._playerBalance < this._numberChipToBet) {
            this.ShowChipButtonEffect(false);
            this.bubbleLabel.show('Not enough money', this.playerMoneyLabel.node.worldPosition, Vec3.UP, Color.RED, .75);
          } else {
            this._betSide = BetSide.TAI;
            this.SendBetInfoToServer(this._numberChipToBet);
            this.SetLastBet(BetSide.TAI, this._numberChipToBet);
            this.numberBigBetOfPlayer += this._numberChipToBet;
            this.bigBetTotal += this._numberChipToBet;
            this.numberPlayerBigBet++;
            this.moveChipEffect(true);
          }
        };

        _proto.smallBet = function smallBet() {
          if (!this.chipEffectNode.activeInHierarchy) return;

          if (this._playerBalance < this._numberChipToBet) {
            this.ShowChipButtonEffect(false);
            this.bubbleLabel.show('Not enough money', this.playerMoneyLabel.node.worldPosition, Vec3.UP, Color.RED, .75);
          } else {
            this._betSide = BetSide.XIU;
            this.SendBetInfoToServer(this._numberChipToBet);
            this.SetLastBet(BetSide.XIU, this._numberChipToBet);
            this.numberSmallBetOfPlayer += this._numberChipToBet;
            this.smallBetTotal += this._numberChipToBet;
            this.numberPlayerSmallBet++;
            this.moveChipEffect(false);
          }
        };

        _proto.reBetChip = function reBetChip() {
          var _this9 = this;

          if (Object.keys(this._lastBets).length === 0) return;
          Object.keys(this._lastBets).forEach(function (key) {
            var betSide = key;
            var betList = _this9._lastBets[betSide];
            if (!betList) return;
            betList.forEach(function (betAmount) {
              _this9.SendBetInfoToServer(betAmount);

              _this9.moveChipEffect(betSide, betAmount);
            });
          });
        };

        _proto.SetLastBet = function SetLastBet(betSide, betAmount) {
          if (this._isNewRound) {
            this._isNewRound = false;
            this._lastBets = {};
          }

          if (!this._lastBets[betSide]) this._lastBets[betSide] = [];

          this._lastBets[betSide].push(betAmount);
        };

        _proto.SendBetInfoToServer = function SendBetInfoToServer(betNumber) {
          if (this._playerBalance >= betNumber) {
            this.playerBalance -= betNumber;
            var req = {
              playerId: this._playerId,
              roundId: this._roundId,
              side: this._betSide,
              amount: betNumber
            };
            console.log('[CLIENT] SICBO_PLACE_BET: ', req);

            try {
              NetworkService.instance.send(MessageTypes.SICBO_PLACE_BET, req);
            } catch (e) {
              console.error('Bet error', e);
            }
          } else this.bubbleLabel.show('Not enough money', this.playerMoneyLabel.node.worldPosition, Vec3.UP, Color.RED, .75);
        };

        _proto.deposit = function deposit() {
          //TODO: show popup deposit
          this.playerBalance += 100000;
        };

        _proto.withdraw = function withdraw() {
          //TODO: show popup withdraw
          this.playerBalance -= 100000;
        } //#endregion
        //#region VFX
        ;

        _proto.ShowChipButtonEffect = function ShowChipButtonEffect(arg1, arg2, arg3) {
          var _this10 = this;

          if (typeof arg1 === 'boolean' && typeof arg2 === 'undefined' && typeof arg3 === 'undefined') {
            this.chipEffectNode.active = arg1;
            this._numberChipToBet = 0;
            this._chipSpriteIndex = 0;
            return;
          } else if (typeof arg1 === 'number' && arg2 instanceof Node && typeof arg3 === 'function') {
            if (this.chipEffectNode.activeInHierarchy && arg1 === this._chipSpriteIndex) {
              this.chipEffectNode.active = false;
              arg3(false);
              return;
            }

            this.chipEffectNode.active = false;
            tween(this.chipEffectNode).to(0.01, {
              worldPosition: arg2.worldPosition
            }).call(function () {
              _this10.chipEffectNode.active = true;
              arg3(true);
            }).start();
          }
        };

        _proto.moveChipEffect = function moveChipEffect(arg1, arg2) {
          var _this11 = this;

          if (typeof arg1 === 'boolean') {
            var chipNode = instantiate(this.chipSprite.node);

            this._chipNodes.push(chipNode);

            this.node.addChild(chipNode);
            chipNode.getComponent(Sprite).spriteFrame = this.chipSprites[this._chipSpriteIndex];
            chipNode.getComponentInChildren(Label).string = this._chipPrices[this._chipSpriteIndex];
            chipNode.setWorldPosition(this.startChipPositions[this._chipSpriteIndex].worldPosition);
            chipNode.active = true;
            var targetPos = arg1 ? this.targetBigChipPositions[Math.floor(Math.random() * this.targetBigChipPositions.length)].worldPosition : this.targetSmallChipPositions[Math.floor(Math.random() * this.targetSmallChipPositions.length)].worldPosition;
            var paddingPos = this.paddingPlacedChipPositions();
            tween(chipNode).to(0.25, {
              worldPosition: Vec3.add(new Vec3(), targetPos, paddingPos)
            }).to(0.1, {
              scale: Vec3.ONE.clone().multiplyScalar(this.TWEEN_SCALE_FACTOR)
            }, {
              easing: 'quadOut'
            }).to(0.1, {
              scale: Vec3.ONE
            }, {
              easing: 'quadOut'
            }).start();
          } else if (typeof arg1 === "object" && arg1 !== null && typeof arg2 === "number") {
            Object.keys(arg1).forEach(function (chip, i) {
              var delay = i * .1;
              var chipNode = instantiate(_this11.chipSprite.node);

              _this11._chipNodes.push(chipNode);

              _this11.node.addChild(chipNode);

              var index = _this11._chipValues.indexOf(Number(chip));

              chipNode.getComponent(Sprite).spriteFrame = _this11.chipSprites[index];
              chipNode.getComponentInChildren(Label).string = _this11._chipPrices[index];
              chipNode.setWorldPosition(_this11._currentWinSide == BetSide.TAI ? _this11.targetBigChipPositions[index].worldPosition : _this11.targetSmallChipPositions[index].worldPosition);
              chipNode.active = true;
              tween(chipNode).delay(delay).to(0.5, {
                worldPosition: _this11.playerMoneyLabel.node.worldPosition
              }).call(function () {
                chipNode.destroy();
                if (i === 0) _this11.bubbleLabel.show('+' + arg2, _this11.playerMoneyLabel.node.worldPosition, Vec3.UP, _this11._currentWinSide == BetSide.TAI ? Color.CYAN : Color.YELLOW);
              }).start();
            });
          } else if (GameManager.is(arg1, BetSide) && typeof arg2 === "number") {
            var chipNode = instantiate(this.chipSprite.node);

            this._chipNodes.push(chipNode);

            this.node.addChild(chipNode);
            chipNode.getComponent(Sprite).spriteFrame = this.chipSprites[this._chipValues.indexOf(arg2)];
            chipNode.getComponentInChildren(Label).string = this._chipPrices[this._chipValues.indexOf(arg2)];
            chipNode.setWorldPosition(this.startChipPositions[this._chipValues.indexOf(arg2)].worldPosition);
            chipNode.active = true;

            if (arg1 === BetSide.TAI) {
              this.numberBigBetOfPlayer += arg2;
              this.bigBetTotal += arg2;
              this.numberPlayerBigBet++;
            } else {
              this.numberSmallBetOfPlayer += arg2;
              this.smallBetTotal += arg2;
              this.numberPlayerSmallBet++;
            }

            var _targetPos = arg1 === BetSide.TAI ? this.targetBigChipPositions[Math.floor(Math.random() * this.targetBigChipPositions.length)].worldPosition : this.targetSmallChipPositions[Math.floor(Math.random() * this.targetSmallChipPositions.length)].worldPosition;

            var _paddingPos = this.paddingPlacedChipPositions();

            tween(chipNode).to(0.25, {
              worldPosition: Vec3.add(new Vec3(), _targetPos, _paddingPos)
            }).to(0.1, {
              scale: Vec3.ONE.clone().multiplyScalar(this.TWEEN_SCALE_FACTOR)
            }, {
              easing: 'quadOut'
            }).to(0.1, {
              scale: Vec3.ONE
            }, {
              easing: 'quadOut'
            }).start();
          }
        };

        _proto.paddingPlacedChipPositions = function paddingPlacedChipPositions() {
          var range = 10; // khoảng ±10 units

          return new Vec3((Math.random() - 0.5) * 2 * range, // -10 → +10
          (Math.random() - 0.5) * 2 * range, 0);
        };

        _proto.clearChipNode = function clearChipNode(money) {
          for (var i = 0; i < this._chipNodes.length; i++) {
            this._chipNodes[i].destroy();
          }

          this._chipNodes.length = 0;
          this.moveChipEffect(this.splitChips(money).chipRecords, this.splitChips(money).winMoney);
        };

        _proto.splitChips = function splitChips(money) {
          var winMoney = money;
          var chipRecords = {};

          for (var i = this._chipValues.length - 1; i >= 0; i--) {
            var chip = this._chipValues[i];
            var count = Math.floor(money / chip);

            if (count > 0) {
              chipRecords[chip] = count;
              money -= count * chip;
            }
          }

          return {
            chipRecords: chipRecords,
            winMoney: winMoney
          };
        } //#endregion
        //#region Update UI
        ;

        _proto.updateTimer = function updateTimer(timer) {
          this.diceResultNode.active = false;
          this.diceAnimationNode.active = false;
          this.rotateEffectNode.active = false;
          this.lightResultBigEffect.hideLight();
          this.lightResultSmallEffect.hideLight();
          this.timerFXNode.active = true;
          this.timerLabel.string = Math.max(timer, 0).toString();
          this.timerLabel.node.active = true;
        };

        _proto.startTimeLeftCounter = function startTimeLeftCounter() {
          var _this12 = this;

          if (this._timerHandler) {
            this.unschedule(this._timerHandler);
            this._timerHandler = null;
          }

          this._timerHandler = function () {
            _this12._timeLeftCounter--;

            _this12.updateTimer(_this12._timeLeftCounter);

            if (_this12._timeLeftCounter <= 0) {
              _this12.unschedule(_this12._timerHandler);

              _this12._timerHandler = null;
            }
          };

          this.schedule(this._timerHandler, 1);
        };

        _proto.updatePlayerMoneyLabel = function updatePlayerMoneyLabel(value) {
          this.playerMoneyLabel.string = GameManager.convertNumberToString(value);
        } //Big
        ;

        _proto.updateBigBetTotalLabel = function updateBigBetTotalLabel(value) {
          Tween.stopAllByTarget(this.totalBigBetLabel.node);
          tween(this.totalBigBetLabel.node).to(this.TWEEN_TEXT_DURATION, {
            scale: new Vec3(1, 1, 1).multiplyScalar(this.TWEEN_SCALE_FACTOR)
          }, {
            easing: 'quadOut'
          }).to(this.TWEEN_TEXT_DURATION, {
            scale: Vec3.ONE
          }, {
            easing: 'quadOut'
          }).start();
          this.totalBigBetLabel.string = GameManager.formatNumber(value);
        };

        _proto.updateNumberPlayerBigBetLabel = function updateNumberPlayerBigBetLabel(value) {
          this.numberPlayerBigBetLabel.string = GameManager.formatNumber(value);
        };

        _proto.updateNumberBigBetOfPlayerLabel = function updateNumberBigBetOfPlayerLabel(value) {
          Tween.stopAllByTarget(this.numberBigBetOfPlayerLabel.node);
          tween(this.numberBigBetOfPlayerLabel.node).to(this.TWEEN_TEXT_DURATION, {
            scale: new Vec3(1, 1, 1).multiplyScalar(this.TWEEN_SCALE_FACTOR)
          }, {
            easing: 'quadOut'
          }).to(this.TWEEN_TEXT_DURATION, {
            scale: Vec3.ONE
          }, {
            easing: 'quadOut'
          }).start();
          this.numberBigBetOfPlayerLabel.string = GameManager.formatNumber(value);
        } //Small
        ;

        _proto.updateSmallBetTotalLabel = function updateSmallBetTotalLabel(value) {
          Tween.stopAllByTarget(this.totalSmallBetLabel.node);
          tween(this.totalSmallBetLabel.node).to(this.TWEEN_TEXT_DURATION, {
            scale: new Vec3(1, 1, 1).multiplyScalar(this.TWEEN_SCALE_FACTOR)
          }, {
            easing: 'quadOut'
          }).to(this.TWEEN_TEXT_DURATION, {
            scale: Vec3.ONE
          }, {
            easing: 'quadOut'
          }).start();
          this.totalSmallBetLabel.string = GameManager.formatNumber(value);
        };

        _proto.updateNumberPlayerSmallBetLabel = function updateNumberPlayerSmallBetLabel(value) {
          this.numberPlayerSmallBetLabel.string = GameManager.formatNumber(value);
        };

        _proto.updateNumberSmallBetOfPlayerLabel = function updateNumberSmallBetOfPlayerLabel(value) {
          Tween.stopAllByTarget(this.numberSmallBetOfPlayerLabel.node);
          tween(this.numberSmallBetOfPlayerLabel.node).to(this.TWEEN_TEXT_DURATION, {
            scale: new Vec3(1, 1, 1).multiplyScalar(this.TWEEN_SCALE_FACTOR)
          }, {
            easing: 'quadOut'
          }).to(this.TWEEN_TEXT_DURATION, {
            scale: Vec3.ONE
          }, {
            easing: 'quadOut'
          }).start();
          this.numberSmallBetOfPlayerLabel.string = GameManager.formatNumber(value);
        } //#endregion
        ;

        _createClass(ScreenSmallTable, [{
          key: "playerBalance",
          get: function get() {
            return this._playerBalance;
          },
          set: function set(value) {
            console.log('set playerBalance:', value);
            this._playerBalance = value;
            this.updatePlayerMoneyLabel(value);
          }
        }, {
          key: "numberPlayerBigBet",
          get: function get() {
            return this._numberPlayerBigBet;
          },
          set: function set(value) {
            this._numberPlayerBigBet = value;
            this.updateNumberPlayerBigBetLabel(value);
          }
        }, {
          key: "bigBetTotal",
          get: function get() {
            return this._bigBetTotal;
          },
          set: function set(value) {
            this._bigBetTotal = value;
            this.updateBigBetTotalLabel(value);
          }
        }, {
          key: "numberBigBetOfPlayer",
          get: function get() {
            return this._numberBigBetOfPlayer;
          },
          set: function set(value) {
            this._numberBigBetOfPlayer = value;
            this.updateNumberBigBetOfPlayerLabel(value);
          }
        }, {
          key: "numberPlayerSmallBet",
          get: function get() {
            return this._numberPlayerSmallBet;
          },
          set: function set(value) {
            this._numberPlayerSmallBet = value;
            this.updateNumberPlayerSmallBetLabel(value);
          }
        }, {
          key: "smallBetTotal",
          get: function get() {
            return this._smallBetTotal;
          },
          set: function set(value) {
            this._smallBetTotal = value;
            this.updateSmallBetTotalLabel(value);
          }
        }, {
          key: "numberSmallBetOfPlayer",
          get: function get() {
            return this._numberSmallBetOfPlayer;
          },
          set: function set(value) {
            this._numberSmallBetOfPlayer = value;
            this.updateNumberSmallBetOfPlayerLabel(value);
          } //#endregion
          //#region WS

        }]);

        return ScreenSmallTable;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "settingsButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "helpButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "timerFXNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "diceResultNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "dice1Sprite", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "dice2Sprite", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "dice3Sprite", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "diceAnimationNode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "diceAnimation", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "diceSprites", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "bigBetButton", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "numberPlayerBigBetLabel", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "totalBigBetLabel", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "numberBigBetOfPlayerLabel", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "smallBetButton", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "numberPlayerSmallBetLabel", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "totalSmallBetLabel", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "numberSmallBetOfPlayerLabel", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "playerNameLabel", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "playerMoneyLabel", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "chip1kButton", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "chip5kButton", [_dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "chip10kButton", [_dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "chip50kButton", [_dec27], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "chip100kButton", [_dec28], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "chip500kButton", [_dec29], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "reBetButton", [_dec30], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "depositButton", [_dec31], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "withdrawButton", [_dec32], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "rotateEffectNode", [_dec33], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "chipEffectNode", [_dec34], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "lightResultBigEffect", [_dec35], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "lightResultSmallEffect", [_dec36], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, "bubbleLabel", [_dec37], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor37 = _applyDecoratedDescriptor(_class2.prototype, "chipSprite", [_dec38], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor38 = _applyDecoratedDescriptor(_class2.prototype, "chipSprites", [_dec39], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor39 = _applyDecoratedDescriptor(_class2.prototype, "startChipPositions", [_dec40], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor40 = _applyDecoratedDescriptor(_class2.prototype, "targetBigChipPositions", [_dec41], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor41 = _applyDecoratedDescriptor(_class2.prototype, "targetSmallChipPositions", [_dec42], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SmallBet.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BetBase.ts', './GameManager.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, BetType, BetBase, GameManager;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      BetType = module.BetType;
      BetBase = module.BetBase;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "c25d6l9EddLFqCb6P0/KmMl", "SmallBet", undefined);

      var ccclass = _decorator.ccclass;
      var SmallBet = exports('SmallBet', (_dec = ccclass('SmallBet'), _dec(_class = /*#__PURE__*/function (_BetBase) {
        _inheritsLoose(SmallBet, _BetBase);

        function SmallBet() {
          return _BetBase.apply(this, arguments) || this;
        }

        var _proto = SmallBet.prototype;

        _proto.start = function start() {
          this.betType = BetType.Small;
        };

        _proto.onBetNumber = function onBetNumber(number) {
          if (this.betType !== GameManager.betType) return;
          GameManager.numberPlayerSmallBet++;
          GameManager.smallBetTotal += number;
          GameManager.numberSmallBetOfPlayer += number;
        };

        return SmallBet;
      }(BetBase)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ToggleEventButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "d43dblBoUdGw5Rj7U4Lwo+1", "ToggleEventButton", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ToggleEventButton = exports('ToggleEventButton', (_dec = ccclass('ToggleEventButton'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ToggleEventButton, _Component);

        function ToggleEventButton() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "targetNode", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ToggleEventButton.prototype;

        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_START, this.onPress, this);
          this.node.on(Node.EventType.TOUCH_END, this.onRelease, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onRelease, this);
        };

        _proto.onPress = function onPress(event) {
          if (this.targetNode) this.targetNode.active = true;
        };

        _proto.onRelease = function onRelease(event) {
          if (this.targetNode) this.targetNode.active = false;
        };

        _proto.onCancel = function onCancel(event) {
          if (this.targetNode) this.targetNode.active = false;
        };

        return ToggleEventButton;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseManager.ts', './BaseNotify.ts', './BaseOverlap.ts', './BasePopup.ts', './BaseScreen.ts', './BaseUI.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, instantiate, resources, Prefab, BaseManager, BaseNotify, BaseOverlap, BasePopup, BaseScreen, UIType;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
      resources = module.resources;
      Prefab = module.Prefab;
    }, function (module) {
      BaseManager = module.BaseManager;
    }, function (module) {
      BaseNotify = module.BaseNotify;
    }, function (module) {
      BaseOverlap = module.BaseOverlap;
    }, function (module) {
      BasePopup = module.BasePopup;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      UIType = module.UIType;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _class3$caches, _class3$curUI;

      cclegacy._RF.push({}, "b4b26h3Z0xB4K4my1WzLa0e", "UIManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UIManager = exports('UIManager', (_dec = ccclass('UIManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(UIManager, _BaseManager);

        function UIManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "cScreen", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cPopup", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cOverlap", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cNotify", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = UIManager.prototype;

        _proto.onLoad = function onLoad() {
          _BaseManager.prototype.onLoad.call(this);

          UIManager.roots[UIType.Screen] = this.cScreen;
          UIManager.roots[UIType.Popup] = this.cPopup;
          UIManager.roots[UIType.Notify] = this.cNotify;
          UIManager.roots[UIType.Overlap] = this.cOverlap;
        } //#region === CORE ===
        ;

        UIManager.show = /*#__PURE__*/function () {
          var _show = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(ctor, // constructor
          type, data, forceShow) {
            var name, cache, cur, ui;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (forceShow === void 0) {
                      forceShow = false;
                    }

                    name = ctor.name;
                    cache = this.caches[type];
                    cur = this.curUI[type];

                    if (type === UIType.Screen && cur && cur.constructor.name !== name) {
                      cur.hide();
                    }

                    ui = cache.get(name);

                    if (ui) {
                      _context.next = 11;
                      break;
                    }

                    _context.next = 9;
                    return this.createUI(type, name);

                  case 9:
                    ui = _context.sent;
                    cache.set(name, ui);

                  case 11:
                    if (ui && (forceShow || !ui.IsShow)) {
                      console.log('force show UI', name);
                      this.curUI[type] = ui;
                      ui.node.setSiblingIndex(ui.node.parent.children.length - 1);
                      ui.show(data);
                    }

                    return _context.abrupt("return", ui);

                  case 13:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function show(_x, _x2, _x3, _x4) {
            return _show.apply(this, arguments);
          }

          return show;
        }();

        UIManager.hideAll = function hideAll(type) {
          for (var _iterator = _createForOfIteratorHelperLoose(this.caches[type]), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
                ui = _step$value[1];
            if (ui.IsShow) ui.hide();
          }
        };

        UIManager.createUI = /*#__PURE__*/function () {
          var _createUI = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(type, name) {
            var path, pf, node, parent, comp;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    path = "" + this.UI_PATH + type + "/" + name;
                    _context2.next = 3;
                    return this.loadPrefab(path);

                  case 3:
                    pf = _context2.sent;
                    node = instantiate(pf);
                    parent = this.roots[type];

                    if (!parent) {
                      console.error("[UIManager] Root node for " + UIType[type] + " is not set!");
                    } else {
                      parent.addChild(node);
                    }

                    comp = node.getComponent(name);
                    comp.init == null ? void 0 : comp.init();
                    return _context2.abrupt("return", comp);

                  case 10:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function createUI(_x5, _x6) {
            return _createUI.apply(this, arguments);
          }

          return createUI;
        }();

        UIManager.loadPrefab = /*#__PURE__*/function () {
          var _loadPrefab = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(path) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", new Promise(function (resolve, reject) {
                      resources.load(path, Prefab, function (err, prefab) {
                        if (err || !prefab) reject(err);else resolve(prefab);
                      });
                    }));

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function loadPrefab(_x7) {
            return _loadPrefab.apply(this, arguments);
          }

          return loadPrefab;
        }() //#endregion
        //#region === SHORTCUT ===
        ;

        UIManager.showScreen = function showScreen(ctor, data, force) {
          if (force === void 0) {
            force = false;
          }

          return this.show(ctor, UIType.Screen, data, force);
        };

        UIManager.showPopup = function showPopup(ctor, data, force) {
          if (force === void 0) {
            force = false;
          }

          return this.show(ctor, UIType.Popup, data, force);
        };

        UIManager.showNotify = function showNotify(ctor, data, force) {
          if (force === void 0) {
            force = false;
          }

          return this.show(ctor, UIType.Notify, data, force);
        };

        UIManager.showOverlap = function showOverlap(ctor, data, force) {
          if (force === void 0) {
            force = false;
          }

          return this.show(ctor, UIType.Overlap, data, force);
        };

        UIManager.getExistUI = function getExistUI(ctor) {
          var name = ctor.name;
          var type;
          if (ctor.prototype instanceof BaseScreen) type = UIType.Screen;else if (ctor.prototype instanceof BasePopup) type = UIType.Popup;else if (ctor.prototype instanceof BaseNotify) type = UIType.Notify;else if (ctor.prototype instanceof BaseOverlap) type = UIType.Overlap;else {
            console.warn("[UIManager] Unknown UI type for " + name);
            return null;
          }
          var cache = this.caches[type];
          return cache.get(name) || null;
        } //#endregion
        ;

        return UIManager;
      }(BaseManager), _class3.roots = {}, _class3.caches = (_class3$caches = {}, _class3$caches[UIType.Screen] = new Map(), _class3$caches[UIType.Popup] = new Map(), _class3$caches[UIType.Notify] = new Map(), _class3$caches[UIType.Overlap] = new Map(), _class3$caches), _class3.curUI = (_class3$curUI = {}, _class3$curUI[UIType.Screen] = null, _class3$curUI[UIType.Popup] = null, _class3$curUI[UIType.Notify] = null, _class3$curUI[UIType.Overlap] = null, _class3$curUI), _class3.UI_PATH = 'Prefabs/UI/', _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cScreen", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cPopup", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cOverlap", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cNotify", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WebViewController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, WebView, Button, UITransform, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      WebView = module.WebView;
      Button = module.Button;
      UITransform = module.UITransform;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "15185SUBRhETK4PwuZE7z+z", "WebViewController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var WebViewController = exports('WebViewController', (_dec = ccclass('WebViewController'), _dec2 = property(WebView), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property({
        tooltip: 'URL cần mở'
      }), _dec6 = property({
        tooltip: 'Width của WebView'
      }), _dec7 = property({
        tooltip: 'Height của WebView'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(WebViewController, _Component);

        function WebViewController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "webview", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "openButton", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "closeButton", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "url", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "width", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "height", _descriptor6, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = WebViewController.prototype;

        _proto.start = function start() {
          // Ẩn WebView lúc đầu
          this.webview.node.active = false; // Resize node WebView

          this.webview.node.getComponent(UITransform).setContentSize(this.width, this.height);
          this.webview.node.setPosition(0, 0, 0); // đặt giữa Canvas
          // Button mở WebView

          if (this.openButton) {
            this.openButton.node.on('click', this.openWebView, this);
          } // Button đóng WebView


          if (this.closeButton) {
            this.closeButton.node.on('click', this.closeWebView, this);
          } // Lắng nghe WebView events


          this.webview.node.on(WebView.EventType.LOADING, this.onLoadStart, this);
          this.webview.node.on(WebView.EventType.LOADED, this.onLoadFinish, this);
          this.webview.node.on(WebView.EventType.ERROR, this.onLoadError, this);
        };

        _proto.openWebView = function openWebView() {
          this.webview.url = this.url;
          this.webview.node.active = true;
        };

        _proto.closeWebView = function closeWebView() {
          this.webview.node.active = false;
          this.webview.url = ''; // reset URL
        } // Event handlers
        ;

        _proto.onLoadStart = function onLoadStart() {
          console.log('WebView bắt đầu tải URL:', this.url);
        };

        _proto.onLoadFinish = function onLoadFinish() {
          console.log('WebView tải xong URL:', this.url);
        };

        _proto.onLoadError = function onLoadError() {
          console.warn('WebView tải lỗi URL:', this.url);
        };

        return WebViewController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "webview", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "openButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "url", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'https://example.com';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "width", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 600;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "height", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 400;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioSource, resources, AudioClip, BaseManager;

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

System.register("chunks:///_virtual/BetBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ObserverManager.ts', './GameManager.ts', './UIManager.ts', './ScreenGame.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Component, ObserverManager, ObserverEvent, GameManager, UIManager, ScreenGame;

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
      GameManager = module.GameManager;
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
          ObserverManager.instance.on(ObserverEvent.LockHand, this.onLockHand.bind(this));
          ObserverManager.instance.on(ObserverEvent.NumberBet, this.onBetNumber.bind(this));
          this.betButton.node.on(Button.EventType.CLICK, this.onBet, this);
        };

        _proto.onDestroy = function onDestroy() {
          ObserverManager.instance.off(ObserverEvent.LockHand, this.onLockHand.bind(this));
          ObserverManager.instance.off(ObserverEvent.NumberBet, this.onBetNumber.bind(this));
        };

        _proto.onBet = function onBet() {
          var _UIManager$instance$g;

          if (this._lockHand) return;
          GameManager.instance.betType = this.betType;
          (_UIManager$instance$g = UIManager.instance.getExistUI(ScreenGame)) == null ? void 0 : _UIManager$instance$g.showBottom();
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
          if (this.betType !== GameManager.instance.betType) return;
          GameManager.instance.numberPlayerBigBet++;
          GameManager.instance.bigBetTotal += number;
          GameManager.instance.numberBigBetOfPlayer += number;
        };

        return BigBet;
      }(BetBase)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIManager.ts', './ScreenGame.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, UIManager, ScreenGame;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      ScreenGame = module.ScreenGame;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "12964gtw91OmIL3lBENcOHr", "BoardController", undefined);

      var ccclass = _decorator.ccclass;
      var BoardController = exports('BoardController', (_dec = ccclass('BoardController'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoardController, _Component);

        function BoardController() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = BoardController.prototype;

        _proto.start = function start() {
          UIManager.instance.showScreen(ScreenGame, null, true);
        };

        return BoardController;
      }(Component)) || _class));

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
            ObserverManager.instance.emit(ObserverEvent.CoverResult, false);
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

System.register("chunks:///_virtual/DotResult.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ObserverManager.ts', './GameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Sprite, SpriteFrame, Component, ObserverManager, ObserverEvent, GameManager;

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
    }, function (module) {
      GameManager = module.GameManager;
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
          ObserverManager.instance.on(ObserverEvent.UpdateDotResult, this.updateDotResult.bind(this));
          this.updateDotResult(GameManager.instance.dotResult);
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

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseManager.ts', './ObserverManager.ts', './UIManager.ts', './ScreenGame.ts', './BetBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, director, BaseManager, ObserverManager, ObserverEvent, UIManager, ScreenGame, BetType;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
    }, function (module) {
      BaseManager = module.BaseManager;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      ScreenGame = module.ScreenGame;
    }, function (module) {
      BetType = module.BetType;
    }],
    execute: function () {
      exports('SceneName', void 0);

      var _dec, _class;

      cclegacy._RF.push({}, "d400byDuhVCyac1seK+8g4k", "GameManager", undefined);

      var ccclass = _decorator.ccclass;
      var SceneName;

      (function (SceneName) {
        SceneName["Gameplay"] = "gameplay";
      })(SceneName || (SceneName = exports('SceneName', {})));

      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec(_class = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(GameManager, _BaseManager);

        function GameManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;
          _this._playerMoney = 50000;
          _this._bigBetTotal = 0;
          _this._numberPlayerBigBet = 0;
          _this._numberBigBetOfPlayer = 0;
          _this._smallBetTotal = 0;
          _this._numberPlayerSmallBet = 0;
          _this._numberSmallBetOfPlayer = 0;
          _this.canCountdown = false;
          _this.betType = BetType.None;
          _this.dotResult = Array.from({
            length: 10
          }, function () {
            return Math.random() < 0.5;
          });
          _this.isShowHand = false;
          _this._timer = 0;
          _this._timerCount = 0;
          _this.TIME_COUNT = 31;
          _this.TIME_TICK = 1;
          _this._currentRandomTimer = 1;
          _this.RandomTimer = [.4, .5, .6, .3, .2, .7, .8];
          return _this;
        }

        var _proto = GameManager.prototype; //#endregion
        //#endregion
        //#region Methods
        // protected onLoad(): void {
        //     super.onLoad();
        //     localStorage.clear();
        // }

        _proto.start = function start() {
          var _this2 = this;

          this._timerCount = this.TIME_COUNT;
          this.playerMoney = this.loadPlayerMoney();
          this.delay(1000).then(function () {
            _this2.loadSceneAsync(SceneName.Gameplay);
          });
        };

        _proto.update = function update(deltaTime) {
          if (!this.canCountdown) return;
          this._timer += deltaTime;

          if (this._timerCount <= 0) {
            this._timerCount = this.TIME_COUNT;
            this._timer = 0;
            ObserverManager.instance.emit(ObserverEvent.RollDice);
            this.canCountdown = false;
          }

          if (this._timer >= this._currentRandomTimer) this.fakeNumberBet();

          if (this._timer >= this.TIME_TICK) {
            this._timer -= this.TIME_TICK;
            this._timerCount--;
            ObserverManager.instance.emit(ObserverEvent.UpdateTimer, this._timerCount);
          }
        };

        _proto.fakeNumberBet = function fakeNumberBet() {
          this._currentRandomTimer = this.RandomTimer[Math.floor(Math.random() * this.RandomTimer.length)];
          this.numberPlayerBigBet += Math.floor(Math.random() * 4);
          this.bigBetTotal += Math.floor(Math.random() * 10000) + 3000;
          this.numberPlayerSmallBet += Math.floor(Math.random() * 4);
          this.smallBetTotal += Math.floor(Math.random() * 10000) + 3000;
        };

        _proto.resetCountdown = /*#__PURE__*/function () {
          var _resetCountdown = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _UIManager$instance$g;

            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.delay(2000);

                  case 2:
                    this.canCountdown = true;
                    this._currentRandomTimer = 1;
                    _context.next = 6;
                    return this.delay(1000);

                  case 6:
                    (_UIManager$instance$g = UIManager.instance.getExistUI(ScreenGame)) == null ? void 0 : _UIManager$instance$g.lightRotateEffect.hideLight();

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function resetCountdown() {
            return _resetCountdown.apply(this, arguments);
          }

          return resetCountdown;
        }();

        _proto.delay = function delay(ms) {
          return new Promise(function (resolve) {
            return setTimeout(resolve, ms);
          });
        };

        _proto.loadSceneAsync = /*#__PURE__*/function () {
          var _loadSceneAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(sceneName) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", new Promise(function (resolve, reject) {
                      director.loadScene(sceneName, function (err) {
                        if (err) {
                          console.error("Failed to load scene \"" + sceneName + "\"", err);
                          reject(err);
                        } else {
                          console.log("Scene \"" + sceneName + "\" loaded successfully");
                          GameManager.instance.canCountdown = true;
                          resolve();
                        }
                      });
                    }));

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function loadSceneAsync(_x) {
            return _loadSceneAsync.apply(this, arguments);
          }

          return loadSceneAsync;
        }();

        _proto.formatNumber = function formatNumber(value) {
          return value.toLocaleString('en-US');
        };

        _proto.savePlayerMoney = function savePlayerMoney() {
          localStorage.setItem('playerMoney', this._playerMoney.toString());
        };

        _proto.loadPlayerMoney = function loadPlayerMoney() {
          var playerMoney = localStorage.getItem('playerMoney');
          return playerMoney ? parseInt(playerMoney) : 100000;
        } //#endregion
        ;

        _createClass(GameManager, [{
          key: "playerMoney",
          get: function get() {
            return this._playerMoney;
          },
          set: function set(value) {
            this._playerMoney = value >= 0 ? value : 0;
            this.savePlayerMoney();
            ObserverManager.instance.emit(ObserverEvent.UpdatePlayerMoneyLabel, this._playerMoney);
          } //Big

        }, {
          key: "bigBetTotal",
          get: function get() {
            return this._bigBetTotal;
          },
          set: function set(value) {
            this._bigBetTotal = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateBigBetTotalLabel, this._bigBetTotal);
          }
        }, {
          key: "numberPlayerBigBet",
          get: function get() {
            return this._numberPlayerBigBet;
          },
          set: function set(value) {
            this._numberPlayerBigBet = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateNumberPlayerBigBetLabel, this._numberPlayerBigBet);
          }
        }, {
          key: "numberBigBetOfPlayer",
          get: function get() {
            return this._numberBigBetOfPlayer;
          },
          set: function set(value) {
            this._numberBigBetOfPlayer = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateNumberBigBetOfPlayerLabel, this._numberBigBetOfPlayer);
          } //Small

        }, {
          key: "smallBetTotal",
          get: function get() {
            return this._smallBetTotal;
          },
          set: function set(value) {
            this._smallBetTotal = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateSmallBetTotalLabel, this._smallBetTotal);
          }
        }, {
          key: "numberPlayerSmallBet",
          get: function get() {
            return this._numberPlayerSmallBet;
          },
          set: function set(value) {
            this._numberPlayerSmallBet = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateNumberPlayerSmallBetLabel, this._numberPlayerSmallBet);
          }
        }, {
          key: "numberSmallBetOfPlayer",
          get: function get() {
            return this._numberSmallBetOfPlayer;
          },
          set: function set(value) {
            this._numberSmallBetOfPlayer = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateNumberSmallBetOfPlayerLabel, this._numberSmallBetOfPlayer);
          } //#endregion
          //#region Variables

        }]);

        return GameManager;
      }(BaseManager)) || _class));

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
          if (GameManager.instance.isShowHand) {
            GameManager.instance.isShowHand = false;
            this.handButton.node.getComponent(Sprite).spriteFrame = this.handSpriteFrames[1];
          } else {
            GameManager.instance.isShowHand = true;
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

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
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
          try {
            console.log('showLight', position);
            this.node.setWorldPosition(position);
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
          tween(this.node).stop();
          this.node.active = false;
        };

        return LightRotateEffect;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./BoardController.ts', './BetBase.ts', './BigBet.ts', './SmallBet.ts', './AudioManager.ts', './BaseManager.ts', './GameManager.ts', './ObserverManager.ts', './UIManager.ts', './BaseNotify.ts', './BaseOverlap.ts', './BasePopup.ts', './BaseScreen.ts', './BaseUI.ts', './OverlapLoading.ts', './PopupHelp.ts', './ScreenGame.ts', './BubbleLabel.ts', './CoverResultController.ts', './DiceRotateEffect.ts', './DotResult.ts', './HandButtonController.ts', './LightRotateEffect.ts', './WebViewController.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
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

      var _dec, _class;

      cclegacy._RF.push({}, "ad949BefgJOF6dMkY2fSBfp", "ObserverManager", undefined);

      var ccclass = _decorator.ccclass;
      var ObserverEvent;

      (function (ObserverEvent) {
        ObserverEvent["UpdatePlayerMoneyLabel"] = "updatePlayerMoneyLabel";
        ObserverEvent["RollDice"] = "rollDice";
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

      var ObserverManager = exports('ObserverManager', (_dec = ccclass('ObserverManager'), _dec(_class = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(ObserverManager, _BaseManager);

        function ObserverManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;
          _this._events = new Map();
          return _this;
        }

        var _proto = ObserverManager.prototype;

        _proto.on = function on(eventName, callback) {
          if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set());
          }

          this._events.get(eventName).add(callback);
        };

        _proto.off = function off(eventName, callback) {
          if (!this._events.has(eventName)) return;

          if (!callback) {
            this._events["delete"](eventName);
          } else {
            this._events.get(eventName)["delete"](callback);
          }
        };

        _proto.emit = function emit(eventName) {
          if (!this._events.has(eventName)) return;

          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          for (var _iterator = _createForOfIteratorHelperLoose(this._events.get(eventName)), _step; !(_step = _iterator()).done;) {
            var cb = _step.value;
            cb.apply(void 0, args);
          }
        };

        _proto.clearAll = function clearAll() {
          this._events.clear();
        };

        return ObserverManager;
      }(BaseManager)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OverlapLoading.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseOverlap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, BaseOverlap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      BaseOverlap = module.BaseOverlap;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "a77fbkGB9ZFj5X8/yfFffjk", "OverlapLoading", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var OverlapLoading = exports('OverlapLoading', (_dec = ccclass('OverlapLoading'), _dec(_class = /*#__PURE__*/function (_BaseOverlap) {
        _inheritsLoose(OverlapLoading, _BaseOverlap);

        function OverlapLoading() {
          return _BaseOverlap.apply(this, arguments) || this;
        }

        var _proto = OverlapLoading.prototype;

        _proto.init = function init() {
          _BaseOverlap.prototype.init.call(this);
        };

        _proto.show = function show(data) {
          _BaseOverlap.prototype.show.call(this, data);
        };

        _proto.hide = function hide() {
          _BaseOverlap.prototype.hide.call(this);
        };

        return OverlapLoading;
      }(BaseOverlap)) || _class));

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

          this.closeButton.node.on(Button.EventType.CLICK, this.hide, this);
        };

        _proto.show = function show(data) {
          _BasePopup.prototype.show.call(this, data);

          this.closeButton.interactable = true;
        };

        _proto.hide = function hide() {
          _BasePopup.prototype.hide.call(this);

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

System.register("chunks:///_virtual/ScreenGame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseScreen.ts', './ObserverManager.ts', './GameManager.ts', './BetBase.ts', './UIManager.ts', './PopupHelp.ts', './LightRotateEffect.ts', './BaseUI.ts', './BubbleLabel.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, Node, Button, Sprite, Animation, SpriteFrame, UITransform, Tween, tween, Vec3, Color, BaseScreen, ObserverManager, ObserverEvent, GameManager, BetType, UIManager, PopupHelp, LightRotateEffect, UIType, BubbleLabel;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      Button = module.Button;
      Sprite = module.Sprite;
      Animation = module.Animation;
      SpriteFrame = module.SpriteFrame;
      UITransform = module.UITransform;
      Tween = module.Tween;
      tween = module.tween;
      Vec3 = module.Vec3;
      Color = module.Color;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      BetType = module.BetType;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      PopupHelp = module.PopupHelp;
    }, function (module) {
      LightRotateEffect = module.LightRotateEffect;
    }, function (module) {
      UIType = module.UIType;
    }, function (module) {
      BubbleLabel = module.BubbleLabel;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37;

      cclegacy._RF.push({}, "d684fbG8ARLZaEvkCsCpxej", "ScreenGame", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ScreenGame = exports('ScreenGame', (_dec = ccclass('ScreenGame'), _dec2 = property({
        type: Label,
        group: 'Player Info'
      }), _dec3 = property({
        type: Label,
        group: 'Player Info'
      }), _dec4 = property({
        type: Label,
        group: 'Player Info'
      }), _dec5 = property({
        type: Label,
        group: 'Big Bet'
      }), _dec6 = property({
        type: Label,
        group: 'Big Bet'
      }), _dec7 = property({
        type: Node,
        group: 'Big Bet'
      }), _dec8 = property({
        type: Button,
        group: 'Big Bet'
      }), _dec9 = property({
        type: Label,
        group: 'Small Bet'
      }), _dec10 = property({
        type: Label,
        group: 'Small Bet'
      }), _dec11 = property({
        type: Node,
        group: 'Small Bet'
      }), _dec12 = property({
        type: Button,
        group: 'Small Bet'
      }), _dec13 = property({
        type: Node,
        group: 'Dice'
      }), _dec14 = property({
        type: Sprite,
        group: 'Dice'
      }), _dec15 = property({
        type: Sprite,
        group: 'Dice'
      }), _dec16 = property({
        type: Sprite,
        group: 'Dice'
      }), _dec17 = property({
        type: Node,
        group: 'Dice'
      }), _dec18 = property({
        type: Animation,
        group: 'Dice'
      }), _dec19 = property({
        type: [SpriteFrame],
        group: 'Dice'
      }), _dec20 = property({
        type: Label,
        group: 'Effect'
      }), _dec21 = property({
        type: Node,
        group: 'Effect'
      }), _dec22 = property({
        type: Node,
        group: 'Effect'
      }), _dec23 = property({
        type: LightRotateEffect,
        group: 'Effect'
      }), _dec24 = property({
        type: BubbleLabel,
        group: 'Effect'
      }), _dec25 = property({
        type: UITransform,
        group: 'Effect'
      }), _dec26 = property({
        type: UITransform,
        group: 'Effect'
      }), _dec27 = property({
        type: Button,
        group: 'Bet'
      }), _dec28 = property({
        type: Button,
        group: 'Bet'
      }), _dec29 = property({
        type: Button,
        group: 'Bet'
      }), _dec30 = property({
        type: Button,
        group: 'Bet'
      }), _dec31 = property({
        type: Button,
        group: 'Bet'
      }), _dec32 = property({
        type: Button,
        group: 'Bet'
      }), _dec33 = property({
        type: Button,
        group: 'Bet'
      }), _dec34 = property({
        type: Button,
        group: 'Bet'
      }), _dec35 = property({
        type: Button,
        group: 'Bet'
      }), _dec36 = property({
        type: Button,
        group: 'Bet'
      }), _dec37 = property({
        type: Button,
        group: 'Button'
      }), _dec38 = property({
        type: Button,
        group: 'Button'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(ScreenGame, _BaseScreen);

        function ScreenGame() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "playerMoneyLabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberPlayerBigBetLabel", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberPlayerSmallBetLabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberBigBetOfPlayerLabel", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bigBetTotalLabel", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bigTitleNode", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bigBetButton", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberSmallBetOfPlayerLabel", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "smallBetTotalLabel", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "smallTitleNode", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "smallBetButton", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceResultNode", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice1Sprite", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice2Sprite", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice3Sprite", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceAnimationNode", _descriptor16, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceAnimation", _descriptor17, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceSprites", _descriptor18, _assertThisInitialized(_this));

          _this.dice1Number = 0;
          _this.dice2Number = 0;
          _this.dice3Number = 0;
          _this.totalNumber = 0;
          _this.TWEEN_TEXT_DURATION = 0.25;
          _this.TWEEN_SCALE_FACTOR = 2;
          _this._isShowBottom = false;
          _this._rollDiceHandler = _this.rollDice.bind(_assertThisInitialized(_this));
          _this._updateTimerHandler = _this.updateTimer.bind(_assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timeLabel", _descriptor19, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotateEffectNode", _descriptor20, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "coverResultNode", _descriptor21, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lightRotateEffect", _descriptor22, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bubbleLabel", _descriptor23, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bottomUITransform", _descriptor24, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "maskBottomUITransform", _descriptor25, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number1kButton", _descriptor26, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number5kButton", _descriptor27, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number10kButton", _descriptor28, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number50kButton", _descriptor29, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number100kButton", _descriptor30, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number200kButton", _descriptor31, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number500kButton", _descriptor32, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number1mButton", _descriptor33, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number5mButton", _descriptor34, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number10mButton", _descriptor35, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "closeBottomButton", _descriptor36, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "helpButton", _descriptor37, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ScreenGame.prototype; //#endregion
        //#endregion

        _proto.init = function init() {
          _BaseScreen.prototype.init.call(this);

          ObserverManager.instance.on(ObserverEvent.RollDice, this._rollDiceHandler);
          ObserverManager.instance.on(ObserverEvent.UpdateTimer, this._updateTimerHandler);
          ObserverManager.instance.on(ObserverEvent.UpdatePlayerMoneyLabel, this.updatePlayerMoneyLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateBigBetTotalLabel, this.updateBigBetTotalLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateNumberPlayerBigBetLabel, this.updateNumberPlayerBigBetLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateNumberBigBetOfPlayerLabel, this.updateNumberBigBetOfPlayerLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateSmallBetTotalLabel, this.updateSmallBetTotalLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateNumberPlayerSmallBetLabel, this.updateNumberPlayerSmallBetLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateNumberSmallBetOfPlayerLabel, this.updateNumberSmallBetOfPlayerLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.CoverResult, this.coverResult.bind(this));
          this.number1kButton.node.on(Button.EventType.CLICK, this.number1k, this);
          this.number5kButton.node.on(Button.EventType.CLICK, this.number5k, this);
          this.number10kButton.node.on(Button.EventType.CLICK, this.number10k, this);
          this.number50kButton.node.on(Button.EventType.CLICK, this.number50k, this);
          this.number100kButton.node.on(Button.EventType.CLICK, this.number100k, this);
          this.number200kButton.node.on(Button.EventType.CLICK, this.number200k, this);
          this.number500kButton.node.on(Button.EventType.CLICK, this.number500k, this);
          this.number1mButton.node.on(Button.EventType.CLICK, this.number1m, this);
          this.number5mButton.node.on(Button.EventType.CLICK, this.number5m, this);
          this.number10mButton.node.on(Button.EventType.CLICK, this.number10m, this);
          this.closeBottomButton.node.on(Button.EventType.CLICK, this.closeBottom, this);
          this.helpButton.node.on(Button.EventType.CLICK, this.showHelp, this);
        };

        _proto.show = function show(data) {
          _BaseScreen.prototype.show.call(this, data);

          this.number1kButton.interactable = true;
          this.number5kButton.interactable = true;
          this.number10kButton.interactable = true;
          this.number50kButton.interactable = true;
          this.number100kButton.interactable = true;
          this.number200kButton.interactable = true;
          this.number500kButton.interactable = true;
          this.number1mButton.interactable = true;
          this.number5mButton.interactable = true;
          this.number10mButton.interactable = true;
          this.closeBottomButton.interactable = true;
          this.helpButton.interactable = true;
          this.updatePlayerMoneyLabel(GameManager.instance.playerMoney);
          this.timeLabel.node.active = true;
          this.diceResultNode.active = false;
          this.diceAnimationNode.active = false;
          this.rotateEffectNode.active = false;
        };

        _proto.hide = function hide() {
          _BaseScreen.prototype.hide.call(this);

          this.number1kButton.interactable = false;
          this.number5kButton.interactable = false;
          this.number10kButton.interactable = false;
          this.number50kButton.interactable = false;
          this.number100kButton.interactable = false;
          this.number200kButton.interactable = false;
          this.number500kButton.interactable = false;
          this.number1mButton.interactable = false;
          this.number5mButton.interactable = false;
          this.number10mButton.interactable = false;
          this.closeBottomButton.interactable = false;
          this.helpButton.interactable = false;
        };

        _proto.onDestroy = function onDestroy() {
          ObserverManager.instance.off(ObserverEvent.RollDice, this._rollDiceHandler);
          ObserverManager.instance.off(ObserverEvent.UpdateTimer, this._updateTimerHandler);
          ObserverManager.instance.off(ObserverEvent.UpdatePlayerMoneyLabel, this.updatePlayerMoneyLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateBigBetTotalLabel, this.updateBigBetTotalLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateNumberPlayerBigBetLabel, this.updateNumberPlayerBigBetLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateNumberBigBetOfPlayerLabel, this.updateNumberBigBetOfPlayerLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateSmallBetTotalLabel, this.updateSmallBetTotalLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateNumberPlayerSmallBetLabel, this.updateNumberPlayerSmallBetLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateNumberSmallBetOfPlayerLabel, this.updateNumberSmallBetOfPlayerLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.CoverResult, this.coverResult.bind(this));
          this.number1kButton.node.off(Button.EventType.CLICK, this.number1k, this);
          this.number5kButton.node.off(Button.EventType.CLICK, this.number5k, this);
          this.number10kButton.node.off(Button.EventType.CLICK, this.number10k, this);
          this.number50kButton.node.off(Button.EventType.CLICK, this.number50k, this);
          this.number100kButton.node.off(Button.EventType.CLICK, this.number100k, this);
          this.number200kButton.node.off(Button.EventType.CLICK, this.number200k, this);
          this.number500kButton.node.off(Button.EventType.CLICK, this.number500k, this);
          this.number1mButton.node.off(Button.EventType.CLICK, this.number1m, this);
          this.number5mButton.node.off(Button.EventType.CLICK, this.number5m, this);
          this.number10mButton.node.off(Button.EventType.CLICK, this.number10m, this);
          this.closeBottomButton.node.off(Button.EventType.CLICK, this.closeBottom, this);
          this.helpButton.node.off(Button.EventType.CLICK, this.showHelp, this);
        } //#region Listeners
        ;

        _proto.coverResult = function coverResult(value) {
          if (!value) this.showResultEffect(true);
        };

        _proto.updatePlayerMoneyLabel = function updatePlayerMoneyLabel(value) {
          this.playerMoneyLabel.string = GameManager.instance.formatNumber(value);
        } //Big
        ;

        _proto.updateBigBetTotalLabel = function updateBigBetTotalLabel(value) {
          Tween.stopAllByTarget(this.bigBetTotalLabel.node);
          tween(this.bigBetTotalLabel.node).to(this.TWEEN_TEXT_DURATION, {
            scale: new Vec3(1, 1, 1).multiplyScalar(this.TWEEN_SCALE_FACTOR)
          }, {
            easing: 'quadOut'
          }).to(this.TWEEN_TEXT_DURATION, {
            scale: Vec3.ONE
          }, {
            easing: 'quadOut'
          }).start();
          this.bigBetTotalLabel.string = GameManager.instance.formatNumber(value);
        };

        _proto.updateNumberPlayerBigBetLabel = function updateNumberPlayerBigBetLabel(value) {
          this.numberPlayerBigBetLabel.string = GameManager.instance.formatNumber(value);
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
          this.numberBigBetOfPlayerLabel.string = 'Your Bet: ' + GameManager.instance.formatNumber(value);
        } //Small
        ;

        _proto.updateSmallBetTotalLabel = function updateSmallBetTotalLabel(value) {
          Tween.stopAllByTarget(this.smallBetTotalLabel.node);
          tween(this.smallBetTotalLabel.node).to(this.TWEEN_TEXT_DURATION, {
            scale: new Vec3(1, 1, 1).multiplyScalar(this.TWEEN_SCALE_FACTOR)
          }, {
            easing: 'quadOut'
          }).to(this.TWEEN_TEXT_DURATION, {
            scale: Vec3.ONE
          }, {
            easing: 'quadOut'
          }).start();
          this.smallBetTotalLabel.string = GameManager.instance.formatNumber(value);
        };

        _proto.updateNumberPlayerSmallBetLabel = function updateNumberPlayerSmallBetLabel(value) {
          this.numberPlayerSmallBetLabel.string = GameManager.instance.formatNumber(value);
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
          this.numberSmallBetOfPlayerLabel.string = 'Your Bet: ' + GameManager.instance.formatNumber(value);
        };

        _proto.updateTimer = function updateTimer(timer) {
          this.diceResultNode.active = false;
          this.diceAnimationNode.active = false;
          this.rotateEffectNode.active = false;
          this.timeLabel.string = timer.toString();
          this.timeLabel.node.active = true;
        } //#endregion
        //#region Gameplay
        ;

        _proto.rollDice = function rollDice() {
          var _this2 = this;

          console.log('rollDice');
          UIManager.instance.hideAll(UIType.Popup);
          this.closeBottom();
          this.dice1Number = Math.floor(Math.random() * 6) + 1;
          this.dice2Number = Math.floor(Math.random() * 6) + 1;
          this.dice3Number = Math.floor(Math.random() * 6) + 1;
          this.totalNumber = this.dice1Number + this.dice2Number + this.dice3Number;
          this.animationRollDice(function () {
            console.log('animationRollDice callback');

            _this2.showResultEffect(!GameManager.instance.isShowHand);
          });
        };

        _proto.animationRollDice = /*#__PURE__*/function () {
          var _animationRollDice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(callback) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log('animationRollDice');
                    ObserverManager.instance.emit(ObserverEvent.LockHand, true);
                    this.timeLabel.node.active = false;
                    this.diceAnimationNode.active = true;
                    this.rotateEffectNode.active = true;
                    this.diceAnimation.play();
                    _context.next = 8;
                    return GameManager.instance.delay(1250);

                  case 8:
                    callback();

                  case 9:
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

        _proto.updateDiceSprites = function updateDiceSprites() {
          console.log('updateDiceSprites');
          this.timeLabel.node.active = false;
          this.diceAnimationNode.active = false;
          this.rotateEffectNode.active = false;
          this.dice1Sprite.spriteFrame = this.diceSprites[this.dice1Number - 1];
          this.dice2Sprite.spriteFrame = this.diceSprites[this.dice2Number - 1];
          this.dice3Sprite.spriteFrame = this.diceSprites[this.dice3Number - 1];
          this.diceResultNode.active = true;
        };

        _proto.showResultEffect = function showResultEffect(forceShow) {
          console.log('showResultEffect', forceShow);

          if (forceShow) {
            try {
              if (this.totalNumber < 11) {
                GameManager.instance.playerMoney += GameManager.instance.numberSmallBetOfPlayer * 2;
                GameManager.instance.dotResult.push(true);
                this.lightRotateEffect.showLight(this.smallTitleNode.worldPosition);
                if (GameManager.instance.numberSmallBetOfPlayer > 0) this.bubbleLabel.show('+' + GameManager.instance.numberSmallBetOfPlayer * 2, this.playerMoneyLabel.node.worldPosition, Vec3.UP, Color.YELLOW);
              } else {
                GameManager.instance.playerMoney += GameManager.instance.numberBigBetOfPlayer * 2;
                GameManager.instance.dotResult.push(false);
                this.lightRotateEffect.showLight(this.bigTitleNode.worldPosition);
                if (GameManager.instance.numberBigBetOfPlayer > 0) this.bubbleLabel.show('+' + GameManager.instance.numberBigBetOfPlayer * 2, this.playerMoneyLabel.node.worldPosition, Vec3.UP, Color.CYAN);
              }
            } catch (e) {
              console.error('showResultEffect error:', e);
            }

            GameManager.instance.dotResult.shift();
            GameManager.instance.bigBetTotal = 0;
            GameManager.instance.numberPlayerBigBet = 0;
            GameManager.instance.numberBigBetOfPlayer = 0;
            GameManager.instance.smallBetTotal = 0;
            GameManager.instance.numberPlayerSmallBet = 0;
            GameManager.instance.numberSmallBetOfPlayer = 0;
            GameManager.instance.betType = BetType.None;
            ObserverManager.instance.emit(ObserverEvent.UpdateDotResult, GameManager.instance.dotResult);
            ObserverManager.instance.emit(ObserverEvent.LockHand, false);
            GameManager.instance.resetCountdown();
          } else {
            this.coverResultNode.active = true;
          }

          this.updateDiceSprites();
        } //#endregion
        //#region Bottom
        ;

        _proto.showBottom = function showBottom() {
          console.log('showBottom');

          if (!this._isShowBottom) {
            this._isShowBottom = true;
            tween(this.bottomUITransform).to(0.5, {
              height: 200
            }, {
              easing: 'quadOut'
            }).start();
            tween(this.maskBottomUITransform).to(0.5, {
              height: 200
            }, {
              easing: 'quadOut'
            }).start();
          }

          if (GameManager.instance.betType == BetType.Big) {
            this.bigBetButton.node.active = false;
            this.smallBetButton.node.active = true;
          } else {
            this.bigBetButton.node.active = true;
            this.smallBetButton.node.active = false;
          }

          this.closeBottomButton.interactable = true;
        };

        _proto.closeBottom = function closeBottom() {
          this.closeBottomButton.interactable = false;

          if (this._isShowBottom) {
            this._isShowBottom = false;
            tween(this.bottomUITransform).to(0.5, {
              height: 0
            }, {
              easing: 'quadOut'
            }).start();
            tween(this.maskBottomUITransform).to(0.5, {
              height: 0
            }, {
              easing: 'quadOut'
            }).start();
          }

          this.bigBetButton.node.active = true;
          this.smallBetButton.node.active = true;
        };

        _proto.updateDataOnBet = function updateDataOnBet(betNumber) {
          if (GameManager.instance.playerMoney >= betNumber) {
            GameManager.instance.playerMoney -= betNumber;
            ObserverManager.instance.emit(ObserverEvent.NumberBet, betNumber);
          } else if (GameManager.instance.playerMoney > 0) {
            var currentMoney = GameManager.instance.playerMoney;
            GameManager.instance.playerMoney = 0;
            ObserverManager.instance.emit(ObserverEvent.NumberBet, currentMoney);
          } else this.bubbleLabel.show('Not enough money', this.playerMoneyLabel.node.worldPosition, Vec3.UP, Color.RED, .75);
        } //#region Bet
        ;

        _proto.number1k = function number1k() {
          this.updateDataOnBet(1000);
        };

        _proto.number5k = function number5k() {
          this.updateDataOnBet(5000);
        };

        _proto.number10k = function number10k() {
          this.updateDataOnBet(10000);
        };

        _proto.number50k = function number50k() {
          this.updateDataOnBet(50000);
        };

        _proto.number100k = function number100k() {
          this.updateDataOnBet(100000);
        };

        _proto.number200k = function number200k() {
          this.updateDataOnBet(200000);
        };

        _proto.number500k = function number500k() {
          this.updateDataOnBet(500000);
        };

        _proto.number1m = function number1m() {
          this.updateDataOnBet(1000000);
        };

        _proto.number5m = function number5m() {
          this.updateDataOnBet(5000000);
        };

        _proto.number10m = function number10m() {
          this.updateDataOnBet(10000000);
        } //#endregion
        //#endregion
        //#region Button
        ;

        _proto.showHelp = function showHelp() {
          UIManager.instance.showPopup(PopupHelp, null, true);
        } //#endregion
        ;

        return ScreenGame;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerMoneyLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "numberPlayerBigBetLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "numberPlayerSmallBetLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "numberBigBetOfPlayerLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bigBetTotalLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "bigTitleNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "bigBetButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "numberSmallBetOfPlayerLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "smallBetTotalLabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "smallTitleNode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "smallBetButton", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "diceResultNode", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "dice1Sprite", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "dice2Sprite", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "dice3Sprite", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "diceAnimationNode", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "diceAnimation", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "diceSprites", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "timeLabel", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "rotateEffectNode", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "coverResultNode", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "lightRotateEffect", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "bubbleLabel", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "bottomUITransform", [_dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "maskBottomUITransform", [_dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "number1kButton", [_dec27], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "number5kButton", [_dec28], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "number10kButton", [_dec29], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "number50kButton", [_dec30], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "number100kButton", [_dec31], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "number200kButton", [_dec32], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "number500kButton", [_dec33], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "number1mButton", [_dec34], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "number5mButton", [_dec35], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "number10mButton", [_dec36], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, "closeBottomButton", [_dec37], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor37 = _applyDecoratedDescriptor(_class2.prototype, "helpButton", [_dec38], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
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
          if (this.betType !== GameManager.instance.betType) return;
          GameManager.instance.numberPlayerSmallBet++;
          GameManager.instance.smallBetTotal += number;
          GameManager.instance.numberSmallBetOfPlayer += number;
        };

        return SmallBet;
      }(BetBase)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseManager.ts', './BaseNotify.ts', './BaseOverlap.ts', './BasePopup.ts', './BaseScreen.ts', './BaseUI.ts', './GameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Button, Node, instantiate, resources, Prefab, BaseManager, BaseNotify, BaseOverlap, BasePopup, BaseScreen, UIType, GameManager;

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
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "b4b26h3Z0xB4K4my1WzLa0e", "UIManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UIManager = exports('UIManager', (_dec = ccclass('UIManager'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(UIManager, _BaseManager);

        function UIManager() {
          var _this$caches, _this$curUI;

          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "depositButton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "withdrawButton", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cScreen", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cPopup", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cOverlap", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cNotify", _descriptor6, _assertThisInitialized(_this));

          _this.roots = {};
          _this.caches = (_this$caches = {}, _this$caches[UIType.Screen] = new Map(), _this$caches[UIType.Popup] = new Map(), _this$caches[UIType.Notify] = new Map(), _this$caches[UIType.Overlap] = new Map(), _this$caches);
          _this.curUI = (_this$curUI = {}, _this$curUI[UIType.Screen] = null, _this$curUI[UIType.Popup] = null, _this$curUI[UIType.Notify] = null, _this$curUI[UIType.Overlap] = null, _this$curUI);
          _this.UI_PATH = 'Prefabs/UI/';
          return _this;
        }

        var _proto = UIManager.prototype;

        _proto.onLoad = function onLoad() {
          _BaseManager.prototype.onLoad.call(this);

          this.roots[UIType.Screen] = this.cScreen;
          this.roots[UIType.Popup] = this.cPopup;
          this.roots[UIType.Notify] = this.cNotify;
          this.roots[UIType.Overlap] = this.cOverlap;
          this.depositButton.node.on(Button.EventType.CLICK, this.onDepositButtonClick, this);
          this.withdrawButton.node.on(Button.EventType.CLICK, this.onWithdrawButtonClick, this);
        } //#region === CORE ===
        ;

        _proto.show = /*#__PURE__*/function () {
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
                      _context.next = 12;
                      break;
                    }

                    console.log('ui null, create new UI', name);
                    _context.next = 10;
                    return this.createUI(type, name);

                  case 10:
                    ui = _context.sent;
                    cache.set(name, ui);

                  case 12:
                    if (ui && (forceShow || !ui.IsShow)) {
                      console.log('has cache, show UI', name);
                      this.curUI[type] = ui;
                      ui.node.setSiblingIndex(ui.node.parent.children.length - 1);
                      ui.show(data);
                    }

                    return _context.abrupt("return", ui);

                  case 14:
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

        _proto.hideAll = function hideAll(type) {
          for (var _iterator = _createForOfIteratorHelperLoose(this.caches[type]), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
                ui = _step$value[1];
            if (ui.IsShow) ui.hide();
          }
        };

        _proto.createUI = /*#__PURE__*/function () {
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

        _proto.loadPrefab = /*#__PURE__*/function () {
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

        _proto.showScreen = function showScreen(ctor, data, force) {
          if (force === void 0) {
            force = false;
          }

          return this.show(ctor, UIType.Screen, data, force);
        };

        _proto.showPopup = function showPopup(ctor, data, force) {
          if (force === void 0) {
            force = false;
          }

          return this.show(ctor, UIType.Popup, data, force);
        };

        _proto.showNotify = function showNotify(ctor, data, force) {
          if (force === void 0) {
            force = false;
          }

          return this.show(ctor, UIType.Notify, data, force);
        };

        _proto.showOverlap = function showOverlap(ctor, data, force) {
          if (force === void 0) {
            force = false;
          }

          return this.show(ctor, UIType.Overlap, data, force);
        };

        _proto.getExistUI = function getExistUI(ctor) {
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

        _proto.onDepositButtonClick = function onDepositButtonClick() {
          GameManager.instance.playerMoney += 10000;
        };

        _proto.onWithdrawButtonClick = function onWithdrawButtonClick() {
          GameManager.instance.playerMoney -= 10000;
        };

        return UIManager;
      }(BaseManager), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "depositButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "withdrawButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cScreen", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cPopup", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "cOverlap", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "cNotify", [_dec7], {
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
System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts', './BaseManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioSource, resources, AudioClip, GameManager, BaseManager;

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
      GameManager = module.GameManager;
    }, function (module) {
      BaseManager = module.BaseManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "0a383mirudJSZ0BrbaVKYLL", "AudioManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AudioManager = exports('AudioManager', (_dec = ccclass('AudioManager'), _dec2 = property(AudioSource), _dec3 = property(AudioSource), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(AudioManager, _BaseManager);

        function AudioManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;
          _this._soundMap = new Map();
          _this._audioSources = [];

          _initializerDefineProperty(_this, "audioSFXSource", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audioBGMSource", _descriptor2, _assertThisInitialized(_this));

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

        _proto.playBGM = function playBGM(key, volume) {
          if (volume === void 0) {
            volume = .5;
          }

          if (!GameManager.instance.isSEOn) {
            this.stopBGM();
            return;
          }

          var clip = this._soundMap.get(key);

          if (!clip) {
            console.warn("\u26A0\uFE0F Can't find audio with key: " + key);
            return;
          }

          this.audioBGMSource.loop = true;
          this.audioBGMSource.volume = volume;
          this.audioBGMSource.clip = clip;
          this.audioBGMSource.play();
        };

        _proto.stopBGM = function stopBGM() {
          this.audioBGMSource.loop = false;
          this.audioBGMSource.stop();
        };

        _proto.playSFXEffect = function playSFXEffect(key, volume) {
          if (volume === void 0) {
            volume = 1;
          }

          if (!GameManager.instance.isSEOn) return;

          var clip = this._soundMap.get(key);

          if (!clip) {
            console.warn("\u26A0\uFE0F Can't find audio with key: " + key);
            return;
          }

          var source = this._audioSources.find(function (s) {
            return !s.playing;
          });

          if (!source) {
            source = this.node.addComponent(AudioSource);

            this._audioSources.push(source);
          }

          source.playOneShot(clip, volume);
        };

        return AudioManager;
      }(BaseManager), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioSFXSource", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "audioBGMSource", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioNames.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "f0232AIaLFLx4l3iy9+Nas2", "AudioNames", undefined);

      var ccclass = _decorator.ccclass;
      var AudioNames = exports('AudioNames', (_dec = ccclass('AudioNames'), _dec(_class = (_class2 = function AudioNames() {}, _class2.BGM = 'bgm', _class2.CHIP_LONG = 'chipLong', _class2.CHIP_SHORT = 'chipShort', _class2.CLOSE_BET = 'stopWager', _class2.PAYOUT = 'payout', _class2.SELECT_CHIP = 'selectChip', _class2.START_BET = 'beginWager', _class2.WARNING_TIME = 'warningTime', _class2.WIN_CHIP = 'winChip', _class2.ROLL_DICE = 'rollDice', _class2.RESULT_SMALL = 'resultSmall', _class2.RESULT_BIG = 'resultBig', _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseButtonBet.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ObserverManager.ts', './GameManager.ts', './ScreenSmallTable.ts', './NetworkManager.ts', './BubbleLabel.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Enum, Button, Node, Vec3, Color, tween, Tween, Component, ObserverManager, ObserverType, GameManager, BetButtonType, BetSide, NetworkManager, BubbleLabel;

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
      Enum = module.Enum;
      Button = module.Button;
      Node = module.Node;
      Vec3 = module.Vec3;
      Color = module.Color;
      tween = module.tween;
      Tween = module.Tween;
      Component = module.Component;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverType = module.ObserverType;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      BetButtonType = module.BetButtonType;
      BetSide = module.BetSide;
    }, function (module) {
      NetworkManager = module.NetworkManager;
    }, function (module) {
      BubbleLabel = module.BubbleLabel;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "76942BiyVJBfboSfD3PyAZs", "BaseButtonBet", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BaseButtonBet = exports('BaseButtonBet', (_dec = ccclass('BaseButtonBet'), _dec2 = property({
        type: Enum(BetButtonType),
        group: 'Buttons'
      }), _dec3 = property({
        type: Button,
        group: 'Buttons'
      }), _dec4 = property({
        type: BubbleLabel,
        group: 'VFX'
      }), _dec5 = property({
        type: Node,
        group: 'VFX'
      }), _dec6 = property({
        type: Node,
        group: 'VFX'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BaseButtonBet, _Component);

        function BaseButtonBet() {
          var _this$BetSideMap;

          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.BetSideMap = (_this$BetSideMap = {}, _this$BetSideMap[BetButtonType.BIG] = BetSide.BIG, _this$BetSideMap[BetButtonType.SMALL] = BetSide.SMALL, _this$BetSideMap);
          _this._canBet = false;

          _initializerDefineProperty(_this, "betButtonType", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "betButton", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bubbleLabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "onResultEffectNode", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bubbleLabelPositionNode", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = BaseButtonBet.prototype;

        _proto.onLoad = function onLoad() {
          ObserverManager.instance.on(ObserverType.NUMBER_CHIP_TO_BET, this.onNumberChipToBet, this);
          ObserverManager.instance.on(ObserverType.ON_RESULT_EFFECT, this.onResultEffect, this);
          ObserverManager.instance.on(ObserverType.CAN_BET, this.canBet, this);
          this.betButton.node.on(Button.EventType.CLICK, this.onClick, this);
        };

        _proto.start = function start() {
          this.onNumberChipToBet(GameManager.instance.numberChipToBet);
          this._canBet = false;
        };

        _proto.onDestroy = function onDestroy() {
          ObserverManager.instance.off(ObserverType.NUMBER_CHIP_TO_BET, this.onNumberChipToBet, this);
          ObserverManager.instance.off(ObserverType.ON_RESULT_EFFECT, this.onResultEffect, this);
          ObserverManager.instance.off(ObserverType.CAN_BET, this.canBet, this);
          this.betButton.node.off(Button.EventType.CLICK, this.onClick, this);
        };

        _proto.onNumberChipToBet = function onNumberChipToBet(numberChipToBet) {
          this.betButton.interactable = numberChipToBet > 0;
        };

        _proto.canBet = function canBet(_canBet) {
          if (GameManager.instance.is(_canBet, 'boolean')) {
            console.log("canBet " + _canBet);
            this._canBet = _canBet;
          }
        };

        _proto.DeActivateBetButtons = /*#__PURE__*/function () {
          var _DeActivateBetButtons = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this.betButton.interactable = false;
                    _context.next = 3;
                    return GameManager.instance.delay(200);

                  case 3:
                    this.betButton.interactable = true;

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function DeActivateBetButtons() {
            return _DeActivateBetButtons.apply(this, arguments);
          }

          return DeActivateBetButtons;
        }();

        _proto.SendBetInfoToServer = function SendBetInfoToServer(betNumber) {
          if (GameManager.instance.playerBalance >= betNumber) {
            GameManager.instance.playerBalance -= betNumber;
            var req = {
              roundId: '',
              side: this.BetSideMap[this.betButtonType],
              amount: betNumber
            };

            try {
              NetworkManager.instance.placeBet(req);
            } catch (e) {
              console.error('PLACE_BET error', e);
            }
          } else this.bubbleLabel.show('Not enough money', this.bubbleLabelPositionNode.worldPosition, Vec3.UP, Color.RED, 18, false, null);
        };

        _proto.onClick = function onClick() {
          if (!this._canBet) return;

          if (GameManager.instance.numberChipToBet <= 0) {
            this.bubbleLabel.show('Select chip to bet', this.bubbleLabelPositionNode.worldPosition, Vec3.UP, Color.YELLOW, 18, false, null);
            return;
          }

          this.DeActivateBetButtons();
        };

        _proto.onResultEffect = function onResultEffect(data) {
          if (GameManager.instance.is(data, BetSide)) {
            if (data !== this.BetSideMap[this.betButtonType]) return;
            this.onResultEffectNode.active = true;
            tween(this.onResultEffectNode).repeatForever(tween().to(.5, {
              scale: Vec3.ONE.clone().multiplyScalar(.98)
            }).to(.5, {
              scale: Vec3.ONE.clone().multiplyScalar(1.02)
            })).start();
          } else if (GameManager.instance.is(data, 'boolean')) {
            this.onResultEffectNode.active = data;
            Tween.stopAllByTarget(this.onResultEffectNode);
          }
        };

        return BaseButtonBet;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "betButtonType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return BetButtonType.BIG;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "betButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bubbleLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "onResultEffectNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bubbleLabelPositionNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, _decorator, director, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "cbba5WsaJxBhopqtix7F4sA", "BaseManager", undefined);

      var ccclass = _decorator.ccclass;
      var BaseManager = exports('BaseManager', (_dec = ccclass('BaseManager'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BaseManager, _Component);

        function BaseManager() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = BaseManager.prototype;

        _proto.onLoad = function onLoad() {
          var clazz = this.constructor;

          if (BaseManager._instances.has(clazz)) {
            console.warn("[" + clazz.name + "] already exists, destroying duplicate");
            this.node.destroy();
            return;
          }

          BaseManager._instances.set(clazz, this);

          director.addPersistRootNode(this.node);
        };

        _createClass(BaseManager, null, [{
          key: "instance",
          get: function get() {
            var inst = BaseManager._instances.get(this);

            if (!inst) console.warn("[" + this.name + "] instance not initialized yet!");
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

System.register("chunks:///_virtual/BigBetButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseButtonBet.ts', './ObserverManager.ts', './GameManager.ts', './AudioManager.ts', './AudioNames.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, BaseButtonBet, ObserverManager, ObserverType, GameManager, AudioManager, AudioNames;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      BaseButtonBet = module.BaseButtonBet;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverType = module.ObserverType;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      AudioNames = module.AudioNames;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "b5899qf62dBRqrjpJMfeqKH", "BigBetButton", undefined);

      var ccclass = _decorator.ccclass;
      var BigBetButton = exports('BigBetButton', (_dec = ccclass('BigBetButton'), _dec(_class = /*#__PURE__*/function (_BaseButtonBet) {
        _inheritsLoose(BigBetButton, _BaseButtonBet);

        function BigBetButton() {
          return _BaseButtonBet.apply(this, arguments) || this;
        }

        var _proto = BigBetButton.prototype;

        _proto.onClick = function onClick() {
          _BaseButtonBet.prototype.onClick.call(this);

          if (!this._canBet) return;
          AudioManager.instance.playSFXEffect(AudioNames.CHIP_SHORT);
          this.SendBetInfoToServer(GameManager.instance.numberChipToBet);
          ObserverManager.instance.emit(ObserverType.SAVE_LAST_BET, {
            betSide: this.BetSideMap[this.betButtonType],
            betAmount: GameManager.instance.numberChipToBet
          });
        };

        return BigBetButton;
      }(BaseButtonBet)) || _class));

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

          _this.DURATION = .5;
          return _this;
        }

        var _proto = BubbleLabel.prototype;

        _proto.show = function show(text, worldPosition, direction, color, fontSize, isFloat, callback, duration) {
          var _this2 = this;

          if (duration === void 0) {
            duration = this.DURATION;
          }

          Tween.stopAllByTarget(this.node);
          console.log('show bubble label ' + text);
          this.node.active = true;
          this.label.string = text;
          this.label.color = color;
          this.label.fontSize = fontSize;
          this.node.setWorldPosition(worldPosition);
          this.node.setScale(1, 1, 1);
          var dir = direction.clone();
          dir.normalize();
          var targetPos = this.node.getPosition().clone().add(dir.multiplyScalar(50));
          tween(this.node).parallel(tween().target(this.node).to(duration, {
            scale: new Vec3(1.5, 1.5, 1.5)
          }, {
            easing: 'quadOut'
          }), isFloat ? tween().target(this.node).to(duration, {
            position: targetPos
          }, {
            easing: 'quartInOut'
          }) : null).call(function () {
            tween(_this2.node).to(duration, {
              scale: new Vec3(0.01, 0.01, 0.01)
            }, {
              easing: 'quadOut'
            }).call(function () {
              _this2.node.active = false;
              callback == null ? void 0 : callback();
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

System.register("chunks:///_virtual/ChipButtonEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, tween, Vec3, Tween, Component;

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
      tween = module.tween;
      Vec3 = module.Vec3;
      Tween = module.Tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "be1c8GYwvhH/Kr7v5Wk0qWE", "ChipButtonEffect", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ChipButtonEffect = exports('ChipButtonEffect', (_dec = ccclass('ChipButtonEffect'), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ChipButtonEffect, _Component);

        function ChipButtonEffect() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "lightEffect", _descriptor, _assertThisInitialized(_this));

          _this._isShow = false;
          return _this;
        }

        var _proto = ChipButtonEffect.prototype;

        _proto.showEffect = function showEffect() {
          this.lightEffect.active = true;
          this._isShow = true;
          tween(this.lightEffect).repeatForever(tween().target(this.lightEffect).to(.5, {
            scale: Vec3.ONE.clone().multiplyScalar(1.02)
          }).target(this.lightEffect).to(.5, {
            scale: Vec3.ONE.clone().multiplyScalar(.98)
          })).start();
        };

        _proto.hideEffect = function hideEffect() {
          this.lightEffect.active = false;
          Tween.stopAllByTarget(this.lightEffect);
          this._isShow = false;
        };

        _proto.isShowEffect = function isShowEffect() {
          return this._isShow;
        };

        return ChipButtonEffect;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "lightEffect", [_dec2], {
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

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Sprite, SpriteFrame, Component, ObserverManager, ObserverType;

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
      ObserverType = module.ObserverType;
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
          ObserverManager.instance.on(ObserverType.DOT_RESULT, this.updateDotResult, this);
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

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIManager.ts', './ObserverManager.ts', './OverlapLoading.ts', './NotifyWSReconnect.ts', './LiveData.ts', './PlayerManager.ts', './NetworkManager.ts', './BaseManager.ts', './AudioManager.ts', './AudioNames.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, _decorator, UIManager, ObserverManager, ObserverType, OverlapLoading, OverlapType, NotifyWSReconnect, NotifyWSReconnectType, LiveData, PlayerManager, NetworkManager, BaseManager, AudioManager, AudioNames;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverType = module.ObserverType;
    }, function (module) {
      OverlapLoading = module.OverlapLoading;
      OverlapType = module.OverlapType;
    }, function (module) {
      NotifyWSReconnect = module.NotifyWSReconnect;
      NotifyWSReconnectType = module.NotifyWSReconnectType;
    }, function (module) {
      LiveData = module.LiveData;
    }, function (module) {
      PlayerManager = module.PlayerManager;
    }, function (module) {
      NetworkManager = module.NetworkManager;
    }, function (module) {
      BaseManager = module.BaseManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      AudioNames = module.AudioNames;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "40180YDy31EiLfLZk/m3Ezf", "GameManager", undefined);

      var ccclass = _decorator.ccclass;
      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec(_class = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(GameManager, _BaseManager);

        function GameManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;
          _this._isSEOn = true;
          _this._playerBalance = 0;
          _this._numberChipToBet = 0;
          _this.isSEOnData = LiveData.create('isSEOn', true);
          return _this;
        }

        var _proto = GameManager.prototype; //#endregion
        //#endregion
        //#region Lifecycle

        _proto.onLoad = function onLoad() {
          _BaseManager.prototype.onLoad.call(this);

          ObserverManager.instance.on(ObserverType.WS_OPEN, this.onWSOpen, this);
          ObserverManager.instance.on(ObserverType.WS_CLOSE, this.onWSClose, this);
          ObserverManager.instance.on(ObserverType.WS_ERROR, this.onError, this);
          ObserverManager.instance.on(ObserverType.LOGIN, this.onLogin, this);
        };

        _proto.start = function start() {
          console.log("gamemanager start");
          NetworkManager.instance.connect(); // UIManager.instance.showOverlap(OverlapLoading, OverlapType.ShowScreenHome, true);

          UIManager.instance.showOverlap(OverlapLoading, OverlapType.ShowScreenSmallTable, true);
          this.fakeDataPlayer();
        };

        _proto.onDestroy = function onDestroy() {
          ObserverManager.instance.off(ObserverType.WS_OPEN, this.onWSOpen, this);
          ObserverManager.instance.off(ObserverType.WS_CLOSE, this.onWSClose, this);
          ObserverManager.instance.off(ObserverType.WS_ERROR, this.onError, this);
          ObserverManager.instance.off(ObserverType.LOGIN, this.onLogin, this);
        } //#endregion
        //#region Utils
        ;

        _proto.delay = function delay(ms) {
          return new Promise(function (resolve) {
            return setTimeout(resolve, ms);
          });
        };

        _proto.waitUntil = function waitUntil(check, interval) {
          if (interval === void 0) {
            interval = 50;
          }

          return new Promise(function (resolve) {
            var timer = setInterval(function () {
              if (check()) {
                clearInterval(timer);
                resolve();
              }
            }, interval);
          });
        };

        _proto.formatNumber = function formatNumber(value) {
          return value.toLocaleString('de-DE', {
            maximumFractionDigits: 0
          });
        };

        _proto.convertNumberToString = function convertNumberToString(value) {
          if (value >= 1000000000) {
            return (value / 1000000000).toFixed(value % 1000000000 === 0 ? 0 : 1) + 'B';
          } else if (value >= 1000000) {
            return (value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1) + 'M';
          } else if (value >= 1000) {
            return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + 'K';
          } else return value.toString();
        };

        _proto.is = function is(value, type) {
          // primitive
          if (type === "string") return typeof value === "string";
          if (type === "number") return typeof value === "number";
          if (type === "boolean") return typeof value === "boolean";
          if (type === "array") return Array.isArray(value); // class / constructor

          if (typeof type === "function") return value instanceof type; // enum (string or numeric)

          if (typeof type === "object" && type !== null) {
            var allValues = Object.values(type);
            var finalValues = allValues.filter(function (v) {
              return typeof v !== "string" || !allValues.includes(Number(v));
            });
            return finalValues.includes(value);
          }

          return false;
        } //#endregion
        //#region LiveData
        ; //#endregion
        //#region Listeners


        _proto.onWSOpen = function onWSOpen() {
          var _UIManager$instance$g;

          console.log("------------- WS Open -------------");
          (_UIManager$instance$g = UIManager.instance.getExistUI(NotifyWSReconnect)) == null ? void 0 : _UIManager$instance$g.hide();

          try {
            console.log("------------- Login to server -------------");
            NetworkManager.instance.loginToServer();
          } catch (e) {
            console.error('Login request error', e);
          }
        };

        _proto.onWSClose = function onWSClose() {
          console.log("------------- WS Close -------------");
          UIManager.instance.showNotify(NotifyWSReconnect, NotifyWSReconnectType.Disconnected, true);
        };

        _proto.onError = function onError(data) {
          console.log("onError data:", data);
        };

        _proto.onLogin = function onLogin(data) {
          var _UIManager$instance$g2;

          console.log("------------- Logged in -------------");
          (_UIManager$instance$g2 = UIManager.instance.getExistUI(NotifyWSReconnect)) == null ? void 0 : _UIManager$instance$g2.hide();
        } //#endregion
        ;

        _proto.fakeDataPlayer = function fakeDataPlayer() {
          for (var i = 1; i <= 10; i++) {
            PlayerManager.addPlayer({
              id: 1000 + i,
              name: 'Player ' + i,
              balance: Math.floor(Math.random() * 1000000)
            });
          }
        };

        _createClass(GameManager, [{
          key: "isSEOn",
          get: function get() {
            return this._isSEOn;
          },
          set: function set(value) {
            this._isSEOn = value;
            this.isSEOnData.set(this._isSEOn);
            if (this._isSEOn) AudioManager.instance.playBGM(AudioNames.BGM);else AudioManager.instance.stopBGM();
          }
        }, {
          key: "playerBalance",
          get: function get() {
            return this._playerBalance;
          },
          set: function set(value) {
            this._playerBalance = value;
            ObserverManager.instance.emit(ObserverType.PLAYER_BALANCE, this._playerBalance);
          }
        }, {
          key: "numberChipToBet",
          get: function get() {
            return this._numberChipToBet;
          },
          set: function set(value) {
            this._numberChipToBet = value;
            ObserverManager.instance.emit(ObserverType.NUMBER_CHIP_TO_BET, this._numberChipToBet);
          }
        }]);

        return GameManager;
      }(BaseManager)) || _class));

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
          this._key = void 0;
          this.setter = void 0;
          this.getter = void 0;
          this._defaultValue = void 0;
          this._bindings = [];
          this._key = key;
          this.setter = setter;
          this.getter = getter;
          this._defaultValue = defaultValue;
        }

        LiveData.create = function create(key, defaultValue) {
          var type = typeof defaultValue;

          if (type === "number") {
            return new LiveData(key, function (k, v) {
              return localStorage.setItem(k, String(v));
            }, function (k) {
              var v = localStorage.getItem(k);
              if (v === null || v === undefined) return defaultValue;
              var num = Number(v);
              return isNaN(num) ? defaultValue : num;
            }, defaultValue);
          } else if (type === "string") {
            return new LiveData(key, function (k, v) {
              return localStorage.setItem(k, v);
            }, function (k) {
              var v = localStorage.getItem(k);
              return v !== null ? v : defaultValue;
            }, defaultValue);
          } else if (type === "boolean") {
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

          this.setter(this._key, value);
          if (notify) this._bindings.forEach(function (cb) {
            return cb(value);
          });
        };

        _proto.get = function get() {
          var v = localStorage.getItem(this._key);

          if (v === null) {
            console.warn("LiveData: " + this._key + " not found, return default: " + this._defaultValue);
            return this._defaultValue;
          }

          return this.getter(this._key);
        };

        _proto.binding = function binding(callback, invokeImmediately) {
          if (invokeImmediately === void 0) {
            invokeImmediately = true;
          }

          if (!this._bindings.includes(callback)) {
            this._bindings.push(callback);

            if (invokeImmediately) callback(this.get());
          }
        };

        _proto.unbinding = function unbinding(callback) {
          var index = this._bindings.indexOf(callback);

          if (index !== -1) this._bindings.splice(index, 1);
        };

        return LiveData;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./BaseButtonBet.ts', './BigBetButton.ts', './SmallBetButton.ts', './AudioManager.ts', './BaseManager.ts', './GameManager.ts', './NetworkManager.ts', './ObserverManager.ts', './UIManager.ts', './BaseNotify.ts', './BaseOverlap.ts', './BasePopup.ts', './BaseScreen.ts', './BaseUI.ts', './NotifyWSReconnect.ts', './OverlapLoading.ts', './PopupHelp.ts', './PopupPlayerInRoom.ts', './PopupResultHistory.ts', './PopupSettings.ts', './PopupWaiting.ts', './ScreenHome.ts', './ScreenSmallTable.ts', './AudioNames.ts', './BubbleLabel.ts', './ChipButtonEffect.ts', './DotResult.ts', './LiveData.ts', './MenuButton.ts', './OptionButton.ts', './PlayerManager.ts', './PlayerUIElement.ts', './ResultHistoryElement.ts', './ToggleEventButton.ts', './protocol.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MenuButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIManager.ts', './PopupHelp.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Node, Component, UIManager, PopupHelp;

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
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      PopupHelp = module.PopupHelp;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "5d648t5C6RM6bv73MYYEouk", "MenuButton", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MenuButton = exports('MenuButton', (_dec = ccclass('MenuButton'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MenuButton, _Component);

        function MenuButton() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "menuButton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "closeMenuButton", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "ruleButton", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "menuPanel", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MenuButton.prototype;

        _proto.onLoad = function onLoad() {
          this.menuButton.node.on(Button.EventType.CLICK, this.onMenuButtonClick, this);
          this.closeMenuButton.node.on(Button.EventType.CLICK, this.onCloseMenuButtonClick, this);
          this.ruleButton.node.on(Button.EventType.CLICK, this.onRuleButtonClick, this);
        };

        _proto.onDestroy = function onDestroy() {
          this.menuButton.node.off(Button.EventType.CLICK, this.onMenuButtonClick, this);
          this.closeMenuButton.node.off(Button.EventType.CLICK, this.onCloseMenuButtonClick, this);
          this.ruleButton.node.off(Button.EventType.CLICK, this.onRuleButtonClick, this);
        };

        _proto.onMenuButtonClick = function onMenuButtonClick() {
          this.menuPanel.active = true;
        };

        _proto.onCloseMenuButtonClick = function onCloseMenuButtonClick() {
          this.menuPanel.active = false;
        };

        _proto.onRuleButtonClick = function onRuleButtonClick() {
          this.onCloseMenuButtonClick();
          UIManager.instance.showPopup(PopupHelp, null, true);
        };

        return MenuButton;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "menuButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "closeMenuButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ruleButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "menuPanel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetworkManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseManager.ts', './ObserverManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, BaseManager, ObserverManager, ObserverType;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      BaseManager = module.BaseManager;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverType = module.ObserverType;
    }],
    execute: function () {
      exports('WSState', void 0);

      var _dec, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "9b0c5CjdINNK6fmDduUDAEe", "NetworkManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var WSState;

      (function (WSState) {
        WSState[WSState["DISCONNECTED"] = 0] = "DISCONNECTED";
        WSState[WSState["CONNECTING"] = 1] = "CONNECTING";
        WSState[WSState["CONNECTED"] = 2] = "CONNECTED";
      })(WSState || (WSState = exports('WSState', {})));

      var NetworkManager = exports('NetworkManager', (_dec = ccclass('NetworkManager'), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(NetworkManager, _BaseManager);

        function NetworkManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "serverURL", _descriptor, _assertThisInitialized(_this));

          _this.ResponseCode = {
            LOGIN: 1,
            LOGOUT: 2,
            JOIN_ROOM: 3,
            LEAVE_ROOM: 4,
            EXTENSION: 5,
            PING: 6
          };
          _this.RequestCode = {
            LOGIN: 1,
            LOGOUT: 2,
            JOIN_ROOM: 3,
            LEAVE_ROOM: 4,
            ROOM: 5,
            ZONE: 6,
            PING: 7
          };
          _this.StatusType = {
            BETTING_OPEN: 'BETTING_OPEN',
            BETTING_CLOSE: 'BETTING_CLOSE'
          };
          _this.ActionType = {
            LOGIN: 'login',
            NEW_ROUND: 'new_round',
            ROUND_STATE: 'round_state',
            REVEAL_RESULT: 'reveal_result',
            PAYOUT: 'payout',
            PLACE_BET: 'place_bet',
            BET_ACCEPTED: 'bet_accepted',
            GET_PLAYER_INFO: 'get_user_info',
            GET_TABLE_INFO: 'get_table_info'
          };
          _this._socket = null;
          _this.STATE = WSState.DISCONNECTED;
          _this._zone = "SicboZone";
          _this._plugin = "sicboPlugin";
          _this._username = "user_test";
          _this._password = "pw_123";
          return _this;
        }

        var _proto = NetworkManager.prototype; //#endregion
        //#region Core

        _proto.connect = function connect() {
          var _this2 = this;

          console.log("Connecting to server...");
          this._socket = new WebSocket(this.serverURL);

          this._socket.onopen = function () {
            console.log("✅ WS Connected");
            _this2.STATE = WSState.CONNECTED;
            ObserverManager.instance.emit(ObserverType.WS_OPEN);
          };

          this._socket.onclose = function () {
            console.warn("❌ WS Closed");
            _this2.STATE = WSState.DISCONNECTED;
            ObserverManager.instance.emit(ObserverType.WS_CLOSE);
          };

          this._socket.onerror = function (e) {
            console.error("❌ WS Error", e);
            ObserverManager.instance.emit(ObserverType.WS_ERROR, e);
          };

          this._socket.onmessage = function (msg) {
            _this2.handleMessage(msg.data);
          };
        };

        _proto.handleMessage = function handleMessage(raw) {
          var data;

          try {
            data = JSON.parse(raw);
          } catch (_unused) {
            console.log("❌ Invalid JSON format", raw);
            return;
          }

          console.log("⬇ Server:", data);
          var opcode = data[0];

          switch (opcode) {
            case this.ResponseCode.LOGIN:
              var loginData = {
                success: data[1],
                errorCode: data[2],
                username: data[3],
                zoneName: data[4],
                message: data[5]
              };
              ObserverManager.instance.emit(ObserverType.LOGIN, loginData);
              break;

            case this.ResponseCode.LOGOUT:
              var logoutData = {
                success: data[1],
                reason: data[2]
              };
              ObserverManager.instance.emit(ObserverType.LOGOUT, logoutData);
              break;

            case this.RequestCode.JOIN_ROOM:
              var joinRoomData = {
                success: data[1],
                errorCode: data[2],
                roomId: data[3],
                message: data[4]
              };
              ObserverManager.instance.emit(ObserverType.JOIN_ROOM, joinRoomData);
              break;

            case this.ResponseCode.LEAVE_ROOM:
              var leaveRoomData = {
                success: data[1],
                errorCode: data[2],
                roomId: data[3],
                reason: data[4]
              };
              ObserverManager.instance.emit(ObserverType.LEAVE_ROOM, leaveRoomData);
              break;

            case this.ResponseCode.EXTENSION:
              var param = data[1];

              if ((param == null ? void 0 : param.action) === this.ActionType.NEW_ROUND) {
                var newRoundData = {
                  action: param.action
                };
                ObserverManager.instance.emit(ObserverType.NEW_ROUND, newRoundData);
              }

              if ((param == null ? void 0 : param.action) === this.ActionType.GET_TABLE_INFO) {
                var _param$datas$betInfo, _param$datas$historie, _tableBetInfoData$amo, _tableBetInfoData$amo2;

                var tableData = param.datas.tableInfo;
                var tableBetInfoData = (_param$datas$betInfo = param.datas.betInfo) != null ? _param$datas$betInfo : null;
                var tableHistoriesData = this.normalizeHistoryResult((_param$datas$historie = param.datas.histories) != null ? _param$datas$historie : []);
                var tableInfoData = {
                  roundId: tableData.roundId,
                  elapsedTime: tableData.elapsedTime,
                  status: tableData.status,
                  totalBigBet: tableData.totalBetBig,
                  totalSmallBet: tableData.totalBetSmall,
                  totalPlayerBigBet: tableData.betPlayerBig,
                  totalPlayerSmallBet: tableData.betPlayerSmall,
                  numberBigBetOfPlayer: (_tableBetInfoData$amo = tableBetInfoData == null ? void 0 : tableBetInfoData.amountBig) != null ? _tableBetInfoData$amo : 0,
                  numberSmallBetOfPlayer: (_tableBetInfoData$amo2 = tableBetInfoData == null ? void 0 : tableBetInfoData.amountSmall) != null ? _tableBetInfoData$amo2 : 0,
                  history: tableHistoriesData,
                  result: tableData.result,
                  dice: tableData.dice,
                  sum: tableData.sum
                };
                ObserverManager.instance.emit(ObserverType.GET_TABLE_INFO, tableInfoData);
              }

              if ((param == null ? void 0 : param.action) === this.ActionType.GET_PLAYER_INFO) {
                var _param$payload$chipSe;

                var playerInfoData = {
                  tableId: param.payload.tableId,
                  balance: param.payload.balance,
                  chipSet: (_param$payload$chipSe = param.payload.chipSet) != null ? _param$payload$chipSe : []
                };
                ObserverManager.instance.emit(ObserverType.GET_PLAYER_INFO, playerInfoData);
              }

              if ((param == null ? void 0 : param.action) === this.ActionType.BET_ACCEPTED) {
                var betAcceptedData = {
                  roundId: param.payload.roundId,
                  side: param.payload.side,
                  amount: param.payload.amount,
                  bigBetTotal: param.payload.totalBetBig,
                  smallBetTotal: param.payload.totalBetSmall,
                  numberPlayerBigBet: param.payload.betPlayerBig,
                  numberPlayerSmallBet: param.payload.betPlayerSmall,
                  numberBigBetOfPlayer: param.payload.betInfo.amountBig,
                  numberSmallBetOfPlayer: param.payload.betInfo.amountSmall
                };
                ObserverManager.instance.emit(ObserverType.BET_ACCEPTED, betAcceptedData);
              }

              if ((param == null ? void 0 : param.action) === this.ActionType.REVEAL_RESULT) {
                var resultData = {
                  roundId: param.payload.roundId,
                  result: param.payload.result,
                  dice: param.payload.dice,
                  sum: param.payload.sum
                };
                ObserverManager.instance.emit(ObserverType.REVEAL_RESULT, resultData);
              }

              if ((param == null ? void 0 : param.action) === this.ActionType.PAYOUT) {
                var payoutData = {
                  roundId: param.payload.roundId,
                  betId: param.payload.betId,
                  payout: param.payload.payout
                };
                ObserverManager.instance.emit(ObserverType.PAYOUT, payoutData);
              }

              if ((param == null ? void 0 : param.action) === this.ActionType.ROUND_STATE) {
                if (param.payload.status === this.StatusType.BETTING_OPEN) {
                  var bettingOpenData = {
                    roundId: param.payload.roundId,
                    elapsedTime: param.payload.elapsedTime
                  };
                  ObserverManager.instance.emit(ObserverType.BETTING_OPEN, bettingOpenData);
                }

                if (param.payload.status === this.StatusType.BETTING_CLOSE) {
                  var bettingCloseData = {
                    roundId: param.payload.roundId
                  };
                  ObserverManager.instance.emit(ObserverType.BETTING_CLOSE, bettingCloseData);
                }
              }

              break;

            case this.ResponseCode.PING:
              var pingData = {
                id: data[1],
                timestamp: data[2]
              };
              ObserverManager.instance.emit(ObserverType.PING, pingData);
              break;
          }
        };

        _proto.normalizeHistoryResult = function normalizeHistoryResult(arr) {
          if (!arr || !Array.isArray(arr)) {
            return new Array(60).fill(0);
          }

          var results = arr.map(function (item) {
            if ((item == null ? void 0 : item.sum) != null && (item == null ? void 0 : item.sum) != undefined) return item == null ? void 0 : item.sum;else return 0;
          });
          var last60 = results.slice(-60);

          if (last60.length < 60) {
            var missing = 60 - last60.length;
            return Array.from({
              length: missing
            }, function () {
              return Math.floor(Math.random() * 16) + 3;
            }).concat(last60);
          }

          return last60;
        };

        _proto.send = function send(arr) {
          if (!this._socket || this.STATE !== WSState.CONNECTED) return;
          var packet = JSON.stringify(arr);
          console.log("⬆ Client:", arr);

          this._socket.send(packet);
        } //#endregion
        //#region Shortcuts
        ;

        _proto.loginToServer = function loginToServer() {
          this.send([this.RequestCode.LOGIN, this._zone, this._username, this._password, {
            action: this.ActionType.LOGIN
          }]);
        };

        _proto.getPlayerInfo = function getPlayerInfo() {
          this.send([this.RequestCode.ZONE, this._zone, this._plugin, {
            action: this.ActionType.GET_PLAYER_INFO
          }]);
        };

        _proto.getTableInfo = function getTableInfo() {
          this.send([this.RequestCode.ZONE, this._zone, this._plugin, {
            action: this.ActionType.GET_TABLE_INFO
          }]);
        };

        _proto.placeBet = function placeBet(payload) {
          this.send([this.RequestCode.ZONE, this._zone, this._plugin, {
            action: this.ActionType.PLACE_BET,
            payload: payload
          }]);
        } //#endregion
        ;

        return NetworkManager;
      }(BaseManager), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "serverURL", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "ws://192.168.1.13:8892/websocket";
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NotifyWSReconnect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseNotify.ts', './UIManager.ts', './OverlapLoading.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, BaseNotify, UIManager, OverlapLoading, OverlapType;

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
    }, function (module) {
      BaseNotify = module.BaseNotify;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      OverlapLoading = module.OverlapLoading;
      OverlapType = module.OverlapType;
    }],
    execute: function () {
      exports('NotifyWSReconnectType', void 0);

      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "756701uFVNDP7eRt5vErKt5", "NotifyWSReconnect", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var NotifyWSReconnectType;

      (function (NotifyWSReconnectType) {
        NotifyWSReconnectType[NotifyWSReconnectType["None"] = 0] = "None";
        NotifyWSReconnectType[NotifyWSReconnectType["Disconnected"] = 1] = "Disconnected";
      })(NotifyWSReconnectType || (NotifyWSReconnectType = exports('NotifyWSReconnectType', {})));

      var NotifyWSReconnect = exports('NotifyWSReconnect', (_dec = ccclass('NotifyWSReconnect'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseNotify) {
        _inheritsLoose(NotifyWSReconnect, _BaseNotify);

        function NotifyWSReconnect() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseNotify.call.apply(_BaseNotify, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "infoLabel", _descriptor, _assertThisInitialized(_this));

          _this._dotCount = 0;
          _this._baseLoadingText = "Connecting to server";
          _this._type = NotifyWSReconnectType.None;
          return _this;
        }

        var _proto = NotifyWSReconnect.prototype;

        _proto.init = function init() {
          _BaseNotify.prototype.init.call(this);
        };

        _proto.show = function show(data) {
          var _data$type;

          _BaseNotify.prototype.show.call(this, data);

          this._type = (_data$type = data == null ? void 0 : data.type) != null ? _data$type : NotifyWSReconnectType.None;
          this._dotCount = 0;
          this.schedule(this.updateDots, 0.5);
        };

        _proto.hide = function hide() {
          _BaseNotify.prototype.hide.call(this);

          this.unschedule(this.updateDots);
          if (this._type == NotifyWSReconnectType.Disconnected) UIManager.instance.showOverlap(OverlapLoading, OverlapType.LoadingScene, true);
        };

        _proto.updateDots = function updateDots() {
          this._dotCount = (this._dotCount + 1) % 4;
          var dots = '.'.repeat(this._dotCount);
          this.infoLabel.string = this._baseLoadingText + dots;
        };

        return NotifyWSReconnect;
      }(BaseNotify), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "infoLabel", [_dec2], {
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

System.register("chunks:///_virtual/ObserverManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseManager.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, EventTarget, BaseManager;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventTarget = module.EventTarget;
    }, function (module) {
      BaseManager = module.BaseManager;
    }],
    execute: function () {
      exports('ObserverType', void 0);

      var _dec, _class;

      cclegacy._RF.push({}, "6fa20vSieBO2YX1tHxHZCGP", "ObserverManager", undefined);

      var ccclass = _decorator.ccclass;
      var ObserverType;

      (function (ObserverType) {
        ObserverType["PLAYER_BALANCE"] = "playerBalance";
        ObserverType["NUMBER_CHIP_TO_BET"] = "numberChipToBet";
        ObserverType["SAVE_LAST_BET"] = "saveLastBet";
        ObserverType["ON_RESULT_EFFECT"] = "onResultEffect";
        ObserverType["CAN_BET"] = "canBet";
        ObserverType["DOT_RESULT"] = "dotResult";
        ObserverType["WS_OPEN"] = "open";
        ObserverType["WS_CLOSE"] = "close";
        ObserverType["WS_ERROR"] = "error";
        ObserverType["WS_MESSAGE"] = "message";
        ObserverType["LOGIN"] = "login";
        ObserverType["LOGOUT"] = "logout";
        ObserverType["JOIN_ROOM"] = "joinRoom";
        ObserverType["LEAVE_ROOM"] = "leaveRoom";
        ObserverType["PING"] = "ping";
        ObserverType["ROOM"] = "room";
        ObserverType["ZONE"] = "zone";
        ObserverType["NEW_ROUND"] = "new_round";
        ObserverType["GET_PLAYER_INFO"] = "get_user_info";
        ObserverType["GET_TABLE_INFO"] = "get_table_info";
        ObserverType["BETTING_OPEN"] = "BETTING_OPEN";
        ObserverType["BETTING_CLOSE"] = "BETTING_CLOSE";
        ObserverType["BET_ACCEPTED"] = "bet_accepted";
        ObserverType["REVEAL_RESULT"] = "reveal_result";
        ObserverType["PAYOUT"] = "payout";
      })(ObserverType || (ObserverType = exports('ObserverType', {})));

      var ObserverManager = exports('ObserverManager', (_dec = ccclass('ObserverManager'), _dec(_class = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(ObserverManager, _BaseManager);

        function ObserverManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;
          _this._eventBus = new EventTarget();
          return _this;
        }

        var _proto = ObserverManager.prototype;

        _proto.on = function on(event, handler, target) {
          this._eventBus.on(event, handler, target);
        };

        _proto.off = function off(event, handler, target) {
          this._eventBus.off(event, handler, target);
        };

        _proto.emit = function emit(event) {
          var _this$_eventBus;

          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          (_this$_eventBus = this._eventBus).emit.apply(_this$_eventBus, [event].concat(args));
        };

        return ObserverManager;
      }(BaseManager)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OptionButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component, GameManager;

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
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "e28b3c7EqBIdaAk3R/haoj5", "OptionButton", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var OptionButton = exports('OptionButton', (_dec = ccclass('OptionButton'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OptionButton, _Component);

        function OptionButton() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "turnOnNode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "turnOffNode", _descriptor2, _assertThisInitialized(_this));

          _this._isTurnOn = true;
          return _this;
        }

        var _proto = OptionButton.prototype;

        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_START, this.onPress, this);
        };

        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_START, this.onPress, this);
        };

        _proto.start = function start() {
          this._isTurnOn = GameManager.instance.isSEOn;
          this.turnOnNode.active = this._isTurnOn;
          this.turnOffNode.active = !this._isTurnOn;
        };

        _proto.onPress = function onPress(event) {
          this._isTurnOn = !this._isTurnOn;
          GameManager.instance.isSEOn = this._isTurnOn;
          this.turnOnNode.active = this._isTurnOn;
          this.turnOffNode.active = !this._isTurnOn;
        };

        return OptionButton;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "turnOnNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "turnOffNode", [_dec3], {
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

System.register("chunks:///_virtual/OverlapLoading.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseOverlap.ts', './UIManager.ts', './ScreenHome.ts', './ScreenSmallTable.ts', './NotifyWSReconnect.ts', './NetworkManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Slider, Label, Sprite, director, BaseOverlap, UIManager, ScreenHome, ScreenSmallTable, NotifyWSReconnect, NetworkManager, WSState;

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
      director = module.director;
    }, function (module) {
      BaseOverlap = module.BaseOverlap;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      ScreenHome = module.ScreenHome;
    }, function (module) {
      ScreenSmallTable = module.ScreenSmallTable;
    }, function (module) {
      NotifyWSReconnect = module.NotifyWSReconnect;
    }, function (module) {
      NetworkManager = module.NetworkManager;
      WSState = module.WSState;
    }],
    execute: function () {
      exports('OverlapType', void 0);

      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "a77fbkGB9ZFj5X8/yfFffjk", "OverlapLoading", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var OverlapType;

      (function (OverlapType) {
        OverlapType[OverlapType["LoadingScene"] = 0] = "LoadingScene";
        OverlapType[OverlapType["ShowScreenHome"] = 1] = "ShowScreenHome";
        OverlapType[OverlapType["ShowScreenSmallTable"] = 2] = "ShowScreenSmallTable";
        OverlapType[OverlapType["ShowScreenMediumTable"] = 3] = "ShowScreenMediumTable";
        OverlapType[OverlapType["ShowScreenBigTable"] = 4] = "ShowScreenBigTable";
      })(OverlapType || (OverlapType = exports('OverlapType', {})));

      var OverlapLoading = exports('OverlapLoading', (_dec = ccclass('OverlapLoading'), _dec2 = property(Slider), _dec3 = property(Label), _dec4 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseOverlap) {
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

          _this._fakeProgress = 0;
          _this._realPreloadDone = false;
          _this._loadStartTime = 0;
          _this._loadingTime = 1;
          _this._overlapType = OverlapType.LoadingScene;
          _this._isShowNotify = false;
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

          this._isShowNotify = false;
          this.progressSlider.progress = 0;
          this.percentText.string = '0%';
          this.startLoading('');
        };

        _proto.hide = function hide() {
          _BaseOverlap.prototype.hide.call(this);

          console.log('hide overlap loading');
          this._isShowNotify = false;
          this.loadingBarSprite.fillRange = 0;
          this.progressSlider.progress = 0;
          this.percentText.string = '0%';
          this._overlapType = OverlapType.LoadingScene;
        };

        _proto.startLoading = function startLoading(sceneName) {
          var _this2 = this;

          this._fakeProgress = 0;
          this._realPreloadDone = false;
          this._loadStartTime = performance.now() / 1000;

          if (this._overlapType !== OverlapType.LoadingScene) {
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
            var elapsed = performance.now() / 1000 - _this3._loadStartTime;

            _this3._fakeProgress = Math.min(elapsed / _this3._loadingTime, 0.99);
            _this3.progressSlider.progress = _this3._fakeProgress;
            _this3.loadingBarSprite.fillRange = _this3._fakeProgress;
            _this3.percentText.string = Math.floor(_this3._fakeProgress * 99) + "%";

            if (_this3._fakeProgress >= 0.99 && _this3._realPreloadDone) {
              if (NetworkManager.instance.STATE === WSState.CONNECTED) {
                _this3.progressSlider.progress = 1;
                _this3.loadingBarSprite.fillRange = 1;
                _this3.percentText.string = "100%";

                _this3.unscheduleAllCallbacks();

                if (_this3._overlapType === OverlapType.LoadingScene) director.loadScene(sceneName);else if (_this3._overlapType === OverlapType.ShowScreenHome) UIManager.instance.showScreen(ScreenHome, null, true);else if (_this3._overlapType === OverlapType.ShowScreenSmallTable) UIManager.instance.showScreen(ScreenSmallTable, null, true);

                _this3.scheduleOnce(function () {
                  _this3.hide();
                }, 0.5);
              } else if (!_this3._isShowNotify) {
                _this3._isShowNotify = true;
                UIManager.instance.showNotify(NotifyWSReconnect, null, true);
              }
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
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerManager.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "dea7bmPGlxNY7HKeq7d5YW5", "PlayerManager", undefined);

      var ccclass = _decorator.ccclass;
      var PlayerModel = exports('PlayerModel', function PlayerModel() {
        this.id = void 0;
        this.name = void 0;
        this.balance = void 0;
      });
      var PlayerManager = exports('PlayerManager', (_dec = ccclass('PlayerManager'), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function PlayerManager() {}

        PlayerManager.addPlayer = function addPlayer(p) {
          this.players.set(p.id, p);
        };

        PlayerManager.removePlayer = function removePlayer(id) {
          this.players["delete"](id);
        };

        PlayerManager.updatePlayer = function updatePlayer(p) {
          this.players.set(p.id, p);
        };

        return PlayerManager;
      }(), _class2.players = new Map(), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerUIElement.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component, GameManager;

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
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "fd76dH4sOJKIp6IX2WDPSKB", "PlayerUIElement", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PlayerUIElement = exports('PlayerUIElement', (_dec = ccclass('PlayerUIElement'), _dec2 = property(Label), _dec3 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerUIElement, _Component);

        function PlayerUIElement() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "nameLabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "balanceLabel", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PlayerUIElement.prototype;

        _proto.setPlayerData = function setPlayerData(p) {
          this.nameLabel.string = p.name;
          this.balanceLabel.string = GameManager.instance.convertNumberToString(p.balance);
        };

        return PlayerUIElement;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nameLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "balanceLabel", [_dec3], {
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

System.register("chunks:///_virtual/PopupPlayerInRoom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BasePopup.ts', './PlayerUIElement.ts', './PlayerManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Prefab, Node, ScrollView, instantiate, BasePopup, PlayerUIElement, PlayerManager;

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
      Prefab = module.Prefab;
      Node = module.Node;
      ScrollView = module.ScrollView;
      instantiate = module.instantiate;
    }, function (module) {
      BasePopup = module.BasePopup;
    }, function (module) {
      PlayerUIElement = module.PlayerUIElement;
    }, function (module) {
      PlayerManager = module.PlayerManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "7a3dfqxXVNEPI2JYm+X1kgt", "PopupPlayerInRoom", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PopupPlayerInRoom = exports('PopupPlayerInRoom', (_dec = ccclass('PopupPlayerInRoom'), _dec2 = property(Button), _dec3 = property(Prefab), _dec4 = property(Node), _dec5 = property(ScrollView), _dec(_class = (_class2 = /*#__PURE__*/function (_BasePopup) {
        _inheritsLoose(PopupPlayerInRoom, _BasePopup);

        function PopupPlayerInRoom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BasePopup.call.apply(_BasePopup, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "closeButton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playerUIElementPrefab", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "contentNode", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playerlistScrollView", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PopupPlayerInRoom.prototype;

        _proto.init = function init() {
          _BasePopup.prototype.init.call(this);

          this.closeButton.node.on(Button.EventType.CLICK, this.onCloseButtonClick, this);
        };

        _proto.show = function show(data) {
          var _this2 = this;

          _BasePopup.prototype.show.call(this, data);

          PlayerManager.players.forEach(function (player) {
            var playerUIElement = instantiate(_this2.playerUIElementPrefab);
            playerUIElement.getComponent(PlayerUIElement).setPlayerData(player);

            _this2.contentNode.addChild(playerUIElement);
          });
          this.playerlistScrollView.node.active = true;
          this.playerlistScrollView.scrollToTop(2);
        };

        _proto.hide = function hide() {
          _BasePopup.prototype.hide.call(this);

          this.contentNode.removeAllChildren();
          this.playerlistScrollView.node.active = false;
        };

        _proto.onDestroy = function onDestroy() {
          this.closeButton.node.off(Button.EventType.CLICK, this.onCloseButtonClick, this);
        };

        _proto.onCloseButtonClick = function onCloseButtonClick() {
          this.hide();
        };

        return PopupPlayerInRoom;
      }(BasePopup), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "playerUIElementPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "contentNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playerlistScrollView", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PopupResultHistory.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BasePopup.ts', './ResultHistoryElement.ts', './ObserverManager.ts', './NetworkManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Button, Label, Node, Graphics, Vec2, Color, Layers, BasePopup, ResultHistoryElement, ObserverManager, ObserverType, NetworkManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Label = module.Label;
      Node = module.Node;
      Graphics = module.Graphics;
      Vec2 = module.Vec2;
      Color = module.Color;
      Layers = module.Layers;
    }, function (module) {
      BasePopup = module.BasePopup;
    }, function (module) {
      ResultHistoryElement = module.ResultHistoryElement;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverType = module.ObserverType;
    }, function (module) {
      NetworkManager = module.NetworkManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

      cclegacy._RF.push({}, "246c9FrwJNB1pjXMpX0Uf8O", "PopupResultHistory", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PopupResultHistory = exports('PopupResultHistory', (_dec = ccclass('PopupResultHistory'), _dec2 = property({
        type: Button,
        group: 'Buttons'
      }), _dec3 = property({
        type: Label,
        group: 'Result Percent'
      }), _dec4 = property({
        type: Label,
        group: 'Result Percent'
      }), _dec5 = property({
        type: Node,
        group: 'Top'
      }), _dec6 = property({
        type: Graphics,
        group: 'Bottom Right'
      }), _dec7 = property({
        type: Node,
        group: 'Bottom Right'
      }), _dec8 = property({
        type: Node,
        group: 'Bottom Right'
      }), _dec9 = property({
        type: Node,
        group: 'Bottom Right'
      }), _dec10 = property({
        type: Node,
        group: 'Bottom Left'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_BasePopup) {
        _inheritsLoose(PopupResultHistory, _BasePopup);

        function PopupResultHistory() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BasePopup.call.apply(_BasePopup, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "closeButton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bigLabel", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "smallLabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "topContainerNode", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "graph", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pointLabelRoot", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "yAxisRoot", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bottomRightContainerNode", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bottomLeftContainerNode", _descriptor9, _assertThisInitialized(_this));

          _this._data = new Array(60).fill(0);
          _this._topChilds = [];
          _this._bottomLeftChilds = [];
          _this._pointLabelNodes = [];
          _this._yAxisLabelNodes = [];
          _this._yAxisLinesDrawn = false;
          return _this;
        }

        var _proto = PopupResultHistory.prototype;

        _proto.init = function init() {
          var _this2 = this;

          ObserverManager.instance.on(ObserverType.GET_TABLE_INFO, this.onGetTableInfo, this);
          this.closeButton.node.on(Button.EventType.CLICK, this.hide, this);

          _BasePopup.prototype.init.call(this);

          this.topContainerNode.children.forEach(function (child) {
            return _this2._topChilds.push(child);
          });
          this.bottomLeftContainerNode.children.forEach(function (child) {
            return _this2._bottomLeftChilds.push(child);
          });
        };

        _proto.show = function show(data) {
          _BasePopup.prototype.show.call(this, data);

          NetworkManager.instance.getTableInfo();
        };

        _proto.hide = function hide() {
          _BasePopup.prototype.hide.call(this);

          this.graph.clear();
        };

        _proto.onDestroy = function onDestroy() {
          ObserverManager.instance.off(ObserverType.GET_TABLE_INFO, this.onGetTableInfo, this);
          this.closeButton.node.off(Button.EventType.CLICK, this.hide, this);
        };

        _proto.onGetTableInfo = function onGetTableInfo(data) {
          if (!this.isShow) return;
          this._data = data.history;
          var bigCount = 0,
              smallCount = 0;

          this._data.forEach(function (num) {
            if (num < 11) smallCount++;else bigCount++;
          });

          var total = this._data.length;
          var smallPercent = smallCount / total * 100;
          var bigPercent = bigCount / total * 100;
          this.bigLabel.string = "Big: " + bigPercent.toFixed(1) + "%";
          this.smallLabel.string = "Small: " + smallPercent.toFixed(1) + "%";
          this.topChart();
          this.bottomLeftChart();
          this.bottomRightChart();
        };

        _proto.topChart = function topChart() {
          this.updateTopUI(this._topChilds, this.groupByState(this._data));
        };

        _proto.bottomLeftChart = function bottomLeftChart() {
          for (var i = 0; i < this._bottomLeftChilds.length; i++) {
            var node = this._bottomLeftChilds[i];
            node.getComponent(ResultHistoryElement).init(this._data[i], false, false, i === this._data.length - 1);
          }
        };

        _proto.bottomRightChart = function bottomRightChart() {
          var g = this.graph;
          g.clear();
          var width = 450;
          var height = 225;
          var margin = 25;
          var min = 3;
          var max = 18;
          var unitLevels = [3, 6, 9, 12, 15, 18];

          var lastValues = this._data.slice(-20);

          this.initBottomRightUI(lastValues.length);
          var stepX = (width - margin * 2) / (lastValues.length - 1);

          for (var i = 0; i < unitLevels.length; i++) {
            var level = unitLevels[i];
            var y = margin + (level - min) / (max - min) * height;
            var node = this._yAxisLabelNodes[i];
            node.setPosition(-10, y);
            node.getComponent(Label).string = level.toString();
            g.lineWidth = 2;
            g.moveTo(margin, y);
            g.lineTo(width - margin, y);
            g.stroke();
          }

          var points = lastValues.map(function (v, i) {
            var x = margin + i * stepX;
            var y = margin + (v - min) / (max - min) * height;
            return new Vec2(x, y);
          });
          g.lineWidth = 4;
          g.moveTo(points[0].x, points[0].y);

          for (var _i = 1; _i < points.length; _i++) {
            g.lineTo(points[_i].x, points[_i].y);
          }

          g.stroke();

          for (var _i2 = 0; _i2 < this._pointLabelNodes.length; _i2++) {
            var _node = this._pointLabelNodes[_i2];

            if (_i2 < points.length) {
              _node.active = true;

              _node.setPosition(points[_i2].x, points[_i2].y);

              var label = _node.getComponent(Label);

              label.string = lastValues[_i2].toString();
              label.color = lastValues[_i2] < 11 ? Color.GREEN : Color.RED;
            } else {
              _node.active = false;
            }
          }
        };

        _proto.initBottomRightUI = function initBottomRightUI(pointCount) {
          if (this._pointLabelNodes.length === 0) {
            for (var i = 0; i < pointCount; i++) {
              var node = new Node();
              node.layer = Layers.Enum.UI_2D;
              var label = node.addComponent(Label);
              label.fontSize = 18;
              label.isBold = true;
              node.parent = this.pointLabelRoot;

              this._pointLabelNodes.push(node);
            }
          }

          var unitLevels = [3, 6, 9, 12, 15, 18];

          if (!this._yAxisLinesDrawn) {
            for (var _iterator = _createForOfIteratorHelperLoose(unitLevels), _step; !(_step = _iterator()).done;) {
              var level = _step.value;
              var labelNode = new Node();
              labelNode.layer = Layers.Enum.UI_2D;

              var _label = labelNode.addComponent(Label);

              _label.fontSize = 20;
              _label.color = new Color(255, 255, 255);
              labelNode.parent = this.yAxisRoot;

              this._yAxisLabelNodes.push(labelNode);
            }

            this._yAxisLinesDrawn = true;
          }
        };

        _proto.groupByState = function groupByState(arr) {
          var result = [];
          var currentGroup = [];
          var currentState = null;

          var getState = function getState(n) {
            return n < 11 ? "SMALL" : "BIG";
          };

          for (var _iterator2 = _createForOfIteratorHelperLoose(arr), _step2; !(_step2 = _iterator2()).done;) {
            var num = _step2.value;
            var state = getState(num);

            if (currentState === null) {
              currentState = state;
              currentGroup.push(num);
              continue;
            }

            if (state === currentState) currentGroup.push(num);else {
              while (currentGroup.length < 6) {
                currentGroup.push(0);
              }

              result.push(currentGroup);
              currentGroup = [num];
              currentState = state;
            }
          }

          if (currentGroup.length > 0) {
            while (currentGroup.length < 6) {
              currentGroup.push(0);
            }

            result.push(currentGroup);
          }

          var last20 = result.slice(-20);

          while (last20.length < 20) {
            last20.unshift([0, 0, 0, 0, 0, 0]);
          }

          return last20;
        };

        _proto.updateTopUI = function updateTopUI(containers, groups) {
          var index = 0;

          for (var g = 0; g < groups.length; g++) {
            var group = groups[g];
            var groupLength = group.length;

            for (var i = 0; i < Math.min(6, groupLength); i++) {
              if (index >= containers.length) break;
              var node = containers[index];
              var value = group[i];

              if (i === 5 && groupLength > 6) {
                var extra = groupLength - 6 + 1;
                value = extra;
              }

              node.getComponent(ResultHistoryElement).init(value, true, i === 5 && groupLength > 6, g === groups.length - 1 && i === this.getLastNonZeroIndex(groups[g]));
              index++;
            }
          }
        };

        _proto.getLastNonZeroIndex = function getLastNonZeroIndex(groups) {
          var index = groups.length - 1;

          for (var i = index; i >= 0; i--) {
            if (groups[i] !== 0) return index;
            index--;
          }

          return -1;
        };

        return PopupResultHistory;
      }(BasePopup), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bigLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "smallLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "topContainerNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "graph", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "pointLabelRoot", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "yAxisRoot", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "bottomRightContainerNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "bottomLeftContainerNode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

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
          this.soundToggle.isChecked = GameManager.instance.isSEOn;
          this.closeButton.interactable = true;
        };

        _proto.hide = function hide() {
          _BasePopup.prototype.hide.call(this);

          console.log('hide popup settings');
        };

        _proto.onSoundToggle = function onSoundToggle(event) {
          GameManager.instance.isSEOn = event.target.isChecked;
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

System.register("chunks:///_virtual/PopupWaiting.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BasePopup.ts', './GameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, BasePopup, GameManager;

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
    }, function (module) {
      BasePopup = module.BasePopup;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "a95caaxN8tL57moIt0DPqCx", "PopupWaiting", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PopupWaiting = exports('PopupWaiting', (_dec = ccclass('PopupWaiting'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_BasePopup) {
        _inheritsLoose(PopupWaiting, _BasePopup);

        function PopupWaiting() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BasePopup.call.apply(_BasePopup, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "infoLabel", _descriptor, _assertThisInitialized(_this));

          _this._dotCount = 0;
          _this._baseLoadingText = "Waiting for new round";
          return _this;
        }

        var _proto = PopupWaiting.prototype;

        _proto.init = function init() {
          _BasePopup.prototype.init.call(this);
        };

        _proto.show = function show(data) {
          _BasePopup.prototype.show.call(this, data);

          if (GameManager.instance.is(data, "string")) {
            this._baseLoadingText = data;
          }

          this._dotCount = 0;
          this.schedule(this.updateDots, 0.5);
        };

        _proto.hide = function hide() {
          _BasePopup.prototype.hide.call(this);

          this.unschedule(this.updateDots);
        };

        _proto.updateDots = function updateDots() {
          this._dotCount = (this._dotCount + 1) % 4;
          var dots = '.'.repeat(this._dotCount);
          this.infoLabel.string = this._baseLoadingText + dots;
        };

        return PopupWaiting;
      }(BasePopup), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "infoLabel", [_dec2], {
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

System.register("chunks:///_virtual/protocol.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "09651X9k21FtqEO2ghQs/IQ", "protocol", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResultHistoryElement.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Sprite, Label, Color, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Label = module.Label;
      Color = module.Color;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "954ceggxKhPApFsZSXVJlx+", "ResultHistoryElement", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ResultHistoryElement = exports('ResultHistoryElement', (_dec = ccclass('ResultHistoryElement'), _dec2 = property([SpriteFrame]), _dec3 = property(Sprite), _dec4 = property(Label), _dec5 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ResultHistoryElement, _Component);

        function ResultHistoryElement() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "sideSpriteFrames", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "sideSprite", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "resultLabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lastResultSprite", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ResultHistoryElement.prototype;

        _proto.init = function init(result, isLabel, isExtra, lastResult) {
          this.node.active = true;

          if (result < 1) {
            this.sideSprite.color = Color.TRANSPARENT;
            this.resultLabel.string = '';
          } else if (isLabel) {
            this.sideSprite.color = Color.TRANSPARENT;
            this.resultLabel.color = result < 11 ? Color.GREEN : Color.RED;
            this.resultLabel.string = isExtra ? "+" + result : result.toString();
          } else {
            this.sideSprite.color = result < 11 ? Color.GREEN : Color.RED;
            this.sideSprite.spriteFrame = this.sideSpriteFrames[result < 11 ? 1 : 0];
            this.resultLabel.string = '';
          }

          if (lastResult) this.lastResultSprite.color = Color.WHITE;else this.lastResultSprite.color = Color.TRANSPARENT;
        };

        return ResultHistoryElement;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sideSpriteFrames", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sideSprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "resultLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lastResultSprite", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScreenHome.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseScreen.ts', './UIManager.ts', './OverlapLoading.ts', './PopupSettings.ts', './PopupPlayerInRoom.ts', './NetworkManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, BaseScreen, UIManager, OverlapLoading, OverlapType, PopupSettings, PopupPlayerInRoom, NetworkManager;

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
    }, function (module) {
      PopupPlayerInRoom = module.PopupPlayerInRoom;
    }, function (module) {
      NetworkManager = module.NetworkManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "6c17aizMUpDl6i8Eg1QzUZk", "ScreenHome", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ScreenHome = exports('ScreenHome', (_dec = ccclass('ScreenHome'), _dec2 = property({
        type: Button,
        group: 'Buttons'
      }), _dec3 = property({
        type: Button,
        group: 'Buttons'
      }), _dec4 = property({
        type: Button,
        group: 'Test'
      }), _dec5 = property({
        type: Button,
        group: 'Test'
      }), _dec6 = property({
        type: Button,
        group: 'Test'
      }), _dec7 = property({
        type: Button,
        group: 'Test'
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

          _initializerDefineProperty(_this, "testSendRequestPlayerInfoButton", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "testSendRequestTableInfoButton", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "testShowPopupPlayerInRoomButton", _descriptor6, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ScreenHome.prototype;

        _proto.init = function init() {
          _BaseScreen.prototype.init.call(this);

          console.log('init screen home');
          this.smallButton.node.on(Button.EventType.CLICK, this.onPlayButtonClick, this);
          this.settingsButton.node.on(Button.EventType.CLICK, this.onSettingsButtonClick, this);
          this.clearDataButton.node.on(Button.EventType.CLICK, this.onClearDataButtonClick, this);
          this.testSendRequestPlayerInfoButton.node.on(Button.EventType.CLICK, this.onTestSendRequestPlayerInfoButtonClick, this);
          this.testSendRequestTableInfoButton.node.on(Button.EventType.CLICK, this.onTestSendRequestTableInfoButtonClick, this);
          this.testShowPopupPlayerInRoomButton.node.on(Button.EventType.CLICK, this.onTestShowPopupPlayerInRoomButtonClick, this);
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
          this.testSendRequestPlayerInfoButton.node.off(Button.EventType.CLICK, this.onTestSendRequestPlayerInfoButtonClick, this);
          this.testSendRequestTableInfoButton.node.off(Button.EventType.CLICK, this.onTestSendRequestTableInfoButtonClick, this);
          this.testShowPopupPlayerInRoomButton.node.off(Button.EventType.CLICK, this.onTestShowPopupPlayerInRoomButtonClick, this);
        };

        _proto.onPlayButtonClick = function onPlayButtonClick() {
          this.hide();
          this.smallButton.interactable = false;
          UIManager.instance.showOverlap(OverlapLoading, OverlapType.ShowScreenSmallTable, true);
        };

        _proto.onSettingsButtonClick = function onSettingsButtonClick() {
          UIManager.instance.showPopup(PopupSettings, true);
        } //#region Test
        ;

        _proto.onClearDataButtonClick = function onClearDataButtonClick() {
          localStorage.clear();
        };

        _proto.onTestSendRequestPlayerInfoButtonClick = function onTestSendRequestPlayerInfoButtonClick() {
          NetworkManager.instance.getPlayerInfo();
        };

        _proto.onTestSendRequestTableInfoButtonClick = function onTestSendRequestTableInfoButtonClick() {
          NetworkManager.instance.getTableInfo();
        };

        _proto.onTestShowPopupPlayerInRoomButtonClick = function onTestShowPopupPlayerInRoomButtonClick() {
          UIManager.instance.showPopup(PopupPlayerInRoom, null, true);
        } //#endregion
        ;

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
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "testSendRequestPlayerInfoButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "testSendRequestTableInfoButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "testShowPopupPlayerInRoomButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScreenSmallTable.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseScreen.ts', './GameManager.ts', './UIManager.ts', './AudioManager.ts', './AudioNames.ts', './NetworkManager.ts', './ChipButtonEffect.ts', './BubbleLabel.ts', './ObserverManager.ts', './PopupHelp.ts', './PopupSettings.ts', './PopupWaiting.ts', './PopupPlayerInRoom.ts', './PopupResultHistory.ts', './OverlapLoading.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, cclegacy, _decorator, Button, Node, Label, Sprite, sp, SpriteFrame, Prefab, Font, tween, Vec3, Tween, Color, instantiate, BaseScreen, GameManager, UIManager, AudioManager, AudioNames, NetworkManager, ChipButtonEffect, BubbleLabel, ObserverManager, ObserverType, PopupHelp, PopupSettings, PopupWaiting, PopupPlayerInRoom, PopupResultHistory, OverlapLoading, OverlapType;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Node = module.Node;
      Label = module.Label;
      Sprite = module.Sprite;
      sp = module.sp;
      SpriteFrame = module.SpriteFrame;
      Prefab = module.Prefab;
      Font = module.Font;
      tween = module.tween;
      Vec3 = module.Vec3;
      Tween = module.Tween;
      Color = module.Color;
      instantiate = module.instantiate;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      AudioNames = module.AudioNames;
    }, function (module) {
      NetworkManager = module.NetworkManager;
    }, function (module) {
      ChipButtonEffect = module.ChipButtonEffect;
    }, function (module) {
      BubbleLabel = module.BubbleLabel;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverType = module.ObserverType;
    }, function (module) {
      PopupHelp = module.PopupHelp;
    }, function (module) {
      PopupSettings = module.PopupSettings;
    }, function (module) {
      PopupWaiting = module.PopupWaiting;
    }, function (module) {
      PopupPlayerInRoom = module.PopupPlayerInRoom;
    }, function (module) {
      PopupResultHistory = module.PopupResultHistory;
    }, function (module) {
      OverlapLoading = module.OverlapLoading;
      OverlapType = module.OverlapType;
    }],
    execute: function () {
      exports({
        BetButtonType: void 0,
        BetSide: void 0
      });

      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _descriptor39, _descriptor40, _descriptor41, _descriptor42, _descriptor43, _descriptor44, _descriptor45, _descriptor46, _descriptor47, _descriptor48;

      cclegacy._RF.push({}, "31bfby8BC1EC78s2CE+Dc8q", "ScreenSmallTable", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BetSide;

      (function (BetSide) {
        BetSide["BIG"] = "BIG";
        BetSide["SMALL"] = "SMALL";
      })(BetSide || (BetSide = exports('BetSide', {})));

      var BetButtonType;

      (function (BetButtonType) {
        BetButtonType[BetButtonType["BIG"] = 0] = "BIG";
        BetButtonType[BetButtonType["SMALL"] = 1] = "SMALL";
      })(BetButtonType || (BetButtonType = exports('BetButtonType', {})));

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
        type: Node,
        group: 'Table'
      }), _dec6 = property({
        type: Node,
        group: 'Timer'
      }), _dec7 = property({
        type: Label,
        group: 'Timer'
      }), _dec8 = property({
        type: Sprite,
        group: 'Timer'
      }), _dec9 = property({
        type: sp.Skeleton,
        group: 'Timer'
      }), _dec10 = property({
        type: Node,
        group: 'Dice'
      }), _dec11 = property({
        type: sp.Skeleton,
        group: 'Dice'
      }), _dec12 = property({
        type: Node,
        group: 'Dice'
      }), _dec13 = property({
        type: Node,
        group: 'Dice'
      }), _dec14 = property({
        type: Node,
        group: 'Dice'
      }), _dec15 = property({
        type: Node,
        group: 'Dice'
      }), _dec16 = property({
        type: Label,
        group: 'Dice'
      }), _dec17 = property({
        type: Sprite,
        group: 'Dice'
      }), _dec18 = property({
        type: Sprite,
        group: 'Dice'
      }), _dec19 = property({
        type: Sprite,
        group: 'Dice'
      }), _dec20 = property({
        type: [SpriteFrame],
        group: 'Dice'
      }), _dec21 = property({
        type: Label,
        group: 'Big'
      }), _dec22 = property({
        type: Label,
        group: 'Big'
      }), _dec23 = property({
        type: Label,
        group: 'Big'
      }), _dec24 = property({
        type: Label,
        group: 'Small'
      }), _dec25 = property({
        type: Label,
        group: 'Small'
      }), _dec26 = property({
        type: Label,
        group: 'Small'
      }), _dec27 = property({
        type: Label,
        group: 'PlayerInfo'
      }), _dec28 = property({
        type: Label,
        group: 'PlayerInfo'
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
        type: Button,
        group: 'Buttons'
      }), _dec34 = property({
        type: Button,
        group: 'Buttons'
      }), _dec35 = property({
        type: Button,
        group: 'Buttons'
      }), _dec36 = property({
        type: Button,
        group: 'Buttons'
      }), _dec37 = property({
        type: Label,
        group: 'PlayerInfo'
      }), _dec38 = property({
        type: Button,
        group: 'Buttons'
      }), _dec39 = property({
        type: Button,
        group: 'Buttons'
      }), _dec40 = property({
        type: Node,
        group: 'VFX'
      }), _dec41 = property({
        type: BubbleLabel,
        group: 'VFX'
      }), _dec42 = property({
        type: Node,
        group: 'VFX'
      }), _dec43 = property({
        type: Prefab,
        group: 'VFX'
      }), _dec44 = property({
        type: [SpriteFrame],
        group: 'VFX'
      }), _dec45 = property({
        type: [Node],
        group: 'VFX'
      }), _dec46 = property({
        type: [Node],
        group: 'VFX'
      }), _dec47 = property({
        type: [Node],
        group: 'VFX'
      }), _dec48 = property({
        type: [Font],
        group: 'VFX'
      }), _dec49 = property({
        type: [ChipButtonEffect],
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

          _initializerDefineProperty(_this, "tableNode", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timerNode", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timerLabel", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timerCountdown", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "beginStopWagerSpine", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "animationRollDiceNode", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rollDiceSpine", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "smallDisk", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bigDisk", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "coverDisk", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "resultLableNode", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "resultLable", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice1Sprite", _descriptor16, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice2Sprite", _descriptor17, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice3Sprite", _descriptor18, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceSprites", _descriptor19, _assertThisInitialized(_this));

          _this.dice1Number = 0;
          _this.dice2Number = 0;
          _this.dice3Number = 0;
          _this.totalNumber = 0;
          _this._dotResult = [];

          _initializerDefineProperty(_this, "numberPlayerBigBetLabel", _descriptor20, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "totalBigBetLabel", _descriptor21, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberBigBetOfPlayerLabel", _descriptor22, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberPlayerSmallBetLabel", _descriptor23, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "totalSmallBetLabel", _descriptor24, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberSmallBetOfPlayerLabel", _descriptor25, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playerNameLabel", _descriptor26, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playerMoneyLabel", _descriptor27, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "depositButton", _descriptor28, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipButton1", _descriptor29, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipButton2", _descriptor30, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipButton3", _descriptor31, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipButton4", _descriptor32, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipButton5", _descriptor33, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipButton6", _descriptor34, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "reBetButton", _descriptor35, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberPlayerJoinTableLabel", _descriptor36, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playerInRoomButton", _descriptor37, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "resultHistoryButton", _descriptor38, _assertThisInitialized(_this));

          _this.TWEEN_TEXT_DURATION = 0.25;
          _this.TWEEN_SCALE_FACTOR = 1.1;
          _this.Y_OFFSET_CHIP_BUTTON = 25;
          _this.PADDING_CHIP_RANGE = 15;

          _initializerDefineProperty(_this, "dealerNode", _descriptor39, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bubbleLabel", _descriptor40, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipContainerNode", _descriptor41, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipSprite", _descriptor42, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipSprites", _descriptor43, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startChipPositions", _descriptor44, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "targetBigChipPositions", _descriptor45, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "targetSmallChipPositions", _descriptor46, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "fontChips", _descriptor47, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "chipSelectedEffects", _descriptor48, _assertThisInitialized(_this));

          _this._chipSpriteIndex = 0;
          _this._chipNodes = [];
          _this._chipPrices = ['1K', '5K', '10K', '50K', '100K', '500K'];
          _this._chipValues = [1000, 5000, 10000, 50000, 100000, 500000];
          _this._lastBets = {};
          _this._canShowPayout = false;
          _this._numberPlayerBigBet = 0;
          _this._bigBetTotal = 0;
          _this._numberBigBetOfPlayer = 0;
          _this._numberPlayerSmallBet = 0;
          _this._smallBetTotal = 0;
          _this._numberSmallBetOfPlayer = 0;
          _this._roundId = '';
          _this._isNewRound = true;
          _this._currentWinSide = BetSide.BIG;
          _this._timeLeftCounter = void 0;
          _this._timerHandler = null;
          return _this;
        }

        var _proto = ScreenSmallTable.prototype; //#endregion
        //#endregion
        //#region Lifecycle

        _proto.init = function init() {
          _BaseScreen.prototype.init.call(this);
        };

        _proto.show = function show(data) {
          console.log('show ScreenSmallTable');
          this.bindingEvents();

          _BaseScreen.prototype.show.call(this, data);

          GameManager.instance.isSEOn = GameManager.instance.isSEOnData.get();
          NetworkManager.instance.getPlayerInfo();
          NetworkManager.instance.getTableInfo();
          this.backButton.interactable = true;
          this.reBetButton.interactable = false;
          ObserverManager.instance.emit(ObserverType.ON_RESULT_EFFECT, false);
          this.numberPlayerJoinTableLabel.string = '10';
          this.showChipButtonEffect(false);
          tween(this.chipContainerNode).to(.5, {
            position: new Vec3(0, -25, 0)
          }, {
            easing: 'quadOut'
          }).start();
        };

        _proto.hide = function hide() {
          var _this2 = this;

          AudioManager.instance.stopBGM();
          this.unbindingEvents();

          if (this._timerHandler) {
            this.unschedule(this._timerHandler);
            this._timerHandler = null;
          }

          tween(this.chipContainerNode).to(.5, {
            position: new Vec3(0, -200, 0)
          }, {
            easing: 'quadOut'
          }).call(function () {
            _BaseScreen.prototype.hide.call(_this2);

            Tween.stopAll();
          }).start();
        };

        _proto.onDestroy = function onDestroy() {
          this.unbindingEvents();
        } //#endregion
        //#region Methods
        ;

        _proto.bindingEvents = function bindingEvents() {
          ObserverManager.instance.on(ObserverType.PLAYER_BALANCE, this.onPlayerBalance, this);
          ObserverManager.instance.on(ObserverType.GET_PLAYER_INFO, this.onGetPlayerInfo, this);
          ObserverManager.instance.on(ObserverType.GET_TABLE_INFO, this.onGetTableInfo, this);
          ObserverManager.instance.on(ObserverType.NEW_ROUND, this.onNewRound, this);
          ObserverManager.instance.on(ObserverType.BETTING_OPEN, this.onBettingOpen, this);
          ObserverManager.instance.on(ObserverType.BETTING_CLOSE, this.onBettingClose, this);
          ObserverManager.instance.on(ObserverType.REVEAL_RESULT, this.onRevealResult, this);
          ObserverManager.instance.on(ObserverType.PAYOUT, this.onPayout, this);
          ObserverManager.instance.on(ObserverType.BET_ACCEPTED, this.onBetAcceptedResponse, this);
          ObserverManager.instance.on(ObserverType.SAVE_LAST_BET, this.saveLastBet, this);
          this.chipButton1.node.on(Button.EventType.CLICK, this.chip1Button, this);
          this.chipButton2.node.on(Button.EventType.CLICK, this.chip2Button, this);
          this.chipButton3.node.on(Button.EventType.CLICK, this.chip3Button, this);
          this.chipButton4.node.on(Button.EventType.CLICK, this.chip4Button, this);
          this.chipButton5.node.on(Button.EventType.CLICK, this.chip5Button, this);
          this.chipButton6.node.on(Button.EventType.CLICK, this.chip6Button, this);
          this.backButton.node.on(Button.EventType.CLICK, this.onBack, this);
          this.settingsButton.node.on(Button.EventType.CLICK, this.showSettings, this);
          this.helpButton.node.on(Button.EventType.CLICK, this.showHelp, this);
          this.reBetButton.node.on(Button.EventType.CLICK, this.reBetChip, this);
          this.playerInRoomButton.node.on(Button.EventType.CLICK, this.showPlayerInRoom, this);
          this.depositButton.node.on(Button.EventType.CLICK, this.deposit, this);
          this.resultHistoryButton.node.on(Button.EventType.CLICK, this.showResultHistory, this);
        };

        _proto.unbindingEvents = function unbindingEvents() {
          ObserverManager.instance.off(ObserverType.PLAYER_BALANCE, this.onPlayerBalance, this);
          ObserverManager.instance.off(ObserverType.GET_PLAYER_INFO, this.onGetPlayerInfo, this);
          ObserverManager.instance.off(ObserverType.GET_TABLE_INFO, this.onGetTableInfo, this);
          ObserverManager.instance.off(ObserverType.NEW_ROUND, this.onNewRound, this);
          ObserverManager.instance.off(ObserverType.BETTING_OPEN, this.onBettingOpen, this);
          ObserverManager.instance.off(ObserverType.BETTING_CLOSE, this.onBettingClose, this);
          ObserverManager.instance.off(ObserverType.REVEAL_RESULT, this.onRevealResult, this);
          ObserverManager.instance.off(ObserverType.PAYOUT, this.onPayout, this);
          ObserverManager.instance.off(ObserverType.BET_ACCEPTED, this.onBetAcceptedResponse, this);
          ObserverManager.instance.off(ObserverType.SAVE_LAST_BET, this.saveLastBet, this);
          this.chipButton1.node.off(Button.EventType.CLICK, this.chip1Button, this);
          this.chipButton2.node.off(Button.EventType.CLICK, this.chip2Button, this);
          this.chipButton4.node.off(Button.EventType.CLICK, this.chip4Button, this);
          this.chipButton5.node.off(Button.EventType.CLICK, this.chip5Button, this);
          this.chipButton6.node.off(Button.EventType.CLICK, this.chip6Button, this);
          this.backButton.node.off(Button.EventType.CLICK, this.onBack, this);
          this.settingsButton.node.off(Button.EventType.CLICK, this.showSettings, this);
          this.helpButton.node.off(Button.EventType.CLICK, this.showHelp, this);
          this.reBetButton.node.off(Button.EventType.CLICK, this.reBetChip, this);
          this.playerInRoomButton.node.off(Button.EventType.CLICK, this.showPlayerInRoom, this);
          this.depositButton.node.off(Button.EventType.CLICK, this.deposit, this);
          this.resultHistoryButton.node.off(Button.EventType.CLICK, this.showResultHistory, this);
        };

        _proto.SendBetInfoToServer = function SendBetInfoToServer(betNumber, betSide) {
          if (GameManager.instance.playerBalance >= betNumber) {
            GameManager.instance.playerBalance -= betNumber;
            var req = {
              roundId: this._roundId,
              side: betSide,
              amount: betNumber
            };

            try {
              NetworkManager.instance.placeBet(req);
            } catch (e) {
              console.error('PLACE_BET error', e);
            }
          } else this.bubbleLabel.show('Not enough money', this.playerMoneyLabel.node.worldPosition, Vec3.UP, Color.RED, 30, true, null);
        };

        _proto.rebetAsync = /*#__PURE__*/function () {
          var _rebetAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _i, _Object$keys, key, betSide, betList, _iterator, _step, _betAmount;

            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(Object.keys(this._lastBets).length === 0)) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return");

                  case 2:
                    this.reBetButton.interactable = false;
                    AudioManager.instance.playSFXEffect(AudioNames.CHIP_SHORT);
                    _i = 0, _Object$keys = Object.keys(this._lastBets);

                  case 5:
                    if (!(_i < _Object$keys.length)) {
                      _context.next = 24;
                      break;
                    }

                    key = _Object$keys[_i];
                    betSide = key;
                    betList = this._lastBets[betSide];

                    if (betList) {
                      _context.next = 11;
                      break;
                    }

                    return _context.abrupt("continue", 21);

                  case 11:
                    _iterator = _createForOfIteratorHelperLoose(betList);

                  case 12:
                    if ((_step = _iterator()).done) {
                      _context.next = 21;
                      break;
                    }

                    _betAmount = _step.value;

                    if (!(GameManager.instance.playerBalance < _betAmount)) {
                      _context.next = 16;
                      break;
                    }

                    return _context.abrupt("continue", 19);

                  case 16:
                    this.SendBetInfoToServer(_betAmount, betSide);
                    _context.next = 19;
                    return GameManager.instance.delay(250);

                  case 19:
                    _context.next = 12;
                    break;

                  case 21:
                    _i++;
                    _context.next = 5;
                    break;

                  case 24:
                    this._lastBets = {};

                  case 25:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function rebetAsync() {
            return _rebetAsync.apply(this, arguments);
          }

          return rebetAsync;
        }() //#endregion
        //#region Listeners
        ;

        _proto.onPlayerBalance = function onPlayerBalance(value) {
          this.playerMoneyLabel.string = '$ ' + GameManager.instance.convertNumberToString(value);
        };

        _proto.onGetPlayerInfo = function onGetPlayerInfo(data) {
          console.log("------------- Get player info response -------------");
          GameManager.instance.playerBalance = data.balance;
          var chip1 = data.chipSet[0];
          var chip2 = data.chipSet[1];
          var chip3 = data.chipSet[2];
          var chip4 = data.chipSet[3];
          var chip5 = data.chipSet[4];
          var chip6 = data.chipSet[5];
          this._chipValues = [chip1, chip2, chip3, chip4, chip5, chip6];
          this._chipPrices = [GameManager.instance.convertNumberToString(chip1), GameManager.instance.convertNumberToString(chip2), GameManager.instance.convertNumberToString(chip3), GameManager.instance.convertNumberToString(chip4), GameManager.instance.convertNumberToString(chip5), GameManager.instance.convertNumberToString(chip6)];
          this.chipButton1.node.getComponentInChildren(Label).string = this._chipPrices[0];
          this.chipButton2.node.getComponentInChildren(Label).string = this._chipPrices[1];
          this.chipButton3.node.getComponentInChildren(Label).string = this._chipPrices[2];
          this.chipButton4.node.getComponentInChildren(Label).string = this._chipPrices[3];
          this.chipButton5.node.getComponentInChildren(Label).string = this._chipPrices[4];
          this.chipButton6.node.getComponentInChildren(Label).string = this._chipPrices[5];
        };

        _proto.onGetTableInfo = function onGetTableInfo(data) {
          var _UIManager$instance$g;

          if ((_UIManager$instance$g = UIManager.instance.getExistUI(PopupResultHistory)) != null && _UIManager$instance$g.isShow) return;
          console.log("----------------------- on Get Table Info response --------------------------------");
          if (data.status === ObserverType.BETTING_OPEN) this.onBettingOpen({
            roundId: data.roundId,
            elapsedTime: data.elapsedTime
          });else if (data.status === ObserverType.NEW_ROUND) this.onNewRound({
            action: data.status
          });else if (data.status === ObserverType.BETTING_CLOSE) this.onBettingClose({
            roundId: data.roundId
          });else if (data.status === ObserverType.REVEAL_RESULT) this.onRevealResult({
            roundId: data.roundId,
            result: data.result,
            dice: data.dice,
            sum: data.sum
          });else UIManager.instance.showPopup(PopupWaiting, "Waiting for new round", true);
          this.bigBetTotal = data.totalBigBet ? Number(data.totalBigBet) : 0;
          this.smallBetTotal = data.totalSmallBet ? Number(data.totalSmallBet) : 0;
          this.numberPlayerBigBet = data.totalPlayerBigBet ? Number(data.totalPlayerBigBet) : 0;
          this.numberPlayerSmallBet = data.totalPlayerSmallBet ? Number(data.totalPlayerSmallBet) : 0;
          this.numberBigBetOfPlayer = data.numberBigBetOfPlayer ? Number(data.numberBigBetOfPlayer) : 0;
          this.numberSmallBetOfPlayer = data.numberSmallBetOfPlayer ? Number(data.numberSmallBetOfPlayer) : 0;
          this._dotResult = data.history.slice(-10).map(function (item) {
            return item < 11 ? true : false;
          });
          ObserverManager.instance.emit(ObserverType.DOT_RESULT, this._dotResult);
        };

        _proto.onNewRound = function onNewRound(data) {
          var _UIManager$instance$g2;

          console.log("----------------------- on New Round response --------------------------------");
          (_UIManager$instance$g2 = UIManager.instance.getExistUI(PopupWaiting)) == null ? void 0 : _UIManager$instance$g2.hide();
          AudioManager.instance.playSFXEffect(AudioNames.ROLL_DICE);
          ObserverManager.instance.emit(ObserverType.ON_RESULT_EFFECT, false);
          this.animationRollDice();
        };

        _proto.onBettingOpen = function onBettingOpen(data) {
          var _UIManager$instance$g3;

          console.log("----------------------- on Betting Open response --------------------------------");
          ObserverManager.instance.emit(ObserverType.CAN_BET, true);
          AudioManager.instance.playSFXEffect(AudioNames.START_BET);
          (_UIManager$instance$g3 = UIManager.instance.getExistUI(PopupWaiting)) == null ? void 0 : _UIManager$instance$g3.hide();
          this.timerNode.active = true;
          this.showBeginWager(true);
          this.timerCountdown.fillRange = 1;
          this.smallDisk.active = true;
          this.reBetButton.interactable = Object.keys(this._lastBets).length > 0 ? true : false;
          this._roundId = data.roundId;
          this.bigBetTotal = 0;
          this.smallBetTotal = 0;
          this.numberPlayerBigBet = 0;
          this.numberPlayerSmallBet = 0;
          this.numberBigBetOfPlayer = 0;
          this.numberSmallBetOfPlayer = 0;
          this._timeLeftCounter = data.elapsedTime;
          this.startTimeLeftCounter();
        };

        _proto.onBettingClose = function onBettingClose(data) {
          var _UIManager$instance$g4;

          console.log("----------------------- on Betting Close response --------------------------------");
          ObserverManager.instance.emit(ObserverType.CAN_BET, false);
          (_UIManager$instance$g4 = UIManager.instance.getExistUI(PopupWaiting)) == null ? void 0 : _UIManager$instance$g4.hide();
          this.showChipButtonEffect(false);
          AudioManager.instance.playSFXEffect(AudioNames.CLOSE_BET);
          this.showBeginWager(false);
          this.timerNode.active = false;
        };

        _proto.onRevealResult = function onRevealResult(data) {
          var _this3 = this;

          console.log("----------------------- on Reveal Result response --------------------------------");
          this.dice1Number = data.dice[0];
          this.dice2Number = data.dice[1];
          this.dice3Number = data.dice[2];
          this.totalNumber = data.sum;
          this.dice1Sprite.spriteFrame = this.diceSprites[this.dice1Number - 1];
          this.dice2Sprite.spriteFrame = this.diceSprites[this.dice2Number - 1];
          this.dice3Sprite.spriteFrame = this.diceSprites[this.dice3Number - 1];
          this._currentWinSide = data.result == BetSide.BIG ? BetSide.BIG : BetSide.SMALL;
          this._canShowPayout = false;
          this.animationShowResult(function () {
            return _this3.showResultEffect();
          });
        };

        _proto.onPayout = function onPayout(data) {
          console.log("----------------------- on Payout response --------------------------------");
          this.payoutEffect(data.payout);
        };

        _proto.onBetAcceptedResponse = function onBetAcceptedResponse(data) {
          console.log("----------------------- on Bet Accepted response --------------------------------");
          this.bigBetTotal = data.bigBetTotal;
          this.smallBetTotal = data.smallBetTotal;
          this.numberPlayerBigBet = data.numberPlayerBigBet;
          this.numberPlayerSmallBet = data.numberPlayerSmallBet;
          this.numberBigBetOfPlayer = data.numberBigBetOfPlayer;
          this.numberSmallBetOfPlayer = data.numberSmallBetOfPlayer;
          this.moveChipEffect(data.side, data.amount);
        };

        _proto.saveLastBet = function saveLastBet(data) {
          if (this._isNewRound) {
            this._isNewRound = false;
            this._lastBets = {};
          }

          if (!this._lastBets[data.betSide]) this._lastBets[data.betSide] = [];

          this._lastBets[data.betSide].push(data.betAmount);
        } //#endregion
        //#region Buttons
        ;

        _proto.onBack = function onBack() {
          this.hide();
          UIManager.instance.showOverlap(OverlapLoading, OverlapType.ShowScreenHome, true);
        };

        _proto.showSettings = function showSettings() {
          UIManager.instance.showPopup(PopupSettings, null, true);
        };

        _proto.showHelp = function showHelp() {
          UIManager.instance.showPopup(PopupHelp, null, true);
        };

        _proto.chip1Button = function chip1Button() {
          var _this4 = this;

          this.showChipButtonEffect(0, this.chipButton1.node, function (isShow) {
            if (isShow) {
              AudioManager.instance.playSFXEffect(AudioNames.SELECT_CHIP);
              GameManager.instance.numberChipToBet = _this4._chipValues[0];
              _this4._chipSpriteIndex = 0;
            } else GameManager.instance.numberChipToBet = 0;
          });
        };

        _proto.chip2Button = function chip2Button() {
          var _this5 = this;

          this.showChipButtonEffect(1, this.chipButton2.node, function (isShow) {
            if (isShow) {
              AudioManager.instance.playSFXEffect(AudioNames.SELECT_CHIP);
              GameManager.instance.numberChipToBet = _this5._chipValues[1];
              _this5._chipSpriteIndex = 1;
            } else GameManager.instance.numberChipToBet = 0;
          });
        };

        _proto.chip3Button = function chip3Button() {
          var _this6 = this;

          this.showChipButtonEffect(2, this.chipButton3.node, function (isShow) {
            if (isShow) {
              AudioManager.instance.playSFXEffect(AudioNames.SELECT_CHIP);
              GameManager.instance.numberChipToBet = _this6._chipValues[2];
              _this6._chipSpriteIndex = 2;
            } else GameManager.instance.numberChipToBet = 0;
          });
        };

        _proto.chip4Button = function chip4Button() {
          var _this7 = this;

          this.showChipButtonEffect(3, this.chipButton4.node, function (isShow) {
            if (isShow) {
              AudioManager.instance.playSFXEffect(AudioNames.SELECT_CHIP);
              GameManager.instance.numberChipToBet = _this7._chipValues[3];
              _this7._chipSpriteIndex = 3;
            } else GameManager.instance.numberChipToBet = 0;
          });
        };

        _proto.chip5Button = function chip5Button() {
          var _this8 = this;

          this.showChipButtonEffect(4, this.chipButton5.node, function (isShow) {
            if (isShow) {
              AudioManager.instance.playSFXEffect(AudioNames.SELECT_CHIP);
              GameManager.instance.numberChipToBet = _this8._chipValues[4];
              _this8._chipSpriteIndex = 4;
            } else GameManager.instance.numberChipToBet = 0;
          });
        };

        _proto.chip6Button = function chip6Button() {
          var _this9 = this;

          this.showChipButtonEffect(5, this.chipButton6.node, function (isShow) {
            if (isShow) {
              AudioManager.instance.playSFXEffect(AudioNames.SELECT_CHIP);
              GameManager.instance.numberChipToBet = _this9._chipValues[5];
              _this9._chipSpriteIndex = 5;
            } else GameManager.instance.numberChipToBet = 0;
          });
        };

        _proto.reBetChip = function reBetChip() {
          this.rebetAsync();
        };

        _proto.showPlayerInRoom = function showPlayerInRoom() {
          UIManager.instance.showPopup(PopupPlayerInRoom, null, true);
        };

        _proto.deposit = function deposit() {//TODO: show popup deposit
          // GameManager.instance.playerBalance += 100000;
        };

        _proto.showResultHistory = function showResultHistory() {
          UIManager.instance.showPopup(PopupResultHistory, null, true);
        } //#endregion
        //#region VFX
        ;

        _proto.showChipButtonEffect = function showChipButtonEffect(arg1, arg2, arg3) {
          var _this10 = this;

          if (typeof arg1 === 'boolean' && typeof arg2 === 'undefined' && typeof arg3 === 'undefined') {
            if (!arg1) {
              this.chipSelectedEffects.forEach(function (effect) {
                if (effect.isShowEffect()) effect.hideEffect();
              });
              this.resetPositionChipButton();
            }

            GameManager.instance.numberChipToBet = 0;
            this._chipSpriteIndex = 0;
            return;
          } else if (typeof arg1 === 'number' && arg2 instanceof Node && typeof arg3 === 'function') {
            if (this.chipSelectedEffects[arg1].isShowEffect() && arg1 === this._chipSpriteIndex) {
              var _targetChipPos = new Vec3(arg2.position.x, 0, 0);

              tween(arg2).to(.1, {
                position: _targetChipPos
              }, {
                easing: 'quadInOut'
              }).call(function () {
                _this10.chipSelectedEffects[arg1].hideEffect();

                arg3(false);
              }).start();
              return;
            }

            this.resetPositionChipButton();
            this.chipSelectedEffects.forEach(function (effect) {
              if (effect.isShowEffect()) effect.hideEffect();
            });
            var targetChipPos = new Vec3(arg2.position.x, this.Y_OFFSET_CHIP_BUTTON, 0);
            tween(arg2).to(.1, {
              position: targetChipPos
            }, {
              easing: 'quadInOut'
            }).call(function () {
              _this10.chipSelectedEffects[arg1].showEffect();

              arg3(true);
            }).start();
          }
        };

        _proto.moveChipEffect = function moveChipEffect(arg1, arg2) {
          var _this11 = this;

          if (typeof arg1 === 'boolean') {
            var chipNode = instantiate(this.chipSprite);
            chipNode.setParent(this.tableNode);

            this._chipNodes.push(chipNode);

            chipNode.getComponent(Sprite).spriteFrame = this.chipSprites[this._chipSpriteIndex];
            var chipNodeLabel = chipNode.getComponentInChildren(Label);
            chipNodeLabel.string = this._chipPrices[this._chipSpriteIndex];
            chipNodeLabel.font = this.fontChips[this._chipSpriteIndex];
            chipNode.setWorldPosition(this.startChipPositions[this._chipSpriteIndex].worldPosition);
            chipNode.active = true;
            var targetPos = arg1 ? this.targetBigChipPositions[Math.floor(Math.random() * this.targetBigChipPositions.length)].worldPosition : this.targetSmallChipPositions[Math.floor(Math.random() * this.targetSmallChipPositions.length)].worldPosition;
            var paddingPos = this.paddingPlacedChipPositions();
            tween(chipNode).parallel(tween().target(chipNode).to(0.25, {
              worldPosition: Vec3.add(new Vec3(), targetPos, paddingPos)
            }, {
              easing: 'quadOut'
            }), tween().target(chipNode).to(0.2, {
              scale: Vec3.ONE.clone().multiplyScalar(.5)
            }, {
              easing: 'quadOut'
            }).to(0.25, {
              scale: Vec3.ONE.clone().multiplyScalar(.35)
            }, {
              easing: 'quadOut'
            })).start();
          } else if (typeof arg1 === "object" && arg1 !== null && typeof arg2 === "number") {
            Object.keys(arg1).forEach(function (chip, i) {
              var delay = i * .25;
              var chipNode = instantiate(_this11.chipSprite);
              chipNode.setParent(_this11.tableNode);

              _this11._chipNodes.push(chipNode);

              var index = _this11._chipValues.indexOf(Number(chip));

              chipNode.getComponent(Sprite).spriteFrame = _this11.chipSprites[index];
              var chipLabel = chipNode.getComponentInChildren(Label);
              chipLabel.string = _this11._chipPrices[index];
              chipLabel.font = _this11.fontChips[index];
              chipNode.setWorldPosition(_this11._currentWinSide == BetSide.BIG ? _this11.targetBigChipPositions[index].worldPosition : _this11.targetSmallChipPositions[index].worldPosition);
              chipNode.active = true;
              tween(chipNode).delay(delay).to(.5, {
                worldPosition: _this11.playerMoneyLabel.node.worldPosition
              }).call(function () {
                AudioManager.instance.playSFXEffect(AudioNames.CHIP_SHORT);

                if (i === 0) {
                  _this11.bubbleLabel.show('+' + arg2, _this11.playerMoneyLabel.node.worldPosition, Vec3.UP, _this11._currentWinSide == BetSide.BIG ? Color.CYAN : Color.YELLOW, 25, true, null);

                  GameManager.instance.playerBalance += arg2;
                  _this11.bigBetTotal = 0;
                  _this11.smallBetTotal = 0;
                  _this11.numberPlayerBigBet = 0;
                  _this11.numberPlayerSmallBet = 0;
                  _this11.numberBigBetOfPlayer = 0;
                  _this11.numberSmallBetOfPlayer = 0;
                }

                var nodeIndex = _this11._chipNodes.indexOf(chipNode);

                if (nodeIndex !== -1) {
                  _this11._chipNodes.splice(nodeIndex, 1);
                }

                chipNode.destroy();
              }).start();
            });
          } else if (GameManager.instance.is(arg1, BetSide) && typeof arg2 === "number") {
            var chipNode = instantiate(this.chipSprite);
            chipNode.setParent(this.tableNode);

            this._chipNodes.push(chipNode);

            chipNode.getComponent(Sprite).spriteFrame = this.chipSprites[this._chipValues.indexOf(arg2)];

            var _chipNodeLabel = chipNode.getComponentInChildren(Label);

            _chipNodeLabel.string = this._chipPrices[this._chipValues.indexOf(arg2)];
            _chipNodeLabel.font = this.fontChips[this._chipValues.indexOf(arg2)];
            chipNode.setWorldPosition(this.startChipPositions[this._chipValues.indexOf(arg2)].worldPosition);
            chipNode.active = true;

            var _targetPos = arg1 === BetSide.BIG ? this.targetBigChipPositions[Math.floor(Math.random() * this.targetBigChipPositions.length)].worldPosition : this.targetSmallChipPositions[Math.floor(Math.random() * this.targetSmallChipPositions.length)].worldPosition;

            var _paddingPos = this.paddingPlacedChipPositions();

            tween(chipNode).parallel(tween().target(chipNode).to(0.25, {
              worldPosition: Vec3.add(new Vec3(), _targetPos, _paddingPos)
            }, {
              easing: 'quadOut'
            }), tween().target(chipNode).to(0.2, {
              scale: Vec3.ONE.clone().multiplyScalar(.5)
            }, {
              easing: 'quadOut'
            }).to(0.25, {
              scale: Vec3.ONE.clone().multiplyScalar(.35)
            }, {
              easing: 'quadOut'
            })).start();
          }
        };

        _proto.resetPositionChipButton = function resetPositionChipButton() {
          this.chipButton1.node.position = new Vec3(this.chipButton1.node.position.x, 0, 0);
          this.chipButton2.node.position = new Vec3(this.chipButton2.node.position.x, 0, 0);
          this.chipButton3.node.position = new Vec3(this.chipButton3.node.position.x, 0, 0);
          this.chipButton4.node.position = new Vec3(this.chipButton4.node.position.x, 0, 0);
          this.chipButton5.node.position = new Vec3(this.chipButton5.node.position.x, 0, 0);
          this.chipButton6.node.position = new Vec3(this.chipButton6.node.position.x, 0, 0);
        };

        _proto.paddingPlacedChipPositions = function paddingPlacedChipPositions() {
          return new Vec3((Math.random() - 0.5) * 2 * this.PADDING_CHIP_RANGE, (Math.random() - 0.5) * 2 * this.PADDING_CHIP_RANGE, 0);
        };

        _proto.animationRollDice = /*#__PURE__*/function () {
          var _animationRollDice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var track, anim;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    this.smallDisk.active = false;
                    this.animationRollDiceNode.active = true;
                    this.rollDiceSpine.node.active = true;
                    this.rollDiceSpine.setAnimation(0, 'shake', false);
                    track = this.rollDiceSpine.getCurrent(0);

                    if (track) {
                      _context2.next = 7;
                      break;
                    }

                    return _context2.abrupt("return");

                  case 7:
                    anim = this.rollDiceSpine.skeletonData.getRuntimeData().animations.find(function (a) {
                      return a.name === track.animation.name;
                    });
                    _context2.next = 10;
                    return GameManager.instance.delay(anim.duration * 1000 - 1000);

                  case 10:
                    this.animationRollDiceNode.active = false;
                    _context2.next = 13;
                    return GameManager.instance.delay(500);

                  case 13:
                    this.smallDisk.active = true;
                    this.rollDiceSpine.node.active = false;

                  case 15:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function animationRollDice() {
            return _animationRollDice.apply(this, arguments);
          }

          return animationRollDice;
        }();

        _proto.animationShowResult = function animationShowResult(callback) {
          var _this12 = this;

          console.log('Show Result animation');
          this.resultLable.string = this.totalNumber + ' - ' + this._currentWinSide;
          this.resultLableNode.active = false;
          tween(this.smallDisk).to(.75, {
            scale: Vec3.ONE.clone().multiplyScalar(3.7)
          }, {
            easing: 'quadOut'
          }).call(function () {
            _this12.smallDisk.scale = Vec3.ONE.clone();
            _this12.smallDisk.active = false;
            _this12.coverDisk.active = true;
            _this12.bigDisk.active = true;
            _this12.coverDisk.position = new Vec3(_this12.coverDisk.position.x, 83, 0);
            var endPos = new Vec3(_this12.coverDisk.position.x, 500, 0);
            tween(_this12.coverDisk).parallel(tween().target(_this12.smallDisk).to(1.25, {
              position: endPos
            }, {
              easing: 'linear'
            }).call(function () {
              _this12.coverDisk.active = false;
              callback();
            }), tween().target(_this12.resultLableNode).delay(.5).call(function () {
              if (_this12.totalNumber < 11) AudioManager.instance.playSFXEffect(AudioNames.RESULT_SMALL);else AudioManager.instance.playSFXEffect(AudioNames.RESULT_BIG);
              _this12.resultLableNode.active = true;
            })).start();
          }).start();
        };

        _proto.showResultEffect = function showResultEffect() {
          var _this13 = this;

          console.log('Show Result Effect');
          this._isNewRound = true;
          this.scheduleOnce(function () {
            _this13.bigDisk.active = false;

            if (_this13.totalNumber < 11) {
              _this13._dotResult.push(true);

              ObserverManager.instance.emit(ObserverType.ON_RESULT_EFFECT, BetSide.SMALL);
            } else {
              _this13._dotResult.push(false);

              ObserverManager.instance.emit(ObserverType.ON_RESULT_EFFECT, BetSide.BIG);
            }

            _this13._dotResult.shift();

            ObserverManager.instance.emit(ObserverType.DOT_RESULT, _this13._dotResult);
            _this13._canShowPayout = true;
          }, 1);
        };

        _proto.payoutEffect = /*#__PURE__*/function () {
          var _payoutEffect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(payout) {
            var _this14 = this;

            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return GameManager.instance.waitUntil(function () {
                      return _this14._canShowPayout;
                    });

                  case 2:
                    _context3.next = 4;
                    return GameManager.instance.delay(250);

                  case 4:
                    this.clearChipNode(payout);

                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          function payoutEffect(_x) {
            return _payoutEffect.apply(this, arguments);
          }

          return payoutEffect;
        }();

        _proto.clearChipNode = function clearChipNode(money) {
          var _this15 = this;

          var _loop = function _loop(i) {
            var chipNode = _this15._chipNodes[i];

            if (chipNode && chipNode.isValid) {
              tween(chipNode).to(0.4, {
                worldPosition: _this15.dealerNode.worldPosition
              }, {
                easing: 'quadOut'
              }).to(0.1, {
                scale: Vec3.ZERO
              }, {
                easing: 'quadOut'
              }).call(function () {
                chipNode.destroy();

                _this15._chipNodes.splice(i, 1);
              }).start();
            }
          };

          for (var i = this._chipNodes.length - 1; i >= 0; i--) {
            _loop(i);
          }

          if (money > 0) {
            AudioManager.instance.playSFXEffect(AudioNames.WIN_CHIP);

            var _chipRecords = this.splitChips(money);

            this.moveChipEffect(_chipRecords.chipRecords, _chipRecords.winMoney);
          }
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
        };

        _proto.showBeginWager = /*#__PURE__*/function () {
          var _showBeginWager = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(isBegin) {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!isBegin) {
                      _context4.next = 8;
                      break;
                    }

                    this.beginStopWagerSpine.node.active = true;
                    this.beginStopWagerSpine.setAnimation(0, 'begin_wager', false);
                    _context4.next = 5;
                    return GameManager.instance.delay(1000);

                  case 5:
                    this.beginStopWagerSpine.node.active = false;
                    _context4.next = 13;
                    break;

                  case 8:
                    this.beginStopWagerSpine.node.active = true;
                    this.beginStopWagerSpine.setAnimation(0, 'stop_wager', false);
                    _context4.next = 12;
                    return GameManager.instance.delay(1000);

                  case 12:
                    this.beginStopWagerSpine.node.active = false;

                  case 13:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          function showBeginWager(_x2) {
            return _showBeginWager.apply(this, arguments);
          }

          return showBeginWager;
        }();

        _proto.startTimeLeftCounter = function startTimeLeftCounter() {
          var _this16 = this,
              _UIManager$instance$g5;

          if (this._timerHandler) {
            this.timerCountdown.fillRange = 0;
            this.unschedule(this._timerHandler);
            this._timerHandler = null;
          }

          var totalTime = 30;
          var startTimeLeft = this._timeLeftCounter;
          var elapsed = 0;
          var lastWarnSecond = -1;
          var isRed = false;
          this.timerCountdown.color = new Color(255, 220, 0);
          this.timerLabel.color = new Color(255, 220, 0);
          this.timerCountdown.fillRange = startTimeLeft / totalTime;
          tween(this.timerCountdown).to(startTimeLeft, {
            fillRange: 0
          }, {
            easing: 'linear'
          }).start();

          this._timerHandler = function (dt) {
            elapsed += dt;
            _this16._timeLeftCounter = Math.max(startTimeLeft - elapsed, 0);
            var secLeft = Math.ceil(_this16._timeLeftCounter);

            if (secLeft <= 5 && secLeft !== lastWarnSecond) {
              if (!isRed) {
                isRed = true;
                _this16.timerCountdown.color = new Color(255, 0, 0);
                _this16.timerLabel.color = new Color(255, 0, 0);
              }

              lastWarnSecond = secLeft;
              AudioManager.instance.playSFXEffect(AudioNames.WARNING_TIME);
            }

            _this16.timerLabel.string = secLeft.toString();

            if (_this16._timeLeftCounter <= 0) {
              _this16.unschedule(_this16._timerHandler);

              _this16._timerHandler = null;
            }
          };

          (_UIManager$instance$g5 = UIManager.instance.getExistUI(PopupWaiting)) == null ? void 0 : _UIManager$instance$g5.hide();
          this.schedule(this._timerHandler, 0);
        } //#endregion
        //#region Update Labels
        //Big
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
          this.totalBigBetLabel.string = '$ ' + GameManager.instance.convertNumberToString(value) + '/';
        };

        _proto.updateNumberPlayerBigBetLabel = function updateNumberPlayerBigBetLabel(value) {
          this.numberPlayerBigBetLabel.string = GameManager.instance.convertNumberToString(value);
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
          this.numberBigBetOfPlayerLabel.string = GameManager.instance.convertNumberToString(value);
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
          this.totalSmallBetLabel.string = '$ ' + GameManager.instance.convertNumberToString(value) + '/';
        };

        _proto.updateNumberPlayerSmallBetLabel = function updateNumberPlayerSmallBetLabel(value) {
          this.numberPlayerSmallBetLabel.string = GameManager.instance.convertNumberToString(value);
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
          this.numberSmallBetOfPlayerLabel.string = GameManager.instance.convertNumberToString(value);
        } //#endregion
        ;

        _createClass(ScreenSmallTable, [{
          key: "numberPlayerBigBet",
          get: function get() {
            return this._numberPlayerBigBet;
          },
          set: function set(value) {
            if (value === this._numberPlayerBigBet) return;
            this._numberPlayerBigBet = value;
            this.updateNumberPlayerBigBetLabel(value);
          }
        }, {
          key: "bigBetTotal",
          get: function get() {
            return this._bigBetTotal;
          },
          set: function set(value) {
            if (value === this._bigBetTotal) return;
            this._bigBetTotal = value;
            this.updateBigBetTotalLabel(value);
          }
        }, {
          key: "numberBigBetOfPlayer",
          get: function get() {
            return this._numberBigBetOfPlayer;
          },
          set: function set(value) {
            if (value === this._numberBigBetOfPlayer) return;
            this._numberBigBetOfPlayer = value;
            this.updateNumberBigBetOfPlayerLabel(value);
          }
        }, {
          key: "numberPlayerSmallBet",
          get: function get() {
            return this._numberPlayerSmallBet;
          },
          set: function set(value) {
            if (value === this._numberPlayerSmallBet) return;
            this._numberPlayerSmallBet = value;
            this.updateNumberPlayerSmallBetLabel(value);
          }
        }, {
          key: "smallBetTotal",
          get: function get() {
            return this._smallBetTotal;
          },
          set: function set(value) {
            if (value === this._smallBetTotal) return;
            this._smallBetTotal = value;
            this.updateSmallBetTotalLabel(value);
          }
        }, {
          key: "numberSmallBetOfPlayer",
          get: function get() {
            return this._numberSmallBetOfPlayer;
          },
          set: function set(value) {
            if (value === this._numberSmallBetOfPlayer) return;
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
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "tableNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "timerNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "timerCountdown", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "beginStopWagerSpine", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "animationRollDiceNode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "rollDiceSpine", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "smallDisk", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "bigDisk", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "coverDisk", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "resultLableNode", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "resultLable", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "dice1Sprite", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "dice2Sprite", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "dice3Sprite", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "diceSprites", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "numberPlayerBigBetLabel", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "totalBigBetLabel", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "numberBigBetOfPlayerLabel", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "numberPlayerSmallBetLabel", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "totalSmallBetLabel", [_dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "numberSmallBetOfPlayerLabel", [_dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "playerNameLabel", [_dec27], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "playerMoneyLabel", [_dec28], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "depositButton", [_dec29], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "chipButton1", [_dec30], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "chipButton2", [_dec31], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "chipButton3", [_dec32], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "chipButton4", [_dec33], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "chipButton5", [_dec34], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "chipButton6", [_dec35], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "reBetButton", [_dec36], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, "numberPlayerJoinTableLabel", [_dec37], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor37 = _applyDecoratedDescriptor(_class2.prototype, "playerInRoomButton", [_dec38], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor38 = _applyDecoratedDescriptor(_class2.prototype, "resultHistoryButton", [_dec39], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor39 = _applyDecoratedDescriptor(_class2.prototype, "dealerNode", [_dec40], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor40 = _applyDecoratedDescriptor(_class2.prototype, "bubbleLabel", [_dec41], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor41 = _applyDecoratedDescriptor(_class2.prototype, "chipContainerNode", [_dec42], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor42 = _applyDecoratedDescriptor(_class2.prototype, "chipSprite", [_dec43], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor43 = _applyDecoratedDescriptor(_class2.prototype, "chipSprites", [_dec44], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor44 = _applyDecoratedDescriptor(_class2.prototype, "startChipPositions", [_dec45], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor45 = _applyDecoratedDescriptor(_class2.prototype, "targetBigChipPositions", [_dec46], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor46 = _applyDecoratedDescriptor(_class2.prototype, "targetSmallChipPositions", [_dec47], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor47 = _applyDecoratedDescriptor(_class2.prototype, "fontChips", [_dec48], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor48 = _applyDecoratedDescriptor(_class2.prototype, "chipSelectedEffects", [_dec49], {
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

System.register("chunks:///_virtual/SmallBetButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseButtonBet.ts', './GameManager.ts', './ObserverManager.ts', './AudioManager.ts', './AudioNames.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, BaseButtonBet, GameManager, ObserverManager, ObserverType, AudioManager, AudioNames;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      BaseButtonBet = module.BaseButtonBet;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverType = module.ObserverType;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      AudioNames = module.AudioNames;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "acc6fSHgHpFWLzNVzQkL+Qh", "SmallBetButton", undefined);

      var ccclass = _decorator.ccclass;
      var SmallBetButton = exports('SmallBetButton', (_dec = ccclass('SmallBetButton'), _dec(_class = /*#__PURE__*/function (_BaseButtonBet) {
        _inheritsLoose(SmallBetButton, _BaseButtonBet);

        function SmallBetButton() {
          return _BaseButtonBet.apply(this, arguments) || this;
        }

        var _proto = SmallBetButton.prototype;

        _proto.onClick = function onClick() {
          _BaseButtonBet.prototype.onClick.call(this);

          if (!this._canBet) return;
          AudioManager.instance.playSFXEffect(AudioNames.CHIP_SHORT);
          this.SendBetInfoToServer(GameManager.instance.numberChipToBet);
          ObserverManager.instance.emit(ObserverType.SAVE_LAST_BET, {
            betSide: this.BetSideMap[this.betButtonType],
            betAmount: GameManager.instance.numberChipToBet
          });
        };

        return SmallBetButton;
      }(BaseButtonBet)) || _class));

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

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, Label, instantiate, resources, Prefab, BaseManager, BaseNotify, BaseOverlap, BasePopup, BaseScreen, UIType;

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
      Label = module.Label;
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
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "1f13e3JDGxNhaKKwgA5bxny", "UIManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UIManager = exports('UIManager', (_dec = ccclass('UIManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(UIManager, _BaseManager);

        function UIManager() {
          var _this$_caches, _this$_curUI;

          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "cScreen", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cPopup", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cOverlap", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cNotify", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "versionLabel", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "version", _descriptor6, _assertThisInitialized(_this));

          _this._roots = {};
          _this._caches = (_this$_caches = {}, _this$_caches[UIType.Screen] = new Map(), _this$_caches[UIType.Popup] = new Map(), _this$_caches[UIType.Notify] = new Map(), _this$_caches[UIType.Overlap] = new Map(), _this$_caches);
          _this._curUI = (_this$_curUI = {}, _this$_curUI[UIType.Screen] = null, _this$_curUI[UIType.Popup] = null, _this$_curUI[UIType.Notify] = null, _this$_curUI[UIType.Overlap] = null, _this$_curUI);
          _this.UI_PATH = 'Prefabs/UI/';
          return _this;
        }

        var _proto = UIManager.prototype;

        _proto.onLoad = function onLoad() {
          _BaseManager.prototype.onLoad.call(this);

          this._roots[UIType.Screen] = this.cScreen;
          this._roots[UIType.Popup] = this.cPopup;
          this._roots[UIType.Overlap] = this.cOverlap;
          this._roots[UIType.Notify] = this.cNotify;
          this.versionLabel.string = this.version;
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
                    cache = this._caches[type];
                    cur = this._curUI[type];

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
                      this._curUI[type] = ui;
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

        _proto.hideAll = function hideAll(type) {
          for (var _iterator = _createForOfIteratorHelperLoose(this._caches[type]), _step; !(_step = _iterator()).done;) {
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
                    parent = this._roots[type];

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
          var cache = this._caches[type];
          return cache.get(name) || null;
        } //#endregion
        ;

        return UIManager;
      }(BaseManager), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cScreen", [_dec2], {
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
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "versionLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "version", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '1.0.0';
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
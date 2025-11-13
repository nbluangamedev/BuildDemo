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

          if (BaseManager._instances.has(clazz)) {
            this.node.destroy();
            return;
          }

          director.addPersistRootNode(this.node);

          BaseManager._instances.set(clazz, this);
        };

        _createClass(BaseManager, null, [{
          key: "instance",
          get: function get() {
            if (!this._instances) {
              this._instances = new Map();
            }

            var inst = this._instances.get(this);

            if (!inst) {
              var _director$getScene;

              var node = new Node();
              node.name = this.name;
              (_director$getScene = director.getScene()) == null ? void 0 : _director$getScene.addChild(node);
              inst = node.addComponent(this);

              this._instances.set(this, inst);
            }

            return inst;
          }
        }]);

        return BaseManager;
      }(Component), _class2._instances = new Map(), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, UIOpacity, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "b35b37DeWlIXYLAQgAV8zaP", "BaseUI", undefined);

      var ccclass = _decorator.ccclass;
      var BaseUI = exports('BaseUI', (_dec = ccclass('BaseUI'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BaseUI, _Component);

        function BaseUI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.isShow = false;
          return _this;
        }

        var _proto = BaseUI.prototype;

        _proto.onLoad = function onLoad() {
          this.uiOpacity = this.node.getComponent(UIOpacity);
        };

        _proto.init = function init() {
          this.uiOpacity = this.node.getComponent(UIOpacity);
        };

        _proto.show = function show() {
          this.node.active = true;
          this.uiOpacity.opacity = 255;
          this.isShow = true;
        };

        _proto.hide = function hide() {
          this.node.active = false;
          this.uiOpacity.opacity = 0;
          this.isShow = false;
        };

        return BaseUI;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BetBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIManager.ts', './ObserverManager.ts', './GameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Component, UIManager, UIType, ObserverManager, ObserverEvent, GameManager;

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
      UIManager = module.UIManager;
      UIType = module.UIType;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
    }, function (module) {
      GameManager = module.GameManager;
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
          if (this._lockHand) return;
          GameManager.instance.betType = this.betType;
          UIManager.instance.showUI(UIType.PopupNumberBet);
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

System.register("chunks:///_virtual/BigBet.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BetBase.ts', './GameManager.ts', './ObserverManager.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, BetType, BetBase, GameManager, ObserverManager, ObserverEvent;

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
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
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
          GameManager.instance.playerBigBet += number;
          GameManager.instance.bigBetTotal += number;
          ObserverManager.instance.emit(ObserverEvent.UpdateTotalBetLabel, GameManager.instance.playerBigBet);
        };

        return BigBet;
      }(BetBase)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIManager.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, UIManager, UIType;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      UIManager = module.UIManager;
      UIType = module.UIType;
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
          UIManager.instance.showUI(UIType.PopupSicbo);
        };

        return BoardController;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CoverResultController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ObserverManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec3, UITransform, Vec2, Component, ObserverManager, ObserverEvent;

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
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      Vec2 = module.Vec2;
      Component = module.Component;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "42ed00GfDFO/IZ9MsnvunSI", "CoverResultController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var CoverController = exports('CoverController', (_dec = ccclass('CoverController'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CoverController, _Component);

        function CoverController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "coverResultNode", _descriptor, _assertThisInitialized(_this));

          _this._offset = new Vec3();
          _this._localPos = new Vec3();
          _this._originPosition = new Vec3();
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

        _proto.checkPosition = function checkPosition() {
          if (this.checkOutRadius(Vec2.clone(this.coverResultNode.position))) {
            this.coverResultNode.active = false;
            ObserverManager.instance.emit(ObserverEvent.CoverResult, false);
            this.coverResultNode.setPosition(this._originPosition);
          }
        };

        _proto.checkOutRadius = function checkOutRadius(touchPos) {
          var uiTransform = this.coverResultNode.getComponent(UITransform);
          var radius = uiTransform.width;
          console.log('radius: ', radius);
          var nodePos = new Vec2(this._originPosition.x, this._originPosition.y);
          console.log('distance: ', Vec2.distance(touchPos, nodePos));
          return Vec2.distance(touchPos, nodePos) > radius;
        };

        return CoverController;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "coverResultNode", [_dec2], {
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

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseManager.ts', './ObserverManager.ts', './UIManager.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, director, BaseManager, ObserverManager, ObserverEvent, UIManager;

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
    }],
    execute: function () {
      exports({
        BetType: void 0,
        SceneName: void 0
      });

      var _dec, _class;

      cclegacy._RF.push({}, "d400byDuhVCyac1seK+8g4k", "GameManager", undefined);

      var ccclass = _decorator.ccclass;
      var SceneName;

      (function (SceneName) {
        SceneName["Gameplay"] = "gameplay";
      })(SceneName || (SceneName = exports('SceneName', {})));

      var BetType;

      (function (BetType) {
        BetType[BetType["None"] = 0] = "None";
        BetType[BetType["Big"] = 1] = "Big";
        BetType[BetType["Small"] = 2] = "Small";
      })(BetType || (BetType = exports('BetType', {})));

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
          _this._smallBetTotal = 0;
          _this._playerBigBet = 0;
          _this._playerSmallBet = 0;
          _this._numberBigBetPlayer = 0;
          _this._numberSmallBetPlayer = 0;
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
          _this.TIME_COUNT = 6;
          _this.TIME_TICK = 1;
          return _this;
        }

        var _proto = GameManager.prototype; //#endregion
        //#region Methods

        _proto.start = function start() {
          var _this2 = this;

          this._timerCount = this.TIME_COUNT;
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

          if (this._timer >= this.TIME_TICK) {
            this._timer -= this.TIME_TICK;
            this._timerCount--;
            ObserverManager.instance.emit(ObserverEvent.UpdateTimer, this._timerCount);
          }
        };

        _proto.resetCountdown = /*#__PURE__*/function () {
          var _resetCountdown = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.delay(2000);

                  case 2:
                    this.canCountdown = true;
                    _context.next = 5;
                    return this.delay(1000);

                  case 5:
                    UIManager.instance.lightRotateEffect.hideLight();

                  case 6:
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
        } //#endregion
        ;

        _createClass(GameManager, [{
          key: "playerMoney",
          get: function get() {
            return this._playerMoney;
          },
          set: function set(value) {
            this._playerMoney = value;
            ObserverManager.instance.emit(ObserverEvent.UpdatePlayerMoneyLabel, this._playerMoney);
          }
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
          key: "smallBetTotal",
          get: function get() {
            return this._smallBetTotal;
          },
          set: function set(value) {
            this._smallBetTotal = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateSmallBetTotalLabel, this._smallBetTotal);
          }
        }, {
          key: "playerBigBet",
          get: function get() {
            return this._playerBigBet;
          },
          set: function set(value) {
            if (value > 0) this.numberBigBetPlayer++;
            this._playerBigBet = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateBigBetTotalLabel, this._playerBigBet);
          }
        }, {
          key: "playerSmallBet",
          get: function get() {
            return this._playerSmallBet;
          },
          set: function set(value) {
            if (value > 0) this.numberSmallBetPlayer++;
            this._playerSmallBet = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateSmallBetTotalLabel, this._playerSmallBet);
          }
        }, {
          key: "numberBigBetPlayer",
          get: function get() {
            return this._numberBigBetPlayer;
          },
          set: function set(value) {
            this._numberBigBetPlayer = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateNumberBigBetPlayerLabel, this._numberBigBetPlayer);
          }
        }, {
          key: "numberSmallBetPlayer",
          get: function get() {
            return this._numberSmallBetPlayer;
          },
          set: function set(value) {
            this._numberSmallBetPlayer = value;
            ObserverManager.instance.emit(ObserverEvent.UpdateNumberSmallBetPlayerLabel, this._numberSmallBetPlayer);
          }
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
            this.handButton.node.getComponent(Sprite).spriteFrame = this.handSpriteFrames[0];
          } else {
            GameManager.instance.isShowHand = true;
            this.handButton.node.getComponent(Sprite).spriteFrame = this.handSpriteFrames[1];
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

System.register("chunks:///_virtual/HelpButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
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

      cclegacy._RF.push({}, "85c52P66s5DpIoaQVx1chtc", "HelpButton", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var HelpButton = exports('HelpButton', (_dec = ccclass('HelpButton'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(HelpButton, _Component);

        function HelpButton() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "targetNode", _descriptor, _assertThisInitialized(_this));

          _this._isShowTarget = false;
          return _this;
        }

        var _proto = HelpButton.prototype;

        _proto.showTarget = function showTarget() {
          if (this._isShowTarget) {
            this._isShowTarget = false;
            this.targetNode.active = false;
          } else {
            this._isShowTarget = true;
            this.targetNode.active = true;
          }
        };

        return HelpButton;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

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

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LightRotateEffect = exports('LightRotateEffect', (_dec = ccclass('LightRotateEffect'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LightRotateEffect, _Component);

        function LightRotateEffect() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = LightRotateEffect.prototype;

        _proto.showLight = function showLight(position) {
          try {
            console.log('showLight', position);
            this.node.setPosition(position);
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

System.register("chunks:///_virtual/main", ['./BoardController.ts', './BetBase.ts', './BigBet.ts', './SmallBet.ts', './BaseManager.ts', './BaseUI.ts', './GameManager.ts', './ObserverManager.ts', './UIManager.ts', './PopupNumberBet.ts', './PopupSicbo.ts', './CoverResultController.ts', './DiceRotateEffect.ts', './DotResult.ts', './HandButtonController.ts', './HelpButton.ts', './LightRotateEffect.ts', './WebViewController.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
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
        ObserverEvent["UpdateNumberBigBetPlayerLabel"] = "updateNumberBigBetPlayerLabel";
        ObserverEvent["UpdateNumberSmallBetPlayerLabel"] = "updateNumberSmallBetPlayerLabel";
        ObserverEvent["CoverResult"] = "coverResult";
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

System.register("chunks:///_virtual/PopupNumberBet.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts', './GameManager.ts', './ObserverManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, EditBox, Label, tween, Vec3, BaseUI, GameManager, BetType, ObserverManager, ObserverEvent;

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
      EditBox = module.EditBox;
      Label = module.Label;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      BaseUI = module.BaseUI;
    }, function (module) {
      GameManager = module.GameManager;
      BetType = module.BetType;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

      cclegacy._RF.push({}, "533ac6VFvNFv7vYnG8fVMdD", "PopupNumberBet", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PopupNumberBet = exports('PopupNumberBet', (_dec = ccclass('PopupNumberBet'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(EditBox), _dec5 = property(Label), _dec6 = property(Button), _dec7 = property(Button), _dec8 = property(Button), _dec9 = property(Button), _dec10 = property(Button), _dec11 = property(Button), _dec12 = property(Button), _dec13 = property(Button), _dec14 = property(Button), _dec15 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(PopupNumberBet, _BaseUI);

        function PopupNumberBet() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseUI.call.apply(_BaseUI, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "okButton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "closeButton", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "inputBetEditBox", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "totalBetLabel", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number1kButton", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number5kButton", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number10kButton", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number50kButton", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number100kButton", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number200kButton", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number500kButton", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number1mButton", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number5mButton", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "number10mButton", _descriptor14, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PopupNumberBet.prototype; //#endregion
        //#region Methods

        _proto.start = function start() {
          this.okButton.node.on(Button.EventType.CLICK, this.ok, this);
          this.closeButton.node.on(Button.EventType.CLICK, this.close, this);
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
          ObserverManager.instance.on(ObserverEvent.UpdateTotalBetLabel, this.updateTotalBetLabel.bind(this));
        };

        _proto.onDestroy = function onDestroy() {
          ObserverManager.instance.off(ObserverEvent.UpdateTotalBetLabel, this.updateTotalBetLabel.bind(this));
        };

        _proto.updateTotalBetLabel = function updateTotalBetLabel() {
          if (GameManager.instance.betType === BetType.Big) {
            this.totalBetLabel.string = 'Your Big Bet: ' + GameManager.instance.formatNumber(GameManager.instance.playerBigBet);
          } else {
            this.totalBetLabel.string = 'Your Small Bet: ' + GameManager.instance.formatNumber(GameManager.instance.playerSmallBet);
          }
        };

        _proto.show = function show() {
          var _this2 = this;

          _BaseUI.prototype.show.call(this);

          this.okButton.interactable = false;
          this.closeButton.interactable = false;
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
          this.inputBetEditBox.string = '0';
          this.updateTotalBetLabel();
          this.uiOpacity.opacity = 0;
          tween(this.uiOpacity).to(.5, {
            opacity: 255
          }, {
            easing: "quartInOut"
          }).start();
          this.node.scale = new Vec3(.2, .2, 1);
          tween(this.node).to(.5, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: "quartInOut"
          }).call(function () {
            _this2.okButton.interactable = true;
            _this2.closeButton.interactable = true;
            _this2.number1kButton.interactable = true;
            _this2.number5kButton.interactable = true;
            _this2.number10kButton.interactable = true;
            _this2.number50kButton.interactable = true;
            _this2.number100kButton.interactable = true;
            _this2.number200kButton.interactable = true;
            _this2.number500kButton.interactable = true;
            _this2.number1mButton.interactable = true;
            _this2.number5mButton.interactable = true;
            _this2.number10mButton.interactable = true;
          }).start();
        };

        _proto.hide = function hide() {
          this.okButton.interactable = false;
          this.closeButton.interactable = false;
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

          _BaseUI.prototype.hide.call(this);
        };

        _proto.ok = function ok() {
          var betNumber = parseInt(this.inputBetEditBox.string);

          if (betNumber > 0 && this.canBet(betNumber)) {
            this.updateDataOnBet(betNumber);
            this.hide();
          }
        };

        _proto.close = function close() {
          this.hide();
        };

        _proto.canBet = function canBet(betNumber) {
          return GameManager.instance.playerMoney >= betNumber;
        };

        _proto.updateDataOnBet = function updateDataOnBet(betNumber) {
          GameManager.instance.playerMoney -= betNumber;
          ObserverManager.instance.emit(ObserverEvent.NumberBet, betNumber);
        };

        _proto.number1k = function number1k() {
          if (!this.canBet(1000)) return;
          this.updateDataOnBet(1000);
        };

        _proto.number5k = function number5k() {
          if (!this.canBet(5000)) return;
          this.updateDataOnBet(5000);
        };

        _proto.number10k = function number10k() {
          if (!this.canBet(10000)) return;
          this.updateDataOnBet(10000);
        };

        _proto.number50k = function number50k() {
          if (!this.canBet(50000)) return;
          this.updateDataOnBet(50000);
        };

        _proto.number100k = function number100k() {
          if (!this.canBet(100000)) return;
          this.updateDataOnBet(100000);
        };

        _proto.number200k = function number200k() {
          if (!this.canBet(200000)) return;
          this.updateDataOnBet(200000);
        };

        _proto.number500k = function number500k() {
          if (!this.canBet(500000)) return;
          this.updateDataOnBet(500000);
        };

        _proto.number1m = function number1m() {
          if (!this.canBet(1000000)) return;
          this.updateDataOnBet(1000000);
        };

        _proto.number5m = function number5m() {
          if (!this.canBet(5000000)) return;
          this.updateDataOnBet(5000000);
        };

        _proto.number10m = function number10m() {
          if (!this.canBet(10000000)) return;
          this.updateDataOnBet(10000000);
        } //#endregion
        ;

        return PopupNumberBet;
      }(BaseUI), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "okButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "inputBetEditBox", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "totalBetLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "number1kButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "number5kButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "number10kButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "number50kButton", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "number100kButton", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "number200kButton", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "number500kButton", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "number1mButton", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "number5mButton", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "number10mButton", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PopupSicbo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts', './ObserverManager.ts', './GameManager.ts', './BetBase.ts', './UIManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, Node, Sprite, Animation, SpriteFrame, BaseUI, ObserverManager, ObserverEvent, GameManager, BetType, UIManager, UIType;

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
      Sprite = module.Sprite;
      Animation = module.Animation;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      BaseUI = module.BaseUI;
    }, function (module) {
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      BetType = module.BetType;
    }, function (module) {
      UIManager = module.UIManager;
      UIType = module.UIType;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17;

      cclegacy._RF.push({}, "245551ysGtDZKzrBkVqyOkp", "PopupSicbo", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PopupSicbo = exports('PopupSicbo', (_dec = ccclass('PopupSicbo'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Label), _dec10 = property(Node), _dec11 = property(Sprite), _dec12 = property(Sprite), _dec13 = property(Sprite), _dec14 = property(Node), _dec15 = property(Animation), _dec16 = property(Node), _dec17 = property([SpriteFrame]), _dec18 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(PopupSicbo, _BaseUI);

        function PopupSicbo() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseUI.call.apply(_BaseUI, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "playerMoneyLabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bigBetTotalLabel", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "smallBetTotalLabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bigTitleNode", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "smallTitleNode", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberBigBetPlayerLabel", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberSmallBetPlayerLabel", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timeLabel", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceResultNode", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice1Sprite", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice2Sprite", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dice3Sprite", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceAnimationNode", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceAnimation", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotateEffectNode", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "diceSprites", _descriptor16, _assertThisInitialized(_this));

          _this.dice1Number = 0;
          _this.dice2Number = 0;
          _this.dice3Number = 0;
          _this.totalNumber = 0;

          _initializerDefineProperty(_this, "coverResultNode", _descriptor17, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PopupSicbo.prototype; //#endregion

        _proto.start = function start() {
          ObserverManager.instance.on(ObserverEvent.RollDice, this.rollDice.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateTimer, this.updateTimer.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdatePlayerMoneyLabel, this.updatePlayerMoneyLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateBigBetTotalLabel, this.updateBigBetTotalLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateSmallBetTotalLabel, this.updateSmallBetTotalLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateNumberBigBetPlayerLabel, this.updateNumberBigBetPlayerLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.UpdateNumberSmallBetPlayerLabel, this.updateNumberSmallBetPlayerLabel.bind(this));
          ObserverManager.instance.on(ObserverEvent.CoverResult, this.coverResult.bind(this));
          this.updatePlayerMoneyLabel(GameManager.instance.playerMoney);
          this.updateBigBetTotalLabel(GameManager.instance.bigBetTotal);
          this.updateSmallBetTotalLabel(GameManager.instance.smallBetTotal);
          this.diceResultNode.active = false;
          this.timeLabel.node.active = true;
          this.diceAnimationNode.active = false;
          this.rotateEffectNode.active = false;
        };

        _proto.onDestroy = function onDestroy() {
          ObserverManager.instance.off(ObserverEvent.RollDice, this.rollDice.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateTimer, this.updateTimer.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdatePlayerMoneyLabel, this.updatePlayerMoneyLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateBigBetTotalLabel, this.updateBigBetTotalLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateSmallBetTotalLabel, this.updateSmallBetTotalLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateNumberBigBetPlayerLabel, this.updateNumberBigBetPlayerLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.UpdateNumberSmallBetPlayerLabel, this.updateNumberSmallBetPlayerLabel.bind(this));
          ObserverManager.instance.off(ObserverEvent.CoverResult, this.coverResult.bind(this));
        };

        _proto.coverResult = function coverResult(value) {
          if (!value) this.showResultEffect(true);
        };

        _proto.updatePlayerMoneyLabel = function updatePlayerMoneyLabel(value) {
          this.playerMoneyLabel.string = GameManager.instance.formatNumber(value);
        };

        _proto.updateBigBetTotalLabel = function updateBigBetTotalLabel(value) {
          this.bigBetTotalLabel.string = GameManager.instance.formatNumber(value);
        };

        _proto.updateSmallBetTotalLabel = function updateSmallBetTotalLabel(value) {
          this.smallBetTotalLabel.string = GameManager.instance.formatNumber(value);
        };

        _proto.updateNumberBigBetPlayerLabel = function updateNumberBigBetPlayerLabel(value) {
          this.numberBigBetPlayerLabel.string = value.toString();
        };

        _proto.updateNumberSmallBetPlayerLabel = function updateNumberSmallBetPlayerLabel(value) {
          this.numberSmallBetPlayerLabel.string = value.toString();
        };

        _proto.rollDice = function rollDice() {
          var _this2 = this;

          console.log('rollDice');
          UIManager.instance.hideUI(UIType.PopupNumberBet);
          this.dice1Number = Math.floor(Math.random() * 6) + 1;
          this.dice2Number = Math.floor(Math.random() * 6) + 1;
          this.dice3Number = Math.floor(Math.random() * 6) + 1;
          this.totalNumber = this.dice1Number + this.dice2Number + this.dice3Number;
          this.animationRollDice(function () {
            console.log('animationRollDice callback');

            _this2.showResultEffect(GameManager.instance.isShowHand);
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
              if (this.totalNumber < 10) {
                GameManager.instance.playerMoney += GameManager.instance.playerSmallBet * 2;
                GameManager.instance.dotResult.push(true);
                UIManager.instance.lightRotateEffect.showLight(this.smallTitleNode.position);
              } else {
                GameManager.instance.playerMoney += GameManager.instance.playerBigBet * 2;
                GameManager.instance.dotResult.push(false);
                UIManager.instance.lightRotateEffect.showLight(this.bigTitleNode.position);
              }
            } catch (e) {
              console.error('showResultEffect error:', e);
            }

            GameManager.instance.dotResult.shift();
            GameManager.instance.playerBigBet = 0;
            GameManager.instance.playerSmallBet = 0;
            GameManager.instance.bigBetTotal = 0;
            GameManager.instance.smallBetTotal = 0;
            GameManager.instance.numberBigBetPlayer = 0;
            GameManager.instance.numberSmallBetPlayer = 0;
            GameManager.instance.betType = BetType.None;
            ObserverManager.instance.emit(ObserverEvent.UpdateDotResult, GameManager.instance.dotResult);
            ObserverManager.instance.emit(ObserverEvent.LockHand, false);
            GameManager.instance.resetCountdown();
          } else {
            this.coverResultNode.active = true;
          }

          this.updateDiceSprites();
        };

        _proto.updateTimer = function updateTimer(timer) {
          this.diceResultNode.active = false;
          this.diceAnimationNode.active = false;
          this.rotateEffectNode.active = false;
          this.timeLabel.string = timer.toString();
          this.timeLabel.node.active = true;
        };

        return PopupSicbo;
      }(BaseUI), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerMoneyLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bigBetTotalLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "smallBetTotalLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bigTitleNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "smallTitleNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "numberBigBetPlayerLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "numberSmallBetPlayerLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "timeLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "diceResultNode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "dice1Sprite", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "dice2Sprite", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "dice3Sprite", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "diceAnimationNode", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "diceAnimation", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "rotateEffectNode", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "diceSprites", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "coverResultNode", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SmallBet.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BetBase.ts', './ObserverManager.ts', './GameManager.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, BetType, BetBase, ObserverManager, ObserverEvent, GameManager;

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
      ObserverManager = module.ObserverManager;
      ObserverEvent = module.ObserverEvent;
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
          GameManager.instance.playerSmallBet += number;
          GameManager.instance.smallBetTotal += number;
          ObserverManager.instance.emit(ObserverEvent.UpdateTotalBetLabel, GameManager.instance.playerSmallBet);
        };

        return SmallBet;
      }(BetBase)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts', './BaseManager.ts', './LightRotateEffect.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Camera, BaseUI, BaseManager, LightRotateEffect;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Camera = module.Camera;
    }, function (module) {
      BaseUI = module.BaseUI;
    }, function (module) {
      BaseManager = module.BaseManager;
    }, function (module) {
      LightRotateEffect = module.LightRotateEffect;
    }],
    execute: function () {
      exports('UIType', void 0);

      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "b4b26h3Z0xB4K4my1WzLa0e", "UIManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UIType;

      (function (UIType) {
        UIType[UIType["PopupNumberBet"] = 0] = "PopupNumberBet";
        UIType[UIType["PopupSicbo"] = 1] = "PopupSicbo";
      })(UIType || (UIType = exports('UIType', {})));

      var UIManager = exports('UIManager', (_dec = ccclass('UIManager'), _dec2 = property(Camera), _dec3 = property(BaseUI), _dec4 = property(BaseUI), _dec5 = property(LightRotateEffect), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseManager) {
        _inheritsLoose(UIManager, _BaseManager);

        function UIManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseManager.call.apply(_BaseManager, [this].concat(args)) || this;
          _this._allUI = [];

          _initializerDefineProperty(_this, "uiCamera", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "popupNumberBet", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "popupSicbo", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lightRotateEffect", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = UIManager.prototype;

        _proto.start = function start() {
          this._allUI.push(this.popupNumberBet);

          this._allUI.push(this.popupSicbo);

          if (this.popupNumberBet.node.active) this.popupNumberBet.hide();else this.popupNumberBet.init();
          if (this.popupSicbo.node.active) this.popupSicbo.hide();else this.popupSicbo.init();
        };

        _proto.showUI = function showUI(uiType) {
          switch (uiType) {
            case UIType.PopupNumberBet:
              this.popupNumberBet.show();
              break;

            case UIType.PopupSicbo:
              this.popupSicbo.show();
              break;
          }
        };

        _proto.hideUI = function hideUI(uiType) {
          switch (uiType) {
            case UIType.PopupNumberBet:
              this.popupNumberBet.hide();
              break;

            case UIType.PopupSicbo:
              this.popupSicbo.hide();
              break;
          }
        };

        return UIManager;
      }(BaseManager), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiCamera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "popupNumberBet", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "popupSicbo", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lightRotateEffect", [_dec5], {
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
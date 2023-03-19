'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
exports.__esModule = true;
var src_1 = require('rlang-kernel/src');
var rlang_grammar_1 = require('rlang-grammar');
var R = /** @class */ (function (_super) {
  __extends(R, _super);
  function R() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  R.prototype.ready = function ($I, $O) {
    // console.log('R ready');
    var ddd = $O('out');
    var ccc = this.send({ hello2: 'world', fff: '' });
    ccc.to(ddd);
    // this.send({ hello: 'world' }).to($O('out'));
  };
  R.meta = {
    name: 'RRRRR',
    type: rlang_grammar_1.NodeType.R,
    desc: 'RRRRR',
    env: [rlang_grammar_1.RuntimeEnv.Node],
  };
  return R;
})(src_1.Node);
exports['default'] = R;

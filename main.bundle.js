webpackJsonp([1,4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_target__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render_context__ = __webpack_require__(25);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var FBO = (function (_super) {
    __extends(FBO, _super);
    function FBO(shader, sizeX, sizeY) {
        var _this = _super.call(this, shader, sizeX, sizeY) || this;
        _this._writeToTexture = false;
        _this.resetTexture();
        _this._framebuffer = __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].createFramebuffer();
        return _this;
    }
    FBO.prototype.render = function () {
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].viewport(0, 0, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].clear(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].COLOR_BUFFER_BIT | __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].DEPTH_BUFFER_BIT);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].useProgram(this._program);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].enableVertexAttribArray(this._positionAttribLocation);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].ARRAY_BUFFER, this._positionBuffer);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].vertexAttribPointer(this._positionAttribLocation, 2, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FLOAT, false, 0, 0);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].enableVertexAttribArray(this._texCoordAttribLocation);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].ARRAY_BUFFER, this._texCoordBuffer);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].vertexAttribPointer(this._texCoordAttribLocation, 2, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FLOAT, false, 0, 0);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindFramebuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FRAMEBUFFER, this._framebuffer);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].framebufferTexture2D(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FRAMEBUFFER, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].COLOR_ATTACHMENT0, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, this._texture, 0);
        this._shader.update();
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].drawArrays(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TRIANGLES, 0, 6);
        if (this._writeToTexture) {
            __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].readPixels(0, 0, this.sizeX, this.sizeY, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].UNSIGNED_BYTE, this._textureData);
        }
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindFramebuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FRAMEBUFFER, null);
    };
    FBO.prototype.resetTexture = function () {
        this._texture = __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].createTexture();
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, this._texture);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameterf(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_WRAP_S, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].CLAMP_TO_EDGE);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameterf(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_WRAP_T, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].CLAMP_TO_EDGE);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_MAG_FILTER, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].NEAREST);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_MIN_FILTER, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].NEAREST);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texImage2D(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, 0, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].RGBA32F, this.sizeX, this.sizeY, 0, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FLOAT, null);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, null);
        this._textureData = new Uint8Array(this.sizeX * this.sizeY * 4);
    };
    FBO.prototype.resize = function (sizeX, sizeY) {
        this.setWindowSize(sizeX, sizeY);
        this.resetTexture();
    };
    FBO.prototype.enableWriteToTexture = function () {
        this._writeToTexture = true;
    };
    Object.defineProperty(FBO.prototype, "texture", {
        get: function () { return this._texture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FBO.prototype, "textureData", {
        get: function () { return this._textureData; },
        enumerable: true,
        configurable: true
    });
    return FBO;
}(__WEBPACK_IMPORTED_MODULE_0__render_target__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = FBO;
//# sourceMappingURL=fbo.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_target__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render_context__ = __webpack_require__(25);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var PingPongFBO = (function (_super) {
    __extends(PingPongFBO, _super);
    function PingPongFBO(shader, sizeX, sizeY) {
        var _this = _super.call(this, shader, sizeX, sizeY) || this;
        _this.resetTextures();
        _this._framebuffer = __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].createFramebuffer();
        return _this;
    }
    PingPongFBO.prototype.render = function () {
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].viewport(0, 0, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].clear(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].COLOR_BUFFER_BIT | __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].DEPTH_BUFFER_BIT);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].useProgram(this._program);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].enableVertexAttribArray(this._positionAttribLocation);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].ARRAY_BUFFER, this._positionBuffer);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].vertexAttribPointer(this._positionAttribLocation, 2, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FLOAT, false, 0, 0);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].enableVertexAttribArray(this._texCoordAttribLocation);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].ARRAY_BUFFER, this._texCoordBuffer);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].vertexAttribPointer(this._texCoordAttribLocation, 2, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FLOAT, false, 0, 0);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindFramebuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FRAMEBUFFER, this._framebuffer);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].framebufferTexture2D(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FRAMEBUFFER, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].COLOR_ATTACHMENT0, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, this._textures[this._currentTexture], 0);
        this._shader.update();
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].drawArrays(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TRIANGLES, 0, 6);
        //gl.readPixels(0, 0, this.sizeX, this.sizeY, gl.RGBA, gl.UNSIGNED_BYTE, this._textureData);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindFramebuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FRAMEBUFFER, null);
        this._currentTexture = 1 - this._currentTexture;
    };
    PingPongFBO.prototype.resetTextures = function () {
        this._textures = [];
        this._textures.push(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].createTexture());
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, this._textures[0]);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_MAG_FILTER, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].LINEAR);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_MIN_FILTER, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].LINEAR);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_WRAP_S, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].CLAMP_TO_EDGE);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_WRAP_T, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].CLAMP_TO_EDGE);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texImage2D(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, 0, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].RGBA32F, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor, 0, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FLOAT, null);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, null);
        this._textures.push(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].createTexture());
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, this._textures[1]);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_MAG_FILTER, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].LINEAR);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_MIN_FILTER, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].LINEAR);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_WRAP_S, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].CLAMP_TO_EDGE);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_WRAP_T, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].CLAMP_TO_EDGE);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].texImage2D(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, 0, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].RGBA32F, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor, 0, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FLOAT, null);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TEXTURE_2D, null);
        this._currentTexture = 0;
        this._textureData = new Uint8Array(this.sizeX * this.sizeY * 4);
    };
    Object.defineProperty(PingPongFBO.prototype, "texture", {
        get: function () { return this._textures[1 - this._currentTexture]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PingPongFBO.prototype, "lastTexture", {
        get: function () { return this._textures[1 - this._currentTexture]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PingPongFBO.prototype, "textureData", {
        get: function () { return this._textureData; },
        enumerable: true,
        configurable: true
    });
    return PingPongFBO;
}(__WEBPACK_IMPORTED_MODULE_0__render_target__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = PingPongFBO;
//# sourceMappingURL=pingpong-fbo.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fractal_settings_menger_sponge__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__light_settings__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__render_effects_settings__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__material_settings__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__post_effects_settings_bloom_settings__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__render_settings__ = __webpack_require__(316);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SettingsService = (function () {
    function SettingsService() {
        this.refreshScreen = false;
        // Renderer attributes
        this.isLoadingSub = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](true);
        this.renderTypeSub = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](0);
        this.shouldRenderSub = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](true);
        this.zoomSub = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](1.5);
        // Uniform attributes
        this.renderSettings = new __WEBPACK_IMPORTED_MODULE_7__render_settings__["a" /* default */]();
        this.lightSettings = new __WEBPACK_IMPORTED_MODULE_3__light_settings__["a" /* default */]();
        this.renderEffectSettings = new __WEBPACK_IMPORTED_MODULE_4__render_effects_settings__["a" /* RenderEffectsSetting */]();
        this.bloomSettings = new __WEBPACK_IMPORTED_MODULE_6__post_effects_settings_bloom_settings__["a" /* BloomSettings */]();
        this.materialSettings = new __WEBPACK_IMPORTED_MODULE_5__material_settings__["a" /* default */]();
        // Fractals
        this.fractalTypeSub = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](0);
        this.mengerSponge = new __WEBPACK_IMPORTED_MODULE_2__fractal_settings_menger_sponge__["a" /* MengerSponge */]();
        // Material attributes
        this.materialTypeSub = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](5);
        this.materialColorSub = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](vec3.fromValues(1.0, 1.0, 1.0));
        // Ray tracing attributes
        this.selectedObjectSub = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](null);
        this._powerObservable = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](10.0);
        this._detailLevelObservable = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](1000);
        this._maxIterationsObservable = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](300);
    }
    SettingsService.prototype.connectShader = function (shader) {
        this.renderSettings.connectShader(shader);
        this.lightSettings.connectShader(shader);
        this.renderEffectSettings.connectShader(shader);
        this.materialSettings.connectShader(shader);
        this.bloomSettings.connectShader(shader);
    };
    SettingsService.prototype.scaleDown = function () {
        // this.refreshScreen = true
        // this.scaledDown = true
        //
        // clearTimeout(this.scaleDownTimer)
        // this.scaleDownTimer = setTimeout(() => {
        //   this.scaledDown = false
        //   this.refreshScreen = true
        //   this.scaleDownTimer = null
        // }, 500)
    };
    Object.defineProperty(SettingsService.prototype, "powerObservable", {
        get: function () { return this._powerObservable.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsService.prototype, "detailLevelObservable", {
        get: function () { return this._detailLevelObservable.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsService.prototype, "maxIterationsObservable", {
        get: function () { return this._maxIterationsObservable.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsService.prototype, "zoom", {
        set: function (val) { this.zoomSub.next(val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsService.prototype, "power", {
        set: function (val) { this._powerObservable.next(val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsService.prototype, "detailLevel", {
        set: function (val) { this._detailLevelObservable.next(val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsService.prototype, "maxIterations", {
        set: function (val) { this._maxIterationsObservable.next(val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsService.prototype, "materialType", {
        set: function (val) { this.materialTypeSub.next(val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsService.prototype, "materialColor", {
        set: function (val) { this.materialColorSub.next(val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsService.prototype, "shouldRender", {
        set: function (val) { this.shouldRenderSub.next(val); },
        enumerable: true,
        configurable: true
    });
    return SettingsService;
}());
SettingsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SettingsService);

//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ 228:
/***/ (function(module, exports) {

module.exports = "#version 300 es\n#define GLSLIFY 1\n\nin vec2 a_texCoord;\nin vec4 a_position;\n\nout vec2 v_texCoord;\n\nvoid main() {\n  gl_Position = a_position;\n\n  v_texCoord = a_texCoord;\n}"

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gl; });
/* harmony export (immutable) */ __webpack_exports__["b"] = initContext;
var gl;
function initContext(canvas) {
    gl = canvas.nativeElement.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true });
    gl.getExtension('EXT_color_buffer_float');
    gl.getExtension('OES_texture_float_linear');
}
//# sourceMappingURL=render-context.js.map

/***/ }),

/***/ 277:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 277;


/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(320);
///<reference path="./typings/webgl2.d.ts" />
///<reference path="../node_modules/@types/node/index.d.ts" />
///<reference path="./typings/gl-matrix.d.ts" />
///<reference path="./typings/jquery.d.ts" />




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderer_render_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__renderer_settings_settings_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__renderer_scene_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(renderService, settingsService, sceneService, dialog) {
        this.renderService = renderService;
        this.settingsService = settingsService;
        this.sceneService = sceneService;
        this.dialog = dialog;
        //this.renderCanvas.nativeElement._bloomEnabled = false
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.renderCanvas.nativeElement.oncontextmenu = function (e) { return e.preventDefault(); };
        this.renderService.init(this.renderCanvas);
    };
    AppComponent.prototype.ngAfterContentInit = function () {
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* ViewChild */])('renderCanvas'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], AppComponent.prototype, "renderCanvas", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(396),
        styles: [__webpack_require__(375)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__renderer_render_service__["a" /* RenderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__renderer_render_service__["a" /* RenderService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__renderer_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__renderer_settings_settings_service__["a" /* SettingsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__renderer_scene_service__["a" /* SceneService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__renderer_scene_service__["a" /* SceneService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MdDialog */]) === "function" && _e || Object])
], AppComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__renderer_render_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_bottom_bar_bottom_bar_component__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__renderer_settings_settings_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_top_bar_top_bar_component__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_settings_render_settings_render_settings_component__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_settings_setting_attribute_setting_attribute_component__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_settings_settings_container_settings_container_component__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_settings_fractal_settings_fractal_settings_component__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__renderer_scene_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_settings_object_settings_object_settings_component__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_loading_dialog_loading_dialog_component__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_animations__ = __webpack_require__(284);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_top_bar_top_bar_component__["a" /* TopBarComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_settings_fractal_settings_fractal_settings_component__["a" /* FractalSettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_settings_render_settings_render_settings_component__["a" /* RenderSettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_bottom_bar_bottom_bar_component__["a" /* BottomBarComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_settings_setting_attribute_setting_attribute_component__["a" /* SettingAttributeComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_settings_settings_container_settings_container_component__["a" /* SettingsContainerComponent */],
            __WEBPACK_IMPORTED_MODULE_16__components_settings_object_settings_object_settings_component__["a" /* ObjectSettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_loading_dialog_loading_dialog_component__["a" /* LoadingDialogComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_17__components_loading_dialog_loading_dialog_component__["a" /* LoadingDialogComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MaterialModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__renderer_render_service__["a" /* RenderService */],
            __WEBPACK_IMPORTED_MODULE_9__renderer_settings_settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_15__renderer_scene_service__["a" /* SceneService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BottomBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BottomBarComponent = (function () {
    function BottomBarComponent(settingsService) {
        this.settingsService = settingsService;
    }
    return BottomBarComponent;
}());
BottomBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Component */])({
        selector: 'bottom-bar',
        template: __webpack_require__(397),
        styles: [__webpack_require__(376)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__["a" /* SettingsService */]) === "function" && _a || Object])
], BottomBarComponent);

var _a;
//# sourceMappingURL=bottom-bar.component.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingDialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingDialogComponent = (function () {
    function LoadingDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return LoadingDialogComponent;
}());
LoadingDialogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Component */])({
        selector: 'loading-dialog',
        template: __webpack_require__(398),
        styles: [__webpack_require__(377)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialogRef */]) === "function" && _a || Object])
], LoadingDialogComponent);

var _a;
//# sourceMappingURL=loading-dialog.component.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FractalSettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var hexRgb = __webpack_require__(50);
var FractalSettingsComponent = (function () {
    function FractalSettingsComponent(settingsService) {
        var _this = this;
        this.settingsService = settingsService;
        this.rayMarchingMode = false;
        this.materials = [{ id: 0, name: 'Diffuse' }, { id: 5, name: 'Glossy' }, { id: 1, name: 'Specular' }, { id: 2, name: 'Transmission' }];
        this.selelectedMaterial = 0;
        this.materialColor = '#ffffff';
        this.fractals = [{ id: 0, name: 'Mandelbulb' }, { id: 1, name: 'Mengersponge' }];
        this.settingsService.renderTypeSub.asObservable().subscribe(function (type) {
            _this.rayMarchingMode = type == 1.0;
        });
    }
    FractalSettingsComponent.prototype.powerUpdate = function (event) {
        this.settingsService.power = event.value;
    };
    FractalSettingsComponent.prototype.detailLevelUpdate = function (event) {
        this.settingsService.detailLevel = event.value;
    };
    FractalSettingsComponent.prototype.maxIterationsUpdate = function (event) {
        this.settingsService.maxIterations = event.value;
    };
    FractalSettingsComponent.prototype.materialTypeChange = function (event) {
        this.settingsService.materialType = this.selelectedMaterial;
    };
    FractalSettingsComponent.prototype.materialColorChanged = function (event) {
        var color = hexRgb(event);
        this.settingsService.materialColor = vec3.fromValues(color[0] / 255, color[1] / 255, color[2] / 255);
    };
    return FractalSettingsComponent;
}());
FractalSettingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Component */])({
        selector: 'fractal-settings',
        template: __webpack_require__(399),
        styles: [__webpack_require__(378)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__["a" /* SettingsService */]) === "function" && _a || Object])
], FractalSettingsComponent);

var _a;
//# sourceMappingURL=fractal-settings.component.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MATERIAL_TYPES; });
var MATERIAL_TYPES = {
    diffuse: 0,
    specular: 1,
    emission: 2,
    transmission: 3,
    glossy: 5
};
var Material = (function () {
    function Material(color, material_type, emission_rate) {
        this._material_type = material_type;
        this._color = color;
        if (emission_rate != null)
            this._emission_rate = emission_rate;
        else
            this._emission_rate = 0;
    }
    Material.prototype.toJSON = function () {
        return {
            material_type: this._material_type,
            color: [this._color[0], this._color[1], this._color[2]],
            emission_rate: this._emission_rate
        };
    };
    Object.defineProperty(Material.prototype, "material_type", {
        get: function () { return this._material_type; },
        set: function (value) { this._material_type = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) { this._color = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "emission_rate", {
        get: function () { return this._emission_rate; },
        set: function (rate) { this._emission_rate = rate; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "material_index", {
        get: function () { return this._material_index; },
        set: function (value) { this._material_index = value; },
        enumerable: true,
        configurable: true
    });
    return Material;
}());
/* harmony default export */ __webpack_exports__["b"] = Material;
//# sourceMappingURL=material.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__renderer_render_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__renderer_path_tracer_models_materials_diffuse_material__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__renderer_path_tracer_models_materials_glossy_material__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__renderer_path_tracer_models_materials_emission_material__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__renderer_path_tracer_models_materials_transmission_material__ = __webpack_require__(99);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectSettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var hexRgb = __webpack_require__(50);
var ObjectSettingsComponent = (function () {
    //materialColor: string = '#ffffff'
    function ObjectSettingsComponent(settingsService, renderService) {
        var _this = this;
        this.settingsService = settingsService;
        this.renderService = renderService;
        this.rayTracingMode = false;
        this.selectedObject = null;
        this.position = [0, 0, 0];
        this.scale = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.materialColor = [0, 0, 0];
        this.materials = [{ id: 0, name: 'Diffuse' }, { id: 2, name: 'Emission' }, { id: 5, name: 'Glossy' }, { id: 1, name: 'Specular' }, { id: 3, name: 'Transmission' }];
        this.selelectedMaterial = 0;
        this.defaultScenes = [{ id: 1, name: 'HDR teapot and bunny' }, { id: 2, name: 'HDR stanford dragon' }, { id: 3, name: 'Room teapot and bunny' }, { id: 4, name: 'Room stanford dragon' }];
        this.sceneId = 3;
        this.settingsService.renderTypeSub.asObservable().subscribe(function (type) { return _this.rayTracingMode = type == 0.0; });
        this.settingsService.selectedObjectSub.asObservable().subscribe(function (object) {
            _this.selectedObject = object;
            if (_this.selectedObject != null) {
                _this.selectedMaterial = object.material;
                _this.position = [object.position[0], object.position[1], object.position[2]];
                _this.scale = [object.scale[0], object.scale[1], object.scale[2]];
                _this.rotation = [object.rotation[0], object.rotation[1], object.rotation[2]];
                _this.materialType = object.material.material_type;
                _this.materialEmission = _this.selectedMaterial.emission_rate;
                _this.materialColor = [
                    Math.round(255 * object.material.color[0]),
                    Math.round(255 * object.material.color[1]),
                    Math.round(255 * object.material.color[2])
                ];
                if (_this.materialType == __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].diffuse) {
                    var material = _this.selectedObject.material;
                    _this.materialExtraParameter1 = material.albedo;
                    _this.materialExtraParameter2 = material.roughness;
                }
                else if (_this.materialType == __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].emission) {
                }
                else if (_this.materialType == __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].glossy) {
                    var material = _this.selectedObject.material;
                    _this.materialExtraParameter1 = material.shininess;
                }
                else if (_this.materialType == __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].transmission) {
                    var material = _this.selectedObject.material;
                    _this.materialExtraParameter1 = material.refractionIndex;
                    _this.materialExtraParameter2 = material.reflectRefractRatio;
                    _this.materialExtraParameter3 = material.roughness;
                }
                else if (_this.materialType == __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].specular) {
                }
            }
        });
    }
    ObjectSettingsComponent.prototype.scaleUpdate = function () {
        var objectsTexture = this.renderService.rayTracer.objectsTexture;
        objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 9] = this.scale[0];
        objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 10] = this.scale[1];
        objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 11] = this.scale[2];
        objectsTexture.updateTexture();
        this.renderService.rayTracer.refreshScreen = true;
    };
    ObjectSettingsComponent.prototype.rotationUpdate = function () {
    };
    ObjectSettingsComponent.prototype.positionUpdate = function () {
        var objectsTexture = this.renderService.rayTracer.objectsTexture;
        objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 6] = this.position[0];
        objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 7] = this.position[1];
        objectsTexture.textureData[this.selectedObject.textureIndex * 15 + 8] = this.position[2];
        objectsTexture.updateTexture();
        this.renderService.rayTracer.refreshScreen = true;
    };
    ObjectSettingsComponent.prototype.materialUpdate = function () {
        var materialTexture = this.renderService.rayTracer.materialTexture;
        if (this.materialType != this.selectedMaterial.material_type) {
            var materialIndex = this.selectedMaterial.material_index;
            switch (this.materialType) {
                case __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].diffuse:
                    this.selectedObject.material = new __WEBPACK_IMPORTED_MODULE_4__renderer_path_tracer_models_materials_diffuse_material__["a" /* DiffuseMaterial */]([this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].emission:
                    this.selectedObject.material = new __WEBPACK_IMPORTED_MODULE_6__renderer_path_tracer_models_materials_emission_material__["a" /* EmissionMaterial */]([this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].glossy:
                    this.selectedObject.material = new __WEBPACK_IMPORTED_MODULE_5__renderer_path_tracer_models_materials_glossy_material__["a" /* GlossyMaterial */]([this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].specular:
                    this.selectedObject.material = new __WEBPACK_IMPORTED_MODULE_4__renderer_path_tracer_models_materials_diffuse_material__["a" /* DiffuseMaterial */]([this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].transmission:
                    this.selectedObject.material = new __WEBPACK_IMPORTED_MODULE_7__renderer_path_tracer_models_materials_transmission_material__["a" /* default */]([this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255]);
                    break;
            }
            this.selectedObject.material.material_index = materialIndex;
            this.selectedMaterial = this.selectedObject.material;
        }
        else {
            this.selectedMaterial.emission_rate = this.materialEmission;
        }
        this.selectedMaterial.material_type = this.materialType;
        this.selectedMaterial.color = [this.materialColor[0] / 255, this.materialColor[1] / 255, this.materialColor[2] / 255];
        materialTexture.textureData[this.selectedMaterial.material_index * 9 + 0] = this.selectedMaterial.color[0];
        materialTexture.textureData[this.selectedMaterial.material_index * 9 + 1] = this.selectedMaterial.color[1];
        materialTexture.textureData[this.selectedMaterial.material_index * 9 + 2] = this.selectedMaterial.color[2];
        materialTexture.textureData[this.selectedMaterial.material_index * 9 + 3] = this.selectedMaterial.material_type;
        materialTexture.textureData[this.selectedMaterial.material_index * 9 + 4] = this.selectedMaterial.emission_rate;
        materialTexture.textureData[this.selectedMaterial.material_index * 9 + 5] = 0;
        // Extra data 2
        if (this.selectedMaterial.material_type == __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].diffuse) {
            var material = this.selectedObject.material;
            material.albedo = this.materialExtraParameter1;
            material.roughness = this.materialExtraParameter2;
            materialTexture.textureData[this.selectedMaterial.material_index * 9 + 6] = material.albedo;
            materialTexture.textureData[this.selectedMaterial.material_index * 9 + 7] = material.roughness;
        }
        else if (this.selectedMaterial.material_type == __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].glossy) {
            var material = this.selectedMaterial;
            material.shininess = this.materialExtraParameter1;
            materialTexture.textureData[this.selectedMaterial.material_index * 9 + 6] = material.shininess;
        }
        else if (this.selectedMaterial.material_type == __WEBPACK_IMPORTED_MODULE_3__renderer_path_tracer_models_materials_material__["a" /* MATERIAL_TYPES */].transmission) {
            var material = this.selectedMaterial;
            material.refractionIndex = this.materialExtraParameter1;
            material.reflectRefractRatio = this.materialExtraParameter2;
            material.roughness = this.materialExtraParameter3;
            materialTexture.textureData[this.selectedMaterial.material_index * 9 + 6] = material.refractionIndex;
            materialTexture.textureData[this.selectedMaterial.material_index * 9 + 7] = material.reflectRefractRatio;
            materialTexture.textureData[this.selectedMaterial.material_index * 9 + 8] = material.roughness;
        }
        materialTexture.updateTexture();
        this.renderService.rayTracer.refreshScreen = true;
    };
    ObjectSettingsComponent.prototype.sceneUpdate = function () {
        this.renderService.loadNewScene(this.sceneId);
    };
    return ObjectSettingsComponent;
}());
ObjectSettingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Component */])({
        selector: 'object-settings',
        template: __webpack_require__(400),
        styles: [__webpack_require__(379)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__renderer_render_service__["a" /* RenderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__renderer_render_service__["a" /* RenderService */]) === "function" && _b || Object])
], ObjectSettingsComponent);

var _a, _b;
//# sourceMappingURL=object-settings.component.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__renderer_render_service__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderSettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var hexRgb = __webpack_require__(50);
var RenderSettingsComponent = (function () {
    function RenderSettingsComponent(settingsService, renderService) {
        this.settingsService = settingsService;
        this.renderService = renderService;
        this.renderTypes = [{ id: 0, name: 'Ray tracing' }, { id: 1, name: 'Ray marching' }];
        this.renderType = 0;
        this.resolutionSub = settingsService.renderSettings.getAttributeSub('resolution');
    }
    RenderSettingsComponent.prototype.zoomSliderUpdate = function (event) {
        this.settingsService.zoom = event.value / 100.0;
    };
    RenderSettingsComponent.prototype.downloadImage = function () {
        // Create a 2D canvas to store the result
        var w = this.resolutionSub.getValue().value[0];
        var h = this.resolutionSub.getValue().value[1];
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var context = canvas.getContext('2d');
        console.log(w, h);
        var textureData = new Uint8ClampedArray(w * h * 4);
        for (var x = 0; x < w; x++) {
            for (var y = 0; y < h; y++) {
                textureData[4 * (w * x + y) + 0] = this.renderService.textureData[4 * (w * (w - x) + y) + 0];
                textureData[4 * (w * x + y) + 1] = this.renderService.textureData[4 * (w * (w - x) + y) + 1];
                textureData[4 * (w * x + y) + 2] = this.renderService.textureData[4 * (w * (w - x) + y) + 2];
                textureData[4 * (w * x + y) + 3] = this.renderService.textureData[4 * (w * (w - x) + y) + 3];
            }
        }
        // Copy the pixels to a 2D canvas
        var imageData = context.createImageData(w, h);
        imageData.data.set(textureData);
        context.putImageData(imageData, 0, 0);
        var download = document.createElement('a');
        download.href = canvas.toDataURL();
        download.download = 'pathtracer-image.png';
        download.click();
    };
    RenderSettingsComponent.prototype.imageUpload = function (event) {
        var _this = this;
        var image = new Image();
        var reader = new FileReader();
        reader.onload = function (e) {
            image.src = e.target.result;
            _this.renderService.newDomeImage(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    return RenderSettingsComponent;
}());
RenderSettingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Component */])({
        selector: 'render-options',
        template: __webpack_require__(401),
        styles: [__webpack_require__(380)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__renderer_render_service__["a" /* RenderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__renderer_render_service__["a" /* RenderService */]) === "function" && _b || Object])
], RenderSettingsComponent);

var _a, _b;
//# sourceMappingURL=render-settings.component.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__renderer_settings_setting__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingAttributeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var hexRgb = __webpack_require__(50);
var rgbHex = __webpack_require__(407);
var SettingAttributeComponent = (function () {
    function SettingAttributeComponent() {
        // Color attributes
        this.color = '#666666';
        this.redClr = 255;
        this.blueClr = 255;
        this.greenClr = 255;
        // Vector attributes
        this.vec = [0, 0, 0];
        // Dropdown attributes
        this.dropdownSelection = 0;
        // Toggle attributes
        this.enabled = true;
    }
    SettingAttributeComponent.prototype.updateAttribute = function (value) {
        var newAttribute = this.attribute.getValue();
        newAttribute.value = value;
        this.attribute.next(newAttribute);
    };
    SettingAttributeComponent.prototype.updateColor = function () {
        this.updateAttribute(vec3.fromValues(this.redClr / 255, this.greenClr / 255, this.blueClr / 255));
    };
    SettingAttributeComponent.prototype.updateVec2 = function () {
        this.updateAttribute(vec2.fromValues(this.vec[0], this.vec[1]));
    };
    SettingAttributeComponent.prototype.hexToRgb = function (hex) {
        var color = hexRgb(hex);
        return vec3.fromValues(color[0] / 255, color[1] / 255, color[2] / 255);
    };
    SettingAttributeComponent.prototype.updateDropdown = function () {
        this.updateAttribute(this.dropdownSelection);
    };
    SettingAttributeComponent.prototype.ngAfterContentChecked = function () {
        var attr = this.attribute.getValue();
        switch (attr.uiType) {
            case __WEBPACK_IMPORTED_MODULE_2__renderer_settings_setting__["d" /* UI_TYPE_COLORPICKER */]:
                this.redClr = attr.value[0] * 255;
                this.greenClr = attr.value[1] * 255;
                this.blueClr = attr.value[2] * 255;
                break;
            case __WEBPACK_IMPORTED_MODULE_2__renderer_settings_setting__["e" /* UI_TYPE_TOGGLE */]:
                this.enabled = attr.value == 1.0;
                break;
            case __WEBPACK_IMPORTED_MODULE_2__renderer_settings_setting__["f" /* UI_TYPE_VEC2 */]:
                this.vec[0] = attr.value[0];
                this.vec[1] = attr.value[1];
                break;
        }
    };
    return SettingAttributeComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]) === "function" && _a || Object)
], SettingAttributeComponent.prototype, "attribute", void 0);
SettingAttributeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Component */])({
        selector: 'setting-attribute',
        template: __webpack_require__(402),
        styles: [__webpack_require__(381)]
    }),
    __metadata("design:paramtypes", [])
], SettingAttributeComponent);

var _a;
//# sourceMappingURL=setting-attribute.component.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsContainerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsContainerComponent = (function () {
    function SettingsContainerComponent() {
    }
    return SettingsContainerComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Input */])(),
    __metadata("design:type", String)
], SettingsContainerComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Input */])(),
    __metadata("design:type", Object)
], SettingsContainerComponent.prototype, "expanded", void 0);
SettingsContainerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Component */])({
        selector: 'settings-container',
        template: __webpack_require__(403),
        styles: [__webpack_require__(382)]
    })
], SettingsContainerComponent);

//# sourceMappingURL=settings-container.component.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TopBarComponent = (function () {
    function TopBarComponent(settingsService) {
        this.settingsService = settingsService;
    }
    return TopBarComponent;
}());
TopBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Component */])({
        selector: 'top-bar',
        template: __webpack_require__(404),
        styles: [__webpack_require__(383)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__renderer_settings_settings_service__["a" /* SettingsService */]) === "function" && _a || Object])
], TopBarComponent);

var _a;
//# sourceMappingURL=top-bar.component.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_shader__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_fbo__ = __webpack_require__(100);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BloomProgram; });




/*
 Shader imports
 */
var thresholdFrag = __webpack_require__(392);
var thresholdVert = __webpack_require__(393);
var bloomVerticalFrag = __webpack_require__(390);
var bloomHorizontalFrag = __webpack_require__(389);
var bloomVert = __webpack_require__(391);
var BloomProgram = (function () {
    function BloomProgram(settingsService) {
        var _this = this;
        this.settingsService = settingsService;
        var renderSize = settingsService.renderSettings.getAttributeSub('resolution').getValue().value;
        this._thresholdShader = new __WEBPACK_IMPORTED_MODULE_0__utils_shader__["e" /* default */](thresholdVert, thresholdFrag);
        this._thresholdShader.uniforms = {
            u_buffer_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: null }
        };
        this._thresholdProgram = new __WEBPACK_IMPORTED_MODULE_1__utils_fbo__["a" /* default */](this._thresholdShader, renderSize[0], renderSize[1]);
        this._verticalBloomShader = new __WEBPACK_IMPORTED_MODULE_0__utils_shader__["e" /* default */](bloomVert, bloomHorizontalFrag);
        this._verticalBloomShader.uniforms = {
            u_resolution: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["c" /* VEC2_TYPE */], value: renderSize },
            u_buffer_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: null },
        };
        this._verticalBloomProgram = new __WEBPACK_IMPORTED_MODULE_1__utils_fbo__["a" /* default */](this._verticalBloomShader, renderSize[0], renderSize[1]);
        this._horizontalBloomShader = new __WEBPACK_IMPORTED_MODULE_0__utils_shader__["e" /* default */](bloomVert, bloomVerticalFrag);
        this._horizontalBloomShader.uniforms = {
            u_resolution: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["c" /* VEC2_TYPE */], value: renderSize },
            u_buffer_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: null },
        };
        this._horizontalBloomProgram = new __WEBPACK_IMPORTED_MODULE_1__utils_fbo__["a" /* default */](this._horizontalBloomShader, renderSize[0], renderSize[1]);
        settingsService.renderSettings.getAttributeSub('resolution').asObservable().subscribe(function (attr) {
            var resolution = attr.value;
            _this._thresholdProgram.resize(resolution[0], resolution[1]);
            _this._verticalBloomProgram.resize(resolution[0], resolution[1]);
            _this._horizontalBloomProgram.resize(resolution[0], resolution[1]);
            _this._verticalBloomShader.uniforms['u_resolution'].value = resolution;
            _this._horizontalBloomShader.uniforms['u_resolution'].value = resolution;
        });
    }
    BloomProgram.prototype.render = function (texture) {
        var currentTexture = texture;
        this._thresholdShader.uniforms['u_buffer_texture'].value = currentTexture;
        this._thresholdProgram.render();
        currentTexture = this._thresholdProgram.texture;
        var bloomIterations = this.settingsService.bloomSettings.getAttribute('u_bloomIterations').value;
        for (var i = 0; i < bloomIterations; i++) {
            this._verticalBloomShader.uniforms['u_buffer_texture'].value = currentTexture;
            this._verticalBloomProgram.render();
            this._horizontalBloomShader.uniforms['u_buffer_texture'].value = this._verticalBloomProgram.texture;
            this._horizontalBloomProgram.render();
            currentTexture = this._horizontalBloomProgram.texture;
        }
    };
    Object.defineProperty(BloomProgram.prototype, "renderTexture", {
        get: function () { return this._horizontalBloomProgram.texture; },
        enumerable: true,
        configurable: true
    });
    return BloomProgram;
}());

//# sourceMappingURL=bloom-program.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_fbo__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shader__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompositionProgram; });



/*
 Shader imports
 */
var compositionFrag = __webpack_require__(394);
var compositionVert = __webpack_require__(395);
var CompositionProgram = (function () {
    function CompositionProgram(settingsService) {
        var _this = this;
        var renderSize = settingsService.renderSettings.getAttribute('resolution').value;
        this._compositionShader = new __WEBPACK_IMPORTED_MODULE_1__utils_shader__["e" /* default */](compositionVert, compositionFrag);
        this._compositionShader.uniforms = {
            u_mainTexture: { type: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["f" /* TEXTURE_TYPE */], value: null },
            u_bloomTexture: { type: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["f" /* TEXTURE_TYPE */], value: null }
        };
        this._compositionProgram = new __WEBPACK_IMPORTED_MODULE_0__utils_fbo__["a" /* default */](this._compositionShader, renderSize[0], renderSize[1]);
        this._compositionProgram.enableWriteToTexture();
        settingsService.connectShader(this._compositionShader);
        settingsService.renderSettings.getAttributeSub('resolution').asObservable().subscribe(function (attr) {
            var res = attr.value;
            _this._compositionProgram.resize(res[0], res[1]);
        });
    }
    CompositionProgram.prototype.render = function (mainTexture, bloomTexture) {
        this._compositionShader.uniforms['u_mainTexture'].value = mainTexture;
        this._compositionShader.uniforms['u_bloomTexture'].value = bloomTexture;
        this._compositionProgram.render();
    };
    Object.defineProperty(CompositionProgram.prototype, "renderTexture", {
        get: function () { return this._compositionProgram.texture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositionProgram.prototype, "textureData", {
        get: function () { return this._compositionProgram.textureData; },
        enumerable: true,
        configurable: true
    });
    return CompositionProgram;
}());

//# sourceMappingURL=composition-program.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var BoundingBox = (function () {
    function BoundingBox() {
        this._top = vec3.fromValues(-10000, -10000, -10000);
        this._bottom = vec3.fromValues(10000, 10000, 10000);
        this._center = vec3.fromValues(0, 0, 0);
    }
    BoundingBox.prototype.calculateBoundingBoxFromTriangles = function (triangles) {
        this._bottom = vec3.fromValues(10000, 10000, 10000);
        this._top = vec3.fromValues(-10000, -10000, -10000);
        for (var _i = 0, triangles_1 = triangles; _i < triangles_1.length; _i++) {
            var triangle = triangles_1[_i];
            // Set bottom of bounding box
            vec3.min(this._bottom, this._bottom, triangle.v0);
            vec3.min(this._bottom, this._bottom, triangle.v1);
            vec3.min(this._bottom, this._bottom, triangle.v2);
            // Set top of bounding box
            vec3.max(this._top, this._top, triangle.v0);
            vec3.max(this._top, this._top, triangle.v1);
            vec3.max(this._top, this._top, triangle.v2);
        }
    };
    BoundingBox.prototype.calculateBoundingBoxFromSphere = function (position, radius) {
        this._bottom = vec3.fromValues(position[0] - radius, position[1] - radius, position[2] - radius);
        this._top = vec3.fromValues(position[0] + radius, position[1] + radius, position[2] + radius);
    };
    BoundingBox.prototype.rayIntersection = function (ray) {
        var dirfrac = vec3.fromValues(0, 0, 0);
        dirfrac[0] = 1.0 / ray.direction[0];
        dirfrac[1] = 1.0 / ray.direction[1];
        dirfrac[2] = 1.0 / ray.direction[2];
        // lb is the corner of AABB with minimal coordinates - left bottom, rt is maximal corner
        // r.org is origin of ray
        var t1 = (this._bottom[0] - ray.startPosition[0]) * dirfrac[0];
        var t2 = (this._top[0] - ray.startPosition[0]) * dirfrac[0];
        var t3 = (this._bottom[1] - ray.startPosition[1]) * dirfrac[1];
        var t4 = (this._top[1] - ray.startPosition[1]) * dirfrac[1];
        var t5 = (this._bottom[2] - ray.startPosition[2]) * dirfrac[2];
        var t6 = (this._top[2] - ray.startPosition[2]) * dirfrac[2];
        var tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
        var tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));
        // if tmax < 0, ray (line) is intersecting AABB, but whole AABB is behing us
        if (tmax < 0.0 || tmin > tmax)
            return false;
        var collision_distance = tmin;
        return true;
    };
    Object.defineProperty(BoundingBox.prototype, "center", {
        get: function () { return this._center; },
        set: function (value) { this._center = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "bottom", {
        get: function () { return this._bottom; },
        set: function (value) { this._bottom = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "top", {
        get: function () { return this._top; },
        set: function (value) { this._top = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "distanceFromCamera", {
        get: function () { return this._distanceFromCamera; },
        set: function (value) { this._distanceFromCamera = value; },
        enumerable: true,
        configurable: true
    });
    return BoundingBox;
}());
/* harmony default export */ __webpack_exports__["a"] = BoundingBox;
//# sourceMappingURL=bounding-box.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BVHNode */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BVHInner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BVHLeaf; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BVHNode = (function () {
    function BVHNode() {
        this._bottom = vec3.fromValues(0, 0, 0);
        this._top = vec3.fromValues(0, 0, 0);
    }
    BVHNode.prototype.isLeaf = function () {
        return false;
    };
    BVHNode.prototype.rayIntersection = function (ray) {
        var tmin = (this._bottom[0] - ray.startPosition[0]) / ray.direction[0];
        var tmax = (this._top[0] - ray.startPosition[0]) / ray.direction[0];
        if (tmin > tmax) {
            var temp = tmin;
            tmin = tmax;
            tmax = temp;
        }
        var tymin = (this._bottom[1] - ray.startPosition[1]) / ray.direction[1];
        var tymax = (this._top[1] - ray.startPosition[1]) / ray.direction[1];
        if (tymin > tymax) {
            var temp = tymin;
            tymin = tymax;
            tymax = temp;
        }
        if ((tmin > tymax) || (tymin > tmax))
            return false;
        if (tymin > tmin)
            tmin = tymin;
        if (tymax < tmax)
            tmax = tymax;
        var tzmin = (this._bottom[2] - ray.startPosition[2]) / ray.direction[2];
        var tzmax = (this._top[2] - ray.startPosition[2]) / ray.direction[2];
        if (tzmin > tzmax) {
            var temp = tzmin;
            tzmin = tzmax;
            tzmax = temp;
        }
        if ((tmin > tzmax) || (tzmin > tmax))
            return false;
        return true;
    };
    Object.defineProperty(BVHNode.prototype, "bottom", {
        get: function () { return this._bottom; },
        set: function (value) { this._bottom = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BVHNode.prototype, "top", {
        get: function () { return this._top; },
        set: function (value) { this._top = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BVHNode.prototype, "nodeIndex", {
        get: function () { return this._nodeIndex; },
        set: function (value) { this._nodeIndex = value; },
        enumerable: true,
        configurable: true
    });
    return BVHNode;
}());

var BVHInner = (function (_super) {
    __extends(BVHInner, _super);
    function BVHInner() {
        return _super.call(this) || this;
    }
    BVHInner.prototype.isLeaf = function () {
        return false;
    };
    Object.defineProperty(BVHInner.prototype, "right", {
        get: function () { return this._right; },
        set: function (value) { this._right = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BVHInner.prototype, "left", {
        get: function () { return this._left; },
        set: function (value) { this._left = value; },
        enumerable: true,
        configurable: true
    });
    return BVHInner;
}(BVHNode));

var BVHLeaf = (function (_super) {
    __extends(BVHLeaf, _super);
    function BVHLeaf() {
        var _this = _super.call(this) || this;
        _this._triangles = [];
        return _this;
    }
    BVHLeaf.prototype.isLeaf = function () {
        return true;
    };
    Object.defineProperty(BVHLeaf.prototype, "triangles", {
        get: function () { return this._triangles; },
        set: function (value) { this._triangles = value; },
        enumerable: true,
        configurable: true
    });
    return BVHLeaf;
}(BVHNode));

//# sourceMappingURL=bvh-node.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bvh_node__ = __webpack_require__(298);
/* unused harmony export WorkBoundingBox */

var BVHSplit = (function () {
    function BVHSplit(_min_cost, _best_split, _best_axis) {
        this.min_cost = _min_cost;
        this.best_split = _best_split;
        this.best_axis = _best_axis;
    }
    return BVHSplit;
}());
var BVH = (function () {
    function BVH() {
        this.count = 0;
        this._bvhTexture = new Float32Array(2048 * 2048 * 3);
        this._bvhArray = [];
        this._triangleIndexTexture = new Float32Array(1024 * 1024 * 3);
        this._triangleCount = 0;
    }
    BVH.prototype.createBVH = function (triangles) {
        this._triangles = triangles;
        var workBoxes = [];
        var bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
        var top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);
        for (var _i = 0, triangles_1 = triangles; _i < triangles_1.length; _i++) {
            var triangle = triangles_1[_i];
            var bbox = new WorkBoundingBox();
            bbox.triangle = triangle;
            // Set bottom of bounding box
            vec3.min(bbox.bottom, bbox.bottom, triangle.v0);
            vec3.min(bbox.bottom, bbox.bottom, triangle.v1);
            vec3.min(bbox.bottom, bbox.bottom, triangle.v2);
            // Set top of bounding box
            vec3.max(bbox.top, bbox.top, triangle.v0);
            vec3.max(bbox.top, bbox.top, triangle.v1);
            vec3.max(bbox.top, bbox.top, triangle.v2);
            // Set center of bounding box
            vec3.add(bbox.center, bbox.top, bbox.bottom);
            vec3.scale(bbox.center, bbox.center, 0.5);
            vec3.min(bottom, bottom, bbox.bottom);
            vec3.max(top, top, bbox.top);
            workBoxes.push(bbox);
        }
        this._root = this.recurse(workBoxes, 0);
        this._root.bottom = bottom;
        this._root.top = top;
        this.createBVHTexture(this._root, new NodeCounter(0), new NodeCounter(0), 0);
    };
    BVH.prototype.findBestSplitPlane = function (bvh_split, axis, test_split, workBoxes) {
        // Left and right bounding box
        var left_bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
        var left_top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);
        var right_bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
        var right_top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);
        var count_left = 0;
        var count_right = 0;
        for (var _i = 0, workBoxes_1 = workBoxes; _i < workBoxes_1.length; _i++) {
            var box = workBoxes_1[_i];
            var value = box.center[axis];
            if (value < test_split) {
                vec3.min(left_bottom, left_bottom, box.bottom);
                vec3.max(left_top, left_top, box.top);
                count_left++;
            }
            else {
                vec3.min(right_bottom, right_bottom, box.bottom);
                vec3.max(right_top, right_top, box.top);
                count_right++;
            }
        }
        // Bins with less than 1 elements not accepted
        if (count_left <= 1 || count_right <= 1)
            return;
        // Calculate surface areas
        var left_side1 = left_top[0] - left_bottom[0];
        var left_side2 = left_top[1] - left_bottom[1];
        var left_side3 = left_top[2] - left_bottom[2];
        var right_side1 = right_top[0] - right_bottom[0];
        var right_side2 = right_top[1] - right_bottom[1];
        var right_side3 = right_top[2] - right_bottom[2];
        var surface_left = left_side1 * left_side2 + left_side2 * left_side3 + left_side3 * left_side1;
        var surface_right = right_side1 * right_side2 + right_side2 * right_side3 + right_side3 * right_side1;
        // Calculate total cost
        var total_cost = surface_left * count_left + surface_right * count_right;
        if (total_cost < bvh_split.min_cost) {
            bvh_split.min_cost = total_cost;
            bvh_split.best_split = test_split;
            bvh_split.best_axis = axis;
        }
    };
    BVH.prototype.recurse = function (workBoxes, depth) {
        // Terminate if work boxes has less than 4 triangles
        if (workBoxes.length < 4) {
            var leaf = new __WEBPACK_IMPORTED_MODULE_0__bvh_node__["a" /* BVHLeaf */]();
            for (var _i = 0, workBoxes_2 = workBoxes; _i < workBoxes_2.length; _i++) {
                var box = workBoxes_2[_i];
                leaf.triangles.push(box.triangle);
            }
            return leaf;
        }
        // Continue splitting if there are more than 4 triangles
        var bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
        var top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);
        // Set size of box for remaining elements
        for (var _a = 0, workBoxes_3 = workBoxes; _a < workBoxes_3.length; _a++) {
            var box = workBoxes_3[_a];
            vec3.min(bottom, bottom, box.bottom);
            vec3.max(top, top, box.top);
        }
        // Dimensions of bounding box
        var side1 = top[0] - bottom[0]; // x
        var side2 = top[1] - bottom[1]; // y
        var side3 = top[2] - bottom[2]; // z
        var bvh_split = new BVHSplit(workBoxes.length * (side1 * side2 + side2 * side3 + side3 * side1), 10000, -1);
        // Try all axis
        for (var axis = 0; axis < 3; axis++) {
            var start = bottom[axis];
            var stop = top[axis];
            if (Math.abs(stop - start) < 0.0001)
                continue;
            var step = (stop - start) / (128.0 / (depth + 1.0));
            for (var test_split = start + step; test_split < stop - step; test_split += step) {
                this.findBestSplitPlane(bvh_split, axis, test_split, workBoxes);
            }
        }
        // No best axis found, create leaf node
        if (bvh_split.best_axis == -1) {
            var leaf = new __WEBPACK_IMPORTED_MODULE_0__bvh_node__["a" /* BVHLeaf */]();
            for (var _b = 0, workBoxes_4 = workBoxes; _b < workBoxes_4.length; _b++) {
                var box = workBoxes_4[_b];
                leaf.triangles.push(box.triangle);
            }
            return leaf;
        }
        var left = []; // Left split bounding boxes
        var right = []; // Right split bounding boxes
        var left_bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
        var left_top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);
        var right_bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
        var right_top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);
        for (var _c = 0, workBoxes_5 = workBoxes; _c < workBoxes_5.length; _c++) {
            var box = workBoxes_5[_c];
            var value = box.center[bvh_split.best_axis];
            if (value < bvh_split.best_split) {
                left.push(box);
                vec3.min(left_bottom, left_bottom, box.bottom);
                vec3.max(left_top, left_top, box.top);
            }
            else {
                right.push(box);
                vec3.min(right_bottom, right_bottom, box.bottom);
                vec3.max(right_top, right_top, box.top);
            }
        }
        // Create inner node
        var inner = new __WEBPACK_IMPORTED_MODULE_0__bvh_node__["b" /* BVHInner */]();
        inner.left = this.recurse(left, depth + 1);
        inner.left.bottom = left_bottom;
        inner.left.top = left_top;
        inner.right = this.recurse(right, depth + 1);
        inner.right.bottom = right_bottom;
        inner.right.top = right_top;
        return inner;
    };
    BVH.prototype.createBVHTexture = function (node, node_index, triangle_index, parent_index) {
        node.nodeIndex = node_index.count;
        //First slots gets filled with bounding box
        this._bvhTexture[node.nodeIndex + 0] = node.bottom[0];
        this._bvhTexture[node.nodeIndex + 1] = node.bottom[1];
        this._bvhTexture[node.nodeIndex + 2] = node.bottom[2];
        this._bvhTexture[node.nodeIndex + 3] = node.top[0];
        this._bvhTexture[node.nodeIndex + 4] = node.top[1];
        this._bvhTexture[node.nodeIndex + 5] = node.top[2];
        this.count += 6;
        if (!node.isLeaf()) {
            var node_index_right = node_index.increment(12);
            this.createBVHTexture(node.right, node_index, triangle_index, node.nodeIndex / 12);
            var node_index_left = node_index.increment(12);
            this.createBVHTexture(node.left, node_index, triangle_index, node.nodeIndex / 12);
            this.setSibling(node.left, node_index_right / 12);
            this.setSibling(node.right, node_index_left / 12);
            this._bvhTexture[node.nodeIndex + 6] = 0;
            this._bvhTexture[node.nodeIndex + 7] = node_index_left / 12;
            this._bvhTexture[node.nodeIndex + 8] = node_index_right / 12;
            this._bvhTexture[node.nodeIndex + 9] = parent_index;
            this._bvhTexture[node.nodeIndex + 10] = 0;
            this._bvhTexture[node.nodeIndex + 11] = 0;
            this.count += 6;
        }
        else {
            var count = node.triangles.length;
            var start_triangle_index = triangle_index.count;
            this._bvhTexture[node.nodeIndex + 6] = 1;
            this._bvhTexture[node.nodeIndex + 7] = count;
            this._bvhTexture[node.nodeIndex + 8] = start_triangle_index;
            this._bvhTexture[node.nodeIndex + 9] = parent_index;
            this._bvhTexture[node.nodeIndex + 10] = 0;
            this._bvhTexture[node.nodeIndex + 11] = 0;
            this.count += 6;
            for (var _i = 0, _a = node.triangles; _i < _a.length; _i++) {
                var triangle = _a[_i];
                this._triangleIndexTexture[3 * triangle_index.count] = triangle.triangleIndex;
                this._triangleIndexTexture[3 * triangle_index.count + 1] = 0;
                this._triangleIndexTexture[3 * triangle_index.count + 2] = 0;
                triangle_index.increment(1);
                this._triangleCount += 3;
            }
        }
    };
    BVH.prototype.setSibling = function (node, sibling) {
        this._bvhTexture[node.nodeIndex + 10] = sibling;
    };
    Object.defineProperty(BVH.prototype, "root", {
        get: function () { return this._root; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BVH.prototype, "bvhTexture", {
        get: function () { return this._bvhTexture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BVH.prototype, "triangleIndexTexture", {
        get: function () { return this._triangleIndexTexture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BVH.prototype, "bvhArray", {
        get: function () { return this._bvhArray; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BVH.prototype, "triangleCount", {
        get: function () { return this._triangleCount; },
        enumerable: true,
        configurable: true
    });
    return BVH;
}());
/* harmony default export */ __webpack_exports__["a"] = BVH;
BVH.MAX_SIZE = 3000;
var NodeCounter = (function () {
    function NodeCounter(count) {
        this.count = count;
    }
    NodeCounter.prototype.increment = function (count) {
        this.count += count;
        return this.count;
    };
    return NodeCounter;
}());
// Used to build the BVH tree
var WorkBoundingBox = (function () {
    function WorkBoundingBox() {
        this._top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);
        this._bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
        this._center = vec3.fromValues(0, 0, 0);
    }
    Object.defineProperty(WorkBoundingBox.prototype, "triangle", {
        get: function () { return this._triangle; },
        set: function (value) { this._triangle = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkBoundingBox.prototype, "center", {
        get: function () { return this._center; },
        set: function (value) { this._center = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkBoundingBox.prototype, "bottom", {
        get: function () { return this._bottom; },
        set: function (value) { this._bottom = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkBoundingBox.prototype, "top", {
        get: function () { return this._top; },
        set: function (value) { this._top = value; },
        enumerable: true,
        configurable: true
    });
    return WorkBoundingBox;
}());

//# sourceMappingURL=bvh.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UI_TYPE_SLIDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return UI_TYPE_TOGGLE; });
/* unused harmony export UI_TYPE_TEXTFIELD */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return UI_TYPE_VEC2; });
/* unused harmony export UI_TYPE_VEC3 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UI_TYPE_DROPDOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return UI_TYPE_COLORPICKER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Setting; });

var UI_TYPE_SLIDER = 'UI_TYPE_SLIDER';
var UI_TYPE_TOGGLE = 'UI_TYPE_TOGGLE';
var UI_TYPE_TEXTFIELD = 'UI_TYPE_TEXTFIELD';
var UI_TYPE_VEC2 = 'UI_TYPE_VEC2';
var UI_TYPE_VEC3 = 'UI_TYPE_VEC3';
var UI_TYPE_DROPDOWN = 'UI_TYPE_DROPDOWN';
var UI_TYPE_COLORPICKER = 'UI_TYPE_COLORPICKER';
var Setting = (function () {
    function Setting() {
        this.attributes = [];
    }
    Setting.prototype.connectShader = function (shader) {
        for (var _i = 0, _a = this.attributes; _i < _a.length; _i++) {
            var attribute = _a[_i];
            attribute.asObservable().subscribe(function (attr) { return shader.setUniform(attr.uniformName, { type: attr.uniformType, value: attr.value }); });
        }
    };
    Setting.prototype.setAttribute = function (attributeSub, value) {
        var newAttribute = attributeSub.getValue();
        newAttribute.value = value;
        attributeSub.next(newAttribute);
    };
    Setting.prototype.addAttribute = function (attribute) {
        this.attributes.push(new __WEBPACK_IMPORTED_MODULE_0_rxjs__["BehaviorSubject"](attribute));
    };
    Setting.prototype.getAttribute = function (name) {
        for (var _i = 0, _a = this.attributes; _i < _a.length; _i++) {
            var attribute = _a[_i];
            if (attribute.getValue().uniformName == name) {
                return attribute.getValue();
            }
        }
    };
    Setting.prototype.getAttributeSub = function (name) {
        for (var _i = 0, _a = this.attributes; _i < _a.length; _i++) {
            var attribute = _a[_i];
            if (attribute.getValue().uniformName == name) {
                return attribute;
            }
        }
    };
    return Setting;
}());

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__materials_diffuse_material__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__materials_transmission_material__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_obj_loader__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__materials_emission_material__ = __webpack_require__(97);
/* harmony export (immutable) */ __webpack_exports__["a"] = createDefaultScene1;
/* harmony export (immutable) */ __webpack_exports__["b"] = createDefaultScene2;
/* harmony export (immutable) */ __webpack_exports__["c"] = createDefaultScene3;
/* harmony export (immutable) */ __webpack_exports__["d"] = createDefaultScene4;





function createDefaultScene1(scene) {
    return new Promise(function (resolve, reject) {
        scene.intersectables = [];
        scene.materials = [];
        var green_material = new __WEBPACK_IMPORTED_MODULE_0__materials_diffuse_material__["a" /* DiffuseMaterial */](vec3.fromValues(0, 1, 0));
        var blue_material = new __WEBPACK_IMPORTED_MODULE_0__materials_diffuse_material__["a" /* DiffuseMaterial */](vec3.fromValues(0, 0, 1));
        var white_material = new __WEBPACK_IMPORTED_MODULE_0__materials_diffuse_material__["a" /* DiffuseMaterial */](vec3.fromValues(1, 1, 1));
        var green_glass = new __WEBPACK_IMPORTED_MODULE_2__materials_transmission_material__["a" /* default */](vec3.fromValues(0.8, 1, 1.0));
        var glossy_red_material = new __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__["a" /* GlossyMaterial */](vec3.fromValues(1, 0.5, 0.5));
        var glossy_blue_material = new __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__["a" /* GlossyMaterial */](vec3.fromValues(0.5, 0.5, 1.0));
        glossy_blue_material.shininess = 2.0;
        var gold_material = new __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__["a" /* GlossyMaterial */](vec3.fromValues(1.0, 0.8, 0.3));
        gold_material.shininess = 20.0;
        var silver_material = new __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__["a" /* GlossyMaterial */](vec3.fromValues(0.8, 0.8, 0.8));
        var emission_material = new __WEBPACK_IMPORTED_MODULE_4__materials_emission_material__["a" /* EmissionMaterial */](vec3.fromValues(1, 1, 1));
        emission_material.emission_rate = 20.0;
        var emission_red_material = new __WEBPACK_IMPORTED_MODULE_4__materials_emission_material__["a" /* EmissionMaterial */](vec3.fromValues(1, 0.7, 0.7));
        emission_red_material.emission_rate = 10.0;
        var light_emission_material = new __WEBPACK_IMPORTED_MODULE_4__materials_emission_material__["a" /* EmissionMaterial */](vec3.fromValues(0, 1, 1));
        light_emission_material.emission_rate = 6.0;
        scene.materials.push(green_material);
        scene.materials.push(blue_material);
        scene.materials.push(white_material);
        scene.materials.push(green_glass);
        scene.materials.push(glossy_red_material);
        scene.materials.push(emission_material);
        scene.materials.push(emission_red_material);
        scene.materials.push(glossy_blue_material);
        scene.materials.push(light_emission_material);
        scene.materials.push(gold_material);
        scene.materials.push(silver_material);
        // Load objects from .obj files
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_obj_loader__["a" /* LoadObjects */])([
            { fileName: './assets/models/cylinder.obj', material: glossy_blue_material, smooth_shading: true },
            //{ fileName: './assets/models/box.obj', material: white_material, smooth_shading: false },
            { fileName: './assets/models/bottom_disc.obj', material: white_material, smooth_shading: false },
            { fileName: './assets/models/teapot5.obj', material: gold_material, smooth_shading: true },
            { fileName: './assets/models/bunny.obj', material: green_glass, smooth_shading: true },
            //{ fileName: './assets/models/dragon2.obj', material: green_glass, smooth_shading: true },
            //{ fileName: './assets/models/light_plane4.obj', material: emission_material, smooth_shading: false },
            { fileName: './assets/models/light_plane5.obj', material: emission_red_material, smooth_shading: false },
        ], function (objects) {
            for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
                var object = objects_1[_i];
                scene.intersectables.push(object);
            }
            resolve();
        }, function () { });
    });
}
function createDefaultScene2(scene) {
    return new Promise(function (resolve, reject) {
        scene.intersectables = [];
        scene.materials = [];
        var white_material = new __WEBPACK_IMPORTED_MODULE_0__materials_diffuse_material__["a" /* DiffuseMaterial */](vec3.fromValues(1, 1, 1));
        var green_glass = new __WEBPACK_IMPORTED_MODULE_2__materials_transmission_material__["a" /* default */](vec3.fromValues(0.8, 1, 1.0));
        scene.materials.push(white_material);
        scene.materials.push(green_glass);
        // Load objects from .obj files
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_obj_loader__["a" /* LoadObjects */])([
            { fileName: './assets/models/bottom_disc.obj', material: white_material, smooth_shading: false },
            { fileName: './assets/models/dragon2.obj', material: green_glass, smooth_shading: true },
        ], function (objects) {
            for (var _i = 0, objects_2 = objects; _i < objects_2.length; _i++) {
                var object = objects_2[_i];
                scene.intersectables.push(object);
            }
            resolve();
        }, function () {
        });
    });
}
function createDefaultScene3(scene) {
    return new Promise(function (resolve, reject) {
        scene.intersectables = [];
        scene.materials = [];
        var white_material = new __WEBPACK_IMPORTED_MODULE_0__materials_diffuse_material__["a" /* DiffuseMaterial */](vec3.fromValues(1, 1, 1));
        var green_glass = new __WEBPACK_IMPORTED_MODULE_2__materials_transmission_material__["a" /* default */](vec3.fromValues(0.8, 1, 1.0));
        var glossy_blue_material = new __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__["a" /* GlossyMaterial */](vec3.fromValues(0.5, 0.5, 1.0));
        glossy_blue_material.shininess = 2.0;
        var gold_material = new __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__["a" /* GlossyMaterial */](vec3.fromValues(1.0, 0.8, 0.3));
        gold_material.shininess = 20.0;
        var silver_material = new __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__["a" /* GlossyMaterial */](vec3.fromValues(0.8, 0.8, 0.8));
        var emission_material = new __WEBPACK_IMPORTED_MODULE_4__materials_emission_material__["a" /* EmissionMaterial */](vec3.fromValues(1, 1, 1));
        emission_material.emission_rate = 20.0;
        var emission_red_material = new __WEBPACK_IMPORTED_MODULE_4__materials_emission_material__["a" /* EmissionMaterial */](vec3.fromValues(1, 0.7, 0.7));
        emission_red_material.emission_rate = 5.0;
        var light_emission_material = new __WEBPACK_IMPORTED_MODULE_4__materials_emission_material__["a" /* EmissionMaterial */](vec3.fromValues(0, 1, 1));
        light_emission_material.emission_rate = 0.3;
        scene.materials.push(white_material);
        scene.materials.push(green_glass);
        scene.materials.push(emission_material);
        scene.materials.push(emission_red_material);
        scene.materials.push(glossy_blue_material);
        scene.materials.push(light_emission_material);
        scene.materials.push(gold_material);
        scene.materials.push(silver_material);
        // Load objects from .obj files
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_obj_loader__["a" /* LoadObjects */])([
            { fileName: './assets/models/cylinder.obj', material: glossy_blue_material, smooth_shading: true },
            { fileName: './assets/models/box.obj', material: white_material, smooth_shading: false },
            { fileName: './assets/models/teapot5.obj', material: gold_material, smooth_shading: true },
            { fileName: './assets/models/bunny.obj', material: green_glass, smooth_shading: true },
            { fileName: './assets/models/light_plane4.obj', material: emission_material, smooth_shading: false },
            { fileName: './assets/models/light_plane5.obj', material: emission_red_material, smooth_shading: false },
        ], function (objects) {
            for (var _i = 0, objects_3 = objects; _i < objects_3.length; _i++) {
                var object = objects_3[_i];
                scene.intersectables.push(object);
            }
            resolve();
        }, function () {
        });
    });
}
function createDefaultScene4(scene) {
    return new Promise(function (resolve, reject) {
        scene.intersectables = [];
        scene.materials = [];
        var white_material = new __WEBPACK_IMPORTED_MODULE_0__materials_diffuse_material__["a" /* DiffuseMaterial */](vec3.fromValues(1, 1, 1));
        var green_glass = new __WEBPACK_IMPORTED_MODULE_2__materials_transmission_material__["a" /* default */](vec3.fromValues(0.8, 1, 1.0));
        var glossy_blue_material = new __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__["a" /* GlossyMaterial */](vec3.fromValues(0.5, 0.5, 1.0));
        glossy_blue_material.shininess = 2.0;
        var gold_material = new __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__["a" /* GlossyMaterial */](vec3.fromValues(1.0, 0.8, 0.3));
        gold_material.shininess = 20.0;
        var silver_material = new __WEBPACK_IMPORTED_MODULE_1__materials_glossy_material__["a" /* GlossyMaterial */](vec3.fromValues(0.8, 0.8, 0.8));
        var emission_material = new __WEBPACK_IMPORTED_MODULE_4__materials_emission_material__["a" /* EmissionMaterial */](vec3.fromValues(1, 1, 1));
        emission_material.emission_rate = 20.0;
        var emission_red_material = new __WEBPACK_IMPORTED_MODULE_4__materials_emission_material__["a" /* EmissionMaterial */](vec3.fromValues(1, 0.7, 0.7));
        emission_red_material.emission_rate = 5.0;
        var light_emission_material = new __WEBPACK_IMPORTED_MODULE_4__materials_emission_material__["a" /* EmissionMaterial */](vec3.fromValues(0, 1, 1));
        light_emission_material.emission_rate = 0.3;
        scene.materials.push(white_material);
        scene.materials.push(green_glass);
        scene.materials.push(emission_material);
        scene.materials.push(emission_red_material);
        scene.materials.push(glossy_blue_material);
        scene.materials.push(light_emission_material);
        scene.materials.push(gold_material);
        scene.materials.push(silver_material);
        // Load objects from .obj files
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_obj_loader__["a" /* LoadObjects */])([
            { fileName: './assets/models/box.obj', material: white_material, smooth_shading: false },
            { fileName: './assets/models/dragon2.obj', material: gold_material, smooth_shading: true },
            { fileName: './assets/models/light_plane4.obj', material: emission_material, smooth_shading: false },
            { fileName: './assets/models/light_plane5.obj', material: emission_red_material, smooth_shading: false },
        ], function (objects) {
            for (var _i = 0, objects_4 = objects; _i < objects_4.length; _i++) {
                var object = objects_4[_i];
                scene.intersectables.push(object);
            }
            resolve();
        }, function () {
        });
    });
}
//# sourceMappingURL=default-scenes.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bvh_bounding_box__ = __webpack_require__(297);

var Intersectable = (function () {
    function Intersectable(material) {
        this._triangleStartIndex = -1;
        this._triangleEndIndex = -1;
        this._BVHStartIndex = -1;
        this._BVHEndIndex = -1;
        this._material = material;
        this._position = vec3.fromValues(0, 0, 0);
        this._scale = vec3.fromValues(1, 1, 1);
        this._rotation = vec3.fromValues(0, 0, 0);
        this._boundingBox = new __WEBPACK_IMPORTED_MODULE_0__bvh_bounding_box__["a" /* default */]();
    }
    Object.defineProperty(Intersectable.prototype, "boundingBox", {
        get: function () { return this._boundingBox; },
        set: function (value) { this._boundingBox = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intersectable.prototype, "type", {
        get: function () { return this._type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intersectable.prototype, "scale", {
        get: function () { return this._scale; },
        set: function (value) { this._scale = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intersectable.prototype, "rotation", {
        get: function () { return this._rotation; },
        set: function (value) { this._rotation = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intersectable.prototype, "position", {
        get: function () { return this._position; },
        set: function (value) { this._position = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intersectable.prototype, "material", {
        get: function () { return this._material; },
        set: function (value) { this._material = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intersectable.prototype, "textureIndex", {
        get: function () { return this._textureIndex; },
        set: function (value) { this._textureIndex = value; },
        enumerable: true,
        configurable: true
    });
    return Intersectable;
}());
/* harmony default export */ __webpack_exports__["a"] = Intersectable;
//# sourceMappingURL=intersectable.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__intersectable__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__triangle__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bvh_bvh__ = __webpack_require__(299);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Object3d; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Object3d = (function (_super) {
    __extends(Object3d, _super);
    function Object3d(triangles, material) {
        var _this = _super.call(this, material) || this;
        _this._smoothShading = false;
        _this._triangles = triangles;
        _this.boundingBox.calculateBoundingBoxFromTriangles(_this._triangles);
        _this._bvh = new __WEBPACK_IMPORTED_MODULE_2__bvh_bvh__["a" /* default */]();
        return _this;
    }
    Object3d.prototype.updatePosition = function (new_position) {
        for (var _i = 0, _a = this._triangles; _i < _a.length; _i++) {
            var triangle = _a[_i];
            vec3.sub(triangle.v0, triangle.v0, this.position);
            vec3.sub(triangle.v1, triangle.v1, this.position);
            vec3.sub(triangle.v2, triangle.v2, this.position);
            vec3.add(triangle.v0, triangle.v0, new_position);
            vec3.add(triangle.v1, triangle.v1, new_position);
            vec3.add(triangle.v2, triangle.v2, new_position);
        }
        this.position = new_position;
    };
    Object3d.prototype.recurseBBoxes = function (node, ray, colliding_positions) {
        if (!node.isLeaf()) {
            if (node.left.rayIntersection(ray)) {
                this.recurseBBoxes(node.left, ray, colliding_positions);
            }
            if (node.right.rayIntersection(ray)) {
                this.recurseBBoxes(node.right, ray, colliding_positions);
            }
        }
        else {
            for (var _i = 0, _a = node.triangles; _i < _a.length; _i++) {
                var triangle = _a[_i];
                var collision_pos = vec3.create();
                if (triangle.rayIntersection(ray, collision_pos)) {
                    colliding_positions.push(collision_pos);
                }
            }
        }
    };
    Object3d.prototype.rayIntersection = function (ray, collision_pos) {
        var colliding_positions = [];
        var node = this._bvh.root;
        this.recurseBBoxes(node, ray, colliding_positions);
        if (colliding_positions.length != 0) {
            collision_pos[0] = colliding_positions[0][0];
            collision_pos[1] = colliding_positions[0][1];
            collision_pos[2] = colliding_positions[0][2];
            return true;
        }
        else {
            return false;
        }
    };
    Object3d.prototype.toJSON = function () {
        var triangles = [];
        for (var _i = 0, _a = this._triangles; _i < _a.length; _i++) {
            var triangle = _a[_i];
            triangles.push([
                [triangle.v0[0], triangle.v0[1], triangle.v0[2]],
                [triangle.v1[0], triangle.v1[1], triangle.v1[2]],
                [triangle.v2[0], triangle.v2[1], triangle.v2[2]],
            ]);
        }
        return {
            position: [this.position[0], this.position[1], this.position[2]],
            rotation: [this.position[0], this.position[1], this.position[2]],
            triangles: triangles,
            material_index: this.material.material_index
        };
    };
    Object3d.LoadObj = function (objData, material) {
        var vertices = [];
        var vertexNormals = [];
        var vertexUVs = [];
        var triangles = [];
        var lines = objData.split('\n');
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var components = line.split(' ');
            switch (components[0]) {
                // Vertex indices
                case 'f':
                    var indices1 = components[1].split('/');
                    var indices2 = components[2].split('/');
                    var indices3 = components[3].split('/');
                    //vertexUVs[parseInt(indices1[1]) - 1], vertexUVs[parseInt(indices2[1]) - 1], vertexUVs[parseInt(indices3[1]) - 1])
                    triangles.push(new __WEBPACK_IMPORTED_MODULE_1__triangle__["a" /* default */](vertices[parseInt(indices1[0]) - 1], vertices[parseInt(indices2[0]) - 1], vertices[parseInt(indices3[0]) - 1], vertexNormals[parseInt(indices1[2]) - 1], vertexNormals[parseInt(indices2[2]) - 1], vertexNormals[parseInt(indices3[2]) - 1], vertexUVs[parseInt(indices1[1]) - 1], vertexUVs[parseInt(indices2[1]) - 1], vertexUVs[parseInt(indices3[1]) - 1]));
                    break;
                // Vertex positions
                case 'v':
                    vertices.push(vec3.fromValues(components[1], components[2], components[3]));
                    break;
                case 'vn':
                    vertexNormals.push(vec3.fromValues(components[1], components[2], components[3]));
                    break;
                case 'vt':
                    vertexUVs.push(vec2.fromValues(components[1], components[2]));
                    break;
            }
        }
        return new Object3d(triangles, material);
    };
    Object.defineProperty(Object3d.prototype, "triangles", {
        get: function () { return this._triangles; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3d.prototype, "bvh", {
        get: function () { return this._bvh; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3d.prototype, "smoothShading", {
        get: function () { return this._smoothShading; },
        set: function (value) { this._smoothShading = value; },
        enumerable: true,
        configurable: true
    });
    return Object3d;
}(__WEBPACK_IMPORTED_MODULE_0__intersectable__["a" /* default */]));

//# sourceMappingURL=object3d.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Triangle = (function () {
    function Triangle(v0, v1, v2, n0, n1, n2, uv0, uv1, uv2) {
        this._v0 = v0;
        this._v1 = v1;
        this._v2 = v2;
        this._n0 = n0;
        this._n1 = n1;
        this._n2 = n2;
        this._uv0 = uv0;
        this._uv1 = uv1;
        this._uv2 = uv2;
        this._edge1 = vec3.create();
        vec3.subtract(this._edge1, v1, v0);
        this._edge2 = vec3.create();
        vec3.subtract(this._edge2, v2, v0);
        // console.log(this._edge1[0] + " " + this._edge1[1] + " " + this._edge1[2]);
        // console.log(this._edge2[0] + " " + this._edge2[1] + " " + this._edge2[2]);
        var edge_cross = vec3.create();
        vec3.cross(edge_cross, this._edge1, this._edge2);
        this._triangleArea = 0.5 * vec3.length(edge_cross);
        //console.log(this._triangleArea);
    }
    Triangle.prototype.updateTriangle = function () {
        // this._edge1 = vec3.create();
        // vec3.subtract(this._edge1, v1, v0);
        // this._edge2 = vec3.create();
        // vec3.subtract(this._edge2, v2, v0);
    };
    Object.defineProperty(Triangle.prototype, "v0", {
        get: function () { return this._v0; },
        set: function (value) { this._v0 = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "v1", {
        get: function () { return this._v1; },
        set: function (value) { this._v1 = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "v2", {
        get: function () { return this._v2; },
        set: function (value) { this._v2 = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "n2", {
        get: function () { return this._n2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "n1", {
        get: function () { return this._n1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "n0", {
        get: function () { return this._n0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "uv2", {
        get: function () { return this._uv2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "uv1", {
        get: function () { return this._uv1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "uv0", {
        get: function () { return this._uv0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "edge1", {
        get: function () { return this._edge1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "edge2", {
        get: function () { return this._edge2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "objectIndex", {
        get: function () { return this._objectIndex; },
        set: function (value) { this._objectIndex = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "triangleIndex", {
        get: function () { return this._triangleIndex; },
        set: function (value) { this._triangleIndex = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "triangleArea", {
        get: function () { return this._triangleArea; },
        enumerable: true,
        configurable: true
    });
    Triangle.prototype.rayIntersection = function (ray, collision_pos) {
        var EPS = 0.0001;
        //Begin calculating determinant - also used to calculate u parameter
        var P = vec3.fromValues(0, 0, 0);
        vec3.cross(P, ray.direction, this._edge2);
        var det = vec3.dot(this._edge1, P);
        if (det > -EPS && det < EPS)
            return false;
        var inv_det = 1.0 / det;
        //Distance from vertex1 to ray origin
        var T = vec3.fromValues(0, 0, 0);
        vec3.subtract(T, ray.startPosition, this._v0);
        var u = vec3.dot(T, P);
        if (u < 0.0 || u > det)
            return false;
        var Q = vec3.fromValues(0, 0, 0);
        vec3.cross(Q, T, this._edge1);
        var v = vec3.dot(ray.direction, Q);
        if (v < 0.0 || u + v > det)
            return false;
        var t = vec3.dot(this._edge2, Q);
        if (t > EPS) {
            var dir = vec3.fromValues(0, 0, 0);
            vec3.scale(dir, ray.direction, t * inv_det);
            vec3.add(collision_pos, ray.startPosition, T);
            return true;
        }
        return false;
    };
    return Triangle;
}());
/* harmony default export */ __webpack_exports__["a"] = Triangle;
//# sourceMappingURL=triangle.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Ray = (function () {
    function Ray(startPosition, direction) {
        this._startPosition = startPosition;
        this._direction = direction;
    }
    Object.defineProperty(Ray.prototype, "direction", {
        get: function () { return this._direction; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ray.prototype, "startPosition", {
        get: function () { return this._startPosition; },
        enumerable: true,
        configurable: true
    });
    return Ray;
}());
/* harmony default export */ __webpack_exports__["a"] = Ray;
//# sourceMappingURL=ray.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__materials_material__ = __webpack_require__(29);
/* harmony export (immutable) */ __webpack_exports__["a"] = buildScene;
// import Scene from './scene'
// import {Object3d} from './primitives/object3d'
// import {MATERIAL_TYPES} from './materials/material'
// import {DiffuseMaterial} from './materials/diffuse-material'
// import {GlossyMaterial} from './materials/glossy-material'

function buildScene(scene) {
    return new Promise(function (resolve, reject) {
        scene.buildScene();
        var textureData = {
            objects: new Float32Array(512 * 512 * 3),
            object_count: scene.intersectables.length,
            objects_bvh: new Float32Array(2048 * 2048 * 3),
            triangles: new Float32Array(2048 * 2048 * 3),
            triangle_count: 0,
            triangle_indices: new Float32Array(1024 * 1024 * 3),
            materials: new Float32Array(512 * 512 * 3),
            material_count: 0,
            light_triangles: new Float32Array(128 * 128 * 3),
            light_count: 0,
        };
        // Build object data
        var objectData = [];
        var bvhCount = 0;
        var triangleCount = 0;
        for (var obj_idx = 0; obj_idx < scene.intersectables.length; obj_idx++) {
            var object = scene.intersectables[obj_idx];
            object.textureIndex = obj_idx;
            var bvh_start_index = bvhCount;
            for (var obj_bvh_idx = 0; obj_bvh_idx < object.bvh.count; obj_bvh_idx++) {
                textureData.objects_bvh[bvhCount++] = object.bvh.bvhTexture[obj_bvh_idx];
            }
            var bvh_end_index = bvhCount;
            var triangle_start_index = triangleCount;
            for (var tri_idx = 0; tri_idx < object.bvh.triangleCount; tri_idx++) {
                textureData.triangle_indices[triangleCount++] = object.bvh.triangleIndexTexture[tri_idx];
            }
            var triangle_end_index = triangleCount;
            // Bounding box bottom
            objectData.push(object.boundingBox.bottom[0]);
            objectData.push(object.boundingBox.bottom[1]);
            objectData.push(object.boundingBox.bottom[2]);
            // Bounding box bottom
            objectData.push(object.boundingBox.top[0]);
            objectData.push(object.boundingBox.top[1]);
            objectData.push(object.boundingBox.top[2]);
            // Object position
            objectData.push(object.position[0]);
            objectData.push(object.position[1]);
            objectData.push(object.position[2]);
            // Object scale
            objectData.push(object.scale[0]);
            objectData.push(object.scale[1]);
            objectData.push(object.scale[2]);
            // Set indices for bvh texture
            objectData.push(bvh_start_index / 12); // BVH start index
            objectData.push(triangle_start_index / 3);
            objectData.push(0);
        }
        for (var i = 0; i < objectData.length; i++) {
            textureData.objects[i] = objectData[i];
        }
        // Build material data
        var materialData = [];
        for (var mat_idx = 0; mat_idx < scene.materials.length; mat_idx++) {
            var material = scene.materials[mat_idx];
            // Set material index
            material.material_index = mat_idx;
            // Color
            materialData.push(material.color[0]);
            materialData.push(material.color[1]);
            materialData.push(material.color[2]);
            // Extra data 1
            materialData.push(material.material_type);
            materialData.push(material.emission_rate);
            materialData.push(0);
            // Extra data 2
            if (material.material_type == __WEBPACK_IMPORTED_MODULE_0__materials_material__["a" /* MATERIAL_TYPES */].diffuse) {
                var diffuse_material = material;
                materialData.push(diffuse_material.albedo);
                materialData.push(diffuse_material.roughness);
                materialData.push(0);
            }
            else if (material.material_type == __WEBPACK_IMPORTED_MODULE_0__materials_material__["a" /* MATERIAL_TYPES */].glossy) {
                var diffuse_material = material;
                materialData.push(diffuse_material.shininess);
                materialData.push(0);
                materialData.push(0);
            }
            else if (material.material_type == __WEBPACK_IMPORTED_MODULE_0__materials_material__["a" /* MATERIAL_TYPES */].transmission) {
                var transmissionMaterial = material;
                materialData.push(transmissionMaterial.refractionIndex);
                materialData.push(transmissionMaterial.reflectRefractRatio);
                materialData.push(transmissionMaterial.roughness);
            }
            else {
                materialData.push(0);
                materialData.push(0);
                materialData.push(0);
            }
        }
        textureData.material_count = scene.materials.length;
        for (var i = 0; i < materialData.length; i++) {
            textureData.materials[i] = materialData[i];
        }
        // Build triangle data
        var triangleData = [];
        var lightData = [];
        for (var _i = 0, _a = scene.intersectables; _i < _a.length; _i++) {
            var object = _a[_i];
            // Find material index for current objtect
            var material_index = 0;
            for (var mat_idx = 0; mat_idx < scene.materials.length; mat_idx++) {
                if (scene.materials[mat_idx] === object.material) {
                    material_index = mat_idx;
                    break;
                }
            }
            // Add triangle data
            for (var _b = 0, _c = object.triangles; _b < _c.length; _b++) {
                var triangle = _c[_b];
                // v0
                triangleData.push(triangle.v0[0]);
                triangleData.push(triangle.v0[1]);
                triangleData.push(triangle.v0[2]);
                // edge1
                triangleData.push(triangle.edge1[0]);
                triangleData.push(triangle.edge1[1]);
                triangleData.push(triangle.edge1[2]);
                // edge2
                triangleData.push(triangle.edge2[0]);
                triangleData.push(triangle.edge2[1]);
                triangleData.push(triangle.edge2[2]);
                // n0
                triangleData.push(triangle.n0[0]);
                triangleData.push(triangle.n0[1]);
                triangleData.push(triangle.n0[2]);
                // n1
                triangleData.push(triangle.n1[0]);
                triangleData.push(triangle.n1[1]);
                triangleData.push(triangle.n1[2]);
                // n2
                triangleData.push(triangle.n2[0]);
                triangleData.push(triangle.n2[1]);
                triangleData.push(triangle.n2[2]);
                // uv0
                triangleData.push(triangle.uv0[0]);
                triangleData.push(triangle.uv0[1]);
                triangleData.push(0);
                // uv1
                triangleData.push(triangle.uv1[0]);
                triangleData.push(triangle.uv1[1]);
                triangleData.push(0);
                // uv2
                triangleData.push(triangle.uv2[0]);
                triangleData.push(triangle.uv2[1]);
                triangleData.push(0);
                // Extra data
                triangleData.push(material_index);
                triangleData.push(triangle.objectIndex);
                triangleData.push(0);
                triangleData.push(0);
                triangleData.push(0);
                triangleData.push(0);
                // Add light data
                if (object.material.emission_rate != 0.0) {
                    // v0
                    lightData.push(triangle.v0[0]);
                    lightData.push(triangle.v0[1]);
                    lightData.push(triangle.v0[2]);
                    // edge1
                    lightData.push(triangle.edge1[0]);
                    lightData.push(triangle.edge1[1]);
                    lightData.push(triangle.edge1[2]);
                    // edge2
                    lightData.push(triangle.edge2[0]);
                    lightData.push(triangle.edge2[1]);
                    lightData.push(triangle.edge2[2]);
                    // n0
                    lightData.push(triangle.n0[0]);
                    lightData.push(triangle.n0[1]);
                    lightData.push(triangle.n0[2]);
                    // n1
                    lightData.push(triangle.n1[0]);
                    lightData.push(triangle.n1[1]);
                    lightData.push(triangle.n1[2]);
                    // n2
                    lightData.push(triangle.n2[0]);
                    lightData.push(triangle.n2[1]);
                    lightData.push(triangle.n2[2]);
                    // Extra data
                    lightData.push(material_index);
                    lightData.push(triangle.objectIndex);
                    lightData.push(triangle.triangleArea);
                    lightData.push(0);
                    lightData.push(0);
                    lightData.push(0);
                }
            }
        }
        var tri_count = 0;
        for (var i = 0; i < triangleData.length; ++i) {
            if (i % 12 == 0)
                tri_count++;
            textureData.triangles[i] = triangleData[i];
        }
        textureData.triangle_count = tri_count;
        var light_count = 0;
        for (var i = 0; i < lightData.length; ++i) {
            if (i % 12 == 0)
                light_count++;
            textureData.light_triangles[i] = lightData[i];
        }
        textureData.light_count = light_count;
        resolve(textureData);
    });
}
//# sourceMappingURL=scene-builder.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Scene = (function () {
    function Scene() {
        this._intersectables = [];
        this._triangles = [];
        this._materials = [];
    }
    Scene.prototype.recurseBBoxes = function (node, ray, colliding_objects) {
        if (!node.isLeaf()) {
            if (node.left.rayIntersection(ray)) {
                this.recurseBBoxes(node.left, ray, colliding_objects);
            }
            if (node.right.rayIntersection(ray)) {
                this.recurseBBoxes(node.right, ray, colliding_objects);
            }
        }
        else {
            for (var _i = 0, _a = node.triangles; _i < _a.length; _i++) {
                var triangle = _a[_i];
                var collision_pos = vec3.create();
                if (triangle.rayIntersection(ray, collision_pos)) {
                    colliding_objects.push(this._intersectables[triangle.objectIndex]);
                }
            }
        }
    };
    Scene.prototype.sceneIntersection = function (ray) {
        var closest_colliding_object;
        var closest_distance = 100000;
        for (var _i = 0, _a = this._intersectables; _i < _a.length; _i++) {
            var object = _a[_i];
            if (object.boundingBox.rayIntersection(ray)) {
                var colliding_pos = vec3.create();
                if (object.rayIntersection(ray, colliding_pos)) {
                    var distance = vec3.distance(ray.startPosition, colliding_pos);
                    if (distance < closest_distance) {
                        closest_colliding_object = object;
                    }
                }
            }
        }
        return closest_colliding_object;
    };
    Scene.prototype.buildScene = function () {
        this._triangles = [];
        for (var obj_idx = 0; obj_idx < this._intersectables.length; obj_idx++) {
            var object = this._intersectables[obj_idx];
            for (var _i = 0, _a = object.triangles; _i < _a.length; _i++) {
                var triangle = _a[_i];
                triangle.objectIndex = obj_idx;
                this._triangles.push(triangle);
            }
        }
        for (var tri_idx = 0; tri_idx < this._triangles.length; tri_idx++) {
            this._triangles[tri_idx].triangleIndex = tri_idx;
        }
        for (var _b = 0, _c = this._intersectables; _b < _c.length; _b++) {
            var object = _c[_b];
            object.bvh.createBVH(object.triangles);
        }
    };
    Object.defineProperty(Scene.prototype, "materials", {
        get: function () { return this._materials; },
        set: function (value) { this._materials = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "intersectables", {
        get: function () { return this._intersectables; },
        set: function (value) { this._intersectables = value; },
        enumerable: true,
        configurable: true
    });
    return Scene;
}());
/* harmony default export */ __webpack_exports__["a"] = Scene;
//# sourceMappingURL=scene.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_shader__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_pingpong_fbo__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_camera__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__camera_navigator__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_render_context__ = __webpack_require__(25);





/*
 Shader imports
 */
var pathTracerVert = __webpack_require__(228);
var pathTracerFrag = __webpack_require__(405);
var RayMarcher = (function () {
    function RayMarcher(_settingsService) {
        this._settingsService = _settingsService;
        this._shouldRender = true;
        this._camera = new __WEBPACK_IMPORTED_MODULE_2__models_camera__["a" /* default */](this._settingsService, vec3.fromValues(-2, 0, 0), vec3.fromValues(1, 0, 0));
        this._navigator = new __WEBPACK_IMPORTED_MODULE_3__camera_navigator__["a" /* CameraNavigator */](this._camera, _settingsService);
        this._navigator.rotationYFactor = 1.0;
        this._navigator.zoomFactor = 1.0;
        this._pathTracerShader = new __WEBPACK_IMPORTED_MODULE_0__utils_shader__["e" /* default */](pathTracerVert, pathTracerFrag);
        this._pathTracerUniforms = {
            u_accumulated_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: null },
            u_dome_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: null },
            // Render settings uniforms
            time: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 1.0 },
            samples: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.0 },
            global_lightning_enabled: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.0 },
            // Fractal uniforms
            u_fractalType: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.0 },
            u_power: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 10.0 },
            u_bailout: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 10.0 },
            u_minDistance: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.001 },
            u_maxIterations: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 300 },
            // Camera
            u_cameraYaw: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.0 },
            u_cameraPitch: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.0 },
            camera_position: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["b" /* VEC3_TYPE */], value: this._camera.position },
            camera_direction: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["b" /* VEC3_TYPE */], value: this._camera.direction },
            camera_right: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["b" /* VEC3_TYPE */], value: this._camera.camera_right },
            camera_up: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["b" /* VEC3_TYPE */], value: this._camera.camera_up },
        };
        // Add fractal attributes
        for (var _i = 0, _a = this._settingsService.mengerSponge.attributes; _i < _a.length; _i++) {
            var attributeSub = _a[_i];
            var attr = attributeSub.getValue();
            this._pathTracerUniforms[attr.uniformName] = { type: attr.uniformType, value: attr.value };
        }
        this._pathTracerShader.uniforms = this._pathTracerUniforms;
        this._settingsService.connectShader(this._pathTracerShader);
        this._frameBuffer = new __WEBPACK_IMPORTED_MODULE_1__utils_pingpong_fbo__["a" /* default */](this._pathTracerShader, 512, 512);
        this._refreshScreen = false;
        this.loadDomeTexture("./assets/sky-3.jpg");
        this.setupSettingsListeners();
    }
    RayMarcher.prototype.init = function () {
        this._navigator = new __WEBPACK_IMPORTED_MODULE_3__camera_navigator__["a" /* CameraNavigator */](this._camera, this._settingsService);
        this._navigator.rotationYFactor = 1.0;
        this._navigator.zoomFactor = 1.0;
    };
    RayMarcher.prototype.loadDomeTexture = function (url) {
        var _this = this;
        //console.log(image)
        var lightSphereTexture = __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].createTexture();
        var lightSphereLocation = __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].getUniformLocation(this._frameBuffer._program, "u_dome_texture");
        var lightSphereImage = new Image();
        lightSphereImage.onload = function () {
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].useProgram(_this._frameBuffer._program);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE2);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, lightSphereTexture);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_WRAP_S, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].CLAMP_TO_EDGE);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_WRAP_T, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].CLAMP_TO_EDGE);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_MIN_FILTER, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].LINEAR);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_MAG_FILTER, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].LINEAR);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].texImage2D(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, 0, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].UNSIGNED_BYTE, lightSphereImage);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].uniform1i(lightSphereLocation, 2);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, null);
        };
        lightSphereImage.src = url;
        this._pathTracerUniforms['u_dome_texture'].value = lightSphereTexture;
    };
    RayMarcher.prototype.render = function () {
        if (this._shouldRender) {
            this._frameBuffer.scaleFactor = 1.0;
            this._pathTracerUniforms['resolution'].value = [this._frameBuffer.sizeX, this._frameBuffer.sizeY];
            this._pathTracerUniforms['u_accumulated_texture'].value = this._frameBuffer.texture;
            this._pathTracerUniforms['u_cameraYaw'].value = this._camera.yawRotation;
            this._pathTracerUniforms['u_cameraPitch'].value = this._camera.pitchRotation;
            this._pathTracerUniforms['camera_position'].value = this._camera.position;
            this._pathTracerUniforms['camera_direction'].value = this._camera.direction;
            this._pathTracerUniforms['camera_right'].value = this._camera.camera_right;
            this._pathTracerUniforms['camera_up'].value = this._camera.camera_up;
            this._frameBuffer.render();
            if (this._settingsService.refreshScreen) {
                this._settingsService.refreshScreen = false;
                this._frameBuffer.resetTextures();
                this._pathTracerUniforms['samples'].value = 0.0;
            }
            else if (this._camera.hasChanged || this._refreshScreen || this._pathTracerShader.needsUpdate) {
                this._pathTracerUniforms['samples'].value = 0.0;
                this._camera.hasChanged = false;
                this._refreshScreen = false;
                this._pathTracerShader.needsUpdate = false;
            }
            else {
                this._pathTracerUniforms['samples'].value += 1.0;
            }
            this._pathTracerUniforms['time'].value += 0.01;
        }
    };
    RayMarcher.prototype.setupSettingsListeners = function () {
        var _this = this;
        this._settingsService.renderSettings.getAttributeSub('resolution').asObservable().subscribe(function (attr) {
            var resolution = attr.value;
            _this._pathTracerUniforms['resolution'].value = resolution;
            _this._frameBuffer.setWindowSize(resolution[0], resolution[1]);
            _this._frameBuffer.resetTextures();
            _this._refreshScreen = true;
        });
        this._settingsService.powerObservable.subscribe(function (power) {
            _this._pathTracerUniforms['u_power'].value = power;
            _this._refreshScreen = true;
        });
        this._settingsService.detailLevelObservable.subscribe(function (val) {
            _this._pathTracerUniforms['u_minDistance'].value = 1 / val;
            _this._refreshScreen = true;
        });
        this._settingsService.maxIterationsObservable.subscribe(function (val) {
            _this._pathTracerUniforms['u_maxIterations'].value = val;
            _this._refreshScreen = true;
        });
        this._settingsService.shouldRenderSub.asObservable().subscribe(function (val) { return _this._shouldRender = val; });
        this._settingsService.fractalTypeSub.asObservable().subscribe(function (val) {
            _this._pathTracerUniforms['u_fractalType'].value = val;
            _this._refreshScreen = true;
        });
        // this._settingsService.globalLightPowerSub.asObservable().subscribe(val => {
        //   this._pathTracerUniforms['u_globalLightPower'].value = val
        //   this._refreshScreen = true
        // })
        for (var _i = 0, _a = this._settingsService.mengerSponge.attributes; _i < _a.length; _i++) {
            var attributeSub = _a[_i];
            attributeSub.asObservable().subscribe(function (val) { _this._pathTracerUniforms[val.uniformName].value = val.value; _this._refreshScreen = true; });
        }
    };
    Object.defineProperty(RayMarcher.prototype, "frameBuffer", {
        get: function () { return this._frameBuffer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayMarcher.prototype, "renderTexture", {
        get: function () { return this._frameBuffer.texture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayMarcher.prototype, "samples", {
        get: function () { return this._pathTracerUniforms['samples'].value; },
        enumerable: true,
        configurable: true
    });
    return RayMarcher;
}());
/* harmony default export */ __webpack_exports__["a"] = RayMarcher;
//# sourceMappingURL=ray-marcher.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_shader__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_pingpong_fbo__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_data_texture__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__camera_navigator__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_render_context__ = __webpack_require__(25);





/*
 Shader imports
 */
var pathTracerVert = __webpack_require__(228);
//const pathTracerFrag = require('raw-loader!glslify-loader!./shaders/path-tracer.frag');
var pathTracerFrag = __webpack_require__(406);
var RayTracer = (function () {
    function RayTracer(_settingsService, _sceneService, sceneTextures) {
        this._settingsService = _settingsService;
        this._sceneService = _sceneService;
        this._shouldRender = true;
        this._navigator = new __WEBPACK_IMPORTED_MODULE_3__camera_navigator__["a" /* CameraNavigator */](this._sceneService.camera, _settingsService);
        this._triangleTexture = new __WEBPACK_IMPORTED_MODULE_2__utils_data_texture__["a" /* default */](2048, 2048, sceneTextures.triangles, "u_triangle_texture");
        this._lightTexture = new __WEBPACK_IMPORTED_MODULE_2__utils_data_texture__["a" /* default */](128, 128, sceneTextures.light_triangles, "u_light_texture");
        this._materialTexture = new __WEBPACK_IMPORTED_MODULE_2__utils_data_texture__["a" /* default */](512, 512, sceneTextures.materials, "u_material_texture");
        this._triangleIndexTexture = new __WEBPACK_IMPORTED_MODULE_2__utils_data_texture__["a" /* default */](1024, 1024, sceneTextures.triangle_indices, "u_triangle_index_texture");
        this._objectsBVHTexture = new __WEBPACK_IMPORTED_MODULE_2__utils_data_texture__["a" /* default */](2048, 2048, sceneTextures.objects_bvh, "u_objects_bvh_texture");
        this._objectsTexture = new __WEBPACK_IMPORTED_MODULE_2__utils_data_texture__["a" /* default */](512, 512, sceneTextures.objects, "u_objects_texture");
        this._pathTracerShader = new __WEBPACK_IMPORTED_MODULE_0__utils_shader__["e" /* default */](pathTracerVert, pathTracerFrag);
        this._pathTracerUniforms = {
            // Data textures
            u_accumulated_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: null },
            u_dome_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: null },
            u_triangle_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: this._triangleTexture.texture },
            u_light_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: this._lightTexture.texture },
            u_material_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: this._materialTexture.texture },
            u_triangle_index_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: this._triangleIndexTexture.texture },
            u_objects_bvh_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: this._objectsBVHTexture.texture },
            u_objects_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: this._objectsTexture.texture },
            // Uniforms
            time: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 1.0 },
            samples: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.0 },
            global_lightning_enabled: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.0 },
            triangle_count: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["d" /* INTEGER_TYPE */], value: sceneTextures.triangle_count },
            object_count: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["d" /* INTEGER_TYPE */], value: sceneTextures.object_count },
            // Camera
            u_cameraYaw: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.0 },
            u_cameraPitch: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.0 },
            camera_position: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["b" /* VEC3_TYPE */], value: this._sceneService.camera.position },
            camera_direction: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["b" /* VEC3_TYPE */], value: this._sceneService.camera.direction },
            camera_right: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["b" /* VEC3_TYPE */], value: this._sceneService.camera.camera_right },
            camera_up: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["b" /* VEC3_TYPE */], value: this._sceneService.camera.camera_up },
        };
        this._pathTracerShader.uniforms = this._pathTracerUniforms;
        this._settingsService.connectShader(this._pathTracerShader);
        this._frameBuffer = new __WEBPACK_IMPORTED_MODULE_1__utils_pingpong_fbo__["a" /* default */](this._pathTracerShader, 512, 512);
        this.loadDomeTexture("./assets/dome.jpg");
        this.setupSettingsListeners();
        this._refreshScreen = false;
    }
    RayTracer.prototype.init = function () {
        this._navigator = new __WEBPACK_IMPORTED_MODULE_3__camera_navigator__["a" /* CameraNavigator */](this._sceneService.camera, this._settingsService);
    };
    RayTracer.prototype.loadDomeTexture = function (url) {
        var _this = this;
        //console.log(image)w
        var lightSphereTexture = __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].createTexture();
        var lightSphereLocation = __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].getUniformLocation(this._frameBuffer._program, "u_dome_texture");
        var lightSphereImage = new Image();
        lightSphereImage.onload = function () {
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].useProgram(_this._frameBuffer._program);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE2);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, lightSphereTexture);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_WRAP_S, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].CLAMP_TO_EDGE);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_WRAP_T, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].CLAMP_TO_EDGE);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_MIN_FILTER, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].LINEAR);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_MAG_FILTER, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].LINEAR);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].texImage2D(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, 0, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].UNSIGNED_BYTE, lightSphereImage);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].uniform1i(lightSphereLocation, 2);
            __WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_4__utils_render_context__["a" /* gl */].TEXTURE_2D, null);
        };
        lightSphereImage.src = url;
        this._pathTracerUniforms['u_dome_texture'].value = lightSphereTexture;
    };
    RayTracer.prototype.setupSettingsListeners = function () {
        var _this = this;
        this._settingsService.renderSettings.getAttributeSub('resolution').asObservable().subscribe(function (attr) {
            var resolution = attr.value;
            _this._pathTracerUniforms['resolution'].value = resolution;
            _this._frameBuffer.setWindowSize(resolution[0], resolution[1]);
            _this._frameBuffer.resetTextures();
            _this._refreshScreen = true;
        });
        this._settingsService.maxIterationsObservable.subscribe(function (val) {
            _this._pathTracerUniforms['u_maxIterations'].value = val;
            _this._refreshScreen = true;
        });
        this._settingsService.shouldRenderSub.asObservable().subscribe(function (val) { return _this._shouldRender = val; });
    };
    RayTracer.prototype.render = function () {
        if (this._shouldRender) {
            this._pathTracerUniforms['u_accumulated_texture'].value = this._frameBuffer.texture;
            this._pathTracerUniforms['u_cameraYaw'].value = this._sceneService.camera.yawRotation;
            this._pathTracerUniforms['u_cameraPitch'].value = this._sceneService.camera.pitchRotation;
            this._pathTracerUniforms['camera_position'].value = this._sceneService.camera.position;
            this._pathTracerUniforms['camera_direction'].value = this._sceneService.camera.direction;
            this._pathTracerUniforms['camera_right'].value = this._sceneService.camera.camera_right;
            this._pathTracerUniforms['camera_up'].value = this._sceneService.camera.camera_up;
            this._frameBuffer.render();
            if (this._sceneService.camera.hasChanged || this._refreshScreen || this._pathTracerShader.needsUpdate) {
                this._pathTracerUniforms['samples'].value = 0.0;
                this._sceneService.camera.hasChanged = false;
                this._pathTracerShader.needsUpdate = false;
                this._refreshScreen = false;
            }
            else {
                this._pathTracerUniforms['samples'].value += 1.0;
            }
            this._pathTracerUniforms['time'].value += 0.01;
        }
    };
    Object.defineProperty(RayTracer.prototype, "renderTexture", {
        get: function () { return this._frameBuffer.texture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayTracer.prototype, "pathTracerUniforms", {
        get: function () { return this._pathTracerUniforms; },
        set: function (value) { this._pathTracerUniforms = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayTracer.prototype, "refreshScreen", {
        set: function (value) { this._refreshScreen = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayTracer.prototype, "triangleIndexTexture", {
        get: function () { return this._triangleIndexTexture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayTracer.prototype, "objectsBVHTexture", {
        get: function () { return this._objectsBVHTexture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayTracer.prototype, "objectsTexture", {
        get: function () { return this._objectsTexture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayTracer.prototype, "materialTexture", {
        get: function () { return this._materialTexture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayTracer.prototype, "lightTexture", {
        get: function () { return this._lightTexture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayTracer.prototype, "triangleTexture", {
        get: function () { return this._triangleTexture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RayTracer.prototype, "samples", {
        get: function () { return this._pathTracerUniforms['samples'].value; },
        enumerable: true,
        configurable: true
    });
    return RayTracer;
}());
/* harmony default export */ __webpack_exports__["a"] = RayTracer;
//# sourceMappingURL=ray-tracer.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_primitives_object3d__ = __webpack_require__(302);
/* unused harmony export LoadShaders */
/* harmony export (immutable) */ __webpack_exports__["a"] = LoadObjects;

function LoadShader(fileName, index, callback) {
    jQuery.get(fileName, function (data) {
        callback(data, index);
    });
}
function LoadShaders(fileNames, callback, errorCallback) {
    var loaded_files = 0;
    var shader_files = [];
    for (var file_index = 0; file_index < fileNames.length; file_index++) {
        LoadShader(fileNames[file_index], file_index, function (data, shader_index) {
            shader_files[shader_index] = data;
            loaded_files++;
            if (loaded_files == fileNames.length) {
                var total_shader_data = '';
                for (var _i = 0, shader_files_1 = shader_files; _i < shader_files_1.length; _i++) {
                    var shader_data = shader_files_1[_i];
                    total_shader_data += shader_data;
                }
                callback(total_shader_data);
            }
        });
    }
}
function LoadObjects(fileNames, callback, errorCallback) {
    var loaded_files = 0;
    var object_files = [];
    for (var file_index = 0; file_index < fileNames.length; file_index++) {
        LoadShader(fileNames[file_index].fileName, file_index, function (data, shader_index) {
            object_files[shader_index] = __WEBPACK_IMPORTED_MODULE_0__models_primitives_object3d__["a" /* Object3d */].LoadObj(data, fileNames[shader_index].material);
            loaded_files++;
            if (loaded_files == fileNames.length) {
                callback(object_files);
            }
        });
    }
}
//# sourceMappingURL=obj-loader.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_shader__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_render_target__ = __webpack_require__(66);





/*
 Shader imports
 */
var baseRendererVert = __webpack_require__(388);
var baseRendererFrag = __webpack_require__(387);
var RenderView = (function () {
    function RenderView(_settingsService) {
        var _this = this;
        this._settingsService = _settingsService;
        var shader = new __WEBPACK_IMPORTED_MODULE_0__utils_shader__["e" /* default */](baseRendererVert, baseRendererFrag);
        this._uniforms = {
            u_time: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 0.0 },
            u_zoom: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */], value: 1.0 },
            u_rendererResolution: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["c" /* VEC2_TYPE */], value: vec2.fromValues(512, 512) },
            u_resolution: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["c" /* VEC2_TYPE */], value: [window.innerWidth, window.innerHeight] },
            u_mousePosition: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["c" /* VEC2_TYPE */], value: [0.0, 0.0] },
            u_texture: { type: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["f" /* TEXTURE_TYPE */], value: null },
        };
        shader.uniforms = this._uniforms;
        this._renderTarget = new __WEBPACK_IMPORTED_MODULE_1__utils_render_target__["a" /* default */](shader, window.innerWidth, window.innerHeight);
        window.onmousemove = function (e) { return _this._uniforms['u_mousePosition'].value = [e.clientX, e.clientY]; };
        //window.onresize = () => this._renderTarget.setWindowSize(window.innerWidth, window.innerHeight)
        this._settingsService.zoomSub.asObservable().subscribe(function (value) {
            _this._uniforms['u_zoom'].value = value;
        });
        _settingsService.renderSettings.getAttributeSub('resolution').asObservable().subscribe(function (attr) { return _this._uniforms['u_rendererResolution'].value = attr.value; });
    }
    RenderView.prototype.render = function (pathTracerTexture) {
        this._uniforms['u_time'].value += 0.01;
        this._uniforms['u_texture'].value = pathTracerTexture;
        this._uniforms['u_resolution'].value = [window.innerWidth, window.innerHeight];
        // if (this._settingsService.scaledDown) {
        //   this._uniforms['u_rendererResolution'].value = vec2.fromValues(this._settingsService.resolutionSub.getValue()[0] * 0.5, this._settingsService.resolutionSub.getValue()[1] * 0.5)
        // }
        // else {
        //   this._uniforms['u_rendererResolution'].value = vec2.fromValues(this._settingsService.resolutionSub.getValue()[0], this._settingsService.resolutionSub.getValue()[1])
        // }
        //
        // this._uniforms['u_zoom'].value = this._settingsService.scaledDown ? this._settingsService.zoomSub.getValue() * 2.0 : this._settingsService.zoomSub.getValue();
        this._renderTarget.render();
    };
    RenderView.prototype.updateSize = function () {
        this._renderTarget.setWindowSize(window.innerWidth, window.innerHeight);
    };
    return RenderView;
}());
/* harmony default export */ __webpack_exports__["a"] = RenderView;
//# sourceMappingURL=render-view.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_shader__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setting__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MengerSponge; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var MengerSponge = (function (_super) {
    __extends(MengerSponge, _super);
    function MengerSponge() {
        var _this = _super.call(this) || this;
        _this.isEnabled = true;
        _this.addAttribute({
            name: 'Sponge scale',
            uiType: __WEBPACK_IMPORTED_MODULE_1__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 0.0,
                maxValue: 3.0,
                stepSize: 0.1,
            },
            value: 1.0,
            uniformName: 'u_spongeScale',
            uniformType: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Half sponge scale',
            uiType: __WEBPACK_IMPORTED_MODULE_1__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 0.0,
                maxValue: 3.0,
                stepSize: 0.1,
            },
            value: 0.5,
            uniformName: 'u_halfSpongeScale',
            uniformType: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Sponge offset',
            uiType: __WEBPACK_IMPORTED_MODULE_1__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 0.0,
                maxValue: 1.0,
                stepSize: 0.0001,
            },
            value: 0.0,
            uniformName: 'u_spongeOffset',
            uniformType: __WEBPACK_IMPORTED_MODULE_0__utils_shader__["a" /* FLOAT_TYPE */]
        });
        return _this;
    }
    return MengerSponge;
}(__WEBPACK_IMPORTED_MODULE_1__setting__["b" /* Setting */]));

//# sourceMappingURL=menger-sponge.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setting__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shader__ = __webpack_require__(9);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var LightSettings = (function (_super) {
    __extends(LightSettings, _super);
    function LightSettings() {
        var _this = _super.call(this) || this;
        _this.addAttribute({
            name: 'Image based lightning',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["e" /* UI_TYPE_TOGGLE */],
            value: 1.0,
            uniformName: 'u_imageBasedLightning',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Global light power',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 0.0,
                maxValue: 5.0,
                stepSize: 0.01,
            },
            value: 1.0,
            uniformName: 'u_globalLightPower',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Global light contrast',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 0.0,
                maxValue: 5.0,
                stepSize: 0.1,
            },
            value: 1.5,
            uniformName: 'u_globalLightContrast',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Fill background',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["e" /* UI_TYPE_TOGGLE */],
            value: 0.0,
            uniformName: 'u_fillBackgroundWithLight',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Global light color',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["d" /* UI_TYPE_COLORPICKER */],
            value: [0.6, 0.6, 0.6],
            uniformName: 'u_globalLightColor',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["b" /* VEC3_TYPE */]
        });
        return _this;
    }
    return LightSettings;
}(__WEBPACK_IMPORTED_MODULE_0__setting__["b" /* Setting */]));
/* harmony default export */ __webpack_exports__["a"] = LightSettings;
//# sourceMappingURL=light-settings.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setting__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shader__ = __webpack_require__(9);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var MaterialSettings = (function (_super) {
    __extends(MaterialSettings, _super);
    function MaterialSettings() {
        var _this = _super.call(this) || this;
        _this.addAttribute({
            name: 'Material type',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["c" /* UI_TYPE_DROPDOWN */],
            uiAttributes: {
                alternatives: [{ id: 0, name: 'Diffuse' }, { id: 5, name: 'Glossy' }, { id: 1, name: 'Specular' }, { id: 2, name: 'Transmission' }]
            },
            value: 0.0,
            uniformName: 'u_materialType',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Color',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["d" /* UI_TYPE_COLORPICKER */],
            value: [1.0, 1.0, 1.0],
            uniformName: 'u_materialColor',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["b" /* VEC3_TYPE */]
        });
        _this.addAttribute({
            name: 'Shininess',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 0.0,
                maxValue: 10.0,
                stepSize: 0.01,
            },
            value: 2.0,
            uniformName: 'u_materialExtra1',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Albedo',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 0.0,
                maxValue: 10.0,
                stepSize: 0.01,
            },
            value: 2.0,
            uniformName: 'u_materialExtra2',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        return _this;
    }
    return MaterialSettings;
}(__WEBPACK_IMPORTED_MODULE_0__setting__["b" /* Setting */]));
/* harmony default export */ __webpack_exports__["a"] = MaterialSettings;
//# sourceMappingURL=material-settings.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setting__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shader__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BloomSettings; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var BloomSettings = (function (_super) {
    __extends(BloomSettings, _super);
    function BloomSettings() {
        var _this = _super.call(this) || this;
        _this.addAttribute({
            name: 'Bloom enabled',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["e" /* UI_TYPE_TOGGLE */],
            value: 0.0,
            uniformName: 'u_bloomEnabled',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Bloom alpha',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 0.0,
                maxValue: 1.0,
                stepSize: 0.01,
            },
            value: 0.2,
            uniformName: 'u_bloomAlpha',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Bloom iterations',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 0.0,
                maxValue: 30.0,
                stepSize: 1.0,
            },
            value: 5.0,
            uniformName: 'u_bloomIterations',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        return _this;
    }
    return BloomSettings;
}(__WEBPACK_IMPORTED_MODULE_0__setting__["b" /* Setting */]));

//# sourceMappingURL=bloom-settings.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setting__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shader__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderEffectsSetting; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var RenderEffectsSetting = (function (_super) {
    __extends(RenderEffectsSetting, _super);
    function RenderEffectsSetting() {
        var _this = _super.call(this) || this;
        _this.addAttribute({
            name: 'Fog enabled',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["e" /* UI_TYPE_TOGGLE */],
            value: 0.0,
            uniformName: 'u_fogEnabled',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Fog amount',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 0.0,
                maxValue: 2.0,
                stepSize: 0.001,
            },
            value: 0.2,
            uniformName: 'u_fogDistance',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["a" /* FLOAT_TYPE */]
        });
        _this.addAttribute({
            name: 'Fog color',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["d" /* UI_TYPE_COLORPICKER */],
            value: [0.2, 0.2, 0.2],
            uniformName: 'u_fogColor',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["b" /* VEC3_TYPE */]
        });
        return _this;
    }
    return RenderEffectsSetting;
}(__WEBPACK_IMPORTED_MODULE_0__setting__["b" /* Setting */]));

//# sourceMappingURL=render-effects-settings.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setting__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shader__ = __webpack_require__(9);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var RenderSettings = (function (_super) {
    __extends(RenderSettings, _super);
    function RenderSettings() {
        var _this = _super.call(this) || this;
        _this.addAttribute({
            name: 'Resolution',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["f" /* UI_TYPE_VEC2 */],
            value: vec2.fromValues(512, 512),
            uniformName: 'resolution',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["c" /* VEC2_TYPE */]
        });
        _this.addAttribute({
            name: 'Trace depth',
            uiType: __WEBPACK_IMPORTED_MODULE_0__setting__["a" /* UI_TYPE_SLIDER */],
            uiAttributes: {
                minValue: 1,
                maxValue: 10,
                stepSize: 1
            },
            value: 3,
            uniformName: 'trace_depth',
            uniformType: __WEBPACK_IMPORTED_MODULE_1__utils_shader__["d" /* INTEGER_TYPE */]
        });
        return _this;
    }
    return RenderSettings;
}(__WEBPACK_IMPORTED_MODULE_0__setting__["b" /* Setting */]));
/* harmony default export */ __webpack_exports__["a"] = RenderSettings;
//# sourceMappingURL=render-settings.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createProgram;
function createProgram(gl, shader) {
    var program = gl.createProgram();
    gl.attachShader(program, shader.fragmentShader);
    gl.attachShader(program, shader.vertexShader);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return program;
    }
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}
//# sourceMappingURL=createProgram.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_context__ = __webpack_require__(25);

var DataTexture = (function () {
    function DataTexture(_width, _height, _data, _name) {
        this._width = _width;
        this._height = _height;
        this._data = _data;
        this._name = _name;
        this._texture = __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].createTexture();
        this.updateTexture();
    }
    DataTexture.prototype.updateTexture = function () {
        __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_2D, this._texture);
        __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_MIN_FILTER, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].NEAREST);
        __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_MAG_FILTER, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].NEAREST);
        __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_WRAP_S, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].CLAMP_TO_EDGE);
        __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].texParameteri(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_WRAP_T, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].CLAMP_TO_EDGE);
        __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].texImage2D(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_2D, 0, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].RGB32F, this._width, this._height, 0, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].RGB, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].FLOAT, this._data);
    };
    Object.defineProperty(DataTexture.prototype, "texture", {
        get: function () { return this._texture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTexture.prototype, "width", {
        get: function () { return this._width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTexture.prototype, "height", {
        get: function () { return this._height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTexture.prototype, "textureData", {
        get: function () { return this._data; },
        enumerable: true,
        configurable: true
    });
    return DataTexture;
}());
/* harmony default export */ __webpack_exports__["a"] = DataTexture;
//# sourceMappingURL=data-texture.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rotationMatrixVector; });
var rotationMatrixVector = function (v, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return mat3.fromValues(c + (1.0 - c) * v[0] * v[0], (1.0 - c) * v[0] * v[1] - s * v[2], (1.0 - c) * v[0] * v[2] + s * v[1], (1.0 - c) * v[0] * v[1] + s * v[2], c + (1.0 - c) * v[1] * v[1], (1.0 - c) * v[1] * v[2] - s * v[0], (1.0 - c) * v[0] * v[2] - s * v[1], (1.0 - c) * v[1] * v[2] + s * v[0], c + (1.0 - c) * v[2] * v[2]);
};
//# sourceMappingURL=rotation-matrix-vector.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".spinner {\n  margin: auto;\n  z-index: 1000;\n  width: 100px;\n  height: 100px;\n  margin-top: 300px;\n}\n.loader {\n  position: absolute;\n  background: rgba(0,0,0,0.6);\n  width: 100%;\n  height: 100%;\n  z-index: 1000;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".bottom-bar {\n  position: absolute;\n  width: 100%;\n  bottom: 0;\n  height: 50px;\n  background: rgba(40,40,40,1.0);\n  pointer-events: visible;\n}\n\n.zoom-slider {\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n.bottom-info-label {\n  font-family: Roboto, serif;\n  font-size: 12px;\n  font-weight: 200;\n  line-height: 50px;\n  color: #fff;\n}\n\n.bottom-info-data-label {\n  font-family: Roboto;\n  font-size: 12px;\n  font-weight: 200;\n  line-height: 50px;\n  color: #fff;\n}\n\n.resolution-inputs {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n.resolution-input {\n  color: #fff;\n  font-weight: 200;\n  font-size: 12px;\n  width: 40px;\n  text-align: center;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".spinner {\n  width: 100px;\n  margin: auto;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".property-box {\n}\n.color-picker {\n  border: none;\n  border-radius: 4px;\n  width: calc(100% - 10px);\n  padding-left: 5px;\n  padding-right: 5px;\n  margin-top: 10px;\n  opacity: 0.3;\n}\n\n.dropdown {\n  color: #fff;\n  width: calc(100% - 10px);\n  padding-left: 5px;\n  padding-right: 5px;\n  margin-top: 5px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".vec3-input {\n  color: #fff;\n  font-weight: 200;\n  font-size: 12px;\n  width: 50px;\n  text-align: center;\n}\n\n.vec3-header {\n  font-family: Roboto, serif;\n  font-size: 12px;\n  font-weight: 200;\n  line-height: 12px;\n  color: #fff;\n  margin-top: 10px;\n}\n\n.dropdown {\n  color: #fff;\n  width: calc(100% - 10px);\n  padding-left: 5px;\n  padding-right: 5px;\n  margin-top: 5px;\n}\n\n.color-picker {\n  border: none;\n  border-radius: 4px;\n  width: calc(100% - 10px);\n  padding-left: 5px;\n  padding-right: 5px;\n  margin-top: 10px;\n  opacity: 0.3;\n}\n\n.property-toggle {\n  color: #fff;\n  width: 50px;\n  font-weight: 200;\n  font-family: Roboto, serif;\n  font-size: 12px;\n}\n\n.color-input {\n  color: #fff;\n  font-weight: 200;\n  font-size: 12px;\n  width: 40px;\n  text-align: center;\n}\n\n.color-circle {\n  border-radius: 50%;\n  width: 10px;\n  height: 10px;\n  background: yellow;\n  display: inline-block;\n  margin-left: 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".resolution-input {\n  color: #fff;\n  font-weight: 200;\n  font-size: 12px;\n  width: 80px;\n  text-align: center;\n}\n\n.dropdown {\n  color: #fff;\n  width: calc(100% - 10px);\n  padding-left: 5px;\n  padding-right: 5px;\n  margin-top: 5px;\n}\n\n.pane-button {\n  width: 100%;\n  opacity: 0.7;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".color-picker {\n  border: none;\n  border-radius: 4px;\n  width: calc(100% - 10px);\n  padding-left: 5px;\n  padding-right: 5px;\n  margin-top: 10px;\n  opacity: 0.3;\n}\n\n.property-toggle {\n  color: #fff;\n  width: 50px;\n  font-weight: 200;\n  font-family: Roboto, serif;\n  font-size: 12px;\n}\n\n.color-input {\n  color: #fff;\n  font-weight: 200;\n  font-size: 12px;\n  width: 40px;\n  text-align: center;\n}\n\n.color-circle {\n  border-radius: 50%;\n  width: 10px;\n  height: 10px;\n  background: yellow;\n  display: inline-block;\n  margin-left: 10px;\n}\n\n.vec2-input {\n  color: #fff;\n  font-weight: 200;\n  font-size: 12px;\n  width: 70px;\n  text-align: center;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".options-pane {\n  position: relative;\n  padding: 10px;\n  margin: 5px;\n  border-radius: 3px;\n  width: 170px;\n  background: rgba(0,0,0,0.2);\n  overflow: hidden;\n}\n\n.expand-button {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  color: #fff;\n  cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".top-bar {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  height: 50px;\n  background: rgba(0,0,0,0.0);\n  pointer-events: visible;\n}\n\n.header {\n  font-size: 35px;\n  font-weight: 200;\n  font-family: 'Permanent Marker', cursive;\n  line-height: 50px;\n  color: #fff;\n  width: 100%;\n  text-align: center;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 113,
	"./af.js": 113,
	"./ar": 120,
	"./ar-dz": 114,
	"./ar-dz.js": 114,
	"./ar-kw": 115,
	"./ar-kw.js": 115,
	"./ar-ly": 116,
	"./ar-ly.js": 116,
	"./ar-ma": 117,
	"./ar-ma.js": 117,
	"./ar-sa": 118,
	"./ar-sa.js": 118,
	"./ar-tn": 119,
	"./ar-tn.js": 119,
	"./ar.js": 120,
	"./az": 121,
	"./az.js": 121,
	"./be": 122,
	"./be.js": 122,
	"./bg": 123,
	"./bg.js": 123,
	"./bn": 124,
	"./bn.js": 124,
	"./bo": 125,
	"./bo.js": 125,
	"./br": 126,
	"./br.js": 126,
	"./bs": 127,
	"./bs.js": 127,
	"./ca": 128,
	"./ca.js": 128,
	"./cs": 129,
	"./cs.js": 129,
	"./cv": 130,
	"./cv.js": 130,
	"./cy": 131,
	"./cy.js": 131,
	"./da": 132,
	"./da.js": 132,
	"./de": 135,
	"./de-at": 133,
	"./de-at.js": 133,
	"./de-ch": 134,
	"./de-ch.js": 134,
	"./de.js": 135,
	"./dv": 136,
	"./dv.js": 136,
	"./el": 137,
	"./el.js": 137,
	"./en-au": 138,
	"./en-au.js": 138,
	"./en-ca": 139,
	"./en-ca.js": 139,
	"./en-gb": 140,
	"./en-gb.js": 140,
	"./en-ie": 141,
	"./en-ie.js": 141,
	"./en-nz": 142,
	"./en-nz.js": 142,
	"./eo": 143,
	"./eo.js": 143,
	"./es": 145,
	"./es-do": 144,
	"./es-do.js": 144,
	"./es.js": 145,
	"./et": 146,
	"./et.js": 146,
	"./eu": 147,
	"./eu.js": 147,
	"./fa": 148,
	"./fa.js": 148,
	"./fi": 149,
	"./fi.js": 149,
	"./fo": 150,
	"./fo.js": 150,
	"./fr": 153,
	"./fr-ca": 151,
	"./fr-ca.js": 151,
	"./fr-ch": 152,
	"./fr-ch.js": 152,
	"./fr.js": 153,
	"./fy": 154,
	"./fy.js": 154,
	"./gd": 155,
	"./gd.js": 155,
	"./gl": 156,
	"./gl.js": 156,
	"./gom-latn": 157,
	"./gom-latn.js": 157,
	"./he": 158,
	"./he.js": 158,
	"./hi": 159,
	"./hi.js": 159,
	"./hr": 160,
	"./hr.js": 160,
	"./hu": 161,
	"./hu.js": 161,
	"./hy-am": 162,
	"./hy-am.js": 162,
	"./id": 163,
	"./id.js": 163,
	"./is": 164,
	"./is.js": 164,
	"./it": 165,
	"./it.js": 165,
	"./ja": 166,
	"./ja.js": 166,
	"./jv": 167,
	"./jv.js": 167,
	"./ka": 168,
	"./ka.js": 168,
	"./kk": 169,
	"./kk.js": 169,
	"./km": 170,
	"./km.js": 170,
	"./kn": 171,
	"./kn.js": 171,
	"./ko": 172,
	"./ko.js": 172,
	"./ky": 173,
	"./ky.js": 173,
	"./lb": 174,
	"./lb.js": 174,
	"./lo": 175,
	"./lo.js": 175,
	"./lt": 176,
	"./lt.js": 176,
	"./lv": 177,
	"./lv.js": 177,
	"./me": 178,
	"./me.js": 178,
	"./mi": 179,
	"./mi.js": 179,
	"./mk": 180,
	"./mk.js": 180,
	"./ml": 181,
	"./ml.js": 181,
	"./mr": 182,
	"./mr.js": 182,
	"./ms": 184,
	"./ms-my": 183,
	"./ms-my.js": 183,
	"./ms.js": 184,
	"./my": 185,
	"./my.js": 185,
	"./nb": 186,
	"./nb.js": 186,
	"./ne": 187,
	"./ne.js": 187,
	"./nl": 189,
	"./nl-be": 188,
	"./nl-be.js": 188,
	"./nl.js": 189,
	"./nn": 190,
	"./nn.js": 190,
	"./pa-in": 191,
	"./pa-in.js": 191,
	"./pl": 192,
	"./pl.js": 192,
	"./pt": 194,
	"./pt-br": 193,
	"./pt-br.js": 193,
	"./pt.js": 194,
	"./ro": 195,
	"./ro.js": 195,
	"./ru": 196,
	"./ru.js": 196,
	"./sd": 197,
	"./sd.js": 197,
	"./se": 198,
	"./se.js": 198,
	"./si": 199,
	"./si.js": 199,
	"./sk": 200,
	"./sk.js": 200,
	"./sl": 201,
	"./sl.js": 201,
	"./sq": 202,
	"./sq.js": 202,
	"./sr": 204,
	"./sr-cyrl": 203,
	"./sr-cyrl.js": 203,
	"./sr.js": 204,
	"./ss": 205,
	"./ss.js": 205,
	"./sv": 206,
	"./sv.js": 206,
	"./sw": 207,
	"./sw.js": 207,
	"./ta": 208,
	"./ta.js": 208,
	"./te": 209,
	"./te.js": 209,
	"./tet": 210,
	"./tet.js": 210,
	"./th": 211,
	"./th.js": 211,
	"./tl-ph": 212,
	"./tl-ph.js": 212,
	"./tlh": 213,
	"./tlh.js": 213,
	"./tr": 214,
	"./tr.js": 214,
	"./tzl": 215,
	"./tzl.js": 215,
	"./tzm": 217,
	"./tzm-latn": 216,
	"./tzm-latn.js": 216,
	"./tzm.js": 217,
	"./uk": 218,
	"./uk.js": 218,
	"./ur": 219,
	"./ur.js": 219,
	"./uz": 221,
	"./uz-latn": 220,
	"./uz-latn.js": 220,
	"./uz.js": 221,
	"./vi": 222,
	"./vi.js": 222,
	"./x-pseudo": 223,
	"./x-pseudo.js": 223,
	"./yo": 224,
	"./yo.js": 224,
	"./zh-cn": 225,
	"./zh-cn.js": 225,
	"./zh-hk": 226,
	"./zh-hk.js": 226,
	"./zh-tw": 227,
	"./zh-tw.js": 227
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 385;


/***/ }),

/***/ 387:
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\nin vec2 v_texCoord;\nout vec4 outColor;\n\nuniform float u_time;\nuniform float u_zoom;\nuniform vec2 u_rendererResolution;\nuniform vec2 u_resolution;\nuniform vec2 u_mousePosition;\nuniform sampler2D u_texture;\n\nfloat distanceToBox(vec2 rendererResolution) {\n  vec2 min = (vec2(1.0) - rendererResolution / u_resolution) / 2.0 * u_resolution;\n  vec2 max = ((vec2(1.0) - rendererResolution / u_resolution) / 2.0 + rendererResolution / u_resolution) * u_resolution;\n  vec2 closestPos = clamp(gl_FragCoord.xy, min, max);\n\n  vec2 toBox = (closestPos - gl_FragCoord.xy);\n  return pow(abs(length(toBox)) / 500.0, 0.55 + 0.1 * sin(3.0 * u_time));\n}\n\nfloat boundingBoxCollision3d(vec3 origin, vec3 direction, vec2 rendererResolution) {\n  vec2 bottom2d = (vec2(1.0) - rendererResolution / u_resolution) / 2.0 * u_resolution;\n  vec2 top2d = ((vec2(1.0) - rendererResolution / u_resolution) / 2.0 + rendererResolution / u_resolution) * u_resolution;\n\n  vec3 bottom = vec3(bottom2d.x, bottom2d.y, 0.1);\n  vec3 top = vec3(top2d.x, top2d.y, 0.2);\n\n  vec3 dirfrac = vec3(1,1,1) / direction;\n\n  vec3 t1 = (bottom - origin) * dirfrac;\n  vec3 t2 = (top - origin) * dirfrac;\n\n  float tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));\n  float tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));\n\n  if (tmax < 0.0 || tmin > tmax) return 10000.0;\n\n  return tmin;\n}\n\nvoid main() {\n  vec3 mousePosition = vec3(u_mousePosition.x, u_resolution.y - u_mousePosition.y, 3.0);\n  vec3 backgroundPosition = vec3(gl_FragCoord.x, gl_FragCoord.y, 0.0);\n\n  vec3 background;\n  vec2 rendererResolution = u_rendererResolution * u_zoom;\n\n  vec2 rendererScale = (u_resolution / rendererResolution);\n  vec2 rendererOffset = (vec2(1.0) - rendererScale) / 2.0;\n  vec2 rendererSamplePosition = rendererOffset + v_texCoord * rendererScale;\n  vec3 rendererColor = texture(u_texture, rendererSamplePosition).xyz;\n\n  if (rendererSamplePosition.x > 1.0 || rendererSamplePosition.x < 0.0 || rendererSamplePosition.y > 1.0 || rendererSamplePosition.y < 0.0) {\n    float boxDistance = distanceToBox(rendererResolution);\n    float lightDistance = abs(length(backgroundPosition - mousePosition));\n\n    float lightIntesity = 1.0 - clamp(pow(lightDistance / 1500.0, 2.0), 0.0, 1.0);\n\n    vec3 toLight = normalize(mousePosition - backgroundPosition);\n    float distanceToBox = boundingBoxCollision3d(backgroundPosition, toLight, rendererResolution);\n\n    if (distanceToBox != 10000.0 && lightDistance > distanceToBox) {\n      lightIntesity *= clamp(pow(distanceToBox / 30.0, 1.0), 0.0, 1.0);\n    }\n\n    background = (0.2 * lightIntesity + 0.8) * (0.15 + boxDistance) * vec3(0.15 + 0.5 * (1.0 - length(vec2(0.5) - v_texCoord)));\n  }\n  else {\n    background = rendererColor;\n  }\n  outColor = vec4(background, 1.0);\n}"

/***/ }),

/***/ 388:
/***/ (function(module, exports) {

module.exports = "#version 300 es\n#define GLSLIFY 1\n\nin vec2 a_texCoord;\nin vec4 a_position;\n\nout vec2 v_texCoord;\n\nvoid main() {\n  gl_Position = a_position;\n  v_texCoord = a_texCoord;\n}"

/***/ }),

/***/ 389:
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nin vec2 v_texCoord;\nout vec4 outColor;\n\nuniform vec2 u_resolution;\nuniform sampler2D u_buffer_texture;\n\nvoid main() {\n  float offset[5];\n  offset[0] = -2.0;\n  offset[1] = -1.0;\n  offset[2] = 0.0;\n  offset[3] = 1.0;\n  offset[4] = 2.0;\n\n  float weightInverse[5];\n  weightInverse[0] = 0.0625;\n  weightInverse[1] = 0.25;\n  weightInverse[2] = 0.375;\n  weightInverse[3] = 0.25;\n  weightInverse[4] = 0.0625;\n  vec3 color = vec3(0.0, 0.0, 0.0);\n\n  for (int x = 0; x < 5; x++) {\n    color += vec3(texture(u_buffer_texture, v_texCoord + vec2(offset[x] / u_resolution.x, 0))) * weightInverse[x];\n  }\n\n\toutColor = vec4(color, 1.0);\n }\n"

/***/ }),

/***/ 390:
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nin vec2 v_texCoord;\nout vec4 outColor;\n\nuniform vec2 u_resolution;\nuniform sampler2D u_buffer_texture;\n\nvoid main() {\n  float offset[5];\n  offset[0] = -2.0;\n  offset[1] = -1.0;\n  offset[2] = 0.0;\n  offset[3] = 1.0;\n  offset[4] = 2.0;\n\n  float weightInverse[5];\n  weightInverse[0] = 0.0625;\n  weightInverse[1] = 0.25;\n  weightInverse[2] = 0.375;\n  weightInverse[3] = 0.25;\n  weightInverse[4] = 0.0625;\n  vec3 color = vec3(0.0, 0.0, 0.0);\n\n  for (int x = 0; x < 5; x++) {\n    color += vec3(texture(u_buffer_texture, v_texCoord + vec2(0.0, offset[x] / u_resolution.y))) * weightInverse[x];\n  }\n\n\toutColor = vec4(color, 1.0);\n }\n"

/***/ }),

/***/ 391:
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nin vec2 a_texCoord;\nin vec4 a_position;\n\nout vec2 v_texCoord;\n\nvoid main() {\n  gl_Position = a_position;\n  v_texCoord = a_texCoord;\n}"

/***/ }),

/***/ 392:
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nin vec2 v_texCoord;\nout vec4 outColor;\n\nuniform sampler2D u_buffer_texture;\n\nvoid main() {\n\tvec3 color = vec3(texture(u_buffer_texture, v_texCoord));\n\n  float bloomThreshold = 0.7;\n  if (color.r < bloomThreshold) color.r = 0.0;\n  if (color.g < bloomThreshold) color.g = 0.0;\n  if (color.b < bloomThreshold) color.b = 0.0;\n\n  outColor = vec4(color, 1.0);\n}\n"

/***/ }),

/***/ 393:
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nin vec2 a_texCoord;\nin vec4 a_position;\n\nout vec2 v_texCoord;\n\nvoid main() {\n  gl_Position = a_position;\n  v_texCoord = a_texCoord;\n}"

/***/ }),

/***/ 394:
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nin vec2 v_texCoord;\nout vec4 outColor;\n\nuniform sampler2D u_mainTexture;\nuniform sampler2D u_bloomTexture;\n\nuniform float u_bloomEnabled;\nuniform float u_bloomAlpha;\n\nvoid main() {\n  vec3 mainColor = texture(u_mainTexture, v_texCoord).xyz;\n  vec3 bloomColor = u_bloomAlpha * mix(texture(u_bloomTexture, v_texCoord).xyz, vec3(0.0), 1.0 - u_bloomEnabled);\n\toutColor = vec4(mainColor + bloomColor, 1.0);\n}\n"

/***/ }),

/***/ 395:
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nin vec2 a_texCoord;\nin vec4 a_position;\n\nout vec2 v_texCoord;\n\nvoid main() {\n  gl_Position = a_position;\n  v_texCoord = a_texCoord;\n}"

/***/ }),

/***/ 396:
/***/ (function(module, exports) {

module.exports = "<div class=\"loader\" *ngIf=\"settingsService.isLoadingSub | async\">\n  <md-spinner class=\"spinner\"></md-spinner>\n</div>\n\n<canvas width=\"512\" height=\"512\" id=\"renderCanvas\" #renderCanvas></canvas>\n<top-bar></top-bar>\n<fractal-settings></fractal-settings>\n<object-settings></object-settings>\n<render-options></render-options>\n<!--<bottom-bar></bottom-bar>-->\n\n<!--<loading-dialog></loading-dialog>-->"

/***/ }),

/***/ 397:
/***/ (function(module, exports) {

module.exports = "<div class=\"bottom-bar\">\n</div>"

/***/ }),

/***/ 398:
/***/ (function(module, exports) {

module.exports = "<h1 style=\"font-weight: 200\" md-dialog-title>Loading scene..</h1>\n<div md-dialog-content>\n  <md-spinner class=\"spinner\"></md-spinner>\n</div>"

/***/ }),

/***/ 399:
/***/ (function(module, exports) {

module.exports = "<div class=\"right-pane\" *ngIf=\"rayMarchingMode\">\n  <div class=\"scroll\">\n    <settings-container title=\"Fractal settings\" [expanded]=\"true\">\n      <div class=\"property-box\">\n        <div class=\"property-header\">Fractal type</div>\n        <md-select [(ngModel)]=\"selelectedMaterial\" class=\"dropdown\" (change)=\"settingsService.fractalTypeSub.next($event.value)\">\n          <md-option *ngFor=\"let fractal of fractals\" [value]=\"fractal.id\">\n            {{ fractal.name }}\n          </md-option>\n        </md-select>\n      </div>\n\n      <div class=\"property-box\">\n        <div class=\"property-header\">Shape</div>\n        <md-slider min=\"1\" max=\"19\" step=\"0.1\" value=\"10.0\" (input)=\"powerUpdate($event)\"></md-slider>\n        <span class=\"data-label\">{{settingsService.powerObservable | async | number: '1.1-1'}}</span>\n      </div>\n\n      <div class=\"property-box\">\n        <div class=\"property-header\">Detail level</div>\n        <md-slider min=\"100\" max=\"10000\" step=\"1\" value=\"1000\" (input)=\"detailLevelUpdate($event)\"></md-slider>\n        <span class=\"data-label\">{{settingsService.detailLevelObservable | async | number: '1.0-0'}}</span>\n      </div>\n\n      <div class=\"property-box\">\n        <div class=\"property-header\">Max iterations</div>\n        <md-slider min=\"1\" max=\"1000\" step=\"1\" value=\"300\" (input)=\"maxIterationsUpdate($event)\"></md-slider>\n        <span class=\"data-label\">{{settingsService.maxIterationsObservable | async | number: '1.0-0'}}</span>\n      </div>\n\n      <!--\n        Menger sponge attributes\n      -->\n\n      <div *ngIf=\"settingsService.mengerSponge.isEnabled\">\n        <div *ngFor=\"let attribute of settingsService.mengerSponge.attributes\">\n          <setting-attribute [attribute]=\"attribute\"></setting-attribute>\n        </div>\n      </div>\n    </settings-container>\n\n    <settings-container title=\"Material settings\" [expanded]=\"true\">\n\n      <div *ngFor=\"let attribute of settingsService.materialSettings.attributes\">\n        <setting-attribute [attribute]=\"attribute\"></setting-attribute>\n      </div>\n\n      <!--<div class=\"property-box\">-->\n        <!--<div class=\"property-header\">Material type</div>-->\n        <!--<md-select [(ngModel)]=\"selelectedMaterial\" class=\"dropdown\" (change)=\"materialTypeChange($event)\">-->\n          <!--<md-option *ngFor=\"let material of materials\" [value]=\"material.id\">-->\n            <!--{{ material.name }}-->\n          <!--</md-option>-->\n        <!--</md-select>-->\n      <!--</div>-->\n\n\n      <!--<div class=\"property-box\">-->\n        <!--<div class=\"property-header\">Color</div>-->\n        <!--<md-input-container dividerColor=\"accent\" mdSuffix=\"px\">-->\n          <!--<input class=\"color-input\" [(ngModel)]=\"redClr\" mdInput (change)=\"updateColor()\" type=\"number\">-->\n        <!--</md-input-container>-->\n        <!--<md-input-container dividerColor=\"accent\" mdSuffix=\"px\">-->\n          <!--<input class=\"color-input\" [(ngModel)]=\"greenClr\" mdInput (change)=\"updateColor()\" type=\"number\">-->\n        <!--</md-input-container>-->\n        <!--<md-input-container dividerColor=\"accent\" mdSuffix=\"px\">-->\n          <!--<input class=\"color-input\" [(ngModel)]=\"blueClr\" mdInput (change)=\"updateColor()\" type=\"number\">-->\n        <!--</md-input-container>-->\n        <!--&lt;!&ndash;<input class=\"color-picker\" [cpPosition]=\"'left'\" [(colorPicker)]=\"materialColor\" [style.background]=\"materialColor\" (colorPickerChange)=\"materialColorChanged($event)\"/>&ndash;&gt;-->\n      <!--</div>-->\n    </settings-container>\n  <!--<div class=\"options-pane\">-->\n    <!--<div class=\"info-header\">-->\n      <!--Render settings-->\n    <!--</div>-->\n\n    <!--<div class=\"property-box\">-->\n      <!--<div class=\"property-header\">Resolution</div>-->\n      <!--<md-input-container dividerColor=\"accent\" mdSuffix=\"px\">-->\n        <!--<input class=\"resolution-input\" [(ngModel)]=\"_resolutionWidth\" mdInput (change)=\"resolutionUpdate()\" type=\"number\" #resolutionWidth>-->\n      <!--</md-input-container>-->\n      <!--<md-input-container dividerColor=\"accent\" mdSuffix=\"px\">-->\n        <!--<input class=\"resolution-input\" [(ngModel)]=\"_resolutionHeight\" mdInput (change)=\"resolutionUpdate()\" type=\"number\" #resolutionHeight>-->\n      <!--</md-input-container>-->\n    <!--</div>-->\n\n    <!--<div class=\"property-box\">-->\n      <!--<div class=\"property-header\">Detail level</div>-->\n      <!--<md-slider min=\"100\" max=\"10000\" step=\"1\" value=\"1000\" (input)=\"detailLevelUpdate($event)\"></md-slider>-->\n      <!--<span class=\"data-label\">{{settingsService.detailLevelObservable | async | number: '1.0-0'}}</span>-->\n    <!--</div>-->\n\n    <!--<div class=\"property-box\">-->\n      <!--<div class=\"property-header\">Max iterations</div>-->\n      <!--<md-slider min=\"1\" max=\"1000\" step=\"1\" value=\"300\" (input)=\"maxIterationsUpdate($event)\"></md-slider>-->\n      <!--<span class=\"data-label\">{{settingsService.detailLevelObservable | async | number: '1.0-0'}}</span>-->\n    <!--</div>-->\n  <!--</div>-->\n\n  </div>\n</div>"

/***/ }),

/***/ 400:
/***/ (function(module, exports) {

module.exports = "<div class=\"right-pane\" *ngIf=\"rayTracingMode\">\n  <div class=\"scroll\">\n    <settings-container title=\"Scene settings\" [expanded]=\"true\">\n      <div class=\"property-header\">Default scenes</div>\n      <md-select [(ngModel)]=\"sceneId\" class=\"dropdown\" (change)=\"sceneUpdate()\">\n        <md-option *ngFor=\"let type of defaultScenes\" [value]=\"type.id\">\n          {{ type.name }}\n        </md-option>\n      </md-select>\n    </settings-container>\n\n    <div *ngIf=\"rayTracingMode && selectedObject != null\">\n      <settings-container title=\"Object settings\" [expanded]=\"true\">\n        <div class=\"vec3-header\">Position</div>\n        <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n          <input class=\"vec3-input\" [(ngModel)]=\"position[0]\" mdInput (change)=\"positionUpdate()\" type=\"number\">\n        </md-input-container>\n        <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n          <input class=\"vec3-input\" [(ngModel)]=\"position[1]\" mdInput (change)=\"positionUpdate()\" type=\"number\">\n        </md-input-container>\n        <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n          <input class=\"vec3-input\" [(ngModel)]=\"position[2]\" mdInput (change)=\"positionUpdate()\" type=\"number\">\n        </md-input-container>\n\n        <div class=\"vec3-header\">Scale</div>\n        <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n          <input class=\"vec3-input\" [(ngModel)]=\"scale[0]\" mdInput (change)=\"scaleUpdate()\" type=\"number\">\n        </md-input-container>\n        <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n          <input class=\"vec3-input\" [(ngModel)]=\"scale[1]\" mdInput (change)=\"scaleUpdate()\" type=\"number\">\n        </md-input-container>\n        <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n          <input class=\"vec3-input\" [(ngModel)]=\"scale[2]\" mdInput (change)=\"scaleUpdate()\" type=\"number\">\n        </md-input-container>\n\n        <div class=\"vec3-header\">Rotation</div>\n        <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n          <input class=\"vec3-input\" [(ngModel)]=\"rotation[0]\" mdInput (change)=\"updateColor()\" type=\"number\">\n        </md-input-container>\n        <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n          <input class=\"vec3-input\" [(ngModel)]=\"rotation[1]\" mdInput (change)=\"updateColor()\" type=\"number\">\n        </md-input-container>\n        <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n          <input class=\"vec3-input\" [(ngModel)]=\"rotation[2]\" mdInput (change)=\"updateRotation()\" type=\"number\">\n        </md-input-container>\n      </settings-container>\n\n      <settings-container title=\"Object material\" [expanded]=\"true\">\n        <div class=\"property-header\">Material type</div>\n        <md-select [(ngModel)]=\"materialType\" class=\"dropdown\" (change)=\"materialUpdate()\">\n          <md-option *ngFor=\"let type of materials\" [value]=\"type.id\">\n            {{ type.name }}\n          </md-option>\n        </md-select>\n\n        <!-- MATERIAL COLOR -->\n        <div>\n          <div class=\"property-header\">\n            Material color\n            <div class=\"color-circle\" [style.background-color]=\"'rgba(' + materialColor[0] + ',' + materialColor[1] + ',' + materialColor[2] + ',1)'\"></div>\n          </div>\n\n          <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n            <input class=\"color-input\" [(ngModel)]=\"materialColor[0]\" mdInput (change)=\"materialUpdate()\" type=\"number\">\n          </md-input-container>\n          <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n            <input class=\"color-input\" [(ngModel)]=\"materialColor[1]\" mdInput (change)=\"materialUpdate()\" type=\"number\">\n          </md-input-container>\n          <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n            <input class=\"color-input\" [(ngModel)]=\"materialColor[2]\" mdInput (change)=\"materialUpdate()\" type=\"number\">\n          </md-input-container>\n        </div>\n\n\n        <!-- DIFFUSE MATERIAL -->\n        <div *ngIf=\"materialType == 0\">\n          <div class=\"property-header\">Albedo</div>\n          <md-slider\n            min=\"0\"\n            max=\"20\"\n            step=\"0.01\"\n            value=\"{{materialExtraParameter1}}\"\n            (input)=\"materialExtraParameter1 = $event.value; materialUpdate()\"\n          ></md-slider>\n          <span class=\"data-label\">{{materialExtraParameter1 | number: '1.2-2'}}</span>\n\n          <div class=\"property-header\">Roughness</div>\n          <md-slider\n            min=\"0\"\n            max=\"20\"\n            step=\"0.01\"\n            value=\"{{materialExtraParameter2}}\"\n            (input)=\"materialExtraParameter2 = $event.value; materialUpdate()\"\n          ></md-slider>\n          <span class=\"data-label\">{{materialExtraParameter2 | number: '1.2-2'}}</span>\n        </div>\n\n        <!-- GLOSSY MATERIAL -->\n        <div *ngIf=\"materialType == 5\">\n          <div class=\"property-header\">Shininess</div>\n          <md-slider\n            min=\"0\"\n            max=\"20\"\n            step=\"0.01\"\n            value=\"{{materialExtraParameter1}}\"\n            (input)=\"materialExtraParameter1 = $event.value; materialUpdate()\"\n          ></md-slider>\n          <span class=\"data-label\">{{materialExtraParameter1 | number: '1.2-2'}}</span>\n        </div>\n\n        <!-- Emission MATERIAL -->\n        <div *ngIf=\"materialType == 2\">\n          <div class=\"property-header\">Emission rate</div>\n          <md-slider\n            min=\"0\"\n            max=\"100\"\n            step=\"0.01\"\n            value=\"{{materialEmission}}\"\n            (input)=\"materialEmission = $event.value; materialUpdate()\"\n          ></md-slider>\n          <span class=\"data-label\">{{materialEmission | number: '1.2-2'}}</span>\n        </div>\n\n        <!-- TRANSMISSION MATERIAL -->\n        <div *ngIf=\"materialType == 3\">\n          <div class=\"property-header\">Refraction index</div>\n          <md-slider\n            min=\"1.0\"\n            max=\"10\"\n            step=\"0.01\"\n            value=\"{{materialExtraParameter1}}\"\n            (input)=\"materialExtraParameter1 = $event.value; materialUpdate()\"\n          ></md-slider>\n          <span class=\"data-label\">{{materialExtraParameter1 | number: '1.2-2'}}</span>\n\n          <div class=\"property-header\">Reflect/Refract ratio</div>\n          <md-slider\n            min=\"0.0\"\n            max=\"1.0\"\n            step=\"0.01\"\n            value=\"{{materialExtraParameter2}}\"\n            (input)=\"materialExtraParameter2 = $event.value; materialUpdate()\"\n          ></md-slider>\n          <span class=\"data-label\">{{materialExtraParameter2 | number: '1.2-2'}}</span>\n\n          <div class=\"property-header\">Roughness</div>\n          <md-slider\n            min=\"0.0\"\n            max=\"10.0\"\n            step=\"0.01\"\n            value=\"{{materialExtraParameter3}}\"\n            (input)=\"materialExtraParameter3 = $event.value; materialUpdate()\"\n          ></md-slider>\n          <span class=\"data-label\">{{materialExtraParameter3 | number: '1.2-2'}}</span>\n        </div>\n      </settings-container>\n    </div>\n\n  </div>\n</div>"

/***/ }),

/***/ 401:
/***/ (function(module, exports) {

module.exports = "<div class=\"left-pane\">\n  <div class=\"scroll\">\n    <settings-container title=\"Render status\" [expanded]=\"true\">\n      <div class=\"property-box\">\n        <span class=\"property-header\">Start/stop render</span>\n        <span *ngIf=\"!(settingsService.shouldRenderSub.asObservable() | async)\">\n          <button (click)=\"settingsService.shouldRender = true\" md-icon-button><md-icon style=\"color: #fff\">play_arrow</md-icon></button>\n        </span>\n        <span *ngIf=\"settingsService.shouldRenderSub.asObservable() | async\">\n          <button (click)=\"settingsService.shouldRender = false\" md-icon-button><md-icon style=\"color: #fff\">pause</md-icon></button>\n        </span>\n      </div>\n      <div class=\"property-box\" style=\"margin-top: 10px\">\n        <span class=\"property-header\">Rendered samples</span>\n        <span class=\"property-header\" style=\"font-weight: 400\">{{renderService.samples}}</span>\n      </div>\n      <div class=\"property-box\" style=\"margin-top: 20px\">\n        <div class=\"property-header\">Move with <b>w, a, s, d</b></div>\n      </div>\n    </settings-container>\n    <settings-container title=\"Render settings\" [expanded]=\"true\">\n      <div class=\"property-box\">\n        <div class=\"property-header\">Render type</div>\n        <md-select [(ngModel)]=\"renderType\" class=\"dropdown\" (change)=\"settingsService.renderTypeSub.next($event.value)\">\n          <md-option *ngFor=\"let renderType of renderTypes\" [value]=\"renderType.id\">\n            {{ renderType.name }}\n          </md-option>\n        </md-select>\n      </div>\n\n      <!--<div class=\"property-box\">-->\n        <!--<div class=\"property-header\">Resolution</div>-->\n        <!--<md-input-container dividerColor=\"accent\" mdSuffix=\"px\">-->\n          <!--<input class=\"resolution-input\" [(ngModel)]=\"resolutionWidth\" mdInput (change)=\"resolutionUpdate()\" type=\"number\">-->\n        <!--</md-input-container>-->\n        <!--<md-input-container dividerColor=\"accent\" mdSuffix=\"px\">-->\n          <!--<input class=\"resolution-input\" [(ngModel)]=\"resolutionHeight\" mdInput (change)=\"resolutionUpdate()\" type=\"number\">-->\n        <!--</md-input-container>-->\n      <!--</div>-->\n\n      <!--<div class=\"property-box\">-->\n        <!--<div class=\"property-header\">Trace depth</div>-->\n        <!--<md-input-container dividerColor=\"accent\" mdSuffix=\"px\">-->\n          <!--<input class=\"resolution-input\" [(ngModel)]=\"resolutionWidth\" mdInput (change)=\"resolutionUpdate()\" type=\"number\">-->\n        <!--</md-input-container>-->\n      <!--</div>-->\n\n      <div class=\"property-box\" style=\"margin-top: 15px;\">\n        <div class=\"property-header\">Render view zoom</div>\n        <md-slider min=\"20\" max=\"300\" step=\"0.1\" value=\"100.0\" (input)=\"zoomSliderUpdate($event)\" #zoomSlider></md-slider>\n        <span class=\"data-label\">{{settingsService.zoomSub.asObservable() | async }}x</span>\n      </div>\n\n      <div *ngFor=\"let attribute of settingsService.renderSettings.attributes\">\n        <setting-attribute [attribute]=\"attribute\"></setting-attribute>\n      </div>\n    </settings-container>\n\n    <settings-container title=\"Lightning\" [expanded]=\"true\">\n      <div *ngFor=\"let attribute of settingsService.lightSettings.attributes\">\n        <setting-attribute [attribute]=\"attribute\"></setting-attribute>\n      </div>\n\n      <div class=\"property-box\">\n        <div class=\"property-header\">Custom light dome texture</div>\n        <input style=\"color: #fff; width: 170px; margin-top: 10px; font-weight: 200\" type=\"file\" (change)=\"imageUpload($event)\" />\n      </div>\n\n    </settings-container>\n\n    <settings-container title=\"Render effects\" [expanded]=\"false\">\n      <div *ngFor=\"let attribute of settingsService.renderEffectSettings.attributes\">\n        <setting-attribute [attribute]=\"attribute\"></setting-attribute>\n      </div>\n    </settings-container>\n\n    <settings-container title=\"Post effects\" [expanded]=\"false\">\n      <div *ngFor=\"let attribute of settingsService.bloomSettings.attributes\">\n        <setting-attribute [attribute]=\"attribute\"></setting-attribute>\n      </div>\n    </settings-container>\n\n    <div class=\"options-pane\">\n      <button class=\"pane-button\" (click)=\"downloadImage()\" md-raised-button>Save image</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 402:
/***/ (function(module, exports) {

module.exports = "<div class=\"property-box\">\n  <div *ngIf=\"attribute.getValue().uiType == 'UI_TYPE_SLIDER'\">\n    <div class=\"property-header\">{{attribute.getValue().name}}</div>\n\n    <md-slider\n      min=\"{{attribute.getValue().uiAttributes.minValue}}\"\n      max=\"{{attribute.getValue().uiAttributes.maxValue}}\"\n      step=\"{{attribute.getValue().uiAttributes.stepSize}}\"\n      value=\"{{(attribute | async ).value}}\"\n      (input)=\"updateAttribute($event.value)\"\n    ></md-slider>\n    <span class=\"data-label\">{{(attribute.asObservable() | async).value | number: '1.2-2'}}</span>\n  </div>\n\n  <div *ngIf=\"attribute.getValue().uiType == 'UI_TYPE_COLORPICKER'\">\n    <div class=\"property-header\">\n      {{attribute.getValue().name}}\n      <div class=\"color-circle\" [style.background-color]=\"'rgba(' + redClr + ',' + greenClr + ',' + blueClr + ',1)'\"></div>\n    </div>\n\n    <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n      <input class=\"color-input\" [(ngModel)]=\"redClr\" mdInput (change)=\"updateColor()\" type=\"number\">\n    </md-input-container>\n    <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n      <input class=\"color-input\" [(ngModel)]=\"greenClr\" mdInput (change)=\"updateColor()\" type=\"number\">\n    </md-input-container>\n    <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n      <input class=\"color-input\" [(ngModel)]=\"blueClr\" mdInput (change)=\"updateColor()\" type=\"number\">\n    </md-input-container>\n  </div>\n\n  <div *ngIf=\"attribute.getValue().uiType == 'UI_TYPE_DROPDOWN'\">\n    <div class=\"property-header\">{{attribute.getValue().name}}</div>\n    <md-select [(ngModel)]=\"dropdownSelection\" class=\"dropdown\" (change)=\"updateDropdown()\">\n      <md-option *ngFor=\"let type of attribute.getValue().uiAttributes.alternatives\" [value]=\"type.id\">\n        {{ type.name }}\n      </md-option>\n    </md-select>\n  </div>\n\n  <div *ngIf=\"attribute.getValue().uiType == 'UI_TYPE_VEC2'\">\n    <div class=\"property-header\">{{attribute.getValue().name}}</div>\n    <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n      <input class=\"vec2-input\" [(ngModel)]=\"vec[0]\" mdInput (change)=\"updateVec2()\" type=\"number\">\n    </md-input-container>\n    <md-input-container dividerColor=\"accent\" mdSuffix=\"px\">\n      <input class=\"vec2-input\" [(ngModel)]=\"vec[1]\" mdInput (change)=\"updateVec2()\" type=\"number\">\n    </md-input-container>\n  </div>\n\n  <div *ngIf=\"attribute.getValue().uiType == 'UI_TYPE_TOGGLE'\" style=\"margin-top: 10px;\">\n    <span style=\"height: 50px;\">\n       <md-slide-toggle [checked]=\"enabled\" class=\"property-toggle\" (change)=\"updateAttribute($event.checked ? 1.0 : 0.0)\">\n         <span style=\"padding-left: 35px;\">\n            {{attribute.getValue().name}}\n         </span>\n       </md-slide-toggle>\n    </span>\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ 403:
/***/ (function(module, exports) {

module.exports = "<div class=\"options-pane\" [ngStyle]=\"{'height': expanded ? '' : '20px'}\">\n  <div (click)=\"expanded = !expanded\" class=\"expand-button\" md-button>\n    <button *ngIf=\"!expanded\" md-icon-button>\n      <md-icon style=\"\">keyboard_arrow_down</md-icon>\n    </button>\n    <button *ngIf=\"expanded\" md-icon-button>\n      <md-icon style=\"\">keyboard_arrow_up</md-icon>\n    </button>\n  </div>\n\n  <div class=\"info-header\">{{title}}</div>\n  <ng-content></ng-content>\n</div>"

/***/ }),

/***/ 404:
/***/ (function(module, exports) {

module.exports = "<div class=\"top-bar\">\n  <div class=\"header\">Pathtracer WebGL 2</div>\n</div>"

/***/ }),

/***/ 405:
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision lowp float;\n#define GLSLIFY 1\n\nin vec2 v_texCoord;\nout vec4 outColor;\n\n// Fractal uniforms\nuniform float u_fractalType;\nuniform float u_power;\nuniform float u_minDistance;\nuniform float u_maxIterations;\nuniform float u_bailout;\n\n// Menger sponge\nuniform float u_halfSpongeScale;\nuniform float u_spongeScale;\nuniform float u_spongeOffset;\n\n// Material uniforms\nuniform float u_materialType;\nuniform vec3 u_materialColor;\nuniform float u_materialExtra1;\nuniform float u_materialExtra2;\n\n// Global light uniforms\nuniform float u_imageBasedLightning;\nuniform vec3 u_globalLightColor;\nuniform float u_fillBackgroundWithLight;\nuniform float u_globalLightPower;\nuniform float u_globalLightContrast;\n\n// Render effect settings\nuniform float u_fogEnabled;\nuniform float u_fogDistance;\nuniform vec3 u_fogColor;\n\n// Renderer uniforms\nuniform float time;\nuniform float samples;\nuniform int trace_depth;\nuniform float global_lightning_enabled;\nuniform int triangle_count;\nuniform int object_count;\nuniform vec2 resolution;\n\n// Camera uniforms\nuniform float u_cameraYaw;\nuniform float u_cameraPitch;\nuniform vec3 camera_position;\nuniform vec3 camera_direction;\nuniform vec3 camera_right;\nuniform vec3 camera_up;\n\nuniform sampler2D u_dome_texture;\n\nuniform sampler2D u_accumulated_texture;\nuniform sampler2D u_buffer_texture;\nuniform sampler2D u_triangle_texture;\nuniform sampler2D u_triangle_index_texture;\nuniform sampler2D u_bvh_texture;\nuniform sampler2D u_light_texture;\nuniform sampler2D u_material_texture;\nuniform sampler2D u_objects_bvh_texture;\nuniform sampler2D u_objects_texture;\nuniform sampler2D u_light_sphere_texture;\n\n#define EPS 0.00000001\n#define PI 3.14\n\n#define SAMPLE_STEP_128 vec2(1,0) / 128.0\n#define SAMPLE_STEP_256 vec2(1,0) / 256.0\n#define SAMPLE_STEP_512 vec2(1,0) / 512.0\n#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0\n#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0\n\n#define DIFFUSE_MATERIAL 0\n#define SPECULAR_MATERIAL 1\n#define EMISSION_MATERIAL 2\n#define TRANSMISSION_MATERIAL 3\n#define GLOSSY_MATERIAL 5\n\nstruct Collision {\n  vec3 position;\n  vec3 normal;\n  vec2 uv;\n  vec3 n0;\n  vec3 n1;\n  vec3 n2;\n  int material_index;\n  float distance;\n};\n\nstruct Triangle {\n  vec3 v0;\n  vec3 edge1;\n  vec3 edge2;\n  vec3 n0;\n  vec3 n1;\n  vec3 n2;\n  vec2 uv0;\n  vec2 uv1;\n  vec2 uv2;\n  float triangle_area;\n  int material_index;\n};\n\nstruct Object {\n  vec3 bounding_bottom;\n  vec3 bounding_top;\n  vec3 position;\n  vec3 scale;\n  float object_bvh_start_index;\n  float triangle_start_index;\n};\n\n// Ray\nstruct Ray {\n  vec3 start_position;\n  vec3 direction;\n};\n\nhighp float random(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\nmat3 rotationMatrixVector(vec3 v, float angle) {\n  float c = cos(angle);\n  float s = sin(angle);\n\n  return mat3(c + (1.0 - c) * v.x * v.x, (1.0 - c) * v.x * v.y - s * v.z, (1.0 - c) * v.x * v.z + s * v.y,\n            (1.0 - c) * v.x * v.y + s * v.z, c + (1.0 - c) * v.y * v.y, (1.0 - c) * v.y * v.z - s * v.x,\n            (1.0 - c) * v.x * v.z - s * v.y, (1.0 - c) * v.y * v.z + s * v.x, c + (1.0 - c) * v.z * v.z);\n}\n\nRay createRay(vec2 pixel_position, int sample_step) {\n\n  mat3 cameraRotation = rotationMatrixVector(vec3(0, 1, 0), u_cameraYaw) * rotationMatrixVector(vec3(0, 0, 1), u_cameraPitch);\n\n  float width = resolution.x;\n  float height = resolution.y;\n\n  float i = ((pixel_position.x / width) - 0.5) * width / height;\n  float j = ((pixel_position.y / height) - 0.5);\n  vec3 image_point = i * 1.5 * camera_right + j * 1.5 * camera_up + camera_position + cross(camera_up, camera_right);\n\n  vec3 dx = (camera_up / width);\n  vec3 dy = (camera_right / height);\n  vec3 rand_x = dx * random(vec2(pixel_position.x, pixel_position.y) * vec2(1.9898, 128.13) * (time + float(sample_step)));\n  vec3 rand_y = dy * random(vec2(pixel_position.x, pixel_position.y) * vec2(134.9898, 36.342) * (time + float(sample_step)));\n  image_point += rand_x + rand_y;\n\n  vec3 direction = normalize(cameraRotation * (image_point - camera_position));\n\n  return Ray(camera_position, direction);\n}\n\n// Material\nstruct Material {\n  vec3 color;\n  int material_type;\n  float emission_rate;\n  float material_parameter1;\n  float material_parameter2;\n};\n\nvec2 getSample(vec2 start_sample, vec2 sample_step, float resolution, float steps) {\n  float s = start_sample.x + steps * sample_step.x;\n  return vec2(fract(s), floor(s) / resolution);\n}\n\n#define SAMPLE_STEP_128 vec2(1,0) / 128.0\n#define SAMPLE_STEP_256 vec2(1,0) / 256.0\n#define SAMPLE_STEP_512 vec2(1,0) / 512.0\n#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0\n#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0\n\nMaterial getMaterial(int material_index) {\n  // Fetch material from texture\n  vec2 start_sample = SAMPLE_STEP_512 * float(material_index) * 3.0;\n  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 0.0);\n  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 1.0);\n  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 2.0);\n\n  vec3 color = vec3(texture(u_material_texture, sample1));\n  vec3 extra_data1 = vec3(texture(u_material_texture, sample2));\n  vec3 extra_data2 = vec3(texture(u_material_texture, sample3));\n\n  int material_type = int(extra_data1.x);\n  float emission_rate = extra_data1.y;\n\n  float material_parameter1 = extra_data2.x;\n  float material_parameter2 = extra_data2.y;\n\n  return Material(color, material_type, emission_rate, material_parameter1, material_parameter2);\n}\n\n#define DIFFUSE_MATERIAL 0\n#define SPECULAR_MATERIAL 1\n#define EMISSION_MATERIAL 2\n#define TRANSMISSION_MATERIAL 3\n#define GLOSSY_MATERIAL 5\n\nvec3 BRDF(Ray ray, Material material, vec2 uv, vec3 collision_normal, vec3 next_dir) {\n\n//  // Emission material\n//  if (material.material_type == EMISSION_MATERIAL) {\n//    return material.color;\n//  }\n//\n//  // Specular material\n//  if (material.material_type == SPECULAR_MATERIAL) {\n//    return material.color;\n//  }\n//\n//  // Transmission material\n//  if (material.material_type == TRANSMISSION_MATERIAL) {\n//    return material.color;\n//  }\n//\n//  // Glossy material\n//  if (material.material_type == GLOSSY_MATERIAL) {\n//    return material.color;\n//  }\n\n  // Lambertian diffuse material\n  if (material.material_type == DIFFUSE_MATERIAL) {\n    float albedo = material.material_parameter1; // material parameter 1 is albedo\n    float roughness = material.material_parameter2; // material parameter 2 is roughness\n    vec3 view_direction = -1.0 * ray.direction;\n\n    // calculate intermediary values\n    float NdotL = dot(collision_normal, next_dir);\n    float NdotV = dot(collision_normal, view_direction);\n\n    float angleVN = acos(NdotV);\n    float angleLN = acos(NdotL);\n\n    float alpha = max(angleVN, angleLN);\n    float beta = min(angleVN, angleLN);\n    float gamma = dot(view_direction - collision_normal * dot(view_direction, collision_normal), next_dir - collision_normal * dot(next_dir, collision_normal));\n\n    float roughnessSquared = roughness * roughness;\n\n    // calculate A and B\n    float A = 1.0 - 0.5 * (roughnessSquared / (roughnessSquared + 0.57));\n    float B = 0.45 * (roughnessSquared / (roughnessSquared + 0.09));\n    float C = sin(alpha) * tan(beta);\n\n    // put it all together\n    float L1 = max(0.0, NdotL) * (A + B * max(0.0, gamma) * C);\n\n    // get the final color\n    return material.color * L1;\n  }\n\n  return material.color;\n}\n\n#define DIFFUSE_MATERIAL 0\n#define SPECULAR_MATERIAL 1\n#define EMISSION_MATERIAL 2\n#define TRANSMISSION_MATERIAL 3\n#define GLOSSY_MATERIAL 5\n\nvec3 PDF(Ray ray, Material material, vec3 collision_normal, float iteration, inout float distribution) {\n  vec3 real_normal = dot(collision_normal, ray.direction) > 0.0 ? -1.0 * collision_normal : collision_normal;\n  vec3 next_dir;\n\n  if (material.material_type == DIFFUSE_MATERIAL) {\n    float r1 = 2.0 * 3.14 * random(v_texCoord * vec2(0.24, 78.233) * (time + 32.0 * iteration));\n    float r2 = random(v_texCoord * vec2(63.7264, 10.873) * (time + 12.0 * iteration));\n    float r2s = sqrt(r2);\n\n    vec3 w = collision_normal;\n\n    vec3 u = normalize(cross(mix(vec3(1,0,0), vec3(0,1,0), step(0.1, abs(w.x))), w));\n    vec3 v = cross(w, u);\n\n    // compute cosine weighted random ray direction on hemisphere\n    next_dir = normalize(u * cos(r1) * r2s + v * sin(r1) * r2s + w * sqrt(1.0 - r2));\n\n    return next_dir;\n  }\n\n  // Fully specular material\n  if (material.material_type == SPECULAR_MATERIAL) {\n    return normalize(ray.direction - 2.0 * dot(ray.direction, collision_normal) * collision_normal);\n  }\n\n  // Glossy material\n  if (material.material_type == GLOSSY_MATERIAL) {\n    vec3 reflected = normalize(ray.direction - 2.0 * dot(ray.direction, collision_normal) * collision_normal);\n\n    float r1 = 2.0 * 3.14 * random(v_texCoord * vec2(521.9898, 2321.233) * (time + 100.0 * iteration));\n    float r2 = random(v_texCoord * vec2(2631.7264, 5.873) * (time + 12.0 * iteration));\n    float r2s = pow(r2, material.material_parameter1);\n\n    vec3 w = reflected;\n    vec3 u = normalize(cross(mix(vec3(1,0,0), vec3(0,1,0), step(0.1, abs(w.x))), w));\n    vec3 v = cross(w, u);\n\n    // compute cosine weighted random ray direction on hemisphere\n    next_dir = normalize(u * cos(r1) * r2s + v * sin(r1) * r2s + w * sqrt(1.0 - r2));\n    return next_dir;\n  }\n\n  if (material.material_type == TRANSMISSION_MATERIAL) {\n    bool into = dot(collision_normal, real_normal) > 0.0; // is ray entering or leaving refractive material?\n    float nc = 1.0;  // Index of Refraction air\n    float nt = 1.5;  // Index of Refraction glass/water\n    float nnt = into ? nc / nt : nt / nc;  // IOR ratio of refractive materials\n    float ddn = dot(ray.direction, real_normal);\n    float cos2t = 1.0 - nnt*nnt * (1.0 - ddn*ddn);\n\n    if (cos2t < 0.0) // total internal reflection\n    {\n        next_dir = normalize(ray.direction - collision_normal * 2.0 * dot(collision_normal, ray.direction));\n    }\n    else // cos2t > 0\n    {\n      // compute direction of transmission ray\n      vec3 tdir = ray.direction * nnt;\n      tdir -= normalize(collision_normal * ((into ? 1.0 : -1.0) * (ddn * nnt + sqrt(cos2t))));\n\n      float R0 = (nt - nc)*(nt - nc) / (nt + nc)*(nt + nc);\n      float c = 1.0 - (into ? -ddn : dot(tdir, collision_normal));\n      float Re = R0 + (1.0 - R0) * c * c * c * c * c;\n      float Tr = 1.0 - Re; // Transmission\n      float P = 0.25 + 0.5 * Re;\n      float RP = Re / P;\n      float TP = Tr / (1.0 - P);\n\n      // randomly choose reflection or transmission ray\n      float rand = random(v_texCoord * vec2(86.425, 145.233) * (time + iteration));\n      if (rand < 0.2) // reflection ray\n      {\n        distribution = RP;\n        next_dir = normalize(ray.direction - collision_normal * 2.0 * dot(collision_normal, ray.direction));\n      }\n      else // transmission ray\n      {\n        distribution = TP;\n        next_dir = normalize(tdir);\n      }\n\n      return next_dir;\n    }\n  }\n\n  return vec3(0,0,0);\n}\n\n// Triangle\n\n#define SAMPLE_STEP_128 vec2(1,0) / 128.0\n#define SAMPLE_STEP_256 vec2(1,0) / 256.0\n#define SAMPLE_STEP_512 vec2(1,0) / 512.0\n#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0\n#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0\n\nTriangle GetTriangleFromIndex(float triangle_index) {\n  // Fetch triangle from texture\n  vec2 start_sample = SAMPLE_STEP_2048 * triangle_index * 11.0;\n\n  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 0.0);\n  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 1.0);\n  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 2.0);\n  vec2 sample4 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 3.0);\n  vec2 sample5 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 4.0);\n  vec2 sample6 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 5.0);\n  vec2 sample7 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 6.0);\n  vec2 sample8 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 7.0);\n  vec2 sample9 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 8.0);\n  vec2 sample10 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 9.0);\n\n  vec3 v0 = vec3(texture(u_triangle_texture, sample1));\n  vec3 edge1 = vec3(texture(u_triangle_texture, sample2));\n  vec3 edge2 = vec3(texture(u_triangle_texture, sample3));\n\n  vec3 n0 = vec3(texture(u_triangle_texture, sample4));\n  vec3 n1 = vec3(texture(u_triangle_texture, sample5));\n  vec3 n2 = vec3(texture(u_triangle_texture, sample6));\n\n  vec2 uv0 = vec2(texture(u_triangle_texture, sample7));\n  vec2 uv1 = vec2(texture(u_triangle_texture, sample8));\n  vec2 uv2 = vec2(texture(u_triangle_texture, sample9));\n\n  int material_index = int(texture(u_triangle_texture, sample10).x);\n  float triangle_area = texture(u_light_texture, sample10).z;\n\n  return Triangle(v0, edge1, edge2, n0, n1, n2, uv0, uv1, uv2, triangle_area, material_index);\n}\n\n#define SAMPLE_STEP_128 vec2(1,0) / 128.0\n#define SAMPLE_STEP_256 vec2(1,0) / 256.0\n#define SAMPLE_STEP_512 vec2(1,0) / 512.0\n#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0\n#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0\n\nfloat getTriangleIndex(float stackIdx) {\n  vec2 start_sample = SAMPLE_STEP_1024 * stackIdx;\n  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_1024, 1024.0, 0.0);\n\n  vec4 triangle_index_slot = texture(u_triangle_index_texture, sample1);\n  return triangle_index_slot.x;\n}\n\nfloat triangleIntersection(Ray ray, Triangle triangle, vec3 object_position, inout Collision collision_0, float closest_collision_distance) {\n  vec3 v0_0 = object_position + triangle.v0;\n\n  //Begin calculating determinant - also used to calculate u parameter\n  vec3 P = cross(ray.direction, triangle.edge2);\n  float det = dot(triangle.edge1, P);\n\n  //Distance from vertex1 to ray origin\n  vec3 T = ray.start_position - v0_0;\n  float u = dot(T, P);\n  vec3 Q = cross(T, triangle.edge1);\n  float v = dot(ray.direction, Q);\n  float t = dot(triangle.edge2, Q);\n\n  if(t < EPS || v < 0.0 || u+v > det || u < 0.0 || u > det || (det > -EPS && det < EPS)) return -1.0;\n\n  float inv_det = 1.0 / det;\n\n  collision_0.position = ray.start_position + inv_det * t * ray.direction;\n  collision_0.distance = length(ray.start_position - collision_0.position);\n\n  if (closest_collision_distance < collision_0.distance) return -1.0;\n\n  collision_0.material_index = triangle.material_index;\n\n  u = u * inv_det;\n  v = v * inv_det;\n  collision_0.uv = (1.0 - u - v) * triangle.uv0 + u * triangle.uv1 + v * triangle.uv2;\n  collision_0.normal = (1.0 - u - v) * triangle.n0 + u * triangle.n1 + v * triangle.n2;\n\n  return 1.0;\n}\n\n//float triangleIntersection(Ray ray, Triangle triangle, vec3 object_position, inout Collision collision, float closest_collision_distance) {\n//  vec3 e1 = triangle.edge1;\n//  vec3 e2 = triangle.edge2;\n//\n//  vec3 normal = normalize(cross(e1,e2));\n//  float b = dot(normal, ray.direction);\n//\n//  vec3 w0 = ray.start_position - triangle.v0;\n//  float a = -dot(normal, w0);\n//  float t = a / b;\n//\n//  vec3 p = ray.start_position + t * ray.direction;\n//  float uu, uv, vv, wu, wv, inverseD;\n//  uu = dot(e1,e1);\n//  uv = dot(e1,e2);\n//  vv = dot(e2,e2);\n//\n//  vec3 w = p - triangle.v0;\n//  wu = dot(w, e1);\n//  wv = dot(w, e2);\n//  inverseD = uv * uv - uu * vv;\n//  inverseD = 1.0 / inverseD;\n//\n//  float u = (uv * wv - vv * wu) * inverseD;\n//  if (u < 0.0 || u > 1.0) return -1.0;\n//\n//  float v = (uv * wu - uu * wv) * inverseD;\n//  if (v < 0.0 || (u + v) > 1.0) return -1.0;\n//\n//  collision.position = p; //ray.start_position + inverseD * t * ray.direction;\n//  collision.distance = length(ray.start_position - collision.position);\n//\n//  //if (closest_collision_distance < collision.distance) return -1.0;\n//\n//  collision.material_index = triangle.material_index;\n//  collision.uv = (1.0 - u - v) * triangle.uv0 + u * triangle.uv1 + v * triangle.uv2;\n//  collision.normal = (1.0 - u - v) * triangle.n0 + u * triangle.n1 + v * triangle.n2;\n//\n//  return 1.0;\n//}\n\n// BBOX\nbool pointInsideBox(vec3 bottom, vec3 top, vec3 point) {\n  return (bottom.x < point.x && bottom.y < point.y && bottom.z < point.z && top.x > point.x && top.y > point.y && top.z > point.z);\n}\n\nfloat boundingBoxCollision_0(vec3 bottom, vec3 top, Ray r) {\n  vec3 dirfrac = vec3(1,1,1) / r.direction;\n\n  vec3 t1 = (bottom - r.start_position) * dirfrac;\n  vec3 t2 = (top - r.start_position) * dirfrac;\n\n  float tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));\n  float tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));\n\n  return (tmax < 0.0 || tmin > tmax) ? 10000.0 : tmin;\n}\n\n// Scene\n\nvoid getObjectAtIndex(int index, inout Object object_1) {\n  vec2 start_sample = SAMPLE_STEP_512 * float(index) * 5.0;\n\n  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 0.0);\n  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 1.0);\n  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 2.0);\n  vec2 sample4 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 3.0);\n  vec2 sample5 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 4.0);\n\n  vec3 bottom_bbox = vec3(texture(u_objects_texture, sample1));\n  vec3 top_bbox = vec3(texture(u_objects_texture, sample2));\n  vec3 position = vec3(texture(u_objects_texture, sample3));\n  vec3 scale = vec3(texture(u_objects_texture, sample4));\n  vec3 extra_data = vec3(texture(u_objects_texture, sample5));\n\n  // Triangle model\n  float bvh_start_index = extra_data.x;\n  float triangle_start_index = extra_data.y;\n\n  object_1 = Object(bottom_bbox, top_bbox, position, scale, bvh_start_index, triangle_start_index);\n}\n\nfloat boundingBoxCollision_1(vec3 bottom, vec3 top, Ray r) {\n  vec3 dirfrac = vec3(1,1,1) / r.direction;\n\n  vec3 t1 = (bottom - r.start_position) * dirfrac;\n  vec3 t2 = (top - r.start_position) * dirfrac;\n\n  float tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));\n  float tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));\n\n  return (tmax < 0.0 || tmin > tmax) ? 10000.0 : tmin;\n}\n\nstruct BVHNode {\n  vec3 bottom_bbox;\n  vec3 top_bbox;\n  float is_leaf;\n  float distance;\n  float extra_data1;\n  float extra_data2;\n  float node_index;\n  float parent_index;\n  float sibling_index;\n};\n\nvoid getNodeData(float index, float start_index, Ray ray, inout BVHNode node_0) {\n  vec2 start_sample = SAMPLE_STEP_2048 * (index + start_index) * 4.0;\n\n  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 0.0);\n  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 1.0);\n  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 2.0);\n  vec2 sample4 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 3.0);\n\n  node_0.bottom_bbox = vec3(texture(u_objects_bvh_texture, sample1));\n  node_0.top_bbox = vec3(texture(u_objects_bvh_texture, sample2));\n\n  vec3 extra_data1 = vec3(texture(u_objects_bvh_texture, sample3));\n  node_0.is_leaf = extra_data1.x;\n  node_0.extra_data1 = extra_data1.y;\n  node_0.extra_data2 = extra_data1.z;\n\n  vec3 extra_data2 = vec3(texture(u_objects_bvh_texture, sample4));\n  node_0.parent_index = extra_data2.x;\n  node_0.sibling_index = extra_data2.y;\n\n//  node.distance = boundingBoxCollision(node.bottom_bbox, node.top_bbox, ray, node.is_leaf);\n\n  node_0.node_index = index;\n}\n\nvoid processLeaf(BVHNode node, inout Collision closest_collision_2352739786, Ray ray, float triangle_start_index_2352739786, Object object_0) {\n  float triangle_count_2352739786 = node.extra_data1;\n  float start_triangle_index = node.extra_data2 + triangle_start_index_2352739786;\n\n  float current_index = start_triangle_index;\n  float end_index = start_triangle_index + triangle_count_2352739786;\n\n  Collision collision;\n  for (float idx = 0.0; idx < triangle_count_2352739786; idx++) {\n    Triangle triangle = GetTriangleFromIndex(getTriangleIndex(start_triangle_index + idx));\n\n    if (triangleIntersection(ray, triangle, object_0.position, collision, closest_collision_2352739786.distance) == 1.0) {\n      closest_collision_2352739786 = collision;\n    }\n  }\n}\n\nvoid traverseObjectTree(Ray ray, inout Collision closest_collision_2352739786, Object object) {\n  float start_index_2352739786 = object.object_bvh_start_index;\n  float triangle_start_index = object.triangle_start_index;\n\n  Collision collision;\n  BVHNode node;\n  BVHNode left_node;\n  BVHNode right_node;\n\n  //float stack[32];\n  float[] stack = float[] (.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0);\n  int stackIdx = 1;\n\n  for (int i = 0; i < 100; i++) {\n    if (stackIdx < 1) return;\n\n    float box_index = stack[--stackIdx];\n\n    // Fetch node data\n    getNodeData(box_index, start_index_2352739786, ray, node);\n\n    if (node.is_leaf == 0.0) {\n      // Check collision with bounding box\n      float collision_distance = 0.0;\n\n      getNodeData(node.extra_data1, start_index_2352739786, ray, left_node);\n      getNodeData(node.extra_data2, start_index_2352739786, ray, right_node);\n\n      left_node.distance = boundingBoxCollision_1(left_node.bottom_bbox + object.position, left_node.top_bbox + object.position, ray);\n      right_node.distance = boundingBoxCollision_1(right_node.bottom_bbox + object.position, right_node.top_bbox + object.position, ray);\n\n      float near_distance = min(left_node.distance, right_node.distance);\n      float far_distance = max(left_node.distance, right_node.distance);\n\n      float mixer = clamp(step(right_node.distance, left_node.distance), 0.0, 1.0);\n      float near_child = mix(node.extra_data1, node.extra_data2, mixer);\n      float far_child = mix(node.extra_data2, node.extra_data1, mixer);\n\n      if (far_distance < closest_collision_2352739786.distance) {\n        stack[stackIdx++] = far_child; // Set left child index: extra_data1 = left index\n        stack[stackIdx++] = near_child; // Set left child index: extra_data1 = left index\n      }\n      else if (near_distance < closest_collision_2352739786.distance) {\n        stack[stackIdx++] = near_child; // Set left child index: extra_data1 = left index\n      }\n\n      // Return if stack index exceeds stack size\n      if (stackIdx > 31) return;\n    }\n    else {\n      processLeaf(node, closest_collision_2352739786, ray, triangle_start_index, object);\n    }\n  }\n}\n\nvec3 lightSphereContribution(Ray ray) {\n  vec3 sun_position = normalize(vec3(1.0, 1.0, 1.0));\n  vec3 position = vec3(0,0,0);\n  float radius = 100.0;\n\n  vec3 op = position - ray.start_position;\n  float t, epsilon = 0.0001;\n  float b = dot(op, ray.direction);\n  float disc = b * b - dot(op, op) + radius * radius;\n  if (disc < 0.0) return vec3(0,0,0);\n  else disc = sqrt(disc);\n\n  t = (t = b - disc) > epsilon ? t : ((t = b + disc) > epsilon ? t : 0.0);\n\n  if (t < 0.01)\n    return vec3(0,0,0);\n\n  vec3 collision_position = (ray.start_position + ray.direction * t) / 100.0;\n  vec3 normal = normalize(collision_position);\n  float u = 0.5 - atan(normal.z, normal.x) / 6.28;\n  float v = 0.5 - 2.0 * asin(normal.y) / 6.28;\n\n  vec3 clr = texture(u_dome_texture, vec2(u,v)).rgb;\n  return clr;\n}\n\n// Fractal uniform\n\nfloat mandelbulbDe(vec3 pos) {\n  int Iterations = 10;\n\n  vec3 z = pos;\n  float dr = 1.0;\n  float r = 0.0;\n\n  for (int i = 0; i < Iterations; i++) {\n    r = length(z);\n    if (r > 3.0)\n      break;\n\n    // Convert to polar coordinates\n    float theta = acos(z.z/r);\n    float phi = atan(z.y, z.x);\n    dr = pow(r, u_power - 1.0) * u_power * dr + 1.0;\n\n    // Scale and rotate the point\n    float zr = pow(r, u_power);\n    theta = theta * u_power;\n    phi = phi * u_power;\n\n    z = zr * vec3(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta));\n    z += pos;\n  }\n\n  float mandelBulbDistance = 0.5 * log(r) * r / dr;\n  return mandelBulbDistance;\n}\n\nfloat mengerSpongeDe(vec3 w) {\n  int Iterations = 5;\n  vec3 offset = vec3(u_spongeOffset);\n  float scale = u_spongeScale;\n\n  w = (w * 0.5 + vec3(0.5)) * scale;  // scale [-1, 1] range to [0, 1]\n\n  vec3 v = abs(w - u_halfSpongeScale) - u_halfSpongeScale;\n  float d1 = max(v.x, max(v.y, v.z));     // distance to the box\n  float d = d1;\n  float p = 1.0;\n  vec3 cd = v;\n\n  for (int i = 0; i < Iterations; i++) {\n    vec3 a = mod(3.0 * w * p, 3.0);\n    p *= 3.0;\n\n    v = vec3(0.5) - abs(a - vec3(1.5)) + offset;\n\n    // distance inside the 3 axis aligned square tubes\n    d1 = min(max(v.x, v.z), min(max(v.x, v.y), max(v.y, v.z))) / p;\n\n    // intersection\n    d = max(d, d1);\n  }\n\n  // The distance estimate, min distance, and fractional iteration count\n  return d * 2.0;\n}\n\nfloat distanceEstimator(vec3 pos) {\n  if (u_fractalType == 0.0) {\n    return mandelbulbDe(pos);\n  }\n\n  if (u_fractalType == 1.0) {\n    return mengerSpongeDe(pos);\n  }\n\n  return 0.0;\n}\n\n//float distanceEstimator(vec3 pos) {\n//  int Iterations = 10;\n//\n//  vec3 z = pos;\n//  float dr = 1.0;\n//  float r = 0.0;\n//\n//  for (int i = 0; i < Iterations; i++) {\n//    r = length(z);\n//    if (r > 3.0)\n//      break;\n//\n//    // Convert to polar coordinates\n//    float theta = acos(z.z/r);\n//    float phi = atan(z.y, z.x);\n//    dr = pow(r, Power - 1.0) * Power * dr + 1.0;\n//\n//    // Scale and rotate the point\n//    float zr = pow(r, Power);\n//    theta = theta * Power;\n//    phi = phi * Power;\n//\n//    z = zr * vec3(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta));\n//    z += pos;\n//  }\n//\n//  float mandelBulbDistance = 0.5 * log(r) * r / dr;\n//  return mandelBulbDistance;\n//}\n\n//float distanceEstimator(vec3 w) {\n//  int Iterations = 5;\n//  vec3 offset = vec3(spongeOffset);\n//  float scale = spongeScale;\n//\n//  w = (w * 0.5 + vec3(0.5)) * scale;  // scale [-1, 1] range to [0, 1]\n//\n//  vec3 v = abs(w - halfSpongeScale) - halfSpongeScale;\n//  float d1 = max(v.x, max(v.y, v.z));     // distance to the box\n//  float d = d1;\n//  float p = 1.0;\n//  vec3 cd = v;\n//\n//  for (int i = 0; i < Iterations; i++) {\n//    vec3 a = mod(3.0 * w * p, 3.0);\n//    p *= 3.0;\n//\n//    v = vec3(0.5) - abs(a - vec3(1.5)) + offset;\n//\n//    // distance inside the 3 axis aligned square tubes\n//    d1 = min(max(v.x, v.z), min(max(v.x, v.y), max(v.y, v.z))) / p;\n//\n//    // intersection\n//    d = max(d, d1);\n//  }\n//\n//  // The distance estimate, min distance, and fractional iteration count\n//  return d * 2.0;\n//}\n\n//float distanceEstimator(vec3 z) {\n//  int Iterations = 20;\n//  float Scale = 10.0;\n//\n//  vec3 a1 = vec3(1,1,1);\n//\tvec3 a2 = vec3(-1,-1,1);\n//\tvec3 a3 = vec3(1,-1,-1);\n//\tvec3 a4 = vec3(-1,1,-1);\n//\tvec3 c;\n//\tfloat dist, d;\n//\n//  int n = 0;\n//\tfor (n = 0; n < Iterations; n++) {\n//    c = a1;\n//    dist = length(z - a1);\n//\n//    d = length(z-a2);\n//    if (d < dist) {\n//      c = a2;\n//      dist=d;\n//    }\n//\n//    d = length(z-a3);\n//    if (d < dist) {\n//      c = a3;\n//      dist=d;\n//    }\n//\n//    d = length(z-a4);\n//    if (d < dist) {\n//      c = a4;\n//      dist=d;\n//    }\n//\n//\t\tz = Scale * z - c * (Scale - 1.0);\n//\t}\n//\n//\treturn length(z) * pow(Scale, float(-n));\n//}\n\n//const float minRadius2 = 0.1;\n//const float fixedRadius2 = 0.2;\n//\n//void sphereFold(inout vec3 z, inout float dz) {\n//\tfloat r2 = dot(z,z);\n//\tif (r2 < minRadius2) {\n//\t\t// linear inner scaling\n//\t\tfloat temp = (fixedRadius2 / minRadius2);\n//\t\tz *= temp;\n//\t\tdz*= temp;\n//\t} else if (r2 < fixedRadius2) {\n//\t\t// this is the actual sphere inversion\n//\t\tfloat temp = fixedRadius2 / r2;\n//\t\tz *= temp;\n//\t\tdz*= temp;\n//\t}\n//}\n//\n//void boxFold(inout vec3 z, inout float dz) {\n//  z = clamp(z, -1.0, 1.0) * 2.0 - z;\n//}\n//\n//float distanceEstimator(vec3 z) {\n//  int Iterations = 100;\n//  float Scale = 1.0;\n//\n//  vec3 offset = z;\n//  float dr = 1.0;\n//  for (int n = 0; n < Iterations; n++) {\n//    boxFold(z,dr);       // Reflect\n//    sphereFold(z,dr);    // Sphere Inversion\n//\n//    z = Scale*z + offset;  // Scale & Translate\n//    dr = dr * abs(Scale) + 1.0;\n//  }\n//  float r = length(z);\n//  return r/abs(dr);\n//}\n\nvec3 calculateNormal(vec3 pos) {\n  float e = 0.000001;\n  float n = distanceEstimator(pos);\n  float dx = distanceEstimator(pos + vec3(e, 0, 0)) - n;\n  float dy = distanceEstimator(pos + vec3(0, e, 0)) - n;\n  float dz = distanceEstimator(pos + vec3(0, 0, e)) - n;\n\n  vec3 grad = vec3(dx,dy,dz);\n  return normalize(grad);\n}\n\n//vec3 calculateNormal(vec3 pos) {\n//  float e = minDistance * 0.5;\n//  //float n = distanceEstimator(pos);\n//\n//  float dx1 = distanceEstimator(pos + vec3(e, 0, 0));\n//  float dx2  = distanceEstimator(pos - vec3(e, 0, 0));\n//\n//  float dy1 = distanceEstimator(pos + vec3(0, e, 0));\n//  float dy2 = distanceEstimator(pos - vec3(0, e, 0));\n//\n//  float dz1 = distanceEstimator(pos + vec3(0, 0, e));\n//  float dz2 = distanceEstimator(pos - vec3(0, 0, e));\n//\n//  return normalize(vec3(dx1 - dx2, dy1 - dy2, dz1 - dz2));\n//}\n\nbool rayMarch(Ray ray, inout Collision collision_1) {\n  float totalDistance = 0.0;\n  float steps;\n  vec3 p;\n  for (steps = 0.0; steps < u_maxIterations; steps++) {\n    p = ray.start_position + totalDistance * ray.direction;\n    float distance = distanceEstimator(p);\n    totalDistance += distance;\n\n    if (distance < u_minDistance) {\n      collision_1.position = p;\n      collision_1.normal = calculateNormal(p);\n      collision_1.distance = totalDistance;\n      return true;\n    }\n  }\n\n  return false;\n}\n\nvec3 applyFog(vec3 color, float distance) {\n  float fogAmount = 1.0 - exp( -distance * u_fogDistance );\n  return mix(color, u_fogColor, fogAmount);\n}\n\nvec3 pathTrace(Ray ray) {\n  vec3 mask = vec3(1,1,1);\n  float fogDistance = 0.0;\n  vec3 accumulated_color = vec3(0,0,0);\n  Collision collision;\n  Material collision_material = Material(u_materialColor, int(u_materialType), 0.0, u_materialExtra1, u_materialExtra2);\n\n  for (float iteration = 0.0; iteration < float(trace_depth); iteration++) {\n    float distribution = 1.0;\n\n    if (!rayMarch(ray, collision)) {\n      vec3 lightSphereColor = mix(u_globalLightColor, lightSphereContribution(ray), u_imageBasedLightning);\n      if (iteration == 0.0) {\n        return mix(u_fogColor, lightSphereColor, u_fillBackgroundWithLight);\n      }\n      else {\n        float lightPower = (u_globalLightPower - 0.5) * u_globalLightContrast + 0.5;\n        accumulated_color += mask * lightSphereColor * lightPower;\n      }\n\n      return applyFog(accumulated_color, fogDistance);\n    }\n\n    vec3 next_dir = PDF(ray, collision_material, collision.normal, iteration, distribution);\n    vec3 color = BRDF(ray, collision_material, collision.uv, collision.normal, next_dir) * distribution;\n    mask *= color;\n\n    float collisionDistance = length(ray.start_position - collision.position);\n\n    if (iteration == 0.0 && u_fogEnabled == 1.0) {\n      fogDistance = collisionDistance; //clamp(collisionDistance / fogDistance, 0.0, 1.0);\n    }\n\n    ray = Ray(collision.position + next_dir * 0.001, next_dir);\n  }\n\n  return applyFog(accumulated_color, fogDistance);\n\n//  if (rayMarch(ray, collision)) {\n//    return vec3(0.8);\n//  }\n//  else {\n//    return vec3(0.2);\n//  }\n//  return vec3(1.0 - steps / maxSteps);\n}\n\nvoid main( void ) {\n  vec3 traceColor = vec3(0,0,0);\n  Ray ray = createRay(gl_FragCoord.xy, 0);\n  traceColor += pathTrace(ray);\n\n  vec3 texture = texture(u_accumulated_texture, v_texCoord).rgb;\n\n  vec3 mixedTraceColor = mix(traceColor, texture, samples / (samples + 1.0));\n  outColor = vec4(mixedTraceColor, 1.0);\n}\n"

/***/ }),

/***/ 406:
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision lowp float;\n#define GLSLIFY 1\n\nin vec2 v_texCoord;\nout vec4 outColor;\n\n// Fractal uniforms\nuniform float u_fractalType;\nuniform float u_power;\nuniform float u_minDistance;\nuniform float u_maxIterations;\nuniform float u_bailout;\n\n// Menger sponge\nuniform float u_halfSpongeScale;\nuniform float u_spongeScale;\nuniform float u_spongeOffset;\n\n// Material uniforms\nuniform float u_materialType;\nuniform vec3 u_materialColor;\nuniform float u_materialExtra1;\nuniform float u_materialExtra2;\n\n// Global light uniforms\nuniform float u_imageBasedLightning;\nuniform vec3 u_globalLightColor;\nuniform float u_fillBackgroundWithLight;\nuniform float u_globalLightPower;\nuniform float u_globalLightContrast;\n\n// Render effect settings\nuniform float u_fogEnabled;\nuniform float u_fogDistance;\nuniform vec3 u_fogColor;\n\n// Renderer uniforms\nuniform float time;\nuniform float samples;\nuniform int trace_depth;\nuniform float global_lightning_enabled;\nuniform int triangle_count;\nuniform int object_count;\nuniform vec2 resolution;\n\n// Camera uniforms\nuniform float u_cameraYaw;\nuniform float u_cameraPitch;\nuniform vec3 camera_position;\nuniform vec3 camera_direction;\nuniform vec3 camera_right;\nuniform vec3 camera_up;\n\nuniform sampler2D u_dome_texture;\n\nuniform sampler2D u_accumulated_texture;\nuniform sampler2D u_buffer_texture;\nuniform sampler2D u_triangle_texture;\nuniform sampler2D u_triangle_index_texture;\nuniform sampler2D u_bvh_texture;\nuniform sampler2D u_light_texture;\nuniform sampler2D u_material_texture;\nuniform sampler2D u_objects_bvh_texture;\nuniform sampler2D u_objects_texture;\nuniform sampler2D u_light_sphere_texture;\n\n#define EPS 0.00000001\n#define PI 3.14\n\n#define SAMPLE_STEP_128 vec2(1,0) / 128.0\n#define SAMPLE_STEP_256 vec2(1,0) / 256.0\n#define SAMPLE_STEP_512 vec2(1,0) / 512.0\n#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0\n#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0\n\n#define DIFFUSE_MATERIAL 0\n#define SPECULAR_MATERIAL 1\n#define EMISSION_MATERIAL 2\n#define TRANSMISSION_MATERIAL 3\n#define GLOSSY_MATERIAL 5\n\nstruct Collision {\n  vec3 position;\n  vec3 normal;\n  vec2 uv;\n  vec3 n0;\n  vec3 n1;\n  vec3 n2;\n  int material_index;\n  float distance;\n};\n\nstruct Triangle {\n  vec3 v0;\n  vec3 edge1;\n  vec3 edge2;\n  vec3 n0;\n  vec3 n1;\n  vec3 n2;\n  vec2 uv0;\n  vec2 uv1;\n  vec2 uv2;\n  float triangle_area;\n  int material_index;\n};\n\nstruct Object {\n  vec3 bounding_bottom;\n  vec3 bounding_top;\n  vec3 position;\n  vec3 scale;\n  float object_bvh_start_index;\n  float triangle_start_index;\n};\n\n// Ray\nstruct Ray {\n  vec3 start_position;\n  vec3 direction;\n};\n\nhighp float random(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\nmat3 rotationMatrixVector(vec3 v, float angle) {\n  float c = cos(angle);\n  float s = sin(angle);\n\n  return mat3(c + (1.0 - c) * v.x * v.x, (1.0 - c) * v.x * v.y - s * v.z, (1.0 - c) * v.x * v.z + s * v.y,\n            (1.0 - c) * v.x * v.y + s * v.z, c + (1.0 - c) * v.y * v.y, (1.0 - c) * v.y * v.z - s * v.x,\n            (1.0 - c) * v.x * v.z - s * v.y, (1.0 - c) * v.y * v.z + s * v.x, c + (1.0 - c) * v.z * v.z);\n}\n\nRay createRay(vec2 pixel_position, int sample_step) {\n\n  mat3 cameraRotation = rotationMatrixVector(vec3(0, 1, 0), u_cameraYaw) * rotationMatrixVector(vec3(0, 0, 1), u_cameraPitch);\n\n  float width = resolution.x;\n  float height = resolution.y;\n\n  float i = ((pixel_position.x / width) - 0.5) * width / height;\n  float j = ((pixel_position.y / height) - 0.5);\n  vec3 image_point = i * 1.5 * camera_right + j * 1.5 * camera_up + camera_position + cross(camera_up, camera_right);\n\n  vec3 dx = (camera_up / width);\n  vec3 dy = (camera_right / height);\n  vec3 rand_x = dx * random(vec2(pixel_position.x, pixel_position.y) * vec2(1.9898, 128.13) * (time + float(sample_step)));\n  vec3 rand_y = dy * random(vec2(pixel_position.x, pixel_position.y) * vec2(134.9898, 36.342) * (time + float(sample_step)));\n  image_point += rand_x + rand_y;\n\n  vec3 direction = normalize(cameraRotation * (image_point - camera_position));\n\n  return Ray(camera_position, direction);\n}\n\n// Material\nstruct Material {\n  vec3 color;\n  int material_type;\n  float emission_rate;\n  float material_parameter1;\n  float material_parameter2;\n  float material_parameter3;\n};\n\nvec2 getSample(vec2 start_sample, vec2 sample_step, float resolution, float steps) {\n  float s = start_sample.x + steps * sample_step.x;\n  return vec2(fract(s), floor(s) / resolution);\n}\n\n#define SAMPLE_STEP_128 vec2(1,0) / 128.0\n#define SAMPLE_STEP_256 vec2(1,0) / 256.0\n#define SAMPLE_STEP_512 vec2(1,0) / 512.0\n#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0\n#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0\n\nMaterial getMaterial(int material_index) {\n  // Fetch material from texture\n  vec2 start_sample = SAMPLE_STEP_512 * float(material_index) * 3.0;\n  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 0.0);\n  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 1.0);\n  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 2.0);\n\n  vec3 color = vec3(texture(u_material_texture, sample1));\n  vec3 extra_data1 = vec3(texture(u_material_texture, sample2));\n  vec3 extra_data2 = vec3(texture(u_material_texture, sample3));\n\n  int material_type = int(extra_data1.x);\n  float emission_rate = extra_data1.y;\n\n  float material_parameter1 = extra_data2.x;\n  float material_parameter2 = extra_data2.y;\n  float material_parameter3 = extra_data2.z;\n\n  return Material(color, material_type, emission_rate, material_parameter1, material_parameter2, material_parameter3);\n}\n\n#define DIFFUSE_MATERIAL 0\n#define SPECULAR_MATERIAL 1\n#define EMISSION_MATERIAL 2\n#define TRANSMISSION_MATERIAL 3\n#define GLOSSY_MATERIAL 5\n\nvec3 BRDF(Ray ray, Material material, vec2 uv, vec3 collision_normal, vec3 next_dir) {\n\n//  // Emission material\n//  if (material.material_type == EMISSION_MATERIAL) {\n//    return material.color;\n//  }\n//\n//  // Specular material\n//  if (material.material_type == SPECULAR_MATERIAL) {\n//    return material.color;\n//  }\n//\n//  // Transmission material\n//  if (material.material_type == TRANSMISSION_MATERIAL) {\n//    return material.color;\n//  }\n//\n//  // Glossy material\n//  if (material.material_type == GLOSSY_MATERIAL) {\n//    return material.color;\n//  }\n\n  // Lambertian diffuse material\n  if (material.material_type == DIFFUSE_MATERIAL) {\n    float albedo = material.material_parameter1; // material parameter 1 is albedo\n    float roughness = material.material_parameter2; // material parameter 2 is roughness\n    vec3 view_direction = -1.0 * ray.direction;\n\n    // calculate intermediary values\n    float NdotL = dot(collision_normal, next_dir);\n    float NdotV = dot(collision_normal, view_direction);\n\n    float angleVN = acos(NdotV);\n    float angleLN = acos(NdotL);\n\n    float alpha = max(angleVN, angleLN);\n    float beta = min(angleVN, angleLN);\n    float gamma = dot(view_direction - collision_normal * dot(view_direction, collision_normal), next_dir - collision_normal * dot(next_dir, collision_normal));\n\n    float roughnessSquared = roughness * roughness;\n\n    // calculate A and B\n    float A = 1.0 - 0.5 * (roughnessSquared / (roughnessSquared + 0.57));\n    float B = 0.45 * (roughnessSquared / (roughnessSquared + 0.09));\n    float C = sin(alpha) * tan(beta);\n\n    // put it all together\n    float L1 = max(0.0, NdotL) * (A + B * max(0.0, gamma) * C);\n\n    // get the final color\n    return material.color * L1;\n  }\n\n  return material.color;\n}\n\n#define DIFFUSE_MATERIAL 0\n#define SPECULAR_MATERIAL 1\n#define EMISSION_MATERIAL 2\n#define TRANSMISSION_MATERIAL 3\n#define GLOSSY_MATERIAL 5\n\nvec3 PDF(Ray ray, Material material, vec3 collision_normal, float iteration, inout float distribution) {\n  vec3 real_normal = dot(collision_normal, ray.direction) > 0.0 ? -1.0 * collision_normal : collision_normal;\n  vec3 next_dir;\n\n  if (material.material_type == DIFFUSE_MATERIAL) {\n    float r1 = 2.0 * 3.14 * random(v_texCoord * vec2(0.24, 78.233) * (time + 32.0 * iteration));\n    float r2 = random(v_texCoord * vec2(63.7264, 10.873) * (time + 12.0 * iteration));\n    float r2s = sqrt(r2);\n\n    vec3 w = collision_normal;\n\n    vec3 u = normalize(cross(mix(vec3(1,0,0), vec3(0,1,0), step(0.1, abs(w.x))), w));\n    vec3 v = cross(w, u);\n\n    // compute cosine weighted random ray direction on hemisphere\n    next_dir = normalize(u * cos(r1) * r2s + v * sin(r1) * r2s + w * sqrt(1.0 - r2));\n\n    return next_dir;\n  }\n\n  // Fully specular material\n  if (material.material_type == SPECULAR_MATERIAL) {\n    return normalize(ray.direction - 2.0 * dot(ray.direction, collision_normal) * collision_normal);\n  }\n\n  // Glossy material\n  if (material.material_type == GLOSSY_MATERIAL) {\n    vec3 reflected = normalize(ray.direction - 2.0 * dot(ray.direction, collision_normal) * collision_normal);\n\n    float r1 = 2.0 * 3.14 * random(v_texCoord * vec2(521.9898, 2321.233) * (time + 100.0 * iteration));\n    float r2 = random(v_texCoord * vec2(2631.7264, 5.873) * (time + 12.0 * iteration));\n    float r2s = pow(r2, material.material_parameter1);\n\n    vec3 w = reflected;\n    vec3 u = normalize(cross(mix(vec3(1,0,0), vec3(0,1,0), step(0.1, abs(w.x))), w));\n    vec3 v = cross(w, u);\n\n    // compute cosine weighted random ray direction on hemisphere\n    next_dir = normalize(u * cos(r1) * r2s + v * sin(r1) * r2s + w * sqrt(1.0 - r2));\n    return next_dir;\n  }\n\n  if (material.material_type == TRANSMISSION_MATERIAL) {\n    vec3 nextRay;\n\n    // randomly choose reflection or transmission ray\n    float rand = random(v_texCoord * vec2(86.425, 145.233) * (time + iteration));\n    if (rand < material.material_parameter2) {\n      nextRay = normalize(ray.direction - collision_normal * 2.0 * dot(collision_normal, ray.direction));\n    }\n    else {\n      bool into = dot(collision_normal, real_normal) > 0.0; // is ray entering or leaving refractive material?\n\n      float nc = 1.0;  // Index of Refraction air\n      float nt = material.material_parameter1;  // Index of Refraction glass/water\n      float nnt = into ? nc / nt : nt / nc;  // IOR ratio of refractive materials\n\n      nextRay = refract(ray.direction, real_normal, nnt);\n    }\n\n    float r1 = 2.0 * 3.14 * random(v_texCoord * vec2(521.9898, 2321.233) * (time + 100.0 * iteration));\n    float r2 = random(v_texCoord * vec2(2631.7264, 5.873) * (time + 12.0 * iteration));\n    float r2s = pow(r2, 10.0 - material.material_parameter3);\n\n    vec3 w = nextRay;\n    vec3 u = normalize(cross(mix(vec3(1,0,0), vec3(0,1,0), step(0.1, abs(w.x))), w));\n    vec3 v = cross(w, u);\n\n    next_dir = normalize(u * cos(r1) * r2s + v * sin(r1) * r2s + w * sqrt(1.0 - r2));\n    return next_dir;\n  }\n\n  return vec3(0,0,0);\n}\n\n// Triangle\n\n#define SAMPLE_STEP_128 vec2(1,0) / 128.0\n#define SAMPLE_STEP_256 vec2(1,0) / 256.0\n#define SAMPLE_STEP_512 vec2(1,0) / 512.0\n#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0\n#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0\n\nTriangle GetTriangleFromIndex(float triangle_index) {\n  // Fetch triangle from texture\n  vec2 start_sample = SAMPLE_STEP_2048 * triangle_index * 11.0;\n\n  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 0.0);\n  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 1.0);\n  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 2.0);\n  vec2 sample4 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 3.0);\n  vec2 sample5 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 4.0);\n  vec2 sample6 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 5.0);\n  vec2 sample7 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 6.0);\n  vec2 sample8 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 7.0);\n  vec2 sample9 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 8.0);\n  vec2 sample10 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 9.0);\n\n  vec3 v0 = vec3(texture(u_triangle_texture, sample1));\n  vec3 edge1 = vec3(texture(u_triangle_texture, sample2));\n  vec3 edge2 = vec3(texture(u_triangle_texture, sample3));\n\n  vec3 n0 = vec3(texture(u_triangle_texture, sample4));\n  vec3 n1 = vec3(texture(u_triangle_texture, sample5));\n  vec3 n2 = vec3(texture(u_triangle_texture, sample6));\n\n  vec2 uv0 = vec2(texture(u_triangle_texture, sample7));\n  vec2 uv1 = vec2(texture(u_triangle_texture, sample8));\n  vec2 uv2 = vec2(texture(u_triangle_texture, sample9));\n\n  int material_index = int(texture(u_triangle_texture, sample10).x);\n  float triangle_area = texture(u_light_texture, sample10).z;\n\n  return Triangle(v0, edge1, edge2, n0, n1, n2, uv0, uv1, uv2, triangle_area, material_index);\n}\n\n#define SAMPLE_STEP_128 vec2(1,0) / 128.0\n#define SAMPLE_STEP_256 vec2(1,0) / 256.0\n#define SAMPLE_STEP_512 vec2(1,0) / 512.0\n#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0\n#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0\n\nfloat getTriangleIndex(float stackIdx) {\n  vec2 start_sample = SAMPLE_STEP_1024 * stackIdx;\n  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_1024, 1024.0, 0.0);\n\n  vec4 triangle_index_slot = texture(u_triangle_index_texture, sample1);\n  return triangle_index_slot.x;\n}\n\nfloat triangleIntersection(Ray ray, Triangle triangle, vec3 object_position, inout Collision collision_1, float closest_collision_distance) {\n  vec3 v0_0 = object_position + triangle.v0;\n\n  //Begin calculating determinant - also used to calculate u parameter\n  vec3 P = cross(ray.direction, triangle.edge2);\n  float det = dot(triangle.edge1, P);\n\n  //Distance from vertex1 to ray origin\n  vec3 T = ray.start_position - v0_0;\n  float u = dot(T, P);\n  vec3 Q = cross(T, triangle.edge1);\n  float v = dot(ray.direction, Q);\n  float t = dot(triangle.edge2, Q);\n\n  if(t < EPS || v < 0.0 || u+v > det || u < 0.0 || u > det || (det > -EPS && det < EPS)) return -1.0;\n\n  float inv_det = 1.0 / det;\n\n  collision_1.position = ray.start_position + inv_det * t * ray.direction;\n  collision_1.distance = length(ray.start_position - collision_1.position);\n\n  if (closest_collision_distance < collision_1.distance) return -1.0;\n\n  collision_1.material_index = triangle.material_index;\n\n  u = u * inv_det;\n  v = v * inv_det;\n  collision_1.uv = (1.0 - u - v) * triangle.uv0 + u * triangle.uv1 + v * triangle.uv2;\n  collision_1.normal = (1.0 - u - v) * triangle.n0 + u * triangle.n1 + v * triangle.n2;\n\n  return 1.0;\n}\n\n//float triangleIntersection(Ray ray, Triangle triangle, vec3 object_position, inout Collision collision, float closest_collision_distance) {\n//  vec3 e1 = triangle.edge1;\n//  vec3 e2 = triangle.edge2;\n//\n//  vec3 normal = normalize(cross(e1,e2));\n//  float b = dot(normal, ray.direction);\n//\n//  vec3 w0 = ray.start_position - triangle.v0;\n//  float a = -dot(normal, w0);\n//  float t = a / b;\n//\n//  vec3 p = ray.start_position + t * ray.direction;\n//  float uu, uv, vv, wu, wv, inverseD;\n//  uu = dot(e1,e1);\n//  uv = dot(e1,e2);\n//  vv = dot(e2,e2);\n//\n//  vec3 w = p - triangle.v0;\n//  wu = dot(w, e1);\n//  wv = dot(w, e2);\n//  inverseD = uv * uv - uu * vv;\n//  inverseD = 1.0 / inverseD;\n//\n//  float u = (uv * wv - vv * wu) * inverseD;\n//  if (u < 0.0 || u > 1.0) return -1.0;\n//\n//  float v = (uv * wu - uu * wv) * inverseD;\n//  if (v < 0.0 || (u + v) > 1.0) return -1.0;\n//\n//  collision.position = p; //ray.start_position + inverseD * t * ray.direction;\n//  collision.distance = length(ray.start_position - collision.position);\n//\n//  //if (closest_collision_distance < collision.distance) return -1.0;\n//\n//  collision.material_index = triangle.material_index;\n//  collision.uv = (1.0 - u - v) * triangle.uv0 + u * triangle.uv1 + v * triangle.uv2;\n//  collision.normal = (1.0 - u - v) * triangle.n0 + u * triangle.n1 + v * triangle.n2;\n//\n//  return 1.0;\n//}\n\n// BBOX\nbool pointInsideBox(vec3 bottom, vec3 top, vec3 point) {\n  return (bottom.x < point.x && bottom.y < point.y && bottom.z < point.z && top.x > point.x && top.y > point.y && top.z > point.z);\n}\n\nfloat boundingBoxCollision_0(vec3 bottom, vec3 top, Ray r) {\n  vec3 dirfrac = vec3(1,1,1) / r.direction;\n\n  vec3 t1 = (bottom - r.start_position) * dirfrac;\n  vec3 t2 = (top - r.start_position) * dirfrac;\n\n  float tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));\n  float tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));\n\n  return (tmax < 0.0 || tmin > tmax) ? 10000.0 : tmin;\n}\n\n// Scene\n\nvoid getObjectAtIndex(int index, inout Object object_1) {\n  vec2 start_sample = SAMPLE_STEP_512 * float(index) * 5.0;\n\n  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 0.0);\n  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 1.0);\n  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 2.0);\n  vec2 sample4 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 3.0);\n  vec2 sample5 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 4.0);\n\n  vec3 bottom_bbox = vec3(texture(u_objects_texture, sample1));\n  vec3 top_bbox = vec3(texture(u_objects_texture, sample2));\n  vec3 position = vec3(texture(u_objects_texture, sample3));\n  vec3 scale = vec3(texture(u_objects_texture, sample4));\n  vec3 extra_data = vec3(texture(u_objects_texture, sample5));\n\n  // Triangle model\n  float bvh_start_index = extra_data.x;\n  float triangle_start_index = extra_data.y;\n\n  object_1 = Object(bottom_bbox, top_bbox, position, scale, bvh_start_index, triangle_start_index);\n}\n\nfloat boundingBoxCollision_1(vec3 bottom, vec3 top, Ray r) {\n  vec3 dirfrac = vec3(1,1,1) / r.direction;\n\n  vec3 t1 = (bottom - r.start_position) * dirfrac;\n  vec3 t2 = (top - r.start_position) * dirfrac;\n\n  float tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));\n  float tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));\n\n  return (tmax < 0.0 || tmin > tmax) ? 10000.0 : tmin;\n}\n\nstruct BVHNode {\n  vec3 bottom_bbox;\n  vec3 top_bbox;\n  float is_leaf;\n  float distance;\n  float extra_data1;\n  float extra_data2;\n  float node_index;\n  float parent_index;\n  float sibling_index;\n};\n\nvoid getNodeData(float index, float start_index, Ray ray, inout BVHNode node_0) {\n  vec2 start_sample = SAMPLE_STEP_2048 * (index + start_index) * 4.0;\n\n  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 0.0);\n  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 1.0);\n  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 2.0);\n  vec2 sample4 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 3.0);\n\n  node_0.bottom_bbox = vec3(texture(u_objects_bvh_texture, sample1));\n  node_0.top_bbox = vec3(texture(u_objects_bvh_texture, sample2));\n\n  vec3 extra_data1 = vec3(texture(u_objects_bvh_texture, sample3));\n  node_0.is_leaf = extra_data1.x;\n  node_0.extra_data1 = extra_data1.y;\n  node_0.extra_data2 = extra_data1.z;\n\n  vec3 extra_data2 = vec3(texture(u_objects_bvh_texture, sample4));\n  node_0.parent_index = extra_data2.x;\n  node_0.sibling_index = extra_data2.y;\n\n//  node.distance = boundingBoxCollision(node.bottom_bbox, node.top_bbox, ray, node.is_leaf);\n\n  node_0.node_index = index;\n}\n\nvoid processLeaf(BVHNode node, inout Collision closest_collision_1248018414, Ray ray, float triangle_start_index_1248018414, Object object_0) {\n  float triangle_count_1248018414 = node.extra_data1;\n  float start_triangle_index = node.extra_data2 + triangle_start_index_1248018414;\n\n  float current_index = start_triangle_index;\n  float end_index = start_triangle_index + triangle_count_1248018414;\n\n  Collision collision;\n  for (float idx = 0.0; idx < triangle_count_1248018414; idx++) {\n    Triangle triangle = GetTriangleFromIndex(getTriangleIndex(start_triangle_index + idx));\n\n    if (triangleIntersection(ray, triangle, object_0.position, collision, closest_collision_1248018414.distance) == 1.0) {\n      closest_collision_1248018414 = collision;\n    }\n  }\n}\n\nvoid traverseObjectTree(Ray ray, inout Collision closest_collision_1248018414, Object object) {\n  float start_index_1248018414 = object.object_bvh_start_index;\n  float triangle_start_index = object.triangle_start_index;\n\n  Collision collision;\n  BVHNode node;\n  BVHNode left_node;\n  BVHNode right_node;\n\n  //float stack[32];\n  float[] stack = float[] (.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0);\n  int stackIdx = 1;\n\n  for (int i = 0; i < 100; i++) {\n    if (stackIdx < 1) return;\n\n    float box_index = stack[--stackIdx];\n\n    // Fetch node data\n    getNodeData(box_index, start_index_1248018414, ray, node);\n\n    if (node.is_leaf == 0.0) {\n      // Check collision with bounding box\n      float collision_distance = 0.0;\n\n      getNodeData(node.extra_data1, start_index_1248018414, ray, left_node);\n      getNodeData(node.extra_data2, start_index_1248018414, ray, right_node);\n\n      left_node.distance = boundingBoxCollision_1(left_node.bottom_bbox + object.position, left_node.top_bbox + object.position, ray);\n      right_node.distance = boundingBoxCollision_1(right_node.bottom_bbox + object.position, right_node.top_bbox + object.position, ray);\n\n      float near_distance = min(left_node.distance, right_node.distance);\n      float far_distance = max(left_node.distance, right_node.distance);\n\n      float mixer = clamp(step(right_node.distance, left_node.distance), 0.0, 1.0);\n      float near_child = mix(node.extra_data1, node.extra_data2, mixer);\n      float far_child = mix(node.extra_data2, node.extra_data1, mixer);\n\n      if (far_distance < closest_collision_1248018414.distance) {\n        stack[stackIdx++] = far_child; // Set left child index: extra_data1 = left index\n        stack[stackIdx++] = near_child; // Set left child index: extra_data1 = left index\n      }\n      else if (near_distance < closest_collision_1248018414.distance) {\n        stack[stackIdx++] = near_child; // Set left child index: extra_data1 = left index\n      }\n\n      // Return if stack index exceeds stack size\n      if (stackIdx > 31) return;\n    }\n    else {\n      processLeaf(node, closest_collision_1248018414, ray, triangle_start_index, object);\n    }\n  }\n}\n\nvec3 lightSphereContribution(Ray ray) {\n  vec3 sun_position = normalize(vec3(1.0, 1.0, 1.0));\n  vec3 position = vec3(0,0,0);\n  float radius = 100.0;\n\n  vec3 op = position - ray.start_position;\n  float t, epsilon = 0.0001;\n  float b = dot(op, ray.direction);\n  float disc = b * b - dot(op, op) + radius * radius;\n  if (disc < 0.0) return vec3(0,0,0);\n  else disc = sqrt(disc);\n\n  t = (t = b - disc) > epsilon ? t : ((t = b + disc) > epsilon ? t : 0.0);\n\n  if (t < 0.01)\n    return vec3(0,0,0);\n\n  vec3 collision_position = (ray.start_position + ray.direction * t) / 100.0;\n  vec3 normal = normalize(collision_position);\n  float u = 0.5 - atan(normal.z, normal.x) / 6.28;\n  float v = 0.5 - 2.0 * asin(normal.y) / 6.28;\n\n  vec3 clr = texture(u_dome_texture, vec2(u,v)).rgb;\n  return clr;\n}\n\nbool sceneIntersection(Ray ray, inout Collision collision_0) {\n  Collision closest_collision;\n  closest_collision.distance = 10000.0;\n\n  Object object;\n  int collision_count = 0;\n  for (int i = 0; i < object_count; i++) {\n    getObjectAtIndex(i, object);\n\n    float collision_distance = boundingBoxCollision_0(object.bounding_bottom + object.position, object.bounding_top + object.position, ray);\n\n    if (collision_distance < closest_collision.distance) {\n      traverseObjectTree(ray, closest_collision, object);\n    }\n  }\n\n  if (closest_collision.distance == 10000.0) {\n    return false;\n  }\n  else {\n    collision_0 = closest_collision;\n    return true;\n  }\n}\n\nvec3 applyFog(vec3 color, float distance) {\n  float fogAmount = 1.0 - exp( -distance * u_fogDistance * 0.2 );\n  return mix(color, u_fogColor, fogAmount);\n}\n\nvec3 pathTrace(Ray ray) {\n  vec3 mask = vec3(1,1,1);\n  float fogDistance = 0.0;\n  vec3 accumulated_color = vec3(0,0,0);\n  Collision collision;\n  Material collision_material;\n\n  for (float iteration = 0.0; iteration < float(trace_depth); iteration++) {\n    float distribution = 1.0;\n\n    if (!sceneIntersection(ray, collision)) {\n      vec3 lightSphereColor = mix(u_globalLightColor, lightSphereContribution(ray), u_imageBasedLightning);\n      if (iteration == 0.0) {\n        return mix(u_fogColor, lightSphereColor, u_fillBackgroundWithLight);\n      }\n      else {\n        float lightPower = (u_globalLightPower - 0.5) * u_globalLightContrast + 0.5;\n        accumulated_color += mask * lightSphereColor * lightPower;\n        return applyFog(accumulated_color, fogDistance);\n      }\n    }\n\n    collision_material = getMaterial(collision.material_index);\n\n    vec3 next_dir = PDF(ray, collision_material, collision.normal, iteration, distribution);\n    mask *= BRDF(ray, collision_material, collision.uv, collision.normal, next_dir) * distribution;\n    //mask *= 2.0;\n\n    accumulated_color += mask * collision_material.emission_rate;\n\n    float collisionDistance = length(ray.start_position - collision.position);\n    if (iteration == 0.0 && u_fogEnabled == 1.0) {\n      fogDistance = collisionDistance; //clamp(collisionDistance / fogDistance, 0.0, 1.0);\n    }\n\n    if (collision_material.emission_rate != 0.0) return applyFog(accumulated_color, fogDistance);\n\n    ray = Ray(collision.position + next_dir * EPS, next_dir);\n  }\n\n  return applyFog(accumulated_color, fogDistance);\n}\n\nvoid main( void ) {\n  vec3 traceColor = vec3(0,0,0);\n  Ray ray = createRay(gl_FragCoord.xy, 0);\n  traceColor += pathTrace(ray);\n\n  vec3 texture = texture(u_accumulated_texture, v_texCoord).rgb;\n\n  vec3 mixedTraceColor = mix(traceColor, texture, samples / (samples + 1.0));\n  outColor = vec4(mixedTraceColor, 1.0);\n}\n"

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_render_context__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render_view_render_view__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__path_tracer_ray_marcher__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__path_tracer_ray_tracer__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings_settings_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bloom_program_bloom_program__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__composition_program_composition_program__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__scene_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var Stats = __webpack_require__(663);
var RenderService = (function () {
    function RenderService(settingsService, sceneService) {
        var _this = this;
        this.settingsService = settingsService;
        this.sceneService = sceneService;
        this._rayTracingEnabled = true;
        this._bloomEnabled = false;
        this._samples = 0;
        this._sceneLoaded = false;
        this.render = function () {
            _this._stats.begin();
            var renderTexture;
            var rayTracing = _this.settingsService.renderTypeSub.getValue() == 0;
            if (_this._sceneLoaded) {
                if (rayTracing) {
                    _this._rayTracer.render();
                    renderTexture = _this._rayTracer.renderTexture;
                }
                else {
                    _this._rayMarcher.render();
                    renderTexture = _this._rayMarcher.renderTexture;
                }
            }
            if (_this._bloomEnabled) {
                _this._bloomProgram.render(renderTexture);
            }
            _this._compositionProgram.render(renderTexture, _this._bloomProgram.renderTexture);
            _this._renderView.render(_this._compositionProgram.renderTexture);
            _this._stats.end();
            requestAnimationFrame(_this.render);
        };
    }
    RenderService.prototype.init = function (canvas) {
        var _this = this;
        this._canvas = canvas;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_render_context__["b" /* initContext */])(canvas);
        canvas.nativeElement.width = window.innerWidth;
        canvas.nativeElement.height = window.innerHeight;
        window.onresize = function () {
            canvas.nativeElement.width = window.innerWidth;
            canvas.nativeElement.height = window.innerHeight;
            _this._renderView.updateSize();
        };
        this._stats = new Stats();
        this._stats.setMode(0);
        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.left = '200px';
        this._stats.domElement.style.top = '0px';
        document.body.appendChild(this._stats.domElement);
        this.sceneService.init();
        this.sceneService.loadScene(3).then(function (sceneTextures) {
            _this._rayTracer = new __WEBPACK_IMPORTED_MODULE_4__path_tracer_ray_tracer__["a" /* default */](_this.settingsService, _this.sceneService, sceneTextures);
            _this._startTime = __WEBPACK_IMPORTED_MODULE_5_moment__().valueOf();
            _this._sceneLoaded = true;
        });
        this.settingsService.bloomSettings.getAttributeSub('u_bloomEnabled').asObservable().subscribe(function (attr) {
            _this._bloomEnabled = attr.value == 1.0;
        });
        this.settingsService.renderTypeSub.asObservable().subscribe(function (renderType) {
            _this._rayTracingEnabled = renderType == 0;
            if (_this._rayTracingEnabled && _this._rayTracer != null) {
                _this._rayTracer.init();
            }
            else if (!_this._rayTracingEnabled) {
                _this._rayMarcher.init();
            }
        });
        this._rayMarcher = new __WEBPACK_IMPORTED_MODULE_3__path_tracer_ray_marcher__["a" /* default */](this.settingsService);
        this._bloomProgram = new __WEBPACK_IMPORTED_MODULE_7__bloom_program_bloom_program__["a" /* BloomProgram */](this.settingsService);
        this._compositionProgram = new __WEBPACK_IMPORTED_MODULE_8__composition_program_composition_program__["a" /* CompositionProgram */](this.settingsService);
        this._renderView = new __WEBPACK_IMPORTED_MODULE_2__render_view_render_view__["a" /* default */](this.settingsService);
        this.render();
    };
    RenderService.prototype.newDomeImage = function (image) {
        this._rayMarcher.loadDomeTexture(image);
        this._rayTracer.loadDomeTexture(image);
    };
    RenderService.prototype.loadNewScene = function (sceneId) {
        var _this = this;
        this.sceneService.loadScene(sceneId).then(function (sceneTextures) {
            _this._rayTracer = new __WEBPACK_IMPORTED_MODULE_4__path_tracer_ray_tracer__["a" /* default */](_this.settingsService, _this.sceneService, sceneTextures);
            _this._startTime = __WEBPACK_IMPORTED_MODULE_5_moment__().valueOf();
            _this._sceneLoaded = true;
        });
    };
    Object.defineProperty(RenderService.prototype, "canvas", {
        get: function () { return this._canvas; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderService.prototype, "renderTexture", {
        get: function () { return this._compositionProgram.renderTexture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderService.prototype, "textureData", {
        get: function () { return this._compositionProgram.textureData; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderService.prototype, "rayTracer", {
        get: function () { return this._rayTracer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderService.prototype, "samples", {
        get: function () {
            if (this._rayTracer != null) {
                var rayTracing = this.settingsService.renderTypeSub.getValue() == 0;
                return rayTracing ? this._rayTracer.samples : this._rayMarcher.samples;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return RenderService;
}());
RenderService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__settings_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_9__scene_service__["a" /* SceneService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__scene_service__["a" /* SceneService */]) === "function" && _b || Object])
], RenderService);

var _a, _b;
//# sourceMappingURL=render.service.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__path_tracer_models_camera__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__path_tracer_models_scene__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__path_tracer_models_default_scenes_default_scenes__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__path_tracer_models_scene_builder__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_settings_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SceneService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SceneService = (function () {
    function SceneService(_settingsService) {
        this._settingsService = _settingsService;
    }
    SceneService.prototype.init = function () {
        var _this = this;
        this._scene = new __WEBPACK_IMPORTED_MODULE_2__path_tracer_models_scene__["a" /* default */]();
        this._camera = new __WEBPACK_IMPORTED_MODULE_1__path_tracer_models_camera__["a" /* default */](this._settingsService, vec3.fromValues(10.90, 3.51, 4.00), vec3.fromValues(1.59, 3.79, 2.27));
        this._resolutionSub = this._settingsService.renderSettings.getAttributeSub('resolution');
        var renderCanvas = $('#renderCanvas');
        renderCanvas.click(function (event) {
            var windowSize = vec2.fromValues(window.innerWidth, window.innerHeight);
            var resolution = _this._resolutionSub.getValue().value;
            var zoom = _this._settingsService.zoomSub.getValue();
            var clickPosition = vec2.fromValues(event.offsetX, event.offsetY);
            var windowTop = vec2.fromValues(windowSize[0] / 2.0 - (resolution[0] * zoom) / 2.0, windowSize[1] / 2.0 - (resolution[1] * zoom) / 2.0);
            var windowBottom = vec2.fromValues(windowSize[0] / 2.0 - (resolution[0] * zoom) / 2.0 + resolution[0] * zoom, windowSize[1] / 2.0 - (resolution[1] * zoom) / 2.0 + resolution[1] * zoom);
            if (clickPosition[0] > windowTop[0] && clickPosition[1] > windowTop[1] && clickPosition[0] < windowBottom[0] && clickPosition[1] < windowBottom[1]) {
                var realClickPosition = vec2.fromValues((clickPosition[0] - windowTop[0]) / zoom, resolution[1] - (clickPosition[1] - windowTop[1]) / zoom);
                var ray = _this.camera.createRayFromPixel(realClickPosition);
                var selectedObject = _this._scene.sceneIntersection(ray);
                _this._settingsService.selectedObjectSub.next(selectedObject);
            }
        });
    };
    SceneService.prototype.loadScene = function (sceneId) {
        var _this = this;
        this._settingsService.isLoadingSub.next(true);
        switch (sceneId) {
            case 1:
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__path_tracer_models_default_scenes_default_scenes__["a" /* createDefaultScene1 */])(this._scene).then(function () {
                    _this._settingsService.isLoadingSub.next(false);
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__path_tracer_models_scene_builder__["a" /* default */])(_this._scene);
                });
            case 2:
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__path_tracer_models_default_scenes_default_scenes__["b" /* createDefaultScene2 */])(this._scene).then(function () {
                    _this._settingsService.isLoadingSub.next(false);
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__path_tracer_models_scene_builder__["a" /* default */])(_this._scene);
                });
            case 3:
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__path_tracer_models_default_scenes_default_scenes__["c" /* createDefaultScene3 */])(this._scene).then(function () {
                    _this._settingsService.isLoadingSub.next(false);
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__path_tracer_models_scene_builder__["a" /* default */])(_this._scene);
                });
            case 4:
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__path_tracer_models_default_scenes_default_scenes__["d" /* createDefaultScene4 */])(this._scene).then(function () {
                    _this._settingsService.isLoadingSub.next(false);
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__path_tracer_models_scene_builder__["a" /* default */])(_this._scene);
                });
        }
    };
    Object.defineProperty(SceneService.prototype, "camera", {
        get: function () { return this._camera; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneService.prototype, "scene", {
        get: function () { return this._scene; },
        enumerable: true,
        configurable: true
    });
    return SceneService;
}());
SceneService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__settings_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__settings_settings_service__["a" /* SettingsService */]) === "function" && _a || Object])
], SceneService);

var _a;
//# sourceMappingURL=scene.service.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createProgram__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render_context__ = __webpack_require__(25);


var RenderTarget = (function () {
    function RenderTarget(_shader, _sizeX, _sizeY) {
        this._shader = _shader;
        this._sizeX = _sizeX;
        this._sizeY = _sizeY;
        this._program = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__createProgram__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */], this._shader);
        this._shader.program = this._program;
        this._scaleFactor = 1.0;
        var positions = new Float32Array([
            -1.0, -1.0,
            -1.0, 1.0,
            1.0, -1.0,
            -1.0, 1.0,
            1.0, 1.0,
            1.0, -1.0,
        ]);
        var texCoords = new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0,
        ]);
        var vao = __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].createVertexArray();
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindVertexArray(vao);
        this._positionAttribLocation = __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].getAttribLocation(this._program, 'a_position');
        this._texCoordAttribLocation = __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].getAttribLocation(this._program, 'a_texCoord');
        this._positionBuffer = __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].createBuffer();
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].ARRAY_BUFFER, this._positionBuffer);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].ARRAY_BUFFER, positions, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].STATIC_DRAW);
        this._texCoordBuffer = __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].createBuffer();
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].ARRAY_BUFFER, this._texCoordBuffer);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bufferData(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].ARRAY_BUFFER, texCoords, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].STATIC_DRAW);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].viewport(0, 0, this._sizeX, this._sizeY);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].clearColor(0, 0, 0, 1);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].clear(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].COLOR_BUFFER_BIT);
    }
    RenderTarget.prototype.render = function () {
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].viewport(0, 0, this._sizeX, this._sizeY);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].clear(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].COLOR_BUFFER_BIT | __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].DEPTH_BUFFER_BIT);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].useProgram(this._program);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].enableVertexAttribArray(this._positionAttribLocation);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].ARRAY_BUFFER, this._positionBuffer);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].vertexAttribPointer(this._positionAttribLocation, 2, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FLOAT, false, 0, 0);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].enableVertexAttribArray(this._texCoordAttribLocation);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].ARRAY_BUFFER, this._texCoordBuffer);
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].vertexAttribPointer(this._texCoordAttribLocation, 2, __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].FLOAT, false, 0, 0);
        this._shader.update();
        __WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].drawArrays(__WEBPACK_IMPORTED_MODULE_1__render_context__["a" /* gl */].TRIANGLES, 0, 6);
    };
    RenderTarget.prototype.setWindowSize = function (sizeX, sizeY) {
        this._sizeX = sizeX;
        this._sizeY = sizeY;
    };
    Object.defineProperty(RenderTarget.prototype, "scaleFactor", {
        get: function () { return this._scaleFactor; },
        set: function (value) { this._scaleFactor = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget.prototype, "sizeX", {
        get: function () { return this._sizeX; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget.prototype, "sizeY", {
        get: function () { return this._sizeY; },
        enumerable: true,
        configurable: true
    });
    return RenderTarget;
}());
/* harmony default export */ __webpack_exports__["a"] = RenderTarget;
//# sourceMappingURL=render-target.js.map

/***/ }),

/***/ 667:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(278);


/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_context__ = __webpack_require__(25);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FLOAT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return INTEGER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return VEC2_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return VEC3_TYPE; });
/* unused harmony export VEC4_TYPE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return TEXTURE_TYPE; });

var FLOAT_TYPE = 0;
var INTEGER_TYPE = 1;
var VEC2_TYPE = 2;
var VEC3_TYPE = 3;
var VEC4_TYPE = 4;
var TEXTURE_TYPE = 5;
var Shader = (function () {
    function Shader(vertexSource, fragmentSource) {
        this.needsUpdate = false;
        this._vertexShader = this.createShader(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].VERTEX_SHADER, vertexSource);
        this._fragmentShader = this.createShader(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].FRAGMENT_SHADER, fragmentSource);
        this._uniforms = {};
    }
    Shader.prototype.update = function () {
        var textureCount = 0;
        for (var uniformName in this._uniforms) {
            var uniform = this._uniforms[uniformName];
            switch (uniform.type) {
                case FLOAT_TYPE:
                    __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].uniform1f(uniform.location, uniform.value);
                    break;
                case VEC2_TYPE:
                    __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].uniform2fv(uniform.location, uniform.value);
                    break;
                case VEC3_TYPE:
                    __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].uniform3fv(uniform.location, uniform.value);
                    break;
                case INTEGER_TYPE:
                    __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].uniform1i(uniform.location, uniform.value);
                    break;
                case TEXTURE_TYPE:
                    __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].uniform1i(uniform.location, textureCount);
                    switch (textureCount) {
                        case 0:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE0);
                            break;
                        case 1:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE1);
                            break;
                        case 2:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE2);
                            break;
                        case 3:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE3);
                            break;
                        case 4:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE4);
                            break;
                        case 5:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE5);
                            break;
                        case 6:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE6);
                            break;
                        case 7:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE7);
                            break;
                        case 8:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE8);
                            break;
                        case 9:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE9);
                            break;
                        case 10:
                            __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE10);
                            break;
                    }
                    __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].TEXTURE_2D, uniform.value);
                    textureCount++;
                    break;
            }
        }
    };
    Shader.prototype.updateTexture = function (data) {
    };
    Shader.prototype.createShader = function (type, source) {
        var shader = __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].createShader(type);
        __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].shaderSource(shader, source);
        __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].compileShader(shader);
        if (__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].getShaderParameter(shader, __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].COMPILE_STATUS)) {
            return shader;
        }
        console.warn(__WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].getShaderInfoLog(shader));
        //console.warn(gl.getShaderSource(shader))
        //console.debug(gl.getShaderSource(shader))
        __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].deleteShader(shader);
    };
    Shader.prototype.updateUniforms = function () {
        if (this._program) {
            for (var name in this._uniforms) {
                var uniform = this._uniforms[name];
                uniform.location = __WEBPACK_IMPORTED_MODULE_0__render_context__["a" /* gl */].getUniformLocation(this._program, name);
            }
        }
    };
    Shader.prototype.setUniform = function (id, data) {
        this._uniforms[id] = data;
        this.updateUniforms();
        this.needsUpdate = true;
    };
    Object.defineProperty(Shader.prototype, "uniforms", {
        get: function () { return this._uniforms; },
        set: function (value) {
            this._uniforms = value;
            this.updateUniforms();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "program", {
        set: function (value) {
            this._program = value;
            this.updateUniforms();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "fragmentShader", {
        get: function () { return this._fragmentShader; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "vertexShader", {
        get: function () { return this._vertexShader; },
        enumerable: true,
        configurable: true
    });
    return Shader;
}());
/* harmony default export */ __webpack_exports__["e"] = Shader;
//# sourceMappingURL=shader.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraNavigator; });
var CameraNavigator = (function () {
    function CameraNavigator(camera, settingsService) {
        this.camera = camera;
        this.settingsService = settingsService;
        this.zoomFactor = 6.0;
        this.rotationYFactor = -1.0;
        this.startYaw = 0.0;
        this.startPitch = 0.0;
        this.renderCanvas = $('#renderCanvas');
        this.setupCameraKeyboardMove();
        this.setupCameraZoom();
        this.setupCameraRotation();
    }
    CameraNavigator.prototype.setupCameraKeyboardMove = function () {
        var _this = this;
        var movement = vec3.fromValues(0, 0, 0);
        var dir = vec3.create();
        var right = vec3.create();
        var rotMat = mat3.create();
        var delta = 0.02 * this.zoomFactor;
        window.onkeydown = function (e) {
            switch (e.key) {
                case 'w':
                    mat3.multiply(rotMat, _this.rotationMatrixVector(vec3.fromValues(0, 1, 0), _this.camera.yawRotation), _this.rotationMatrixVector(vec3.fromValues(0, 0, 1), _this.camera.pitchRotation));
                    vec3.transformMat3(dir, _this.camera.direction, rotMat);
                    vec3.scale(movement, dir, delta);
                    vec3.add(_this.camera.position, _this.camera.position, movement);
                    _this.camera.hasChanged = true;
                    break;
                case 's':
                    mat3.multiply(rotMat, _this.rotationMatrixVector(vec3.fromValues(0, 1, 0), _this.camera.yawRotation), _this.rotationMatrixVector(vec3.fromValues(0, 0, 1), _this.camera.pitchRotation));
                    vec3.transformMat3(dir, _this.camera.direction, rotMat);
                    vec3.scale(movement, dir, -delta);
                    vec3.add(_this.camera.position, _this.camera.position, movement);
                    _this.camera.hasChanged = true;
                    break;
                case 'a':
                    mat3.multiply(rotMat, _this.rotationMatrixVector(vec3.fromValues(0, 1, 0), _this.camera.yawRotation), _this.rotationMatrixVector(vec3.fromValues(0, 0, 1), _this.camera.pitchRotation));
                    vec3.transformMat3(right, _this.camera.camera_right, rotMat);
                    vec3.scale(movement, right, -delta);
                    vec3.add(_this.camera.position, _this.camera.position, movement);
                    _this.camera.hasChanged = true;
                    break;
                case 'd':
                    mat3.multiply(rotMat, _this.rotationMatrixVector(vec3.fromValues(0, 1, 0), _this.camera.yawRotation), _this.rotationMatrixVector(vec3.fromValues(0, 0, 1), _this.camera.pitchRotation));
                    vec3.transformMat3(right, _this.camera.camera_right, rotMat);
                    vec3.scale(movement, right, delta);
                    vec3.add(_this.camera.position, _this.camera.position, movement);
                    _this.camera.hasChanged = true;
                    break;
            }
        };
    };
    CameraNavigator.prototype.rotationMatrixVector = function (v, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return mat3.fromValues(c + (1.0 - c) * v[0] * v[0], (1.0 - c) * v[0] * v[1] - s * v[2], (1.0 - c) * v[0] * v[2] + s * v[1], (1.0 - c) * v[0] * v[1] + s * v[2], c + (1.0 - c) * v[1] * v[1], (1.0 - c) * v[1] * v[2] - s * v[0], (1.0 - c) * v[0] * v[2] - s * v[1], (1.0 - c) * v[1] * v[2] + s * v[0], c + (1.0 - c) * v[2] * v[2]);
    };
    CameraNavigator.prototype.setupCameraZoom = function () {
        var _this = this;
        var rotMat = mat3.create();
        var dir = vec3.fromValues(0, 0, 0);
        this.renderCanvas.on('mousewheel', function (event) {
            mat3.multiply(rotMat, _this.rotationMatrixVector(vec3.fromValues(0, 1, 0), _this.camera.yawRotation), _this.rotationMatrixVector(vec3.fromValues(0, 0, 1), _this.camera.pitchRotation));
            vec3.transformMat3(dir, _this.camera.direction, rotMat);
            if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                vec3.scale(dir, dir, 0.05 * _this.zoomFactor);
                vec3.add(_this.camera.position, _this.camera.position, dir);
            }
            else {
                vec3.scale(dir, dir, -0.05 * _this.zoomFactor);
                vec3.add(_this.camera.position, _this.camera.position, dir);
            }
            _this.camera.hasChanged = true;
        });
    };
    CameraNavigator.prototype.setupCameraRotation = function () {
        var _this = this;
        this.leftMouseDown = false;
        this.startCameraPosition = vec3.fromValues(0, 0, 0);
        this.startMousePosition = { x: 0, y: 0 };
        // Mouse move
        this.renderCanvas.mousemove(function (event) {
            if (_this.leftMouseDown) {
                var rotationX = ((event.clientX / window.innerWidth - 0.5) - _this.startMousePosition.x) * 4.0;
                var rotationY = ((event.clientY / window.innerHeight - 0.5) - _this.startMousePosition.y) * 4.0 * _this.rotationYFactor;
                _this.camera.yawRotation = _this.startYaw + rotationX;
                _this.camera.pitchRotation = _this.startPitch + rotationY;
                // let yawRot = this.rotationMatrixVector(vec3.fromValues(0,1,0), this.camera.yawRotation)
                // let pitchRot = this.rotationMatrixVector(vec3.fromValues(0,0,1), this.camera.pitchRotation)
                // vec3.transformMat3(this.camera.camera_right, this.camera.camera_right, yawRot)
                // vec3.transformMat3(this.camera.camera_right, this.camera.camera_right, pitchRot)
                //
                // vec3.transformMat3(this.camera.camera_up, this.camera.camera_up, yawRot)
                // vec3.transformMat3(this.camera.camera_up, this.camera.camera_up, pitchRot)
                _this.camera.hasChanged = true;
            }
        });
        this.renderCanvas.mousedown(function (event) {
            if (event.which === 1) {
                _this.startYaw = _this.camera.yawRotation;
                _this.startPitch = _this.camera.pitchRotation;
                _this.startMousePosition.x = (event.clientX / window.innerWidth - 0.5);
                _this.startMousePosition.y = (event.clientY / window.innerHeight - 0.5);
                _this.startCameraPosition = vec3.fromValues(_this.camera.position[0], _this.camera.position[1], _this.camera.position[2]);
                _this.leftMouseDown = true;
            }
        });
        this.renderCanvas.mouseup(function (event) { return _this.leftMouseDown = false; });
        this.renderCanvas.mouseout(function (event) { return _this.leftMouseDown = false; });
    };
    return CameraNavigator;
}());

//# sourceMappingURL=camera-navigator.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ray__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_rotation_matrix_vector__ = __webpack_require__(319);


var Camera = (function () {
    function Camera(settingsService, position, look_at) {
        var _this = this;
        this.yawRotation = 0.0;
        this.pitchRotation = 0.0;
        this._position = position;
        this._look_at = look_at;
        this._direction = vec3.fromValues(0, 0, 0);
        this._hasChanged = false;
        settingsService.renderSettings.getAttributeSub('resolution').asObservable().subscribe(function (attr) { return _this._resolution = attr.value; });
        this.update();
    }
    Camera.prototype.createRayFromPixel = function (pixel_position) {
        var width = this._resolution[0];
        var height = this._resolution[1];
        var i = (pixel_position[0] / width) - 0.5;
        var j = (pixel_position[1] / height) - 0.5;
        var camera_right = vec3.fromValues(0, 0, 0);
        var camera_up = vec3.fromValues(0, 0, 0);
        var right_up = vec3.fromValues(0, 0, 0);
        var dir_pos = vec3.fromValues(0, 0, 0);
        var image_point = vec3.fromValues(0, 0, 0);
        var rotMat = mat3.create();
        var dir = vec3.create();
        mat3.multiply(rotMat, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_rotation_matrix_vector__["a" /* rotationMatrixVector */])(vec3.fromValues(0, 1, 0), this.yawRotation), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_rotation_matrix_vector__["a" /* rotationMatrixVector */])(vec3.fromValues(0, 0, 1), this.pitchRotation));
        vec3.transformMat3(dir, this._direction, rotMat);
        vec3.scale(camera_right, this._camera_right, i * 1.5);
        vec3.scale(camera_up, this._camera_up, j * 1.5);
        vec3.add(right_up, camera_right, camera_up);
        vec3.add(dir_pos, this._position, dir);
        vec3.add(image_point, right_up, dir_pos);
        var direction = vec3.fromValues(0, 0, 0);
        var normalized_direction = vec3.fromValues(0, 0, 0);
        var camera_position = vec3.fromValues(0, 0, 0);
        vec3.subtract(direction, image_point, this._position);
        vec3.normalize(normalized_direction, direction);
        vec3.copy(camera_position, this._position);
        return new __WEBPACK_IMPORTED_MODULE_0__ray__["a" /* default */](camera_position, normalized_direction);
    };
    Camera.prototype.update = function () {
        var distance = vec3.distance(this._look_at, this._position);
        vec3.subtract(this._direction, this._look_at, this._position);
        vec3.normalize(this._direction, this._direction);
        var up_vector = vec3.fromValues(0, 1, 0);
        this._camera_right = vec3.fromValues(0, 0, 0);
        this._camera_up = vec3.fromValues(0, 0, 0);
        vec3.cross(this._camera_right, this._direction, up_vector);
        vec3.cross(this._camera_up, this._camera_right, this._direction);
        this._position = vec3.fromValues(this._look_at[0], this._look_at[1], this._look_at[2]);
        var negative_direction = vec3.fromValues(0, 0, 0);
        vec3.scale(negative_direction, this._direction, -distance);
        vec3.add(this._position, this._position, negative_direction);
    };
    Object.defineProperty(Camera.prototype, "camera_up", {
        get: function () { return this._camera_up; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "camera_right", {
        get: function () { return this._camera_right; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "look_at", {
        get: function () { return this._look_at; },
        set: function (look_at) { this._look_at = look_at; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "position", {
        get: function () { return this._position; },
        set: function (new_position) { this._position = new_position; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "direction", {
        get: function () { return this._direction; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "hasChanged", {
        get: function () { return this._hasChanged; },
        set: function (changed) { this._hasChanged = changed; },
        enumerable: true,
        configurable: true
    });
    return Camera;
}());
/* harmony default export */ __webpack_exports__["a"] = Camera;
//# sourceMappingURL=camera.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiffuseMaterial; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var DiffuseMaterial = (function (_super) {
    __extends(DiffuseMaterial, _super);
    function DiffuseMaterial(color) {
        var _this = _super.call(this, color, __WEBPACK_IMPORTED_MODULE_0__material__["a" /* MATERIAL_TYPES */].diffuse) || this;
        _this._albedo = 1.8;
        _this._roughness = 1.0;
        return _this;
    }
    Object.defineProperty(DiffuseMaterial.prototype, "albedo", {
        get: function () { return this._albedo; },
        set: function (value) { this._albedo = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiffuseMaterial.prototype, "roughness", {
        get: function () { return this._roughness; },
        set: function (value) { this._roughness = value; },
        enumerable: true,
        configurable: true
    });
    return DiffuseMaterial;
}(__WEBPACK_IMPORTED_MODULE_0__material__["b" /* default */]));

//# sourceMappingURL=diffuse-material.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmissionMaterial; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var EmissionMaterial = (function (_super) {
    __extends(EmissionMaterial, _super);
    function EmissionMaterial(color) {
        return _super.call(this, color, __WEBPACK_IMPORTED_MODULE_0__material__["a" /* MATERIAL_TYPES */].emission, 5.0) || this;
    }
    return EmissionMaterial;
}(__WEBPACK_IMPORTED_MODULE_0__material__["b" /* default */]));

//# sourceMappingURL=emission-material.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlossyMaterial; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var GlossyMaterial = (function (_super) {
    __extends(GlossyMaterial, _super);
    function GlossyMaterial(color) {
        var _this = _super.call(this, color, __WEBPACK_IMPORTED_MODULE_0__material__["a" /* MATERIAL_TYPES */].glossy) || this;
        _this._shininess = 10.0;
        return _this;
    }
    Object.defineProperty(GlossyMaterial.prototype, "shininess", {
        get: function () { return this._shininess; },
        set: function (value) { this._shininess = value; },
        enumerable: true,
        configurable: true
    });
    return GlossyMaterial;
}(__WEBPACK_IMPORTED_MODULE_0__material__["b" /* default */]));

//# sourceMappingURL=glossy-material.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material__ = __webpack_require__(29);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var TransmissionMaterial = (function (_super) {
    __extends(TransmissionMaterial, _super);
    function TransmissionMaterial(color) {
        var _this = _super.call(this, color, __WEBPACK_IMPORTED_MODULE_0__material__["a" /* MATERIAL_TYPES */].transmission) || this;
        _this._refractionIndex = 1.3;
        _this._reflectRefractRatio = 0.2;
        _this._roughness = 0.0;
        return _this;
    }
    Object.defineProperty(TransmissionMaterial.prototype, "refractionIndex", {
        get: function () { return this._refractionIndex; },
        set: function (value) { this._refractionIndex = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransmissionMaterial.prototype, "reflectRefractRatio", {
        get: function () { return this._reflectRefractRatio; },
        set: function (value) { this._reflectRefractRatio = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransmissionMaterial.prototype, "roughness", {
        get: function () { return this._roughness; },
        set: function (value) { this._roughness = value; },
        enumerable: true,
        configurable: true
    });
    return TransmissionMaterial;
}(__WEBPACK_IMPORTED_MODULE_0__material__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = TransmissionMaterial;
//# sourceMappingURL=transmission-material.js.map

/***/ })

},[667]);
//# sourceMappingURL=main.bundle.js.map
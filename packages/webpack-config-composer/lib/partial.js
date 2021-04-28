"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require("lodash");
const constants_1 = __importDefault(require("./constants"));
const concat_method_1 = __importDefault(require("./concat-method"));
const { DATA, OVERRIDE } = constants_1.default;
const { getConcatMethod } = concat_method_1.default;
class Partial {
    constructor(name, data) {
        this._name = name;
        if (typeof data === "function") {
            this[DATA] = { config: data };
        }
        else {
            this[DATA] = { config: {}, options: {}, ...data };
        }
        this.setOverride(_.identity);
    }
    set config(config) {
        this[DATA].config = config;
    }
    get config() {
        return this[DATA].config;
    }
    set options(options) {
        this[DATA].options = { ...options };
    }
    get options() {
        return this[DATA].options;
    }
    merge(data, concatArray) {
        _.mergeWith(this[DATA], data, getConcatMethod(concatArray, null));
    }
    setOverride(fn) {
        this[OVERRIDE] = fn || _.identity;
    }
    compose(options) {
        options = { ...this.options, ...options };
        let config = this.config;
        while (typeof config === "function") {
            config = config(options);
            config = config.webpackPartial || config;
        }
        const override = this[OVERRIDE](config, options);
        return override || config;
    }
}
module.exports = Partial;
//# sourceMappingURL=partial.js.map
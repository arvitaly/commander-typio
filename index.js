"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const typio_1 = require("typio");
function parseArgs(args, params) {
    const model = {};
    const optionsKeys = Object.keys(params);
    for (const optionName of optionsKeys) {
        const option = params[optionName];
        program.option((option.short ? "-" + option.short + "," : "") +
            "--" +
            toCliArgFormat(optionName) +
            (option.type.name !== "bool" ? (option.isOptional ? " [v]" : " <v>") : ""), option.description || "");
        model[optionName] = option.isOptional ? typio_1.opt(option.type) : option.type;
    }
    program.parse(args);
    const parsed = {};
    for (const optionName of optionsKeys) {
        parsed[optionName] = program[optionName];
    }
    return typio_1.typio(parsed, model);
}
exports.parseArgs = parseArgs;
function toCliArgFormat(input) {
    const upperChars = input.match(/([A-Z])/g);
    if (!upperChars) {
        return input;
    }
    let str = input.toString();
    for (let i = 0, n = upperChars.length; i < n; i++) {
        str = str.replace(new RegExp(upperChars[i]), "-" + upperChars[i].toLowerCase());
    }
    if (str.slice(0, 1) === "-") {
        str = str.slice(1);
    }
    return str;
}
exports.toCliArgFormat = toCliArgFormat;

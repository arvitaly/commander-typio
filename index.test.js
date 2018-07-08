"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const typio_1 = require("typio");
it("parse args", () => {
    const result = _1.parseArgs(["", "", "--arg1=value1", "--arg2"], {
        arg1: {
            type: typio_1.str(),
        },
        arg2: {
            type: typio_1.bool(),
        },
        arg3: {
            isOptional: true,
            type: typio_1.opt(typio_1.str()),
        },
    });
    expect(result.arg1.toUpperCase()).toBe("VALUE1");
    expect(result.arg2).toBe(true);
});

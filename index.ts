import program = require("commander");
import { typio, opt } from "typio";
export interface IOption<T> {
    short?: string;
    description?: string;
    type: T;
    isOptional?: boolean;
}
export interface IParserParams {
    [index: string]: IOption<any>;
}

export type IParsedArgs<T> = T extends IParserParams ? { [P in keyof T]: T[P]["type"] } : never;

export function parseArgs<T extends IParserParams>(args: string[], params: T): IParsedArgs<T> {
    const model: any = {};
    const optionsKeys = Object.keys(params);
    for (const optionName of optionsKeys) {
        const option = params[optionName];
        program.option(
            (option.short ? "-" + option.short + "," : "") +
                "--" +
                toCliArgFormat(optionName) +
                (option.type.name !== "bool" ? (option.isOptional ? " [v]" : " <v>") : ""),
            option.description || "",
        );
        model[optionName] = option.isOptional ? opt(option.type) : option.type;
    }
    program.parse(args);
    const parsed: any = {};
    for (const optionName of optionsKeys) {
        parsed[optionName] = program[optionName];
    }
    return typio(parsed, model);
}

export function toCliArgFormat(input: string) {
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

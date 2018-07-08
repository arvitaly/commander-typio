import { parseArgs } from ".";
import { str, bool, opt } from "typio";

it("parse args", () => {
    const result = parseArgs(["", "", "--arg1=value1", "--arg2"], {
        arg1: {
            type: str(),
        },
        arg2: {
            type: bool(),
        },
        arg3: {
            isOptional: true,
            type: opt(str()),
        },
    });
    expect(result.arg1.toUpperCase()).toBe("VALUE1");
    expect(result.arg2).toBe(true);
});

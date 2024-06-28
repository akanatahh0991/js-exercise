import { getTypeText } from "./index.js";

test.each([
    {action: () => getTypeText``, output: ""},
    {action: () => getTypeText`normal text`, output: "normal text"},
    {action: () => getTypeText`${undefined}`, output: "undefined"},
    {action: () => getTypeText`${null}`, output: "object"},
    {action: () => getTypeText`${true}`, output: "boolean"},
    {action: () => getTypeText`${5}`, output: "number"},
    {action: () => getTypeText`${"text"}`, output: "string"},
    {action: () => getTypeText`${Symbol()}`, output: "symbol"},
    {action: () => getTypeText`${() => "test"}`, output: "function"},
    {action: () => getTypeText`${[1, 3, 5]}`, output: "object"},
    {action: () => getTypeText`${{a: 7, b: 6}}`, output: "object"},
    {action: () => getTypeText`${{a: 7, b: 6}}, ${56}, ${null}`, output: "object, number, object"}
])("getTypeText`$input` => $output", ({action, output}) => {
    expect(action()).toBe(output);
})
export const performScriptForFunction = script => {
    new Function(script).call(window, window);
}

export const performScriptForEval = script => {
    eval(script);
}
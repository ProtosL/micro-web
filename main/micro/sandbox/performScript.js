// 执行脚本的两种方式

export const performScriptForFunction = (script, appName) => {
    const scriptText = `
        ${script}
        return window['${appName}']
    `
    return new Function(scriptText).call(window, window);
}

export const performScriptForEval = (script, appName) => {
    // 此处的 window 并不是全局的 window
    const scriptText = `
        () => {
            ${script};
            return window['${appName}']
        }
    `
    return eval(scriptText).call(window, window);
}
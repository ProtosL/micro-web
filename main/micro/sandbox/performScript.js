// 执行脚本的两种方式

export const performScriptForFunction = (script, appName, global) => {
    const scriptText = `
        ${script}
        return window['${appName}']
    `
    return new Function(scriptText).call(global, global);
}

export const performScriptForEval = (script, appName, global) => {
    // 此处的 window 并不是全局的 window
    const scriptText = `
        () => {
            ${script};
            return window['${appName}']
        }
    `
    return eval(scriptText).call(global, global);
}
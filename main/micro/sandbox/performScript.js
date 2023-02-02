// 执行脚本的两种方式

export const performScriptForFunction = (script, appName, global) => {
    window.proxy = global;
    // 直接将 global 传入的话会出现 global is not undefined，在执行的环境即 window 上是没有 global 属性的
    const scriptText = `
        return ((window) => {
            ${script}
            return window['${appName}']
        })(window.proxy)
    `
    // new Function 返回的是一个函数
    return new Function(scriptText)();
}

export const performScriptForEval = (script, appName, global) => {
    window.proxy = global;
    const scriptText = `
        ((window) => {
            ${script};
            return window['${appName}']
        })(window.proxy)
    `
    return eval(scriptText);
}
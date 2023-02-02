import { performScriptForFunction } from "./performScript";
// import { SnapShotSandbox } from './snapShotSandbox';
import { ProxySandbox } from "./proxySandbox";

const isCheckLifeCycle = lifeCycle => lifeCycle && lifeCycle.bootstrap && lifeCycle.mount && lifeCycle.unmount;

/**
 * 子应用生命周期处理，环境变量设置
 */
export const sandBox = (app, script) => {
    const proxy = new ProxySandbox();
    
    if(!app.proxy) {
        app.proxy = proxy;
    }
    
    // 1. 设置环境变量
    window.__MICRO_WEB__ = true;

    // 2. 运行 js 文件
    const lifeCycle = performScriptForFunction(script, app.name, app.proxy.proxy);

    // 生命周期，挂载到 app 上
    if (isCheckLifeCycle(lifeCycle)) {
        app.bootstrap = lifeCycle.bootstrap;
        app.mount = lifeCycle.mount;
        app.unmount = lifeCycle.unmount;
    } 
}
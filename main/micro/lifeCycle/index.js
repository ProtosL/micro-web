import { findAppByRoute } from "../utils";
import { getMainLifeCycle } from '../const/mainLifeCycle';

export const lifeCycle = async () => {
    // 获取到上一个子应用
    const prevApp = findAppByRoute(window.__ORIGIN_APP__);

    // 获取到要跳转的子应用
    const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__);

    if (!nextApp) {
        return;
    }

    if (prevApp && prevApp.unmount) {
        await destoryed(prevApp);
    }

    const app = await beforeLoad(nextApp);

    await mounted(app);
}

export const beforeLoad = async (app) => {
    await runMainLifeCycle('beforeLoad');
    if (app && app.bootstrap) {
        app.bootstrap();
    }

    const appContext = null;

    return appContext;
}

export const mounted = (app) => {
    if (app && app.mount) {
        app.mount();
    }
    runMainLifeCycle('mounted');
}

export const destoryed = async (app) => {
    if (app && app.unmount) {
        app.unmount();
    }
    // 对应的执行主应用生命周期
    await runMainLifeCycle('destoryed');
}

export const runMainLifeCycle = async (type) => {
    const mainLife = getMainLifeCycle()
    await Promise.all(mainLife[type].map(async item => await item()))
}
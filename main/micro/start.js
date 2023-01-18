import { getList, setList } from "./const/subApps"
import { setMainLifeCycle } from './const/mainLifeCycle';
import { rewriteRouter } from "./router/rewriteRouter";
import { currentApp } from "./utils";

// 实现路由拦截
rewriteRouter();

export const registerMicroApps = (appList, lifeCycle) => {
    setList(appList);

    lifeCycle.beforeLoad[0]();

    setTimeout(() => {
        lifeCycle.mounted[0]()
    }, 2000)
    
    setMainLifeCycle(lifeCycle);
}

/**
 * 启动微前端框架 
 */ 
export const start = () => {
    // 首先验证当前子应用列表是否为空
    const apps = getList();

    // 无子应用
    if (!apps.length) {
        throw Error('子应用列表为空，请正确注册');
    }

    // 有子应用内容，查找到符合当前路由的子应用
    const app = currentApp();

    if (app) {
        const { pathname, hash } = window.location;
        const url = pathname + hash;
        window.history.pushState('', '', url);
    }

    window.__CURRENT_SUB_APP__ = app.activeRule;
}
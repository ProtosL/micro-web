import { getList } from "../const/subApps";

// 给当前的路由跳转打补丁
export const patchRouter = (globalEvent, eventName) => {
    return function () {
        const e = new Event(eventName);
        globalEvent.apply(this, arguments);
        window.dispatchEvent(e);
    }
}

/**
 * 获取当前子应用
 */
export const currentApp = () => {
    const currentUrl = window.location.pathname;
    return filterApp('activeRule', currentUrl);
}

export const findAppByRoute = (route) => {
    return filterApp('activeRule', route);
}

const filterApp = (key, value) => {
    const apps = getList().filter(item => item[key] === value)

    if (apps.length) {
        return apps[0];
    }
    return {};
}

/**
 * 子应用是否做了切换
 */
export const isTurnChild = () => {
    // 上一个应用
    window.__ORIGIN_APP__ = window.__CURRENT_SUB_APP__;
    if (window.__CURRENT_SUB_APP__ === window.location.pathname) {
        return false;
    }
    // 更新当前应用
    window.__CURRENT_SUB_APP__ = window.location.pathname;
    return true;
}
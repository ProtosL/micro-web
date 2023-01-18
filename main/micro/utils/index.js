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
    return window.__CURRENT_SUB_APP__ !== window.location.pathname;
}
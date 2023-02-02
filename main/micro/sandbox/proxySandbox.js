// 代理沙箱

// 子应用的沙箱容器
let defaultValue = {};

export class ProxySandbox {
    constructor() {
        this.proxy = null;

        this.active();
    }

    active() {
        this.proxy = new Proxy(window, {
            get(target, key) {
                // 处理事件，例如 window.addEventListener
                if (typeof target[key] === 'function') {
                    return target[key].bind(target);
                }
                // 没有值的话就从 window 上取
                return defaultValue[key] || target[key];
            },
            set(target, key, value) {
                defaultValue[key] = value;
                return true;
            }
        });
    }

    inactive() {
        defaultValue = {};
    }
}
// 快照沙箱
// 应用于比较老的浏览器版本
export class SnapShotSandbox {
    constructor() {
        // 1. 代理对象
        this.proxy = window;

        this.active();
    }

    // 沙箱激活
    active() {
        // 创建一个沙箱快照
        this.snapshot = new Map();
        // 遍历全局环境
        for (const key in window) {
            this.snapshot.set(key, window[key])
        }
    }

    // 沙箱销毁
    inactive() {
        for (const key in window) {
            if (window[key] !== this.snapshot.get(key)) {
                // 还原操作
                window[key] = this.snapshot.get(key);
            }
        }
    }
}
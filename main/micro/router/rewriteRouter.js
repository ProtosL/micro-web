import { patchRouter } from "../utils"
import { turnApp } from './routerHandle';

// 重写 window 的路由跳转
export const rewriteRouter = () => {
    window.history.pushState = patchRouter(window.history.pushState, 'micro_push')
    window.history.replaceState = patchRouter(window.history.replaceState, 'micro_replace')

    // 浏览器的路由跳转实际会调用自定义的 turnApp 方法 
    window.addEventListener('micro_push', turnApp);
    window.addEventListener('micro_replace', turnApp);

    // 监听返回事件
    window.onpopstate = function() {
        turnApp();
    }
}
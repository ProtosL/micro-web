import { registerMicroApps, start } from "../../micro"
import { loading } from '../store';
import { createStore } from '../../micro/store/index';

const store = createStore()

window.store = store
const storeData = store.getStore()

store.subscribe((newValue, oldValue) => {
    console.log(newValue, oldValue, '---')
})

store.update({
    ...storeData,
    a: 1
})

export const registerApp = (list) => {
    // 注册到微前端框架里
    registerMicroApps(list, {
        beforeLoad: [
            () => {
                loading.changeLoading(true);
                console.log('开始加载')
            }
        ],
        mounted: [
            () => {
                loading.changeLoading(false);
                console.log('渲染完成')
            }
        ],
        destoryed: [
            () => {
                console.log('卸载完成')
            }
        ]
    });

    // 启动微前端框架
    start();
}
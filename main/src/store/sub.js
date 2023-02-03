// import { loading } from '../store'
// import * as appInfo from '../store'

import * as appInfo from '../store';

export const subNavList = [
    {
        name: 'react15',// 子应用唯一 id
        entry: '//localhost:9002/', // 入口
        // loading,
        container: '#micro-container', // 容器 div 的 id
        activeRule: '/react15', // 子应用激活的路由规则
        appInfo,
    },
    {
        name: 'react16',
        entry: '//localhost:9003/',
        // loading,
        container: '#micro-container',
        activeRule: '/react16',
        appInfo,
    },
    {
        name: 'vue2',
        entry: '//localhost:9004/',
        // loading,
        container: '#micro-container',
        activeRule: '/vue2',
        appInfo,
    },
    {
        name: 'vue3',
        entry: '//localhost:9005/',
        // loading,
        container: '#micro-container',
        activeRule: '/vue3',
        appInfo,
    },
];


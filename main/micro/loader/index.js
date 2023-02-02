import { fetchResource } from "../utils/fetchResource";
import { sandBox } from '../sandbox';

/**
 * 加载 html 的方法
 */
export const loadHtml = async (app) => {
    // 子应用需要显示在哪里
    let container = app.container; 
    // 子应用的入口
    let entry = app.entry;

    const [ dom, scripts ] = await parseHtml(entry);

    const ct = document.querySelector(container);

    if (!ct) {
        throw new Error('容器不存在');
    }
    
    ct.innerHTML = dom;

    scripts.forEach(item => {
        sandBox(app, item);
    })

    return app;
}

export const parseHtml = async (entry) => {
    const html = await fetchResource(entry);

    let allScript = [];
    const div = document.createElement('div');
    div.innerHTML = html;
    
    const [dom, scriptUrl, script] = await getResources(div, entry);
    const fetchedScripts = await Promise.all(scriptUrl.map(async item => fetchResource(item)))

    allScript = script.concat(fetchedScripts);
    return [dom, allScript];
}

export const getResources = async (root, entry) => {
    const scriptUrl = [];
    const script = [];
    const dom = root.outerHTML; // 当前根元素连同其中的所有内容
    
    // 深度解析
    function deepParse(element) {
        const children = element.children;
        const parent = element.parent;

        // 第一步处理位于 script 中的内容
        if (element.nodeName.toLowerCase() === 'script') {
            const src = element.getAttribute('src');
            // 直接在 script 标签中写的内容
            if (!src) {
                script.push(element.outerHTML);
            } else {
                if (src.startsWith('http')) {
                    scriptUrl.push(src);
                } else {
                    scriptUrl.push(`${window.location.protocol}${entry}/${src}`);
                }
            }

            if (parent) {
                parent.replaceChild(document.createComment('此 js 文件已被微前端替换'), element)
            }
        }

        // link 也会有 js 的内容
        if (element.nodeName.toLowerCase() === 'link') {
            const href = element.getAttribute('href');

            if (href.endsWith('.js')) {
                if (href.startsWith('http')) {
                    scriptUrl.push(href);
                } else {
                    scriptUrl.push(`${window.location.protocol}${entry}/${href}`);
                }
            }
        }

        for (let i = 0; i < children.length; i++) {
            deepParse(children[i]);
        }
    }

    deepParse(root);
    
    return [dom, scriptUrl, script];
}
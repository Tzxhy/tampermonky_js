// ==UserScript==
// @name         CSDN优化
// @namespace    tzxhy
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://blog.csdn.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=csdn.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 允许复制
    $("#content_views").unbind("copy");
    const targetNode = document.body;

    // 观察器的配置（需要观察什么变动）
    const config = { attributes: false, childList: true};

    // 当观察到变动时执行的回调函数
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(let mutation of mutationsList) {
            console.log(mutation)
            if (mutation.type === 'childList') {
                const loginBoxIdx = [...mutation.addedNodes.values()].findIndex(i => i.classList.contains('passport-login-container'));
                if (loginBoxIdx >= 0) { // 登录框
                    const item = mutation.addedNodes[loginBoxIdx];
                    item.style.setProperty('display', 'none')
                    setTimeout(() => {
                        item.remove();
                    })
                }
            }
        }
    };

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);

    // 以上述配置开始观察目标节点
    observer.observe(targetNode, config);
})();
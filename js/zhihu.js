// ==UserScript==
// @name         知乎优化
// @namespace    tzxhy
// @version      0.1
// @description
// @author       You
// @match        https://zhuanlan.zhihu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=csdn.net
// @updateURL    https://github.com/Tzxhy/tampermonky_js/raw/master/js/zhihu.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(() => {
        const button = document.querySelector('.Modal.Modal--default.signFlowModal > button');
        if (button) {
            button.click();
        }
    }, 2000)
})();

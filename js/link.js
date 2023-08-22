// ==UserScript==
// @name         remove-jump-confirm
// @namespace    tzxhy
// @version      0.1
// @description  直接跳转，防止二次确认
// @author       tanzhixuan2018@163.com
// @match        https://juejin.cn/*
// @icon         
// @updateURL    https://github.com/Tzxhy/tampermonky_js/raw/master/js/link.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    setTimeout(() => {
        const as = Array.from(document.querySelectorAll('a'))
        console.log('as', as)
        as.forEach(a => {
            if (a.hasAttribute('title')) {
                a.setAttribute('href', a.getAttribute('title'));
            }
        })
    }, 800)
})();
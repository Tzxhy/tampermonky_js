// ==UserScript==
// @name         img-download
// @namespace    tzxhy
// @version      0.1
// @description  直接保存页面中所有图片，而非浪费流量重新下载
// @author       tanzhixuan2018@163.com
// @match        *://*/*
// @require      https://unpkg.com/fflate@0.8.0
// @require      https://cdn.bootcdn.net/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @updateURL    https://github.com/Tzxhy/tampermonky_js/raw/master/js/img-download.js
// @icon         
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // code here
    async function save() {
        const imgs = Array.from(document.getElementsByTagName('img'));
        imgs.forEach((image, idx) => {
            image.setAttribute('crossorigin', 'anonymous')
        })
        setTimeout(innerSave, 800);
    }

    async function innerSave() {
        // code here
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.setAttribute('width', '4000')
        canvas.setAttribute('height', '2000')
        if (!context) {
            console.log('no context');
            return;
        }
        const imgs = Array.from(document.getElementsByTagName('img'));
        const files = {};
        await Promise.all(imgs.map((image, idx) => {
            if (image.naturalWidth < 100)
                return Promise.resolve(null);
            canvas.setAttribute('width', image.naturalWidth)
            canvas.setAttribute('height', image.naturalHeight)
            context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
            return new Promise(res => {
                canvas.toBlob((blob) => {
                    blob.arrayBuffer().then(arrayBuffer => {
                        files['p' + idx + '.png'] = new Uint8Array(arrayBuffer);
                        res();
                    });
                }, 'image/jpeg', 0.95);
            });
        }));
        const zipped = fflate.zipSync(files);
        const blob = new Blob([zipped]);
        saveAs(blob, location.pathname + '.zip');
    }
    const button = document.createElement('button');
    button.innerText = '下载所有已看图片';
    button.style.cssText = `position: fixed; z-index: 9999999; right: 16px; top: 16px; width: 80px; height: 44px; `;
    button.addEventListener('click', save);
    document.body.appendChild(button);
})();
//对于油猴脚本来说，unsafeWindow是必须的，不然装饰器无法正常hack
if (!CRX) {
    window = <Window & typeof globalThis>unsafeWindow;
}
// let buffer = typeof unsafeWindow == "undefined" ? window : unsafeWindow;

// window = <Window & typeof globalThis>buffer;

import { handleQuestions } from "./main";

const realFetch = window.fetch;
window.fetch = (url, init = undefined) => {
    return realFetch(url, init).then((response) => {
        console.error("has listen fetch");
        if (/.*\/course\/api\/v3\/content\//.test(url as string)) {
            console.error("succeed get v3");
            let res = response.clone();
            res.json().then((json) => {
                setTimeout(() => {
                    handleQuestions(json);
                }, 1000); //等待页面加载完，因为要确定answerSheetType
            });
        }
        return response;
    });
};

// Object.defineProperty(window, "fetch", (url: RequestInfo, init = undefined) =>
//     realFetch(url, init).then((response) => {
//         if (/.*\/course\/api\/v3\/content\//.test(url as string)) {
//             let res = response.clone();
//             res.json().then((json) => {
//                 setTimeout(() => {
//                     handleQuestions(json);
//                 }, 1000); //等待页面加载完，因为要确定answerSheetType
//             });
//         }
//         return response;
//     }),
// );

//对于油猴脚本来说，unsafeWindow是必须的，不然装饰器无法正常hack
if (!process.env.CRX) {
    window = <Window & typeof globalThis>unsafeWindow;
}

import { handleQuestions } from "./main";

const originalFetch = window.fetch;
window.fetch = (url, init = undefined) => {
    return originalFetch(url, init).then((response) => {
        if (/.*\/course\/api\/v3\/content\//.test(url as string)) {
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

// 监听页面变化
// 默认情况下，仅在第一次访问一个练习时会发送fetch请求，之后直接加载本地缓存
// 在没有刷新页面的情况下，第二次访问该练习不会触发fetch，因此也就不会触发上方的hook
// 所以需要手动触发fetch，以保证
// 同时也可以监听多页题，多页题的location.href会改变
let lastUrl = "";

setInterval(() => {
    try {
        const tags = location.href.split("/");
        const currentUnit = tags[tags.length - 2];

        const courseInfo = /(course.*?)\//.exec(location.href)![1];

        if (currentUnit && lastUrl !== location.href) {
            const url = `https://ucontent.unipus.cn/course/api/v3/content/${courseInfo}/${currentUnit}/default/`;
            //必须是window.fetch，不然不是全局context
            window.fetch(url, {
                cache: "force-cache", //走cache，所以无所谓init
                headers: {
                    //不过还是带上，万一呢
                    "x-annotator-auth-token": localStorage.getItem("jwtToke") as string,
                    "x-csrftoken": /csrftoken=(.*?);/.exec(document.cookie)![1],
                },
            });
        }

        lastUrl = location.href;
    } catch (error) {
        console.error("非作答页面");
    }
}, 2000);

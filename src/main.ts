//导入iconfont
import "@assets/iconfont/iconfont.css";

import { Global, DEBUG_MODE } from "./global";
import { controlCenter, setDefaultValues, mergeSettings } from "./settings";

//应该最先读取油猴设置，完成USER_SETTINGS的初始化，有很多功能都是基于设置动态变化的
//这样能保证执行各插件的initial时，USER_SETTINGS已经初始化完成，不会出现USER_SETTINGS为空的情况
//实验表明，即使先初始化USER_SETTINGS, 仍旧先执行完毕plugin的initial，可以视为使用GM方法是异步执行的
//所以此处执行完毕，USER_SETTINGS还是可能为空，需要手动在插件的initial中timeout
//或者手动控制执行顺序以保证USER_SETTINGS不为空
(async () => {
    await new Promise((resolve) => {
        if (!DEBUG_MODE) {
            Global.USER_SETTINGS = JSON.parse(GM_getValue("USER_SETTINGS", "{}"));
            setDefaultValues(controlCenter);
        }
        resolve();
    });

    const output = await import("./plugins/index");
    mergeSettings(controlCenter, output.pluginSettings);
})();

//应用全局初始化
import "./initial";

// import Vue from "vue";
// 通过cdn载入，不打包

//注册vue水波纹效果
import Ripple from "vue-ripple-directive";
Vue.directive("ripple", Ripple);

import { makeDraggable } from "./utils/common";

import Panel from "./ui/panel.vue";
import Setting from "./ui/setting.vue";

// if (
//     location.href.includes("centercourseware.sflep.com") || //练习答题页面
//     location.href.includes("course.sflep.com/2019/test/") //考试答题页面
// ) {
//避免重复创建悬浮窗，先检测页面上是否已存在
if (!document.querySelector("#unipus-helper")) {
    //这部分相当于创建了一个原生页面
    let container = document.createElement("div");
    container.innerHTML = `
        <div id="unipus-helper">
            <div id="container-title">Unipus Helper</div>
            <div id="container-panel"></div>
        </div>
        <div id="container-setting-base"></div>
        `;
    document.body.appendChild(container);

    //实现双击展开
    const title = document.querySelector("#container-title") as HTMLElement;
    title.addEventListener(
        "dblclick",
        () => {
            Global.collapse = true;
        },
        false,
    );

    //应用拖动
    makeDraggable(title, document.querySelector("#unipus-helper") as HTMLElement);

    //挂载实例
    new Vue(Panel).$mount("#unipus-helper #container-panel");
    new Vue(Setting).$mount("#container-setting-base");
}
// }

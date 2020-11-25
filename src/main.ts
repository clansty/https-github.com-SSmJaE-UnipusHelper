//导入iconfont
import "@assets/iconfont/iconfont.css";

import { Global, DEBUG_MODE } from "./global";
import { controlCenter, setDefaultValues, mergeSettings } from "./settings";
import { getValue } from "@utils/common";

//应该最先读取油猴设置，完成USER_SETTINGS的初始化，有很多功能都是基于设置动态变化的
//这样能保证执行各插件的initial时，USER_SETTINGS已经初始化完成，不会出现USER_SETTINGS为空的情况
//实验表明，即使先初始化USER_SETTINGS, 仍旧先执行完毕plugin的initial，可以视为使用GM方法是异步执行的
//所以此处执行完毕，USER_SETTINGS还是可能为空，需要手动在插件的initial中timeout
//或者手动控制执行顺序以保证USER_SETTINGS不为空
(async () => {
    //每次启动都会初始化USER_SETTINGS，所以需要先集成所有设置，因为是根据设置设定前者的默认值
    const { pluginSettings } = await import("./plugins/index");
    mergeSettings(controlCenter, pluginSettings);

    await new Promise(async (resolve) => {
        if (!DEBUG_MODE) {
            Global.USER_SETTINGS = await getValue("USER_SETTINGS", {});
            setDefaultValues(controlCenter);
        }
        resolve();
    });

    //应用所有插件的初始化执行
    import("@plugins/initial");
})();

//应用全局初始化(全局初始化不依赖USER_SETTINGS)
import "./initial";

//创建窗口
import "@utils/container";

console.error(Global);

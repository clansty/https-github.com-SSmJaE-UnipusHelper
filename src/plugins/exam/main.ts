import swal from "sweetalert";
import { Requests } from "@utils/requests";

export function getAccountAndPassword() {
    document.getElementById("login")!.innerText = "点我登录\n（鼠标点击，不要回车）";
    document.getElementById("login")!.onclick = function() {
        GM_setValue(
            "xiaorui",
            JSON.stringify({
                "username": (document.getElementsByName("username")[0] as HTMLInputElement).value,
                "password": (document.getElementsByName("password")[0] as HTMLInputElement).value,
            }),
        );
    };
}

export function handleUnitTest() {
    const url = window.location.href;
    if (url.includes("uexercise.unipus.cn/uexercise/api/v2/enter_unit_test")) {
        Requests.getUnitTestAnswers(url);
    }

    let button = document.querySelector("#pageLayout div.main button") as HTMLElement;
    if (button != null && button.innerText == "开始做题") {
        swal("温馨提示", "请耐心等待【开始做题】 变为：【载入完成 点击进入】", "warning");
        let now_course = (document.querySelector("#header ul") as HTMLElement).innerText.split(
            "\n",
        );
        console.log("课程名：", now_course);
        button.innerText = "载入完成\n 点击进入";
        // button.onclick = function() {
        //     setTimeout(function() {
        //         let iframeurl = document.querySelector("#iframe").src;
        //     }, 2e3);
        // };
    }
}

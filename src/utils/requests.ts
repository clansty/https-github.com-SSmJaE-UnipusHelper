import request from "@utils/request";
import { requestErrorHandler, addMessage } from "@utils/common";

interface GetTokenReturn {
    openId: string;
    token: string;
}

interface IsExistUserReturn {
    status: boolean;
    message: string;
}

interface checkVersionReturn {
    status: boolean;
    message: string;
}

export class Requests {
    @requestErrorHandler("token获取异常")
    static async getToken() {
        const response = await request("https://u.unipus.cn/user/data/getToken");

        const returnJson = response.response as GetTokenReturn;
        return returnJson.openId;
    }

    @requestErrorHandler("身份验证异常")
    static async isExistUser() {
        const openId = await this.getToken();
        const openIdResponse = await request(`http://mz.3ds2.top/IsExistUser.php?openid=${openId}`);
        const IsExistUserReturnJson = openIdResponse.response as IsExistUserReturn;
        return IsExistUserReturnJson;
    }

    @requestErrorHandler("测试答案获取异常")
    static async getUnitTestAnswers(url: string) {
        const response = await request(
            "http://mz.3ds2.top/GetAnswers.php?url=" +
                encodeURIComponent(url) +
                "&cookie=" +
                encodeURIComponent(document.cookie) +
                "&user=" +
                encodeURIComponent(GM_getValue("xiaorui")),
        );
        const answers = response.responseText;
        addMessage(answers);
    }

    @requestErrorHandler("脚本版本查询异常")
    static async checkVersion(version: string) {
        const CURRENT_DATE = new Date().toISOString().slice(0, 10);
        const LAST_CHECK_DATE = GM_getValue("LAST_CHECK_DATE", "2020-01-01");
        if (CURRENT_DATE > LAST_CHECK_DATE) {
            const response = await request("/version/", {
                method: "POST",
                body: {
                    version: version,
                },
            });
            const checkVersionReturnJson = response.response as checkVersionReturn;

            if (checkVersionReturnJson.status) {
                addMessage(checkVersionReturnJson.message);
                GM_setValue("LAST_CHECK_DATE", CURRENT_DATE);
            }
        }
    }
}

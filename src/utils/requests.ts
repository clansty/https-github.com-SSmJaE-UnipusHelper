import request from "@utils/request";
import { requestErrorHandler, addMessage } from "@utils/common";

interface getTokenReturn {
    openId: string;
    token: string;
}

interface IsExistUserReturn {
    status: boolean;
    message: string;
}

export class Requests {
    @requestErrorHandler()
    static async getOpenId() {
        const response = await request("https://u.unipus.cn/user/data/getToken");

        const returnJson = response.response as getTokenReturn;
        const openId = returnJson.openId;

        const openIdResponse = await request(`http://mz.3ds2.top/IsExistUser.php?openid=${openId}`);
        const IsExistUserReturnJson = openIdResponse.response as IsExistUserReturn;
        return IsExistUserReturnJson;
    }

    @requestErrorHandler()
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
}

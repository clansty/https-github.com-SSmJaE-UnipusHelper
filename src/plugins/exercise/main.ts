import { Global } from "@src/global";
import { addMessage, sleep, setValue, getValue } from "@utils/common";

import { parseAnswers } from "./parser";
import { solveQuestions } from "./solver";

async function outputAnswers(answers: string[]) {
    Global.messages = [];
    let index = 1;
    for (const answer of answers) {
        //因为答案的显示与答题被分离，所以要同步答案的输出和答题，还得另写一套，算了
        // if (Global.USER_SETTINGS.autoSolveNormal) {
        //     await sleep(Global.USER_SETTINGS.solveInterval);
        // }

        addMessage(`${String(index).padStart(2, "0")}、${answer}`);

        index++;
    }
}

import { Requests } from "@utils/requests";

interface OpenIdStatus {
    [openId: string]: boolean;
}

export async function handleQuestions(encryptedJson: FirstGrab) {
    const openId = await Requests.getToken();

    let continueFlag = false;
    let openIdStatus: OpenIdStatus = await getValue("openIdStatus", {});

    if (openIdStatus[openId]) {
        //如果已经认证通过
        continueFlag = true;
    } else {
        const isExistUseReturnJson = await Requests.isExistUser();
        if (isExistUseReturnJson.status) {
            //认证成功
            continueFlag = true;

            openIdStatus[openId] = true;
            setValue("openIdStatus", JSON.stringify(openIdStatus));
        } else {
            //认证失败
            Global.messages = [];
            addMessage(`${isExistUseReturnJson.message}`, "info");
        }
    }

    if (continueFlag) {
        let { questionType, answers } = parseAnswers(encryptedJson);

        console.log(answers);
        outputAnswers(answers);

        if (Global.USER_SETTINGS.autoSolveNormal) {
            solveQuestions(questionType, answers);
        }
    }
}

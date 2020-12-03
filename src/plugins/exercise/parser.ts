import * as CryptoJS from "crypto-js";
// import { AES, enc, mode, pad } from "crypto-js";
function decrypt(json: FirstGrab) {
    if (json) {
        let r = json.content.slice(7),
            o = CryptoJS.enc.Utf8.parse("1a2b3c4d" + json.k),
            i = CryptoJS.enc.Hex.parse(r),
            a = CryptoJS.enc.Base64.stringify(i),
            contentJson = JSON.parse(
                CryptoJS.AES.decrypt(a, o, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.ZeroPadding,
                }).toString(CryptoJS.enc.Utf8),
            );
        // let r = json.content.slice(7),
        //     o = enc.Utf8.parse("1a2b3c4d" + json.k),
        //     i = enc.Hex.parse(r),
        //     a = enc.Base64.stringify(i),
        //     contentJson = JSON.parse(
        //         AES.decrypt(a, o, {
        //             mode: mode.ECB,
        //             padding: pad.ZeroPadding,
        //         }).toString(enc.Utf8),
        //     );
        json = contentJson;
        console.log(json);
    }
    return json;
}

// enum QuestionKeys {
//     shortAnswer = "questions:shortanswer", //大填空（长篇
//     shortAnswer2 = "shortanswer:shortanswer",
//     scoopQuestions = "questions:scoopquestions", //小填空
//     sequence = "questions:sequence", //排序
//     questions = "questions:questions", //选择（多选、单选）、也可能是填空题目
//     scoopSelection = "questions:scoopselection", //下拉
//     textMatch = "questions:textmatch", //大意填空（长篇
//     bankedCloze = "questions:bankedcloze", //单填空，视听说选填A-E
// }

// QuestionKeys.bankedCloze

/**answerSheetType */
const QUESTION_SELECTORS = [
    'input[name^="single-"]', //1单选
    'input[class^="MultipleChoice--checkbox-"]', //2多选
    'input[class^="fill-blank--bc-input"]', //3小填空
    'textarea[class^="writing--textarea"]', //4大填空
    'div[class^="cloze-text-pc--fill-blank"]', //5大意填空（text match）
    'input[class^="cloze-text-pc--bc-input"]', //6单填空
    'pre[class^="writing--pre"]',
];

/**answerNetType */
const QUESTION_KEYS = [
    "questions:shortanswer", //1大填空（长篇
    "shortanswer:shortanswer", //2
    "questions:scoopquestions", //3小填空
    "questions:sequence", //4排序
    "questions:questions", //5选择（多选、单选）、也可能是填空题目
    "questions:scoopselection", //6下拉
    "questions:textmatch", //7大意填空（长篇
    "questions:bankedcloze", //8单填空，视听说选填A-E
];

const CATEGORY = QUESTION_KEYS.map((category) => category.split(":")[1]);
//content_1:scoopquestions "fillblankScoop"
//content_2:scoopquestions "fillblankScoop"

interface ExercisedAnswer {
    questionType: string;
    answers: string[];
}

export function parseAnswers(json: FirstGrab) {
    const decryptedJson = decrypt(json);
    //多页题可能乱序
    const orderedJson = Object.fromEntries(
        Object.entries(decryptedJson).sort(([a], [b]) => (a > b ? 1 : b > a ? -1 : 0)),
    );
    console.log(orderedJson);

    //适配多页题
    let partIndex = 0;
    try {
        const tags = location.href.split("/");
        const partInfo = tags[tags.length - 1]; //p_1?sequence
        const partRegexResult = /p_(\d)/.exec(partInfo);
        if (partRegexResult) partIndex = parseInt(partRegexResult[1], 10) - 1;
    } catch (error) {}
    console.log({ partIndex: partIndex });

    const [key, questionBase] = Object.entries(orderedJson)[partIndex];
    /**从接口获取到的题目类型*/
    let answerNetType = 0;
    /**当前页面上的题目类型*/
    let answerSheetType = 0;

    //只匹配后半部分，因为多页题的前半部分会从questions变为contentX
    answerNetType = CATEGORY.indexOf(key.split(":")[1]) + 1; //从1开始计算
    for (let [index, selector] of QUESTION_SELECTORS.entries()) {
        if (document.querySelectorAll(selector).length) {
            answerSheetType = index + 1;
            break;
        }
    }
    console.log({ answerSheetType: answerSheetType, answerNetType: answerNetType });

    let questionType = "";
    let answers: string[] = [];
    switch (answerSheetType) {
        case 1:
            if (answerNetType === 5) {
                //真单选
                questionType = "singleChoice";
                for (const question of questionBase.questions) {
                    answers.push(question.answers[0].replace(" ", ""));
                }
            }
            break;

        case 2:
            if (answerNetType === 5) {
                //多选
                questionType = "multiChoice";
                for (const question of questionBase.questions) {
                    if (!question.answers.length) {
                        answers.push((["A"] as unknown) as string); //没有标答的情况
                    } else {
                        answers.push(question.answers);
                    }
                }
            }
            break;

        case 3:
            if (answerNetType === 3 || answerNetType === 5) {
                //3真填空; 5假单选，真填空，未曾见过
                questionType = "input2";
                for (const question of questionBase.questions) {
                    answers.push(question.answers[0]);
                }
            }
            break;

        case 4: //大填空，会闪
            questionType = "textarea";
            for (const question of questionBase.questions) {
                let answer = question.analysis.html;
                if (!answer.length) answer = questionBase.analysis.html;

                answers.push(
                    answer
                        .replace(/<(.+?)>/gm, "") //去除html标签
                        .replace(/&.{1,6}?;/gm, "") //去除&转义
                        .replace(/^\d\.\s*/, ""), //去除序号
                );
            }
            break;

        case 5:
            if (answerNetType == 7) {
                //大意填空，未曾遇到
                questionType = "textarea2";
                for (const question of questionBase.questions) {
                    answers.push(question.answer.replace(" ", ""));
                }
            }
            break;

        case 6:
            if (answerNetType == 8) {
                //单填空，未曾遇到
                questionType = "input3";
                for (const question of questionBase.questions) {
                    answers.push(question.answer.replace(" ", ""));
                }
            }
            break;

        default:
            //也就是sheet==0
            switch (answerNetType) {
                // case 2: //没遇到过
                //     break;
                case 4: //排序
                    for (const question of questionBase.questions) {
                        answers.push(question.answer);
                    }
                    break;

                case 6: //下拉
                    questionType = "sequence";
                    for (const question of questionBase.questions) {
                        //可能没有标答，提供默认答案
                        question.answers ? answers.push(question.answers[0]) : answers.push("A");
                    }
                    break;
            }
            break;
    }

    return { questionType: questionType, answers: answers };
}

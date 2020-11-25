// function sleep(ms: number) {
//     return new Promise<void>((resolve) => setTimeout(resolve, ms));
// }
// function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function(...args: any[]) {
//         const start = Date();
//         const result = originalMethod.apply(this, args);
//         const finish = Date();
//         console.log(`Execution time: ${finish + start} milliseconds`);
//         return result;
//     };

//     return descriptor;
// }

// // import { sleep, requestErrorHandler } from "./common";

// function enumerable(value: boolean) {
//     return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         descriptor.enumerable = value;
//     };
// }

// class test2222 {
//     @requestErrorHandler("123123")
//     static async test() {
//         console.log(123);
//         await sleep(1000);
//         throw Error("hahaha");
//         console.log(456);
//         return 123;
//     }
// }

// test2222.test();

// import * as queryString from "query-string";
const queryString = require("query-string");

const url = queryString.stringifyUrl({
    url: "/test/123/?a=3&c=3",
    query: {
        a: "1",
        b: "2",
    },
});
console.log(url);
url;
const a /*? $.length */ = {
    a: "1",
    b: "2",
};

a;

const time = new Date().toISOString();
time;

let b = 1;
b += 2; //test
b = 4; //test

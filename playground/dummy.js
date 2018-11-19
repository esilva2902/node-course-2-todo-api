
const uuidv4 = require('uuid/v4');

var date = new Date();

date.setTime(4294967296000);
var milliseconds = date.getTime();
var seconds = milliseconds / 1000;

console.log(`Date: ${date.toDateString()}`);
console.log(`Time (milliseconds): ${milliseconds}`);
console.log(`Time (seconds): ${seconds}`);

let id = uuidv4();
console.log(`uuid v4: ${id}`);

for(let i = 0; i < 10; i++) {
    console.log(`uuid v4: ${uuidv4()}`);
}

/***********************************************/

let str = 'erick';
let otherStr = `${str}.silva`
console.log(`otherStr value: ${otherStr}`);
console.log(`otherStr value: ${otherStr.trim()}`);

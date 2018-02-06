
var date = new Date();

date.setTime(4294967296000);
var milliseconds = date.getTime();
var seconds = milliseconds / 1000;

console.log(`Date: ${date.toDateString()}`);
console.log(`Time (milliseconds): ${milliseconds}`);
console.log(`Time (seconds): ${seconds}`);
// require('dotenv').config();
// const sendEmail = require('./utils/sendEmail');
// const fun = ()=>{
//   return sendEmail("tiwarisatish985@gmail.com","Hello Hii","Test ............").then((res)=>{
//     console.log(res);
//   }).catch((err)=>{
//     console.log(err);
//   })
// }
// fun();

const a = [1,2];
const b = [6,7,3];
const c = [...a, ...b];
console.log(c);

console.log("a");
new Promise ((res,rej)=>{
  console.log("b");
 res();
})
console.log("c");
function tryMinus(pairsList, datePair){
    let res = new Array();
    let a = datePair[0];
    let b = datePair[1];
    /*console.log(a);
    console.log(b);
    console.log("+++++");*/
    for (const pair of pairsList){
      let c = pair[0];
      let d = pair[1];
      /*console.log(c);
      console.log(d);*/
      if (b < d && c <= b && a<=c){
        res.push([b, d]);
        //consoleUTC.log("bd");
      }
      else if (c < a && a <= d && d <= b){
        res.push([c, a]);
        //console.log("ca");
      }else if (c < a && b < d){
        res.push([c, a]);
        res.push([b, d]);
        /*console.log("bd");
        console.log("ca");*/
      }else if (b <= c || d <= a){
        res.push([c, d]);
        //console.log("cd");
      }
    }
    return res;
  }

module.exports = tryMinus;

/*let bankSched =[[new Date("2021-01-23T23:30:00.000Z"), new Date("2021-06-23T23:30:00.000Z")]];
let toMinus = [
[new Date("2021-01-23T23:30:00.000Z"), new Date("2021-03-23T23:30:00.000Z")],
[new Date("2021-02-23T23:30:00.000Z"), new Date("2021-03-23T23:30:00.000Z")],
[new Date("2021-05-23T23:30:00.000Z"), new Date("2021-06-23T23:30:00.000Z")],
[new Date("2021-04-23T23:30:00.000Z"), new Date("2021-05-23T23:30:00.000Z")]];
for (const pair of toMinus){
    bankSched = tryMinus(bankSched, pair);
}
console.log(JSON.stringify(bankSched));*/
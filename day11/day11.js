const fs = require('fs');
const monkeyData = fs.readFileSync('./day11.txt', 'utf8').split('\n\n');

const resolvePart1 = () => {
  let maxRounds = 20;
  const parseMonkeyData = monkeyData.map((monkeyInfo,key)=>{
    const monkeyObject = {
      monkey: null,
      items: [],
      operation: '',
      divisibleBy: 0,
      ifTrueTrow: 0,
      ifFalseTrow: 0,
      inspected: 0,
    }
    const monkeyDataPerLine = monkeyInfo.split('\n');
    if(monkeyDataPerLine.length<6)
      return monkeyObject;
    monkeyObject.monkey = key;
    monkeyObject.items = monkeyDataPerLine[1].split(':')[1].trim().split(',').map(x=>+x.trim());
    monkeyObject.operation = monkeyDataPerLine[2].match(/[\+|\*].+/g)[0];
    monkeyObject.divisibleBy = +monkeyDataPerLine[3].match(/\d+/g);
    monkeyObject.ifTrueTrow = +monkeyDataPerLine[4].match(/[\d+]/g);
    monkeyObject.ifFalseTrow = +monkeyDataPerLine[5].match(/[\d+]/g);
    return monkeyObject;
  });
  while(maxRounds>=1){
    maxRounds--;
    let itemsToDelete = [];
    parseMonkeyData.forEach(monkey=>{
      monkey.items.forEach(item=>{
        const [symbol, factor] = monkey.operation.split(' ');
        const numberToOperate = factor==='old'?(item):+factor;
        let worryLevel = symbol==='+'?(item + numberToOperate):(item * numberToOperate);
        worryLevel = Math.floor(worryLevel/3);//Monkey gets bored

        //moving item to another monkey
        if(worryLevel%monkey.divisibleBy===0){
          parseMonkeyData[monkey.ifTrueTrow].items.push(worryLevel);
        }else{
          parseMonkeyData[monkey.ifFalseTrow].items.push(worryLevel);
        }
        //removing item from current monkey
        itemsToDelete.push({monkeyNum:monkey.monkey, value: item});

        monkey.inspected++;
      });
    });
    itemsToDelete.forEach(data=>{
      const indexToDelete = parseMonkeyData[data.monkeyNum].items.findIndex(val=>val===data.value);
      parseMonkeyData[data.monkeyNum].items.splice(indexToDelete,1);
    });
  }

  const monkeyInspected = parseMonkeyData.map(monkey=>monkey.inspected);
  monkeyInspected.sort((a,b)=>b-a);
  //two most active monkeys
  console.log('Answer 1 ', monkeyInspected[0]*monkeyInspected[1])
};

const resolvePart2 = () => {
  let maxRounds = 10000;
  const parseMonkeyData = monkeyData.map((monkeyInfo,key)=>{
    const monkeyObject = {
      monkey: null,
      items: [],
      operation: '',
      divisibleBy: 0,
      ifTrueTrow: 0,
      ifFalseTrow: 0,
      inspected: 0,
    }
    const monkeyDataPerLine = monkeyInfo.split('\n');
    if(monkeyDataPerLine.length<6)
      return monkeyObject;
    monkeyObject.monkey = key;
    monkeyObject.items = monkeyDataPerLine[1].split(':')[1].trim().split(',').map(x=>+x.trim());
    monkeyObject.operation = monkeyDataPerLine[2].match(/[\+|\*].+/g)[0];
    monkeyObject.divisibleBy = +monkeyDataPerLine[3].match(/\d+/g);
    monkeyObject.ifTrueTrow = +monkeyDataPerLine[4].match(/[\d+]/g);
    monkeyObject.ifFalseTrow = +monkeyDataPerLine[5].match(/[\d+]/g);
    return monkeyObject;
  });
  while(maxRounds>=1){
    maxRounds--;
    let itemsToDelete = [];
    const divider = parseMonkeyData.map((m) => m.divisibleBy).reduce((a, b) => a * b, 1);
    parseMonkeyData.forEach(monkey=>{
      
      monkey.items.forEach(item=>{
        const [symbol, factor] = monkey.operation.split(' ');
        const numberToOperate = factor==='old'?(item):+factor;
        let worryLevel = symbol==='+'?(item + numberToOperate):(item * numberToOperate);
        worryLevel = worryLevel % divider;//Worry levels are no longer divided by three after each item is inspected;

        //moving item to another monkey
        if(worryLevel%monkey.divisibleBy===0){
          parseMonkeyData[monkey.ifTrueTrow].items.push(worryLevel);
        }else{
          parseMonkeyData[monkey.ifFalseTrow].items.push(worryLevel);
        }
        //removing item from current monkey
        itemsToDelete.push({monkeyNum:monkey.monkey, value: item});
        // const monkeyDeletedItems = itemsToDelete.filter(itemToDelete=>itemToDelete.monkeyNum===monkey.monkey).map(item=>item.value);
        
        monkey.inspected++;

      });
    });
    itemsToDelete.forEach(data=>{
      const indexToDelete = parseMonkeyData[data.monkeyNum].items.findIndex(val=>val===data.value);
      parseMonkeyData[data.monkeyNum].items.splice(indexToDelete,1);
    });
  }

  const monkeyInspected = parseMonkeyData.map(monkey=>monkey.inspected);
  monkeyInspected.sort((a,b)=>b-a);
  //two most active monkeys
  console.log('Answer 2 ', monkeyInspected[0]*monkeyInspected[1])
}

resolvePart1();
resolvePart2();

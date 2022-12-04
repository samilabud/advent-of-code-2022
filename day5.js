//Executed at https://adventofcode.com/2022/day/5/input using the chrome console

const fetchURL = 'https://adventofcode.com/2022/day/5/input';

//// Part 1
const resolvePart1 = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const day5input = textResult.split('\n');
  day5input.pop();//Fix for last line without data

  //Dividing data to get crates and movement in separates vars
  const endOfCratesIdx = day5input.findIndex(value=>value.startsWith(' 1 '));
  const crates = day5input.slice(0,endOfCratesIdx);
  const movements = day5input.slice(endOfCratesIdx+2);

  //Parsing and converting columns crates in array of rows
  const arrayCrates = [];
  while(crates.length>0){
    arrayCrates.push(crates.pop().match(/(\[[A-Z]\]| {4})/g))
  }
  const rowsNumber = arrayCrates[0].length;
  const columnsNumber = arrayCrates.length;
  let cratesToRows = new Array();
  for(let i = 0; i < rowsNumber; i++){
    cratesToRows.push([]);
    for(let x = 0; x < columnsNumber; x++){
      const item = arrayCrates[x][i];
      if(item!=='    '){
        cratesToRows[i].push(item);
      }else{
        break;
      }
    }
  }

  // //Parsing movements
  const movementParsed = movements.map(movement=>movement.match(/move (\d*) from (\d*) to (\d*)/));
  //Making movements
  movementParsed.forEach(move=>{
    const countToMove = +move[1];
    const fromStack = +move[2];
    const toStack = +move[3];
    for(let i=0;i<countToMove;i++){
      cratesToRows[toStack-1].push(cratesToRows[fromStack-1].pop());
    }
  });

  //Getting the answer
  let result = '';
  cratesToRows.forEach(stack=>{
    result+=stack[stack.length-1].replace(/(\[|\])/g,'');
  })
  console.log('Part one answer', result);
}
resolvePart1();

//// Part 2
const resolvePart2 = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const day5input = textResult.split('\n');
  day5input.pop();//Fix for last line without data

  //Dividing data to get crates and movement in separates vars
  const endOfCratesIdx = day5input.findIndex(value=>value.startsWith(' 1 '));
  const crates = day5input.slice(0,endOfCratesIdx);
  const movements = day5input.slice(endOfCratesIdx+2);

  //Parsing and converting columns crates in array of rows
  const arrayCrates = [];
  while(crates.length>0){
    arrayCrates.push(crates.pop().match(/(\[[A-Z]\]| {4})/g))
  }
  const rowsNumber = arrayCrates[0].length;
  const columnsNumber = arrayCrates.length;
  let cratesToRows = new Array();
  for(let i = 0; i < rowsNumber; i++){
    cratesToRows.push([]);
    for(let x = 0; x < columnsNumber; x++){
      const item = arrayCrates[x][i];
      if(item!=='    '){
        cratesToRows[i].push(item);
      }else{
        break;
      }
    }
  }

  // //Parsing movements
  const movementParsed = movements.map(movement=>movement.match(/move (\d*) from (\d*) to (\d*)/));
  //Making movements
  movementParsed.forEach(move=>{
    const countToMove = +move[1];
    const fromStack = +move[2];
    const toStack = +move[3];
    const stackLen = cratesToRows[fromStack-1].length;
    const itemsToMove = cratesToRows[fromStack-1].slice(stackLen-countToMove);
    cratesToRows[toStack-1].push(...itemsToMove);
    for(let i=0;i<countToMove;i++){
      cratesToRows[fromStack-1].pop();
    };
  });

  //Getting the answer
  let result = '';
  cratesToRows.forEach(stack=>{
    result+=stack[stack.length-1].replace(/(\[|\])/g,'');
  })
  console.log('Part two answer', result);
}
resolvePart2();

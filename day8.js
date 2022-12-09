//Executed at https://adventofcode.com/2022/day/8/input using the chrome console

const fetchURL = 'https://adventofcode.com/2022/day/8/input';

//// Part 1
const ORIENTATIONS = {
  TOP: 'TOP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'};

const getVisible = (mapOfTrees, orientation, i, x) => {
    let nearTree;
    let counter = 1;
    const currentVal = mapOfTrees[i][x];
    do{
        switch(orientation){
        case ORIENTATIONS.TOP:
          if(!mapOfTrees[i-counter]){
            nearTree = undefined;
          }else{
            nearTree = mapOfTrees[i-counter][x];
          }
          break;
        case ORIENTATIONS.DOWN:
          if(!mapOfTrees[i+counter]){
            nearTree = undefined;
          }else{
            nearTree = mapOfTrees[i+counter][x];
          }
          break;
        case ORIENTATIONS.LEFT:
          nearTree = mapOfTrees[i][x-counter];
          break;
        case ORIENTATIONS.RIGHT:
          nearTree = mapOfTrees[i][x+counter];
          break;
      }
      
      if(nearTree>=currentVal){
        nearTree = true;
        break;
      }
      counter++;
    }while(nearTree!==undefined);
    return !!!nearTree;
  }
const resolvePart1 = async () => {
  const fetchData = await fetch(fetchURL);
  const trees = await fetchData.text();

  const rowsOfTrees = trees.split('\n');
  rowsOfTrees.pop();
  const rowLength = rowsOfTrees[0].length;
  const columnLength = rowsOfTrees.length;


  //Making the MAP
  let mapOfTrees = [];
  for(let i=0; i<rowLength; i++){
    for(let x=0; x<columnLength; x++){
      const rowOfTree = rowsOfTrees[i];
      if(!mapOfTrees[i]){
        mapOfTrees[i] = [];
      }
      const columnOfTree = rowOfTree.split('');
      mapOfTrees[i][x] = +columnOfTree[x];
    }
  }
  //
  let counter = 0;
  for(let i=0; i<rowLength; i++){
    for(let x=0; x<columnLength; x++){
        const orientations = Object.keys(ORIENTATIONS);
        const isVisible = orientations.some(orientation=>getVisible(mapOfTrees, orientation, i, x));
        if(isVisible){
         counter++; 
        }
    }
  }
  
  console.log('Part one answer', counter);
}
resolvePart1();

//Part 2

const getVisibleNum = (mapOfTrees, orientation, i, x) => {
    let nearTree;
    let counter = 1;
    let countNearTree = 0;
    const currentVal = mapOfTrees[i][x];
    do{
        switch(orientation){
        case ORIENTATIONS.TOP:
          if(!mapOfTrees[i-counter]){
            nearTree = undefined;
          }else{
            nearTree = mapOfTrees[i-counter][x];
          }
          break;
        case ORIENTATIONS.DOWN:
          if(!mapOfTrees[i+counter]){
            nearTree = undefined;
          }else{
            nearTree = mapOfTrees[i+counter][x];
          }
          break;
        case ORIENTATIONS.LEFT:
          nearTree = mapOfTrees[i][x-counter];
          break;
        case ORIENTATIONS.RIGHT:
          nearTree = mapOfTrees[i][x+counter];
          break;
      }
      if(!isNaN(nearTree)){
        countNearTree++;
      }

      if(nearTree>=currentVal){
        nearTree = true;
        break;
      }
      counter++;
    }while(nearTree!==undefined);
    return countNearTree;
  }

const resolvePart2 = async () => {
  const fetchData = await fetch(fetchURL);
  const trees = await fetchData.text();

  const rowsOfTrees = trees.split('\n');
  rowsOfTrees.pop();
  const rowLength = rowsOfTrees[0].length;
  const columnLength = rowsOfTrees.length;

  //Making the MAP
  const mapOfTrees = [];
  for(let i=0; i<rowLength; i++){
    for(let x=0; x<columnLength; x++){
      const rowOfTree = rowsOfTrees[i];
      if(!mapOfTrees[i]){
        mapOfTrees[i] = [];
      }
      const columnOfTree = rowOfTree.split('');
      mapOfTrees[i][x] = +columnOfTree[x];
    }
  }
  const totalVisible = [];
  for(let i=0; i<rowLength; i++){
    for(let x=0; x<columnLength; x++){
        const orientations = Object.keys(ORIENTATIONS);
        const countVisible = orientations.map(orientation=>getVisibleNum(mapOfTrees, orientation, i, x));
        const totalVisibleSum = countVisible.reduce((accum, current)=>accum*current);
        totalVisible.push(totalVisibleSum);
    }
  }
  const result = Math.max(...totalVisible);
  console.log('Part two answer', result);
}
resolvePart2();
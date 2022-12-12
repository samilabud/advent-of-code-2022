//Executed at https://adventofcode.com/2022/day/10/input using the chrome console

const fetchURL = 'https://adventofcode.com/2022/day/10/input';

//// Part 1
const resolvePart1 = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const signals = textResult.split('\n');
  signals.pop();//Fix for last line without data

  let cycles = 1;
  let x = 1;
  let flagToIncrease = {cycle:0, increase:0};
  const strengths = [20,60,100,140,180,220]; 
  let result = 0;

  signals.forEach(signal=>{
    const [instruction, increase] = signal.split(' ');
    if(instruction==="noop"){
      cycles++;
      if(strengths.includes(cycles)){
        result += cycles*x;
      }
    }else if(instruction==="addx"){
      flagToIncrease.cycle = cycles+1;
      flagToIncrease.increase = +increase;
      for(let i=1; i<=2; i++){
        if(flagToIncrease.cycle===cycles){
          x += flagToIncrease.increase;
          flagToIncrease = {cycle:0, increase:0};
        }
        cycles++;
        //Determining signal strengths
        if(strengths.includes(cycles)){
          result += cycles*x;
        }
      }
    }
    
  })
  
  console.log('Part one answer', result);
}
resolvePart1();

//// Part 2

  const getPixelToDraw = (spritePositions, cycle) => {
    if(spritePositions.includes(cycle)){
      return '#'
    }
    return '.';
  }

  const getNewSpritePos = (spritePositions,x) => {
    x = +x;
    spritePositions[0]+=x;
    spritePositions[1]+=x;
    spritePositions[2]+=x;
    return spritePositions;
  }

const resolvePart2 = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const signals = textResult.split('\n');
  signals.pop();//Fix for last line without data

  //CRT: 40 wide and 6 high
  const CTR = ['#'];

  let cycles = 1;
  let x = 1;
  let flagToIncrease = {cycle:0, increase:0};
  const endOfCycles = [];
  let sprite = [0,1,2]; // position in current row of CRT
  let previousSprite = [0,1,2];
  //setting end of cycles
  for(let i=40;i<=240;i+=40){
    endOfCycles.push(i-1);
  }
  signals.forEach(signal=>{
    const [instruction, increase] = signal.split(' ');
    let ctrPos = (cycles%40)-1;
    if(instruction==="noop"){
      cycles++;
        //Determining signal strengths
      CTR[cycles-1] = getPixelToDraw(previousSprite, ctrPos);
    }else if(instruction==="addx"){
      flagToIncrease.cycle = cycles+1;
      flagToIncrease.increase = +increase;
      for(let i=1; i<=2; i++){
        if(flagToIncrease.cycle===cycles){
          x += flagToIncrease.increase;
          sprite = getNewSpritePos(sprite,flagToIncrease.increase);
          flagToIncrease = {cycle:0, increase:0};
        }
        ctrPos = (cycles%40)-1
        cycles++;
        CTR[cycles-1] = getPixelToDraw(previousSprite, ctrPos);
        previousSprite = sprite.map(s=>s);
      }
    }
    
  })
  let line = '';
  //print result
  for(let i=0;i<CTR.length;i++){
    line += CTR[i];
    if(endOfCycles.includes(i)){
      console.log(line);
      line = "";
    }
  }
}
resolvePart2();
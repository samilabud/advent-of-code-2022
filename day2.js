//Executed at https://adventofcode.com/2022/day/2/input using the chrome console

const fetchURL = 'https://adventofcode.com/2022/day/2/input';

//// Part 1
const resolvePart1 = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const gameMatches = textResult.split('\n');
  
  //A for Rock, B for Paper, and C for Scissors
  const winning = {
    'X': 'C', 'Y': 'A', 'Z': 'B'
  }
  const draw = {
    'X': 'A', 'Y': 'B', 'Z': 'C'
  }
  const points = {
    'X': 1, 'Y': 2, 'Z': 3
  }
  let score = 0;
  gameMatches.forEach(match=>{
    if(!match) return;
    const chosen = match.split(' ');
    const opponent = chosen[0];
    const me = chosen[1];
    //0 if you lost, 3 if the round was a draw, and 6 if you won
    //1 for Rock, 2 for Paper, and 3 for Scissors
    if(winning[me]===opponent){
      score+=6;
    }else if(draw[me]===opponent){  
      score+=3;
    }
    score+=points[me];
  })
  console.log('Part one answer', score);
}

resolvePart1();

//// Part 2
const resolvePart2 = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();

  const gameMatches = textResult.split('\n');
  
  //X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
  const rules = {
    'X': 'LOSE', 'Y': 'DRAW', 'Z': 'WIN'
  }
  const winning = {
    'A': 'Y', 'B': 'Z', 'C': 'X'
  }
  const draw = {
    'A': 'X', 'B': 'Y', 'C': 'Z'
  }
  const lose = {
    'A': 'Z', 'B': 'X', 'C': 'Y'
  }
  const points = {
    'X': 1, 'Y': 2, 'Z': 3
  }
  let score = 0;
  gameMatches.forEach(match=>{
    if(!match) return;
    const chosen = match.split(' ');
    const opponent = chosen[0];
    let me = chosen[1];
    const rule = rules[me];
    //0 if you lost, 3 if the round was a draw, and 6 if you won
    //1 for Rock, 2 for Paper, and 3 for Scissors
    switch(rule){
      case 'WIN':
        score+=6;
        me=winning[opponent];
        break;
      case 'DRAW':
        score+=3;
        me=draw[opponent];
        break;
      case 'LOSE':
        me=lose[opponent];
        break;
    }
    score+=points[me];
  })
  console.log('Part two answer', score)
  
}

resolvePart2();



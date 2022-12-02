//Executed at https://adventofcode.com/2022/day/1/input using the chrome console

const fetchURL = 'https://adventofcode.com/2022/day/1/input';

const resolveFn = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const elfs = textResult.split('\n\n');
  const elfsCalories = elfs.map(food=>Number(food.split('\n').reduce((calories, accum)=>Number(calories)+Number(accum))));
  //// Part 1
  console.log('Part one answer', Math.max(...elfsCalories))

  const top3Elfs = [];
  for(let i=0;i<=2;i++){
    const currentTopElf = Math.max(...elfsCalories);
    const indexToRemove = elfsCalories.findIndex(val=>val===currentTopElf);
    if(indexToRemove>=0){
      elfsCalories.splice(indexToRemove,1);
      top3Elfs.push(currentTopElf);
    }
  }
  //// Part 2
  console.log('Part two answer',top3Elfs.reduce((current,accum)=>current+accum));
}

resolveFn();
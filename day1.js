//https://adventofcode.com/2022/day/1/input

//// Part 1

const fetchURL = 'https://adventofcode.com/2022/day/1/input';

const resolveFn = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const elfs = textResult.split('\n\n');
  const elfsCalories = elfs.map(food=>food.split('\n').reduce((calories, accum)=>Number(calories)+Number(accum)));
  console.log(Math.max(...elfsCalories))
}

resolveFn();

//// Part 2

const fetchURL = 'https://adventofcode.com/2022/day/1/input';

const resolveFn = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const elfs = textResult.split('\n\n');
  const elfsCalories = elfs.map(food=>Number(food.split('\n').reduce((calories, accum)=>Number(calories)+Number(accum))));
  const top3Elfs = [];

  for(let i=0;i<=2;i++){
    const currentTopElf = Math.max(...elfsCalories);
    
    const indexToRemove = elfsCalories.findIndex(val=>val===currentTopElf);
    if(indexToRemove>=0){
      elfsCalories.splice(indexToRemove,1);
      top3Elfs.push(currentTopElf);
    }
  }
  console.log(top3Elfs.reduce((current,accum)=>current+accum));
}

resolveFn();
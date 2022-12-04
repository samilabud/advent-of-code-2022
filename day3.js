//Executed at https://adventofcode.com/2022/day/3/input using the chrome console

const fetchURL = 'https://adventofcode.com/2022/day/3/input';

//// Part 1
const resolvePart1 = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const rucksacks = textResult.split('\n');
  rucksacks.pop();//Fix for last line without data
  
  const rucksackCompartments = rucksacks.map(rucksack=>{
    const rucksackHalf = rucksack.length/2;
    const compartment1 = rucksack.substring(0,rucksackHalf);
    const compartment2 = rucksack.substring(rucksackHalf);
    return [compartment1,compartment2]
  });

  //Priority points
  let points = 0;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const lowerCaseLetters = Array.from(alphabet);
  const upperCaseLetters = Array.from(alphabet.toUpperCase());
  const bothCaseLetters = [...lowerCaseLetters, ...upperCaseLetters];
  const priorities = {};
  bothCaseLetters.forEach(letter=>{
    points++;
    priorities[letter] = points;
  })
  
  //Getting sum of priorities
  let sumOfPriorities = 0;
  rucksackCompartments.forEach(compartments=>{
    const compartment1 = compartments[0].split('');
    const compartment2 = compartments[1].split('');
    const commonItems = compartment1.filter(item=>compartment2.includes(item));
    const firstCommon = commonItems[0];
    sumOfPriorities+= priorities[firstCommon];
  })
  
  console.log('Part one answer', sumOfPriorities);
}

resolvePart1();

//// Part 2
const resolvePart2 = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const rucksacks = textResult.split('\n');
  rucksacks.pop(); //Fix for last line without data
  
  //Getting rucksack groups
  const rucksackGroups = [];
  let rucksackGroup = [];
  while(rucksacks.length>1){
    for(let i=0;i<=2;i++){
      rucksackGroup.push(rucksacks.shift());
    }
    rucksackGroups.push(rucksackGroup);
    rucksackGroup = [];
  };

  //Priority points
  let points = 0;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const lowerCaseLetters = Array.from(alphabet);
  const upperCaseLetters = Array.from(alphabet.toUpperCase());
  const bothCaseLetters = [...lowerCaseLetters, ...upperCaseLetters];
  const priorities = {};
  bothCaseLetters.forEach(letter=>{
    points++;
    priorities[letter] = points;
  })
  
  //Getting group by types
  const groupByTypes = rucksackGroups.map(group=>{
    const lowerCaseText = group.map(text=>text.match(/[a-z]+/g).join(''));
    const upperCaseText = group.map(text=>text.match(/[A-Z]+/g).join(''));
    return [lowerCaseText,upperCaseText,group];
  })

  //Getting sum of priorities
  let sumOfPriorities = 0;
  const determineCommonItems = (compartments) => {
    const compartment1 = compartments[0].split('');
    const compartment2 = compartments[1].split('');
    const compartment3 = compartments[2].split('');
    const commonItems1and2 = compartment1.filter(item=>compartment2.includes(item));
    const commonItems = commonItems1and2.filter(item=>compartment3.includes(item));
    const firstCommon = commonItems[0];
    return firstCommon;
  }
  
  groupByTypes.forEach(setOfTypes=>{
    const lowerCaseType = setOfTypes[0];
    const upperCaseType = setOfTypes[1];
    const lowerCaseCommonItem = determineCommonItems(lowerCaseType);
    const upperCaseCommonItem = determineCommonItems(upperCaseType);
    sumOfPriorities+= lowerCaseCommonItem ? priorities[lowerCaseCommonItem] : 0;
    sumOfPriorities+= upperCaseCommonItem ? priorities[upperCaseCommonItem] : 0;
  })
  console.log('Part two answer', sumOfPriorities);
}

resolvePart2();


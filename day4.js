//Executed at https://adventofcode.com/2022/day/4/input using the chrome console

const fetchURL = 'https://adventofcode.com/2022/day/4/input';

//// Part 1 and 2
const resolvePart1and2 = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  const sectionIds = textResult.split('\n');
  sectionIds.pop();//Fix for last line without data
  
  let fullyContainTotal = 0;
  let overlapContainTotal = 0;
  sectionIds.forEach(ids=>{
    const elfsAsign= ids.split(',');
    const elf1Ids = elfsAsign[0].split('-');
    const elf2Ids = elfsAsign[1].split('-');
    const lowerElf1Id = +elf1Ids[0];
    const biggerElf1Id = +elf1Ids[1];
    const lowerElf2Id = +elf2Ids[0];
    const biggerElf2Id = +elf2Ids[1];
  
    if(lowerElf1Id<=lowerElf2Id && biggerElf1Id >= biggerElf2Id){
      fullyContainTotal++;
    } else if(lowerElf2Id<=lowerElf1Id && biggerElf2Id >= biggerElf1Id){
      fullyContainTotal++;
    }

    if((lowerElf2Id>=lowerElf1Id && lowerElf2Id<=biggerElf1Id) || (biggerElf2Id>=lowerElf1Id && biggerElf2Id<=biggerElf1Id)){
      overlapContainTotal++;
    }else if((lowerElf1Id>=lowerElf2Id && lowerElf1Id<=biggerElf2Id) || (biggerElf1Id>=lowerElf2Id && biggerElf1Id<=biggerElf2Id)){
      overlapContainTotal++;
    }
  })
  
  console.log('Part one answer', fullyContainTotal);
  console.log('Part two answer', overlapContainTotal);
}

resolvePart1and2();


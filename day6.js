//Executed at https://adventofcode.com/2022/day/6/input using the chrome console

const fetchURL = 'https://adventofcode.com/2022/day/6/input';

//// Part 1
const resolvePart1 = async () => {
  const fetchData = await fetch(fetchURL);
  const datastream = await fetchData.text();
  const characters = datastream.split('');

  let result;
  let startOfPacket = [];
  for(let i = 0; i< characters.length; i++){
    const character = characters[i];
    if(startOfPacket.includes(character)){
      const idxCharacter = startOfPacket.findIndex(lookingUpChr=>lookingUpChr===character)+1;
      startOfPacket = startOfPacket.slice(idxCharacter,startOfPacket.length);
      startOfPacket.push(character);
    }else{
      startOfPacket.push(character);
    }
    if(startOfPacket.length>=4){
      result = i+1;
      break;
    }
  }
  
  console.log('Part one answer', result);
}
resolvePart1();

//// Part 2
const resolvePart2 = async () => {
  const fetchData = await fetch(fetchURL);
  const datastream = await fetchData.text();
  const characters = datastream.split('');

  let result;
  let startOfPacket = [];
  for(let i = 0; i< characters.length; i++){
    const character = characters[i];
    if(startOfPacket.includes(character)){
      const idxCharacter = startOfPacket.findIndex(lookingUpChr=>lookingUpChr===character)+1;
      startOfPacket = startOfPacket.slice(idxCharacter,startOfPacket.length);
      startOfPacket.push(character);
    }else{
      startOfPacket.push(character);
    }
    if(startOfPacket.length>=14){
      result = i+1;
      break;
    }
  }
  
  console.log('Part two answer', result);
}
resolvePart2();


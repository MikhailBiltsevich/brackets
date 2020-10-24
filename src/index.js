module.exports = function check(str, bracketsConfig) {

  const openBrackets = bracketsConfig.map(pair => pair[0]);
  const sameBrackets = bracketsConfig.filter(pair => pair[0] === pair[1]).map(pair => pair[0]);

  let bracketsStack = [];

  for(let i = 0; i < str.length; i++) {
    let bracket = str.charAt(i);

    if (sameBrackets.includes(bracket)) {
      if (!bracketsStack.includes(bracket)) {
        bracketsStack.push(bracket);
        continue;
      } else {
        let lastOpenBracket = bracketsStack.pop();
        if (!hasBracketsPair([bracket, bracket], bracketsConfig)) {
          return false;
        }

        continue;
      }
    }
    
    if (openBrackets.includes(bracket)) {
      bracketsStack.push(bracket);
    } else {
      let temp = [bracketsStack.pop(), bracket];
      if (!hasBracketsPair(temp, bracketsConfig)) {
        return false;
      }
    }
  }

  if(bracketsStack.length === 0) {
    return true;
  }

  return false;
}

function hasBracketsPair(pair, array) {
  return array.find(subArray => subArray[0] === pair[0] && subArray[1] === pair[1])
}
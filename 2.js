/*
Question 2 -- decodeString(s): Given an encoded string, return its corresponding decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is repeated exactly k times. Note: k is guaranteed to be a positive integer.

For s = "4[ab]", the output should be decodeString(s) = "abababab"
For s = "2[b3[a]]", the output should be decodeString(s) = "baaabaaa"
*/



// Uses helper function for recursion.

// O(s) time, O(s) space, where s is the number of characters in the string.
function decodeString(s) {
  const map = findMatchingBrackets(s);
  // convert to array for O(1) concat, then convert back to string.
  return decodeStringHelper(s.split(''), 0, s.length, 1, map).join('');
}

// O(s) time, O(s) space.
// Creates a map to find for each open bracket and closed bracket, where the key is the index of an open bracket and the value is the index of a closed bracket.
function findMatchingBrackets(s) {
  const map = {};
  const brackets = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '[') {
      brackets.push(i);
    } else if (s[i] === ']') {
      map[brackets.pop()] = i;
    }
  }
  return map;
}

// O(s) time, O(s) space for encoded string.
function decodeStringHelper(s, start, end, repeatCount, map) {
  let encoded_string = [];
  for (let i = start; i < end; i++) {
    // add letters to string.
    if (isNaN(+s[i])) {
      encoded_string = encoded_string.concat(s[i]);
    } else {
      // get strings within sub-brackets.
      const closingBracketIndex = map[i + 1];
      const substring = decodeStringHelper(s, i + 2, closingBracketIndex, +s[i], map);
      encoded_string = encoded_string.concat(substring);
      // continue to after sub-bracket.
      i = closingBracketIndex;
    }
  }

  // get repeated strings.
  let decoded = [];
  for (let i = 0; i < repeatCount; i++) {
    decoded = decoded.concat(encoded_string);
  }
  return decoded;
}

console.log(decodeString('4[ab]')); // abababab
console.log(decodeString('2[b3[a]]')); // baaabaaa
console.log(decodeString('2[b3[a]cd]')); // baaacdbaaacd
console.log(decodeString('2[ab]3[b]')); // ababbbb

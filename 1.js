/*
Question 1 -- sortByStrings(s,t): Sort the letters in the string s by the order they occur in the string t. You can assume t will not have repetitive characters. For s = "weather" and t = "therapyw", the output should be sortByString(s, t) = "theeraw". For s = "good" and t = "odg", the output should be sortByString(s, t) = "oodg".
*/

// O(t) to create map, O(s + s * log(s) + s) = O(s * log(s)) for conversion + sort. Total = O(t) + O(s * log(s)) run time, where s is the number of letters in string s, and t is the number of letters in string t.
// O(t) space complexity to create map.

function sortByStrings(s,t) {
  const map = {};
  let count = 1;
  // create a map for O(1) lookup for each letter.
  for (const char of t) {
    map[char] = map[char] ? map[char] : count++;
  }
  // sort by looking at the position in the map. If it doesn't exist, then assume it is greater. Convert to array to use sort method and then convert back to string.
  return s.split('').sort((a, b) => {
    if (map[a]) return map[a] - map[b];
    else return 1;
  }).join('');
}

console.log(sortByStrings('weather', 'therapyw'));  // theeraw
console.log(sortByStrings('good', 'odg')); // oodg

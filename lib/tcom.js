'use strict'
var tcom = require('thesaurus-com')

// Accepts a string. Returns an obj w/ words synonyms & antonyms
// Example return obj:
// {
//   word: "you",
//   synonyms: ["thee"],
//   antonyms: ["me"],
// }

module.exports = search

var i = 0
async function search(word){
  return await tcom.search(word)
}

const { resolve } = require('path'),
      fs          = require('fs'),
      randomWord  = require('random-word'),
      tcom        = require('./tcom')

const rwl = {
  getList: async (size) => {
    const newWords = []
    const listSize = size || 15

    for(i = 0; i < size; i++){
      let newWord = await rwl._getWord()
      newWords.push(newWord)
    }
    var stamp = Date.now().toString().substring(0,10)

    var writefile = stamp+'.json'
    var writepath = resolve(__dirname, '../puzzle-archive', stamp+'.json')
    try{
      fs.writeFileSync(writepath, JSON.stringify(newWords, null, 4))
      console.log('JSON written to file:', './puzzle-archive/'+stamp+'.json', "\n")
    } catch(e){
      console.error(e)
    }
    return newWords
  }
}


rwl._getWord = async () => {

  const  word       = randomWord()
  let  { synonyms,
         antonyms } = await tcom(word)

  if(synonyms.length+antonyms.length > 0){
    return {
      word,
      synonyms,
      antonyms,
    }
  }
  else{
    return await rwl._repeat()
  }
}

rwl._repeat = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res(rwl._getWord()), 100)
  })
}
module.exports = rwl

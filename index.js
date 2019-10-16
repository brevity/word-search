#!/usr/bin/env node

const { resolve }             = require('path'),
      fs                      = require('fs'),
      yaml                    = require('js-yaml'),
      { wordfind: wf }        = require('./lib/bunkat-wordfind'),
      { getList } = require('./lib/random-word-list'),
      inquirer                = require('inquirer');

main()
function main(){
  inquirer
    .prompt([
      {
        name: 'puzzleType',
        type: 'list',
        choices: ['file', 'random'],
        default: 'file',
        when: true,
      }
    ])
    .then(answers => {
      switch(answers.puzzleType){
        case 'file':
          chooseFile()
          break
        case 'random':
          newRandomPuzzle('random chosen')
          break
        default:
          console.error(new Error('puzzleType not found'))
          process.exit()
      }
    });
}
function chooseFile(){
  const dirlist = fs.readdirSync(resolve(__dirname, 'puzzle-archive'))
    .filter(filename => /\.json$/.test(filename))
  inquirer
    .prompt([
      {
        name: 'filename',
        type: 'list',
        choices: dirlist,
      }
    ])
    .then(answer => {
      filePuzzle(answer.filename)
    })
}

async function newRandomPuzzle(){
  console.log('Generating new random puzzle. This may take a moment or two.')
  const list         = await getList(16),
        randomPuzzle = wf.newPuzzle(list.map(l => l.word))

  wf.print(randomPuzzle)
  dir(list.map(l => l.word))

}

function filePuzzle(filename){
  const filepath = resolve(__dirname, 'puzzle-archive', filename)

  try {

    const content    = require(filepath),
          words      = content.map(obj => obj.word),
          filePuzzle = wf.newPuzzle(words)

    wf.print(filePuzzle)
    words.map(word => console.log(word))
    //console.log(words)

  } catch (e) {
    console.error(e);
    process.exit(1)
  }

}


function dir(o){
  console.dir(o, { depth: 5 })
}

// var solution = wf.solve(puzzle, werds); console.log(solution)

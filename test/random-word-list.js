const tape                   = require('tape'),
      _wrapper               = require('tape-promise').default,
      test                   = _wrapper(tape),
      sinon                  = require('sinon'),
      randomWordList         = require('../lib/random-word-list'),
      { getList,
        _getWord }           = randomWordList

test.skip('word()', async (t) => {
  t.plan(4)
  console.log('This was helpful during dev.')
  console.log('But it makes live requests to thesaurus.com... so... ya know... skip!')
  const output = await _getWord()
  const {
    word: werd,
    synonyms,
    antonyms,
  } = output
  t.equal(typeof output, 'object', 'output of word() is an object')
  t.equal(typeof werd, 'string', 'output.word is an array.')
  t.ok(Array.isArray(synonyms),  'output.synonyms are held in an array.')
  t.ok(Array.isArray(antonyms),  'output.antonyms are held in an array.')
})

test('random-word-list', async (t) => {
  t.plan(2)

  const input = 1
  const fake = sinon.fake.resolves({
    word: 'dumbwaiters',
    synonyms: [ 'trolley' ],
    antonyms: []
  })

  sinon.replace(randomWordList, '_getWord', fake)
  const output = await randomWordList.getList(input)
  console.log(output)

  t.ok(Array.isArray(output), 'Output should be an array')
  t.equal(output.length, input, 'output should be same length as int passed as argument')
  t.end()
})

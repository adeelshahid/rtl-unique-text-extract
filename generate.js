#!/usr/bin/env node

const CHARS_URDU = [
  'ا',
  'آ',
  'آ',
  'أ',
  'ب',
  'پ',
  'ت',
  'ٹ',
  'ث',
  'ج',
  'چ',
  'ح',
  'خ',
  'د',
  'ڈ',
  'ذ',
  'ر',
  'ڑ',
  'ز',
  'ژ',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ک',
  'گ',
  'ل',
  'م',
  'ن',
  'ں',
  'و',
  'ؤ',
  'ه',
  'ہ',
  'ۂ',
  'ھ',
  'ء',
  'ی',
  'ئ',
  'ے',
]

function getWordsList(contents) {
  let result = contents.replace(/(<[^>]+>)/g, ' ')
  result = result.replace(/(&.+;)/g, ' ')
  result = result.replace(/[+\-*\/]/g, '')

  // filter out english letters a-z A-Z, numbers 0-9
  result = result.replace(/(\s+[a-zA-Z0-9]+\s+)/g, ' ')
  result = result.replace(/^([a-zA-Z0-9]+\s+)/g, ' ')
  result = result.replace(/(\s+[a-zA-Z0-9]+)$/g, ' ')

  // filter out empty items
  let list = result.split(' ').map(s => {
    return s.replace('۔', '').replace(/\s/g, '')
  })

  list = list.filter(s => {
    if (s.length < 2) {
      return false
    }

    let onlyUrduLetters = true
    s.split('').forEach(l => {
      if (!CHARS_URDU.includes(l)) {
        onlyUrduLetters = false
      }
    })

    return onlyUrduLetters
  })

  // filter out duplicates
  const unique = {}
  list.forEach(s => (unique[s] = ''))
  return Object.keys(unique)
}

function isTextFile(name) {
  return name.endsWith('.txt')
}

const fs = require('fs')
let allWords = []

const files = fs.readdirSync(__dirname)
for (let i = 0; i < files.length; i += 1) {
  const name = files[i]
  if (isTextFile(name)) {
    const contents = fs.readFileSync(__dirname + '/' + name, 'utf8')
    allWords = allWords.concat(getWordsList(contents))
  }
}

const uniqueWords = {}
for (let i = 0; i < allWords.length; i += 1) {
  uniqueWords[allWords[i]] = ''
}

const words = Object.keys(uniqueWords).sort()
console.log(words.length)
for (let i = 0; i < words.length; i += 1) {
  console.log(words[i])
}

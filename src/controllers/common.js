const express = require('express')
const genaiExplorations = express.Router({mergeParams: true})

const dataExtractor = require('./genai')

genaiExplorations.use('/data-extractor',dataExtractor)

module.exports = genaiExplorations
/* eslint-disable standard/no-callback-literal */

// dependencies
const fs = require('fs')
const path = require('path')

// container for the module (to be exported)
const lib = {}

// base directorie of data folder
lib.baseDir = path.join(__dirname, '/../.data/')

// write data to a file
lib.create = (dir, file, data, cb) => {
  // open the file for writing
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
    if (err) {
      throw Error('Error opening file:', err)
    }
    // convert data to a string
    const dataToString = JSON.stringify(data)
    fs.writeFile(fileDescriptor, dataToString, (err) => {
      if (err) {
        throw Error('Error writing file:', err)
      }
      fs.close(fileDescriptor, err => {
        if (!err) {
          cb(false)
        } else {
          throw Error('Error closing the file:', err)
        }
      })
    })
  })
}

// read data from a file
lib.read = (dir, file, cb) => {
  fs.readFile(`${lib.baseDir}${dir}/${file}.json`, 'utf8', (err, data) => {
    cb(err, data)
  })
}

// read and the file
lib.update = (dir, file, data, cb) => {
  // open the file for writing
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if (err) {
      throw Error('Error opening file:', err)
    }
    const stringData = JSON.stringify(data)
    fs.ftruncate(fileDescriptor, (err) => {
      if (err) {
        throw Error('Error truncating the file:', err)
      }
      fs.writeFile(fileDescriptor, stringData, err => {
        if (err) {
          throw Error('Error writing file:', err)
        }
        fs.close(fileDescriptor, err => {
          if (!err) {
            cb(false)
          } else {
            throw Error('Error closing the file:', err)
          }
        })
      })
    })
  })
}

// delete a file
lib.delete = (dir, file, cb) => {
  fs.unlink(`${lib.baseDir}${dir}/${file}.json`, err => {
    if (err) {
      throw Error('Error deleting the file:', err)
    }
    cb(false)
  })
}

module.exports = lib

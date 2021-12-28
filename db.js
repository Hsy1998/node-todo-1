/*
 * @Author: H.
 * @Date: 2021-12-28 14:50:11
 * @LastEditTime: 2021-12-28 15:02:00
 * @Description:
 */
const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const fs = require('fs')
const p = require('path')
const dbPath = p.join(home, '.todo')
const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      // 'a+'模式，如果不存在，就创建一个
      fs.readFile(path, { flag: 'a+' }, (error, data) => {
        if (error) {
          return reject(error)
        }

        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((reslove, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(path, string + '\n', (error) => {
        if (error) return reject(error)
        reslove()
      })
    })
  },
}

module.exports = db

/*
 * @Author: H.
 * @Date: 2021-12-28 17:08:28
 * @LastEditTime: 2021-12-28 17:19:17
 * @Description:
 */
const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')
Object.assign(fs, _fs)
const mocks = {}

fs.setMock = (path, error, data) => {
  mocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
  if (callback === undefined) callback = options
  if (path in mocks) {
    callback(...mocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}
module.exports = fs

/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 更简单地使用 FileSystem 库
 */

const fs = require("fs")

class IoImpl {
    constructor(p, m) {
        this.path = p
        this.mode = m
    }
    write(byteOrString) {
        fs.writeFileSync(this.path, byteOrString)
        return this
    }
    read(type) {
        // TODO: impentments this method
        return fs.readFileSync(this.path)
    }
    close() {
        delete this.path
        delete this.mode
        delete this.read
        delete this.write
    }
    readJson() {
        return JSON.parse(this.read("*a"))
    }
    writeJson(data) {
        return this.write(JSON .stringify(data))
    }
}

let apis = {
    open: (path, mode) => {
        return new IoImpl(path, mode)
    },
    mkdirs: (path) => {
        try {fs.mkdirSync(path, { recursive: true })}catch(e){}
    },
    exists: (path) => {
        return fs.existsSync(path)
    },
}

module.exports = apis

const color = require("./color")

const log = (t) => {
    console.log("[" + new Date().toLocaleTimeString('en-US', { hour12: false }) + "] " + t)
}

const loge = (t) => {
    log(`[E] ${color.red + t + color.none}`)
}

const logw = (t) => {
    log(`[W] ${color.yellow + t + color.none}`)
}

module.exports = {
    log: log,
    loge: loge,
    logw, logw,
}

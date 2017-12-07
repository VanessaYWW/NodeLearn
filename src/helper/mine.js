/**
 * Created by youweiwei on 2017/12/5.
 */
const path = require('path')

const mimeTypes = {
    'css' : 'text/css',
    'gif' : 'image/gif',
    'html' : 'text/html',
    'jpg' : 'image/jpeg',
    'js' : 'text/javascript',
    'json' : 'application/json',
    'png' : 'image/png',
    'txt' : 'text/plain',
    'xml' : 'text/xml'
}

module.exports = (filePath) => {
    var ext = path.extname(filePath)
        .split('.')
        .pop()
        .toLowerCase()

    if (!ext) {
        ext = filePath;
    }
    return mimeTypes[ext] || mimeTypes['txt'];
}
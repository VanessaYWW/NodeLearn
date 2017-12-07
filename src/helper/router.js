const fs = require('fs')
const promisefy = require('util').promisify
const stat = promisefy(fs.stat)
const readFilePromise = promisefy(fs.readFile)
const path = require('path')
const readdir = promisefy(fs.readdir)
const Handlebars = require('handlebars')
// const config = require('../config')
const mime = require('./mine')
const compress = require('./compress')
const isRefresh = require('./cache')
// 读取HTML文件
const tplPath = path.join(__dirname,'../templete/dir.html')
const source = fs.readFileSync(tplPath, 'utf-8')
const templete = Handlebars.compile(source)

function readFiles (filePath,req, res, conf) {
    try {
        stat(filePath)
        .then((stats) => {
            if (stats.isFile()) {
                const mimeType = mime(filePath)
                res.setHeader('content-Type',mimeType);

                if (isRefresh(stats,req,res)) {
                    res.statusCode = 304;
                    res.end()
                }

                res.statusCode = 200;
                /*返回方法一*/
                let rs = fs.createReadStream(filePath);

                // 压缩
                if (filePath.match(conf.compress)) {
                    rs = compress(rs, req, res)
                }
                rs.pipe(res)

                // /*返回方法二*/
                // readFilePromise(filePath)
                //     .then(data => {
                //         res.end(data);
                //     })
                //     .catch(err => {
                //         console.error();
                //     })

            }else if (stats.isDirectory()){
                readdir(filePath)
                .then(files => {

                    const dir = path.relative(conf.root ,filePath);
                    console.log(`/${dir}`)
                    const data = {
                        title: path.basename(filePath),
                        dir:dir?`/${dir}`:'',
                        files : files.map(item => {
                            return {
                                file : item,
                                icon : mime(item)
                            }
                        })
                    }
                    res.statusCode = 200;
                    res.setHeader('content-Type','text/html');
                    res.end(templete(data))
                })
            }
        })
    }
    catch (err) {
        res.statusCode = 404;
        res.end();
    }
}

module.exports = {
    readFiles:readFiles
}
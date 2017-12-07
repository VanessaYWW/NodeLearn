/**
 * Created by youweiwei on 2017/12/6.
 */
const {createGzip, createDeflate} = require('zlib');

module.exports = compress;


function compress(rs, req, res) {
    const acceptEncoding = req.headers['accept-encoding'];
    console.log(acceptEncoding);
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzib|deflate)/)) {
        console.log('直接返回');
        return rs;
    }else if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('content-Encoding','gzip');
        return rs.pipe(createGzip())
    }else if (acceptEncoding.match(/\bdefalte\b/)) {
        res.setHeader('content-Encoding','defalte');
        return rs.pipe(createDeflate())
    }else{
        console.log('qita');
        return rs;
    }
}

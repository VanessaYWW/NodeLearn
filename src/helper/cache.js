/**
 * Created by youweiwei on 2017/12/6.
 */

const {cache} = require('../config')

function refreshRes(stats, res) {

    if (cache.expires) {
        res.setHeader('Expires',(new Date(Date.now() + cache.maxAge * 1000)).toUTCString());
    }

    if (cache.cacheControl) {
        res.setHeader('Cache-Control',`public,max-age=${cache.maxAge}`)
    }

    if (cache.lastModified) {
        res.setHeader('Last-Modified',stats.mtime.toUTCString())
    }

    if (cache.etag) {
        res.setHeader('ETag',`${stats.size}-${stats.mtime}`)
    }
}

module.exports = function isFresh(stats, req, res) {
    refreshRes(stats,res);

    const lastM = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match'];

    if (!lastM && !etag) {
        return false;
    }

    if (lastM !== res.getHeader('Last-Modified')) {
        return false;
    }

    if (etag !== res.getHeader('ETag')) {
        return false;
    }

    return true;

}
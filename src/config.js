module.exports = {
    hostname:'localhost',
    port: 8080,
    root:process.cwd(),
    compress: /\.(html|js|css|md|txt|png)/,
    cache: {
        maxAge: 60, // 十分钟
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
}
/**
 * Created by youweiwei on 2017/12/6.
 */
const yargs = require('yargs');

const Server = require('./app')

const argv = yargs
    .usage('anywhere [options]')
    .option('p', {
        alas:'port',
        describe:'端口号',
        default:8080
    })
    .option('h', {
        alas:'hostname',
        describe:'host',
        default:'localhost'
    })
    .option('d', {
        alas:'root',
        describe:'root path',
        default:process.cwd()
    })
    .version()
    .alias('v','version')
    .help()
    .argv;


const server = new Server(argv)
server.start()
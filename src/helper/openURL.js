/**
 * Created by youweiwei on 2017/12/6.
 */
const {exec} = require('child_process');

module.exports = url => {
    switch (process.platform) {
        case 'darwin':
            exec(`open ${url}`);
            break;
        case 'win32':
            exec(`start ${url}`);
            break;
    }
}
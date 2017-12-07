/**
 * Created by youweiwei on 2017/12/6.
 */
const assert = require('assert');

const obj1 = {
    a: {
        b: 1
    }
};
const obj2 = {
    a: {
        b: 2
    }
};
const obj3 = {
    a: {
        b: 1
    }
};

const obj4 = Object.create(obj1);
assert.deepEqual(obj1, obj1)

// 测试通过，对象与自身相等。

// assert.deepEqual(obj1, obj2);
// // 抛出 AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }
// // 因为 b 属性的值不同。
//
// assert.deepEqual(obj1, obj3);
// // 测试通过，两个对象相等。
//
// assert.deepEqual(obj1, obj4);
// // 抛出 AssertionError: { a: { b: 1 } } deepEqual {}
// 因为不测试原型。

let buf1 = Buffer.alloc(2,'3');
let buf2 = Buffer.alloc(2,'2');
const arr = [buf1, buf2];
console.log(`${buf1}:${buf2}`)
console.log('比较前:' + arr)
console.log('比较前:' + arr.sort(Buffer.compare));

// 合并
const buf3 = Buffer.from('12')
const length = buf1.length+buf2.length+buf3.length;
const newBuf = Buffer.concat([buf1,buf2,buf3],length)
console.log('合并:' + newBuf)

console.log(buf1.compare(buf2))
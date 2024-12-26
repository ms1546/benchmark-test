module.exports = function (str) {
    // 処理
    setTimeout(() => {
        console.log('aaa');
    }, 5000);
    return str.split('').reverse().join('');
};

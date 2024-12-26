module.exports = function (str) {
    // 処理
    let i = 0;
    while (i < 5) {
        console.log(i);
        i++;
    }
    return str.split('').reverse().join('');
};

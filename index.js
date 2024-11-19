module.exports = function (str) {
    for (let i = 0; i < 100; i++) {
        console.log(str);
    }
    return str.split('').reverse().join('');
};

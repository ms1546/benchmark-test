module.exports = function (str) {
    for (let i = 0; i < 1; i++) {
        console.log(str);
    }
    return str.split('').reverse().join('');
};

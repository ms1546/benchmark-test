module.exports = async function (str) {
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await wait(10000);
    return str.split('').reverse().join('');
};

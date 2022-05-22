// convert money ======================================================
function formatMoney(n) {
    return '$' + n.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const sortName = (name, number) => {
    return name.length >= number ? name.substring(0, number)+"...":name;
}
export {
    formatMoney,
    numberWithCommas,
    sortName
}
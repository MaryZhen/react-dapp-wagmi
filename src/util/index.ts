export function timestampToDateTime(timestamp: number ) {
    // 创建一个新的Date对象，传入时间戳
    const date = new Date(timestamp);

    // 使用Date对象的方法获取年、月、日、时、分、秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以需要+1，并使用padStart补全为两位数
    const day = String(date.getDate()).padStart(2, '0'); // 使用padStart补全为两位数
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 将它们组合成日期和时间字符串
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return dateTimeString;
}
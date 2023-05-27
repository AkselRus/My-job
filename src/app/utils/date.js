const time = (date) => {
    const date1 = Number(date);
    const date2 = Date.now();
    const time = Math.floor(date2 - date1);
    const day = Math.floor(time / (1000 * 60 * 60 * 24));
    if (day > 365) {
        return ` ${Math.floor(day / 365)} год назад`;
    }
    if (day === 0) {
        const hours = Math.floor(time / (1000 * 60 * 60));
        if (hours === 0) {
            const min = Math.floor(time / (1000 * 60));
            return ` ${min} минут назад`;
        }
        return ` ${hours} часа назад`;
    }
    return ` ${day} дней назад`;
};
export default time;

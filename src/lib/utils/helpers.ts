export function unixTimeNow() {
    let timeStamp = Math.floor(new Date().getTime() / 1000);
    const options: Intl.DateTimeFormatOptions = {hour: 'numeric',minute: 'numeric',second: 'numeric'};
    return new Date(timeStamp * 1000).toLocaleString('es-ES', options);
}

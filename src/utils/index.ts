export function formatTime(seconds: number) {
    let minutes = Math.floor(Math.round(seconds) / 60);
    let remainingSeconds = Math.round(seconds) % 60;
    return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}
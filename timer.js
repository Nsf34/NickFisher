document.addEventListener('DOMContentLoaded', function () {
    function updateTimer() {
        var now = new Date();

        var easternTime = convertToEasternTime(now);
        var eventDateEastern = new Date("2022-11-24T00:00:00-05:00");
        var remTime = easternTime - eventDateEastern;

        var s = Math.floor(remTime / 1000);
        var m = Math.floor(s / 60);
        var h = Math.floor(m / 60);
        var d = Math.floor(h / 24);

        h %= 24;
        m %= 60;
        s %= 60;

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        document.getElementById("timer").textContent = d + " days, " + h + " hours, " + m + " minutes, " + s + " seconds";
        setTimeout(updateTimer, 1000);
    }

    function convertToEasternTime(date) {
        var utc = date.getTime() + date.getTimezoneOffset() * 60000;
        var easternOffset = -5;
        if (isEasternDaylightSavingTime(date)) {
            easternOffset = -4;
        }
        return new Date(utc + (3600000 * easternOffset));
    }

    function isEasternDaylightSavingTime(date) {
        var start = new Date(date.getFullYear(), 2, 8);
        var end = new Date(date.getFullYear(), 10, 1);
        start.setDate(14 - (start.getDay() + 1) % 7);
        end.setDate(7 - (end.getDay() + 1) % 7);
        return date >= start && date < end;
    }

    updateTimer();
});

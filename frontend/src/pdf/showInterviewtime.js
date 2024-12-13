export function showtime(time_string) {
    const time = parseInt(time_string, 10);
    if (time === 0) {
        return "Not Selected";
    }
    else{
        let startTimeHour = 8;
        let endTimeHour = 9;

        for (let i = 0; i < time; i++) {
            if (time === i+1) {
                startTimeHour = startTimeHour + i;
                endTimeHour = endTimeHour + i;
            }
        }

        console.log(typeof (startTimeHour));
        console.log(endTimeHour);

        const startTimeString = `${startTimeHour.toString().padStart(2, '0')}:30`;
        const endTimeString = `${endTimeHour.toString().padStart(2, '0')}:30`;

        return `${startTimeString} - ${endTimeString}`;
    }
}


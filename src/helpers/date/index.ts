// TODO tests!

/**
 * 23:59 - 11:59 PM
 * 00:00 - 12:00 AM
 * 11:59 - 11:59 AM
 * 12:00 - 12:00 PM
 */

const HALF_DAY_HOURS = 12;

export const getHHMM = (date: Date, is24HourClock: boolean): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  if (is24HourClock) {
    return `${hours}:${formattedMinutes}`;
  }

  let period: 'AM' | 'PM';
  let formattedHours: number;

  if (hours === 0) {
    period = 'AM';
    formattedHours = HALF_DAY_HOURS;
  } else if (hours < HALF_DAY_HOURS) {
    period = 'AM';
    formattedHours = hours;
  } else if (hours === HALF_DAY_HOURS) {
    period = 'PM';
    formattedHours = HALF_DAY_HOURS;
  } else {
    period = 'PM';
    formattedHours = hours - HALF_DAY_HOURS;
  }

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const generateTimeArray = () => {
  const times = [];

  for (let hour = 0; hour <= 23; hour += 1) {
    const formattedHour = String(hour).padStart(2, '0');
    times.push(`${formattedHour}:00`);
  }
  return times;
};

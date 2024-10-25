export const ConvertTimestampFormat = (timestamp) => {
  // Define an array with Indonesian month names
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Create a Date object from the ISO timestamp
  const date = new Date(timestamp);

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Return the formatted date
  return `${day} ${month} ${year}`;
};

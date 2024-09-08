export function parseAndFormatDate(dateString: string) {
  // Step 1: Remove the commas and split by spaces
  const parts = dateString?.replace(",", "").split(" ");

  // Assuming the format is always "day month, year"
  let day = parts[0];
  let month = parts[1];
  let year = parts[2];
  let fullDay = day;
  // Step 2: Extract the numerical part of the day (remove "th", "rd", "nd", "st")
  day = day.replace(/[^0-9]/g, "");
  let fullMonth = month;

  // Transform the month to only first 4 letters and capitalize
  month = month.substring(0, 4).toUpperCase();
  // Result
  return { day, month, year, fullMonth, fullDay };
}

export const formatDateWithMilliseconds = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // months from 1-12
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const second = String(date.getUTCSeconds() - 2).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${milliseconds}000`; // Appending '000' to simulate microseconds
};

export function formatUnixTimestamp(unixTimestamp: number) {
  // Convert to milliseconds by multiplying by 1000
  const date = new Date(unixTimestamp * 1000);

  // Format the date options
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", // Full month name (e.g., "April")
    day: "numeric", // Day of the month
    hour: "numeric", // Hour (12-hour format)
    minute: "numeric", // Minutes
    second: "numeric", // Seconds
    hour12: true, // Use 12-hour format
  };

  // Format the date using toLocaleDateString
  return date.toLocaleString("en-US", options);
}

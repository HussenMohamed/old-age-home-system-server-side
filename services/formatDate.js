const formatDate = (date, format) => {
  const newDate = format
    .replace("mm", date.getMonth() + 1)
    .replace("yyyy", date.getFullYear())
    .replace("dd", date.getDate());
  console.log(`this is the date from formatDate function ${newDate}`);
  return newDate;
};

module.exports = { formatDate };

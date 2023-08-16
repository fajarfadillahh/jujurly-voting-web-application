export function convertTime(time) {
  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const dateInstance = new Date(time);
  const year = dateInstance.getFullYear();
  const month = dateInstance.getMonth() + 1;
  const day = dateInstance.getDay();
  const date = dateInstance.getDate();
  const hours = dateInstance.getHours();
  const minutes = dateInstance.getMinutes();

  return `${days[day]} ${date < 10 ? `0${date}` : date}/${
    month < 10 ? `0${month}` : month
  }/${year} ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

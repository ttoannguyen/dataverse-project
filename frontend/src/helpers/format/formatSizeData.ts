const formatBytes = (bytes: number): string => {
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes < 1024) return `${bytes} Bytes`;

  let index = 0;
  let value = bytes;

  while (value >= 1024 && index < units.length - 1) {
    value = value / 1024;
    index++;
  }

  // Làm tròn đến 2 chữ số thập phân nếu cần
  const formattedValue = value % 1 === 0 ? value.toString() : value.toFixed(2);

  return `${formattedValue} ${units[index]}`;
};

export default formatBytes;

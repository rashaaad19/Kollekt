export const formatTimeStamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

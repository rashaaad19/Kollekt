import dayjs from "dayjs";
 import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime);


export const formatTimeStamp = (timestamp) => {
  return dayjs(timestamp).format("MMM D, YYYY h:mm A");
};


export const getTimeAgo = (timestamp) => {
  // e.g., "an hour ago", "10 minutes ago"
  return dayjs(timestamp.toDate()).fromNow(); 
}

export const getJoinDate = (createdAt) => {
    if (!createdAt) return "Unknown";
    
    // If it's a Firestore timestamp
    if (typeof createdAt === 'object' && createdAt.toDate) {
        return dayjs(createdAt.toDate()).format("MMM D, YYYY");
    }
    // If it's a number (timestamp in ms)
    if (typeof createdAt === 'number') {
        return dayjs(createdAt).format("MMM D, YYYY");
    }
    // If it's already a string
    return createdAt;
};


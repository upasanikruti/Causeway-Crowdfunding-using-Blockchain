export const daysLeft = (deadline) => {
  const now = new Date(); 
  const deadlineDate = new Date(deadline); 
  deadlineDate.setHours(0, 0, 0, 0); 
  now.setHours(0, 0, 0, 0);

  const differenceInTime = deadlineDate.getTime() - now.getTime(); 
  const remainingDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); 

  return Math.max(0, remainingDays); 
};
  
  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };
  
  export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };
export const displayQuestionDate = (askDate) => {
    const now = new Date();
    const asked = new Date(askDate);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerYear = msPerDay * 365;
  
    const timePassed = now - asked;
    let result;
  
    if (timePassed < msPerMinute) {
       result = Math.round(timePassed/1000) + ' seconds ago';   
    } else if (timePassed < msPerHour) {
       result = Math.round(timePassed/msPerMinute) + ' minutes ago';   
    } else if (timePassed < msPerDay ) {
       result = Math.round(timePassed/msPerHour ) + ' hours ago';  
    } else if (timePassed < msPerYear) {
      result = asked.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + 
               ' at ' + asked.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else {
      result = asked.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + 
               ' at ' + asked.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    return result;
  };
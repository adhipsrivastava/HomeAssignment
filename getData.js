const getClicksSubset = click_object =>{
    let result_object={};
    let result_counter_object={};
    let prev_time_period=-1;
    let prev_date_period = -1;
    let final_resultset=[];
    let outputSet = [];
    click_object.forEach(element => {
     let timestamp= getTimeStamp(element);
     let time_period = timestamp.time_period_hours;
     let current_date_period = timestamp.date_period;
          
     if(prev_date_period!=-1 && prev_date_period!=current_date_period){ //check for different dates
        final_resultset = final_resultset.concat(Object.values(result_object));
        final_resultset =  removeIp(final_resultset,result_counter_object);
        outputSet = outputSet.concat(final_resultset); // concatenate the final result into one array
        final_resultset = [];
        result_counter_object = {};
        result_object = {};
        prev_time_period=-1;
        prev_date_period = -1;
        result_object =  getResultObject(result_object,result_counter_object,element);
     }else{
         if(prev_time_period ==-1 || time_period == prev_time_period){
            result_object =  getResultObject(result_object,result_counter_object,element);
         }else{
            final_resultset = final_resultset.concat(Object.values(result_object));
            result_object = {};
            result_object = getResultObject(result_object,result_counter_object,element);
         }
         prev_time_period = time_period;
     }
     prev_date_period = current_date_period; 
  
    });
    final_resultset = final_resultset.concat(Object.values(result_object));
    final_resultset =  removeIp(final_resultset,result_counter_object);
    outputSet = outputSet.concat(final_resultset);
    return outputSet; // the final subset of given input set
  }
  

  // checking whether the given IP exists in the final counter array. If yes, then update the count of that IP. If no, add the IP to the counter array
  const getResultObject = (result_object,result_counter_object,element)=>{
        let isInIpCount=result_counter_object.hasOwnProperty(element.ip); 
        if(isInIpCount){
          let count = ++result_counter_object[element.ip];
          result_counter_object[element.ip] = count;
        }else{
          result_counter_object[element.ip] = 1;
        }
        if(!result_object.hasOwnProperty(element.ip)){
          result_object[element.ip] = element;
        }else{
            // replacing with most expensive click
          if(result_object[element.ip].amount<element.amount){
            result_object[element.ip] = element;
          }else if(result_object[element.ip].amount==element.amount){ //recording timestamp for same amount
            if(new Date(element.timestamp)< new Date(result_object[element.ip].timestamp)){
                result_object[element.ip] = element;
            }
          }
        }
        return result_object;
  }

  // function for removing those IPs whose count is greater than 10
  removeIp = (final_resultset,result_counter_object) => {
      let updatedResultSet = [];
    for(var i=0;i<final_resultset.length;i++){
        let IP =  final_resultset[i].ip;
        let count = result_counter_object[IP];
        if(count<=10){
            updatedResultSet.push(final_resultset[i]);
        }
    }
    return updatedResultSet;
  }


  // function for returning the hours and time period
  const getTimeStamp = element =>{ 
    let date_period = new Date(element.timestamp).toLocaleDateString();
    let time_period_hours = new Date(element.timestamp).getHours();
    return {time_period_hours,date_period}
  }

module.exports = {
    clicksGetSubset : getClicksSubset
}
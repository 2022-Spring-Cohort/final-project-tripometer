

export default{
   
    PopulateMonth,
    PopulateYear,
    PopulateDates,
    PopulateHour,
    PopulateMin,
    FormatDate
}


function FormatDate(dateStr){
    //date OUTPUTs:Mon Mar 28 2022
    let date = new Date(dateStr);
    console.log(date);
    let dateString = date.toDateString().split(' ');
    let newDateStr = `${dateString[0]},${dateString[1]} ${dateString[2]},${dateString[3]}`;
    let minute = (date.getMinutes()<10)?`0${date.getMinutes()}`:date.getMinutes();
    let ending = (date.getHours() == 12)?`12:${minute}PM`:
                (date.getHours()==24)?`12:${minute}AM`:
                (date.getHours()<12)?`${date.getHours()}:${minute}AM`:
                `${date.getHours()-12}:${minute}PM`;
    return newDateStr + ` ${ending}`;   
}

// function MonthToNum(monthStr){   
//     const months = ["Jan","Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
//     Array.prototype.forEach.call(months,function(m,i){
//         if (i<9) {
//             console.log(i);
//             i = `0${(i+1).toString()}`;
//         }
//         if (monthStr === m) {
//             return i;
//         }
//     });
// }

//Populates the dropdown for Months
function PopulateMonth(selectTag,month){
    const months = ["January","February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    Array.prototype.forEach.call(months,function(m,i){
        const option = document.createElement('option');
        option.textContent = m;
        option.value = (i+1<10)?`0${(i+1).toString()}`:(i+1).toString();
        selectTag.appendChild(option);
        if(option.value === month){
            option.selected = true;
        }
        console.log(selectTag);
    })
}

function PopulateYear(selectTag,year){
    let currentYear = new Date().getFullYear();
    for (let i = currentYear-20; i < currentYear+20; i++) {
        const option = document.createElement('option');
        option.textContent = i;
        option.value = i;
        if (i === year) {
            option.selected = true;
        }
        selectTag.appendChild(option);
    }
}

//Populates the dropdown for Dates
function PopulateDates(date,year,month,selectTag){
    selectTag.innerHTML = '';
    let days;
    if(month === "02"){
        if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
            days = 29;
        }else{
            days = 28;
        }
    }else if(month === '01' || month === '03' || 
    month === '05' || month === '07' || month === '08' 
    || month === '10' || month === '12') {
        days = 31;
    }else{
        days = 30;
    }
    for (let i = 1; i <= days; i++) {
        const option = document.createElement('option');
        if(i<10){
            i = `0${i.toString()}`;
        }
        option.textContent = i;
        option.value = i;
        selectTag.appendChild(option);
        if(i === date){
            option.selected = true;
        }
    }
}

function PopulateHour(hourTag,hour){
    for (let i = 1; i <= 24; i++) {
        const option = document.createElement('option');
        if(i<10){
            i = `0${i.toString()}`;
        }
        option.textContent = i;
        option.value = i;
        hourTag.appendChild(option);  
        if(i === hour){
            option.selected = true;
        }     
    }
} 

function PopulateMin(minuteTag,min){
    for (let i = 0; i < 60; i++) {
        const option = document.createElement('option');
        if(i<10){
            i = `0${i.toString()}`;
        }
        option.textContent = i;
        option.value = i;
        minuteTag.appendChild(option);    
        if(i === min){
            option.selected = true;
        }   
    }
} 
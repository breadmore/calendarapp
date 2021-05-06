import React, { Component } from 'react'
import moment from 'moment'
import axios from "axios";
class DateHeader extends Component {

    dateToArray = (dates) => {
        if(Array.isArray(dates)){
            return dates
        }else if(typeof dates === "string"){
            return dates.split(',')
        }else{
            return ["일", "월", "화", "수", "목", "금", "토"]
        }
    }

    mapArrayToDate = (dateArray) => {
        try{
            if(dateArray.length !== 7){
                console.log(new Error("dates props must be had 7 date"))
                dateArray = ["일", "월", "화", "수", "목", "금", "토"]
            }

            return dateArray.map((date, index) => {
                const className = ()=>{
                    let className = "RCA-calendar-date-component";
                    if(index === 0){
                        return className + " date-sun"
                    }else if(index === 6){
                        return className + " date-sat"
                    }else{
                        return className + " date-weekday"
                    }
                }
                return (
                    <div className={className()} key={"RCA-header-"+date}>
                        {date}
                    </div>
                )
            })
        }catch{
            throw new Error ("date must be string or component")
        }
    }

    render() {
        return (
            <div className="RCA-calendar-date-header">
                {this.mapArrayToDate(this.dateToArray(this.props.dates))}
            </div>
        )
    }
}


class Week extends Component {

    componentDidMount() {
        this.getscheduleByName();
    }
    getscheduleByName(){
        var name=window.location.pathname;
        var schedule=[];
        axios.get('/api/getschedule'+name)
            .then(res=>
                res.data.forEach(function (item,index){
                    var str =(item.taskdate+"-"+item.tasknum);
                    var cbox = document.getElementById(str);
                    cbox.checked = true;
                    if(item.tasknum===4){
                        for(var i=0; i<4; i++){
                            str =(item.taskdate+"-"+i)
                            cbox = document.getElementById(str);
                            cbox.disabled=true;
                            cbox.checked=false;
                        }
                    }
                })
            );
    }

    checkChange =({target})=>{
        var date = target.id.substr(0,10);
        var task = target.id.substr(11,12);
        let data={
            uname:window.location.pathname.substr(1,6),
            taskdate:date,
            tasknum:task
        }
        if(target.checked){
            axios.post('/api', (data))
        }else{
            axios.delete('/api', {data:data})
        }
        if(task==='4'){
            if(target.checked){
                for(var i=0; i<4; i++) {
                    console.log("test");
                    document.getElementById(date+'-'+i).disabled = true;
                    data.tasknum=i;
                    axios.delete('/api', {data: data})
                }
            }else{
                for(var i=0; i<4; i++) {
                    document.getElementById(date+'-'+i).disabled = false;
                }
            }


        }
    }
    Days = (firstDayFormat,weekIndex) => {
        const _days = [];

        for (let i = 0; i < 7; i++) {

            const Day = moment(firstDayFormat).add('d', i);
            _days.push({
                yearMonthDayFormat: Day.format("YYYY-MM-DD"),
                getDay: Day.format('D'),
                isHolyDay: false,
                weekIndex
            });
        }
        return _days;
    }

    mapDaysToComponents = (Days,calendarMonthYear ,selectedDayFormat ,fn = () => { }) => {

        const thisMonth = moment(calendarMonthYear);
        return Days.map((dayInfo, i) => {

            let className = "date-weekday-label";

            if (!thisMonth.isSame(dayInfo.yearMonthDayFormat,'month')) {
                className = "date-notThisMonth";
            } else if (i === 0) {
                className = "date-sun"
            }else if(i===6){
                className ="date-sat"
            }

            if(moment(dayInfo.yearMonthDayFormat).isSame(selectedDayFormat,'day')){
                className="selected";
            }
            if(className!=="date-notThisMonth"){
                return (
                    <div className={"RCA-calendar-day " + className}key={`RCA-${dayInfo.weekIndex}-${i}-day`}onClick={() => fn(dayInfo.yearMonthDayFormat)}>
                        <label className="RCA-calendar-day-label">
                            {dayInfo.getDay}
                        </label>
                        <div className="RCA-calendar-day-container">
                            <input type="checkbox" onChange={(e)=>{
                                this.checkChange(e);
                            }} id={`${dayInfo.yearMonthDayFormat}-0`}/> 지방
                            <input type="checkbox" onChange={(e)=>{
                                this.checkChange(e);
                            }}id={`${dayInfo.yearMonthDayFormat}-1`}/> 수도권
                            <input type="checkbox" onChange={(e)=>{
                                this.checkChange(e);
                            }}id={`${dayInfo.yearMonthDayFormat}-2`}/> 6차시
                            <input type="checkbox" onChange={(e)=>{
                                this.checkChange(e);
                            }}id={`${dayInfo.yearMonthDayFormat}-3`}/> 4차시
                            <input type="checkbox" onChange={(e)=>{
                                this.checkChange(e);
                            }}id={`${dayInfo.yearMonthDayFormat}-4`}/> 조정 가능
                        </div>
                    </div>
                )
            }else
            return (
                    <div className={"RCA-calendar-day " + className}key={`RCA-${dayInfo.weekIndex}-${i}-day`}onClick={() => fn(dayInfo.yearMonthDayFormat)}>
                        <label className="RCA-calendar-day-label">
                            {dayInfo.getDay}
                        </label>
                    </div>
            )
        })
    }
    render() {
        return (
            <div className="RCA-calendar-week">
                {this.mapDaysToComponents(this.Days(this.props.firstDayOfThisWeekformat,this.props.weekIndex),
                    this.props.ymOfThisCalendar,
                    this.props.selected,
                    this.props.fn
                )}
            </div>
        )
    }
}

export default class Calendar extends Component {

    Weeks = (monthYear,selected,clickFn) => {
        const firstDayOfMonth = moment(monthYear).startOf('month');
        const firstDateOfMonth = firstDayOfMonth.get('d');

        const firstDayOfWeek = firstDayOfMonth.clone().add('d', -firstDateOfMonth);

        const _Weeks = [];

        for (let i = 0; i < 6; i++) {
            _Weeks.push((
                <Week key={`RCA-calendar-week-${i}`}
                      weekIndex={i}
                      ymOfThisCalendar={firstDayOfMonth.format("YYYY-MM")}
                      firstDayOfThisWeekformat={firstDayOfWeek.clone().add('d', i * 7).format("YYYY-MM-DD")}
                      selected={selected}
                      fn={clickFn}
                />
            ))
        }
        return _Weeks
    }

    render() {
        return (
            <div className="RCA-calendar-container">
                <DateHeader dates={"Sun, Mon, Tue, Wed, Thu, Fri, Sat"} />
                {this.Weeks(this.props.YM,this.props.selected,this.props.changeSelected)}
            </div>
        )
    }
}
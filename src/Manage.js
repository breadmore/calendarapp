import React, {Component} from 'react'
import axios from "axios";
class DateSide extends Component{

    render() {
        return (
            <div className="RCA-manage-date-side">
                <h3 className="RCA-manage-title">
                    {this.props.selected} 강사 현황
                </h3>
            </div>
        )
    }
}

class ScheduleList extends Component{
    componentDidUpdate() {
        this.resetAllschedule();
        this.DrawAllschedule()
    }
    componentWillUpdate(){
    }
    resetAllschedule(){
        var cbox_0 = document.getElementById("0-list");
        var cbox_1 = document.getElementById("1-list");
        var cbox_2 = document.getElementById("2-list");
        var cbox_3 = document.getElementById("3-list");
        var cbox_4 = document.getElementById("4-list");

        cbox_0.innerText='';
        cbox_1.innerText='';
        cbox_2.innerText='';
        cbox_3.innerText='';
        cbox_4.innerText='';
    }
    DrawAllschedule(){
        var cbox_0 = document.getElementById("0-list");
        var cbox_1 = document.getElementById("1-list");
        var cbox_2 = document.getElementById("2-list");
        var cbox_3 = document.getElementById("3-list");
        var cbox_4 = document.getElementById("4-list");

        axios.get('/api/getselect/'+this.props.selected)
            .then(res=>
                [].forEach.call(res.data,function (item,index){
                    var content=document.createTextNode(item.uname);
                    switch (item.tasknum){
                        case 0:
                            cbox_0.appendChild(content);
                            break
                        case 1:
                            cbox_1.appendChild(content);
                            break
                        case 2:
                            cbox_2.appendChild(content);
                            break
                        case 3:
                            cbox_3.appendChild(content);
                            break
                        case 4:
                            cbox_4.appendChild(content);
                            break
                    }
                })
            );
    }
    render() {
        return (
            <div className="RCA-manage-schedule-list">
                <div id="RCA-manage-0">
                    <h2>지방</h2>
                    <p id="0-list"></p>
                </div>
                <div id="RCA-manage-1">
                    <h2>수도권</h2>
                    <p id="1-list"></p>
                </div>
                <div id="RCA-manage-2">
                    <h2>6차시</h2>
                    <p id="2-list"></p>
                </div>
                <div id="RCA-manage-3">
                    <h2>4차시</h2>
                    <p id="3-list"></p>
                </div>
                <div className="RCA-manage-adjustable" id="RCA-manage-4">
                    <h2>조정 가능</h2>
                    <p id="4-list"></p>
                </div>

            </div>
        )
    }
}

export default class Manage extends Component {

    render() {
        return (
            <div className="RCA-manage-container">
                <DateSide selected={this.props.selected}/>
                <ScheduleList selected={this.props.selected}/>
            </div>
        )
    }
}
import React, {Component} from 'react'
import Select from 'react-select'
import axios from "axios";
class UserSelect extends Component{

    users =[
    ]
    componentWillMount(){
        this.getAllUsers();
    }
    getAllUsers(){
        var users=[];
       axios.get('/api/getAlluser')
           .then(res =>
               res.data.forEach(function (item,index){
                   users.push({value: res.data[index].name, label:res.data[index].name});
               })
           );
       this.users = users;
    }
    userChange =(value)=>{
        window.location.href='/'+value;
    }

    render() {
        return(
            <div className="RCA-header-select">
                <Select
                        onChange={(value)=>{
                        this.userChange(value.value);
                        }}
                        options={this.users}>
                </Select>
            </div>
        )
    }

}

export default class Header extends Component {
    render() {
        return (
            <div className="RCA-header-container">
                <UserSelect/>
                <h2 className="RCA-header-calendarYM RCA-header-middle">
                    {this.props.calendarYM}
                </h2>
                <h3 className="RCA-header-today RCA-header-middle">
                    {this.props.today}
                </h3>
                <ul className="RCA-header-buttons RCA-header-middle">
                    <li>
                        <i className="move-button left-img icon" onClick={()=>{this.props.moveMonth(-1)}}>
                        </i>
                    </li>
                    <li>
                        이동
                    </li>
                    <li>
                        <i className="move-button right-img icon" onClick={()=>{this.props.moveMonth(1)}}>
                        </i>
                    </li>
                </ul>

            </div>
        )
    }
}
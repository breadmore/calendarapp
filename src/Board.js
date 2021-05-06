import React, {Component} from 'react'
import axios from "axios";
export default class Board extends Component {

    componentDidMount() {
        this.setInnerHtml();
    }

    setInnerHtml(){
        axios.get('/api/board').then(function (res){
            var doc = document.getElementById('RCA-header-text');

            res.data.forEach(function (item,index){
                doc.innerHTML=item.textarea;
            })}
        )

    }
    render() {
        return(
            <div className="RCA-header-container">
                <h3>공지</h3>
                <ul>
                    <li id="RCA-header-text">공지 사항입니다.</li>
                </ul>
            </div>
        )
    }
}
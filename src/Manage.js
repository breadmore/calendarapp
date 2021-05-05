import React, {Component} from 'react'
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
    render() {
        return (
            <div className="RCA-manage-schedule-list">
                <h2>
                    지방
                </h2>
                <h2>
                    수도권
                </h2>
                <h2>
                    6차시
                </h2>
                <h2>
                    4차시
                </h2>
                <h2 className="RCA-manage-adjustable">
                    조정 가능
                </h2>

            </div>
        )
    }
}

export default class Manage extends Component {

    render() {
        return (
            <div className="RCA-manage-container">
                <DateSide selected={this.props.selected}/>
                <ScheduleList/>
            </div>
        )
    }
}
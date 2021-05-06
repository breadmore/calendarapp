import React, { Component } from "react";
import "./style/DrawIn.css";
import axios from "axios";

export default class DrawIn extends Component {
    state = {
        text: ""
    };

    DrawHandler = (e) => {
        const { name, value} = e.target;
        //console.log(text);
        this.setState({ [name]: value });
    };
    refreshPage() {
        console.log("refres");
    }
    DrawClickHandler = () => {
        const { text } = this.state;
        console.log(text);
        let data={
            textarea:text
        }
        axios.put('/api/board',(data));
        window.location.reload(false);
    };

    render() {
        const { isOpen, close } = this.props;   //아까 버튼에서 props로 가져온것
        return (
            <>
                {isOpen ? (
                    <div className="modal">
                        <div >
                            <div className="DrawModal">
                <span className="close" onClick={close}>
                  &times;
                </span>
                                <div className="modalContents" >
                                    <input
                                        name="text"
                                        className="TextId"
                                        type="text"
                                        placeholder="공지사항을 적어주세요"
                                        onChange={this.DrawHandler}
                                    />
                                    <button className="DrawBtn" onClick={this.DrawClickHandler}>
                                        {" "}
                                        작성{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}


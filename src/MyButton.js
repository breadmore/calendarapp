import React, { Component } from "react";
import DrawIn from "./DrawIn";

export default class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    render() {
        return (
            <>
                <button onClick={this.openModal}>Modal Open</button>
                <DrawIn isOpen={this.state.isModalOpen} close={this.closeModal} />
            </>
        );
    }
}
import { Component } from 'react';
import React from "react";
import { LinkContainer } from 'react-router-bootstrap'

class ListDisplayComponent extends Component {

    constructor(props) {
        super(props)
        this.deleteList = this.deleteList.bind(this)
        
        //this component is used to display lists for explore/profile page. Depending on page display is slightly diff 
        if (props.page === 'explore') {
            this.state = {
                id: this.props.id,
                title: this.props.title,
                redirect: null,
                type: this.props.type,
                userId: this.props.userId,
                author: ' By: ' + props.author
            }
        }else{
            this.state = {
                id: this.props.id,
                title: this.props.title,
                redirect: null,
                type: this.props.type,
                userName: this.props.userName,
                userId: this.props.userId
            }
        }
        
        
    }

    deleteList() {
        let reqURL = 'https://list-maker-api.herokuapp.com/removeList'
        let listId = this.state.id
        let requestBody = {
            listId: listId
        }
        fetch(reqURL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(requestBody)
        })
        .then(() => {
            window.location.reload()
        })

    }

    render() {

        //JAnky way of display lists differently WILL REFACTOR
        if (this.props.page === "explore"){
            return (
                <div id = {this.state.id}>
                    <LinkContainer to = {{
                    pathname: '/list/' + this.state.id,
                    state: {
                        listId: this.state.id,
                        title: this.state.title,
                        listType: this.state.type,
                        userId: this.state.userId,
                        author: this.props.author
                    }
                    }}>
                        <button id={this.state.type} className="btn btn-outline-primary">{this.state.title}<span className="authorText">{this.state.author}</span></button>
                    </LinkContainer>
                </div>)
        }
        return (
            <div id = {this.state.id}>
                <LinkContainer to = {{
                pathname: '/list/' + this.state.id,
                state: {
                    listId: this.state.id,
                    title: this.state.title,
                    listType: this.state.type,
                    userId: this.state.userId,
                    author: this.props.author
                }
                }}>
                    <button id={this.state.type} className="btn btn-outline-primary">{this.state.title}<span className="authorText">{this.state.author}</span></button>
                </LinkContainer>
                <button id="delBtn" className="btn btn-outline-danger" onClick={this.deleteList}>X </button>
            </div>
        )
    }

}
export default ListDisplayComponent
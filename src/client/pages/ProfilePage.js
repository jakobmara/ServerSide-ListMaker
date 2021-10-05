import axios from 'axios';
import React, { Component } from 'react';
import {
    Modal,
    Row,
    Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Cookies from 'universal-cookie';
import { fetchProfLists } from '../actions';

const ListDisplayComponent = (props) => {
    return (
        <div id={props.id}>
            <a href={props.url}>
                <button id={props.type} className="btn btn-outline-primary listBtn">{props.title}</button>
            </a>
            <button id="delBtn" className="btn btn-outline-danger" onClick={() => props.delList(props.id)}>X </button>
        </div>
    )
}


class ProfilePage extends Component{

    constructor(props){
        super(props);
        const cookies = new Cookies();


        console.log(props);
        this.state = {
            lists: props.lists.lists,
            showHide: false,
            author: props.lists.name,
            userId: props.userId
        };

    }

    async deleteList(id) {
        let reqURL = 'https://list-maker-api.herokuapp.com/removeList'
        await axios.post(reqURL, {
            listId: id
        })
        .then(location.reload());
    }

    toggleFormVisibility(){
        this.setState({showHide: true});
    }


    componentDidMount(){
        console.log('state: ', this.state)
        this.props.fetchProfLists(this.state.userId);
    }

    addList(){
        let listName = document.getElementById("name").value;
        if(listName === ""){
            console.log("Bad input")
        }
        else{       
            let genre = document.getElementById("Genre").value;
            this.createList(listName,genre);
        }
    }

    async createList(name, type){
        const reqURL = 'https://list-maker-api.herokuapp.com/createList'
        await axios.post(reqURL, {
            listName: name,
            genre: type,
            userId: this.state.userId
        })
        .then(this.componentDidMount())
    }


    renderLists(){
        return this.state.lists.map((l) => {
            return (<ListDisplayComponent id={l.id} url={'/list/'+ l.id} title={l.title} type={l.type} delList={this.deleteList} key={l.id}/>)
        })
    }

    render(){
        return (
            <div>
                <h1 className="centerText">{this.state.author}'s lists</h1>
                <div id="addLists">
                    <button onClick={() => {this.toggleFormVisibility()}} className = "btn btn-primary">Create list</button>
                </div>
                <div id="listBtns" className="centerText">
                    {this.renderLists()}
                </div>

                <Modal           
                show={this.state.showHide}
                onHide={() => this.setState({ showHide: false })}
                className="testForm"
                >   
                <Modal.Header>
                    <Modal.Title>Create new list</Modal.Title>
                </Modal.Header>

                <form id ="addForm">
                    <br/>
                    <Row>
                        <Col>
                            <label>List name:</label>
                            <input id ="name" placeholder="Name" className="seperator" required/>
                                
                            <label className="seperator">List type:</label>

                            <select id="Genre" name="type" required className="seperator" defaultValue="">
                                <option value="" disabled  hidden>Choose a type</option>
                                <option value="movie">Movie</option>
                                <option value="tv">Television Show</option>
                                { /* waiting till I can make my anime API faster b4 i add to website 
                                    <option value="anime">Anime</option>*/ 
                                }
                            </select>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row className="justify-content-md-center">
                        <button className = "btn btn-outline-success submitBtn" type="submit" id="submitBtn" onClick={() => this.addList()}>Create</button>
                    </Row>
                </form>
            </Modal>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const userId = ownProps.match.params.id;
    return {userId: userId, lists: state.profLists};
}

function loadData(store, userId){
    const val = store.dispatch(fetchProfLists(userId));
    return val;
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchProfLists })(ProfilePage)
}
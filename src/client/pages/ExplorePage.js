import { Component } from 'react';
import React from "react";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap"
import ListDisplayComponent from './ListDisplayComponent';

class Explore extends Component{
    
    constructor(props){
        super(props)
        this.addList = this.addList.bind(this)
        this.addButton = this.addButton.bind(this)
        this.createList = this.createList.bind(this)
        this.populate = this.populate.bind(this)

        this.state = {
            lists: []
        }
        
    }

    async componentDidMount() {

        this.populate('All')
        //this.populate(this.state.listFilter)
    }


    addButton(){
        let listName = document.getElementById("name").value;
        if(listName !== ""){
            let genre = document.getElementById("Genre").value;
            this.createList(listName,genre);
        }

    }

    //when user wants to create a new list adds list to DB
    createList(name, type){
        let requestBody = {
            listName: name,
            genre: type,
            //userId: this.state.userId
        }
        fetch('https://list-maker-api.herokuapp.com/createList', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(requestBody)
          })
    }

    async populate(listType){
        let requestUrl = 'https://list-maker-api.herokuapp.com/lists?cat=' + listType
        this.setState({lists: []})
        let request = await fetch(requestUrl)
        let request_json = await request.json()
        
        let lists = request_json.map((list) => {
            return {
                id: list.id,
                title: list.title,
                type: list.type,
                author: list.author
            }
        })
        this.setState({lists: lists})
    }

    addList() {
        if (document.getElementById("addForm").hidden === false){
            document.getElementById("addForm").hidden= true;
        }else{
            document.getElementById("addForm").hidden= false;
        }
    }

    filter(listType){
        this.populate(listType)
        let disp = document.getElementById('bg-vertical-dropdown-1')
        let butDisplayText = disp.innerText
        let oldOption = document.getElementById(butDisplayText+'Option')
        oldOption.classList.remove('active')
        disp.innerText = listType
        document.getElementById(listType+'Option').classList.add('active')
    }

    
    render() {
        return (
        <div>
            <br/><br/><br/>
  
            <br/>
            <h1 className="centerText">Explore</h1>
            <hr/>

            <label>filter:</label>
            <DropdownButton as={ButtonGroup} title="All" id="bg-vertical-dropdown-1">
            <Dropdown.Item id="AllOption" eventKey="1" active={true} onClick={(e) => {
                    e.preventDefault();
                    this.filter(e.target.innerText)
                }}>All</Dropdown.Item>

                <Dropdown.Item id="MoviesOption" value="movies" eventKey="2" onClick={(e) => {
                    e.preventDefault();
                    this.filter(e.target.innerText)
                }}>Movies</Dropdown.Item>
                <Dropdown.Item eventKey="3" id='TVOption' onClick={(e) => {
                    e.preventDefault();
                    this.filter(e.target.innerText)
                }}>TV</Dropdown.Item>
            </DropdownButton>
            <br/>
            <div id="listBtns" className="centerText">
            {this.state.lists.map((l) => {
                return <ListDisplayComponent
                    id={l.id}
                    title={l.title}
                    type={l.type}
                    author={l.author}
                    page="explore"
                    />
            })}
            </div>
        </div>

        );
    }

}
export default {
    component: Explore
};
import { Component } from 'react';
import React from "react";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap"
import FilterListIcon from '@mui/icons-material/FilterList';

const ListDisplayComponent = (props) => {
    return (
        <div id={props.id}>
            <a href={props.url}>
                <button id={props.type} className="btn btn-outline-primary listBtn"><span className="listTitle">{props.title}</span><p> <span className="authorText">By: {props.author}</span></p></button>
            </a>
        </div>
    )
}

class Explore extends Component{
    
    constructor(props){
        super(props)
        this.addList = this.addList.bind(this)
        this.populate = this.populate.bind(this)

        this.state = {
            lists: []
        }
        
    }

    async componentDidMount() {

        this.populate('All')
        //this.populate(this.state.listFilter)
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
    renderLists(){
        return this.state.lists.map((l) => {
            return (<ListDisplayComponent id={l.id} url={'/list/'+ l.id} title={l.title} type={l.type} delList={this.deleteList} key={l.id} author={l.author}/>)
        })
    }
    
    render() {
        return (
        <div>
            <br/><br/><br/>
  
            <br/>
            <h1 className="centerText">Explore</h1>
            <hr/>

            <DropdownButton as={ButtonGroup} title={<FilterListIcon/>} id="bg-vertical-dropdown-1" className="filterBtn">

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
            <br/>
            <div id="listBtns" className="centerText">
            
            {this.renderLists()}
            </div>
        </div>

        );
    }

}
export default {
    component: Explore
};
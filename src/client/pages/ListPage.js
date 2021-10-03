import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEntries, fetchListInfo } from "../actions";
import {
  Card,
  ListGroup,
  Table,
  Modal,
  Button
} from "react-bootstrap";
import axios from "axios";
import ListEntry from "../components/ListEntry";

const API_KEY = "370fd83cf19dac84ad93508558816da3";
const baseURL = "https://api.themoviedb.org/3/";
const basePosterURL = "https://image.tmdb.org/t/p/w92";

const SearchSuggestion = (props) => {
  return (
    <ListGroup.Item
      className="listCell"
      action
      onClick={() =>
        this.props.addEntry(props.name, props.img, props.url, props.desc)
      }
    >
      <img alt="entry Pic" src={props.img} className="suggestionImage" />
      <p style={{ display: "inline" }}>{props.name}</p>
    </ListGroup.Item>
  );
};

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.suggestionLimit = 3;
    this.listInfo = [];

    this.state = {
      listId: this.props.listId,
      title: '',
      listType: '',
      author: '',
      entries: [],
      searchQuery: null,
      searchSug: [],
      showEditWindow: false,
      info: this.props.listInfo,
      documentLoaded: false
    };
    if (this.props.listInfo){
      this.state = {
        title: this.props.listInfo.title,
        listType: this.props.listInfo.type,
        author: this.props.listInfo.author,
        listId: this.props.listId,
        entries: this.props.entries,
        searchQuery: null,
        searchSug: [],
        showEditWindow: false,
        info: this.props.listInfo,
        documentLoaded: false
      }
      this.listInfo = [
        <h1 key={1}>{this.state.title}</h1>,
        <h6 key={2}>By: {this.state.info.author}</h6>,
        <p key={3}> List of entries for {this.state.listId} </p>
      ]
      console.log("setting diff state")
    }
    this.searchInput = this.searchInput.bind(this);


    console.log("data: ", this.state);
  }

  componentDidMount() {
    this.setState({documentLoaded: true})
  }


  changeLimit() {
    if (this.state.documentLoaded){
      console.log("changing limit")
      if (this.suggestionLimit === 3) {
        this.suggestionLimit = 6;
        this.runSearch(this.state.searchQuery);
        document.getElementById("show").textContent = "Show less";
      } else {
        this.suggestionLimit = 3;
        document.getElementById("show").textContent = "Show more";
        this.runSearch(this.state.searchQuery);
      }
    }
  }

  runSearch(searchQuery) {
    //API call to TMDB API
    console.log("calling run search")
    if (this.state.listType === "movie") {
      this.runMovieSearch(searchQuery);
    }
  }

  runMovieSearch(query) {
    let url = "".concat(baseURL,"search/movie?api_key=",API_KEY,"&query=",query);
    console.log("calling search")

    
    axios.get(url)
    .then((response) => {
      console.log('running search...')
      console.log(this.state.searchSug);
      let data = response.data
      var searchSug = [];
      this.setState({searchSug: []});
      for (var i = 0; i < this.suggestionLimit && i < data.results.length; i++){
        let movieTitle = data.results[i].original_title;
        let posterURL = data.results[i].poster_path;
        let movieId = data.results[i].id;
        let movieDesc = data.results[i].overview
        let movieURLTitle =
        "https://www.themoviedb.org/movie/" +
        movieId +
        "-" +
        movieTitle.replace(/\s/g, "-");
        if (posterURL == null) {
          posterURL = "https://i.imgur.com/ADXHOen.png";
        } else {
          posterURL = basePosterURL + posterURL;
        }
        let movieObj = {
          title: movieTitle,
          image: posterURL,
          url: movieURLTitle,
          desc: movieDesc
        };
        searchSug.push(movieObj);
        this.setState({ searchSug: searchSug });
      }
    })
    
  }

  runTvSearch(query) {
    
    
    let url = "".concat(this.baseURL,"search/tv?api_key=",this.APIKEY,"&query=",query);
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        var searchSug = [];
        this.setState({ searchSug: [] });
        for (var i = 0;i < this.suggestionLimit && i < data.results.length;i++) {
          let tvTitle = data.results[i].original_name;
          let posterURL = data.results[i].poster_path;
          let tvId = data.results[i].id;
          let tvDesc = data.results[i].overview
          let tvURLTitle ="https://www.themoviedb.org/tv/" + tvId + "-" + tvTitle.replace(/\s/g, "-");
          if (posterURL == null) {
            posterURL = "https://i.imgur.com/ADXHOen.png";
          } else {
            posterURL = this.basePosterURL + posterURL;
          }
          let tvObj = {
            title: tvTitle,
            image: posterURL,
            url: tvURLTitle,
            desc: tvDesc
          };
          searchSug.push(tvObj);
          this.setState({ searchSug: searchSug });
        }
      });
  }


  renderEntries() {
    return this.props.entries.map((entry) => {
      return <p key={entry.id}>{entry.title}</p>;
    });
  }
  
  searchInput(e) {
    if (this.state.documentLoaded){
      if (e.target.value.length >= 3) {
        console.log("running search with value: ", e.target.value)
        this.setState({ searchQuery: e.target.value });
        this.runSearch(e.target.value);
        document.getElementById("show").hidden = false;
      } else {
        this.setState({ searchSug: [] });
        document.getElementById("show").hidden = true;
      }
    }
  }

  renderSearchSuggestions() {
    console.log("rendering: ", this.state.searchSug)
    return this.state.searchSug.map((s) => {
      return (
        <SearchSuggestion
          name={s.title}
          listId={this.state.listId}
          img={s.image}
          url={s.url}
          desc={s.desc}
          addEntry={this.addEntry}
        />
      );
    })
  }

  render() {

    return (
      <div>
        <div className="infoText">
          {this.listInfo}
        </div>
        <div className="centerText">
          <input
              id="searchBar"
              type="text"
              placeholder="Add movie..."
              onChange={this.searchInput}
            />
            <Card className="align-items-center" id="searchSuggestions">
              <ListGroup variant="flush">
                {this.renderSearchSuggestions()}
                  <button id="show" hidden onClick={() => this.changeLimit()}>
                    Show more
                  </button>
              </ListGroup>
            </Card>
          </div>
        <br />

        {/* Table that displays list entries */}
        <div className="container">
          <Table striped bordered>
            <thead>
              <tr>
                <th className="centerText tableElement">
                  #
                </th>
                <th className="centerText tableElement">
                  Title
                </th>
                <th>
                  Rating
                </th>
              </tr>
            </thead>
            {this.renderEntries()}
            <tbody id="listEntries">
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    const listPageId = ownProps.match.params.id;

    return { entries: state.entries, listId: listPageId, listInfo: state.listInfo};
}

function loadData(store, pageNum) {
  let val = null
  
  console.log('calling fetch Entries with pageNum: ', pageNum);
  val = Promise.all([
    store.dispatch(fetchEntries(pageNum)),
    store.dispatch(fetchListInfo(pageNum))
  ])
  
  
  return val;
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchEntries, fetchListInfo })(ListPage)
};


import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEntries, fetchListInfo } from "../actions";
import {
  Card,
  ListGroup,
  Table,
  Modal,
  Button,
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
        props.addEntry(props.name, props.img, props.url, props.desc)
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
        showHide: false,
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
    this.addEntry = this.addEntry.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.editEntry = this.editEntry.bind(this);


    console.log("data: ", this.state);
  }

  componentDidMount() {
    this.setState({documentLoaded: true})
    this.props.fetchEntries(this.state.listId)
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


  addEntry(entryName, entryImg, url, description){
    let reqURL = "https://list-maker-api.herokuapp.com/addEntry";
    axios.post(reqURL, {
      listId: this.state.listId,
      listType: this.state.listType,
      title: entryName,
      img: entryImg,
      url: url,
      desc: description
    });
    this.componentDidMount();
  }

  async removeEntry(entryId){
    let reqURL = "https://list-maker-api.herokuapp.com/removeEntry";
    await axios.post(reqURL, {
      entryId: entryId,
      listId: this.state.listId
    })
    .then(this.componentDidMount()); //this makes it so page is showing updated information
  }

  async changeOrder(entryId, position, direction){
    let reqURL = "https://list-maker-api.herokuapp.com/changeOrder";

    await axios.post(reqURL, {
      listId: this.state.listId,
      position: position,
      entryId: entryId,
      direction: direction
    })
    .then(this.componentDidMount());
  }

  toggleFormVisibility() {
    this.setState({ showHide: !this.state.showHide });

  }


  editEntry(entryId, entryName,  entryImg, entryNotes, entryRating, entryDesc, entryUrl) {
    this.entryName = entryName;
    this.entryImg = entryImg;
    this.entryNotes = entryNotes;
    this.entryUrl = entryUrl
    //this sets the entryId so that the submission function can get the ID without having to make API call
    this.entryId = entryId;
    this.entryRating = entryRating;
    this.entryDesc = entryDesc;

    this.toggleFormVisibility();
  }

  async submitEdit(){
    let newNote = document.getElementById('notes').value;
    let rating = document.getElementById('rating').value;
    console.log('edit rating is: ', rating)
    let reqURL = "https://list-maker-api.herokuapp.com/editEntry"

    await axios.put(reqURL, {
      entryId: this.entryId,
      newNote: newNote,
      rating: rating
    })
    .then(() => {
      this.toggleFormVisibility();
    })
    this.componentDidMount();

  }

  renderEntries() {
    return this.props.entries.map((e) => {
      return (<ListEntry
        key={e.id}
        id={e.id}
        title={e.title}
        image={e.image}
        url={e.url}
        position={e.position}
        description={e.desc}
        rating={e.rating}
        notes={e.notes}
        removeEntry={this.removeEntry}
        changeOrder={this.changeOrder}
        editEntry={this.editEntry}
        />
    );
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
            <tbody id="listEntries">
              {this.renderEntries()}
            </tbody>
          </Table>
        </div>
        <Modal
          show={this.state.showHide}
          onHide={() => this.setState({ showHide: false })}
          onLoad = {() => {
            console.log('setting rating: ', this.entryRating)
            document.getElementById("rating").value = this.entryRating
            /*
            if (!this.state.ownPage){
              document.getElementById('notes').disabled = true;
              document.getElementById('rating').disabled = true;
              document.getElementById('saveBtn').hidden = true;  
            }
            */
          }}
        >
          <Modal.Header>
              <img alt="Entry Pic" src={this.entryImg}></img>
            <Modal.Title className="editTitle">{this.entryName}</Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Description:</strong>
            </p>
            <p style={{marginTop: '-15px'}}>{this.entryDesc} <a className="nonHyperLink" href={this.entryUrl}>Source</a></p>
            
            <p> <strong>Notes:</strong></p>

              <textarea id="notes" defaultValue={this.entryNotes}></textarea>
              <label>Rating:</label><select name="rating" id ="rating">
              <option value="-">-</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
              <option value="0">0</option>
              </select>
              <label>/10</label>

          </Modal.Body>
          <Modal.Footer>

            <Button
              variant="secondary"
              onClick={() => this.toggleFormVisibility()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => this.submitEdit()}
              id="saveBtn"
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
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


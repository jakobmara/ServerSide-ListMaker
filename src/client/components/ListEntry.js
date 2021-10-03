import { Component } from "react";
import { Button } from "react-bootstrap";

class ListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.title,
      position: this.props.position,
      image: this.props.image,
      url: this.props.url,
    };
    this.removeEntry = this.props.removeEntry.bind(this)
  }



  render() {
    return (
      <tr>
        <td>
          <h3>{this.props.position}</h3>
        </td>
        <td
          className="entry entryInfo"
          
          onClick={() =>
            this.props.editEntry(
              this.props.id,
              this.props.title,
              this.props.image,
              this.props.notes,
              this.props.rating,
              this.props.description,
              this.props.url,
              this.props.position
            )
          }
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-auto">
                <img
                  className="cemter-img img-fluid entryImage"
                  src={this.state.image}
                  alt="poster of entry"
                ></img>
              </div>
              <div className="col">
                <div className="row">
                  <h2>{this.state.name}</h2>
                </div>
                <div className="row">
                  <div className="col">
                    <Button
                      variant="outline-danger"
                      onClick={ (e) => {
                        e.stopPropagation()
                        this.props.removeEntry(this.props.id)
                      }}
                      className="removeBtn"
                    >
                      Remove
                    </Button>
                    <p id="arrOffset">
                      <button
                        id="upArrow"
                        onClick={(e) => {
                          e.stopPropagation();
                          this.props.changeOrder(
                            this.props.id,
                            this.props.position,
                            "up"
                          )
                        }
                        }
                      >
                        <i className="arrow up"> </i>
                      </button>
                    </p>
                    <p id="arrOffset">
                      <button
                        id="downArrow"
                        onClick={(e) => {
                          e.stopPropagation();
                          this.props.changeOrder(
                            this.props.id,
                            this.props.position,
                            "down"
                          )
                        }
                          
                        }
                      >
                        <i className="arrow down"> </i>
                      </button>
                    </p>
                  </div>
                  <div className="col-10 d-lg-block d-none">
                        <p className="centerText">
                           Notes
                        </p>
                        <hr className="divider" />
                        <p className="entryNotes"> {this.props.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
        <td className="rating">
          {this.props.rating}/10
        </td>
      </tr>
    );
  }
}

export default {
    component: ListEntry
};

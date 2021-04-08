import React, { Component } from "react";
import axios from "axios";

export class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      email: "",
      password: "",
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
      axios({
        url: `users/${id}`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((item) => {
        console.log(item);
        this.setState({
          id: item.data.data.id,
          name: item.data.data.name,
          email: item.data.data.email,
        });
      });
  }
  updateUser = () => {
    let user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      };
      console.log(user)
      axios({
        url: `users/${this.state.id}`,
        method: "PUT",
        data: user,
      })
        .then((item) => {
          console.log(item);
        }).catch(
            error => {
                console.log(error)
            }
        );
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Update User</h1>
            
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" onClick={this.updateUser}>
                  Update
                </button>
              </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

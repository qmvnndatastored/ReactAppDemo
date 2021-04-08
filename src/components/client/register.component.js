import axios from "axios";
import React, { Component } from "react";

export default class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    axios
      .post("users", data)
      .then((res) => {
        alert("Register succes. Go to your email and verify your acount");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3> Sign Up </h3>
        <div className="form-group">
          <label> Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="name"
            onChange={(e) => (this.name = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label> Email </label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            onChange={(e) => (this.email = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label> Password </label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            onChange={(e) => (this.password = e.target.value)}
          />
        </div>

        <button className="btn btn-block btn-primary"> Sign Up</button>
      </form>
    );
  }
}

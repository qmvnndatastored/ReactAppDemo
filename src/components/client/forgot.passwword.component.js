import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class ForgotPassword extends Component {
  state = {};
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.email,
    };
    axios({
      url: "http://127.0.0.1:8000/api/password/forgot-password",
      method: "POST",
      data: data,
    })
      .then((res) => {
        alert("Reset password link sent on your email id");
        this.setState({
          loggedIn: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    if (this.state.loggedIn) {
      return <Redirect to={"/login"} />;
    }
    return (
      <React.Fragment>
        <div class="site-section">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <h2 class="h3 mb-5 text-black">Login</h2>
              </div>
              <div class="col-md-12">
                <form onSubmit={this.handleSubmit}>
                  <div class="p-3 p-lg-5 border">
                    <div class="form-group row">
                      <div class="col-md-12">
                        <label for="c_email" class="text-black">
                          Email <span class="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="c_email"
                          name="c_email"
                          placeholder="Email"
                          onChange={(e) => (this.email = e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-lg-12">
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg btn-block"
                        >
                          GET LINK
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

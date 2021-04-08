import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class ResetPassword extends Component {
  state = {};
  getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    let stringPathName = window.location.href;
    console.log(stringPathName);
    let token = this.getParameterByName("token", stringPathName);
    const data = {
      email: this.email,
      password_confirmation: this.password_confirmation,
      password: this.password,
      token: token,
    };
    axios({
      url: "http://127.0.0.1:8000/api/password/reset",
      method: "POST",
      data: data,
    })
      .then((res) => {
        alert("Password reset success. Go to login!!!");
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
                      <div class="col-md-12">
                        <label for="c_email" class="text-black">
                          New Password <span class="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          class="form-control"
                          id="c_password"
                          name="c_password"
                          placeholder="Password"
                          onChange={(e) => (this.password = e.target.value)}
                        />
                      </div>
                      <div class="col-md-12">
                        <label for="c_email" class="text-black">
                          New Password confirm{" "}
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          class="form-control"
                          id="c_password_confirm"
                          name="c_password_confirm"
                          placeholder="password_confirm"
                          onChange={(e) =>
                            (this.password_confirmation = e.target.value)
                          }
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

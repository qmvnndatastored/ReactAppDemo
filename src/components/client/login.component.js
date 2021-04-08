import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {};
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    axios
      .post("login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.access_token);
        localStorage.setItem("id", res.data.data.user.id);
        this.setState({
          loggedIn: true,
        });
        this.props.setUser(res.data.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    if (this.state.loggedIn) {
      return <Redirect to={"/"} />;
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
                          Name <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="c_email"
                          placeholder="Name"
                          onChange={(e) => (this.name = e.target.value)}
                        />
                      </div>
                    </div>
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
                      <div class="col-md-12">
                        <label for="c_subject" class="text-black">
                          Password{" "}
                        </label>
                        <input
                          type="password"
                          class="form-control"
                          id="c_subject"
                          name="c_subject"
                          onChange={(e) => (this.password = e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="">
                      <Link class="small" to="/forgot-password">
                        Forgot Password?
                      </Link>
                    </div>
                    <div class="form-group row">
                      <div class="col-lg-12">
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg btn-block"
                        >
                          LOGIN
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

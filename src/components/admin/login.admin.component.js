import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class LoginAdmin extends Component {
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
        localStorage.setItem("token_admin", res.data.data.access_token);
        localStorage.setItem("id_admin", res.data.data.user.id);
        this.setState({
          loggedIn: true,
        });
        this.props.setUserAdmin(res.data.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    if (this.state.loggedIn) {
      return <Redirect to={"/admin"} />;
    }
    return (
      <React.Fragment>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
              <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                  <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div class="col-lg-6">
                      <div class="p-5">
                        <div class="text-center">
                          <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form class="user" onSubmit={this.handleSubmit}>
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              onChange={(e) => (this.email = e.target.value)}
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="password"
                              class="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              onChange={(e) => (this.password = e.target.value)}
                            />
                          </div>
                          <div class="form-group">
                            <div class="custom-control custom-checkbox small">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customCheck"
                              />
                              <label
                                class="custom-control-label"
                                for="customCheck"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <button class="btn btn-primary btn-user btn-block">
                            Login
                          </button>
                          <hr />
                          <a
                            href="index.html"
                            class="btn btn-google btn-user btn-block"
                          >
                            <i class="fab fa-google fa-fw"></i> Login with
                            Google
                          </a>
                          <a
                            href="index.html"
                            class="btn btn-facebook btn-user btn-block"
                          >
                            <i class="fab fa-facebook-f fa-fw"></i> Login with
                            Facebook
                          </a>
                        </form>
                        <hr />
                        <div class="text-center">
                          <a class="small" href="forgot-password.html">
                            Forgot Password?
                          </a>
                        </div>
                        <div class="text-center">
                          <a class="small" href="register.html">
                            Create an Account!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

import React, { Component } from "react";
import axios from "axios";

import Menu from "./menu.component";
import Header from "./header.admin.component";

//css
import "./style/css/sb-admin-2.min.css";
import "./style/vendor/fontawesome-free/css/all.min.css";
// js
import "./style/vendor/jquery/jquery.min";
import "./style/vendor/jquery/jquery.slim.min";
import "./style/vendor/bootstrap/js/bootstrap.bundle.min";
import "./style/vendor/jquery-easing/jquery.easing.min";
import "./style/js/sb-admin-2.min.js";
import "./style/js/sb-admin-2.js";
export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat_id: 0,
      name: "",
      packet: "",
      price: 0,
      promo1: "",
      promo2: "",
      promo3: "",
      intro: "",
      review: "",
      status: 1,
      user_id: 1,
      active: 1,
      file: "",
      imagePreviewUrl: "",
      _products: [],
    };
  }
  state = {};
  componentDidMount = () => {
    // set user
    if (localStorage.getItem("id_admin")) {
      axios({
        url:
          "http://127.0.0.1:8000/api/users/" + localStorage.getItem("id_admin"),
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_admin"),
        },
      })
        .then((res) => {
          this.setUserAdmin(res.data.data);
          this.setState({
            userAdmin: res.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // get pproduct
    let slug = this.props.match.params.slug;
    axios({
      url: `http://127.0.0.1:8000/api/products/${slug}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_admin"),
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          loading: true,
          id: res.data.data.id,
          cat_id: res.data.data.cat_id,
          name: res.data.data.name,
          packet: res.data.data.packet,
          price: res.data.data.price,
          promo1: res.data.data.promo1,
          promo2: res.data.data.promo2,
          promo3: res.data.data.promo3,
          intro: res.data.data.intro,
          review: res.data.data.review,
          status: res.data.data.status,
          user_id: res.data.data.user_id,
          active: res.data.data.active,
          images: res.data.data.images,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  setUserAdmin = (user) => {
    this.setState({
      userAdmin: user,
    });
  };
  handleFileChange = (e) => {
    this.setState({
      image: e.target.files[0] || e.dataTransfer.files[0],
    });
    let reader = new FileReader();
    let file = e.target.files[0] || e.dataTransfer.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    console.log(this.state.imagePreviewUrl);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      cat_id: this.state.cat_id,
      name: this.state.name,
      packet: this.state.packet,
      price: this.state.price,
      promo1: this.state.promo1,
      promo2: this.state.promo2,
      promo3: this.state.promo3,
      intro: this.state.intro,
      review: this.state.review,
      status: this.state.status,
      active: this.state.active,
      // images: e.target.result,
    };
    if (this.state.image) {
      let reader = new FileReader();
      reader.readAsDataURL(this.state.image);
      reader.onload = (e) => {
        console.log(e.target.result);
        data = {
          ...data,
          images: e.target.result,
        };

        axios({
          url: `http://127.0.0.1:8000/api/products/${this.state.id}`,
          method: "PUT",
          data: data,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token_admin"),
            Accept: "application/json",
            type: "formData",
          },
        }).then((res) => {
          alert("Update Product success");
        });
      };
    } else {
      axios({
        url: `http://127.0.0.1:8000/api/products/${this.state.id}`,
        method: "PUT",
        data: data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_admin"),
          Accept: "application/json",
          type: "formData",
        },
      }).then((res) => {
        alert("Update Product success");
      });
    }
  };

  render() {
    let imagePreview = null;
    if (this.state.imagePreviewUrl) {
      imagePreview = <img src={this.state.imagePreviewUrl} />;
    } else {
      imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }
    if (this.state.userAdmin) {
      return (
        <React.Fragment>
          <div id="wrapper">
            <Menu />
            <div id="content-wrapper" class="d-flex flex-column">
              <div id="content">
                <Header
                  userAdmin={this.state.userAdmin}
                  setUserAdmin={this.setUserAdmin}
                />
                <form
                  onSubmit={this.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div class="container-fluid">
                    <h1 class="h3 mb-2 text-gray-800">
                      Edit Products {this.state.name}
                    </h1>
                    <div className="row">
                      <div class="col-sm-12 col-md-6">
                        <div class="dataTables_length">
                          <label>
                            Id Category
                            <input
                              type="text"
                              name="dataTable_length"
                              aria-controls="dataTable"
                              class="form-control form-control-sm"
                              value={this.state.cat_id}
                              onChange={(e) =>
                                this.setState({ cat_id: e.target.value })
                              }
                            />
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div id="dataTable_filter" class="dataTables_filter">
                          <label>
                            Name
                            <input
                              type="search"
                              class="form-control form-control-sm"
                              aria-controls="dataTable"
                              value={this.state.name}
                              onChange={(e) =>
                                this.setState({ name: e.target.value })
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div class="col-sm-12 col-md-6">
                        <div class="dataTables_length">
                          <label>
                            Packet
                            <input
                              name="dataTable_length"
                              aria-controls="dataTable"
                              class="form-control form-control-sm"
                              placeholder={this.state.packet}
                              onChange={(e) =>
                                this.setState({ packet: e.target.value })
                              }
                            />
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div id="dataTable_filter" class="dataTables_filter">
                          <label>
                            Price
                            <input
                              type="search"
                              class="form-control form-control-sm"
                              placeholder=""
                              aria-controls="dataTable"
                              value={this.state.price}
                              onChange={(e) =>
                                this.setState({ price: e.target.value })
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div class="col-sm-12 col-md-6">
                        <div class="dataTables_length">
                          <label>
                            Status
                            <input
                              name="dataTable_length"
                              aria-controls="dataTable"
                              class="form-control form-control-sm"
                              value={this.state.status}
                              onChange={(e) =>
                                this.setState({ status: e.target.value })
                              }
                            />
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div id="dataTable_filter" class="dataTables_filter">
                          <label>
                            Active
                            <select
                              class="form-control form-control-sm"
                              onChange={(e) =>
                                this.setState({ active: e.target.value })
                              }
                              value={this.state.active}
                            >
                              <option value="">Select active </option>
                              <option value="0">Hide</option>
                              <option value="1">Unhide</option>
                            </select>
                            {/* <input
                              class="form-control form-control-sm"
                              placeholder=""
                              aria-controls="dataTable"
                              value={this.state.active}
                              onChange={(e) =>
                                this.setState({ active: e.target.value })
                              }
                            /> */}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div class="col-sm-12 col-md-4">
                        <div class="dataTables_length">
                          <label>
                            Promotion 1
                            <input
                              name="dataTable_length"
                              aria-controls="dataTable"
                              class="custom-select custom-select-sm form-control form-control-sm"
                              value={this.state.promo1}
                              onChange={(e) =>
                                this.setState({ promo1: e.target.value })
                              }
                            />
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-4">
                        <div id="dataTable_filter" class="dataTables_filter">
                          <label>
                            Promotion 2
                            <input
                              type="search"
                              class="form-control form-control-sm"
                              placeholder=""
                              aria-controls="dataTable"
                              value={this.state.promo2}
                              onChange={(e) =>
                                this.setState({ promo2: e.target.value })
                              }
                            />
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-4">
                        <div id="dataTable_filter" class="dataTables_filter">
                          <label>
                            Promotion 3
                            <input
                              type="search"
                              class="form-control form-control-sm"
                              placeholder=""
                              aria-controls="dataTable"
                              value={this.state.promo3}
                              onChange={(e) =>
                                this.setState({ promo3: e.target.value })
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div className="col-md-12">
                        <label>
                          Intro
                          <input
                            class="form-control"
                            value={this.state.intro}
                            onChange={(e) =>
                              this.setState({ intro: e.target.value })
                            }
                          />
                        </label>
                      </div>
                      <div className="col-md-12">
                        <label>
                          Review
                          <input
                            class="form-control"
                            value={this.state.review}
                            onChange={(e) =>
                              this.setState({ review: e.target.value })
                            }
                          />
                        </label>
                      </div>
                      <div className="col-md-12">
                        <label>Img</label>
                        <img src={this.state.images} />
                      </div>
                      <div className="col-md-12">
                        <label>
                          Img
                          <input
                            id="images"
                            name="images"
                            type="file"
                            class="form-control"
                            onChange={this.handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">{imagePreview}</div>
                    <button className="btn btn-primary"> EDIT PRODUCT</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div id="wrapper">
          <Menu />
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Header
                userAdmin={this.state.userAdmin}
                setUserAdmin={this.setUserAdmin}
              />
              <div class="container-fluid">
                <h1 class="h3 mb-2 text-gray-800">You are not Login</h1>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

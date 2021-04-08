import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Nav from "./nav.component";
import Footer from "./footer.component";
//css
import "./style/fonts/icomoon/style.css";
import "./style/css/bootstrap.min.css";
//import "./style/fonts/flaticon/font/flaticon.css";
import "./style/css/magnific-popup.css";
import "./style/css/jquery-ui.css";
import "./style/css/owl.carousel.min.css";
import "./style/css/owl.theme.default.min.css";
import "./style/css/aos.css";
import "./style/css/style.css";
//js
import "./style/js/jquery-3.3.1.min";
import "./style/js/jquery-ui";
import "./style/js/popper.min";
import "./style/js/slick.min";
import "./style/js/owl.carousel.min";
import "./style/js/jquery.magnific-popup.min";
import "./style/js/aos";
import "./style/js/main";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      _products: {},
      cart: false,
    };
  }
  state = {};
  componentDidMount = () => {
    // set user
    if (localStorage.getItem("id")) {
      axios.get("users/" + localStorage.getItem("id")).then(
        (res) => {
          this.setUser(res.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    // get product
    let slug = this.props.match.params.slug;
    axios({
      url: `http://127.0.0.1:8000/api/products/${slug}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          _products: res.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      quantity: this.quantity,
      id: this.state._products.id,
    };
    axios({
      url: `http://127.0.0.1:8000/api/cart`,
      method: "POST",
      data: data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          cart: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const _products = this.state._products;
    if (this.state.cart) {
      return <Redirect to={"/cart"} />;
    }
    return (
      <React.Fragment>
        <Nav user={this.state.user} setUser={this.setUser} />
        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-md-5 mr-auto">
                <div className="border text-center">
                  <img
                    src={_products.images}
                    alt="Image"
                    className="img-fluid p-5"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h2 className="text-black">{_products.name}</h2>
                <p>{_products.intro}</p>
                <p>
                  <del></del>{" "}
                  <strong className="text-primary h4">
                    ${_products.price}
                  </strong>
                </p>
                <form onSubmit={this.handleSubmit}>
                  <div className="mb-5">
                    <div
                      className="input-group mb-3"
                      style={{ width: "220px" }}
                    >
                      <div>
                        <label className="text-center"> Nhập số lượng </label>
                      </div>
                      <input
                        type="text"
                        className="form-control text-center"
                        placeholder=""
                        onChange={(e) => (this.quantity = e.target.value)}
                      />
                    </div>
                  </div>
                  <p>
                    <button className="buy-now btn btn-sm height-auto px-4 py-3 btn-primary">
                      Add To Cart
                    </button>
                  </p>
                </form>

                <div className="mt-5">
                  <ul
                    className="nav nav-pills mb-3 custom-pill"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="pills-home-tab"
                        data-toggle="pill"
                        href="#pills-home"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Ordering Information
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="pills-profile-tab"
                        data-toggle="pill"
                        href="#pills-profile"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        Specifications
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <table className="table custom-table">
                        <thead>
                          <tr>
                            <td>Material</td>
                            <td>Description</td>
                            <td>Packaging</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">OTC022401</th>
                            <td>{}</td>
                            <td>{_products.packet}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <table className="table custom-table">
                        <tbody>
                          <tr>
                            <td>HPIS CODE</td>
                            <td className="bg-light">999_200_40_0</td>
                          </tr>
                          <tr>
                            <td>HEALTHCARE PROVIDERS ONLY</td>
                            <td className="bg-light">No</td>
                          </tr>
                          <tr>
                            <td>LATEX FREE</td>
                            <td className="bg-light">Yes, No</td>
                          </tr>
                          <tr>
                            <td>MEDICATION ROUTE</td>
                            <td className="bg-light">Topical</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

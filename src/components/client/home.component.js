/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable eqeqeq */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";

import Nav from "./nav.component";
import Footer from "./footer.component";

// css
import "./style/fonts/icomoon/style.css";
import "./style/css/bootstrap.min.css";
import "./style/css/magnific-popup.css";
import "./style/css/jquery-ui.css";
import "./style/css/owl.carousel.min.css";
import "./style/css/owl.theme.default.min.css";
import "./style/css/aos.css";
import "./style/css/style.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: "",
      offset: 0,
      limit: 18,
      _products: [],
      activePage: 1,
      itemsCountPerPage: 0,
      totalItemsCount: 0,
      pageRangeDisplayed: 5,
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

      axios({
        url:
          "http://127.0.0.1:8000/api/email/checkVerify/" +
          localStorage.getItem("id"),
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res);
          this.setState({
            verify: res.data.verify,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //check veryfy

    // get pproduct
    let limit = 18;
    let offset = 0;
    axios({
      url: `http://127.0.0.1:8000/api/products?offset=${offset}&limit=${limit}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          loading: true,
          _products: res.data.data.items,
          totalItemsCount: res.data.data.pagination.total,
          itemsCountPerPage: parseInt(limit),
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
  handleSend() {
    axios({
      url: `http://127.0.0.1:8000/api/email/resend`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        alert("Email verification link sent on your email id");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    let limit = parseInt(this.state.limit);
    let offset =
      parseInt(this.state.limit) * pageNumber - parseInt(this.state.limit);
    axios({
      url: `http://127.0.0.1:8000/api/products?offset=${offset}&limit=${limit}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          loading: true,
          _products: res.data.data.items,
          offset: 0,
          totalItemsCount: res.data.data.pagination.total,
          itemsCountPerPage: parseInt(limit),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ activePage: pageNumber });
  }
  showProduct = () => {
    let limit = this.state.limit;
    let offset = this.state.offset;
    axios({
      url: `http://127.0.0.1:8000/api/products?offset=${offset}&limit=${limit}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          loading: true,
          _products: res.data.data.items,
          totalItemsCount: res.data.data.pagination.total,
          itemsCountPerPage: parseInt(limit),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const _products = this.state._products;
    if (this.state.verify == "no") {
      return (
        <React.Fragment>
          <Nav user={this.state.user} setUser={this.setUser} />
          <div className="container">
            <div className="row center">
              <h1>You are not verify click here to request </h1>
            </div>
            <div className="row center">
              <button className="btn btn-primary" onClick={this.handleSend}>
                Click
              </button>
            </div>
          </div>

          <Footer />
        </React.Fragment>
      );
    }
    if (this.props.user) {
      return (
        <React.Fragment>
          <Nav user={this.state.user} setUser={this.setUser} />
          <div className="site-section bg-light">
            <div className="container">
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="input-group w-75">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.limit}
                      onChange={(e) => this.setState({ limit: e.target.value })}
                      id="c_code"
                      placeholder="Per Page"
                      aria-label="Coupon Code"
                      aria-describedby="button-addon2"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary btn-sm px-4"
                        type="button"
                        id="button-addon2"
                        onClick={this.showProduct}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {_products.map((item, index) => (
                  <div
                    key={index}
                    className="col-sm-6 col-lg-4 text-center item mb-4 item-v2"
                  >
                    <span className="onsale">Sale</span>
                    <Link to={`/product/${item.slug}`}>
                      <img
                        style={{ width: "150px", height: "100px" }}
                        src={item.images}
                        alt="Image"
                      />
                    </Link>
                    <h3 className="text-dark">
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      {/* <a href="shop-single.html">{item.name}</a> */}
                    </h3>
                    <p className="price">
                      <del>95.00</del> &mdash; {item.price}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Pagination
                  activePage={this.state.activePage}
                  totalItemsCount={this.state.totalItemsCount}
                  itemsCountPerPage={this.state.itemsCountPerPage}
                  onChange={this.handlePageChange.bind(this)}
                  prevPageText="prev"
                  nextPageText="next"
                  firstPageText="first"
                  lastPageText="last"
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Nav user={this.state.user} setUser={this.setUser} />
        <div className="container">
          <div className="row">
            <h1>You are not login</h1>;
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

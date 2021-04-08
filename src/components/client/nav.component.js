import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      number: 0,
      cartDetails: [],
    };
  }
  handleLogout = () => {
    axios({
      url: "logout",
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        alert("log out success");
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.clear();
    this.props.setUser(null);
  };
  componentDidMount = () => {
    axios({
      url: `http://127.0.0.1:8000/api/cart`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          carts: res.data.data.cart,
          cartDetails: res.data.data.cartDetail,
          number: res.data.data.cartDetail.length,
        });
        // this.setState({
        //   number: this.state.cartDetails.length,
        // });
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      url: `http://127.0.0.1:8000/api/category`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          category: res.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    let buttons;
    const category = this.state.category;
    if (this.props.user) {
      buttons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/mypage"} className="nav-link">
              My page
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/"} onClick={this.handleLogout} className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      buttons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              {" "}
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              {" "}
              Sign Up
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <React.Fragment>
        <div className="site-navbar py-2">
          <div className="search-wrap">
            <div className="container">
              <Link to="#" className="search-close js-search-close">
                <span className="icon-close2"></span>
              </Link>
              <form action="#" method="post">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search keyword and hit enter..."
                />
              </form>
            </div>
          </div>
          <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <div className="logo">
                <div className="site-logo">
                  <Link to="/" className="js-logo-clone">
                    <strong className="text-primary">Pharma</strong>tive
                  </Link>
                </div>
              </div>
              <div className="main-nav d-none d-lg-block">
                <nav
                  className="site-navigation text-right text-md-center"
                  role="navigation"
                >
                  <ul className="site-menu js-clone-nav d-none d-lg-block">
                    <li className="active">
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/">Store</Link>
                    </li>
                    <li className="has-children">
                      <Link to="#">Products</Link>
                      <ul className="dropdown">
                        {category.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={{
                                pathname: `/category/${item.slug}`,

                                state: { slug: item.slug },
                              }}
                              replace
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}

                        {/* <li className="has-children">
                          <Link to="#">Vitamins</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="#">Supplements</Link>
                            </li>
                            <li>
                              <Link to="#">Vitamins</Link>
                            </li>
                            <li>
                              <Link to="#">Diet &amp; Nutrition</Link>
                            </li>
                            <li>
                              <Link to="#">Tea &amp; Coffee</Link>
                            </li>
                          </ul>
                        </li> */}
                      </ul>
                    </li>
                    <li>
                      <Link to="about.html">About</Link>
                    </li>
                    <li>
                      <Link to="contact.html">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="icons">
                <Link
                  to="#"
                  className="icons-btn d-inline-block js-search-open"
                >
                  <span className="icon-search"></span>
                </Link>
                <Link to="/cart" className="icons-btn d-inline-block bag">
                  <span className="icon-shopping-bag"></span>
                  <span className="number">{this.state.number}</span>
                </Link>
                <Link
                  to="#"
                  className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"
                >
                  <span className="icon-menu"></span>
                </Link>
              </div>

              <nav className="navbar navbar-expand fix-top">
                <div className="collapse navbar-collapse">{buttons}</div>
              </nav>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

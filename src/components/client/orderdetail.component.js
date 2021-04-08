import React, { Component } from "react";
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

export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkOut: false,
      order: [],
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
    // get cart
    let id = this.props.match.params.id;
    axios({
      url: `http://127.0.0.1:8000/api/orderUser/${id}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          order: res.data.data,
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

  render() {
    const order = this.state.order;

    return (
      <React.Fragment>
        <Nav user={this.state.user} setUser={this.setUser} />
        <div className="site-section">
          <div className="container">
            <form>
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="site-blocks-table">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="product-name">No</th>
                          <th className="product-name">Name</th>
                          <th className="product-name">Image</th>
                          <th className="product-quantity">Price</th>
                          <th className="product-total">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.map((item, index) => (
                          <tr key={index}>
                            <td className="product-name">
                              <h2 className="h5 text-black">
                                {parseInt(index) + 1}
                              </h2>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.images} </td>
                            <td> ${item.price} </td>
                            <td> {item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

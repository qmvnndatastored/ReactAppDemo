import React, { Component } from "react";
import axios from "axios";

import Nav from "./nav.component";
import Footer from "./footer.component";
//css
import "./style/fonts/icomoon/style.css";
import "./style/css/bootstrap.min.css";
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

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkOut: false,
      carts: {},
      cartDetails: [],
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
        });
        console.log(this.state.cartDetails);
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
      type: this.type,
      note: this.note,
      address: this.address,
    };
    axios({
      url: `http://127.0.0.1:8000/api/order`,
      method: "POST",
      data: data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        alert("Bạn đặt hàng thành công");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const carts = this.state.carts;
    const cartDetails = this.state.cartDetails;
    return (
      <React.Fragment>
        <Nav user={this.state.user} setUser={this.setUser} />
        <form onSubmit={this.handleSubmit}>
          <div class="site-section">
            <div class="container">
              <div class="row">
                <div class="col-md-6 mb-5 mb-md-0">
                  <h2 class="h3 mb-3 text-black">Billing Details</h2>
                  <div class="p-3 p-lg-5 border">
                    <div class="form-group">
                      <label for="c_country" class="text-black">
                        Country <span class="text-danger">*</span>
                      </label>
                      <select
                        id="c_country"
                        class="form-control"
                        onChange={(e) => (this.type = e.target.value)}
                      >
                        <option value="1">Select a payment</option>
                        <option value="COD">COD</option>
                        <option value="Paypal">Paypal</option>
                      </select>
                    </div>

                    <div class="form-group row">
                      <div class="col-md-12">
                        <label for="c_address" class="text-black">
                          Address <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="c_address"
                          name="c_address"
                          placeholder="Street address"
                          onChange={(e) => (this.address = e.target.value)}
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="c_order_notes" class="text-black">
                        Order Notes
                      </label>
                      <textarea
                        name="c_order_notes"
                        id="c_order_notes"
                        cols="30"
                        rows="5"
                        class="form-control"
                        placeholder="Write your notes here..."
                        onChange={(e) => (this.note = e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row mb-5">
                    <div class="col-md-12">
                      <h2 class="h3 mb-3 text-black">Your Order</h2>
                      <div class="p-3 p-lg-5 border">
                        <table class="table site-block-order-table mb-5">
                          <thead>
                            <th>Product</th>
                            <th>Total</th>
                          </thead>
                          <tbody>
                            {cartDetails.map((item, index) => (
                              <tr>
                                <td>
                                  {item.name} <strong class="mx-2">x</strong>{" "}
                                  {item.quantity}
                                </td>
                                <td>
                                  $
                                  {parseFloat(item.price) *
                                    parseInt(item.quantity)}
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td class="text-black font-weight-bold">
                                <strong>Cart Subtotal</strong>
                              </td>
                              <td class="text-black">${carts.sub_total}</td>
                            </tr>
                            <tr>
                              <td class="text-black font-weight-bold">
                                <strong>Order Total</strong>
                              </td>
                              <td class="text-black font-weight-bold">
                                <strong>${carts.total}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div class="form-group">
                          <button class="btn btn-primary btn-lg btn-block">
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <Footer />
      </React.Fragment>
    );
  }
}

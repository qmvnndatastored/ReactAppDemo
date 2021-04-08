import { BrowserRouter, Route, Switch } from "react-router-dom";
import { React, Component } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/client/home.component";
//import Nav from './components/client/nav.component';
import Login from "./components/client/login.component";
import Register from "./components/client/register.component";

import Mypage from "./components/client/mypage.component";
import Product from "./components/client/product.component";
import Cart from "./components/client/cart.component";
import Edit from "./components/user/edit";
import Checkout from "./components/client/checkout.component";
import OrderDetail from "./components/client/orderdetail.component";
import ProductCategory from "./components/client/productcategory.component";

import Admin from "./components/admin/admin.component";
import LoginAdmin from "./components/admin/login.admin.component";
import AdminProduct from "./components/admin/product.admin.component";
import AddProduct from "./components/admin/addproduct.admin.component";
import EditProduct from "./components/admin/editproduct.admin.component";
import OrderAdmin from "./components/admin/orderadmin.component";
import OrderDetailAdmin from "./components/admin/orderdetail.admin.component";
import CategoryAdmin from "./components/admin/categoryadmin.component";
import AddCategory from "./components/admin/addcategory.admin.component";
import CategoryProductAdmin from "./components/admin/categoryproduct.admin.component";
import EditCategory from "./components/admin/editcategory.admin.component";
import ForgotPassword from "./components/client/forgot.passwword.component";
import ResetPassword from "./components/client/reset.password.component";

export default class App extends Component {
  state = {};
  componentDidMount = () => {
    if (localStorage.getItem("id")) {
      axios({
        url: "http://127.0.0.1:8000/api/users/" + localStorage.getItem("id"),
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          this.setUser(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };
  setUserAdmin = (userAdmin) => {
    this.setState({
      userAdmin: userAdmin,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/password/reset" exact component={ResetPassword} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          {/* client */}
          <Route
            path="/"
            exact
            component={() => <Home user={this.state.user} />}
          />
          <Route
            path="/login"
            exact
            component={() => <Login setUser={this.setUser} />}
          />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/orderDetail/:id" exact component={OrderDetail} />
          <Route path="/product/:slug" exact component={Product} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/register" exact component={Register} />
          <Route path="/edit/:id" exact component={Edit} />
          <Route path="/category/:slug" exact component={ProductCategory} />
          {/* Admin */}
          <Route
            path="/admin"
            exact
            component={() => <Admin userAdmin={this.state.userAdmin} />}
          />
          <Route
            path="/admin/login"
            exact
            component={() => <LoginAdmin setUserAdmin={this.setUserAdmin} />}
          />
          <Route path="/admin/product" exact component={AdminProduct} />
          <Route path="/admin/addproduct" exact component={AddProduct} />
          <Route
            path="/admin/editproduct/:slug"
            exact
            component={EditProduct}
          />
          <Route path="/admin/order" exact component={OrderAdmin} />
          <Route
            path="/admin/orderdetail/:id"
            exact
            component={OrderDetailAdmin}
          />
          <Route path="/admin/category" exact component={CategoryAdmin} />
          <Route path="/admin/addCategory" exact component={AddCategory} />
          <Route
            path="/admin/category/:slug"
            exact
            component={CategoryProductAdmin}
          />
          <Route
            path="/admin/editcategory/:slug"
            exact
            component={EditCategory}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      _users: [],
    };
  }

  componentDidMount() {
    axios() (`users`, "GET").then((item) => {
      //alert(limit);
      //setState data

      this.setState({
        loading: true,
        _users: item.data.items,
      });
    });
    axios({
        url: "logout",
        method: "POST",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
        console.log(res);
        this.setState({
            loading: true,
            _users: res.data.items,
        });
    })
    .catch((error) => {
        console.log(error);
    });  
      
  }
//   deleteProduct = (id) => {
//     callApi(`users/${id}`, "DELETE", null).then((item) => {
//       this.setState({
//         // eslint-disable-next-line eqeqeq
//         _users: this.state._users.filter((user) => user.id != id),
//       });
//     });
//   };

  render() {
    const { loading, _users } = this.state;
    if (!loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  {/* <th>Image</th> */}
                  <th>Email</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {_users.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    {/* <td><img src= '' style={{width:'60px',height:'40px'}} /></td> */}
                    <td>{item.email}</td>
                    <td>
                      <Link to={`/edit/${item.id}`}>
                        <span className="badge badge-warning text-white">
                          modify
                        </span>
                      </Link>
                    </td>
                    <td>
                      <span
                        className="badge badge-danger"
                        onClick={() => this.deleteProduct(item.id)}
                      >
                        remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default User;

// src/components/UserForm.js
import React, { Component } from "react";
import "./UserList.css";
import "./UserForm.css";

class UserForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    error: "",
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.currentUser &&
      this.props.currentUser !== prevProps.currentUser
    ) {
      const { firstName, lastName, email, department } = this.props.currentUser;
      this.setState({ firstName, lastName, email, department, error: "" });
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const { firstName, lastName, email, department } = this.state;
    if (!firstName || !lastName || !email || !department) {
      this.setState({ error: "All fields are required" });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      this.setState({ error: "Please enter a valid email" });
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { users, addUser, editUser, currentUser } = this.props;

    // Check if the email already exists (except for the current user)
    const existingEmail = users.some(
      (user) => user.email === this.state.email && user.id !== currentUser?.id
    );

    if (existingEmail) {
      this.setState({ error: "This email is already taken" });
      return;
    }

    if (!this.validateForm()) return;

    const { firstName, lastName, email, department } = this.state;
    const newUser = { firstName, lastName, email, department };

    if (currentUser) {
      // Edit user if in edit mode
      editUser({ ...newUser, id: currentUser.id });
    } else {
      // Add new user if not in edit mode
      addUser(newUser);
    }

    // Reset the form after submission
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      error: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="user-form">
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleInputChange}
          placeholder="First Name"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleInputChange}
          placeholder="Last Name"
          className="form-control mb-5"
        />
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
          placeholder="Email"
          className="form-control mb-5"
        />
        <input
          type="text"
          name="department"
          value={this.state.department}
          onChange={this.handleInputChange}
          placeholder="Department"
          className="form-control mb-5"
        />
        <button type="submit" className="btn btn-primary mb-2">
          {this.props.currentUser ? "Update User" : "Add User"}
        </button>
        {this.state.error && <p className="error-text">{this.state.error}</p>}
      </form>
    );
  }
}

export default UserForm;

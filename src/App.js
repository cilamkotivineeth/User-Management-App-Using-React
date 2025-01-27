import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // For generating UUIDs
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    showForm: false,
    currentUser: null,
    error: null,
    page: 1, // Track the current page
    isLoading: false, // Flag to check if data is being loaded
  };

  // Fetch users when the component mounts or when the page changes
  async componentDidMount() {
    this.fetchUsers();
    window.addEventListener("scroll", this.handleScroll);
  }

  // Cleanup the scroll event listener when the component unmounts
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  fetchUsers = async () => {
    const { page } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=10`
      );
      const usersWithUuid = response.data.map((user) => ({
        ...user,
        uuid: uuidv4(), // Add UUID to each user
      }));
      this.setState((prevState) => ({
        users: [...prevState.users, ...usersWithUuid],
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error: "Failed to fetch users", isLoading: false });
    }
  };

  handleScroll = () => {
    const { isLoading } = this.state;
    const bottomOfPage =
      document.documentElement.scrollHeight ===
      document.documentElement.scrollTop + window.innerHeight;

    if (bottomOfPage && !isLoading) {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        () => {
          this.fetchUsers(); // Fetch next set of users
        }
      );
    }
  };

  toggleForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
      currentUser: null,
    }));
  };

  addUser = async (newUser) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );
      const userWithUuid = { ...newUser, id: response.data.id, uuid: uuidv4() }; // Add uuid
      this.setState({
        users: [...this.state.users, userWithUuid],
        showForm: false,
        currentUser: null,
      });
    } catch (error) {
      this.setState({ error: "Failed to add user" });
    }
  };

  editUser = async (updatedUser) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      );
      const updatedUsers = this.state.users.map(
        (user) =>
          user.id === updatedUser.id
            ? { ...updatedUser, uuid: user.uuid }
            : user // Keep the existing uuid
      );
      this.setState({
        users: updatedUsers,
        showForm: false,
        currentUser: null,
      });
    } catch (error) {
      this.setState({ error: "Failed to update user" });
    }
  };

  deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedUsers = this.state.users.filter((user) => user.id !== id);
      this.setState({ users: updatedUsers });
    } catch (error) {
      this.setState({ error: "Failed to delete user" });
    }
  };

  handleEdit = (user) => {
    this.setState({ currentUser: user, showForm: true });
  };

  render() {
    const { users, showForm, currentUser, error, isLoading } = this.state;

    return (
      <div className="App">
        <h1 className="MainHeading">User Management</h1>
        <button className="btn btn-primary button" onClick={this.toggleForm}>
          {showForm ? "Close Form" : "Add User"}
        </button>

        <ErrorBoundary>
          {showForm && (
            <UserForm
              users={users}
              addUser={this.addUser}
              editUser={this.editUser}
              currentUser={currentUser}
            />
          )}
          <UserList
            users={users}
            deleteUser={this.deleteUser}
            handleEdit={this.handleEdit}
          />
          {error && <p className="error-text">{error}</p>}
          {isLoading && (
            <div className="loading-text">Loading more users...</div>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

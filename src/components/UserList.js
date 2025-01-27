// src/components/UserList.js
import React from "react";

const UserList = ({ users, deleteUser, handleEdit }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr className="hidden">
          <th>S.NO</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>UUID</th>
          <th>ID</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={user.uuid}>
            <td>
              <span>S.No : </span>
              {index + 1}
            </td>{" "}
            {/* Serial number based on user position */}
            <td>
              <span>FIRST NAME : </span>
              {user.firstName}
            </td>
            <td>
              <span>LAST NAME : </span>
              {user.lastName}
            </td>
            <td>
              <span>EMAIL : </span>
              {user.email}
            </td>
            <td>
              <span>DEPARTMENT : </span>
              {user.department}
            </td>
            <td>
              <span>UNIQUE ID : </span>
              {user.uuid}
            </td>{" "}
            {/* Display UUID */}
            <td>
              <span>USER ID : </span>
              {user.id}
            </td>{" "}
            {/* Display ID */}
            <td>
              <button
                className="btn btn-warning"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;

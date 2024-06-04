import React, { useState } from 'react';

const FormReg = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    designation: '',
    email: '',
  });

  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Add a state for the index of the user being edited

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (editIndex === -1) { // If not editing, add a new user
        setUsers([...users, formData]);
      } else { // If editing, update the user
        const updatedUsers = [...users];
        updatedUsers[editIndex] = formData;
        setUsers(updatedUsers);
        setEditIndex(-1); // Reset editIndex after updating
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      designation: '',
      email: '',
    });
  };

  const validateForm = () => {
    const { firstName, lastName, gender, designation, email } = formData;
    if (!firstName || !lastName || !gender || !designation || !email) {
      alert('Please fill out all fields.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email.');
      return false;
    }

    return true;
  };

  const handleEdit = (index) => {
    setEditIndex(index); // Set the editIndex to the index of the user being edited
    const userToEdit = users[index];
    setFormData(userToEdit); // Set the formData to the user being edited
  };

  const handleDelete = (index) => {
    const filteredUsers = users.filter((_user, i) => i !== index);
    setUsers(filteredUsers);
  };

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Designation:</label>
          <select name="designation" value={formData.designation} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Senior Engineer">Senior Engineer</option>
            <option value="Associate Engineer">Associate Engineer</option>
            <option value="Trainee">Trainee</option>
            <option value="Intern">Intern</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{editIndex === -1 ? 'Submit' : 'Update'}</button>
        </form>
      </div>

      <div>
        {users.map((user, index) => (
          <div className="data" key={index}>
            <h2>User {index + 1}</h2>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Gender: {user.gender}</p>
            <p>Designation: {user.designation}</p>
            <p>Email: {user.email}</p>
            <button className="edit" onClick={() => handleEdit(index)}>Edit User</button>
            <button className="delete" onClick={() => handleDelete(index)}>Delete User</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FormReg;
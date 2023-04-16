import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };
    setUsers([...users, newUser]);
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>User List</h1>
      <SearchInput
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredUsers.map((user) => (
        <User key={user.id}>
          <p>User ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </User>
      ))}
      <Form onSubmit={handleSubmit}>
        <FormLabel htmlFor="name">Name:</FormLabel>
        <FormInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <FormLabel htmlFor="email">Email:</FormLabel>
        <FormInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <FormLabel htmlFor="phone">Phone:</FormLabel>
        <FormInput
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <FormButton type="submit">Add User</FormButton>
      </Form>
    </div>
  );
};

const SearchInput = styled.input`
  margin-bottom: 20px;
`;

const User = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  margin-bottom: 10px;
`;

const FormButton = styled.button`
  background-color: #008000;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #006600;
  }
`;

export default Users;

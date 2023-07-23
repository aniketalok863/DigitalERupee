import React, { useState } from 'react';
import axios from 'axios';
import '/home/akhilesh/Desktop/PG_Program/Digital_eRupee/eRupee/frontend/src/App.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    balance: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/register', formData);
        console.log('User registered:', response.data);
        // Reset form data after successful submission (optional)
        setFormData({
          name: '',
          email: '',
          password: '',
          balance: '',
        });
        // Display a success message or redirect to a success page
      } catch (error) {
        console.error('Error registering user:', error);
        // Handle error, display an error message, or perform appropriate actions
      }
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    if (!formData.balance.trim()) {
      errors.balance = 'Balance is required';
    } else if (isNaN(formData.balance)) {
      errors.balance = 'Balance must be a number';
    }
    return errors;
  };

  return (
    <div className="container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>User Registration</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="balance"
            placeholder="Balance"
            value={formData.balance}
            onChange={handleChange}
          />
          {errors.balance && <span className="error">{errors.balance}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserForm;

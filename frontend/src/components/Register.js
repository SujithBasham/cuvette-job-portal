import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const { name, email, password, phone } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" name="name" value={name} onChange={onChange} placeholder="Company Name" required />
      </div>
      <div>
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      </div>
      <div>
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      </div>
      <div>
        <input type="tel" name="phone" value={phone} onChange={onChange} placeholder="Phone" required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;

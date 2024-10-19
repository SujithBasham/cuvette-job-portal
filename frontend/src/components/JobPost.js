import React, { useState } from 'react';
import axios from 'axios';

function JobPost() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    experienceLevel: '',
    endDate: ''
  });

  const { jobTitle, jobDescription, experienceLevel, endDate } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('/api/jobs/post-job', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" name="jobTitle" value={jobTitle} onChange={onChange} placeholder="Job Title" required />
      </div>
      <div>
        <textarea name="jobDescription" value={jobDescription} onChange={onChange} placeholder="Job Description" required />
      </div>
      <div>
        <input type="text" name="experienceLevel" value={experienceLevel} onChange={onChange} placeholder="Experience Level" required />
      </div>
      <div>
        <input type="date" name="endDate" value={endDate} onChange={onChange} required />
      </div>
      <button type="submit">Post Job</button>
    </form>
  );
}

export default JobPost;

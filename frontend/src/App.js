import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import JobPost from './components/JobPost';

function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/post-job" component={JobPost} />
    </Router>
  );
}

export default App;

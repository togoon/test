/*
 * react-router初探
 */
import React  from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route } from 'react-router-dom'


const Dashboard = ()=>{
  return <div>
     这是dashboard
  </div>
}

const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard}/>
    </div>
  </div>
)

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
,
  document.getElementById('root')
);

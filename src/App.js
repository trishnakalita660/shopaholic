import React from 'react';
import {Switch, Route } from 'react-router-dom';
import './default.scss';
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
function App() {
  return (
    <div className="App">
    <Switch>
     <Route exact path ="/"  render={()=>(
       <HomepageLayout>
       <Homepage/>
       </HomepageLayout>
     )} />
     <Route path = "/registration"  render={()=>( 
       <MainLayout>
      <Registration/>
      </MainLayout>)} />
     </Switch>
    </div>
  );
}

export default App;

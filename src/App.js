import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,

} from 'react-router-dom';
const Login = React.lazy(() =>
  import('./views/user/Login/Login')
);

const DashboardMain = React.lazy(() =>
  import('./views/app/DashboardMain')
);

function App() {
  return (

    <>
      <Suspense fallback={<div className="loading" />}>
        <Router>
          <Switch>
            <Route exact
              path={`/`}
              render={props => <Login />}
            />
           
            <Route
              path={`/dashboard`}
              render={props => <DashboardMain />}
            />
        
          </Switch>
        </Router>
      </Suspense>
    </>


  );
}

export default App;

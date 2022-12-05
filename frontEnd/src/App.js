import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'

import * as Layouts from './layouts'
import { Fragment } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route, index) => {
            var Layout = Fragment
            if(route.layout === 'user') {
              Layout = Layouts.UserLayout  
            } else if(route.layout === 'admin') {
              Layout = Layouts.AdminLayout
            }
            const View = route.view
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <View />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

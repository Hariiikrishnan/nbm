import React from "react";
import ReactDOM from 'react-dom/client';

import {BrowserRouter,Routes,Route} from "react-router-dom";


import Home from "./Home";
import Wall from "./Wall";

function App() {
 
  return <div>
  <BrowserRouter>
  <Routes>
<Route path="/">
<Route index element={<Home />}/>
    
    <Route path="/wall" element={<Wall/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
  </div>

}
export default App;
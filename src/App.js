import React, { useState } from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Smallwidget from "./components/Smallwidget";
import Footer from "./components/Footer";
import CityWidget from './components/CityWidget';




const App = () => {
  const [activeCity, setActiveCity] = useState(undefined)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Smallwidget setActiveCity={setActiveCity} />}></Route>
        <Route path="/:city_name" element={<CityWidget activeCity={activeCity} />}></Route>
      </>
    )
  );

return (
    <div>
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
};

export default App;

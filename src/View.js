// import Backdrop from "./components/Backdrop";
// import Modal from "./components/Modal";
import Smallwidget from "./components/Smallwidget";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React from 'react';
import ReactDOM from 'react-dom';
// import View from './View';

 



function View() {
  return (
    
    <div>
      <Header />
          {/* {smallWidgets.map((widget, index) => ( */}
              <Smallwidget/>
          {/* // ))} */}
        {/* </div>
      </div> */}
      <br /><br /><br />
      <Footer />
    </div>
  );
}

export default View;

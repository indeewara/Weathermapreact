// import Backdrop from "./components/Backdrop";
// import Modal from "./components/Modal";
import Smallwidget from "./components/Smallwidget";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Fetchweather from "./components/Fetchweather";

 
  


function App() {


  // const smallWidgets = [
  //   { text: "Learn React" },
  //   { text: "Build Apps" },
  //   { text: "Create Components" },
  //   { text: "Implement Features" },
  //   { text: "Test Code" },
  //   { text: "Deploy App" },
  // ];

 
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

export default App;

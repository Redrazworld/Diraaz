import "../assets/styles/Main.css";
import Footer from "./Footer";
function Main() {
  return (
    <div>
      <div className="background-image overflow-scroll d-flex align-items-center justify-content-center" style={{height:"100vh", paddingTop:"100px"}}>
        <p className="paramain">
          Good things take time, Launching soon. Premium Hand-picked CTC & Leaf
          Teas.
        </p>
      </div>
      <Footer/>
    </div>
  );
}

export default Main;

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MyAlert from "./components/MyAllert";
import ComponentCard from './components/ComponentCard';
import MyNavbar from "./components/ComponentNav"; 
import MyFooter from "./components/MyFooter";
import CommentArea from "./components/CommentArea";
function App() {
  return (
    <div className="App container">
      
      <header className="App-header">
        <MyNavbar/>
      </header>
      <MyAlert/>
      
      <ComponentCard/>
      <CommentArea/>
     
     
      
      <footer className="container">
        <MyFooter/>

      </footer>
      
    </div>
  );
}

export default App;

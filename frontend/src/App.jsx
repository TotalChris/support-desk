import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Header from "./components/Header.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import NewTicket from "./pages/NewTicket.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {

  return (
    <>
        <Router>
            <div className="container">
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/new-ticket' element={<PrivateRoute />}>
                        <Route path='/new-ticket' element={<NewTicket />}/>
                    </Route>
                </Routes>
            </div>
        </Router>
        <ToastContainer />
    </>
  )
}

export default App

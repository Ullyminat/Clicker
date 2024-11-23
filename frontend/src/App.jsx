import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import Main from './components/main';

function App() {
  return (
    <>
        <Header/>
        <Main/>
        <ToastContainer position='bottom-right' />
    </>
  )
}

export default App

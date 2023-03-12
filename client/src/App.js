import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import ProductsList from './components/ProductsList.jsx'
import DetailsProduct from './components/DetailsProduct.jsx'
import Footer from './components/Footer.jsx'
import PageNotFound from './pages/PageNotFound';
import Cart from './components/Cart.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Success from './pages/Success.jsx'
import Cancel from './pages/Cancel.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route index path='/' element={<ProductsList />} />
        <Route path='/product/:id' element={<DetailsProduct />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='success' element={<Success />} />
        <Route path='cancel' element={<Cancel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

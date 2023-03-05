import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Products from './components/ProductsList.jsx'
import DetailsProduct from './components/DetailsProduct.jsx'
import Footer from './components/Footer.jsx'
import PageNotFound from './pages/PageNotFound';
import Cart from './components/Cart.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/product/:id' element={<DetailsProduct />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

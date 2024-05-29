import './App.css'
import {Route , Routes} from 'react-router-dom'
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import PagenotFound from './pages/pagenotFound/PagenotFound.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/USER/Dashboard.jsx';
import PrivateRout from './pages/components/routs/PrivateRout.jsx';
import AdminRout from './pages/components/routs/AdminRout.jsx';
import AdminDashbord from './pages/Admin/AdminDashbord.jsx';
import CreateCategory from './pages/Admin/CreateCategory.jsx';
import CreateProduct from './pages/Admin/CreateProduct.jsx';
import Users from './pages/Admin/Users.jsx';
import UserOrders from './pages/USER/UserOrders.jsx';
import Products from './pages/Admin/Products.jsx';
import SingleProduct from './pages/Product/SingleProduct.jsx';
import UpdateProduct from './pages/Product/UpdateProduct.jsx';
import Search from './pages/components/Layout/Search.jsx';
import Category from './pages/Catgeory/Category.jsx';
import UpdateCategory from './pages/Catgeory/UpdateCategory.jsx';
import CategoryProduct from './pages/Catgeory/CategoryProduct.jsx';
import Cart from './pages/Cart/Cart.jsx';
import CheckOut from './pages/CheckOut/CheckOut.jsx';
import OrdersDetails from './pages/USER/OrdersDetails.jsx';
import AdminOrders from './pages/Admin/AdminOrders.jsx';
import AdminOrdersDetail from './pages/Admin/AdminOrdersDetail';
import UpdateUser from './pages/Admin/UpdateUser';

function App({}) {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contactus' element={<Contact/>}/>
        <Route path='*' element={<PagenotFound/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/product/:slug' element={<SingleProduct/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/category/:slug' element={<CategoryProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout-success' element={<CheckOut/>}/>



        <Route path='/dashbord' element={<PrivateRout/>}>
        <Route path='user' element={<Dashboard/>}/>
        <Route path='user/orders' element={<UserOrders/>}/>
        <Route path='user/orders/details/:id' element={<OrdersDetails/>}/>
        </Route>

        <Route path='/dashbord' element={<AdminRout/>}>
        <Route path='admin' element={<AdminDashbord/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/create-product' element={<CreateProduct/>}/>
        <Route path='admin/update-category/:slug' element={<UpdateCategory/>}/>
        <Route path='admin/product' element={<Products/>}/>
        <Route path='admin/orders' element={<AdminOrders/>}/>
        <Route path='admin/orders/details/:id' element={<AdminOrdersDetail/>}/>
        <Route path='admin/product/update/:slug' element={<UpdateProduct/>}/>
        <Route path='admin/users' element={<Users/>}/>
        <Route path='admin/users/update/:id' element={<UpdateUser/>}/>

        </Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App

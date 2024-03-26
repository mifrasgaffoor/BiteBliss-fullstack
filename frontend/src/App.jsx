
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CreateFood from './components/CreateFood';
import About from './components/About';
import Menu from './components/Menu';
import FoodTable from './components/FoodTable';
import RegisterForm from './components/User/RegisterForm';
import LoginForm from './components/User/LoginForm';
import EditFood from './components/EditFood';

import Navbar from './components/Navbar';


const App = () => {

  return (
    <div>
   
      <Navbar />
      {/* <RegisterForm />
      <LoginForm />
      <About />
      <Menu />
      <CreateFood />
      <FoodTable />
      <Footer /> */}

      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateFood />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/manage-foods" element={<FoodTable />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/edit/:id" element={<EditFood />} />
        </Routes>
      </>
    </div>
  );
};

export default App;

import SignIn from "./components/sign-in-form/sign-in-form.component";
import {Routes, Route } from 'react-router-dom';
import SignUp from "./components/sign-up-form/sign-up-form.component";
import Home from "./routes/home/home.component";
import Navigation
 from "./routes/navigation/navigation.component";
import { getCurrentUser } from "./utils/firebase/firebase.utils";
import { useEffect } from "react";
import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}/>
      <Route path='sign-in' element={<SignIn/>}/>
      <Route path='sign-up' element={<SignUp/>}/>
      <Route path='home' element={<Home/>}/>

    </Routes>
  );
};

export default App;

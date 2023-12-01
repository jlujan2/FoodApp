import SignIn from "./components/sign-in-form/sign-in-form.component";
import {Routes, Route } from 'react-router-dom';
import SignUp from "./components/sign-up-form/sign-up-form.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import { useEffect } from "react";
import { checkUserSession } from "./store/user/user.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./store/user/user.selector";

const App = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path='/' element={currentUser ?<Navigation/> : <SignIn/>}/>
      <Route path='sign-in' element={<SignIn/>}/>
      <Route path='sign-up' element={<SignUp/>}/>
      <Route path='home' element={<Home/>}/>

    </Routes>
  );
};

export default App;

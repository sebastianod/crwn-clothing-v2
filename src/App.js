import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";

const Shop = () => {
  return (
    <div>
      <h1>I am the Shop page</h1>
    </div>
  );
};

const App = () => {
  return (
    //anything routable goes inside routes component, route -> matchstring then render element
    <Routes>
      <Route path="/" element={<NavigationBar/>}> {/* This is always rendered */}
        <Route index="true" element={<Home />} />  {/*index="true" means to render at /*/}
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;

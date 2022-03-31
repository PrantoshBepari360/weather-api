import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Weather from "./views/Weather/Weather";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="wether/:city" element={<Weather />} />
      </Routes>
    </div>
  );
};

export default App;

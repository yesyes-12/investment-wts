import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { TradePage } from "./pages/TradePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' />
        <Route path='/trade/:symbol' element={<TradePage />} />
      </Routes>
    </Router>
  );
}

export default App;

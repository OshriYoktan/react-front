import { FruitApp } from "./pages/FruitApp/FruitApp";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FruitDetails } from "./pages/FruitDetails/FruitDetails";
import { useEffect, useState } from "react";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { fruitService } from "./services/fruitService";

function App() {
  const [fruits, setFruits] = useState(null)

  useEffect(() => {
    fruitService.query('')
      .then(fruits => {
        setFruits(fruits)
      })
      .catch(err => console.log('Error', err))
  }, [])
  return (
    <Router>
      <Routes>
        <Route element={<FruitDetails data={fruits} />} path='/fruit/:id' />
        <Route element={<FruitApp data={fruits} />} path='/' />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

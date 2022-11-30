import { AxiosApp } from "./pages/AxiosApp/AxiosApp";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AxiosDetails } from "./pages/AxiosDetails/AxiosDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./store/actions/getData";
import { toyService } from "./services/toyService";

function App() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.dataReducer)
  const [toys, setToys] = useState(null)

  useEffect(() => {
    toyService.query('')
      .then(toys => {
        setToys(toys)
        dispatch(getData(toys))
      })
      .catch(err => console.log('Error', err))
  }, [])
  return (
    <Router>
      <Routes>
        <Route element={<AxiosDetails data={toys} />} path='/todo/:id' />
        <Route element={<AxiosApp data={toys} />} path='/' />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

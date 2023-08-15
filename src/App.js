import { Route, Routes, useLocation } from "react-router-dom";
import CompMenu from "./components/compmenu/CompMenu";
import CompCalc from "./components/compcalc/CompCalc";
import CompBmi from "./components/compbmi/CompBmi";
import CompDday from "./components/compdday/CompDday";
import CompBackBtn from "./components/compBackBtn/CompBackBtn";
import { fnGetTheme } from './js/compMenu';
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()


function App() {
  
  const [_theme, _setTheme] = useState({ '1': true, '2': false, '3': false })
  const location = useLocation()

  useEffect(() => {
    _setTheme(fnGetTheme())
  }, [])

  return (

    <AppContext.Provider value={{ _theme, _setTheme }}>
      {(location.pathname !== '/') && <CompBackBtn />}
      <Routes>
        <Route path="/" element={<CompMenu />} />
        <Route path="/calc" element={<CompCalc />} />
        <Route path="/bmi" element={<CompBmi />} />
        <Route path="/dday" element={<CompDday />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;

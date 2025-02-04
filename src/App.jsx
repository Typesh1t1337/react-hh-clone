import {BrowserRouter,Route, Routes} from "react-router-dom";
import {JobApp} from "./job/JobApp.jsx";
import {IndexApp} from "./index/IndexApp.jsx";
import {AccountRouter} from "./account/AccountRouter.jsx";

export function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/account/*" element={<AccountRouter />}  />
            <Route  path="/" element={<IndexApp />}  />
            <Route path="/search/vacancy/" element={ <JobApp />} />
          </Routes>
      </BrowserRouter>
  )
}


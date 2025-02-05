import {BrowserRouter,Route, Routes} from "react-router-dom";
import {IndexApp} from "./index/IndexApp.jsx";
import {AccountRouter} from "./account/AccountRouter.jsx";
import {JobRouter} from "./job/JobRouter.jsx";
import {LoadingSpinner} from "./LoadingSpinner.jsx";

export function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/account/*" element={<AccountRouter />}  />
            <Route  path="/" element={<IndexApp />}  />
            <Route path="/job/*" element={<JobRouter />} />
          </Routes>
      </BrowserRouter>
  )
}


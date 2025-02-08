import {BrowserRouter,Route, Routes} from "react-router-dom";
import {IndexApp} from "./index/IndexApp.jsx";
import {AccountRouter} from "./account/AccountRouter.jsx";
import {JobRouter} from "./job/JobRouter.jsx";
import {ChatRouter} from "./Chat/ChatRouter.jsx";
import {NotFoundApp} from "./404App.jsx";

export function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/account/*" element={<AccountRouter />}  />
            <Route  path="/" element={<IndexApp />}  />
            <Route path="/job/*" element={<JobRouter />} />
              <Route path="/chat/*" element={<ChatRouter />} />
              <Route path="/404/" element={<NotFoundApp />} />
          </Routes>
      </BrowserRouter>
  )
}


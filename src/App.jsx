import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RegistrationUserApp} from "./account/RegistrationUserApp.jsx";
import {JobApp} from "./job/JobApp.jsx";
import {LoginUserApp} from "./account/LoginUserApp.jsx";
import {RegisterApp} from "./account/RegisterApp.jsx";
import {RegisterCompanyApp} from "./account/RegisterCompanyApp.jsx";
import {IndexApp} from "./index/IndexApp.jsx";
import axios from "axios";
import {useEffect} from "react";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/account/register/user/" element={ <RegistrationUserApp />}  />
          <Route  path="/" element={<IndexApp />}  />
        <Route path="/search/vacancy/" element={ <JobApp />} />
        <Route path="/account/login/" element={<LoginUserApp />} />
        <Route path="/account/register/" element={<RegisterApp />} />
          <Route path="/account/register/company"  element={<RegisterCompanyApp />} />
      </Routes>
    </BrowserRouter>
  )
}


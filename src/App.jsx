import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

import Home from "./pages/Home";
import Diagnosis from './pages/Diagnosis';
import Result from './pages/Result';
import MakeUp from './pages/MakeUp';

import NavBar from './components/common/NavBar';
import LenisComponent from './components/common/LenisComponent';
import PageLayout from './components/common/PageLayout';
export default function App() {

  const location = useLocation();
  
  const [userToneStatus, setUserToneStatus] = useState("Cool Summer") // 더미 유저 퍼스널컬러
  const [userSkinTone] = useState("#ECBA8F") // 더미 피부톤
  
  return (
    <>
      <LenisComponent />
      <div className="mx-auto flex flex-col w-full">
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<PageLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/result' element={<Result userToneStatus={userToneStatus} userSkinTone={userSkinTone} />} />
              <Route path='/makeup' element={<MakeUp userToneStatus={userToneStatus} />} />
            </Route>
            <Route path='/diagnosis' element={<Diagnosis />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}
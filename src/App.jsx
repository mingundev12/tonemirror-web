import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

import Home from "./pages/Home";
import Diagnosis from './pages/Diagnosis';
import Result from './pages/Result';
import MakeUp from './pages/MakeUp';

import NavBar from './components/common/NavBar';
import LenisComponent from './components/common/LenisComponent';

export default function App() {

  const location = useLocation();
  
  const [userToneStatus, setUserToneStatus] = useState(null) // 퍼스널컬러 결과
  const [userSkinTone, setUserSkinTone] = useState(null) // 유저 피부톤 데이터
  
  return (
    <>
      <LenisComponent />
      <div className="mx-auto flex flex-col w-full">
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home />} />
            <Route path='/diagnosis' element={<Diagnosis setUserToneStatus={setUserToneStatus} setUserSkinTone={setUserSkinTone} />} />
            <Route path='/result' element={<Result userToneStatus={userToneStatus} userSkinTone={userSkinTone} />} />
            <Route path='/makeup' element={<MakeUp userToneStatus={userToneStatus} />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

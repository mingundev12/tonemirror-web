import { Route, Routes, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import NavBar from './components/NavBar';
import Diagnosis from './pages/Diagnosis';
import Result from './pages/Result';
import { AnimatePresence } from 'motion/react';
import MakeUp from './pages/MakeUp';
import { useState } from 'react';

export default function App() {
  const location = useLocation();
  const [userToneStatus, setUserToneStatus] = useState("Cool Summer") // 더미 유저 퍼스널컬러
  const [userSkinTone] = useState("#ECBA8F") // 더미 피부톤
  return (
    <>
      <div className="mx-auto flex justify-center">
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home />} />
            <Route path='/diagnosis' element={<Diagnosis />} />
            <Route path='/result' element={<Result userToneStatus={userToneStatus} userSkinTone={userSkinTone} />} />
            <Route path='/makeup' element={<MakeUp userToneStatus={userToneStatus} />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}
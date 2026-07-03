import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import Home from "./pages/Home";
import Diagnosis from './pages/Diagnosis';
import Result from './pages/Result';
import MakeUp from './pages/MakeUp';
import Admin from './pages/Admin';
import AdminLogin from './components/admin/AdminLogin';

import NavBar from './components/common/NavBar';
import LenisComponent from './components/common/LenisComponent';
import ProtectedRoute from './components/admin/ProtectedRoute';

export default function App() {

  const location = useLocation();
  
  const [userToneStatus, setUserToneStatus] = useState(() => sessionStorage.getItem("userToneStatus")) // 퍼스널컬러 결과
  const [userSkinTone, setUserSkinTone] = useState(() => sessionStorage.getItem("userSkinTone")) // 유저 피부톤 데이터
  const [diagnosisConfidence, setDiagnosisConfidence] = useState(() => {
    const stored = sessionStorage.getItem("diagnosisConfidence");
    return stored ? Number(stored) : null;
  });

  // 1차 진단 세션: Spring 응답 기반 (메이크업 API 격발에 필요한 ROI + 원본 ID)
  const [diagnosisSession, setDiagnosisSession] = useState(() => {
    try {
      const stored = sessionStorage.getItem("diagnosisSession");
      return stored ? JSON.parse(stored) : null;
    } catch {
      sessionStorage.removeItem("diagnosisSession");
      return null;
    }
  });
  // 2차 메이크업 결과: FastAPI /ai/virtual-makeup 응답 (1차와 완전 분리)
  const [makeupResult, setMakeupResult] = useState(null);
  const [sourceImageUrl, setSourceImageUrl] = useState(null) // 업로드 원본 미리보기(before 이미지)

  // 새로고침 시 1차 진단 결과 유지 (sessionStorage 동기화)
  useEffect(() => {
    if (userToneStatus) sessionStorage.setItem("userToneStatus", userToneStatus)
    if (userSkinTone) sessionStorage.setItem("userSkinTone", userSkinTone)
    if (diagnosisSession) {
      sessionStorage.setItem("diagnosisSession", JSON.stringify(diagnosisSession))
    } else {
      sessionStorage.removeItem("diagnosisSession")
    }
  }, [userToneStatus, userSkinTone, diagnosisSession])
  
  return (
    <>
      <Toaster toastOptions={{ duration: 2000, style: { fontFamily: "GmarketSans", fontSize: "14px", color: "#3D2E35", borderRadius: "9999px" } }} />
      <LenisComponent />
      <div className="mx-auto flex flex-col w-full">
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home />} />
            <Route path='/diagnosis' element={<Diagnosis setUserToneStatus={setUserToneStatus} setUserSkinTone={setUserSkinTone} setDiagnosisSession={setDiagnosisSession} setMakeupResult={setMakeupResult} setSourceImageUrl={setSourceImageUrl} />} />
            <Route path='/result' element={<Result userToneStatus={userToneStatus} userSkinTone={userSkinTone} />} />
            <Route path='/makeup' element={<MakeUp userToneStatus={userToneStatus} diagnosisSession={diagnosisSession} makeupResult={makeupResult} setMakeupResult={setMakeupResult} sourceImageUrl={sourceImageUrl} />} />
            <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path='/adminLogin' element={<AdminLogin />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

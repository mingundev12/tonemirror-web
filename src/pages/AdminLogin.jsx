import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin(){
   const navigate = useNavigate(); {/* 로그인 성공 시 페이지 이동(대시보드)을 위한 훅*/}
   {/*입력 폼 데이터 상태 (아이디,비밀번호 한번에 관리)*/}
   const [formData,setFormData] = useState({id:'',password:''});
   {/* 유효성 검사 및 서버 에러 메시지 상태*/}
   const [error,setError] = useState("");
    
   {/* input 필드 렌더링을 위한 메타 데이터 배열 (반복문 처리용)*/}
   const fields = [
    {id:'id',label:'아이디',type:'text',placeholder:'관리자 아이디'},
    {id:'password',label:'비밀번호',type:'password',placeholder:'비밀번호'}
   ];

   {/* input 변경 이벤트 핸들러 */}
   const handleChange = (value,id) => {
    setFormData((prev) => ({...prev,[id]:value}));
   };
    
   {/* 로그인 버튼 클릭 이벤트 핸들러 (API 통신 및 예외 처리)*/}
    const onClickLogin = async () => {
        if(!formData.id ||  !formData.password){
            setError("아이디와 비밀번호를 모두 입력해주세요")
            return;
        }
        try {
            {/* 백엔드 로그인 API 호출 */}
            const res = await axios.post("/api/admin/login",{
                id:formData.id,
                password:formData.password
            });
            
            {/* 로그인 성공 처리(토큰 존재 여부 확인)*/}
            if(res.data.token){
            {/* 브라우저 세션에 토큰 저장 (새로고침 시 유지, 탭 닫으면 삭제)*/}
            sessionStorage.setItem("admin_token",res.data.token);
            alert("로그인 성공");
            {/*새로고침 없이 대시보드 페이지로 부드럽게 이동 */}
            navigate("/productDashboard");
        }else {
            {/* 서버측 검증 실패 메시지 처리 */}
           setError(res.data.msg || "로그인 실패했습니다 ");
        }   
        }catch (err){
            {/* 네트워크 에러 및 비밀번호 불일치 등 예외 처리*/}
            setError("서버 연결 실패 아이디/비밀번호가 일치하지 않습니다");
        }
  };
    return(
        <div className="fixed inset-0 bg-gradient-to-br from-[#FFD1C9] via-[#FFF9F9] to-[#A8EDEA] w-full h-full flex flex-col items-center justify-center gap-6">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">관리자 로그인</h1>
                    <p className="font-semibold mt-2">관리자 계정으로 로그인 해주세요</p>
                </div>
                {/* fields 배열을 활용한 아이디/비밀번호 입력창 렌더링 */}
                {fields.map((field) => (
                    <div key={field.id}>
                        <p className="text-sm text-gray-600 mb-1">{field.label}</p>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.id]}
                          onChange={(e) => handleChange(e.target.value,field.id)}
                          className="border border-gray-200 rounded-md px-3 py-2 w-64"
                        />
                        </div>
                        ))}
            {/* 에러 발생 시에만 렌더링되는 경고 메시지*/}            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* 로그인 실행 버튼*/}            
            <button
              type="button"
              onClick={onClickLogin}
              className="border-none rounded-md w-64 py-2 mt-2 bg-gradient-to-r from-[#ffccd0] to-[#f3bbbf] text-white hover:bg-[#ff858d] active:scale-95 transition-all duration-150"
              >
                로그인
              </button>
            </div>
    );
}
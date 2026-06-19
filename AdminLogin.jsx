import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLogin(){
   const [formData,setFormData] = useState({id:'',password:''});
   const [error,setError] = useState("");
    
   const fields = [
    {id:'id',label:'아이디',type:'text',placeholder:'관리자 아이디'},
    {id:'password',label:'비밀번호',type:'password',placeholder:'비밀번호'}
   ];

   const handleChange = (value,id) => {
    setFormData((prev) => ({...prev,[id]:value}));
   };
    
    const onClickLogin = async () => {
        if(!formData.id ||  !formData.password){
            setError("아이디와 비밀번호를 모두 입력해주세요")
            return;
        }
        try {
            const res = await axios.post("/api/admin/login",{
                id:formData.id,
                password:formData.password
            });
            
            if(res.data.token){
            sessionStorage.setItem("admin_token",res.data.token);
            alert("로그인 성공");
            window.location.href = "/admin/dashboard";
        }else {
           setError(res.data.msg || "로그인 실패했습니다 ");
        }   
        }catch (err){
            setError("서버 연결 실패 아이디/비밀번호가 일치하지 않습니다");
        }
  };
    return(
        <div className="fixed inset-0 bg-gradient-to-br from-[#FFD1C9] via-[#FFF9F9] to-[#A8EDEA] w-full h-full flex flex-col items-center justify-center gap-6">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">관리자 로그인</h1>
                    <p className="font-semibold mt-2">관리자 계정으로 로그인 해주세요</p>
                </div>
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
                        
            {error && <p className="text-red-500 text-sm">{error}</p>}

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
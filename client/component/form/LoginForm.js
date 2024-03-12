"use client";
import { useEduorContext } from "@/context/EduorContext";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser ,loadUser } from '@/features/UserSlice'
import { toast } from "react-hot-toast";
import { SessionContext } from "@/context/sessionContext";
import { AiFillEye } from "react-icons/ai";
import { LoginContext } from "@/context/loginContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ForgotPassword from "./Forgotpass";
import '../../public/css/globals.css'
import '../../public/css/style.css'


const LoginForm = () => {
  
  const router=useRouter();
  const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.user);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, []);


  useEffect(() => {
    if (user._id) {
      // Redirect user to dashboard upon successful login
      // You may need to replace '/dashboard' with your desired URL
      router.push('/user-dashboard')
      toast.success('Login successful');
    }
  }, [user,router]);

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    if (formData.email.length === 0) {
        toast.error("Enter a valid Email");
        setLoading(false)
        return;
    }
    if (formData.password.length === 0) {
        toast.error("Enter a valid Password");
        setLoading(false)
        return;
    }

    await dispatch(loginUser(formData)).then(() => {
        setLoading(false);
    });
    setLoading(false)
}

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-12">
          <label className="text-sm font-custom font-[500]">email</label>
          <div className="tf__login_imput" style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
            />
            <div style={{ height: '24px', width: '24px' }}>
             
             </div>
          </div>
        </div>
        <div className="col-xl-12">
          <label className="text-sm font-custom font-[500]">Password</label>
          <div className="tf__login_imput" style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              style={{ padding: '4px' }}
              className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
            />
            <div
              className={`cursor-pointer ${showPassword ? "text-green-500" : "text-gray-800"}`}
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ marginLeft: '8px' }}
            >
              <AiFillEye />
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <ForgotPassword />
        </div>

        <div className="col-xl-12">
          <div className="tf__login_imput">
            {loading ? (
              // Render a loading spinner or text while loading
              <div>Loading...</div>
            ) : (
              // Render the login button when not loading
              <button type="submit" className="common_btn">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

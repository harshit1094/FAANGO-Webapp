import { useState } from "react";
import { useCookies } from "react-cookie";
import { Icon } from "@iconify/react";
import faango from "../assets/images/faango.png";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const Data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", Data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      // alert("success");
      navigate("/home");
    } else {
      alert("Email or password Does Not Match Please Try Again");
    }
  };

  return (
    <div className="">
      <div className="bg-black flex flex-col items-center w-full h-screen bg-gradient-to-b from-neutral-900 to-black font-poppins">
        <div className="LogoDiv p-6">
          <img src={faango} alt="faango logo" width={200} />
        </div>
        <div className="InputRegion w-fixed py-1 flex items-center justify-center flex-col  mt-1 rounded-md">
          <div className="font-extrabold p-8 text-2xl text-white">
            To continue , log into FAANGO
          </div>
          {/* i will have our inputs --> email and password with submit button */}
          <TextInput
            label="Email or username"
            placeholder="Email or username"
            className="my-3 w-1/2"
            value={email}
            setValue={setEmail}
            labelClassName={"text-white"}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            className="w-1/2 mb-3"
            value={password}
            setValue={setPassword}
          />
          <button
            className="bg-green-500 text-l font-semibold p-2 w-1/2 rounded-full my-8 hover:font-bold transform transition-transform hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            Log In
          </button>

          <div className="w-3/4 border  my-1 border-solid border-white"></div>

          <div className="text-white  my-7 text-sm text-zinc-400">
            Don't have an account?
            <Link
              to="/signup"
              className="px-2 underline-offset-1 underline hover:text-green-500 font-bold"
            >
              Sign up for FAANGO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

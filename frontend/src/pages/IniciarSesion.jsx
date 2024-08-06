import axios from "axios";
import { useContext, useState } from "react";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const IniciarSesion = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [alert, setAlert] = useState({
    message: "",
    exito: false,
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = form.password.includes('admin') ? `${import.meta.env.VITE_BACKEND_URL}/login` : `${import.meta.env.VITE_BACKEND_URL}/ciudadano/login`

    try {
      const response = await axios.post(url,
        form
      );
      localStorage.setItem("token", response.data.token);
      setAuth(response.data);
      setAlert({ message: response.data.msg, exito: true });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setAlert({ message: error.response.data.msg, exito: false });
      setForm({
        email: "",
        password: "",
      });
      setTimeout(() => setAlert({}), 3000);
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center w-full">
        <div className="w-[60%] min-h-screen bg-[url('/public/fondoRegistro.png')] bg-no-repeat bg-cover bg-center"></div>
        <div className="min-h-screen w-[40%] flex justify-center">
          <form
            className="flex flex-col gap-4 justify-center  min-h-screen w-3/5"
            onSubmit={handleSubmit}
          >
            <img src="/public/logo.png" className="w-80 mx-auto pb-10"></img>

            <div className="relative">
              <svg
                className="absolute inset-y-0 left-5 h-full "
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
              >
                <path
                  d="M16.625 0H2.375C1.74532 0.000676801 1.14162 0.252314 0.696365 0.699697C0.251112 1.14708 0.000673578 1.75367 0 2.38636V12.6136C0.000673578 13.2463 0.251112 13.8529 0.696365 14.3003C1.14162 14.7477 1.74532 14.9993 2.375 15H16.625C17.2547 14.9993 17.8584 14.7477 18.3036 14.3003C18.7489 13.8529 18.9993 13.2463 19 12.6136V2.38636C18.9993 1.75367 18.7489 1.14708 18.3036 0.699697C17.8584 0.252314 17.2547 0.000676801 16.625 0ZM16.0236 3.9473L9.91647 8.72003C9.79738 8.81305 9.65084 8.86355 9.5 8.86355C9.34916 8.86355 9.20262 8.81305 9.08353 8.72003L2.97638 3.9473C2.90463 3.89286 2.84436 3.82462 2.79908 3.74657C2.7538 3.66852 2.72441 3.5822 2.71261 3.49264C2.70082 3.40308 2.70685 3.31205 2.73037 3.22485C2.75389 3.13765 2.79443 3.05602 2.84962 2.98469C2.90481 2.91337 2.97356 2.85378 3.05187 2.80938C3.13018 2.76499 3.21649 2.73667 3.30578 2.72608C3.39508 2.71549 3.48558 2.72284 3.57202 2.7477C3.65846 2.77256 3.73913 2.81443 3.80933 2.87088L9.5 7.31804L15.1907 2.87088C15.333 2.76291 15.5118 2.71555 15.6886 2.73905C15.8654 2.76256 16.0259 2.85503 16.1353 2.99647C16.2448 3.13792 16.2944 3.31697 16.2735 3.4949C16.2526 3.67283 16.1628 3.83535 16.0236 3.9473Z"
                  fill="#4B5563"
                />
              </svg>
              <input
                className="border-2 border-[#4B5563] rounded-lg p-3 pl-12 w-full"
                type="email"
                placeholder="Escribe tu correo electrónico"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <svg
                className="absolute inset-y-0 left-5 h-full "
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path
                  d="M13.5227 5.5H10.8182V3C10.8182 2.20435 10.4159 1.44129 9.69986 0.87868C8.98381 0.31607 8.01264 0 7 0C5.98736 0 5.01619 0.31607 4.30014 0.87868C3.58409 1.44129 3.18182 2.20435 3.18182 3V5.5H0.477273C0.350692 5.5 0.229296 5.53951 0.13979 5.60984C0.0502839 5.68016 0 5.77554 0 5.875V14.625C0 14.7245 0.0502839 14.8198 0.13979 14.8902C0.229296 14.9605 0.350692 15 0.477273 15H13.5227C13.6493 15 13.7707 14.9605 13.8602 14.8902C13.9497 14.8198 14 14.7245 14 14.625V5.875C14 5.77554 13.9497 5.68016 13.8602 5.60984C13.7707 5.53951 13.6493 5.5 13.5227 5.5ZM9.30682 5.5H4.69318V2.97656C4.69318 2.49586 4.93622 2.03484 5.36883 1.69493C5.80145 1.35502 6.38819 1.16406 7 1.16406C7.61181 1.16406 8.19855 1.35502 8.63117 1.69493C9.06378 2.03484 9.30682 2.49586 9.30682 2.97656V5.5Z"
                  fill="#4B5563"
                />
              </svg>
              <input
                className="border-2 border-[#4B5563] rounded-lg p-3 pl-12 w-full"
                type={mostrarPassword ? "text" : "password"}
                placeholder="Escribe tu contraseña"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {mostrarPassword ? (
                <svg
                  onClick={() => setMostrarPassword(false)}
                  className="absolute inset-y-0 right-5 h-full cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="15"
                  viewBox="0 0 19 15"
                  fill="none"
                >
                  <path
                    d="M16.466 15C16.3828 15.0001 16.3004 14.984 16.2236 14.9525C16.1468 14.9211 16.077 14.8749 16.0183 14.8167L2.08627 1.05628C1.97252 0.938026 1.91005 0.780563 1.91216 0.617464C1.91428 0.454365 1.98081 0.298534 2.09759 0.183196C2.21437 0.0678584 2.37214 0.0021395 2.53728 5.13208e-05C2.70241 -0.00203686 2.86184 0.0596711 2.98157 0.172018L16.9136 13.9324C17.0021 14.0199 17.0624 14.1313 17.0868 14.2526C17.1112 14.3739 17.0987 14.4996 17.0508 14.6138C17.0029 14.7281 16.9218 14.8258 16.8177 14.8945C16.7136 14.9632 16.5912 14.9999 16.466 15ZM9.18332 9.83399L7.13348 7.80942C7.12174 7.79791 7.10664 7.79033 7.09031 7.78774C7.07398 7.78515 7.05723 7.78767 7.04243 7.79496C7.02762 7.80225 7.0155 7.81394 7.00777 7.82838C7.00004 7.84282 6.99708 7.8593 6.99931 7.87548C7.08206 8.40074 7.33177 8.88639 7.71234 9.26227C8.09291 9.63815 8.58463 9.88478 9.11643 9.96651C9.13282 9.96872 9.1495 9.9658 9.16412 9.95816C9.17874 9.95052 9.19058 9.93855 9.19796 9.92393C9.20534 9.90931 9.20789 9.89277 9.20527 9.87664C9.20264 9.86051 9.19497 9.84559 9.18332 9.83399ZM9.8166 5.15468L11.8696 7.1816C11.8813 7.19327 11.8965 7.20099 11.9129 7.20368C11.9293 7.20636 11.9461 7.20387 11.961 7.19655C11.9759 7.18924 11.9881 7.17748 11.9959 7.16293C12.0036 7.14839 12.0065 7.1318 12.0042 7.11554C11.9216 6.58957 11.6717 6.1032 11.2907 5.72685C10.9096 5.3505 10.4172 5.10369 9.88467 5.02216C9.86818 5.01965 9.85131 5.02235 9.83646 5.02987C9.82162 5.03739 9.80956 5.04936 9.80201 5.06405C9.79446 5.07875 9.79181 5.09543 9.79443 5.1117C9.79705 5.12798 9.8048 5.14302 9.8166 5.15468Z"
                    fill="#06457C"
                  />
                  <path
                    d="M18.8004 8.17359C18.9314 7.97045 19.0007 7.73446 19 7.4936C18.9993 7.25274 18.9286 7.01714 18.7964 6.81475C17.7491 5.21511 16.3904 3.85627 14.8673 2.88483C13.1801 1.80902 11.3198 1.24023 9.48647 1.24023C8.51998 1.24155 7.56005 1.39719 6.64386 1.70113C6.61821 1.70955 6.59518 1.72432 6.57695 1.74402C6.55872 1.76373 6.5459 1.78771 6.53971 1.81369C6.53352 1.83967 6.53417 1.86679 6.54159 1.89245C6.54901 1.91811 6.56296 1.94148 6.58211 1.96031L8.45186 3.80701C8.47128 3.82623 8.49544 3.84013 8.52195 3.84732C8.54846 3.85452 8.57641 3.85477 8.60305 3.84806C9.23683 3.69552 9.89969 3.70669 10.5278 3.88052C11.1559 4.05434 11.7282 4.38496 12.1894 4.84053C12.6507 5.29611 12.9854 5.8613 13.1614 6.48169C13.3374 7.10208 13.3488 7.75677 13.1943 8.38273C13.1876 8.40899 13.1879 8.43652 13.1952 8.46262C13.2024 8.48873 13.2165 8.51253 13.2359 8.53167L15.9253 11.1899C15.9533 11.2176 15.9908 11.2339 16.0303 11.2357C16.0699 11.2374 16.1087 11.2244 16.139 11.1993C17.1743 10.3278 18.0714 9.30787 18.8004 8.17359ZM9.49914 11.2478C8.92394 11.2478 8.35625 11.1189 7.83886 10.8707C7.32146 10.6225 6.86788 10.2615 6.5123 9.81493C6.15671 9.36838 5.90842 8.84793 5.78613 8.29281C5.66385 7.73769 5.67076 7.1624 5.80635 6.6103C5.81307 6.58405 5.81278 6.55652 5.80549 6.53041C5.79821 6.5043 5.78418 6.48051 5.76479 6.46136L3.11928 3.84728C3.09123 3.81954 3.05365 3.80322 3.01399 3.80156C2.97433 3.79989 2.93549 3.813 2.90515 3.83829C1.9398 4.65179 1.0449 5.6416 0.22679 6.79833C0.0835843 7.00134 0.00471527 7.24181 0.000204877 7.48919C-0.00430551 7.73657 0.0657464 7.97969 0.201459 8.18766C1.24676 9.80333 2.59168 11.1641 4.09136 12.1223C5.78102 13.2024 7.59614 13.7497 9.48647 13.7497C10.4627 13.7471 11.4326 13.5948 12.3615 13.2982C12.3874 13.29 12.4107 13.2754 12.4292 13.2558C12.4477 13.2361 12.4608 13.2121 12.4672 13.1861C12.4736 13.16 12.4731 13.1327 12.4658 13.1069C12.4584 13.0811 12.4445 13.0575 12.4253 13.0386L10.5464 11.1833C10.527 11.1641 10.5029 11.1503 10.4765 11.1431C10.4501 11.1359 10.4222 11.1356 10.3956 11.1422C10.1021 11.2125 9.80115 11.2479 9.49914 11.2478Z"
                    fill="#06457C"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setMostrarPassword(true)}
                  className="absolute inset-y-0 right-5 h-full cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="13"
                  viewBox="0 0 19 13"
                  fill="none"
                >
                  <path
                    d="M9.50011 9.10039C10.8992 9.10039 12.0334 7.93633 12.0334 6.50039C12.0334 5.06445 10.8992 3.90039 9.50011 3.90039C8.101 3.90039 6.9668 5.06445 6.9668 6.50039C6.9668 7.93633 8.101 9.10039 9.50011 9.10039Z"
                    fill="#06457C"
                  />
                  <path
                    d="M18.7964 5.79313C17.749 4.13075 16.3902 2.71863 14.867 1.70909C13.1819 0.591094 11.3215 0 9.48727 0C7.80419 0 6.14923 0.493594 4.56828 1.46697C2.95606 2.45944 1.49545 3.90934 0.226809 5.77606C0.0835912 5.98703 0.00471566 6.23693 0.000204895 6.49401C-0.00430587 6.7511 0.0657518 7.00375 0.201476 7.21987C1.24686 8.89891 2.59229 10.3131 4.0917 11.3088C5.77992 12.4312 7.59678 13 9.48727 13C11.3362 13 13.2006 12.4138 14.8785 11.3051C16.4008 10.2988 17.757 8.88144 18.8004 7.20525C18.9314 6.99415 19.0007 6.7489 19 6.49859C18.9993 6.24829 18.9286 6.00345 18.7964 5.79313ZM9.50072 10.4C8.74916 10.4 8.01447 10.1713 7.38957 9.74273C6.76467 9.31419 6.27762 8.7051 5.99001 7.99247C5.70239 7.27983 5.62714 6.49567 5.77377 5.73915C5.92039 4.98262 6.2823 4.28771 6.81374 3.74228C7.34517 3.19686 8.02226 2.82542 8.75939 2.67494C9.49651 2.52446 10.2606 2.60169 10.9549 2.89687C11.6493 3.19205 12.2427 3.69192 12.6603 4.33328C13.0778 4.97463 13.3007 5.72865 13.3007 6.5C13.2995 7.53398 12.8988 8.52527 12.1864 9.25641C11.4741 9.98755 10.5082 10.3988 9.50072 10.4Z"
                    fill="#06457C"
                  />
                </svg>
              )}
            </div>
            <button className="bg-[#06457C] text-white rounded-lg p-3 mt-12">
              Iniciar sesión
            </button>
            <p className="text-[14px] text-center">
              ¿No tienes cuenta?{" "}
              <a href="/registro" className="text-[#0464B8]">
                {" "}
                Registrate aquí
              </a>
            </p>
            <a
              href="/recuperarcontrasena"
              className="text-[#0464B8] text-[14px] text-center"
            >
              ¿Olvidó la contraseña?
            </a>
            {alert.message && (
              <Alert exito={alert.exito}>{alert.message}</Alert>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
export default IniciarSesion;

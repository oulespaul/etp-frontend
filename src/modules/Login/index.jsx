import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState();

  const handleOnSubmit = () => {
    window.localStorage.setItem('username', username);
    return window.location.replace('/exchange');
  };

  return (
    <div className="font-sans bg-[#2f3534]">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-[#30B34A] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-[#4AC97C] shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-[#505a59] shadow-md">
            <span className="inline-flex items-center px-3 text-xl text-white ">Login</span>
            <div className="mt-10">
              <div>
                <input
                  type="text"
                  id="website-admin"
                  placeholder="username"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                />
              </div>

              <div className="mt-7">
                <button
                  onClick={handleOnSubmit}
                  className="bg-[#383939] w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

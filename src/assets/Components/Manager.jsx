import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const API_URL = "http://localhost:3000";

const EYE_OPEN_PATH =
  "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z";

const EYE_CLOSED_PATH =
  "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.025 10.025 0 014.132-5.4M9.9 4.24a9.122 9.122 0 012.1-.24c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.4M15 12a3 3 0 11-6 0 3 3 0 016 0z M3 3l18 18";

const EMPTY_FORM = {
  site: "",
  username: "",
  password: "",
};

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  theme: "light",
  transition: Bounce,
};

const Manager = () => {
  const [form, setForm] = useState(EMPTY_FORM);

  const [passwordArray, setPasswordArray] = useState([]);

  const [visiblePasswords, setVisiblePasswords] = useState(new Set());

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);


  const fetchPasswords = async () => {
    try {
      const response = await fetch(`${API_URL}/passwords`);

      if (!response.ok) {
        throw new Error("Failed to fetch passwords");
      }

      const data = await response.json();

      setPasswordArray(
        Array.isArray(data.result) ? data.result : []
      );
    } catch (error) {
      console.error("Failed to load passwords:", error);

      toast.error(
        "Failed to load passwords.",
        toastOptions
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const authenticateUser = async () => {
      const passkey = window.prompt("Enter Master Passkey:");

     
      if (passkey === null) {
        setLoading(false);
        return;
      }

      
      if (passkey.trim() === "") {
        toast.error(
          "Master Passkey is required.",
          toastOptions
        );

        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/master-passkey/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              passkey: passkey,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Invalid master passkey");
        }

        
        setAuthenticated(true);

        toast.success(
          "Access granted.",
          {
            ...toastOptions,
            autoClose: 1500,
          }
        );

      
        await fetchPasswords();

      } catch (error) {
        console.error(
          "Master passkey verification failed:",
          error
        );

        toast.error(
          "Incorrect Master Passkey! Access Denied.",
          toastOptions
        );

        setLoading(false);
      }
    };

    authenticateUser();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const toggleFormPassword = () => {
    setIsPasswordHidden((prev) => !prev);
  };


  const togglePasswordVisibility = (id) => {
    

    if (visiblePasswords.has(id)) {
      setVisiblePasswords((prev) => {
        const next = new Set(prev);

        next.delete(id);

        return next;
      });

      return;
    }

    setVisiblePasswords((prev) => {
      const next = new Set(prev);

      next.add(id);

      return next;
    });
  };


  const savePassword = async (e) => {
    e.preventDefault();

    if (!authenticated) {
      toast.error(
        "Please authenticate first.",
        toastOptions
      );

      return;
    }

    const site = form.site.trim();
    const username = form.username.trim();
    const password = form.password;

    
    if (!site || !username || !password) {
      toast.error(
        "Please fill in all fields before saving.",
        toastOptions
      );

      return;
    }

    const formattedSite =
      /^https?:\/\//i.test(site)
        ? site
        : `https://${site}`;

    const newPassword = {
      site: formattedSite,
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        `${API_URL}/passwords`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPassword),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save password");
      }

      
      await response.json();

      
      await fetchPasswords();

    
      setForm(EMPTY_FORM);

      setIsPasswordHidden(true);

      toast.success(
        "Password saved successfully.",
        {
          ...toastOptions,
          autoClose: 2500,
        }
      );

    } catch (error) {
      console.error(
        "Failed to save password:",
        error
      );

      toast.error(
        "Failed to save password.",
        toastOptions
      );
    }
  };


  const deletePassword = async (id, siteName) => {
    if (!authenticated) {
      toast.error(
        "Please authenticate first.",
        toastOptions
      );

      return;
    }

    const isConfirmed = window.confirm(
      `Are you sure you want to delete the credentials for ${siteName}?`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/passwords/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete password");
      }

      setPasswordArray((prev) =>
        prev.filter(
          (item) => String(item._id) !== String(id)
        )
      );

      setVisiblePasswords((prev) => {
        const next = new Set(prev);

        next.delete(id);

        return next;
      });

      toast.success(
        "Password deleted successfully.",
        {
          ...toastOptions,
          autoClose: 2500,
        }
      );

    } catch (error) {
      console.error(
        "Failed to delete password:",
        error
      );

      toast.error(
        "Failed to delete password.",
        toastOptions
      );
    }
  };


  const copyToClipboard = async (text) => {
    if (!authenticated) {
      toast.error(
        "Please authenticate first.",
        toastOptions
      );

      return;
    }

    try {
      await navigator.clipboard.writeText(text);

      toast.success(
        "Copied to clipboard!",
        {
          ...toastOptions,
          autoClose: 2000,
        }
      );

    } catch (error) {
      console.error(
        "Failed to copy password:",
        error
      );

      toast.error(
        "Failed to copy password!",
        toastOptions
      );
    }
  };


  return (
    <>
  

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">

        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-72 w-72 rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />

      </div>

    

      <header className="flex justify-center text-4xl font-bold my-6">

        <div className="flex flex-col gap-2 text-center">

          <h1>
            <span>&lt;</span>

            <span>
              Pass
              <span className="text-green-600">
                OP
              </span>
            </span>

            <span className="text-green-600">
              /&gt;
            </span>
          </h1>

          <p className="text-2xl font-normal text-gray-600">
            Your own Password Manager
          </p>

        </div>

      </header>


      <main className="container mx-auto px-4 max-w-4xl">

      

        <form
          onSubmit={savePassword}
          className="flex flex-col gap-4 p-4 text-slate-800 items-center w-full"
        >

          

          <input
            name="site"
            value={form.site}
            onChange={handleChange}
            className="text-center w-full md:w-1/2 rounded-full border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            type="text"
            placeholder="Enter Website URL"
            disabled={!authenticated}
          />

          <div className="flex flex-col md:flex-row gap-4 justify-center w-full md:w-1/2">

         

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="text-center w-full md:w-1/2 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              type="text"
              placeholder="Enter Username"
              disabled={!authenticated}
            />

         

            <div className="relative w-full md:w-1/2 flex items-center">

              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                className="text-center w-full rounded-lg border border-slate-300 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                type={
                  isPasswordHidden
                    ? "password"
                    : "text"
                }
                placeholder="Enter Password"
                disabled={!authenticated}
              />

              <button
                type="button"
                className="absolute right-3 flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700"
                onClick={toggleFormPassword}
                disabled={!authenticated}
              >

                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      isPasswordHidden
                        ? EYE_CLOSED_PATH
                        : EYE_OPEN_PATH
                    }
                  />

                </svg>

              </button>

            </div>

          </div>

       

          <button
            type="submit"
            disabled={!authenticated}
            className="flex items-center gap-2 text-lg bg-green-500 rounded-full px-5 py-2 font-medium text-black hover:bg-green-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >

            <img
              width={30}
              height={30}
              src="/icons/add.gif"
              alt=""
            />

            <span>
              Add Your Password
            </span>

          </button>

        </form>

     

        <section className="mt-8 bg-gray-50 p-4 rounded-xl border border-gray-100">

          <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">

           

            {loading ? (

              <div className="p-8 text-center text-gray-500 font-medium">
                Authenticating...
              </div>

            ) : !authenticated ? (

             

              <div className="p-8 text-center text-red-500 font-medium">
                Access Denied
              </div>

            ) : passwordArray.length === 0 ? (

            

              <div className="p-8 text-center text-gray-500 font-medium">
                No Passwords Saved Yet
              </div>

            ) : (

             

              <table className="min-w-full table-fixed divide-y divide-gray-200 text-center text-sm">

                <thead className="bg-green-500 text-white">

                  <tr>

                    <th className="w-1/3 px-6 py-3 font-semibold">
                      Site URL
                    </th>

                    <th className="w-1/3 px-6 py-3 font-semibold">
                      Username
                    </th>

                    <th className="w-1/3 px-6 py-3 font-semibold">
                      Password
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">

                  {passwordArray.map((item) => {

                    const id = item._id;

                    const isCurrentVisible =
                      visiblePasswords.has(id);

                    return (

                      <tr
                        key={id}
                        className="hover:bg-gray-50 transition-colors"
                      >


                        <td className="px-6 py-4 text-gray-800 text-left break-all">

                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {item.site}
                          </a>

                        </td>

                       

                        <td className="px-6 py-4 text-gray-800 break-all">
                          {item.username}
                        </td>

                       

                        <td className="px-6 py-4 text-gray-800">

                          <div className="flex items-center justify-center gap-3">

                            <span className="font-mono">
                              {isCurrentVisible
                                ? item.password
                                : "••••••••"}
                            </span>

                           

                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-600 p-1"
                              onClick={() =>
                                togglePasswordVisibility(id)
                              }
                              aria-label={
                                isCurrentVisible
                                  ? "Hide password"
                                  : "Show password"
                              }
                            >

                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >

                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d={
                                    isCurrentVisible
                                      ? EYE_CLOSED_PATH
                                      : EYE_OPEN_PATH
                                  }
                                />

                              </svg>

                            </button>

                          

                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-600 p-1"
                              onClick={() =>
                                copyToClipboard(
                                  item.password
                                )
                              }
                              aria-label="Copy password"
                            >

                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >

                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 10h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                />

                              </svg>

                            </button>

                            

                            <button
                              type="button"
                              className="text-red-400 hover:text-red-600 p-1"
                              onClick={() =>
                                deletePassword(
                                  id,
                                  item.site
                                )
                              }
                              aria-label={`Delete entry for ${item.site}`}
                            >

                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >

                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 01-1-1h-4a1 1 0 01-1 1v3M4 7h16"
                                />

                              </svg>

                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  })}

                </tbody>

              </table>

            )}

          </div>

        </section>

      </main>

      <ToastContainer />

    </>
  );
};

export default Manager;
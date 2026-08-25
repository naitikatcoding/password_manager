import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const EYE_OPEN_PATH =
  "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z";

const EYE_CLOSED_PATH =
  "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.025 10.025 0 014.132-5.4M9.9 4.24a9.122 9.122 0 012.1-.24c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.4M15 12a3 3 0 11-6 0 3 3 0 016 0z M3 3l18 18";

const Manager = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [visiblePasswords, setVisiblePasswords] = useState(new Set());

  const [masterPasskey, setMasterPasskey] = useState(() => {
    return localStorage.getItem("master_passkey") || "";
  });

  const [passwordArray, setPasswordArray] = useState(() => {
    try {
      const saved = localStorage.getItem("passwords");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed parsing storage items", e);
      return [];
    }
  });

  useEffect(() => {
    if (!masterPasskey) {
      let key = "";

      while (!key || key.trim() === "") {
        key = window.prompt("Set your new Master Passkey (cannot be empty):");

        if (key === null) {
          key = "1234";
          alert("Default passkey set to '1234'");
          break;
        }
      }

      setMasterPasskey(key);
      localStorage.setItem("master_passkey", key);
    }
  }, [masterPasskey]);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwordArray));
  }, [passwordArray]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
        return next;
      }

      const userInput = window.prompt(
        "Enter Master Passkey to reveal password:"
      );

      if (userInput === null) return prev;

      if (userInput === masterPasskey) {
        next.add(id);
        return next;
      } else {
        alert("Incorrect Master Passkey! Access Denied.");
        return prev;
      }
    });
  };

  const deletePassword = (id, siteName) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the credentials for ${siteName}?`
    );

    if (isConfirmed) {
      const updatedArray = passwordArray.filter((item) => item.id !== id);

      setPasswordArray(updatedArray);

      if (visiblePasswords.has(id)) {
        setVisiblePasswords((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    }
  };

  const savePassword = (e) => {
    e.preventDefault();

    if (!form.site || !form.username || !form.password) {
      alert("Please fill in all fields before saving.");
      return;
    }

    let formattedSite = form.site.trim();

    if (!formattedSite.match(/^https?:\/\//i)) {
      formattedSite = `https://${formattedSite}`;
    }

    const updatedArray = [
      ...passwordArray,
      {
        ...form,
        site: formattedSite,
        id: crypto.randomUUID(),
      },
    ];

    setPasswordArray(updatedArray);

    setForm({
      site: "",
      username: "",
      password: "",
    });
  };

  // Existing Toastify notification
  const notify = () => {
    toast("Copied to clipboard !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // Copy password to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      notify();
    } catch (error) {
      console.error("Failed to copy password:", error);
      toast.error("Failed to copy password!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-72 w-72 rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <header className="flex justify-center text-4xl font-bold my-6">
        <div className="flex flex-col gap-2 text-center">
          <h1>
            <span>&lt;</span>
            <span>
              Pass<span className="text-green-600">OP</span>
            </span>
            <span className="text-green-600">/&gt;</span>
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
          />

          <div className="flex flex-col md:flex-row gap-4 justify-center w-full md:w-1/2">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="text-center w-full md:w-1/2 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              type="text"
              placeholder="Enter Username"
            />

            <div className="relative w-full md:w-1/2 flex items-center">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                className="text-center w-full rounded-lg border border-slate-300 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Enter Password"
              />

              <button
                type="button"
                className="absolute right-3 flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700"
                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
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
            className="flex items-center gap-2 text-lg bg-green-500 rounded-full px-5 py-2 font-medium text-black hover:bg-green-600 transition-colors shadow-sm"
          >
            <img width={30} height={30} src="/icons/add.gif" alt="" />
            <span>Add Your Password</span>
          </button>
        </form>

        <section className="mt-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
            {passwordArray.length === 0 ? (
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
                    const isCurrentVisible = visiblePasswords.has(item.id);

                    return (
                      <tr
                        key={item.id}
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

                            {/* Eye Button */}
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-600 p-1"
                              onClick={() =>
                                togglePasswordVisibility(item.id)
                              }
                              aria-label="Show password"
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

                            {/* Copy Button */}
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-600 p-1 transition-colors duration-150"
                              onClick={() =>
                                copyToClipboard(item.password)
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

                            {/* Delete Button */}
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-600 p-1 transition-colors duration-150"
                              onClick={() =>
                                deletePassword(item.id, item.site)
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 0 1-1 1v3M4 7h16"
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
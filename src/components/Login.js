import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ onLogin, hideCard }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onLogin) onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  const form = (
    <form onSubmit={handleLogin}>
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">Login</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <input
        className="w-full mb-4 px-4 py-2 border rounded focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full mb-6 px-4 py-2 border rounded focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded font-bold hover:from-pink-600 hover:to-purple-600 transition mb-4"
      >
        Login
      </button>
    </form>
  );

  if (hideCard) return form;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        {form}
      </div>
    </div>
  );
}
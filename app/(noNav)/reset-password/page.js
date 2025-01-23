"use client";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Reset Password
        </h2>
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-medium mb-2"
            >
              Password:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-600 font-medium mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;

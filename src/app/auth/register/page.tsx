// app/signup/page.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signUpMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await axios.post('/api/auth/sign-up', { username, password });
      return response.data;
    },
    onSuccess: () => {
      alert("สมัครสมาชิกสำเร็จ!");
    },
    onError: (error) => {
      console.error(error);
      alert("สมัครสมาชิกลบเลิก!");
    },
  });

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation.mutate({ username, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSignUp} className="p-6 bg-white rounded shadow-md w-80">
        <h2 className="mb-4 text-2xl font-bold text-center">สมัครสมาชิก</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button className="w-full p-2 text-white bg-blue-500 rounded" type="submit">
          {signUpMutation.isPending ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
        </button>
      </form>
    </div>
  );
}
// app/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SignInService } from '@/services/auth';

export default function Login() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await SignInService(credentials.email, credentials.password);
      return response;
    },
    onSuccess: (data) => {
      document.cookie = `token=${data.accessToken}; path=/`;

      delete data.user.password;
      delete data.user.refresh_token;
      queryClient.setQueryData(['user'], data.user);
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
      alert('Login failed');
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF4F1]">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">สมาร์ทล็อตโตะ</h1>
          <p className="text-gray-600 mt-2">
            สวัสดี, กรุณาระบุรายละเอียดเพื่อเข้าสู่ระบบ
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              กรุณาระบุอีเมล
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="กรุณาระบุอีเมล"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              กรุณาระบุรหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรุณาระบุรหัสผ่าน"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="flex justify-end mb-4 hidden">
            <a href="#" className="text-yellow-600 text-sm hover:underline">
              มีปัญหาในการเข้าสู่ระบบ?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            {loginMutation.isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
          <div className="text-center my-6 text-gray-600 hidden">
            — หรือเข้าสู่ระบบด้วย —
          </div>
          <div className="flex justify-center gap-4 mb-4 hidden">
            <button className="flex items-center justify-center w-full py-2 bg-white border rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              <img src="/path/to/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
              Google
            </button>
            <button className="flex items-center justify-center w-full py-2 bg-white border rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              <img src="/path/to/apple-icon.svg" alt="Apple" className="h-5 w-5 mr-2" />
              Apple ID
            </button>
            <button className="flex items-center justify-center w-full py-2 bg-white border rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              <img src="/path/to/facebook-icon.svg" alt="Facebook" className="h-5 w-5 mr-2" />
              Facebook
            </button>
          </div>
          <div className="text-center text-gray-600 hidden">
            ยังไม่มีบัญชี? <a href="#" className="text-yellow-600 font-semibold hover:underline">ขอรับบัญชี</a>
          </div>
        </form>
      </div>
    </div>
  );
}

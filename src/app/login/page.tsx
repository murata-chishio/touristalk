"use client"
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login(){
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onLogin = async(e: any) => {
    e.preventDefault();
    try{
      const { error:signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (signInError) {
        throw signInError;
      }
      await router.push("/");
      router.refresh();
    }catch{
      alert('メールアドレスまたはパスワードが間違っています');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <main>
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <form onSubmit={onLogin}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">メールアドレス</label>
            <input type="email"
              required value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">パスワード</label>
            <input type="password"
              required value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">ログイン</button><br/>
            <Link className="text-blue-700 hover:text-blue-800" href='/register'>
              ユーザー登録がお済みでない方はこちらから
            </Link><br/>
            <Link className="text-blue-700 hover:text-blue-800" href='/login/sendmail'>
              パスワードをお忘れの方はこちらから
            </Link>
          </div>
        </form>
        </div>
      </main>
    </div>
  )
}

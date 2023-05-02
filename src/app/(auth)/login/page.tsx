'use client'

import { LoginForm } from "components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-28">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-5xl">Log in</h1>
      </div>
      <LoginForm/>
    </div>
  )
}

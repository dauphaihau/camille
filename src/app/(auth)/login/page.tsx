import { LoginForm } from "components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-28">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-slate-600">
          Enter your email to sign in to your account
        </p>
      </div>
      <LoginForm/>
      {/*<p className="px-8 text-center text-sm text-slate-600">*/}
      {/*  <Link href="/public" className="underline hover:text-brand">*/}
      {/*    Don&apos;t have an account? Sign Up*/}
      {/*  </Link>*/}
      {/*</p>*/}
    </div>

  )
}

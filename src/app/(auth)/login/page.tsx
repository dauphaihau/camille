import Link from "next/link"
import { UserAuthForm } from "components/dashboard/user-auth-form";
import { Icons } from "core/components";

// import { Icons } from "@/components/icons"
// import { UserAuthForm } from "@/components/dashboard/user-auth-form"

export default function LoginPage() {
  return (
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-28">
        <div className="flex flex-col space-y-2 text-center">
          {/*<Icons.logo className="mx-auto h-6 w-6" />*/}
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-slate-600">
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        {/*<p className="px-8 text-center text-sm text-slate-600">*/}
        {/*  <Link href="/public" className="underline hover:text-brand">*/}
        {/*    Don&apos;t have an account? Sign Up*/}
        {/*  </Link>*/}
        {/*</p>*/}
      </div>

  )
}

import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Acesso ao Sistema</h1>
        <AuthForm />
      </div>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"

export default function PagesHome() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a versão App Router
    router.push("/")
  }, [router])

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold">Redirecionando...</h1>
      <p>Você será redirecionado para a página inicial.</p>
    </div>
  )
}

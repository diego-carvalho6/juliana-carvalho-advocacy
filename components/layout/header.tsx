"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { MainNav } from "@/components/layout/main-nav"
import { GavelIcon } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Database } from "@/lib/database.types"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(!!data.session)
    }

    checkSession()
  }, [supabase])

  return (
    <header className="border-b bg-primary-massala text-white">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <GavelIcon className="h-6 w-6 text-secondary-gold" />
          <span className="font-bold text-xl">Advocacia</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <MainNav isLoggedIn={isLoggedIn} />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}

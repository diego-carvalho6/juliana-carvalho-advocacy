import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { MainNav } from "@/components/layout/main-nav"
import { GavelIcon } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

export async function Header() {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession()
  const isLoggedIn = !!data.session

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

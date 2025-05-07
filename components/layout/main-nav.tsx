"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GavelIcon, BookOpenIcon, FolderIcon, HomeIcon, PhoneIcon } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

interface MainNavProps {
  isLoggedIn: boolean
}

// Traduções estáticas
const translations = {
  pt: {
    home: "Início",
    articles: "Artigos",
    contact: "Contato",
    dashboard: "Painel",
    cases: "Processos",
    login: "Entrar",
    logout: "Sair",
  },
  en: {
    home: "Home",
    articles: "Articles",
    contact: "Contact",
    dashboard: "Dashboard",
    cases: "Cases",
    login: "Login",
    logout: "Logout",
  },
}

export function MainNav({ isLoggedIn }: MainNavProps) {
  const pathname = usePathname()
  const { locale } = useTranslation()

  // Usar as traduções estáticas com base no idioma atual
  const t = translations[locale === "en" ? "en" : "pt"]

  const routes = [
    {
      href: "/",
      label: t.home,
      active: pathname === "/",
      icon: HomeIcon,
      public: true,
    },
    {
      href: "/articles",
      label: t.articles,
      active: pathname === "/articles" || pathname.startsWith("/articles/"),
      icon: BookOpenIcon,
      public: true,
    },
    {
      href: "/contact",
      label: t.contact,
      active: pathname === "/contact",
      icon: PhoneIcon,
      public: true,
    },
    {
      href: "/dashboard",
      label: t.dashboard,
      active: pathname === "/dashboard",
      icon: GavelIcon,
      public: false,
    },
    {
      href: "/cases",
      label: t.cases,
      active: pathname.startsWith("/cases"),
      icon: FolderIcon,
      public: false,
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => {
        if (!route.public && !isLoggedIn) return null

        const Icon = route.icon

        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-secondary-gold",
              route.active ? "text-secondary-gold" : "text-gray-300",
            )}
          >
            <Icon className="w-4 h-4 mr-2" />
            {route.label}
          </Link>
        )
      })}

      {!isLoggedIn ? (
        <Link href="/login">
          <Button variant="secondary" size="sm" className="text-primary-massala font-semibold">
            {t.login}
          </Button>
        </Link>
      ) : (
        <form action="/auth/signout" method="post">
          <Button
            variant="outline"
            size="sm"
            type="submit"
            className="border-gray-300 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            {t.logout}
          </Button>
        </form>
      )}
    </nav>
  )
}

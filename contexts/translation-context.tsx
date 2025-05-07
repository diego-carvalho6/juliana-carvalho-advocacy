"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import Cookies from "js-cookie"

type Locale = "pt" | "en"

interface TranslationContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt")

  useEffect(() => {
    // Obter o idioma do cookie ou usar o padrão
    const savedLocale = Cookies.get("NEXT_LOCALE") as Locale
    if (savedLocale && (savedLocale === "pt" || savedLocale === "en")) {
      setLocale(savedLocale)
    }
  }, [])

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 })

    // Recarregar a página para aplicar o novo idioma
    window.location.reload()
  }

  return (
    <TranslationContext.Provider value={{ locale, setLocale: changeLocale }}>{children}</TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}

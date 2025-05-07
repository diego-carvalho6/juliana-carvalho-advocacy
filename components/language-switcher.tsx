"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Globe } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/contexts/translation-context"

interface Language {
  value: string
  label: string
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const { locale, setLocale } = useTranslation()

  const languages: Language[] = [
    { value: "pt", label: "Português" },
    { value: "en", label: "English" },
  ]

  const handleLanguageChange = (value: string) => {
    if (value === "pt" || value === "en") {
      setLocale(value)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] justify-between border-gray-300 text-gray-300 hover:bg-white/10 hover:text-white"
        >
          <Globe className="mr-2 h-4 w-4" />
          {languages.find((language) => language.value === locale)?.label || "Idioma"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[140px] p-0">
        <Command>
          <CommandInput placeholder="Idioma" />
          <CommandList>
            <CommandEmpty>Nenhum idioma encontrado.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={() => handleLanguageChange(language.value)}
                >
                  <Check className={cn("mr-2 h-4 w-4", locale === language.value ? "opacity-100" : "opacity-0")} />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

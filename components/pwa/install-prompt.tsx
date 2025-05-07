"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      // Impedir que o Chrome mostre o prompt padrão
      e.preventDefault()
      // Armazenar o evento para que possa ser acionado mais tarde
      setDeferredPrompt(e)
      // Atualizar a UI para mostrar o botão de instalação
      setShowInstallButton(true)
    }

    window.addEventListener("beforeinstallprompt", handler as EventListener)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as EventListener)
    }
  }, [])

  const handleInstallClick = () => {
    // Esconder o botão de instalação
    setShowInstallButton(false)
    // Mostrar o prompt de instalação
    deferredPrompt.prompt()
    // Esperar pela escolha do usuário
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Usuário aceitou a instalação do PWA")
      } else {
        console.log("Usuário recusou a instalação do PWA")
      }
      // Limpar o prompt salvo, pois não pode ser usado novamente
      setDeferredPrompt(null)
    })
  }

  if (!showInstallButton) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={handleInstallClick} className="bg-secondary-gold text-primary-massala hover:bg-accent-gold1">
        <Download className="mr-2 h-4 w-4" />
        Instalar App
      </Button>
    </div>
  )
}

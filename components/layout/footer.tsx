import Link from "next/link"
import { GavelIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 bg-primary-massala text-white">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <GavelIcon className="h-5 w-5 text-secondary-gold" />
          <p className="text-sm">&copy; {new Date().getFullYear()} Advocacia. Todos os direitos reservados.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-gray-300 hover:text-secondary-gold hover:underline">
            Termos de Uso
          </Link>
          <Link href="/privacy" className="text-sm text-gray-300 hover:text-secondary-gold hover:underline">
            Política de Privacidade
          </Link>
          <Link href="/contact" className="text-sm text-gray-300 hover:text-secondary-gold hover:underline">
            Contato
          </Link>
        </div>
      </div>
    </footer>
  )
}

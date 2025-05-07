import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// Lista de idiomas suportados
const locales = ["pt", "en"]
const defaultLocale = "pt"

// Função para obter o idioma preferido do usuário
function getLocale(request: NextRequest) {
  // Verificar se há um cookie de idioma
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Obter os idiomas aceitos do cabeçalho
  const acceptLanguage = request.headers.get("accept-language") || ""
  const languages = new Negotiator({
    headers: { "accept-language": acceptLanguage },
  }).languages()

  // Usar o matcher para encontrar o melhor idioma
  try {
    return match(languages, locales, defaultLocale)
  } catch (error) {
    return defaultLocale
  }
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Obter o idioma preferido
  const locale = getLocale(req)
  const pathname = req.nextUrl.pathname

  // Verificar se o usuário está autenticado
  if (!session) {
    // Redirecionar para login se tentar acessar rotas protegidas
    const protectedRoutes = ["/admin", "/dashboard", "/cases"]
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirectTo", pathname)
      return NextResponse.redirect(redirectUrl)
    }
  } else {
    // Verificar se o usuário tem permissão para acessar rotas de admin
    if (pathname.startsWith("/admin")) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Buscar o perfil do usuário para verificar a role
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.id).single()

      // Se não for admin, redirecionar para o dashboard
      if (!profile || profile.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }
  }

  // Definir o cookie de idioma se não existir
  if (!req.cookies.has("NEXT_LOCALE")) {
    res.cookies.set("NEXT_LOCALE", locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 ano
      path: "/",
    })
  }

  return res
}

export const config = {
  matcher: [
    // Excluir arquivos estáticos
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/admin/:path*",
    "/dashboard/:path*",
    "/cases/:path*",
    "/articles/new/:path*",
    "/articles/:id/edit/:path*",
  ],
}

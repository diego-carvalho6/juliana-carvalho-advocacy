"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GavelIcon, ScaleIcon as ScalesIcon, BookOpenIcon, ShieldIcon, HomeIcon } from "lucide-react"
import { AreaAtuacao, areaDescricoes } from "@/types/enums"
import { useTranslation } from "@/contexts/translation-context"

// Mapeamento de ícones para cada área
const areaIcons = {
  [AreaAtuacao.Civil]: GavelIcon,
  [AreaAtuacao.Previdenciario]: ShieldIcon,
  [AreaAtuacao.Familia]: HomeIcon,
}

export default function Home() {
  const { locale } = useTranslation()

  // Traduções estáticas
  const translations = {
    pt: {
      specialized_legal: "Advocacia especializada para suas necessidades jurídicas",
      our_firm:
        "Nosso escritório oferece serviços jurídicos de excelência, com profissionais experientes e dedicados a defender seus direitos.",
      free_consultation: "Consulta Gratuita",
      our_articles: "Nossos Artigos",
      practice_areas: "Áreas de Atuação",
      specialized_services: "Oferecemos serviços jurídicos especializados em diversas áreas do direito.",
      why_choose_us: "Por que nos escolher?",
      commitment: "Nosso compromisso é oferecer o melhor serviço jurídico com ética e excelência.",
      experience: "Experiência",
      experience_desc: "Mais de 15 anos de experiência em casos complexos e diversificados.",
      personalized_service: "Atendimento Personalizado",
      personalized_service_desc: "Cada cliente recebe atenção individualizada e estratégias sob medida.",
      transparency: "Transparência",
      transparency_desc: "Comunicação clara e honesta sobre seu caso e honorários.",
      results: "Resultados",
      results_desc: "Histórico comprovado de sucesso em diversos tipos de casos.",
      ready_to_solve: "Pronto para resolver suas questões jurídicas?",
      contact_today: "Entre em contato hoje para uma consulta inicial gratuita.",
      schedule_consultation: "Agendar Consulta",
      office_hours: "Horário de Atendimento",
      monday_to_friday: "Segunda a Sexta",
      saturday: "Sábado",
    },
    en: {
      specialized_legal: "Specialized legal services for your needs",
      our_firm:
        "Our firm offers excellent legal services, with experienced professionals dedicated to defending your rights.",
      free_consultation: "Free Consultation",
      our_articles: "Our Articles",
      practice_areas: "Practice Areas",
      specialized_services: "We offer specialized legal services in various areas of law.",
      why_choose_us: "Why Choose Us?",
      commitment: "Our commitment is to provide the best legal service with ethics and excellence.",
      experience: "Experience",
      experience_desc: "Over 15 years of experience in complex and diverse cases.",
      personalized_service: "Personalized Service",
      personalized_service_desc: "Each client receives individualized attention and tailored strategies.",
      transparency: "Transparency",
      transparency_desc: "Clear and honest communication about your case and fees.",
      results: "Results",
      results_desc: "Proven track record of success in various types of cases.",
      ready_to_solve: "Ready to solve your legal issues?",
      contact_today: "Contact us today for a free initial consultation.",
      schedule_consultation: "Schedule Consultation",
      office_hours: "Office Hours",
      monday_to_friday: "Monday to Friday",
      saturday: "Saturday",
    },
  }

  const t = translations[locale === "en" ? "en" : "pt"]

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-massala text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.specialized_legal}</h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">{t.our_firm}</p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-secondary-gold hover:bg-accent-gold1 text-primary-massala font-semibold"
                  >
                    {t.free_consultation}
                  </Button>
                </Link>
                <Link href="/articles">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    {t.our_articles}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <ScalesIcon className="h-64 w-64 text-secondary-gold opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Resto do conteúdo da página... */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t.practice_areas}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t.specialized_services}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {Object.values(AreaAtuacao).map((area) => {
              const Icon = areaIcons[area as AreaAtuacao] || BookOpenIcon

              return (
                <div key={area} className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary-massala/10 p-4">
                    <Icon className="h-10 w-10 text-primary-massala" />
                  </div>
                  <h3 className="text-xl font-bold">{area}</h3>
                  <p className="text-muted-foreground">{areaDescricoes[area as AreaAtuacao]}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t.why_choose_us}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t.commitment}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-bold">{t.experience}</h3>
              <p className="text-muted-foreground">{t.experience_desc}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-bold">{t.personalized_service}</h3>
              <p className="text-muted-foreground">{t.personalized_service_desc}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-bold">{t.transparency}</h3>
              <p className="text-muted-foreground">{t.transparency_desc}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-bold">{t.results}</h3>
              <p className="text-muted-foreground">{t.results_desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t.ready_to_solve}</h2>
              <p className="text-muted-foreground md:text-xl">{t.contact_today}</p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="text-white">
                    {t.schedule_consultation}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-bold">{t.office_hours}</h3>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div>{t.monday_to_friday}</div>
                  <div>9 AM to 6 PM</div>
                  <div>{t.saturday}</div>
                  <div>9 AM to 12 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

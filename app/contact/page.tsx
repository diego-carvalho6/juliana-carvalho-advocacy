import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react"
import { ADDRESS, EMAILS, PHONES, OFFICE_HOURS } from "@/constants/contact"

export const metadata: Metadata = {
  title: "Contato - Advocacia",
  description: "Entre em contato com nosso escritório de advocacia para agendar uma consulta ou tirar dúvidas.",
}

export default function ContactPage() {
  return (
    <div className="container py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary-massala mb-6">Entre em Contato</h1>
          <p className="text-muted-foreground mb-8">
            Preencha o formulário abaixo para solicitar um pré-atendimento jurídico. Nossa equipe entrará em contato o
            mais breve possível.
          </p>

          <div className="grid gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PhoneCall className="h-5 w-5 mr-2 text-secondary-gold" />
                  Telefone
                </CardTitle>
              </CardHeader>
              <CardContent>
                {PHONES.map((phone, index) => (
                  <p key={index}>{phone}</p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-secondary-gold" />
                  E-mail
                </CardTitle>
              </CardHeader>
              <CardContent>
                {EMAILS.map((email, index) => (
                  <p key={index}>{email}</p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-secondary-gold" />
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{ADDRESS}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-secondary-gold" />
                  Horário de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{OFFICE_HOURS.weekdays}</p>
                <p>{OFFICE_HOURS.saturday}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Card className="border-secondary-gold/20">
            <CardHeader className="bg-primary-massala text-white rounded-t-lg">
              <CardTitle>Formulário de Pré-Cadastro</CardTitle>
              <CardDescription className="text-gray-300">
                Preencha os campos abaixo para iniciar seu atendimento
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

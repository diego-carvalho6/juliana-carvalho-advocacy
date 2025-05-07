import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react"

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
                <p>(11) 3456-7890</p>
                <p>(11) 98765-4321</p>
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
                <p>contato@advocacia.com.br</p>
                <p>atendimento@advocacia.com.br</p>
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
                <p>Av. Paulista, 1000 - Bela Vista</p>
                <p>São Paulo - SP, 01310-100</p>
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
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábado: 9h às 12h</p>
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

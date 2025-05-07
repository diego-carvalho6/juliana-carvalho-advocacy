"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, InfoIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputMask } from "@/components/ui/input-mask"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

import { cn } from "@/lib/utils"
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact"
import { AreaAtuacao, areaDescricoes } from "@/types/enums"
import { createPreCadastro } from "@/app/contact/actions"
import { WHATSAPP_NUMBER } from "@/constants/contact"
import { useTranslation } from "@/contexts/translation-context"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { t } = useTranslation()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      cpf: "",
      dataNascimento: undefined,
      numeroProcesso: "",
      descricao: "",
      area: undefined,
    },
  })

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true)

    try {
      const result = await createPreCadastro(values)

      if (result.success) {
        toast({
          title: t("pre_registration_success"),
          description: t("we_will_contact"),
          variant: "default",
        })

        // Redirecionar para WhatsApp com mensagem personalizada
        const registrationId = result.data?.[0]?.id || "N/A"
        const whatsappMessage = encodeURIComponent(
          `Hello, I received the pre-registration number ${registrationId}. I would like to talk about my case.`,
        )
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`

        // Resetar o formulário antes de redirecionar
        form.reset()

        // Redirecionar após um pequeno delay para que o usuário veja a mensagem de sucesso
        setTimeout(() => {
          window.open(whatsappUrl, "_blank")
        }, 1500)
      } else if (result.error?.includes("unique constraint")) {
        // CPF já existe, mensagem genérica
        toast({
          title: t("registration_exists"),
          description: t("redirect_whatsapp"),
          variant: "default",
        })

        // Redirecionar para WhatsApp com mensagem genérica
        const whatsappMessage = encodeURIComponent("Hello, I would like to talk about my case.")
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`

        setTimeout(() => {
          window.open(whatsappUrl, "_blank")
        }, 1500)
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      toast({
        title: t("error_sending"),
        description: error.message || t("try_again"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("first_name")}*</FormLabel>
                <FormControl>
                  <Input placeholder={t("first_name")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sobrenome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("last_name")}*</FormLabel>
                <FormControl>
                  <Input placeholder={t("last_name")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF*</FormLabel>
                <FormControl>
                  <InputMask
                    mask="###.###.###-##"
                    placeholder="000.000.000-00"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dataNascimento"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t("birth_date")}*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>{t("select_date")}</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="numeroProcesso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("case_number_optional")}</FormLabel>
              <FormControl>
                <Input placeholder={t("if_already_case")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("practice_area")}*</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_area")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(AreaAtuacao).map((area) => (
                    <SelectItem key={area} value={area}>
                      <div className="flex items-center">
                        <span>{area}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              <p className="max-w-xs">{areaDescricoes[area as AreaAtuacao]}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>{t("select_legal_area")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("case_description_required")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("describe_situation")} className="min-h-[120px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("sending")}
            </>
          ) : (
            t("submit_pre_registration")
          )}
        </Button>
      </form>
    </Form>
  )
}

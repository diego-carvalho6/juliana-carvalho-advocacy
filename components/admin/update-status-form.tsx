"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { StatusPreCadastro } from "@/types/enums"
import type { PreCadastro } from "@/types"
import { updatePreCadastroStatus } from "@/app/admin/pre-cadastros/actions"

const formSchema = z.object({
  status: z.nativeEnum(StatusPreCadastro, {
    required_error: "Please select a status",
  }),
})

interface UpdateStatusFormProps {
  preCadastro: PreCadastro
}

export function UpdateStatusForm({ preCadastro }: UpdateStatusFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: preCadastro.status as StatusPreCadastro,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.status === preCadastro.status) {
      toast({
        title: "No changes",
        description: "The status is already set to this value.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await updatePreCadastroStatus(preCadastro.id, values.status)

      if (result.success) {
        toast({
          title: "Status updated",
          description: `Status updated to ${values.status}`,
        })
        router.refresh()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(StatusPreCadastro).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Status"
          )}
        </Button>
      </form>
    </Form>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface ArticleFormProps {
  userId: string
  article?: {
    id: string
    title: string
    content: string
  }
}

export function ArticleForm({ userId, article }: ArticleFormProps) {
  const [title, setTitle] = useState(article?.title || "")
  const [content, setContent] = useState(article?.content || "")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (article) {
        // Atualizar artigo existente
        const { error } = await supabase
          .from("articles")
          .update({
            title,
            content,
          })
          .eq("id", article.id)
          .eq("author_id", userId)

        if (error) throw error

        toast({
          title: "Artigo atualizado com sucesso!",
        })

        router.push(`/articles/${article.id}`)
      } else {
        // Criar novo artigo
        const { data, error } = await supabase
          .from("articles")
          .insert({
            title,
            content,
            author_id: userId,
          })
          .select()

        if (error) throw error

        toast({
          title: "Artigo criado com sucesso!",
        })

        router.push(`/articles/${data[0].id}`)
      }
    } catch (error: any) {
      toast({
        title: "Erro ao salvar artigo",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[300px]"
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : article ? "Atualizar Artigo" : "Publicar Artigo"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

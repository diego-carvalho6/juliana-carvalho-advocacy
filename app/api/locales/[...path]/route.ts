import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const filePath = path.join(process.cwd(), "public", "locales", ...params.path)

    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return new NextResponse(JSON.stringify({ error: "File not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    // Ler o arquivo
    const fileContent = fs.readFileSync(filePath, "utf8")
    const jsonContent = JSON.parse(fileContent)

    // Retornar o conteúdo como JSON
    return NextResponse.json(jsonContent)
  } catch (error) {
    console.error("Error serving locale file:", error)
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

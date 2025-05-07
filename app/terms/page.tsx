import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Termos de Uso - Advocacia",
  description: "Termos de uso do site de advocacia",
}

export default function TermsPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>

        <div className="prose max-w-none">
          <p>
            Bem-vindo ao nosso site. Ao acessar e utilizar nossos serviços, você concorda com os seguintes termos e
            condições. Caso não concorde com qualquer parte destes termos, não utilize nosso site.
          </p>

          <h2>1. Aceitação dos Termos</h2>
          <p>
            Este contrato estabelece as condições para o uso do site e serviços oferecidos. Ao acessar o site ou
            utilizar nossos serviços, você concorda em cumprir integralmente estes Termos de Uso e quaisquer políticas
            ou regulamentos adicionais.
          </p>

          <h2>2. Definições</h2>
          <p>
            Para fins deste Termo, entende-se por "Usuário" qualquer pessoa que acesse ou utilize os serviços fornecidos
            por este site. "Serviços" refere-se a todas as funcionalidades oferecidas, incluindo o cadastro,
            visualização de conteúdo e interação com os materiais disponibilizados.
          </p>

          <h2>3. Modificações dos Termos</h2>
          <p>
            Nos reservamos o direito de alterar, modificar ou revisar estes Termos de Uso a qualquer momento, a nosso
            critério. As alterações serão publicadas neste espaço e a data da última atualização será indicada ao final
            da página. O uso contínuo dos nossos serviços após essas modificações constitui sua aceitação aos novos
            termos.
          </p>

          <h2>4. Responsabilidade do Usuário</h2>
          <p>
            O Usuário é responsável por todas as atividades realizadas em sua conta e concorda em não usar o site para
            fins ilegais, fraudulentos ou prejudiciais a terceiros. O Usuário não pode:
          </p>
          <ul>
            <li>Realizar qualquer ato que possa comprometer a integridade ou segurança do site;</li>
            <li>
              Violar a propriedade intelectual de terceiros, publicando ou compartilhando conteúdo que infrinja direitos
              autorais ou marcas registradas;
            </li>
            <li>Compartilhar informações falsas ou enganosas.</li>
          </ul>

          <h2>5. Uso do Conteúdo</h2>
          <p>
            O conteúdo disponibilizado neste site, incluindo textos, imagens, vídeos e outros materiais, é protegido por
            direitos autorais e outras leis de propriedade intelectual. O Usuário pode visualizar, copiar e imprimir o
            conteúdo exclusivamente para uso pessoal e não comercial, respeitando sempre as limitações legais.
          </p>

          <h2>6. Privacidade e Segurança</h2>
          <p>
            Nos comprometemos a proteger a privacidade dos dados pessoais dos Usuários. Para mais detalhes sobre como
            coletamos, usamos e armazenamos suas informações, consulte nossa{" "}
            <Link href="/privacy" className="text-primary-massala hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>

          <h2>7. Limitação de Responsabilidade</h2>
          <p>
            Embora busquemos oferecer um serviço de qualidade, não garantimos que o site estará livre de erros ou
            interrupções. Não nos responsabilizamos por danos diretos ou indiretos resultantes do uso ou da
            impossibilidade de uso do site.
          </p>

          <h2>8. Rescisão</h2>
          <p>
            Podemos, a qualquer momento e a nosso critério, suspender ou encerrar o acesso ao site e aos serviços, sem
            aviso prévio, em caso de violação destes Termos de Uso.
          </p>

          <h2>9. Lei Aplicável</h2>
          <p>
            Este Termo é regido pelas leis brasileiras, e qualquer disputa será resolvida nos tribunais competentes da
            cidade onde estamos localizados.
          </p>

          <p>
            <strong>Última atualização:</strong> Maio de 2025.
          </p>
        </div>
      </div>
    </div>
  )
}

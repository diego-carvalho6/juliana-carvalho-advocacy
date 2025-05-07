import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade - Advocacia",
  description: "Política de privacidade do site de advocacia",
}

export default function PrivacyPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>

        <div className="prose max-w-none">
          <p>
            Esta Política de Privacidade descreve como coletamos, utilizamos, protegemos e compartilhamos as informações
            pessoais de nossos usuários ao utilizar o site e seus serviços. Ao utilizar este site, você concorda com as
            práticas descritas nesta política.
          </p>

          <h2>1. Coleta de Informações</h2>
          <p>
            Coletamos informações pessoais identificáveis, como nome, endereço de e-mail, telefone, entre outras, quando
            você se cadastra em nosso site ou interage conosco. Além disso, podemos coletar informações não pessoais,
            como dados de navegação, IP, tipo de dispositivo e histórico de navegação para melhorar a experiência do
            usuário.
          </p>

          <h2>2. Como Usamos Suas Informações</h2>
          <p>Utilizamos as informações coletadas para os seguintes fins:</p>
          <ul>
            <li>Fornecer e personalizar os serviços oferecidos;</li>
            <li>Melhorar a navegação e o desempenho do site;</li>
            <li>Responder a consultas e solicitações de usuários;</li>
            <li>Enviar informações promocionais, quando autorizado.</li>
          </ul>

          <h2>3. Compartilhamento de Informações</h2>
          <p>Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes situações:</p>
          <ul>
            <li>Quando exigido por lei ou para cumprir uma ordem judicial;</li>
            <li>Com prestadores de serviços que atuam em nosso nome, mas sempre sob acordos de confidencialidade;</li>
            <li>Em caso de reestruturação corporativa ou venda de ativos.</li>
          </ul>

          <h2>4. Armazenamento e Segurança das Informações</h2>
          <p>
            Adotamos medidas de segurança apropriadas para proteger suas informações pessoais contra acesso, uso ou
            divulgação não autorizados. No entanto, nenhuma transmissão de dados pela internet é completamente segura, e
            não podemos garantir a segurança absoluta de suas informações.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Utilizamos cookies e tecnologias similares para melhorar a experiência de navegação e coletar dados de uso.
            Você pode configurar seu navegador para recusar cookies ou alertá-lo quando um cookie for enviado. No
            entanto, isso pode afetar a funcionalidade do site.
          </p>

          <h2>6. Seus Direitos</h2>
          <p>
            Você tem o direito de acessar, corrigir, atualizar ou excluir suas informações pessoais a qualquer momento.
            Para isso, basta entrar em contato conosco através dos canais disponíveis no site.
          </p>

          <h2>7. Alterações na Política de Privacidade</h2>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente. Quaisquer mudanças serão publicadas nesta
            página, e a data da última revisão será indicada ao final.
          </p>

          <h2>8. Contato</h2>
          <p>
            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre
            em contato conosco através de nossas informações de contato.
          </p>

          <p>
            <strong>Última atualização:</strong> Maio de 2025.
          </p>
        </div>
      </div>
    </div>
  )
}

# pdfExtratorFront_end
<h1>Componente de Verificação de Texto em PDF</h1>

<p>Este componente React permite ao usuário selecionar um arquivo PDF e verificar se ele contém uma palavra ou texto específico. O arquivo PDF é enviado a uma API, que realiza a análise do conteúdo e retorna se o texto procurado foi encontrado.</p>

<h2>Fluxo de Funcionamento:</h2>
<ol>
  <li>O usuário faz o upload de um arquivo PDF a partir da interface do componente.</li>
  <li>O usuário insere a palavra ou texto que deseja verificar no PDF.</li>
  <li>O componente envia o arquivo e o texto de busca para uma API externa que realiza a análise do conteúdo do PDF.</li>
  <li>A API responde se o texto ou palavra está presente no documento.</li>
  <li>O resultado é exibido na tela para o usuário, indicando se o texto foi encontrado ou não.</li>
</ol>

<h2>Funcionalidades:</h2>
<ul>
  <li>Upload de arquivos PDF.</li>
  <li>Entrada de texto para especificar a palavra ou frase a ser verificada.</li>
  <li>Integração com uma API externa que processa o conteúdo do PDF.</li>
  <li>Exibição de resultados em tempo real, com feedback ao usuário (carregamento, sucesso, erro).</li>
</ul>

<h2>Objetivo:</h2>
<p>Este componente é útil para aplicações onde seja necessário verificar automaticamente a presença de termos ou frases específicas em documentos PDF, como em processos de revisão, validação de documentos ou automação de tarefas de busca textual.</p>

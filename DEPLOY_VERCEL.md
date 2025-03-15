# Instruções de Deploy para Vercel

Este documento fornece instruções detalhadas sobre como fazer deploy deste projeto na Vercel.

## Por que a Vercel?

A Vercel é a plataforma ideal para aplicações Next.js, oferecendo:

- Deploy automático a partir do GitHub, GitLab ou Bitbucket
- Previews automáticos para cada pull request
- Certificados SSL gratuitos
- CDN global
- Integração nativa com Next.js (criado pela mesma empresa)
- Domínios personalizados gratuitos
- Analytics e monitoramento

## Deploy Automático (Recomendado)

### Pré-requisitos

1. Uma conta na [Vercel](https://vercel.com)
2. Seu código em um repositório Git (GitHub, GitLab ou Bitbucket)

### Passos para Deploy

1. Faça login na [Vercel](https://vercel.com)

2. Clique em "Add New..." e selecione "Project"

3. Importe seu repositório Git:
   - Conecte sua conta GitHub, GitLab ou Bitbucket se ainda não estiver conectada
   - Selecione o repositório `web3-lending`

4. Configure o projeto:
   - **Framework Preset**: Next.js (deve ser detectado automaticamente)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)
   - **Install Command**: `npm install` (padrão)

5. Configure variáveis de ambiente (se necessário)

6. Clique em "Deploy"

O deploy inicial pode levar alguns minutos. Após a conclusão, você receberá um URL para acessar seu site (por exemplo, `https://web3-lending.vercel.app`).

## Configuração de Domínio Personalizado

Para adicionar um domínio personalizado ao seu projeto:

1. No dashboard da Vercel, selecione seu projeto

2. Vá para a aba "Settings" e depois "Domains"

3. Adicione seu domínio e siga as instruções:
   - Para domínios que você já possui, você precisará configurar os registros DNS
   - Você também pode comprar um domínio diretamente pela Vercel

4. A Vercel fornecerá automaticamente um certificado SSL para seu domínio

## Configuração de CI/CD

A Vercel configura automaticamente o CI/CD para seu projeto:

- Cada push para a branch principal (main/master) resultará em um deploy para produção
- Cada pull request criará um ambiente de preview

Para personalizar este comportamento:

1. No dashboard da Vercel, vá para "Settings" > "Git"

2. Configure as opções de "Production Branch" e "Preview Branches" conforme necessário

## Monitoramento e Analytics

A Vercel oferece ferramentas integradas para monitorar seu aplicativo:

1. No dashboard do projeto, vá para a aba "Analytics"

2. Ative o Vercel Analytics para começar a coletar dados sobre o desempenho e uso do seu site

## Solução de Problemas

- **Falha no build**: Verifique os logs de build na Vercel para identificar o problema
  
- **Problemas com rotas API**: Certifique-se de que suas rotas API estão na pasta `app/api` ou `pages/api`

- **Problemas com variáveis de ambiente**: Verifique se todas as variáveis de ambiente necessárias estão configuradas no dashboard da Vercel

- **Problemas com domínio personalizado**: Verifique se os registros DNS estão configurados corretamente

## Recursos Adicionais

- [Documentação da Vercel](https://vercel.com/docs)
- [Guia de deploy do Next.js na Vercel](https://nextjs.org/docs/deployment)
- [Vercel CLI](https://vercel.com/cli) para deploy a partir da linha de comando 
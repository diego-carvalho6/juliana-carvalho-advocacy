import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuração i18n nativa do Next.js
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
  },
  // Garantir que os arquivos estáticos sejam servidos corretamente
  async rewrites() {
    return [
      {
        source: '/locales/:path*',
        destination: '/api/locales/:path*',
      },
    ];
  },
  // Configuração para permitir Server Components no App Router
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@supabase/auth-helpers-nextjs'],
  },
};

export default nextConfig;

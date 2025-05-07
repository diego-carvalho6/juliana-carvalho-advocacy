-- Criar tabela de perfis para armazenar informações adicionais dos usuários
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar campo de status à tabela de pré-cadastros
ALTER TABLE pre_cadastros ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'Novo';

-- Habilitar RLS (Row Level Security) para a tabela de perfis
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Criar políticas para a tabela de perfis
-- Permitir que usuários vejam seu próprio perfil
CREATE POLICY "Usuários podem ver seu próprio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Permitir que usuários atualizem seu próprio perfil, exceto o campo role
CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = OLD.role);

-- Permitir que admins vejam todos os perfis
CREATE POLICY "Admins podem ver todos os perfis" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Permitir que admins atualizem todos os perfis
CREATE POLICY "Admins podem atualizar todos os perfis" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Atualizar políticas para a tabela de pré-cadastros
-- Permitir que admins vejam todos os pré-cadastros
CREATE POLICY "Admins podem ver todos os pré-cadastros" ON pre_cadastros
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Permitir que admins atualizem todos os pré-cadastros
CREATE POLICY "Admins podem atualizar todos os pré-cadastros" ON pre_cadastros
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Criar função para adicionar usuário à tabela de perfis após o registro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger para adicionar usuário à tabela de perfis após o registro
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create contacts table for contact form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contacts
CREATE POLICY "Anyone can submit contact form"
ON public.contacts
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view contacts (for admin dashboard)
CREATE POLICY "Authenticated users can view contacts"
ON public.contacts
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Create admin_credentials table
CREATE TABLE public.admin_credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read admin credentials
CREATE POLICY "Authenticated users can view admin credentials"
ON public.admin_credentials
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Only authenticated users can update admin credentials
CREATE POLICY "Authenticated users can update admin credentials"
ON public.admin_credentials
FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Insert default admin credentials (password: $rootAdmin25)
-- Using bcrypt hash for the password
INSERT INTO public.admin_credentials (username, password_hash)
VALUES ('admin', '$2a$10$xZ5gJ8KqX6jH3mYvQmN5NeC4XyLKZzVhP4nGjLqM5Rv8TqYnGxKJi');

-- Create trigger for updating updated_at
CREATE TRIGGER update_admin_credentials_updated_at
BEFORE UPDATE ON public.admin_credentials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
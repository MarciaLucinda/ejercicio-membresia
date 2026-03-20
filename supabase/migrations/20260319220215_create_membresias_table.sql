/*
  # Crear tabla de membresías

  1. Nueva Tabla
    - `membresias`
      - `id` (uuid, primary key) - Identificador único de la membresía
      - `nombres` (text) - Nombres del miembro
      - `apellidos` (text) - Apellidos del miembro
      - `edad` (integer) - Edad del miembro
      - `correo` (text, unique) - Correo electrónico del miembro
      - `estatus` (text) - Estatus de la membresía (activo/inactivo)
      - `created_at` (timestamptz) - Fecha de creación del registro

  2. Seguridad
    - Habilitar RLS en la tabla `membresias`
    - Agregar política para permitir SELECT a todos (datos públicos)
    - Agregar política para permitir INSERT a todos (registro abierto)
    - Agregar política para permitir UPDATE a todos (actualización de estatus)
*/

CREATE TABLE IF NOT EXISTS membresias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombres text NOT NULL,
  apellidos text NOT NULL,
  edad integer NOT NULL CHECK (edad > 0),
  correo text UNIQUE NOT NULL,
  estatus text NOT NULL DEFAULT 'activo' CHECK (estatus IN ('activo', 'inactivo')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE membresias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir SELECT a todos"
  ON membresias
  FOR SELECT
  USING (true);

CREATE POLICY "Permitir INSERT a todos"
  ON membresias
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir UPDATE a todos"
  ON membresias
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
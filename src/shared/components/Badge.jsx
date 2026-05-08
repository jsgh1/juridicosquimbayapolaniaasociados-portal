const variants = {
  Activo: 'success',
  Vigente: 'success',
  Abierto: 'success',
  Registrada: 'success',
  Cerrado: 'neutral',
  Archivado: 'neutral',
  Inactivo: 'neutral',
  Borrador: 'warning',
  Pendiente: 'warning',
  'En trámite': 'warning',
  'En revisión': 'warning',
  Alta: 'danger',
  Media: 'warning',
  Baja: 'neutral'
};

export function Badge({ children, variant }) {
  const resolvedVariant = variant || variants[children] || 'neutral';
  return <span className={`badge badge-${resolvedVariant}`}>{children}</span>;
}

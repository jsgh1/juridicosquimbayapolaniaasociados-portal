export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

export function required(value) {
  return String(value || '').trim().length > 0;
}

export function minLength(value, length) {
  return String(value || '').trim().length >= length;
}

export function validateAuth(values, mode = 'login') {
  const errors = {};

  if (mode === 'register' && !required(values.name)) {
    errors.name = 'El nombre es obligatorio.';
  }

  if (!isEmail(values.email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (mode !== 'recover' && !minLength(values.password, 6)) {
    errors.password = 'La contraseña debe tener mínimo 6 caracteres.';
  }

  return errors;
}

export function validateClient(values) {
  const errors = {};
  if (!required(values.name)) errors.name = 'El nombre del cliente es obligatorio.';
  if (!required(values.document)) errors.document = 'El documento es obligatorio.';
  if (!isEmail(values.email)) errors.email = 'Ingresa un correo válido.';
  if (!required(values.phone)) errors.phone = 'El teléfono es obligatorio.';
  if (!required(values.city)) errors.city = 'La ciudad es obligatoria.';
  return errors;
}

export function validateCase(values) {
  const errors = {};
  if (!required(values.title)) errors.title = 'El nombre del caso es obligatorio.';
  if (!required(values.client)) errors.client = 'Selecciona un cliente.';
  if (!required(values.area)) errors.area = 'Selecciona un área jurídica.';
  if (!required(values.description)) errors.description = 'Describe el caso.';
  return errors;
}

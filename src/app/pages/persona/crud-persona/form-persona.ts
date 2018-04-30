
export let FORM_PERSONA = {
    titulo: 'Persona',
    tipo_formulario: 'mini',
    btn: 'Guardar',
    alertas: true,
    modelo: 'Persona',
    campos: [
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Id',
        label: 'Id*:',
        placeholder: 'Ej. Id',
        requerido: true,
        tipo: 'number',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'PrimerNombre',
        label: 'PrimerNombre*:',
        placeholder: 'Ej. PrimerNombre',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'SegundoNombre',
        label: 'SegundoNombre*:',
        placeholder: 'Ej. SegundoNombre',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'PrimerApellido',
        label: 'PrimerApellido*:',
        placeholder: 'Ej. PrimerApellido',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'SegundoApellido',
        label: 'SegundoApellido*:',
        placeholder: 'Ej. SegundoApellido',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'mat-date',
        claseGrid: 'col-6',
        nombre: 'FechaNacimiento',
        label: 'FechaNacimiento*:',
        placeholder: 'Ej. FechaNacimiento',
        requerido: true,
        tipo: 'date',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Usuario',
        label: 'Usuario*:',
        placeholder: 'Ej. Usuario',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Ente',
        label: 'Ente*:',
        placeholder: 'Ej. Ente',
        requerido: true,
        tipo: 'number',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Foto',
        label: 'Foto*:',
        placeholder: 'Ej. Foto',
        requerido: true,
        tipo: 'text',
    },
    ],
}
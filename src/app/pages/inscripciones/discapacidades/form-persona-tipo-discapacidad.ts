
export let FORM_PERSONA_TIPO_DISCAPACIDAD = {
  titulo: 'Discapacidades',
  tipo_formulario: 'basic',
  btn: 'Agregar',
  alertas: true,
  modelo: 'TipoDiscapacidad',
  campos: [{
        claseGrid: 'col-4',
        etiqueta: 'select',
        nombre: 'TipoDiscapacidad',
        label: 'Tipo de discapacidad:*:',
        requerido: true,
        relacion: true,
        valor: { Id: 0 },
        opciones: [
            { Id: 0, valor: 'Seleccione el tipo de discapacidad ...' },
        ],
    },
    {
      claseGrid: 'col-8',
      etiqueta: 'chips',
      nombre: 'Discapacidades',
      label: 'Discapacidades:',
      opciones: [],
    }
  ],
}

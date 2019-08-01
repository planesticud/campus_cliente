export let FORM_IDIOMAS = {
  // titulo: 'Idiomas',
  tipo_formulario: 'mini',
  alertas: true,
  btn: 'Guardar',
  modelo: 'InfoIdioma',
  campos: [
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
      nombre: 'Idioma',
      label_i18n: 'idioma',
      placeholder_i18n: 'idioma',
      requerido: true,
      tipo: 'text',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'checkbox',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Nativo',
      label_i18n: 'idioma_nativo_pregunta',
      placeholder_i18n: 'nativo',
      requerido: true,
      tipo: 'checkbox',
    },
    {
      etiqueta: 'checkbox',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'SeleccionExamen',
      label_i18n: 'idioma_examen_pregunta',
      placeholder_i18n: 'idioma_examen',
      requerido: true,
      tipo: 'checkbox',
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-3 col-md-6 col-sm-12 col-xs-12',
      nombre: 'NivelEscribe',
      label_i18n: 'nivel_escribe',
      placeholder_i18n: 'nivel_escribe',
      requerido: true,
      tipo: 'text',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-3 col-md-6 col-sm-12 col-xs-12',
      nombre: 'NivelEscucha',
      label_i18n: 'nivel_escucha',
      placeholder_i18n: 'nivel_escucha',
      requerido: true,
      tipo: 'text',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-3 col-md-6 col-sm-12 col-xs-12',
      nombre: 'NivelHabla',
      label_i18n: 'nivel_habla',
      placeholder_i18n: 'nivel_habla',
      requerido: true,
      tipo: 'text',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-3 col-md-6 col-sm-12 col-xs-12',
      nombre: 'NivelLee',
      label_i18n: 'nivel_lee',
      placeholder_i18n: 'nivel_lee',
      requerido: true,
      tipo: 'text',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-3 col-md-6 col-sm-12 col-xs-12',
      nombre: 'ClasificacionNivelIdioma',
      label_i18n: 'clasificacion_nivel_idioma',
      placeholder_i18n: 'clasificacion_nivel_idioma',
      requerido: true,
      tipo: 'text',
      key: 'Nombre',
      opciones: [],
    },
  ],
}


export let FORM_INFO_CARACTERISTICA = {
    // titulo: 'InfoCaracteristica',
    tipo_formulario: 'mini',
    btn: 'Guardar',
    alertas: true,
    modelo: 'InfoCaracteristica',
    campos: [
    {
        etiqueta: 'select',
        claseGrid: 'col-lg-3 col-md-6 col-sm-12 col-xs-12',
        nombre: 'GrupoSanguineo',
        label_i18n: 'grupo_sanguineo',
        placeholder_i18n: 'grupo_sanguineo',
        requerido: true,
        tipo: 'text',
        key: 'valor',
        opciones: [
            { Id: 1, valor: 'A' },
            { Id: 2, valor: 'AB' },
            { Id: 3, valor: 'B' },
            { Id: 4, valor: 'O' },
        ],
    },
    {
        etiqueta: 'select',
        claseGrid: 'col-lg-3 col-md-6 col-sm-12 col-xs-12',
        nombre: 'Rh',
        label_i18n: 'rh',
        placeholder_i18n: 'rh',
        requerido: true,
        tipo: 'text',
        key: 'valor',
        opciones: [
            { Id: 1, valor: '-' },
            { Id: 2, valor: '+' },
        ],
    },
    {
        etiqueta: 'select',
        claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
        nombre: 'GrupoEtnico',
        label_i18n: 'grupo_etnico',
        placeholder_i18n: 'grupo_etnico',
        requerido: true,
        tipo: 'GrupoEtnico',
        key: 'Nombre',
        opciones: [],
    },
    {
        etiqueta: 'selectmultiple',
        claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
        nombre: 'TipoDiscapacidad',
        label_i18n: 'tipo_discapacidad',
        placeholder_i18n: 'tipo_discapacidad',
        requerido: true,
        tipo: 'TipoDiscapacidad',
        key: 'Nombre',
        opciones: [],
    },
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'PaisNacimiento',
      label_i18n: 'pais_nacimiento',
      placeholder_i18n: 'pais_nacimiento',
      requerido: true,
      tipo: 'Lugar',
      key: 'Nombre',
      opciones: [],
      entrelazado: true,
    },
    {
        etiqueta: 'select',
        claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
        nombre: 'DepartamentoNacimiento',
        label_i18n: 'departamento_nacimiento',
        placeholder_i18n: 'departamento_nacimiento',
        requerido: true,
        tipo: 'Lugar',
        key: 'Nombre',
        opciones: [],
        entrelazado: true,
    },
    {
        etiqueta: 'select',
        claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
        nombre: 'CiudadNacimiento',
        label_i18n: 'ciudad_nacimiento',
        placeholder_i18n: 'ciudad_nacimiento',
        requerido: true,
        tipo: 'Lugar',
        key: 'Nombre',
        opciones: [],
    },
    ],
}

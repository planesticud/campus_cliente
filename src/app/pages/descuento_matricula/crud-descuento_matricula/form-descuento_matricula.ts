
export let FORM_DESCUENTO_MATRICULA = {
    titulo: 'DescuentoMatricula',
    tipo_formulario: 'mini',
    btn: 'Guardar',
    alertas: true,
    modelo: 'DescuentoMatricula',
    campos: [
    // {
    //     etiqueta: 'input',
    //     claseGrid: 'col-6',
    //     nombre: 'Id',
    //     label_i18n: 'id',
    //     placeholder_i18n: 'id',
    //     requerido: true,
    //     tipo: 'number',
    // },
    // {
    //     etiqueta: 'input',
    //     claseGrid: 'col-6',
    //     nombre: 'Metadatos',
    //     label_i18n: 'metadatos',
    //     placeholder_i18n: 'metadatos',
    //     requerido: true,
    //     tipo: 'text',
    // },
    // {
    //     etiqueta: 'input',
    //     claseGrid: 'col-6',
    //     nombre: 'Enlace',
    //     label_i18n: 'enlace',
    //     placeholder_i18n: 'enlace',
    //     requerido: true,
    //     tipo: 'text',
    // },
    // {
    //     etiqueta: 'input',
    //     claseGrid: 'col-6',
    //     nombre: 'Descuento',
    //     label_i18n: 'descuento',
    //     placeholder_i18n: 'descuento',
    //     requerido: true,
    //     tipo: 'number',
    // },
    // {
    //     etiqueta: 'input',
    //     claseGrid: 'col-6',
    //     nombre: 'Ente',
    //     label_i18n: 'ente',
    //     placeholder_i18n: 'ente',
    //     requerido: true,
    //     tipo: 'number',
    // },
    {
        etiqueta: 'select',
        claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
        nombre: 'TipoDescuentoMatricula',
        label_i18n: 'tipodescuentomatricula',
        placeholder_i18n: 'tipodescuentomatricula',
        requerido: true,
        tipo: 'TipoDescuentoMatricula',
        key: 'Nombre',
        opciones: [],
    },
    {
        etiqueta: 'file',
        claseGrid: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
        clase: 'form-control',
        nombre: 'Soporte',
        label_i18n: 'enlace',
        placeholder_i18n: 'enlace',
        requerido: false,
        tipo: 'pdf',
        tipoDocumento: 2,
        formatos: 'pdf',
        url: '',
        tamanoMaximo: 2,
    },
    ],
}
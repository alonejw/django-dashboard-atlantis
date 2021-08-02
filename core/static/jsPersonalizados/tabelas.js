$.fn.dataTable.render.moment = function (from, to, locale) {
    if (arguments.length === 1) {
        locale = 'en';
        to = from;
        from = 'YYYY-MM-DD';
    } else if (arguments.length === 2) {
        locale = 'en';
    }
    return function (d, type, row) {
        if (!d) {
            return type === 'sort' || type === 'type' ? 0 : d;
        }
        var m = window.moment(d, from, locale, true);
        return m.format(type === 'sort' || type === 'type' ? 'x' : to);
    };
};

$(document).ready(function (e) {
    //mostraCarregando();
    $('#familias').DataTable({
        'responsive': true,
        'serverSide': true,
        'ajax': {
            url: "api/v1/familias/?format=datatables",
            type: "GET",
            complete: function (data) {
                //ocultaCarregando()
            },
        },
        'columns': [
            {"data": "id"},
            {"data": "cpf"},
            {"data": "nome"},
            {"data": "dataNascimento", render: $.fn.dataTable.render.moment('D/M/YYYY')},
            {"data": "telefone"},
            {"data": "sexo"},
            {"data": "tecnico_nome", "name": "tecnico.username"},
            {
                data: null,
                render: function (data, type, row) {
                    var id = row.id;
                    return '<div style="text-align: center"><button onclick="pegaFonte(' + id + ')" class="btn btn-success btn-sm">Editar</button> <button onclick="confirmacao(' + id + ')" class="btn btn-danger btn-sm">Apagar</button>' +
                        ' <button onclick="listaMembros(' + id + ')" class="btn btn-info btn-sm">Membros</button></div>';
                }
            }
        ],
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            },
        ],
        "order": [[0, "ASC"]],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
        },
    });
});

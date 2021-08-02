function mudaEstado() {
    //mostraCarregando();
    let uf = $('#uf').select2('data')[0].id;

    let municipio = $('#municipio');
    municipio.html('');
    //alert(uf);

    $.ajax({
        type: "GET",
        url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + uf + "/municipios",
        dataType: "json",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                municipio.append('<option value="' + data[i].nome + '">' + data[i].nome + '</option>');
            }
            //ocultaCarregando();
        },
        error: function (data) {
            console.log("erro");
            console.log(data);
            //ocultaCarregando();
        }
    });
}

function mudaEstadoAltera() {
    //mostraCarregando();
    let uf = $('#ufAltera').select2('data')[0].id;

    let municipio = $('#municipioAltera');
    municipio.html('');
    //alert(uf);

    $.ajax({
        type: "GET",
        url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + uf + "/municipios",
        dataType: "json",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                municipio.append('<option value="' + data[i].nome + '">' + data[i].nome + '</option>');
            }
            //ocultaCarregando();
        },
        error: function (data) {
            console.log("erro");
            console.log(data);
            //ocultaCarregando();
        }
    });
}
$(document).ready(function () {
    $('#sexo').select2({
      placeholder: "Selecione o sexo",
    });
    $('#grupoSocial').select2({
      placeholder: "Selecione o grupo social",
    });
    $('#escolaridade').select2({
      placeholder: "Selecione a escolaridade",
    });
    $('#uf').select2({
      placeholder: "Selecione o UF",
    });
    $('#municipio').select2({
      placeholder: "Selecione o município",
    });
    $('#areaPropria').select2({
      placeholder: "Selecione o tipo de área do imóvel",
    });
    $('#zonaMoradia').select2({
      placeholder: "Selecione a zona de moradia",
    });
    $('#renda').select2({
      placeholder: "Selecione a renda",
    });


    $("#sexoAltera").select2({
      placeholder: "Selecione o gênero",
    });
    $("#grupoSocialAltera").select2({
      placeholder: "Selecione o grupo social",
    });
    $("#escolaridadeAltera").select2({
      placeholder: "Selecione a escolaridade",
    });
    $("#areaPropriaAltera").select2({
      placeholder: "Selecione o tipo da área própria",
    });
    $("#formaAcessoAguaAltera").select2({
      placeholder: "Selecione a forma de acesso à água",
    });

    $("#zonaMoradiaAltera").select2({
      placeholder: "Selecione a Zona de moradia",
    });
    $("#atividadeAltera").select2({
      placeholder: "Selecione a atividade",
    });
    $("#rendaAltera").select2({
      placeholder: "Selecione a renda",
    });
    $("#ufAltera").select2({
      placeholder: "Selecione o UF",
    });
    $("#municipioAltera").select2({
      placeholder: "Selecione o Município",
    });
});

function abrirModalCadastro() {
    $('#modalCadastra').modal('show');

}
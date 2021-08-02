$('#cpf').mask('000.000.000-00', {reverse: true});
$('#telefone').mask("(00) 0000-00009");
$('#telefoneAltera').mask("(00) 0000-00009");

var latitude;
var longitude;

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

function cpf(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
            soma += parseInt(e) * ((j + 2) - (i + 1));
        });
        r = soma % 11;
        r = (r < 2) ? 0 : 11 - r;
        if (r != cpf.substring(j, j + 1)) result = false;
    });
    return result;
}

var url = "api/v1/familias/";
$("#formCadastra").submit(function (e) {
    //mostraCarregandoMembroTodos("#modalCarregandoMembroCadastroFamilia");
    e.preventDefault();
    var form = $(this);


    //Inicio Acesso a agua
    let rioAgua = $('#rioChecked');
    var aguaRio;
    let acudeAgua = $('#acudeChecked');
    var aguaAcude;
    let pocoAgua = $('#pocoChecked');
    var aguaPoco;
    let cisternaAgua = $('#cisternaChecked');
    var aguaCisterna;
    let outrasFormasAgua = $('#outrasFormasChecked');
    var aguaOutrasFormas;

    if (rioAgua.is(":checked")) {
        aguaRio = 1;
    } else {
        aguaRio = 0;
    }
    if (acudeAgua.is(":checked")) {
        aguaAcude = 1;
    } else {
        aguaAcude = 0;
    }
    if (pocoAgua.is(":checked")) {
        aguaPoco = 1;
    } else {
        aguaPoco = 0;
    }
    if (cisternaAgua.is(":checked")) {
        aguaCisterna = 1;
    } else {
        aguaCisterna = 0;
    }
    if (outrasFormasAgua.is(":checked")) {
        aguaOutrasFormas = 1;
    } else {
        aguaOutrasFormas = 0;
    }
    //Fim Acesso a agua

    //Inicio Atividade
    let atividadeAgricultura = $('#agriculturaChecked');
    var agriculturaAtividade;
    let atividadPecuaria = $('#pecuariaChecked');
    var pecuariaAtividade;
    let atividadeOutros = $('#outrosAtividadesChecked');
    var outrosAtividade;

    if (atividadeAgricultura.is(":checked")) {
        agriculturaAtividade = 1;
    } else {
        agriculturaAtividade = 0;
    }

    if (atividadPecuaria.is(":checked")) {
        pecuariaAtividade = 1;
    } else {
        pecuariaAtividade = 0;
    }

    if (atividadeOutros.is(":checked")) {
        outrosAtividade = 1;
    } else {
        outrosAtividade = 0;
    }
    //Fim Atividade

    //Inicio Comercio
    let comercioLocal = $('#comercioLocal');
    var comercioLocalComercializacao;
    let cooperativa = $('#cooperativa');
    var cooperativaComercializacao;
    let feiras = $('#feiras');
    var feirasComercializacao;
    let diretaConsumidores = $('#diretaConsumidores');
    var diretaConsumidoresComercializacao;

    if (comercioLocal.is(":checked")) {
        comercioLocalComercializacao = 1;
    } else {
        comercioLocalComercializacao = 0;
    }

    if (cooperativa.is(":checked")) {
        cooperativaComercializacao = 1;
    } else {
        cooperativaComercializacao = 0;
    }

    if (feiras.is(":checked")) {
        feirasComercializacao = 1;
    } else {
        feirasComercializacao = 0;
    }

    if (diretaConsumidores.is(":checked")) {
        diretaConsumidoresComercializacao = 1;
    } else {
        diretaConsumidoresComercializacao = 0;
    }
    //Fim Comercio

    familia = {
        'cpf': $('input[name=cpf]').val(),
        'nome': $('input[name=nome]').val(),
        'dataNascimento': $('input[name=dataNascimento]').val(),
        'telefone': $('input[name=telefone]').val(),
        'sexo': $('#sexo').select2('data')[0].id,
        'grupoSocial': $('#grupoSocial').select2('data')[0].id,
        'escolaridade': $('#escolaridade').select2('data')[0].id,
        'uf': $('#uf').select2('data')[0].id,
        'municipio': $('#municipio').select2('data')[0].id,
        'areaImovel': $('input[name=areaTotalImovel]').val(),
        'areaPropria': $('#areaPropria').select2('data')[0].id,
        'zonaMoradia': $('#zonaMoradia').select2('data')[0].id,
        'formaAcessoAguaRio': aguaRio,
        'formaAcessoAguaAcude': aguaAcude,
        'formaAcessoAguaPoco': aguaPoco,
        'formaAcessoAguaCisterna': aguaCisterna,
        'formaAcessoAguaOutrasFormas': aguaOutrasFormas,
        'atividadeProdutivaAgricultura': agriculturaAtividade,
        'atividadeProdutivaPecuaria': pecuariaAtividade,
        'atividadeProdutivaOutros': outrosAtividade,
        'principaisProdutos': $.trim($("#produto").val()),
        'comercializacaoProducaoComercioLocal': comercioLocalComercializacao,
        'comercializacaoProducaoCooperativa': cooperativaComercializacao,
        'comercializacaoProducaoFeira': feirasComercializacao,
        'comercializacaoProducaoDiretaConsumidor': diretaConsumidoresComercializacao,
        'estimativaRendaAnual': $('#renda').select2('data')[0].id,
        'tecnico': $('input[name=tecnico]').val(),
        'latitude': latitude,
        'longitude': longitude,
    }

    $('#csrfmiddlewaretoken').val('');
    var $crf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;

    if (cpf($('input[name=cpf]').val()) == true) {
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            headers: {"X-CSRFToken": $crf_token},
            data: familia,
            success: function (data) {

                $('#familias').DataTable().ajax.reload(
                    //ocultaCarregando()
                );
                notificacao('success', data.nome + ' Adicionado com sucesso!');
                //mostraMembroCadastra(data);
            },
            error: function (data) {
                //ocultaCarregando();
                console.log(data);
                //$('.modal-cadastra-familia').modal('hide');
                if (data.responseText == "{\"cpf\":[\"Familia com este cpf já existe.\"]}") {
                    notificacao('danger', 'Responsável da família com este cpf já está cadastrado!');
                }
            }
        });
    } else {
        //ocultaCarregando();
        $('.modal-cadastra-familia').modal('hide');
        notificacao('danger', 'CPF inválido!');
    }

});

//Altera Fanília
function pegaFonte(id) {
    //mostraCarregando();
    $.ajax({
        type: "GET",
        url: url + id + "/",
        dataType: "json",
        success: function (data) {
            $('#cpfAltera').val(data.cpf)
            $('#nomeAltera').val(data.nome);
            $('#dataNascimentoAltera').val(data.dataNascimento);

            $('#sexoAltera').val(data.sexo);
            $('#sexoAltera').select2().trigger('change');

            $('#grupoSocialAltera').val(data.grupoSocial);
            $('#grupoSocialAltera').select2().trigger('change');

            $('#escolaridadeAltera').val(data.escolaridade);
            $('#escolaridadeAltera').select2().trigger('change');

            $('#areaPropriaAltera').val(data.areaPropria);
            $('#areaPropriaAltera').select2().trigger('change');

            $('#zonaMoradiaAltera').val(data.zonaMoradia);
            $('#zonaMoradiaAltera').select2().trigger('change');

            $('#formaAcessoAguaAltera').val(data.formaAcessoAgua);
            $('#formaAcessoAguaAltera').select2().trigger('change');

            $('#rendaAltera').val(data.estimativaRendaAnual);
            $('#rendaAltera').select2().trigger('change');

            $('#ufAltera').val(data.uf);
            $('#ufAltera').select2().trigger('change');

            let municipioA = $('#municipioAltera');
            municipioA.append('<option value="' + data.municipio + '" selected>' + data.municipio + '</option>')
            $('#municipioAltera').val(data.municipio);
            $('#municipioAltera').select2().trigger('change');

            $('#areaTotalImovelAltera').val(data.areaImovel);
            $("#produtoAltera").val(data.principaisProdutos);


            if (data.atividadeProdutivaAgricultura == true) {
                $("#agriculturaCheckedAltera").prop("checked", true);
            } else {
                $("#agriculturaCheckedAltera").prop("checked", false);
            }

            if (data.atividadeProdutivaPecuaria == true) {
                $("#pecuariaCheckedAltera").prop("checked", true);
            } else {
                $("#pecuariaCheckedAltera").prop("checked", false);
            }

            if (data.atividadeProdutivaOutros == true) {
                $("#outrosAtividadesCheckedAltera").prop("checked", true);
            } else {
                $("#outrosAtividadesCheckedAltera").prop("checked", false);
            }

            if (data.comercializacaoProducaoComercioLocal == true) {
                $("#comercioLocalAltera").prop("checked", true);
            } else {
                $("#comercioLocalAltera").prop("checked", false);
            }

            if (data.comercializacaoProducaoCooperativa == true) {
                $("#cooperativaAltera").prop("checked", true);
            } else {
                $("#cooperativaAltera").prop("checked", false);
            }

            if (data.comercializacaoProducaoFeira == true) {
                $("#feirasAltera").prop("checked", true);
            } else {
                $("#feirasAltera").prop("checked", false);
            }

            if (data.comercializacaoProducaoDiretaConsumidor == true) {
                $("#diretaConsumidoresAltera").prop("checked", true);
            } else {
                $("#diretaConsumidoresAltera").prop("checked", false);
            }


            if (data.formaAcessoAguaRio == true) {
                $("#rioCheckedAltera").prop("checked", true);
            } else {
                $("#rioCheckedAltera").prop("checked", false);
            }

            if (data.formaAcessoAguaAcude == true) {
                $("#acudeCheckedAltera").prop("checked", true);
            } else {
                $("#acudeCheckedAltera").prop("checked", false);
            }

            if (data.formaAcessoAguaPoco == true) {
                $("#pocoCheckedAltera").prop("checked", true);
            } else {
                $("#pocoCheckedAltera").prop("checked", false);
            }

            if (data.formaAcessoAguaCisterna == true) {
                $("#cisternaCheckedAltera").prop("checked", true);
            } else {
                $("#cisternaCheckedAltera").prop("checked", false);
            }

            if (data.formaAcessoAguaOutrasFormas == true) {
                $("#outrasFormasCheckedAltera").prop("checked", true);
            } else {
                $("#outrasFormasCheckedAltera").prop("checked", false);
            }


            $('#telefoneAltera').val(data.telefone);
            $('#tecnicoAlterando').val(data.tecnico);
            $('#latitudeAltera').val(data.latitude);
            $('#longitudeAltera').val(data.longitude);
            $('#idAltera').val(data.id);


            $('#familiaMembro').val(data.id);

            //criaTabelaMembros(data);


            //ocultaCarregando();
            $('.modal-altera-familia').modal('show');

        },
        error: function (data) {
            //ocultaCarregando();
            console.log("erro");
            console.log(data);
        }
    });
}

$("#formAltera").submit(function (e) {
    $('.modal-altera-familia').modal('hide');
    mostraCarregando()
    e.preventDefault();
    var url = "api/v1/familias/";

    //Inicio Atividade
    let atividadeAgricultura = $('#agriculturaCheckedAltera');
    var agriculturaAtividade;
    let atividadPecuaria = $('#pecuariaCheckedAltera');
    var pecuariaAtividade;
    let atividadeOutros = $('#outrosAtividadesCheckedAltera');
    var outrosAtividade;

    if (atividadeAgricultura.is(":checked")) {
        agriculturaAtividade = 1;
    } else {
        agriculturaAtividade = 0;
    }

    if (atividadPecuaria.is(":checked")) {
        pecuariaAtividade = 1;
    } else {
        pecuariaAtividade = 0;
    }

    if (atividadeOutros.is(":checked")) {
        outrosAtividade = 1;
    } else {
        outrosAtividade = 0;
    }
    //Fim Atividade

    //Inicio Comercio
    let comercioLocal = $('#comercioLocalAltera');
    var comercioLocalComercializacao;
    let cooperativa = $('#cooperativaAltera');
    var cooperativaComercializacao;
    let feiras = $('#feirasAltera');
    var feirasComercializacao;
    let diretaConsumidores = $('#diretaConsumidoresAltera');
    var diretaConsumidoresComercializacao;

    if (comercioLocal.is(":checked")) {
        comercioLocalComercializacao = 1;
    } else {
        comercioLocalComercializacao = 0;
    }

    if (cooperativa.is(":checked")) {
        cooperativaComercializacao = 1;
    } else {
        cooperativaComercializacao = 0;
    }

    if (feiras.is(":checked")) {
        feirasComercializacao = 1;
    } else {
        feirasComercializacao = 0;
    }

    if (diretaConsumidores.is(":checked")) {
        diretaConsumidoresComercializacao = 1;
    } else {
        diretaConsumidoresComercializacao = 0;
    }
    //Fim Comercio

    //Inicio Acesso a agua
    let rioAgua = $('#rioCheckedAltera');
    var aguaRio;
    let acudeAgua = $('#acudeCheckedAltera');
    var aguaAcude;
    let pocoAgua = $('#pocoCheckedAltera');
    var aguaPoco;
    let cisternaAgua = $('#cisternaCheckedAltera');
    var aguaCisterna;
    let outrasFormasAgua = $('#outrasFormasCheckedAltera');
    var aguaOutrasFormas;

    if (rioAgua.is(":checked")) {
        aguaRio = 1;
    } else {
        aguaRio = 0;
    }
    if (acudeAgua.is(":checked")) {
        aguaAcude = 1;
    } else {
        aguaAcude = 0;
    }
    if (pocoAgua.is(":checked")) {
        aguaPoco = 1;
    } else {
        aguaPoco = 0;
    }
    if (cisternaAgua.is(":checked")) {
        aguaCisterna = 1;
    } else {
        aguaCisterna = 0;
    }
    if (outrasFormasAgua.is(":checked")) {
        aguaOutrasFormas = 1;
    } else {
        aguaOutrasFormas = 0;
    }
    //Fim Acesso a agua


    if ($('input[name=tecnicoAltera]').val() == $('input[name=tecnicoAlterando]').val()) {
        familia = {
            'cpf': $('input[name=cpfAltera]').val(),
            'nome': $('input[name=nomeAltera]').val(),
            'dataNascimento': $('input[name=dataNascimentoAltera]').val(),
            'telefone': $('input[name=telefoneAltera]').val(),
            'sexo': $('#sexoAltera').select2('data')[0].id,
            'grupoSocial': $('#grupoSocialAltera').select2('data')[0].id,
            'escolaridade': $('#escolaridadeAltera').select2('data')[0].id,
            'uf': $('#ufAltera').select2('data')[0].id,
            'municipio': $('#municipioAltera').select2('data')[0].id,
            'areaImovel': $('input[name=areaTotalImovelAltera]').val(),
            'areaPropria': $('#areaPropriaAltera').select2('data')[0].id,
            'zonaMoradia': $('#zonaMoradiaAltera').select2('data')[0].id,
            'formaAcessoAguaRio': aguaRio,
            'formaAcessoAguaAcude': aguaAcude,
            'formaAcessoAguaPoco': aguaPoco,
            'formaAcessoAguaCisterna': aguaCisterna,
            'formaAcessoAguaOutrasFormas': aguaOutrasFormas,
            'atividadeProdutivaAgricultura': agriculturaAtividade,
            'atividadeProdutivaPecuaria': pecuariaAtividade,
            'atividadeProdutivaOutros': outrosAtividade,
            'principaisProdutos': $.trim($("#produtoAltera").val()),
            'comercializacaoProducaoComercioLocal': comercioLocalComercializacao,
            'comercializacaoProducaoCooperativa': cooperativaComercializacao,
            'comercializacaoProducaoFeira': feirasComercializacao,
            'comercializacaoProducaoDiretaConsumidor': diretaConsumidoresComercializacao,
            'estimativaRendaAnual': $('#rendaAltera').select2('data')[0].id,
            'tecnico': $('input[name=tecnico]').val(),
            'latitude': latitude,
            'longitude': longitude,
        }
        id = $('input[name=idAltera]').val();
        $.ajax({
            type: "PATCH",
            url: url + id + '/',
            dataType: "json",
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", '{{ csrf_token }}');
            },
            data: familia,
            success: function (data) {
                console.log('Sucesso');
                $('#tabelaFamilia').DataTable().ajax.reload();
                ocultaCarregando();
                alerta("alert alert-primary", data.nome, "Alterada com sucesso!");
            },
            error: function (data) {
                ocultaCarregando();
                alertaErro("Erro ao alterar");
            }
        });
    } else {
        ocultaCarregando();
        $('.modal-altera-familia').modal('hide');
        alertaErro("Só é possível fazer a alteração nesta família o técnico que registrou a família no sistema");
    }
});

//Apaga Familia
function confirmacao(id) {
    var resposta = confirm("Deseja remover este registro?");
    if (resposta == true) {
        apagaFonte(id);
    }
}


function apagaFonte(id) {
    //mostraCarregando();
    var nomeApaga;
    var idTecnicoApaga;

    $('#csrfmiddlewaretoken').val('');
    var $crf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;

    $.ajax({
        type: "GET",
        url: "api/v1/familias/" + id + "/",
        dataType: "json",
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", '{{ csrf_token }}');
        },
        success: function (data) {
            nomeApaga = data.nome;
            //mostraCarregando();
            if ($('input[name=tecnico]').val() == data.tecnico) {
                $.ajax({
                    type: "DELETE",
                    url: "api/v1/familias/" + id + "/",
                    headers: {"X-CSRFToken": $crf_token},
                    success: function (data) {
                        $('#familias').DataTable().ajax.reload();
                        notificacao('success', nomeApaga + ' Apagado com sucesso!');
                    },
                    error: function (data) {
                        //alertaErro("Erro ao apagar");
                        notificacao('danger', nomeApaga + ' Erro ao apagar!');
                    }
                });
            } else {
                //ocultaCarregando();
                notificacao('warning', 'Só é possível apagar esta família o técnico que registrou a família no sistema');
            }
        },
        error: function (data) {
            console.log("erro");
            console.log(data);
        }
    });
}

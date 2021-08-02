function notificacao(tipo, mensagem) {
    $.notify({
        icon: 'flaticon-alarm-1',
        title: 'Cadastro Família',
        message: mensagem,
    }, {
        type: tipo,
        placement: {
            from: "top",
            align: "right"
        },
        time: 1000,
        z_index: 2000,
    });
}

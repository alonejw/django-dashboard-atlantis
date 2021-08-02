from rest_framework import serializers
from .models import Membro, Familia


class MembroSerializer(serializers.ModelSerializer):
    responsavel_nome = serializers.CharField(source='responsavel', read_only=True, )

    class Meta:
        model = Membro
        fields = (
            'id',
            'cpf',
            'nome',
            'dataNascimento',
            'grauParentesco',
            'responsavel',
            'responsavel_nome'
        )

        datatables_always_serialize = (
        'id', 'cpf', 'nome', 'dataNascimento', 'grauParentesco', 'responsavel', 'responsavel_nome')


class FamiliaSerializer(serializers.ModelSerializer):
    membros = MembroSerializer(many=True, read_only=True)
    tecnico_nome = serializers.CharField(source='tecnico', read_only=True)

    class Meta:
        model = Familia
        fields = (
            'id',
            'cpf',
            'nome',
            'dataNascimento',
            'telefone',
            'latitude',
            'longitude',
            'tecnico',
            'tecnico_nome',
            'sexo',
            'grupoSocial',
            'escolaridade',
            'uf',
            'municipio',
            'areaImovel',
            'areaPropria',
            'zonaMoradia',
            'formaAcessoAguaRio',
            'formaAcessoAguaAcude',
            'formaAcessoAguaPoco',
            'formaAcessoAguaCisterna',
            'formaAcessoAguaOutrasFormas',
            'atividadeProdutivaAgricultura',
            'atividadeProdutivaPecuaria',
            'atividadeProdutivaOutros',
            'principaisProdutos',
            'comercializacaoProducaoComercioLocal',
            'comercializacaoProducaoCooperativa',
            'comercializacaoProducaoFeira',
            'comercializacaoProducaoDiretaConsumidor',
            'estimativaRendaAnual',
            'membros',
        )
# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    cpf = models.TextField(blank=True)
    telefone = models.TextField(blank=True)
    acesso = models.BooleanField(default=False)
    financeiro = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'


class Familia(models.Model):
    cpf = models.TextField(unique=True)
    nome = models.TextField()
    # email = models.EmailField()
    dataNascimento = models.DateField()
    sexo = models.CharField(max_length=12, null=True, blank=True)
    telefone = models.TextField()
    latitude = models.TextField(null=True, blank=True)
    longitude = models.TextField(null=True, blank=True)
    grupoSocial = models.CharField(max_length=50, null=True, blank=True)
    escolaridade = models.CharField(max_length=50, null=True, blank=True)
    uf = models.CharField(max_length=50, null=True, blank=True)
    municipio = models.CharField(max_length=50, null=True, blank=True)
    areaImovel = models.DecimalField(max_digits=15, decimal_places=3, null=True, blank=True)
    areaPropria = models.CharField(max_length=4, null=True, blank=True)
    zonaMoradia = models.CharField(max_length=50, null=True, blank=True)
    formaAcessoAguaRio = models.BooleanField(default=False)
    formaAcessoAguaAcude = models.BooleanField(default=False)
    formaAcessoAguaPoco = models.BooleanField(default=False)
    formaAcessoAguaCisterna = models.BooleanField(default=False)
    formaAcessoAguaOutrasFormas = models.BooleanField(default=False)
    atividadeProdutivaAgricultura = models.BooleanField(default=False)
    atividadeProdutivaPecuaria = models.BooleanField(default=False)
    atividadeProdutivaOutros = models.BooleanField(default=False)
    principaisProdutos = models.TextField(null=True, blank=True)
    comercializacaoProducaoComercioLocal = models.BooleanField(default=False)
    comercializacaoProducaoCooperativa = models.BooleanField(default=False)
    comercializacaoProducaoFeira = models.BooleanField(default=False)
    comercializacaoProducaoDiretaConsumidor = models.BooleanField(default=False)
    estimativaRendaAnual = models.CharField(max_length=50, null=True, blank=True)
    tecnico = models.ForeignKey(User, related_name='User', on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = 'Familia'
        verbose_name_plural = 'Familias'
        ordering = ["id"]

    def __str__(self):
        return self.nome

class Membro(models.Model):
    cpf = models.CharField(max_length=50, null=True, blank=True)
    nome = models.CharField(max_length=50, null=False, blank=False)
    grauParentesco = models.CharField(max_length=50, null=False, blank=False)
    dataNascimento = models.DateField()
    responsavel = models.ForeignKey(Familia, related_name='membros', on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = 'Membro'
        verbose_name_plural = 'Membros'
        ordering = ["id"]

    def __str__(self):
        return self.nome
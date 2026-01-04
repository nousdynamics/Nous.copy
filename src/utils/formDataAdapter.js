// Adaptador para converter dados do novo schema para o formato esperado pelo copyGenerator
// e vice-versa

export function adaptFormDataToLegacy(formData) {
  // Mapear campos do novo schema para campos legados
  return {
    nomeProfissional: formData.profissional_nome || '',
    anosExperiencia: formData.tempo_experiencia || '',
    resultadosComprovados: formData.resultado_principal || '',
    diferencialCompetitivo: formData.diferencial || '',
    publicoAlvo: formData.publico_descricao || '',
    nivelConsciencia: mapNivelConsciencia(formData.nivel_consciencia),
    pecadoCapital: mapGatilhoPrincipal(formData.gatilho_principal),
    metodologia: formData.metodologia_base || '',
    plataforma: mapCanalPrincipal(formData.canal_principal),
    duracao: formData.vsl_duracao_minutos ? (parseInt(formData.vsl_duracao_minutos) * 60).toString() : '30',
    densidade: formData.estilo_linguagem === 'simples_direto' ? 'informativo' : 'minimalista',
    urlFinal: formData.cta_principal === 'clicar_link' ? '' : '',
    modeloIA: 'gpt-4-turbo-preview',
    ...formData // Incluir campos extras
  };
}

export function adaptLegacyToFormData(legacyData) {
  // Mapear campos legados para o novo schema
  return {
    profissional_nome: legacyData.nomeProfissional || '',
    tempo_experiencia: legacyData.anosExperiencia || '',
    resultado_principal: legacyData.resultadosComprovados || '',
    diferencial: legacyData.diferencialCompetitivo || '',
    publico_descricao: legacyData.publicoAlvo || '',
    nivel_consciencia: unmapNivelConsciencia(legacyData.nivelConsciencia),
    gatilho_principal: unmapGatilhoPrincipal(legacyData.pecadoCapital),
    metodologia_base: legacyData.metodologia || '',
    canal_principal: unmapCanalPrincipal(legacyData.plataforma),
    ...legacyData // Incluir outros campos
  };
}

function mapNivelConsciencia(novo) {
  const mapping = {
    'nao_sabe_problema': 'inconsciente',
    'sabe_problema': 'consciente-problema',
    'sabe_solucao': 'consciente-solucao',
    'sabe_produto': 'consciente-produto',
    'pronto_comprar': 'totalmente-consciente'
  };
  return mapping[novo] || novo;
}

function unmapNivelConsciencia(legado) {
  const mapping = {
    'inconsciente': 'nao_sabe_problema',
    'consciente-problema': 'sabe_problema',
    'consciente-solucao': 'sabe_solucao',
    'consciente-produto': 'sabe_produto',
    'totalmente-consciente': 'pronto_comprar'
  };
  return mapping[legado] || legado;
}

function mapGatilhoPrincipal(novo) {
  const mapping = {
    'prova_social': 'soberba',
    'autoridade': 'soberba',
    'escassez': 'inveja',
    'urgencia': 'avareza',
    'curiosidade': 'gula',
    'reciprocidade': 'luxuria',
    'novidade': 'gula'
  };
  return mapping[novo] || 'gula';
}

function unmapGatilhoPrincipal(legado) {
  // Mapeamento reverso aproximado
  const mapping = {
    'gula': 'curiosidade',
    'avareza': 'urgencia',
    'luxuria': 'reciprocidade',
    'inveja': 'escassez',
    'ira': 'urgencia',
    'preguica': 'curiosidade',
    'soberba': 'autoridade'
  };
  return mapping[legado] || 'curiosidade';
}

function mapCanalPrincipal(novo) {
  const mapping = {
    'vsl': 'meta-ads-video',
    'anuncio_meta_ads': 'meta-ads-imagem',
    'post_redes_sociais': 'instagram-reels',
    'sequencia_emails': 'meta-ads-video',
    'titulos_google_ads': 'google-ads-pesquisa'
  };
  return mapping[novo] || novo;
}

function unmapCanalPrincipal(legado) {
  const mapping = {
    'meta-ads-video': 'vsl',
    'meta-ads-imagem': 'anuncio_meta_ads',
    'instagram-reels': 'post_redes_sociais',
    'google-ads-pesquisa': 'titulos_google_ads'
  };
  return mapping[legado] || 'vsl';
}

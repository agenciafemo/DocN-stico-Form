// 20 PERGUNTAS - DIAGNÓSTICO DE ALTA PERFORMANCE MÉDICA

const QUIZ_QUESTIONS = [
  // PILAR 1: Marketing e Vendas
  { pilar: 'Marketing e Vendas', question: 'Qual é a real raiz do fluxo de novos pacientes que chegam ao seu consultório hoje?', options: [
    { text: 'Dependência de 80% a 100% de repasses de convênios ou indicações passivas de colegas; se eles pararem, a agenda zera.', score: 10 },
    { text: 'O "boca a boca" de pacientes antigos sustenta a agenda, mas é instável e não traz o volume ou perfil desejado.', score: 40 },
    { text: 'Invisto em tráfego pago, mas atraio muitos curiosos no WhatsApp que só pechinchaam preço.', score: 70 },
    { text: 'Tenho estratégia de captação digital previsível que atrai o paciente ideal com alta consciência e pronto para agendar.', score: 100 }
  ]},
  { pilar: 'Marketing e Vendas', question: 'Como sua equipe comercial/recepção lida com contatos que chegam pelo WhatsApp?', options: [
    { text: 'Sem padrão. Secretária responde quando dá tempo e conversa morre ao mencionar preço.', score: 10 },
    { text: 'Respondemos educadamente com textos longos, mas sem scripts ou técnicas de contorno de objeções.', score: 40 },
    { text: 'Conseguimos agendar 30% a 50%, mas processo exige insistência exaustiva da equipe.', score: 70 },
    { text: 'Funil profissional de alta conversão (70%+), com abordagem acolhedora que ancora valor antes de falar preço.', score: 100 }
  ]},
  { pilar: 'Marketing e Vendas', question: 'Qual é sua estratégia de diferenciação para não ser comparado com concorrentes?', options: [
    { text: 'Nenhuma clara. Disputo com base no preço ou aceitação do mesmo convênio.', score: 10 },
    { text: 'Aposto na minha titulação técnica para tentar provar que sou melhor.', score: 40 },
    { text: 'Faço conteúdo educativo nas redes, mas é genérico — parece com qualquer outro médico.', score: 70 },
    { text: 'Posicionamento único focado em metodologia própria de atendimento que torna concorrência irrelevante.', score: 100 }
  ]},
  { pilar: 'Marketing e Vendas', question: 'Como é mensurado seu Custo de Aquisição de Paciente (CAC) e retorno de marketing?', options: [
    { text: 'Não tenho ideia de quanto custa atrair um paciente ou se marketing digital dá retorno real.', score: 10 },
    { text: 'Sei valor mensal pago, mas não sei quantos pacientes vieram especificamente dali.', score: 40 },
    { text: 'Controlo novos pacientes/mês, mas não cruzo em dashboard para entender lucro real.', score: 70 },
    { text: 'Conheço CAC centavo por centavo, qual canal é mais lucrativo e ajusto investimento com base em ROI.', score: 100 }
  ]},
  { pilar: 'Marketing e Vendas', question: 'Qual é o comportamento da sua agenda de consultas particulares ao longo do ano?', options: [
    { text: 'Completamente imprevisível ou sazonal; meses de desespero e meses de sobrecarga.', score: 10 },
    { text: 'Sempre cheia, mas à custa de convênios que pagam valores defasados.', score: 40 },
    { text: 'Bom volume de particulares, mas preciso trabalhar muitas horas para manter preenchimento.', score: 70 },
    { text: 'Fila de espera com alta ocupação semanas de antecedência, exclusivamente pacientes alto valor.', score: 100 }
  ]},

  // PILAR 2: Experiência H2H
  { pilar: 'Experiência H2H', question: 'Como funciona a jornada com paciente ANTES dele ir à sua clínica?', options: [
    { text: 'Inexistente. Contato se resume ao agendamento automático e lembrete frio de horário.', score: 10 },
    { text: 'Localizamos consultório e lembrança padrão de jejum/preparo, sem acolhimento.', score: 40 },
    { text: 'Secretária tenta mandar mensagem simpática, mas sem materiais de apoio ou experiência diferenciada.', score: 70 },
    { text: 'Ecossistema de encantamento: materiais autorais, orientações personalizadas, paciente se sente acolhido.', score: 100 }
  ]},
  { pilar: 'Experiência H2H', question: 'Como são seus materiais institucionais digitais e físicos (receituários, lâminas, guias)?', options: [
    { text: 'Totalmente genéricos, papel comum ou PDFs mal diagramados no Canva.', score: 10 },
    { text: 'Funcionais e limpos, mas comuns — não transmitem exclusividade.', score: 40 },
    { text: 'Com logotipo e cores padrão, mas falham em explicar visualmente as fases do tratamento.', score: 70 },
    { text: 'Impecáveis e sofisticados. Cada material reforça o valor do atendimento como peça de branding.', score: 100 }
  ]},
  { pilar: 'Experiência H2H', question: 'Como é estruturada a condução da anamnese e entrega do plano terapêutico?', options: [
    { text: 'Foco técnico: ouço sintomas, preencho prontuário de costas e entrego receita.', score: 10 },
    { text: 'Sou atencioso, mas fechamento é informal e paciente sai confuso sobre próximos passos.', score: 40 },
    { text: 'Apresento detalhadamente, mas ao passar valor de procedimentos o ambiente fica desconfortável.', score: 70 },
    { text: 'Abordagem H2H humanizada onde plano é co-criado com paciente, gerando altíssima adesão.', score: 100 }
  ]},
  { pilar: 'Experiência H2H', question: 'O que acontece nas 48 horas após paciente sair da sua consulta?', options: [
    { text: 'Absolutamente nada. Contato cessa até ele decidir retornar.', score: 10 },
    { text: 'Secretária envia pesquisa NPS padrão, mas processo é frio e raramente gera feedback útil.', score: 40 },
    { text: 'Mensagem perguntando se conseguiu comprar medicamentos, mas é manual e recepção esquece.', score: 70 },
    { text: 'Acompanhamento clínico humanizado estruturado, colhendo percepções e reforçando suporte.', score: 100 }
  ]},
  { pilar: 'Experiência H2H', question: 'Como infraestrutura e "ambient marketing" comunicam o valor da sua consulta?', options: [
    { text: 'Clínica compartilhada/prédio padrão; recepção e aroma genéricos.', score: 10 },
    { text: 'Limpo e organizado, mas decoração antiga ou comum, parecendo consultório 2000.', score: 40 },
    { text: 'Espaço bonito e moderno, mas falta experiência sensorial planejada (som, aroma, café).', score: 70 },
    { text: 'Atmosfera completa: design, iluminação, aroma exclusivo, recepção — tudo chancela luxo.', score: 100 }
  ]},

  // PILAR 3: CRM e Processos
  { pilar: 'CRM e Processos', question: 'Cruzando faturamento mensal do CNPJ com carga de trabalho, qual é sua realidade?', options: [
    { text: 'Até R$ 20.000/mês: operação enxuta/instável; trabalho muito para pagar custos.', score: 10 },
    { text: 'R$ 20.000 a R$ 50.000/mês: receita razoável, mas sou único motor e vivo no limite.', score: 40 },
    { text: 'R$ 50.000 a R$ 100.000/mês: volume ótimo, mas refém de minha agenda; férias = zero.', score: 70 },
    { text: 'Acima de R$ 100.000/mês: excelente faturamento; busco CRM para descentralizar e escalar.', score: 100 }
  ]},
  { pilar: 'CRM e Processos', question: 'Como é feita a gestão ativa da base de pacientes antigos dos últimos 12-24 meses?', options: [
    { text: 'Não existe. Dados no prontuário, paciente precisa lembrar de voltar.', score: 10 },
    { text: 'Recepção tenta mensagens em datas comemorativas, mas manual e sem cunho estratégico.', score: 40 },
    { text: 'Sabemos quem precisa retornar, mas sem sistema que automatize alertas.', score: 70 },
    { text: 'CRM médico ativo rastreando LTV, acionando secretária no momento exato para reengajamento.', score: 100 }
  ]},
  { pilar: 'CRM e Processos', question: 'Qual é o nível de autonomia e documentação dos processos internos?', options: [
    { text: 'Caos operacional. Sem processos escritos; se secretária sair, clínica para.', score: 10 },
    { text: 'Equipe sabe pelo hábito, mas tudo depende de minha supervisão constante.', score: 40 },
    { text: 'Alguns manuais antigos desatualizados; equipe raramente segue sem cobrança.', score: 70 },
    { text: 'Operação madura. POPs documentados; equipe opera 100% autônoma.', score: 100 }
  ]},
  { pilar: 'CRM e Processos', question: 'Como você gerencia absenteísmo e horários ociosos?', options: [
    { text: 'Aceitamos passivamente. Falta = horário vago = prejuízo financeiro direto.', score: 10 },
    { text: 'Secretária liga, mas sem política clara de cobrança ou overbooking planejado.', score: 40 },
    { text: 'Lista de espera manual em caderno; remanejamento lento, raramente tampa a tempo.', score: 70 },
    { text: 'Gestão inteligente de dados: política de retenção + lista dinâmica integrada; zero ociosidade.', score: 100 }
  ]},
  { pilar: 'CRM e Processos', question: 'Se você se afastasse 30 dias, o que aconteceria com a saúde financeira?', options: [
    { text: 'Falência imediata. Faturamento vai a zero e estrutura acumula dívidas graves.', score: 10 },
    { text: 'Continua com outros profissionais, mas faturamento despenca 70%+.', score: 40 },
    { text: 'Operação sobrevive, lucro zera, estresse explode por decisões que exigem meu telefone.', score: 70 },
    { text: 'Negócio continua faturando previsível e crescendo. Ecossistema independente.', score: 100 }
  ]},

  // PILAR 4: Reputação e Autoridade
  { pilar: 'Reputação e Autoridade', question: 'Ao digitar sua Especialidade + Cidade no Google, qual é seu posicionamento?', options: [
    { text: 'Invisibilidade. Nome não aparece nas primeiras páginas; perfil Google abandonado.', score: 10 },
    { text: 'Apareço secundariamente nos mapas, mas poucas avaliações; não transmito profissionalismo.', score: 40 },
    { text: 'Bem posicionado com avaliações, mas idêntico a dezenas de concorrentes; nada premium.', score: 70 },
    { text: 'Domínio absoluto: posicionamento de autoridade máxima com dezenas de 5 estrelas sinceras.', score: 100 }
  ]},
  { pilar: 'Reputação e Autoridade', question: 'Como mercado e pacientes percebem o valor que você cobra?', options: [
    { text: 'Obrigado a manter mais baixo ou seguir teto regional para não perder para concorrente.', score: 10 },
    { text: 'Valor mediano; paciente chega defensivo, questionando preço ou pedindo desconto.', score: 40 },
    { text: 'Preço considerado alto e justo, mas preciso gastar energia verbal para "provar" valor.', score: 70 },
    { text: 'Posicionamento cria percepção de exclusividade tanta que valor é detalhe menor.', score: 100 }
  ]},
  { pilar: 'Reputação e Autoridade', question: 'Como é gerenciada sua estratégia de conteúdo digital (Instagram/YouTube)?', options: [
    { text: 'Sem consistência. Posto raro ou terceirizo genérico com agências baratas.', score: 10 },
    { text: 'Posto frequente, mas puramente técnico (enciclopédia médica); não converte pacientes.', score: 40 },
    { text: 'Stories e vídeos humanizados, mas design e narrativa não transmitem sofisticação.', score: 70 },
    { text: 'Comunicação estratégica baseada em storytelling e Luxo Consciente; atrai leads qualificados.', score: 100 }
  ]},
  { pilar: 'Reputação e Autoridade', question: 'Como feedbacks e "casos de sucesso" blindam sua reputação?', options: [
    { text: 'Não colhemos depoimentos por medo do CRM ou timidez.', score: 10 },
    { text: 'Mensagens bonitas no WhatsApp, mas perdidas no celular, nunca expostas.', score: 40 },
    { text: 'Postamos alguns prints no Instagram, mas sem tratamento visual ou narrativa.', score: 70 },
    { text: 'Transformamos satisfação em engrenagem ética: reviews no Google e depoimentos blindam.', score: 100 }
  ]},
  { pilar: 'Reputação e Autoridade', question: 'Está construindo Marca Médica com valor de mercado (Equity)?', options: [
    { text: 'Apenas trabalhando dia a dia para pagar contas, sem pensar em marca futura.', score: 10 },
    { text: 'Sei que preciso construir marca forte, mas correria de plantões me impede.', score: 40 },
    { text: 'Tenho clínica estruturada, mas se me aposentar amanhã, o nome morre comigo.', score: 70 },
    { text: 'Construindo ecossistema com metodologia própria, processos blindados, value intangível.', score: 100 }
  ]}
];

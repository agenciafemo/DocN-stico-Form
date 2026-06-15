module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, specialty, city, whatsapp, score, diagnosis } = req.body;

  console.log('[send-diagnosis] Recebido:', { name, email });

  if (!process.env.BREVO_API_KEY) {
    return res.status(500).json({ error: 'Variáveis de ambiente não configuradas' });
  }

  const sendEmail = async (toEmail, subject, htmlContent) => {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        to: [{ email: toEmail }],
        sender: { email: 'aed6ab001@smtp-brevo.com', name: 'DocNóstico' },
        subject: subject,
        htmlContent: htmlContent
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Brevo API Error: ${JSON.stringify(error)}`);
    }

    return response.json();
  };

  try {
    console.log('[send-diagnosis] Enviando email para usuário:', email);
    await sendEmail(
      email,
      `Seu Diagnóstico de Maturidade: ${score}/100`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #623d28;">Seu Diagnóstico chegou!</h1>
          <p>Olá <strong>${name}</strong>,</p>
          <p>Aqui está sua análise de maturidade comercial:</p>

          <div style="background: #f3edd8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #f1b302; margin-top: 0;">Score: ${score}/100</h2>
            <h3>${specialty} em ${city}</h3>
          </div>

          <div style="background: #fff; padding: 20px; border: 2px solid #f1b302; border-radius: 8px; margin: 20px 0;">
            <pre style="white-space: pre-wrap; font-family: Arial; font-size: 14px;">${diagnosis}</pre>
          </div>

          <p style="color: #a0a0a0; font-size: 12px;">
            Em breve, nossa equipe de especialistas entrará em contato pelo WhatsApp <strong>${whatsapp}</strong> com orientações estratégicas personalizadas.
          </p>

          <div style="border-top: 1px solid #e5dcc8; padding-top: 20px; text-align: center; color: #a0a0a0; font-size: 12px;">
            <p>© 2026 DocNóstico. Todos os direitos reservados.</p>
            <p style="color: #623d28;">agenciafemo@gmail.com</p>
          </div>
        </div>
      `
    );

    console.log('[send-diagnosis] Email usuário enviado com sucesso');

    console.log('[send-diagnosis] Enviando email para admin');
    await sendEmail(
      'contato@femo.com.br',
      `Novo Diagnóstico: ${name} (${score}/100)`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #623d28;">Novo Diagnóstico Enviado</h1>

          <div style="background: #f3edd8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2>Informações do Usuário</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Especialidade:</strong> ${specialty}</p>
            <p><strong>Cidade/Estado:</strong> ${city}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
            <p><strong>Score:</strong> ${score}/100</p>
          </div>

          <div style="background: #fff; padding: 20px; border: 2px solid #f1b302; border-radius: 8px; margin: 20px 0;">
            <h3>Diagnóstico</h3>
            <pre style="white-space: pre-wrap; font-family: Arial; font-size: 12px;">${diagnosis}</pre>
          </div>
        </div>
      `
    );

    console.log('[send-diagnosis] Email admin enviado com sucesso');
    return res.status(200).json({ success: true, message: 'Diagnóstico enviado com sucesso!' });
  } catch (error) {
    console.error('[send-diagnosis] Erro:', error);
    return res.status(500).json({ error: 'Erro ao enviar diagnóstico', details: error.message });
  }
}

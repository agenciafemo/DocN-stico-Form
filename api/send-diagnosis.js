const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, specialty, city, whatsapp, score, diagnosis } = req.body;

  console.log('[send-diagnosis] Recebido:', { name, email });
  console.log('[send-diagnosis] Variáveis de env:', {
    brevoEmail: process.env.BREVO_EMAIL ? 'OK' : 'MISSING',
    brevoKey: process.env.BREVO_SMTP_KEY ? 'OK' : 'MISSING'
  });

  if (!process.env.BREVO_EMAIL || !process.env.BREVO_SMTP_KEY) {
    return res.status(500).json({ error: 'Variáveis de ambiente não configuradas' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_EMAIL,
      pass: process.env.BREVO_SMTP_KEY
    }
  });

  try {
    console.log('[send-diagnosis] Enviando email para usuário:', email);
    await transporter.sendMail({
      from: process.env.BREVO_EMAIL,
      to: email,
      subject: `Seu Diagnóstico de Maturidade: ${score}/100`,
      html: `
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
    });

    console.log('[send-diagnosis] Email usuário enviado com sucesso');

    console.log('[send-diagnosis] Enviando email para admin');
    await transporter.sendMail({
      from: process.env.BREVO_EMAIL,
      to: 'contato@femo.com.br',
      subject: `Novo Diagnóstico: ${name} (${score}/100)`,
      html: `
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
    });

    console.log('[send-diagnosis] Email admin enviado com sucesso');
    return res.status(200).json({ success: true, message: 'Diagnóstico enviado com sucesso!' });
  } catch (error) {
    console.error('[send-diagnosis] Erro:', error);
    return res.status(500).json({ error: 'Erro ao enviar diagnóstico', details: error.message });
  }
}

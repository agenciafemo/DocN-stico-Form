const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, specialty, city, whatsapp, score, diagnosis } = req.body;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    return res.status(500).json({ error: 'Email não configurado no servidor' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const emailTemplate = (title, content) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #623d28;">${title}</h1>
      ${content}
      <div style="border-top: 1px solid #e5dcc8; padding-top: 20px; text-align: center; color: #a0a0a0; font-size: 12px;">
        <p>© 2026 DocNóstico. Todos os direitos reservados.</p>
        <p style="color: #623d28;">agenciafemo@gmail.com</p>
      </div>
    </div>
  `;

  try {
    // Email para usuário
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Seu Diagnóstico de Maturidade: ${score}/100`,
      html: emailTemplate('Seu Diagnóstico chegou!', `
        <p>Olá <strong>${name}</strong>,</p>
        <p>Aqui está sua análise de maturidade comercial:</p>
        <div style="background: #f3edd8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #f1b302;">Score: ${score}/100</h2>
          <h3>${specialty} em ${city}</h3>
        </div>
        <div style="background: #fff; padding: 20px; border: 2px solid #f1b302; border-radius: 8px;">
          <pre style="white-space: pre-wrap; font-family: Arial;">${diagnosis}</pre>
        </div>
        <p style="color: #a0a0a0; font-size: 12px;">Em breve, nossa equipe entrará em contato pelo WhatsApp <strong>${whatsapp}</strong>.</p>
      `)
    });

    // Email para admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'contato@femo.com.br',
      cc: email,
      subject: `Novo Diagnóstico: ${name} (${score}/100)`,
      html: emailTemplate('Novo Diagnóstico Recebido', `
        <div style="background: #f3edd8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Especialidade:</strong> ${specialty}</p>
          <p><strong>Cidade:</strong> ${city}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p><strong>Score:</strong> ${score}/100</p>
        </div>
        <div style="background: #fff; padding: 20px; border: 2px solid #f1b302; border-radius: 8px;">
          <h3>Diagnóstico</h3>
          <pre style="white-space: pre-wrap;">${diagnosis}</pre>
        </div>
      `)
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro:', error.message);
    return res.status(500).json({ error: error.message });
  }
}

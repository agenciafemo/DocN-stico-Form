const { Resend } = require('resend');

const resend = new Resend('re_4iD5Doun_9mFs7TLshPXa6ryeQw6xBJ5J');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, score, diagnosis } = req.body;

  try {
    // Email para o usuário
    await resend.emails.send({
      from: 'contato@femo.com.br',
      to: email,
      subject: `Seu Diagnóstico DocNóstico - Score ${score}/100`,
      html: `<h2>Olá ${name},</h2><p>${diagnosis.replace(/\n/g, '<br>')}</p>`
    });

    // Email para o admin
    await resend.emails.send({
      from: 'contato@femo.com.br',
      to: 'contato@femo.com.br',
      subject: `Novo Diagnóstico: ${name} (${score}/100)`,
      html: `<h3>${name}</h3><p>Email: ${email}</p><p>Score: ${score}/100</p><p>${diagnosis.replace(/\n/g, '<br>')}</p>`
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: error.message });
  }
};

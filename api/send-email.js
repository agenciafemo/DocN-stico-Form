import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, score, diagnosis } = req.body;
  try {
    // A chave da API deve ser uma variável de ambiente para segurança
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey) {
      console.error('A variável de ambiente RESEND_API_KEY não foi configurada.');
      return res.status(500).json({ error: 'Erro de configuração do servidor.', message: 'A chave da API de e-mail não foi encontrada.' });
    }
    if (!adminEmail) {
      console.error('A variável de ambiente ADMIN_EMAIL não foi configurada.');
      return res.status(500).json({ error: 'Erro de configuração do servidor.', message: 'O e-mail do administrador não foi encontrado.' });
    }
    if (!fromEmail) {
      console.error('A variável de ambiente RESEND_FROM_EMAIL não foi configurada.');
      return res.status(500).json({ error: 'Erro de configuração do servidor.', message: 'O e-mail remetente não foi encontrado.' });
    }

    const resend = new Resend(apiKey);

    const emailPayloads = [
      // Email para o usuário
      {
        from: fromEmail,
        to: email,
        subject: `Seu Diagnóstico DocNóstico - Score ${score}/100`,
        html: `<h2>Olá ${name},</h2><p>${diagnosis.replace(/\n/g, '<br>')}</p>`,
      },
      // Email para o admin
      {
        from: fromEmail,
        to: adminEmail,
        subject: `Novo Diagnóstico: ${name} (${score}/100)`,
        html: `<h3>${name}</h3><p>Email: ${email}</p><p>Score: ${score}/100</p><p>${diagnosis.replace(/\n/g, '<br>')}</p>`,
      },
    ];

    const { data, error } = await resend.batch.send(emailPayloads);

    if (error) {
      console.error('Falha ao enviar e-mails em lote via Resend:', error);
      return res.status(500).json({ error: 'Falha ao enviar e-mails.', details: error });
    } else {
      return res.status(200).json({ success: true, data });
    }
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.', message: error.message });
  }
}

// API para enviar diagnóstico via Brevo
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, score, diagnosis } = req.body;
  const brevoApiKey = process.env.BREVO_API_KEY;

  if (!brevoApiKey) {
    return res.status(500).json({ error: 'BREVO_API_KEY não configurada' });
  }

  const diagnosisHtml = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 680px; margin: auto; border: 1px solid #e0e0e0; padding: 30px; border-radius: 12px; background-color: #fdfdfd;">
      <img src="https://i.imgur.com/k9g4gU7.png" alt="Logo DocNóstico" style="max-width: 180px; margin: 0 auto 25px auto; display: block;">

      <h1 style="color: #623d28; text-align: center; border-bottom: 2px solid #f1b302; padding-bottom: 10px; margin-bottom: 25px;">Seu Diagnóstico DocNóstico</h1>

      <p style="font-size: 16px;">Olá, <strong>${name}</strong>,</p>
      <p style="font-size: 16px; line-height: 1.6;">Obrigado por completar a análise. Este é o seu diagnóstico de maturidade comercial.</p>

      <div style="background-color: #f3edd833; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #f1b302;">
        <h2 style="margin-top: 0; color: #623d28;">Score Geral</h2>
        <p><strong>${score} / 100</strong></p>
      </div>

      <div style="margin: 30px 0;">
        <h2 style="color: #623d28; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Análise</h2>
        <p style="line-height: 1.7; white-space: pre-wrap;">${diagnosis}</p>
      </div>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

      <p style="font-size: 12px; color: #888; text-align: center;">Este é um e-mail automático. Nossa equipe entrará em contato em breve.</p>
    </div>
  `;

  try {
    // Email para o usuário
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        to: [{ email }],
        sender: { name: 'DocNóstico', email: 'noreply@docnostico.com' },
        subject: `Seu Diagnóstico DocNóstico - Score ${score}/100`,
        htmlContent: diagnosisHtml,
      }),
    });

    // Email para o admin
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        to: [{ email: 'contato@femo.com.br' }],
        sender: { name: 'DocNóstico', email: 'noreply@docnostico.com' },
        subject: `Novo Diagnóstico: ${name} (${score}/100)`,
        htmlContent: `<p><strong>Novo diagnóstico recebido:</strong></p><p>Nome: ${name}<br>Email: ${email}<br>Score: ${score}/100</p><p style="white-space: pre-wrap;">${diagnosis}</p>`,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar com Brevo:', error);
    return res.status(500).json({ error: error.message });
  }
}

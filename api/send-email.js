export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, score, diagnosis } = req.body;

  try {
    const apiKey = 're_4iD5Doun_9mFs7TLshPXa6ryeQw6xBJ5J';

    // Email para o usuário
    const resp1 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: email,
        subject: `Seu Diagnóstico DocNóstico - Score ${score}/100`,
        html: `<h2>Olá ${name},</h2><p>${diagnosis.replace(/\n/g, '<br>')}</p>`
      })
    });

    // Email para o admin
    const resp2 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'contato@femo.com.br',
        subject: `Novo Diagnóstico: ${name} (${score}/100)`,
        html: `<h3>${name}</h3><p>Email: ${email}</p><p>Score: ${score}/100</p><p>${diagnosis.replace(/\n/g, '<br>')}</p>`
      })
    });

    if (resp1.ok && resp2.ok) {
      return res.status(200).json({ success: true });
    } else {
      throw new Error('Resend API error');
    }
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: error.message });
  }
}

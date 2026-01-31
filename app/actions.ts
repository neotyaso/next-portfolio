// c:\プログラミング\portfolio\my-new-portfolio\app\actions.ts

'use server'

import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, message: 'すべての項目を入力してください。' };
  }

  // Gmailの設定
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    // 1. 自分への通知メール
    await transporter.sendMail({
      from: '"Portfolio Contact" <neotyaso.dev@gmail.com>',
      to: 'neotyaso.dev@gmail.com', // あなたのメールアドレス
      subject: `【ポートフォリオ】お問い合わせ: ${name}様`,
      text: `
相手の名前: ${name}
相手のEmail: ${email}

相手のメッセージ:
${message}
      `,
    });

    // 2. 相手への自動返信メール
    await transporter.sendMail({
      from: '"KOKI" <neotyaso.dev@gmail.com>',
      to: email,
      subject: 'お問い合わせありがとうございます',
      text: `
${name} 様

お問い合わせありがとうございます。
以下の内容でメッセージを受け付けました。

--------------------------------------------------
${message}
--------------------------------------------------

内容を確認次第、折り返しご連絡させていただきます。
今しばらくお待ちください。

KOKI
      `,
    });

    return { success: true, message: 'お問い合わせを受け付けました。確認メールをお送りしました。' };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, message: '送信に失敗しました。時間をおいて再度お試しください。' };
  }
}

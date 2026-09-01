import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as any;
    const {
      dossierCode,
      date,
      timeSlot,
      partySize,
      packageName,
      venueName,
      guestName,
      phone,
      messagingApp,
      totalPriceUsd,
      totalPriceVnd,
      customToken,
      customChatId,
    } = body || {};

    const botToken =
      customToken ||
      process.env.TELEGRAM_BOT_TOKEN ||
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ||
      '8683715156:AAGrZrR3Z9UPhXnxyZQvqukhAbuIv1bKDS8';
    const chatId =
      customChatId ||
      process.env.TELEGRAM_CHAT_ID ||
      process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ||
      '5493091167';

    if (!botToken || !chatId) {
      console.warn('Telegram Notification: Missing bot token or chat ID');
      return NextResponse.json(
        { success: false, message: 'Chưa cấu hình Telegram Bot Token hoặc Chat ID' },
        { status: 400 }
      );
    }

    const formattedVnd = (totalPriceVnd || (totalPriceUsd || 0) * 25000).toLocaleString('vi-VN');

    const messageCaption = `👑 *LAURA BOOKING · ĐẶT CHỖ MỚI* 👑
━━━━━━━━━━━━━━━━━━━━━━
📋 *DOSSIER CODE:* \`${dossierCode || 'LAURA-VIP'}\`
📅 *Date:* ${date || 'N/A'}
⏰ *Time Slot:* ${timeSlot || 'N/A'}
👥 *Party Size:* ${partySize || 1} Khách
💎 *Gói Dịch vụ:* ${venueName || ''} - ${packageName || ''}
👤 *Guest Name:* ${guestName || 'N/A'}
📞 *Phone:* \`${phone || 'N/A'}\`
💬 *App:* ${messagingApp || 'WhatsApp / Telegram'}
💵 *Price:* $${totalPriceUsd || 0} USD (${formattedVnd} VNĐ)
━━━━━━━━━━━━━━━━━━━━━━
⚡ *Hệ thống đã xác nhận & lưu hồ sơ thẻ vé.*`;

    // Try generating composite VIP pass photo with reference template
    let photoSent = false;
    try {
      const sharp = ((await import('sharp')) as any).default;
      const bgPath = path.join(process.cwd(), 'public', 'images', 'laura-vip-card.png');

      if (fs.existsSync(bgPath)) {
        const meta = await sharp(bgPath).metadata();
        const w = meta.width || 462;
        const h = meta.height || 259;

        const safeGuest = String(guestName || 'Thượng Khách VIP').replace(/[<&>]/g, '');
        const safeVenue = String(venueName || 'Laura Private Sanctuary').replace(/[<&>]/g, '');
        const safeDossier = String(dossierCode || 'LAURA-VIP').replace(/[<&>]/g, '');

        const svgOverlay = Buffer.from(`
          <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.95"/>
              </filter>
            </defs>

            <!-- Bottom Left Information: VIP Guest & Experience (Extra Large, Shifted Left to x: 170) -->
            <g filter="url(#shadow)">
              <text x="170" y="${h - 98}" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="#ffffff" letter-spacing="0.5">VIP Guest: ${safeGuest}</text>
              <text x="170" y="${h - 52}" font-family="system-ui, -apple-system, sans-serif" font-size="23" font-weight="500" fill="#e6c88b">${safeVenue} · ${timeSlot || '20:00'}</text>
            </g>

            <!-- Bottom Right Information: DOSSIER CODE & VIP CONFIRMED above Price (Extra Large, Shifted Left to x: w - 120) -->
            <g filter="url(#shadow)">
              <text x="${w - 120}" y="${h - 122}" font-family="'Courier New', monospace" font-size="21" font-weight="bold" fill="#e6c88b" text-anchor="end" letter-spacing="1">DOSSIER: ${safeDossier}</text>
              <text x="${w - 120}" y="${h - 90}" font-family="'Courier New', monospace" font-size="17" font-weight="bold" fill="#34d399" text-anchor="end">● VIP CONFIRMED</text>
              <text x="${w - 120}" y="${h - 50}" font-family="'Courier New', monospace" font-size="33" font-weight="bold" fill="#f5d77b" text-anchor="end">$${totalPriceUsd || 0} USD</text>
            </g>
          </svg>
        `);

        const outputBuffer = await sharp(bgPath)
          .composite([{ input: svgOverlay, top: 0, left: 0 }])
          .png()
          .toBuffer();

        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', new Blob([outputBuffer], { type: 'image/png' }), 'laura-vip-ticket.png');
        formData.append('caption', messageCaption);
        formData.append('parse_mode', 'Markdown');

        const photoRes = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
          method: 'POST',
          body: formData,
        });

        const photoData = (await photoRes.json()) as any;
        if (photoData?.ok) {
          photoSent = true;
          return NextResponse.json({ success: true, mode: 'photo', data: photoData });
        }
      }
    } catch (photoErr) {
      console.warn('Could not generate VIP photo, falling back to text message:', photoErr);
    }

    // Fallback: Send standard rich Markdown text message
    if (!photoSent) {
      const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageCaption,
          parse_mode: 'Markdown',
        }),
      });

      const telegramData = (await telegramRes.json()) as any;

      if (!telegramData?.ok) {
        console.error('Telegram API error:', telegramData);
        return NextResponse.json(
          { success: false, error: telegramData?.description || 'Lỗi gửi tin nhắn Telegram' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, mode: 'text', data: telegramData });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Telegram notification error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Lỗi gửi tin nhắn Telegram' },
      { status: 500 }
    );
  }
}

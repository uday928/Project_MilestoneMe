const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendReminderEmail = async (to, name) => {
  try {
    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified');
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Time to Practice on Codeforces!',
      text: `Hi ${name},\n\nWe noticed you haven't submitted anything on Coding platforms in the past week. Get back to solving problems and keep up the grind!\n\nBest Regards,\nMilestoneMe`
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw new Error(`Email failed: ${error.message}`);
  }
};

module.exports = { sendReminderEmail };

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Налаштування транспортера Nodemailer для відправлення листів
const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: 'anarhist_666@ukr.net',
    pass: 'AxnNOVoOb1CBMKKt'
  }
});

// Реєстраційний маршрут
app.post('/register', (req, res) => {
  const { email } = req.body;

  // Створення випадкового коду підтвердження (можна використовувати більш безпечні методи)
  const confirmationCode = Math.floor(100000 + Math.random() * 900000);

  // Відправлення листа підтвердження
  const mailOptions = {
    from: 'anarhist_666@ukr.net',
    to: email,
    subject: 'Підтвердження реєстрації',
    text: `Код підтвердження: ${confirmationCode}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("error", error);
      res.status(500).json({ error: 'Помилка відправлення листа підтвердження' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Лист підтвердження надіслано' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
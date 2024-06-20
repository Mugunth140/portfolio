import nodemailer from 'nodemailer';

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, service, message } = req.body;

    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your email address where you want to receive messages
      subject: `Contact form submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Service: ${service}
        Message: ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .json({ message: "Failed to send email", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;

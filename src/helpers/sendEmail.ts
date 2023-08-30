
 import nodemailer from "nodemailer";


export const sendEmail = async ({ to, subject, text, html }: any) => {
    
  console.log(process.env.NODE_MAILER_PASSWORD);
  console.log(process.env.AUTH_USER);
  

  try {
    const transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.AUTH_USER,
         pass: process.env.NODE_MAILER_PASSWORD,   
      },
    });

    await transporter.sendMail({
      from: "Job_mela",
      to: to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
import Mailgen from "mailgen";
import mailgen from "mailgen";
import nodemailer from "nodemailer";


// send email message

const sendEmail=async (options)=>{

      const mailGenerator=new Mailgen(
        {
            theme:"default",
            product:{
                name:"Task Manager",
                link:"https://taskamanagelink.com"
            }
        }
    )
    const emailTextual = mailGenerator.generatePlaintext(
        options.mailgenContent
    )

     const emailHtml = mailGenerator.generate(
        options.mailgenContent
    )

    // Looking to send emails in production? Check out our Email API/SMTP product!
  const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e7283a8b35df5a",
    pass: "0581ef66c0d330"
  }
});
  // creste the mail object
  const mail={
      from:"mail.taskmanager@example.com",
      to:options.email,
      subject:options.subject,
      text:emailTextual,
      html:emailHtml
  }
  try{
      await transporter.sendMail(mail)
  }
  catch(error){
  console.error("email service failed make sure that you have provideed yout mailtrap credentials")
  console.log(error)
  }

}


const emailVerificationMailgenContext=(username,verficationUrl)=>{

    return{
        body:{
            name:username,
            intro:"Use the following link to verify your email address:",
            action:{
                instructions:"To verify your email address, click on the following link:",
                button:{
                    color:"#22BC66",
                    text:"Verify Email Address",
                    link:verficationUrl
                

        }
    },
     outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
}
    }
}
// forgot password
const forgotPasswordMailgenContext=(username,passwordResetUrl)=>{

    return{
        body:{
            name:username,
            intro:"we got a request to reset your password",
            action:{
                instructions:"reset your password by clicking on the following link:",
                button:{
                    color:"#e35f0d",
                    text:"reset password",
                    link:passwordResetUrl
                

        }
    },
     outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
}
    }
}
  
export {
    emailVerificationMailgenContext,
    forgotPasswordMailgenContext,sendEmail
}

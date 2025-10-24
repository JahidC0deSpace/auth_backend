import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import ENV from "../config.js";

// https://ethereal.email/create


let nodeConfig={
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: ENV.EMAIL,
      pass: ENV.PASSWORD,
    }
}



const transporter=nodemailer.createTransport(nodeConfig);

const MailGenerator =new Mailgen({
    theme:'default',
    product:{
        name:"Mailgen",
        link:'https://mailgen.js/'
    }
})


/** POST: http://localhost:8080/api/registerMail 
 * @param : {
  "username" : "example123",
  "userEmail" : "admin123",
  "text":"",
  subject:"",
  }
*/
export const registerMail=async(req,res)=>{
    const { username, userEmail, text, subject } = req.body;

    //body of the email

    var email={
        body:{
            name:username,
            intro: text ||'Welcome to Daily tution! We\'re very excited to have you on board.',
            outro:'need help, or any question? Just reply to this email, we\'d love to help '
        }
    }

    var emailBody=MailGenerator.generate(email);

    
    let massage={
        from:ENV.EMAIL,
        to:userEmail,
        subject:subject ||"Signup Successfully",
        html:emailBody
    }


    //send mail
    transporter.sendMail(massage)
    .then(()=>{
        return res.status(200).send({msg:"You Should Recive A Mail From Us.."})
    })
    .catch(error=>res.status(500).send({ error }))
}

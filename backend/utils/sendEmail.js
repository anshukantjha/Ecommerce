import nodemailer from "nodemailer"

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        service:process.env.SMTP_SERVICE,
        auth:{
            // simple mail transfer protocol
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASS
        }

    })

    const mailOptions = {
        from :process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message

    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error in sending email  ' + error)
            return true
        } else {
            console.log('Email sent: ' + info.response)
            return false
        }
    })
}

export default sendEmail
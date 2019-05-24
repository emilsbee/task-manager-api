const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'emilsbernhards2001@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })

    
}

const deleteAccountEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'emilsbernhards2001@gmail.com',
        subject: 'Sorry to see you go.',
        text: `I am sorry you decided to cancel your account, ${name}. May we know why you chose to cancel?`
    })
}

module.exports = {
    sendWelcomeEmail,
    deleteAccountEmail
}
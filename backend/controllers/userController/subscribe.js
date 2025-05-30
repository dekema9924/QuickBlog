const validate = require('validator')
const { Resend } = require('resend')


const subscribe = async (req, res) => {
    const { UserEmail } = req.body
    const resend = new Resend(process.env.RESEND_APIKEY);

    //validate email
    const isEmail = validate.isEmail(UserEmail)

    if (!isEmail) return res.status(400).json({ message: 'invalid email format' })

    //send email
    const { error } = await resend.emails.send({
        from: 'Quickblogs <dekema2000@devwithdaniel.com>',
        to: UserEmail,
        subject: 'QuickBlogs',
        html: `
         <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
    <h2 style="color: #4CAF50;">🎉 Thank You for Subscribing!</h2>
    <p>Hello,</p>
    <p>Thanks for joining <strong>QuickBlogs</strong>. You're now subscribed to receive the latest posts, tips, and updates directly to your inbox.</p>
    <hr />
    <p style="font-size: 0.9em; color: #888;">If you didn’t subscribe to this newsletter, you can ignore this email.</p>
    <p style="font-size: 0.9em; color: #888;">&copy; 2025 QuickBlogs</p>
  </div>
        `,
    });

    if (error) {
        console.error({ error });
        return res.status(400).json({ message: 'Email error' })
    }
    res.status(200).json({ message: 'Check Your Email to Confirm Subscription' })




}

module.exports = subscribe
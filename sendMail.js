const axios = require('axios');

const sendEmail = async (userData) => {
  if (!userData.email) {
    console.error("❌ Email address is missing!");
    return { success: false, message: "Email address is required." };
  }

  const templateParams = {
    to_email: userData.email,
    to_name: userData.name || "User",
    user_password: userData.password,
    subject: userData.subject || "No Subject",
    message: userData.message || "No message provided",
    company_name: 'Franchise Flow',
    company_url: 'https://franchiseflow.com',
    support_email: 'support@franchiseflow.com',
    current_year: new Date().getFullYear(),
  };

  const payload = {
    service_id: 'service_resham',
    template_id: 'template_csoiq6l',
    user_id: 'EPRRWVTb-kK39-BrD', // Public key (for tracking)
    accessToken: '7SpRFx3rxVZmMzGDfdhd8', // Replace with your actual private key from EmailJS
    template_params: templateParams,
  };

  try {
    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Email sent successfully:', response.data);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Email sending failed:', error.response?.data || error.message);
    return { success: false, message: 'Failed to send email. Please try again.' };
  }
};

module.exports = sendEmail;

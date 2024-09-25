import React, { useState } from 'react';
import emailjs from 'emailjs-com'; 

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const templateParams = {
    name,      // User's name
    email,     // User's email
    message    // User's message
  };

  emailjs
    .send('service_mnswzr8', 'template_jk4q9nw', templateParams, 'u9bSkG6LVxb2_aHjz')
    .then(
      (_response) => setStatusMessage('Message sent successfully!'),
      (_error) => setStatusMessage('Failed to send message. Please try again.')
    );
    
  // Clear the form fields
  setName('');
  setEmail('');
  setMessage('');
};

  return (
    <section id="contact" className="contact-container section-padding">
      <div className="container">
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
        {statusMessage && <p>{statusMessage}</p>}
      </div>
    </section>
  );
};

export default Contact;

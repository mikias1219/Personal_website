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
      name,
      email,
      message,
    };

    emailjs
      .send('service_mnswzr8', 'template_jk4q9nw', templateParams, 'u9bSkG6LVxb2_aHjz')
      .then(
        () => setStatusMessage('Message sent successfully!'),
        () => setStatusMessage('Failed to send message. Please try again.')
      );

    // Clear the form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="contact-container section-padding">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="form-textarea"
            />
          </div>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
    </section>
  );
};

export default Contact;
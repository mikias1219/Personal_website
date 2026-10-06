import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FiSend, FiCheckCircle, FiAlertCircle, FiCopy, FiCheck, FiDownload, FiMail } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { email } from '../data/socials';
import { useCopy } from '../hooks/useCopy';
import cvFile from '../assets/mikias_Abate.pdf';

type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const { copied, copy } = useCopy();

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send('service_mnswzr8', 'template_jk4q9nw', form, 'u9bSkG6LVxb2_aHjz');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      // Keep what the visitor typed so they can retry
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-panel reveal">
          <div className="contact-intro">
            <span className="eyebrow">05 · Contact</span>
            <h2 className="section-title">
              Hiring for AI or full-stack? <span className="gradient-text">Let’s talk.</span>
            </h2>
            <p className="section-lead">
              I’m open to full-time roles, contracts and collaborations. I usually reply within a day.
            </p>

            <div className="email-box">
              <FiMail aria-hidden="true" />
              <a href={`mailto:${email}`}>{email}</a>
              <button type="button" className="icon-btn" onClick={() => copy(email)} aria-label="Copy email address">
                {copied ? <FiCheck /> : <FiCopy />}
              </button>
            </div>

            <div className="contact-quick">
              <a href="https://www.linkedin.com/in/mikiyas-abate/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
              <a href={cvFile} download="Mikias_Abate_CV.pdf" className="btn btn-ghost">
                <FiDownload aria-hidden="true" /> CV
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="Jane Recruiter"
                  value={form.name} onChange={update} required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="jane@company.com"
                  value={form.email} onChange={update} required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell me about the role or project…"
                value={form.message} onChange={update} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : <>Send message <FiSend aria-hidden="true" /></>}
            </button>
            <div aria-live="polite">
              {status === 'success' && (
                <p className="form-status is-success"><FiCheckCircle aria-hidden="true" /> Thanks! Your message was sent.</p>
              )}
              {status === 'error' && (
                <p className="form-status is-error"><FiAlertCircle aria-hidden="true" /> Something went wrong. Please try again or email me directly.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

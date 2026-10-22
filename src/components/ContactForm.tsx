import React, { useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiSend } from 'react-icons/fi';
import { site } from '../data/profile';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAILJS = {
  serviceId: 'service_mnswzr8',
  templateId: 'template_jk4q9nw',
  publicKey: 'u9bSkG6LVxb2_aHjz',
};

const EMPTY: Fields = { name: '', email: '', message: '' };

const validate = (f: Fields): Errors => {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errors.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) errors.message = 'Please write at least a sentence (10+ characters).';
  return errors;
};

const ContactForm: React.FC = () => {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');

  const errors = validate(fields);
  const showError = (key: keyof Fields) => (touched[key] ? errors[key] : undefined);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    if (status !== 'sending') setStatus('idle');
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched({ ...touched, [e.target.name]: true });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const firstError = (Object.keys(errors) as (keyof Fields)[])[0];
    if (firstError) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }
    if (honeypot) return; // bots fill hidden fields

    setStatus('sending');
    try {
      // Loaded on demand so the SDK stays out of the initial bundle
      const { default: emailjs } = await import('emailjs-com');
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, fields, EMAILJS.publicKey);
      setStatus('success');
      setFields(EMPTY);
      setTouched({});
    } catch {
      setStatus('error'); // keep the visitor's text so they can retry
    }
  };

  const field = (name: keyof Fields, label: string, input: React.ReactElement) => {
    const error = showError(name);
    return (
      <div className={`field${error ? ' has-error' : ''}`}>
        <label htmlFor={`contact-${name}`}>{label}</label>
        {React.cloneElement(input, {
          id: `contact-${name}`,
          name,
          value: fields[name],
          onChange,
          onBlur,
          'aria-invalid': Boolean(error),
          'aria-describedby': error ? `contact-${name}-error` : undefined,
        })}
        {error && (
          <p id={`contact-${name}-error`} className="field-error">
            <FiAlertCircle aria-hidden="true" /> {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        {field('name', 'Name', <input type="text" autoComplete="name" required />)}
        {field('email', 'Email', <input type="email" autoComplete="email" required />)}
      </div>
      {field('message', 'Message', <textarea rows={6} required placeholder="The role or project, your team, and any timeline." />)}

      <div className="hp-field" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="form-footer">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <FiSend aria-hidden="true" />
            </>
          )}
        </button>
        <div aria-live="polite" className="form-status-region">
          {status === 'success' && (
            <p className="form-status is-success">
              <FiCheckCircle aria-hidden="true" /> Thanks — your message is on its way.
            </p>
          )}
          {status === 'error' && (
            <p className="form-status is-error">
              <FiAlertCircle aria-hidden="true" /> Couldn’t send right now. Try again, or email{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default ContactForm;

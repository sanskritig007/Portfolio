import { useState } from 'react';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { json } from '@remix-run/node';
import { baseMeta } from '~/utils/meta';
import { Icon } from '~/components/icon';
import styles from './contact.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Contact | Sanskriti Goswami',
    description:
      'Always open to discussing software engineering roles, research collaborations, internships, and interesting tech ideas.',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;
const WEB3FORMS_KEY = '703f1dc3-8719-4aed-9662-4dfddc3ba799';

export async function action({ request }) {
  const formData = await request.formData();
  const isBot = String(formData.get('botcheck') || '');
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const errors = {};

  if (isBot) return json({ success: true });

  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name,
        email,
        message,
        from_name: `${name} (Portfolio Contact)`,
        subject: `New Portfolio Message from ${name}`,
      }),
    });

    const data = await res.json();
    if (data.success) {
      return json({ success: true });
    } else {
      return json({ errors: { form: data.message || 'Failed to send message. Please try again.' } });
    }
  } catch (error) {
    console.error('Web3Forms Error:', error);
    return json({ success: true }); // Graceful fallback
  }
}

export const Contact = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('sanskritig007@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('from_name', `${formData.get('name')} (Portfolio Contact)`);
    formData.append('subject', `New Portfolio Message from ${formData.get('name')}`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setSent(true);
        form.reset();
      } else {
        setErrorMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again or reach out directly at sanskritig007@gmail.com');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>GET IN TOUCH</span>
        </div>

        <h1 className={styles.heroHeading}>
          Let’s Build Something <span className={styles.cyanGradient}>Remarkable</span>
        </h1>

        <p className={styles.heroSub}>
          Always open to discussing software engineering roles, research collaborations, internships, and interesting tech ideas.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Left Column: Direct Inbox & Socials */}
        <div className={styles.leftCol}>
          {/* Direct Inbox Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIconBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.cardTitleBlock}>
                <h3>DIRECT INBOX</h3>
                <p>Average response time: &lt; 24h</p>
              </div>
            </div>

            <div className={styles.copyBox}>
              <span className={styles.emailText}>sanskritig007@gmail.com</span>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Connect on Socials Card */}
          <div className={styles.card}>
            <div className={styles.socialLabel}>CONNECT ON SOCIALS</div>

            <div className={styles.socialGrid}>
              <a
                href="https://github.com/sanskritig007"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialPill}
              >
                <Icon icon="github" size={20} />
                <div className={styles.socialPillInfo}>
                  <span className={styles.socialPillName}>GitHub</span>
                  <span className={styles.socialPillHandle}>@sanskritig007</span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/sanskriti-goswami-a5b901361/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialPill}
              >
                <Icon icon="linkedin" size={20} />
                <div className={styles.socialPillInfo}>
                  <span className={styles.socialPillName}>LinkedIn</span>
                  <span className={styles.socialPillHandle}>Sanskriti Goswami</span>
                </div>
              </a>

              <a
                href="https://leetcode.com/sanskritig007"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialPill}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                <div className={styles.socialPillInfo}>
                  <span className={styles.socialPillName}>LeetCode</span>
                  <span className={styles.socialPillHandle}>@sanskritig007</span>
                </div>
              </a>

              <div className={styles.socialPill}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div className={styles.socialPillInfo}>
                  <span className={styles.socialPillName}>Location</span>
                  <span className={styles.socialPillHandle}>Ghaziabad, UP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send a Direct Message Form */}
        <div className={styles.formCard}>
          {sent ? (
            <div className={styles.completeCard}>
              <div className={styles.cardIconBox} style={{ width: '60px', height: '60px', borderRadius: '50%' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--textTitle)', margin: '8px 0 4px' }}>Message Sent!</h3>
              <p style={{ color: 'var(--textBody)', maxWidth: '400px', lineHeight: 1.6 }}>
                Thank you for reaching out. Your message has been delivered to <strong>sanskritig007@gmail.com</strong>, and I’ll get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className={styles.submitBtn}
                style={{ width: 'auto', padding: '10px 24px', textDecoration: 'none', marginTop: '12px', cursor: 'pointer' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <div className={styles.formHeader}>
                <div className={styles.cardIconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3>Send a Direct Message</h3>
              </div>

              <form onSubmit={handleSubmit} className={styles.formBody}>
                {/* Honeypot hidden input */}
                <input type="text" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.inputLabel}>Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={styles.inputField}
                      placeholder="e.g. Alex Smith"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.inputLabel}>Your Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={styles.inputField}
                      placeholder="alex@company.com"
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.inputLabel}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className={styles.textareaField}
                    placeholder="Let's discuss an engineering role / collaboration..."
                    required
                  ></textarea>
                </div>

                {errorMessage && (
                  <div style={{ color: '#ff4d4f', fontSize: '0.88rem', fontWeight: 600 }}>
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={sending}
                >
                  <Icon icon="send" size={18} />
                  <span>{sending ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

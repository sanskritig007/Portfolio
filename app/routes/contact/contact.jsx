import { useState } from 'react';
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

const WEB3FORMS_KEY = '703f1dc3-8719-4aed-9662-4dfddc3ba799';

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
              <div className={styles.emailWrapper} title="sanskritig007@gmail.com">
                <span className={styles.emailText}>sanskritig007@gmail.com</span>
              </div>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.649 1.837-.649s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.216 5.216 0 0 0-3.75-1.455c-1.377 0-2.754.52-3.805 1.571L3.99 10.74c-2.09 2.102-2.09 5.508 0 7.61l4.332 4.364c1.051 1.051 2.428 1.57 3.805 1.57s2.754-.519 3.805-1.57l2.609-2.636c.514-.514.496-1.365-.039-1.901-.535-.535-1.386-.553-1.9-.038zM20.811 13.01H10.666c-.733 0-1.332.6-1.332 1.333s.599 1.334 1.332 1.334h10.145c.733 0 1.332-.6 1.332-1.334 0-.733-.599-1.333-1.332-1.333z"/>
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

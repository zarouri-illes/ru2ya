import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const contacts = [
  {
    label: 'Email',
    value: 'hello@ru2ya.studio',
    href: 'mailto:hello@ru2ya.studio',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13L2 4" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+212 6 00 00 00 00',
    href: 'tel:+212600000000',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
]

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ru2ya.dev/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ru2ya/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M8 11v6" />
        <path d="M8 8v0" />
        <circle cx="8" cy="8" r="0" />
        <path d="M12 17v-4" />
        <path d="M16 17v-6a2 2 0 00-2-2 2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
        <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" />
      </svg>
    ),
  },
]

function ContactSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contactItemsRef = useRef(null)
  const socialGridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )

      const contactCards = contactItemsRef.current?.querySelectorAll('.contact-card')
      if (contactCards) {
        tl.fromTo(
          contactCards,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.4, stagger: 0.1, ease: 'power3.out',
          },
          '-=0.3'
        )
      }

      const socialLinks = socialGridRef.current?.querySelectorAll('.social-link')
      if (socialLinks) {
        tl.fromTo(
          socialLinks,
          { opacity: 0, scale: 0 },
          {
            opacity: 1, scale: 1,
            duration: 0.4, stagger: 0.05, ease: 'back.out(2)',
          },
          '-=0.2'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="contact-section" data-cursor="default">
      <div className="container">
        <div ref={headerRef} className="contact-header">
          <h2 className="contact-title">Restons en Contact</h2>
          <p className="contact-desc">
            Un projet en tête&nbsp;? Parlons-en.
          </p>
        </div>

        <div ref={contactItemsRef} className="contact-grid">
          {contacts.map((item, i) => (
            <a key={i} href={item.href} className="contact-card">
              <div className="contact-card-icon">{item.icon}</div>
              <div className="contact-card-body">
                <span className="contact-card-label">{item.label}</span>
                <span className="contact-card-value">{item.value}</span>
              </div>
            </a>
          ))}
        </div>

        <div ref={socialGridRef} className="social-grid">
          {socials.map((s, i) => (
            <a key={i} href={s.href} className="social-link" title={s.name}>
              <span className="social-link-icon">{s.icon}</span>
              <span className="social-link-name">{s.name}</span>
            </a>
          ))}
        </div>

        <div className="contact-footer">
          <p>&copy; {new Date().getFullYear()} ru2ya. Tous droits réservés.</p>
        </div>
      </div>

      <style>{`
        .contact-section {
          min-height: 100vh;
          background: #0b0e1a;
          padding: 100px 0 40px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .contact-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(124, 58, 237, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 1;
        }

        .contact-title {
          font-size: 42px;
          font-weight: 700;
          background: linear-gradient(135deg, #a855f7, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          font-family: var(--font-sans);
        }

        .contact-desc {
          color: var(--gray);
          font-size: 16px;
          max-width: 420px;
          margin: 0 auto;
        }

        .contact-grid {
          display: flex;
          gap: 20px;
          max-width: 640px;
          margin: 0 auto 48px;
          position: relative;
          z-index: 1;
        }

        .contact-card {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 24px;
          background: rgba(15, 25, 40, 0.5);
          border: 1px solid rgba(124, 58, 237, 0.08);
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.3s;
          cursor: pointer;
        }

        .contact-card:hover {
          border-color: rgba(124, 58, 237, 0.3);
          background: rgba(15, 25, 40, 0.7);
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(168, 85, 247, 0.08);
        }

        .contact-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(124, 58, 237, 0.08);
          border: 1px solid rgba(124, 58, 237, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--teal);
          flex-shrink: 0;
          transition: all 0.3s;
        }

        .contact-card:hover .contact-card-icon {
          background: rgba(124, 58, 237, 0.15);
          border-color: rgba(124, 58, 237, 0.25);
        }

        .contact-card-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .contact-card-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--gray);
          font-family: var(--font-mono);
        }

        .contact-card-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--white);
          font-family: var(--font-sans);
        }

        .social-grid {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 64px;
          position: relative;
          z-index: 1;
        }

        .social-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 20px;
          background: rgba(15, 25, 40, 0.4);
          border: 1px solid rgba(124, 58, 237, 0.06);
          border-radius: 14px;
          text-decoration: none;
          color: var(--gray);
          transition: all 0.3s;
          min-width: 80px;
          cursor: pointer;
        }

        .social-link:hover {
          border-color: rgba(124, 58, 237, 0.25);
          background: rgba(15, 25, 40, 0.6);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(168, 85, 247, 0.06);
        }

        .social-link:hover .social-link-icon {
          color: var(--teal);
          transform: scale(1.1);
        }

        .social-link-icon {
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-link-name {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-mono);
          white-space: nowrap;
        }

        .contact-footer {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .contact-footer p {
          font-size: 12px;
          color: rgba(148, 163, 184, 0.4);
          font-family: var(--font-mono);
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 60px 0 32px;
            min-height: auto;
          }
          .contact-title {
            font-size: 28px;
          }
          .contact-grid {
            flex-direction: column;
            max-width: 400px;
          }
          .social-grid {
            flex-wrap: wrap;
          }
          .social-link {
            min-width: 70px;
            padding: 12px 14px;
          }
        }

        @media (max-width: 480px) {
          .social-link {
            min-width: 56px;
            padding: 10px 10px;
          }
          .social-link-name {
            font-size: 8px;
          }
        }
      `}</style>
    </section>
  )
}

export default ContactSection

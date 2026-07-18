import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const commands = [
  { cmd: '$ ru2ya --init', output: '> Initializing ru2ya vision engine...' },
  { cmd: '', output: '> Loading modules: web, software, design, film, print' },
  { cmd: '', output: '' },
  { cmd: '$ █', output: '' },
]

const services = [
  { label: 'Développement Web & Logiciel', color: '#7c3aed' },
  { label: 'Design Graphique', color: '#a855f7' },
  { label: 'Réalisation Film', color: '#c084fc' },
  { label: 'Design T-Shirt', color: '#5eead4' },
]

const codeLines = [
  { text: 'const ru2ya = {', color: '#c084fc' },
  { text: '  vision: "بصيرة",', color: '#f472b6' },
  { text: '  studio: true,', color: '#7c3aed' },
  { text: '  services: [', color: '#c084fc' },
  { text: '    "Web & Software",', color: '#fbbf24' },
  { text: '    "Graphic Design",', color: '#fbbf24' },
  { text: '    "Film Making",', color: '#fbbf24' },
  { text: '    "T-Shirt Design",', color: '#fbbf24' },
  { text: '  ],', color: '#c084fc' },
  { text: '  ship: () => console.log("🚀")', color: '#7c3aed' },
  { text: '};', color: '#c084fc' },
]

function TerminalSection() {
  const sectionRef = useRef(null)
  const terminalRef = useRef(null)
  const codeRef = useRef(null)
  const outputRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        terminalRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      )

      const codeLines = codeRef.current?.querySelectorAll('.code-line')
      if (codeLines) {
        tl.fromTo(
          codeLines,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.12, ease: 'power2.out' },
          '-=0.4'
        )
      }

      const outputs = outputRef.current?.querySelectorAll('.terminal-output')
      if (outputs) {
        tl.fromTo(
          outputs,
          { opacity: 0, height: 0 },
          { opacity: 1, height: 'auto', duration: 0.3, stagger: 0.15, ease: 'power2.out' },
          '-=0.3'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="terminal" className="terminal-section" data-cursor="default">
      <div className="container">
        <div ref={terminalRef} className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="terminal-title">ru2ya — bash</div>
            <div className="terminal-spacer" />
          </div>

          <div className="terminal-body">
            <div className="terminal-command">
              <span className="prompt">$</span>
              <span className="cmd">ru2ya --init</span>
              <span className="cursor-blink">█</span>
            </div>

            <div ref={outputRef} className="terminal-output-area">
              <p className="terminal-output">Initialisation du moteur de vision ru2ya...</p>
              <p className="terminal-output">Chargement des modules : web, logiciel, design, film, print</p>
              <p className="terminal-output text-teal">✓ Système prêt</p>
            </div>

            <div ref={codeRef} className="code-block">
              {codeLines.map((line, i) => (
                <div key={i} className="code-line" style={{ color: line.color }}>
                  <span className="line-number">{String(i + 1).padStart(2, ' ')}</span>
                  <span>{line.text}</span>
                </div>
              ))}
            </div>

            <div className="terminal-services">
              {services.map((service, i) => (
                <div key={i} className="service-tag" style={{ '--tag-color': service.color }}>
                  <span className="service-dot" style={{ background: service.color }} />
                  <span>{service.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .terminal-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: var(--gradient-primary);
          padding: 80px 0;
          font-family: var(--font-mono);
        }

        .terminal-window {
          background: #0a0e1a;
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(168, 85, 247, 0.06), 0 20px 60px rgba(0, 0, 0, 0.5);
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }

        .terminal-header {
          background: #111827;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(124, 58, 237, 0.1);
        }

        .terminal-dots {
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .dot.red { background: #ef4444; }
        .dot.yellow { background: #eab308; }
        .dot.green { background: #22c55e; }

        .terminal-title {
          color: var(--gray);
          font-size: 13px;
          font-family: var(--font-mono);
        }

        .terminal-spacer {
          flex: 1;
        }

        .terminal-body {
          padding: 24px;
        }

        .terminal-command {
          color: var(--teal);
          font-size: 15px;
          margin-bottom: 8px;
          display: flex;
          gap: 8px;
        }

        .prompt {
          color: #22c55e;
        }

        .cmd {
          color: var(--white);
        }

        .cursor-blink {
          animation: blink 1s step-end infinite;
          color: var(--teal);
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .terminal-output-area {
          margin-bottom: 20px;
        }

        .terminal-output {
          color: var(--gray);
          font-size: 14px;
          line-height: 1.8;
          font-family: var(--font-mono);
        }

        .terminal-output.text-teal {
          color: var(--teal);
        }

        .code-block {
          background: #060a14;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
          border: 1px solid rgba(124, 58, 237, 0.08);
        }

        .code-line {
          font-size: 13px;
          line-height: 1.8;
          display: flex;
          gap: 16px;
          white-space: pre;
          font-family: var(--font-mono);
        }

        .line-number {
          color: rgba(148, 163, 184, 0.4);
          user-select: none;
          min-width: 24px;
          text-align: right;
        }

        .terminal-services {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .service-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(124, 58, 237, 0.06);
          border: 1px solid rgba(124, 58, 237, 0.12);
          border-radius: 999px;
          font-size: 12px;
          color: var(--white);
          font-family: var(--font-mono);
        }

        .service-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .terminal-section {
            padding: 60px 0;
            min-height: auto;
          }
          .terminal-body {
            padding: 16px;
          }
          .code-line {
            font-size: 11px;
            gap: 8px;
          }
          .terminal-command {
            font-size: 13px;
          }
          .terminal-output {
            font-size: 12px;
          }
          .service-tag {
            font-size: 10px;
            padding: 4px 10px;
          }
        }
      `}</style>
    </section>
  )
}

export default TerminalSection

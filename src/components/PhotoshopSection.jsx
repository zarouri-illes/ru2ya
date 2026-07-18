import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const tools = [
  { id: 'move', icon: '✦', label: 'Déplacement' },
  { id: 'artboard', icon: '▣', label: 'Planche' },
  { id: 'rect', icon: '□', label: 'Rectangle' },
  { id: 'ellipse', icon: '○', label: 'Ellipse' },
  { id: 'pen', icon: '✎', label: 'Plume' },
  { id: 'text', icon: 'T', label: 'Texte' },
  { id: 'gradient', icon: '▦', label: 'Dégradé' },
  { id: 'eyedropper', icon: '💧', label: 'Pipette' },
  { id: 'hand', icon: '✋', label: 'Main' },
  { id: 'zoom', icon: '🔍', label: 'Loupe' },
]

const layers = [
  { name: 'Ombre', type: 'Ombre Portée', visible: true, locked: false },
  { name: 'Slogan', type: 'Calque Texte', visible: true, locked: false },
  { name: 'Logo', type: 'Calque Forme', visible: true, locked: false },
  { name: 'Détail Icône', type: 'Forme Vectorielle', visible: true, locked: false },
  { name: 'Cercle Base', type: 'Calque Forme', visible: true, locked: true },
  { name: 'Arrière-plan', type: 'Couleur Unie', visible: true, locked: true },
]

const swatches = ['#2dd4bf', '#06b6d4', '#22d3ee', '#0a1628', '#f0fdfa', '#c084fc', '#f472b6', '#fbbf24']

function PhotoshopSection() {
  const [activeTool, setActiveTool] = useState('move')
  const sectionRef = useRef(null)
  const workspaceRef = useRef(null)
  const toolbarRef = useRef(null)
  const canvasRef = useRef(null)
  const panelRef = useRef(null)
  const optionsRef = useRef(null)

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
        workspaceRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )

      const toolBtns = toolbarRef.current?.querySelectorAll('.ps-tool-btn')
      if (toolBtns) {
        tl.fromTo(
          toolBtns,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.03, ease: 'power2.out' },
          '-=0.4'
        )
      }

      tl.fromTo(
        optionsRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.3'
      )

      tl.fromTo(
        canvasRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )

      const layerItems = panelRef.current?.querySelectorAll('.ps-layer-item')
      if (layerItems) {
        tl.fromTo(
          layerItems,
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out' },
          '-=0.3'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleToolClick = (toolId) => {
    setActiveTool(toolId)
    const cursor = document.querySelector('.custom-cursor')
    if (cursor) {
      if (toolId === 'eyedropper') cursor.dataset.type = 'eyedropper'
      else if (toolId === 'pen') cursor.dataset.type = 'brush'
      else cursor.dataset.type = 'photoshop'
    }
  }

  const handleMouseEnterCanvas = () => {
    const cursor = document.querySelector('.custom-cursor')
    if (cursor) cursor.dataset.type = 'brush'
  }

  const handleMouseLeaveCanvas = () => {
    const cursor = document.querySelector('.custom-cursor')
    if (cursor) cursor.dataset.type = 'photoshop'
  }

  return (
    <section
      ref={sectionRef}
      id="photoshop"
      className="photoshop-section"
      data-cursor="photoshop"
    >
      <div ref={workspaceRef} className="ps-workspace">
        <div ref={toolbarRef} className="ps-toolbar">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`ps-tool-btn ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => handleToolClick(tool.id)}
              title={tool.label}
            >
              <span className="tool-btn-icon">{tool.icon}</span>
            </button>
          ))}
        </div>

        <div className="ps-main">
          <div ref={optionsRef} className="ps-options-bar">
            <div className="option-group">
              <span className="option-label">Remplissage:</span>
              <div className="option-swatch" style={{ background: 'var(--teal)' }} />
            </div>
            <div className="option-divider" />
            <div className="option-group">
              <span className="option-label">Contour:</span>
              <div className="option-swatch" style={{ background: 'none', border: '1px solid var(--gray)' }} />
            </div>
            <div className="option-divider" />
            <div className="option-group">
              <span className="option-label">W:</span>
              <span className="option-value">480px</span>
            </div>
            <div className="option-group">
              <span className="option-label">H:</span>
              <span className="option-value">480px</span>
            </div>
            <div className="option-divider" />
            <div className="option-group">
              <span className="option-label">Opacité:</span>
              <span className="option-value">100%</span>
            </div>
          </div>

          <div
            ref={canvasRef}
            className="ps-canvas-area"
            onMouseEnter={handleMouseEnterCanvas}
            onMouseLeave={handleMouseLeaveCanvas}
          >
            <div className="ps-ruler-top">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="ruler-tick">
                  {i % 2 === 0 && <span className="ruler-num">{i * 50}</span>}
                </div>
              ))}
            </div>
            <div className="ps-ruler-left">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="ruler-tick-v">
                  {i % 2 === 0 && <span className="ruler-num-v">{i * 50}</span>}
                </div>
              ))}
            </div>
            <div className="ps-canvas">
              <div className="ps-canvas-inner">
                <div className="logo-artboard">
                  <div className="logo-base-circle" />
                  <div className="logo-eye-outer">
                    <div className="logo-eye-inner">
                      <div className="logo-pupil" />
                    </div>
                  </div>
                  <div className="logo-accent-dot t1" />
                  <div className="logo-accent-dot t2" />
                  <div className="logo-accent-dot t3" />
                  <div className="logo-text-mark">
                    <span className="logo-text-arabic">رؤية</span>
                    <span className="logo-text-studio">ru2ya</span>
                  </div>
                </div>
                <div className="canvas-guide-h" />
                <div className="canvas-guide-v" />
                <div className="canvas-crosshair" />
              </div>
            </div>
            <div className="ps-status-bar">
              <span className="status-left">100%</span>
              <span className="status-center">Logo Design — marque ru2ya v3.ai</span>
              <span className="status-right">480 × 480 px</span>
            </div>
          </div>
        </div>

        <div ref={panelRef} className="ps-panels">
          <div className="ps-panel-tabs">
            <span className="panel-tab active">Calques</span>
            <span className="panel-tab">Canaux</span>
            <span className="panel-tab">Trajets</span>
          </div>

          <div className="ps-layer-list">
            <div className="layer-blend-mode">Normal</div>
            <div className="layer-filter">Filtre</div>
            {layers.map((layer, i) => (
              <div
                key={i}
                className={`ps-layer-item ${i === 2 ? 'active' : ''}`}
              >
                <div className="layer-controls">
                  <span className="layer-vis">{layer.visible ? '👁' : ' '}</span>
                  <span className="layer-lock">{layer.locked ? '🔒' : ' '}</span>
                </div>
                <div className="layer-thumb" />
                <div className="layer-meta">
                  <span className="layer-name">{layer.name}</span>
                  <span className="layer-type">{layer.type}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="ps-panel-bottom">
            <div className="panel-bottom-header">Nuancier</div>
            <div className="panel-swatches">
              {swatches.map((c, i) => (
                <div key={i} className="swatch-color" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="ps-instagram">
        <div className="masonry">
          <div className="masonry-col">
            <div className="masonry-item tall">
              <img src="/assets/sh3.png" alt="Design" className="masonry-img" />
            </div>
            <div className="masonry-item small">
              <img src="/assets/sh4.png" alt="Design" className="masonry-img" />
            </div>
          </div>
          <div className="masonry-col wide-col">
            <div className="masonry-item huge">
              <img src="/assets/sh1.png" alt="Design" className="masonry-img" />
            </div>
          </div>
          <div className="masonry-col">
            <div className="masonry-item medium">
              <img src="/assets/sh2.png" alt="Design" className="masonry-img" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .photoshop-section {
          min-height: 100vh;
          background: #0d0f1a;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 0;
        }

        .ps-instagram {
          width: 100%;
          max-width: 1200px;
          margin: 48px auto 0;
          padding: 0 16px;
        }

        .masonry {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .masonry-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .masonry-col.wide-col {
          flex: 1.6;
        }

        .masonry-item {
          border-radius: 14px;
          overflow: hidden;
          transition: transform 0.3s;
          position: relative;
        }

        .masonry-item:hover {
          transform: scale(1.02);
        }

        .masonry-item.tall {
          min-height: 360px;
        }

        .masonry-item.huge {
          min-height: 640px;
        }

        .masonry-item.medium {
          min-height: 280px;
        }

        .masonry-item.small {
          min-height: 200px;
        }

        .masonry-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          position: absolute;
          inset: 0;
        }

        .masonry-item {
          position: relative;
        }

        .ps-workspace {
          display: flex;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 16px;
          gap: 0;
          height: 640px;
          border: 1px solid rgba(45, 212, 191, 0.08);
          border-radius: 8px;
          overflow: hidden;
          background: #0d1117;
          box-shadow: 0 0 60px rgba(6, 182, 212, 0.04);
        }

        .ps-toolbar {
          width: 44px;
          background: #161b22;
          border-right: 1px solid rgba(45, 212, 191, 0.06);
          display: flex;
          flex-direction: column;
          padding: 6px 4px;
          gap: 1px;
          flex-shrink: 0;
        }

        .ps-tool-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-radius: 4px;
          color: #8b949e;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .ps-tool-btn:hover {
          background: rgba(45, 212, 191, 0.08);
          color: var(--teal);
        }

        .ps-tool-btn.active {
          background: rgba(45, 212, 191, 0.12);
          color: var(--teal);
          box-shadow: inset 0 0 0 1px rgba(45, 212, 191, 0.2);
        }

        .tool-btn-icon {
          line-height: 1;
        }

        .ps-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .ps-options-bar {
          height: 36px;
          background: #161b22;
          border-bottom: 1px solid rgba(45, 212, 191, 0.06);
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 10px;
          font-size: 11px;
          color: #8b949e;
          flex-shrink: 0;
        }

        .option-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .option-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #8b949e;
        }

        .option-value {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--gray);
          min-width: 32px;
        }

        .option-swatch {
          width: 18px;
          height: 18px;
          border-radius: 2px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .option-divider {
          width: 1px;
          height: 16px;
          background: rgba(45, 212, 191, 0.08);
        }

        .ps-canvas-area {
          flex: 1;
          background: #0d1117;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .ps-ruler-top {
          height: 20px;
          background: #161b22;
          border-bottom: 1px solid rgba(45, 212, 191, 0.06);
          display: flex;
          align-items: center;
          flex-shrink: 0;
          padding-left: 20px;
        }

        .ruler-tick {
          width: 50px;
          position: relative;
          border-left: 1px solid rgba(45, 212, 191, 0.06);
          height: 100%;
        }

        .ruler-num {
          position: absolute;
          left: 2px;
          top: 2px;
          font-size: 8px;
          font-family: var(--font-mono);
          color: #484f58;
        }

        .ps-ruler-left {
          position: absolute;
          left: 0;
          top: 20px;
          bottom: 24px;
          width: 20px;
          background: #161b22;
          border-right: 1px solid rgba(45, 212, 191, 0.06);
          z-index: 2;
        }

        .ruler-tick-v {
          height: 50px;
          border-top: 1px solid rgba(45, 212, 191, 0.06);
          position: relative;
        }

        .ruler-num-v {
          position: absolute;
          left: 2px;
          top: 2px;
          font-size: 8px;
          font-family: var(--font-mono);
          color: #484f58;
        }

        .ps-canvas {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background:
            repeating-conic-gradient(rgba(45, 212, 191, 0.03) 0% 25%, transparent 0% 50%)
            0 0 / 16px 16px;
          margin-left: 20px;
        }

        .ps-canvas-inner {
          position: relative;
          width: 360px;
          height: 360px;
          background: #0a1628;
          border-radius: 4px;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .logo-artboard {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-base-circle {
          position: absolute;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 2px dashed rgba(45, 212, 191, 0.15);
          animation: rotate-dash 20s linear infinite;
        }

        @keyframes rotate-dash {
          to { transform: rotate(360deg); }
        }

        .logo-eye-outer {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(45, 212, 191, 0.3), rgba(6, 182, 212, 0.1));
          border: 2px solid rgba(45, 212, 191, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          animation: breathe 4s ease-in-out infinite;
        }

        @keyframes breathe {
          0%, 100% { box-shadow: 0 0 10px rgba(45, 212, 191, 0.1); }
          50% { box-shadow: 0 0 25px rgba(45, 212, 191, 0.2); }
        }

        .logo-eye-inner {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, var(--teal), var(--cyan));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-pupil {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #0a1628;
          position: relative;
        }

        .logo-pupil::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 5px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
        }

        .logo-accent-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--teal);
          opacity: 0.4;
        }

        .logo-accent-dot.t1 { top: 10px; right: 20px; }
        .logo-accent-dot.t2 { bottom: 15px; left: 10px; width: 6px; height: 6px; background: var(--cyan); }
        .logo-accent-dot.t3 { bottom: 40px; right: 5px; width: 5px; height: 5px; background: var(--cyan-light); }

        .logo-text-mark {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }

        .logo-text-arabic {
          display: block;
          font-size: 28px;
          font-weight: 700;
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .logo-text-studio {
          display: block;
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gray);
          font-family: var(--font-mono);
          margin-top: 2px;
        }

        .canvas-guide-h {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background: rgba(45, 212, 191, 0.06);
          pointer-events: none;
        }

        .canvas-guide-v {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: rgba(45, 212, 191, 0.06);
          pointer-events: none;
        }

        .canvas-crosshair {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 12px;
          border: 1px solid rgba(45, 212, 191, 0.12);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .ps-status-bar {
          height: 24px;
          background: #161b22;
          border-top: 1px solid rgba(45, 212, 191, 0.06);
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-size: 10px;
          font-family: var(--font-mono);
          color: #484f58;
          flex-shrink: 0;
          margin-left: 20px;
        }

        .status-left { margin-right: auto; }
        .status-center { position: absolute; left: 50%; transform: translateX(-50%); }
        .status-right { margin-left: auto; }

        .ps-panels {
          width: 220px;
          background: #161b22;
          border-left: 1px solid rgba(45, 212, 191, 0.06);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .ps-panel-tabs {
          display: flex;
          border-bottom: 1px solid rgba(45, 212, 191, 0.06);
          flex-shrink: 0;
        }

        .panel-tab {
          padding: 8px 10px;
          font-size: 10px;
          font-family: var(--font-mono);
          color: #484f58;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid transparent;
          transition: all 0.15s;
        }

        .panel-tab.active {
          color: var(--teal);
          border-bottom-color: var(--teal);
        }

        .ps-layer-list {
          flex: 1;
          overflow-y: auto;
          padding: 4px 0;
        }

        .layer-blend-mode {
          padding: 4px 10px;
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--gray);
          border-bottom: 1px solid rgba(45, 212, 191, 0.04);
        }

        .layer-filter {
          padding: 4px 10px;
          font-size: 10px;
          font-family: var(--font-mono);
          color: #484f58;
          border-bottom: 1px solid rgba(45, 212, 191, 0.04);
        }

        .ps-layer-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 8px;
          font-size: 11px;
          cursor: pointer;
          transition: background 0.15s;
        }

        .ps-layer-item:hover {
          background: rgba(45, 212, 191, 0.04);
        }

        .ps-layer-item.active {
          background: rgba(45, 212, 191, 0.08);
          border: 1px solid rgba(45, 212, 191, 0.12);
          border-radius: 2px;
          margin: 0 4px;
          padding: 4px;
        }

        .layer-controls {
          display: flex;
          gap: 2px;
          font-size: 10px;
          opacity: 0.5;
        }

        .layer-thumb {
          width: 20px;
          height: 20px;
          border-radius: 2px;
          background: rgba(45, 212, 191, 0.06);
          border: 1px solid rgba(45, 212, 191, 0.08);
          flex-shrink: 0;
        }

        .layer-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .layer-name {
          color: var(--white);
          font-size: 11px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .layer-type {
          color: #484f58;
          font-size: 9px;
          font-family: var(--font-mono);
        }

        .ps-panel-bottom {
          border-top: 1px solid rgba(45, 212, 191, 0.06);
          padding: 8px;
          flex-shrink: 0;
        }

        .panel-bottom-header {
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .panel-swatches {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
        }

        .swatch-color {
          width: 18px;
          height: 18px;
          border-radius: 2px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          cursor: pointer;
          transition: transform 0.15s;
        }

        .swatch-color:hover {
          transform: scale(1.15);
        }

        @media (max-width: 1024px) {
          .masonry {
            flex-direction: column;
          }
          .masonry-col.wide-col {
            flex: 1;
          }
          .masonry-item.huge {
            min-height: 380px;
          }
          .masonry-item.tall {
            min-height: 260px;
          }
          .masonry-item.medium {
            min-height: 200px;
          }
          .masonry-item.small {
            min-height: 160px;
          }

          .ps-workspace {
            flex-direction: column;
            height: auto;
          }
          .ps-toolbar {
            flex-direction: row;
            width: 100%;
            flex-wrap: wrap;
            padding: 4px 8px;
            border-right: none;
            border-bottom: 1px solid rgba(45, 212, 191, 0.06);
          }
          .ps-tool-btn {
            width: 32px;
            height: 32px;
            font-size: 13px;
          }
          .ps-panels {
            width: 100%;
            border-left: none;
            border-top: 1px solid rgba(45, 212, 191, 0.06);
            flex-direction: row;
            flex-wrap: wrap;
          }
          .ps-panel-tabs { width: 100%; }
          .ps-layer-list { flex: 1; min-height: 120px; max-height: 180px; }
          .ps-panel-bottom { width: 100%; }
          .ps-ruler-top, .ps-ruler-left, .ps-status-bar { display: none; }
          .ps-canvas { margin-left: 0; }
          .ps-canvas-inner { width: 260px; height: 260px; }
        }

        @media (max-width: 768px) {
          .photoshop-section {
            min-height: auto;
            padding: 20px 0;
          }
          .ps-options-bar { display: none; }
          .ps-canvas-inner { width: 200px; height: 200px; }
          .logo-artboard { transform: scale(0.7); }
          .ps-layer-list { min-height: 80px; max-height: 120px; }
          .ps-instagram { margin-top: 32px; }
        }
      `}</style>
    </section>
  )
}

export default PhotoshopSection

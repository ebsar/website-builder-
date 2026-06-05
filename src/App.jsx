import React, { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'grug_react_builder_state';

const fonts = [
  "'Cabin Sketch', cursive",
  "'Architects Daughter', cursive",
  "'Gochi Hand', cursive",
  'Arial, sans-serif',
  'Georgia, serif'
];

const animations = [
  { value: 'none', label: 'None' },
  { value: 'draw', label: 'Draw in' },
  { value: 'shake', label: 'Shake' },
  { value: 'fade', label: 'Fade in' },
  { value: 'slide-up', label: 'Slide up' },
  { value: 'pop', label: 'Pop' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'float', label: 'Float' },
  { value: 'tilt', label: 'Tilt' },
  { value: 'gravity', label: 'Gravity Drop' },
  { value: 'gravity-bounce', label: 'Gravity Bounce (Loop)' },
  { value: 'mask-reveal', label: 'Mask Reveal' },
  { value: 'blur-focus', label: 'Blur Focus' }
];

const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(15, 23, 42, 0.14)',
  md: '0 4px 10px rgba(15, 23, 42, 0.18)',
  lg: '0 10px 18px rgba(15, 23, 42, 0.20)',
  xl: '0 18px 34px rgba(15, 23, 42, 0.24)',
  '2xl': '0 25px 55px rgba(15, 23, 42, 0.28)',
  inner: 'inset 0 2px 8px rgba(15, 23, 42, 0.18)',
  hard: '8px 8px 0 rgba(17, 24, 39, 0.90)',
  glow: '0 0 0 3px rgba(0, 123, 255, 0.14), 0 0 24px rgba(0, 123, 255, 0.35)',
  neon: '0 0 14px rgba(0, 123, 255, 0.70), 0 0 34px rgba(0, 123, 255, 0.40)',
  redGlow: '0 0 14px rgba(255, 59, 48, 0.65), 0 0 34px rgba(255, 59, 48, 0.35)',
  sketch: '4px 4px 0 #111111'
};

const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'luminosity'];
const hoverEffects = ['none', 'lift', 'grow', 'tilt', 'magnetic', 'glow', 'glitch', 'blur', 'dim'];
const clipShapes = ['none', 'circle', 'diamond', 'hexagon', 'ticket', 'slant'];
const objectFits = ['cover', 'contain', 'fill', 'none', 'scale-down'];
const textAnimations = [
  { value: 'none', label: 'None' },
  { value: 'fade-in', label: 'Fade in' },
  { value: 'slide-up', label: 'Slide up' },
  { value: 'slide-down', label: 'Slide down' },
  { value: 'slide-left', label: 'Slide left' },
  { value: 'slide-right', label: 'Slide right' },
  { value: 'typewriter', label: 'Typewriter' },
  { value: 'typing-cursor', label: 'Typing cursor' },
  { value: 'wave', label: 'Wave' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'glow', label: 'Glow' },
  { value: 'neon', label: 'Neon' },
  { value: 'flicker', label: 'Flicker' },
  { value: 'shake', label: 'Shake' },
  { value: 'blur-in', label: 'Blur in' },
  { value: 'zoom-in', label: 'Zoom in' },
  { value: 'flip', label: 'Flip' },
  { value: 'swing', label: 'Swing' },
  { value: 'gradient-flow', label: 'Gradient flow' }
];

function uid(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function textLayer(text, overrides = {}) {
  return {
    id: uid('txt'),
    text,
    left: 12,
    top: 10,
    width: 220,
    height: 44,
    fontSize: 24,
    fontWeight: 700,
    fontFamily: fonts[0],
    color: '#111111',
    textAlign: 'left',
    lineHeight: 1.15,
    letterSpacing: 0,
    textTransform: 'none',
    textShadow: 'none',
    textAnimation: 'none',
    textAnimationDuration: 1.2,
    textAnimationDelay: 0,
    textAnimationLoop: false,
    ...overrides
  };
}

function element(type, overrides = {}) {
  return {
    id: uid('el'),
    type,
    left: 120,
    top: 90,
    width: type === 'text' ? 420 : 180,
    height: type === 'text' ? 120 : 140,
    rotation: 0,
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
    perspective: 900,
    scale: 1,
    skewX: 0,
    skewY: 0,
    animation: 'none',
    animationDuration: 0.8,
    animationDelay: 0,
    hoverEffect: 'none',
    opacity: 1,
    zIndex: 1,
    backgroundColor: type === 'text' || type === 'image' || type === 'spacer' ? 'transparent' : '#ffffff',
    borderColor: 'transparent',
    borderWidth: 0,
    borderStyle: 'solid',
    radius: 0,
    padding: 0,
    blur: 0,
    backdropBlur: 0,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    sepia: 0,
    dropShadow: 0,
    shadow: 'none',
    mixBlendMode: 'normal',
    clipShape: 'none',
    objectFit: 'cover',
    objectPosition: 'center',
    cursor: type === 'button' ? 'pointer' : 'default',
    locked: false,
    imageSrc: '',
    isButton: type === 'button',
    link: '',
    linkMode: 'url',
    textLayers: type === 'image'
      ? []
      : [textLayer(type === 'button' ? 'Button text' : type === 'text' ? 'Edit this text' : 'Box', type === 'text' ? {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        fontSize: 32,
        lineHeight: 1.18
      } : {})],
    ...overrides
  };
}

function section(name, elements = []) {
  return {
    id: uid('sec'),
    name,
    height: 620,
    widthMode: 'contained',
    maxWidth: 1180,
    paddingX: 20,
    paddingY: 0,
    marginY: 28,
    offsetX: 0,
    offsetY: 0,
    rotation: 0,
    radius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    shadow: 'none',
    opacity: 1,
    blur: 0,
    backdropBlur: 18,
    overflow: 'visible',
    backgroundColor: 'transparent',
    backgroundImage: '',
    backgroundGradient: '',
    parallax: false,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    dividerType: 'none',
    dividerColor: '#ffffff',
    dividerHeight: 80,
    dividerPosition: 'none',
    elements
  };
}


function cloneTextLayer(layer) {
  return {
    ...layer,
    id: uid('txt'),
    left: Number(layer.left) || 12,
    top: Number(layer.top) || 10
  };
}

function cloneElementData(item, patch = {}) {
  return {
    ...item,
    id: uid('el'),
    left: (Number(item.left) || 0) + 24,
    top: (Number(item.top) || 0) + 24,
    textLayers: (item.textLayers || []).map(cloneTextLayer),
    ...patch
  };
}

function colorInputValue(value, fallback) {
  return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function clipPathFor(shape) {
  const shapes = {
    circle: 'circle(50%)',
    diamond: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
    hexagon: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0 50%)',
    ticket: 'polygon(0 0, 100% 0, 100% 38%, 94% 50%, 100% 62%, 100% 100%, 0 100%, 0 62%, 6% 50%, 0 38%)',
    slant: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)'
  };
  return shapes[shape] || undefined;
}

function effectLevel(value) {
  return Number(value ?? 100) - 100;
}

function effectValue(level) {
  return Number(level) + 100;
}

function SectionDivider({ type, position, color, height }) {
  if (!type || type === 'none' || !position || position === 'none') return null;

  const isTop = position === 'top';
  const style = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: `${height || 80}px`,
    fill: color || '#ffffff',
    pointerEvents: 'none',
    zIndex: 10,
    ...(isTop ? { top: 0, transform: 'scaleY(-1)', transformOrigin: 'center' } : { bottom: 0 })
  };

  if (type === 'waves') {
    return (
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={style}>
        <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
      </svg>
    );
  }

  if (type === 'slanted') {
    return (
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={style}>
        <polygon points="0,120 1440,30 1440,120"></polygon>
      </svg>
    );
  }

  if (type === 'curved') {
    return (
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={style}>
        <path d="M0,120 Q720,0 1440,120 Z"></path>
      </svg>
    );
  }

  return null;
}


function historySnapshot(state) {
  return {
    mode: state.mode,
    websiteStyle: state.websiteStyle,
    device: state.device,
    navbar: state.navbar,
    drawMode: state.drawMode,
    drawingData: state.drawingData,
    penColor: state.penColor,
    penSize: state.penSize,
    erasing: state.erasing,
    selectedId: state.selectedId,
    snapToGrid: state.snapToGrid,
    showGrid: state.showGrid,
    gridSize: state.gridSize,
    clipboard: state.clipboard,
    sections: state.sections
  };
}

const stylePresets = {
  cleanCard: {
    backgroundColor: 'transparent',
    borderColor: '#111111',
    borderWidth: 2,
    borderStyle: 'solid',
    radius: 8,
    padding: 12,
    opacity: 1,
    blur: 0,
    backdropBlur: 0,
    shadow: 'md',
    mixBlendMode: 'normal'
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.58)',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderStyle: 'solid',
    radius: 18,
    padding: 14,
    opacity: 0.94,
    blur: 0,
    backdropBlur: 14,
    shadow: 'lg',
    mixBlendMode: 'normal'
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    radius: 0,
    padding: 0,
    opacity: 1,
    blur: 0,
    backdropBlur: 0,
    shadow: 'none',
    mixBlendMode: 'normal'
  },
  glowButton: {
    backgroundColor: '#111111',
    borderColor: '#111111',
    borderWidth: 2,
    borderStyle: 'solid',
    radius: 999,
    padding: 8,
    opacity: 1,
    blur: 0,
    backdropBlur: 0,
    shadow: 'glow',
    mixBlendMode: 'normal',
    isButton: true,
    type: 'button'
  },
  softImage: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    radius: 16,
    padding: 0,
    opacity: 1,
    blur: 0,
    backdropBlur: 0,
    shadow: 'xl',
    mixBlendMode: 'normal'
  }
};

const templateSections = {
  hero: () => section('hero', [
    element('text', { left: 80, top: 90, width: 560, height: 110, textLayers: [textLayer('Your Website Headline', { width: 520, height: 70, fontSize: 46 })] }),
    element('text', { left: 86, top: 210, width: 500, height: 92, textLayers: [textLayer('Write a clear promise for visitors. Explain what you do and why it matters.', { width: 460, height: 62, fontSize: 22, fontWeight: 400 })] }),
    element('button', { left: 90, top: 330, width: 190, height: 62, textLayers: [textLayer('Get Started', { left: 24, top: 14, width: 145, height: 34, fontSize: 24 })] }),
    element('box', { left: 660, top: 100, width: 330, height: 250, textLayers: [textLayer('Photo / GIF', { left: 90, top: 105, width: 150, color: '#007bff' })] })
  ]),
  content: () => section('content', [
    element('text', { left: 90, top: 70, width: 520, height: 76, textLayers: [textLayer('What makes this page special', { width: 480, fontSize: 34 })] }),
    element('box', { left: 95, top: 185, width: 250, height: 160, textLayers: [textLayer('Feature One', { fontSize: 25 }), textLayer('Short useful text here.', { top: 64, width: 200, fontSize: 19, fontWeight: 400 })] }),
    element('box', { left: 390, top: 185, width: 250, height: 160, textLayers: [textLayer('Feature Two', { fontSize: 25 }), textLayer('Add the second reason.', { top: 64, width: 200, fontSize: 19, fontWeight: 400 })] }),
    element('box', { left: 685, top: 185, width: 250, height: 160, textLayers: [textLayer('Feature Three', { fontSize: 25 }), textLayer('Finish with the proof.', { top: 64, width: 200, fontSize: 19, fontWeight: 400 })] })
  ]),
  gallery: () => section('gallery', [
    element('text', { left: 90, top: 70, width: 360, height: 70, textLayers: [textLayer('Gallery', { width: 320, fontSize: 38 })] }),
    element('box', { left: 95, top: 165, width: 270, height: 210, textLayers: [textLayer('Image 1', { left: 82, top: 84, width: 120, color: '#007bff' })] }),
    element('box', { left: 405, top: 165, width: 270, height: 210, textLayers: [textLayer('Image 2', { left: 82, top: 84, width: 120, color: '#007bff' })] }),
    element('box', { left: 715, top: 165, width: 270, height: 210, textLayers: [textLayer('Image 3', { left: 82, top: 84, width: 120, color: '#007bff' })] })
  ]),
  cta: () => section('call to action', [
    element('text', { left: 120, top: 135, width: 640, height: 96, textLayers: [textLayer('Ready to build something better?', { width: 600, fontSize: 40 })] }),
    element('text', { left: 126, top: 240, width: 520, height: 70, textLayers: [textLayer('Add a short final reason and send visitors to the next step.', { width: 480, fontSize: 22, fontWeight: 400 })] }),
    element('button', { left: 700, top: 210, width: 210, height: 64, textLayers: [textLayer('Contact Now', { left: 24, top: 15, width: 160, fontSize: 24 })] })
  ]),
  pricing: () => section('pricing', [
    element('text', { left: 90, top: 70, width: 460, height: 74, textLayers: [textLayer('Pricing Plans', { width: 420, fontSize: 38 })] }),
    element('box', { left: 95, top: 170, width: 280, height: 250, textLayers: [textLayer('Starter', { fontSize: 28 }), textLayer('$19', { top: 62, fontSize: 38, color: '#007bff' }), textLayer('Best for small pages.', { top: 122, width: 220, fontSize: 19, fontWeight: 400 })] }),
    element('box', { left: 405, top: 150, width: 300, height: 285, borderColor: '#007bff', textLayers: [textLayer('Professional', { fontSize: 28 }), textLayer('$49', { top: 62, fontSize: 42, color: '#007bff' }), textLayer('For a complete website.', { top: 128, width: 230, fontSize: 19, fontWeight: 400 })] }),
    element('box', { left: 735, top: 170, width: 280, height: 250, textLayers: [textLayer('Studio', { fontSize: 28 }), textLayer('$99', { top: 62, fontSize: 38, color: '#007bff' }), textLayer('For advanced launches.', { top: 122, width: 220, fontSize: 19, fontWeight: 400 })] })
  ]),
  testimonial: () => section('testimonials', [
    element('text', { left: 90, top: 70, width: 520, height: 76, textLayers: [textLayer('What people say', { width: 480, fontSize: 36 })] }),
    element('box', { left: 100, top: 175, width: 430, height: 190, textLayers: [textLayer('"This page made the offer clear immediately."', { width: 380, height: 72, fontSize: 24 }), textLayer('Customer Name', { top: 120, width: 200, fontSize: 21, color: '#007bff' })] }),
    element('box', { left: 575, top: 175, width: 430, height: 190, textLayers: [textLayer('"The builder is simple and fast to change."', { width: 380, height: 72, fontSize: 24 }), textLayer('Second Customer', { top: 120, width: 220, fontSize: 21, color: '#007bff' })] })
  ]),
  blank: () => section('blank section')
};

function freshNavbar(overrides = {}) {
  return {
    enabled: false,
    variant: 'fresh',
    brand: '',
    logoType: 'text',
    logoImage: '',
    logoX: 42,
    logoY: 22,
    links: [],
    linkPositions: [],
    linksX: 360,
    linksY: 26,
    cta: '',
    ctaX: 980,
    ctaY: 18,
    offsetX: 0,
    offsetY: 0,
    width: 1180,
    height: 82,
    backgroundColor: '#ffffff',
    rotation: 0,
    sticky: false,
    ...overrides
  };
}

function defaultState() {
  return {
    mode: 'edit',
    websiteStyle: 'drawn',
    device: 'desktop',
    bodyBgColor: '#f8fafc',
    bodyBgImage: '',
    bodyBgRepeat: 'no-repeat',
    navbar: freshNavbar({
      enabled: true,
      brand: 'Boost Build',
      links: ['Home', 'Features', 'Gallery', 'Pricing'],
      linkPositions: [
        { x: 380, y: 26 },
        { x: 480, y: 26 },
        { x: 580, y: 26 },
        { x: 680, y: 26 }
      ],
      cta: 'Get Started'
    }),
    selectedId: null,
    drawMode: false,
    drawingData: '',
    penColor: '#2563eb',
    penSize: 4,
    erasing: false,
    snapToGrid: true,
    showGrid: true,
    gridSize: 10,
    clipboard: null,
    past: [],
    future: [],
    sections: [
      templateSections.hero(),
      templateSections.content(),
      templateSections.gallery(),
      templateSections.cta(),
      templateSections.pricing(),
      templateSections.testimonial()
    ]
  };
}

function App() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return defaultState();
      const parsed = JSON.parse(saved);
      parsed.past = [];
      parsed.future = [];
      if (parsed.navbar && !parsed.navbar.variant) {
        const wasOldBoostNav = ['Boost Bite', 'Boost Build'].includes(parsed.navbar.brand);
        parsed.navbar = freshNavbar({
          ...parsed.navbar,
          variant: 'fresh',
          brand: wasOldBoostNav ? '' : parsed.navbar.brand || '',
          links: wasOldBoostNav ? [] : parsed.navbar.links || [],
          cta: wasOldBoostNav ? '' : parsed.navbar.cta || '',
          height: Number(parsed.navbar.height) > 96 ? 82 : parsed.navbar.height || 82,
          backgroundColor: parsed.navbar.backgroundColor === '#cfe6fb' ? '#ffffff' : parsed.navbar.backgroundColor || '#ffffff',
          logoX: wasOldBoostNav ? 42 : parsed.navbar.logoX,
          logoY: wasOldBoostNav ? 22 : parsed.navbar.logoY,
          linksX: wasOldBoostNav ? 360 : parsed.navbar.linksX,
          linksY: wasOldBoostNav ? 26 : parsed.navbar.linksY,
          ctaX: wasOldBoostNav ? 980 : parsed.navbar.ctaX,
          ctaY: wasOldBoostNav ? 18 : parsed.navbar.ctaY
        });
      } else if (parsed.navbar?.variant === 'fresh') {
        const hasOldFreshDefaults = parsed.navbar.brand === 'Your Brand'
          && parsed.navbar.cta === 'Get Started'
          && JSON.stringify(parsed.navbar.links || []) === JSON.stringify(['Home', 'Work', 'Pricing', 'Contact']);
        if (hasOldFreshDefaults) {
          parsed.navbar = freshNavbar({
            ...parsed.navbar,
            brand: '',
            links: [],
            cta: ''
          });
        }
      }
      if (parsed.navbar && typeof parsed.navbar.enabled === 'undefined') {
        parsed.navbar = { ...parsed.navbar, enabled: false };
      }
      if (parsed.sections) {
        parsed.sections = parsed.sections.map(sec => ({
          dividerType: 'none',
          dividerColor: '#ffffff',
          dividerHeight: 80,
          dividerPosition: 'none',
          ...sec
        }));
      }
      if (!parsed.bodyBgColor) parsed.bodyBgColor = '#f8fafc';
      if (parsed.bodyBgImage === undefined) parsed.bodyBgImage = '';
      if (!parsed.bodyBgRepeat) parsed.bodyBgRepeat = 'no-repeat';
      return parsed;
    } catch {
      return defaultState();
    }
  });

  useEffect(() => {
    try {
      const { past, future, ...rest } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  }, [state]);

  const selected = state.sections.flatMap(sec => sec.elements.map(el => ({ ...el, sectionId: sec.id }))).find(el => el.id === state.selectedId);
  const selectedRef = useRef(selected);
  const stateRef = useRef(state);

  useEffect(() => {
    selectedRef.current = selected;
    stateRef.current = state;
  }, [selected, state]);

  function commitState(updater) {
    setState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return {
        ...next,
        past: [...(prev.past || []), historySnapshot(prev)].slice(-50),
        future: []
      };
    });
  }

  function setUiState(updater) {
    setState(prev => typeof updater === 'function' ? updater(prev) : updater);
  }

  function undo() {
    setState(prev => {
      if (!prev.past?.length) return prev;
      const previous = prev.past[prev.past.length - 1];
      return {
        ...previous,
        past: prev.past.slice(0, -1),
        future: [historySnapshot(prev), ...(prev.future || [])].slice(0, 50)
      };
    });
  }

  function redo() {
    setState(prev => {
      if (!prev.future?.length) return prev;
      const next = prev.future[0];
      return {
        ...next,
        past: [...(prev.past || []), historySnapshot(prev)].slice(-50),
        future: prev.future.slice(1)
      };
    });
  }

  function updateElement(sectionId, elementId, patch) {
    commitState(prev => ({
      ...prev,
      sections: prev.sections.map(sec => sec.id !== sectionId ? sec : {
        ...sec,
        elements: sec.elements.map(el => el.id === elementId ? { ...el, ...patch } : el)
      })
    }));
  }

  function updateText(sectionId, elementId, textId, patch) {
    commitState(prev => ({
      ...prev,
      sections: prev.sections.map(sec => sec.id !== sectionId ? sec : {
        ...sec,
        elements: sec.elements.map(el => el.id !== elementId ? el : {
          ...el,
          textLayers: el.textLayers.map(txt => txt.id === textId ? { ...txt, ...patch } : txt)
        })
      })
    }));
  }

  function addSection(kind) {
    commitState(prev => ({ ...prev, mode: 'edit', sections: [...prev.sections, templateSections[kind]()] }));
  }

  function addElement(sectionId, type, overrides = {}) {
    const next = element(type, {
      left: type === 'text' ? 115 : 140,
      top: type === 'text' ? 100 : 140,
      width: type === 'text' ? 420 : type === 'button' ? 190 : type === 'image' ? 260 : type === 'divider' ? 420 : type === 'spacer' ? 360 : type === 'input' ? 260 : type === 'video' ? 360 : 220,
      height: type === 'text' ? 120 : type === 'button' ? 62 : type === 'image' ? 170 : type === 'divider' ? 8 : type === 'spacer' ? 40 : type === 'badge' ? 42 : type === 'input' ? 54 : type === 'video' ? 210 : 130,
      radius: type === 'circle' ? 999 : type === 'badge' ? 999 : type === 'input' ? 10 : 0,
      borderWidth: 0,
      borderColor: 'transparent',
      shadow: 'none',
      backgroundColor: type === 'divider' ? '#111111' : type === 'spacer' ? 'transparent' : type === 'badge' ? '#ffffff' : type === 'input' ? '#ffffff' : undefined,
      textLayers: type === 'divider' || type === 'spacer' || type === 'image'
        ? []
        : [textLayer(type === 'badge' ? 'Badge' : type === 'input' ? 'Email address' : type === 'video' ? 'Video / Embed' : type === 'button' ? 'Button text' : type === 'text' ? 'Edit this text' : 'Box', type === 'text' ? {
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          fontSize: 32,
          lineHeight: 1.18
        } : {})],
      ...overrides
    });
    commitState(prev => ({
      ...prev,
      mode: 'edit',
      selectedId: next.id,
      sections: prev.sections.map(sec => sec.id !== sectionId ? sec : { ...sec, elements: [...sec.elements, next] })
    }));
  }

  function deleteElement(sectionId, elementId) {
    commitState(prev => ({
      ...prev,
      selectedId: prev.selectedId === elementId ? null : prev.selectedId,
      sections: prev.sections.map(sec => sec.id !== sectionId ? sec : {
        ...sec,
        elements: sec.elements.filter(el => el.id !== elementId)
      })
    }));
  }

  function deleteSelected() {
    const current = selectedRef.current;
    if (!current) return;
    deleteElement(current.sectionId, current.id);
  }

  function duplicateSelected() {
    if (!selected) return;
    const duplicate = cloneElementData(selected);
    commitState(prev => ({
      ...prev,
      selectedId: duplicate.id,
      sections: prev.sections.map(sec => sec.id !== selected.sectionId ? sec : {
        ...sec,
        elements: [...sec.elements, duplicate]
      })
    }));
  }

  function nudgeSelected(dx, dy) {
    if (!selected || selected.locked) return;
    updateElement(selected.sectionId, selected.id, {
      left: Math.max(0, Number(selected.left) + dx),
      top: Math.max(0, Number(selected.top) + dy)
    });
  }

  function alignSelected(position) {
    if (!selected || selected.locked) return;
    const pageWidth = 1080;
    const patches = {
      left: { left: 40 },
      center: { left: Math.max(0, Math.round((pageWidth - selected.width) / 2)) },
      right: { left: Math.max(0, pageWidth - selected.width - 40) },
      top: { top: 75 },
      middle: { top: 225 },
      bottom: { top: 440 }
    };
    updateElement(selected.sectionId, selected.id, patches[position]);
  }

  function layerSelected(direction) {
    if (!selected) return;
    updateElement(selected.sectionId, selected.id, {
      zIndex: Math.max(1, Number(selected.zIndex || 1) + direction)
    });
  }

  function toggleLockSelected() {
    if (!selected) return;
    updateElement(selected.sectionId, selected.id, { locked: !selected.locked });
  }

  function applyPresetSelected(presetName) {
    if (!selected || !stylePresets[presetName]) return;
    updateElement(selected.sectionId, selected.id, stylePresets[presetName]);
  }

  function copySelected() {
    if (!selected) return;
    setUiState(prev => ({ ...prev, clipboard: cloneElementData(selected, { left: selected.left, top: selected.top }) }));
  }

  function pasteElement() {
    if (!state.clipboard) return;
    const pasted = cloneElementData(state.clipboard);
    const targetSectionId = selected?.sectionId || state.sections[0]?.id;
    if (!targetSectionId) return;
    commitState(prev => ({
      ...prev,
      selectedId: pasted.id,
      sections: prev.sections.map(sec => sec.id !== targetSectionId ? sec : {
        ...sec,
        elements: [...sec.elements, pasted]
      })
    }));
  }

  function updateSection(sectionId, patch) {
    commitState(prev => ({
      ...prev,
      sections: prev.sections.map(sec => sec.id === sectionId ? { ...sec, ...patch } : sec)
    }));
  }

  function updateNavbar(patch) {
    commitState(prev => ({
      ...prev,
      navbar: { ...freshNavbar(), ...(prev.navbar || {}), ...patch }
    }));
  }

  function addFreshNavbar() {
    commitState(prev => ({
      ...prev,
      navbar: freshNavbar({ enabled: true })
    }));
  }

  function updateNavbarLink(index, value) {
    commitState(prev => {
      const navbar = prev.navbar || defaultState().navbar;
      const links = [...(navbar.links || [])];
      links[index] = value;
      return { ...prev, navbar: { ...navbar, links } };
    });
  }

  function addNavbarLink() {
    commitState(prev => {
      const navbar = prev.navbar || defaultState().navbar;
      const links = [...(navbar.links || []), 'Link'];
      const linkPositions = [
        ...(navbar.linkPositions || []),
        { x: 360 + (navbar.links || []).length * 86, y: 26 }
      ];
      return { ...prev, navbar: { ...navbar, links, linkPositions } };
    });
  }

  function addNavbarButton() {
    commitState(prev => {
      const navbar = prev.navbar || defaultState().navbar;
      return { ...prev, navbar: { ...navbar, cta: navbar.cta || 'Button' } };
    });
  }

  function removeNavbarLink(index) {
    commitState(prev => {
      const navbar = prev.navbar || defaultState().navbar;
      return {
        ...prev,
        navbar: {
          ...navbar,
          links: (navbar.links || []).filter((_, i) => i !== index),
          linkPositions: (navbar.linkPositions || []).filter((_, i) => i !== index)
        }
      };
    });
  }

  function uploadBodyBgImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => commitState(prev => ({ ...prev, bodyBgImage: reader.result }));
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  function duplicateSection(sectionId) {
    commitState(prev => {
      const index = prev.sections.findIndex(sec => sec.id === sectionId);
      if (index < 0) return prev;
      const original = prev.sections[index];
      const duplicated = {
        ...original,
        id: uid('sec'),
        name: `${original.name} copy`,
        elements: original.elements.map(item => cloneElementData(item, { left: item.left, top: item.top }))
      };
      return {
        ...prev,
        sections: [...prev.sections.slice(0, index + 1), duplicated, ...prev.sections.slice(index + 1)]
      };
    });
  }

  function moveSection(sectionId, direction) {
    commitState(prev => {
      const index = prev.sections.findIndex(sec => sec.id === sectionId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= prev.sections.length) return prev;
      const sections = [...prev.sections];
      const [item] = sections.splice(index, 1);
      sections.splice(nextIndex, 0, item);
      return { ...prev, sections };
    });
  }

  function deleteSection(sectionId) {
    commitState(prev => ({
      ...prev,
      selectedId: null,
      sections: prev.sections.filter(item => item.id !== sectionId)
    }));
  }

  function resetDesign() {
    commitState(defaultState());
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(historySnapshot(state), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grug-design.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function importJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (!Array.isArray(imported.sections)) throw new Error('Missing sections');
        commitState(prev => ({
          ...prev,
          ...imported,
          mode: 'edit',
          selectedId: null,
          past: prev.past || [],
          future: []
        }));
      } catch {
        alert('That design file could not be imported.');
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  }

  function exportHtml() {
    const html = `<!doctype html>\n${document.documentElement.outerHTML}`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grug-react-website.html';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  useEffect(() => {
    function isTypingTarget(target) {
      return target?.closest?.('input, textarea, select, [contenteditable="true"]');
    }

    function handleShortcut(event) {
      if (event.key === 'Escape') {
        document.querySelectorAll('details[open]').forEach(menu => {
          menu.open = false;
        });
        document.activeElement?.blur?.();
        setUiState(prev => ({
          ...prev,
          selectedId: null,
          drawMode: false
        }));
        return;
      }

      if (isTypingTarget(event.target)) return;

      const key = event.key.toLowerCase();
      const meta = event.ctrlKey || event.metaKey;
      const current = selectedRef.current;

      if (meta && key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
        return;
      }

      if ((meta && key === 'y') || (meta && event.shiftKey && key === 'z')) {
        event.preventDefault();
        redo();
        return;
      }

      if (meta && key === 'c') {
        event.preventDefault();
        copySelected();
        return;
      }

      if (meta && key === 'v') {
        event.preventDefault();
        pasteElement();
        return;
      }

      if (meta && key === 'd') {
        event.preventDefault();
        duplicateSelected();
        return;
      }

      if (key === 'delete' || key === 'backspace') {
        event.preventDefault();
        deleteSelected();
        return;
      }

      if (key === 'p') {
        event.preventDefault();
        setUiState(prev => ({ ...prev, mode: prev.mode === 'edit' ? 'preview' : 'edit', selectedId: null }));
        return;
      }

      if (current && ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        event.preventDefault();
        const amount = event.shiftKey ? 10 : 1;
        const moves = {
          arrowup: [0, -amount],
          arrowdown: [0, amount],
          arrowleft: [-amount, 0],
          arrowright: [amount, 0]
        };
        nudgeSelected(...moves[key]);
      }
    }

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    function closeMenus(except = null) {
      document.querySelectorAll('details[open]').forEach(menu => {
        if (menu !== except) menu.open = false;
      });
    }

    function handlePointerDown(event) {
      const openMenu = event.target.closest('details[open]');
      if (!openMenu) closeMenus();
    }

    function handleToggle(event) {
      const menu = event.target;
      if (menu.tagName === 'DETAILS' && menu.open) {
        closeMenus(menu);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('toggle', handleToggle, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('toggle', handleToggle, true);
    };
  }, []);

  return (
    <>
      <SketchFilters />
      <TopToolbar
        mode={state.mode}
        websiteStyle={state.websiteStyle || 'drawn'}
        device={state.device || 'desktop'}
        selected={selected}
        canUndo={!!state.past?.length}
        canRedo={!!state.future?.length}
        canPaste={!!state.clipboard}
        snapToGrid={state.snapToGrid}
        showGrid={state.showGrid}
        gridSize={state.gridSize}
        onTemplate={addSection}
        navbarEnabled={!!state.navbar?.enabled}
        onAddNavbar={addFreshNavbar}
        onPreview={() => setUiState(prev => ({ ...prev, mode: prev.mode === 'edit' ? 'preview' : 'edit', selectedId: null }))}
        onExport={exportHtml}
        onExportJson={exportJson}
        onImportJson={importJson}
        onClear={resetDesign}
        onUndo={undo}
        onRedo={redo}
        onDuplicate={duplicateSelected}
        onCopy={copySelected}
        onPaste={pasteElement}
        onLayer={layerSelected}
        onAlign={alignSelected}
        onNudge={nudgeSelected}
        onLock={toggleLockSelected}
        onPreset={applyPresetSelected}
        onToggleSnap={() => setUiState(prev => ({ ...prev, snapToGrid: !prev.snapToGrid }))}
        onToggleGrid={() => setUiState(prev => ({ ...prev, showGrid: !prev.showGrid }))}
        onGridSize={gridSize => setUiState(prev => ({ ...prev, gridSize: Number(gridSize) }))}
        onWebsiteStyle={websiteStyle => commitState(prev => {
          let nextBg = prev.bodyBgColor;
          if (websiteStyle === 'drawn') nextBg = '#f8fafc';
          if (websiteStyle === 'drawn-dark') nextBg = '#1c2621';
          if (websiteStyle === 'modern') nextBg = '#f8fbff';
          if (websiteStyle === 'modern-dark') nextBg = '#030712';
          return { ...prev, websiteStyle, bodyBgColor: nextBg };
        })}
        onDevice={device => setUiState(prev => ({ ...prev, device }))}
        drawMode={state.drawMode}
        penColor={state.penColor}
        penSize={state.penSize}
        erasing={state.erasing}
        onToggleDraw={() => setUiState(prev => ({ ...prev, drawMode: !prev.drawMode, selectedId: null }))}
        onPenColor={penColor => setUiState(prev => ({ ...prev, penColor, erasing: false }))}
        onPenSize={penSize => setUiState(prev => ({ ...prev, penSize: Number(penSize) }))}
        onEraser={() => setUiState(prev => ({ ...prev, erasing: !prev.erasing }))}
        onClearDrawing={() => commitState(prev => ({ ...prev, drawingData: '' }))}
        onDelete={deleteSelected}
        bodyBgColor={state.bodyBgColor || '#f8fafc'}
        bodyBgImage={state.bodyBgImage || ''}
        bodyBgRepeat={state.bodyBgRepeat || 'no-repeat'}
        onBodyBgColor={color => commitState(prev => ({ ...prev, bodyBgColor: color }))}
        onBodyBgImageUpload={uploadBodyBgImage}
        onClearBodyBgImage={() => commitState(prev => ({ ...prev, bodyBgImage: '' }))}
        onBodyBgRepeat={repeat => commitState(prev => ({ ...prev, bodyBgRepeat: repeat }))}
      />
      <DrawOverlay
        enabled={state.drawMode}
        drawingData={state.drawingData}
        color={state.penColor}
        size={state.penSize}
        erasing={state.erasing}
        onSave={drawingData => setUiState(prev => ({ ...prev, drawingData }))}
      />
      <button className={`redraw-btn ${state.mode === 'edit' ? 'save-state' : ''}`} onClick={() => setUiState(prev => ({ ...prev, mode: prev.mode === 'edit' ? 'preview' : 'edit', selectedId: null }))}>
        {state.mode === 'edit' ? 'Save Design' : 'Edit Design'}
      </button>

      <div 
        className={`site-style-shell site-style-${state.websiteStyle || 'drawn'} device-${state.device || 'desktop'}`}
        style={{
          backgroundColor: state.bodyBgColor || undefined,
          backgroundImage: state.bodyBgImage ? `url(${state.bodyBgImage})` : undefined,
          backgroundRepeat: state.bodyBgRepeat === 'cover' ? 'no-repeat' : state.bodyBgRepeat || 'no-repeat',
          backgroundSize: state.bodyBgRepeat === 'cover' ? 'cover' : undefined,
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh'
        }}
      >
        <HeaderNav
          editing={state.mode === 'edit'}
          navbar={state.navbar || defaultState().navbar}
          onUpdate={updateNavbar}
          onLinkUpdate={updateNavbarLink}
          onAddLink={addNavbarLink}
          onAddButton={addNavbarButton}
          onRemoveLink={removeNavbarLink}
        />

        <div id="sections-layout-container">
          {state.sections.map(sec => (
            <EditorSection
              key={sec.id}
              section={sec}
              editing={state.mode === 'edit'}
              selectedId={state.selectedId}
              onSelect={id => setUiState(prev => ({ ...prev, selectedId: id }))}
              onAddElement={addElement}
              onUpdate={updateElement}
              onTextUpdate={updateText}
              onDelete={deleteElement}
              onUpdateSection={updateSection}
              onDuplicateSection={duplicateSection}
              onMoveSection={moveSection}
              onDeleteSection={deleteSection}
              snapToGrid={state.snapToGrid}
              showGrid={state.showGrid}
              gridSize={state.gridSize}
            />
          ))}
        </div>
      </div>

      {state.mode === 'edit' && selected && (
        <Inspector
          selected={selected}
          onUpdate={patch => updateElement(selected.sectionId, selected.id, patch)}
          onTextUpdate={(textId, patch) => updateText(selected.sectionId, selected.id, textId, patch)}
          onPreset={presetName => applyPresetSelected(presetName)}
          onDelete={() => deleteElement(selected.sectionId, selected.id)}
        />
      )}
    </>
  );
}

function SketchFilters() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
      <defs>
        <filter id="paint-sketch">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

function DrawOverlay({ enabled, drawingData, color, size, erasing, onSave }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      const image = canvas.toDataURL('image/png');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (drawingData || image) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.src = drawingData || image;
      }
    }

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawingData]);

  function point(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function start(event) {
    if (!enabled) return;
    event.preventDefault();
    isDrawingRef.current = true;
    lastRef.current = point(event);
  }

  function move(event) {
    if (!enabled || !isDrawingRef.current) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const next = point(event);
    ctx.globalCompositeOperation = erasing ? 'destination-out' : 'source-over';
    ctx.strokeStyle = color || '#2563eb';
    ctx.lineWidth = Number(size || 4);
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
    lastRef.current = next;
  }

  function stop() {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    onSave(canvasRef.current.toDataURL('image/png'));
  }

  return (
    <canvas
      ref={canvasRef}
      className={`draw-overlay ${enabled ? 'is-drawing' : ''}`}
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={stop}
      onPointerLeave={stop}
    />
  );
}

function TopToolbar({
  mode,
  websiteStyle,
  device,
  selected,
  canUndo,
  canRedo,
  canPaste,
  snapToGrid,
  showGrid,
  gridSize,
  onTemplate,
  navbarEnabled,
  onAddNavbar,
  onPreview,
  onExport,
  onExportJson,
  onImportJson,
  onClear,
  onUndo,
  onRedo,
  onDuplicate,
  onCopy,
  onPaste,
  onLayer,
  onAlign,
  onNudge,
  onLock,
  onPreset,
  onToggleSnap,
  onToggleGrid,
  onGridSize,
  onWebsiteStyle,
  onDevice,
  drawMode,
  penColor,
  penSize,
  erasing,
  onToggleDraw,
  onPenColor,
  onPenSize,
  onEraser,
  onClearDrawing,
  onDelete,
  bodyBgColor,
  bodyBgImage,
  bodyBgRepeat,
  onBodyBgColor,
  onBodyBgImageUpload,
  onClearBodyBgImage,
  onBodyBgRepeat
}) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options = { weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: true };
      setTime(date.toLocaleDateString('en-US', options).replace(',', ''));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="react-builder-top apple-menubar">
      <div className="editor-appbar">
        {/* Left Side: Apple Menu and Main Menus */}
        <div className="menubar-left">
          {/* Apple Logo Dropdown */}
          <details className="editor-menu apple-logo-menu">
            <summary className="menu-apple-icon"></summary>
            <div className="editor-menu-panel">
              <button onClick={() => alert("Boost Build Website Creator\nVersion 1.0.0\nA visual website builder with freehand drawing and React state framework.")}>
                About Boost Build
              </button>
              <hr className="menu-separator" />
              <button className={showGrid ? "menu-checked" : ""} onClick={onToggleGrid}>
                {showGrid ? "✓ Show Grid" : "Show Grid"}
              </button>
              <button className={snapToGrid ? "menu-checked" : ""} onClick={onToggleSnap}>
                {snapToGrid ? "✓ Snap to Grid" : "Snap to Grid"}
              </button>
              <hr className="menu-separator" />
              <button className="danger-text" onClick={() => { if (confirm("Are you sure you want to reset the design?")) onClear(); }}>
                Reset Builder...
              </button>
            </div>
          </details>

          {/* File Menu */}
          <details className="editor-menu">
            <summary>File</summary>
            <div className="editor-menu-panel">
              <label className="menu-btn-label">
                Import JSON...
                <input type="file" accept="application/json,.json" onChange={onImportJson} style={{ display: 'none' }} />
              </label>
              <button onClick={onExportJson}>
                Export JSON <span className="menu-shortcut">⌘S</span>
              </button>
              <hr className="menu-separator" />
              <button onClick={onExport}>
                Export HTML <span className="menu-shortcut">⌘E</span>
              </button>
            </div>
          </details>

          {/* Edit Menu */}
          <details className="editor-menu">
            <summary>Edit</summary>
            <div className="editor-menu-panel">
              <button disabled={!canUndo} onClick={onUndo}>
                Undo <span className="menu-shortcut">⌘Z</span>
              </button>
              <button disabled={!canRedo} onClick={onRedo}>
                Redo <span className="menu-shortcut">⌘Y</span>
              </button>
              <hr className="menu-separator" />
              <button disabled={!selected} onClick={onCopy}>
                Copy <span className="menu-shortcut">⌘C</span>
              </button>
              <button disabled={!canPaste} onClick={onPaste}>
                Paste <span className="menu-shortcut">⌘V</span>
              </button>
              <button disabled={!selected} onClick={onDuplicate}>
                Duplicate <span className="menu-shortcut">⌘D</span>
              </button>
              <button disabled={!selected} className="danger-text" onClick={onDelete}>
                Delete <span className="menu-shortcut">⌫</span>
              </button>
            </div>
          </details>

          {/* Insert Menu */}
          <details className="editor-menu">
            <summary>Insert</summary>
            <div className="editor-menu-panel">
              <button disabled={navbarEnabled} onClick={onAddNavbar}>
                Navigation Bar {navbarEnabled && "✓"}
              </button>
              <hr className="menu-separator" />
              <button onClick={() => onTemplate('hero')}>Hero Section</button>
              <button onClick={() => onTemplate('content')}>Feature Section</button>
              <button onClick={() => onTemplate('gallery')}>Gallery Section</button>
              <button onClick={() => onTemplate('cta')}>Call to Action (CTA)</button>
              <button onClick={() => onTemplate('pricing')}>Pricing Section</button>
              <button onClick={() => onTemplate('testimonial')}>Reviews Section</button>
              <button onClick={() => onTemplate('blank')}>Blank Section</button>
            </div>
          </details>

          {/* View Menu */}
          <details className="editor-menu">
            <summary>View</summary>
            <div className="editor-menu-panel">
              <button onClick={onPreview}>
                {mode === 'edit' ? "✓ Edit Mode" : "Edit Mode"}
              </button>
              <button onClick={onPreview}>
                {mode === 'preview' ? "✓ Preview Mode" : "Preview Mode"}
              </button>
              <hr className="menu-separator" />
              <button onClick={() => onWebsiteStyle('drawn')}>
                {websiteStyle === 'drawn' ? "✓ Drawn Theme (Light)" : "Drawn Theme (Light)"}
              </button>
              <button onClick={() => onWebsiteStyle('drawn-dark')}>
                {websiteStyle === 'drawn-dark' ? "✓ Chalkboard Theme (Dark)" : "Chalkboard Theme (Dark)"}
              </button>
              <button onClick={() => onWebsiteStyle('modern')}>
                {websiteStyle === 'modern' ? "✓ Modern Theme (Light)" : "Modern Theme (Light)"}
              </button>
              <button onClick={() => onWebsiteStyle('modern-dark')}>
                {websiteStyle === 'modern-dark' ? "✓ Midnight Theme (Dark)" : "Midnight Theme (Dark)"}
              </button>
              <hr className="menu-separator" />
              <button onClick={() => onDevice('desktop')}>
                {device === 'desktop' ? "✓ Desktop Layout" : "Desktop Layout"}
              </button>
              <button onClick={() => onDevice('tablet')}>
                {device === 'tablet' ? "✓ Tablet Layout" : "Tablet Layout"}
              </button>
              <button onClick={() => onDevice('mobile')}>
                {device === 'mobile' ? "✓ Mobile Layout" : "Mobile Layout"}
              </button>
            </div>
          </details>

          {/* Page Menu */}
          <details className="editor-menu">
            <summary>Page</summary>
            <div className="editor-menu-panel">
              <div className="menu-input-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', padding: '2px 8px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 'bold' }}>BG Color</span>
                <input
                  type="color"
                  value={bodyBgColor || '#f8fafc'}
                  onChange={event => onBodyBgColor(event.target.value)}
                  style={{ width: '40px', height: '24px', padding: 0, border: 'none', cursor: 'pointer' }}
                />
              </div>
              <hr className="menu-separator" />
              <label className="menu-btn-label" style={{ display: 'block', padding: '6px 12px', fontSize: '0.84rem', fontWeight: '500', cursor: 'pointer', textAlign: 'left' }}>
                Upload BG Image...
                <input
                  type="file"
                  accept="image/*"
                  onChange={onBodyBgImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
              {bodyBgImage && (
                <button
                  className="danger-text"
                  onClick={onClearBodyBgImage}
                  style={{ width: '100%', textAlign: 'left', padding: '6px 12px' }}
                >
                  Remove BG Image
                </button>
              )}
              <hr className="menu-separator" />
              <div className="menu-input-row" style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '6px', alignItems: 'center', padding: '2px 8px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 'bold' }}>BG Repeat</span>
                <select
                  value={bodyBgRepeat || 'no-repeat'}
                  onChange={event => onBodyBgRepeat(event.target.value)}
                  style={{
                    width: '100%',
                    height: '24px',
                    fontSize: '0.78rem',
                    fontWeight: 'bold',
                    padding: '0 4px',
                    borderRadius: '4px',
                    border: '1px solid rgba(0,0,0,0.15)',
                    background: '#fff'
                  }}
                >
                  <option value="no-repeat">No Repeat</option>
                  <option value="repeat">Repeat</option>
                  <option value="cover">Scale/Cover</option>
                </select>
              </div>
            </div>
          </details>

          {/* Selected Element Menu */}
          {selected && (
            <details className="editor-menu">
              <summary>Selected</summary>
              <div className="editor-menu-panel">
                <button onClick={() => onLayer(1)}>Bring Forward</button>
                <button onClick={() => onLayer(-1)}>Send Backward</button>
                <hr className="menu-separator" />
                <button onClick={() => onAlign('left')}>Align Left</button>
                <button onClick={() => onAlign('center')}>Align Center</button>
                <button onClick={() => onAlign('right')}>Align Right</button>
                <hr className="menu-separator" />
                <button onClick={onLock}>
                  {selected.locked ? "✓ Locked" : "Lock Position"}
                </button>
                <hr className="menu-separator" />
                <button onClick={() => onPreset('cleanCard')}>Preset: Clean Card</button>
                <button onClick={() => onPreset('glass')}>Preset: Glassmorphism</button>
                <button onClick={() => onPreset('glowButton')}>Preset: Glow Button</button>
                <button onClick={() => onPreset('softImage')}>Preset: Soft Image</button>
                <button onClick={() => onPreset('ghost')}>Preset: Ghost (Transparent)</button>
              </div>
            </details>
          )}

          {/* Draw Sub-Menu */}
          <details className="editor-menu">
            <summary>Draw</summary>
            <div className="editor-menu-panel">
              <button onClick={onToggleDraw}>
                {drawMode ? "✓ Active (Sketching)" : "Start Sketching"}
              </button>
              <button onClick={onEraser}>
                {erasing ? "✓ Eraser Active" : "Eraser"}
              </button>
              <hr className="menu-separator" />
              <div className="menu-input-row">
                <span>Color</span>
                <input type="color" value={penColor || '#2563eb'} onChange={event => onPenColor(event.target.value)} />
              </div>
              <div className="menu-input-row">
                <span>Size</span>
                <input type="number" min="1" max="40" value={penSize || 4} onChange={event => onPenSize(event.target.value)} />
              </div>
              <hr className="menu-separator" />
              <button className="danger-text" onClick={onClearDrawing}>Clear Sketches</button>
            </div>
          </details>
        </div>

        {/* Right Side: Status and Clock */}
        <div className="menubar-right">
          <div className="select-device-icons">
            <button className={device === 'desktop' ? 'active-icon' : ''} onClick={() => onDevice('desktop')} title="Desktop view">🖥️</button>
            <button className={device === 'tablet' ? 'active-icon' : ''} onClick={() => onDevice('tablet')} title="Tablet view">📟</button>
            <button className={device === 'mobile' ? 'active-icon' : ''} onClick={() => onDevice('mobile')} title="Mobile view">📱</button>
          </div>
          <span className="apple-status-separator">|</span>
          <button className={`apple-preview-toggle ${mode === 'preview' ? 'preview-active' : ''}`} onClick={onPreview}>
            {mode === 'preview' ? '▶ Preview' : '✎ Edit'}
          </button>
          <span className="apple-status-separator">|</span>
          <span className="apple-clock">{time}</span>
        </div>
      </div>
    </div>
  );
}

function HeaderNav({ editing, navbar, onUpdate, onLinkUpdate, onAddLink, onAddButton, onRemoveLink }) {
  const headerRef = useRef(null);
  const [guide, setGuide] = useState(null);
  if (!navbar?.enabled) return null;

  const navStyle = {
    width: `min(${navbar.width || 1180}px, calc(100vw - 24px))`,
    minHeight: `${navbar.height || 108}px`,
    backgroundColor: navbar.backgroundColor || undefined,
    position: navbar.sticky ? 'sticky' : 'relative',
    top: navbar.sticky ? 54 : undefined,
    zIndex: editing ? 8800 : navbar.sticky ? 1200 : undefined,
    transform: `translate(${navbar.offsetX || 0}px, ${navbar.offsetY || 0}px)${navbar.rotation ? ` rotate(${navbar.rotation}deg)` : ''}`,
    transformOrigin: 'center'
  };

  function uploadLogo(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpdate({ logoType: 'image', logoImage: reader.result });
    reader.readAsDataURL(file);
  }

  function startNavbarDrag(event, keyX, keyY) {
    if (!editing) return;
    if (event.target.closest('input, button, select, label')) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = headerRef.current.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const initialX = Number(navbar[keyX] || 0);
    const initialY = Number(navbar[keyY] || 0);

    function move(e) {
      const nextX = Math.max(0, Math.min(rect.width - 80, initialX + e.clientX - startX));
      const nextY = Math.max(0, Math.min(rect.height - 40, initialY + e.clientY - startY));
      const snapX = Math.abs(nextX - rect.width / 2) < 8 ? rect.width / 2 : nextX;
      const snapY = Math.abs(nextY - rect.height / 2) < 8 ? rect.height / 2 : nextY;
      onUpdate({ [keyX]: Math.round(snapX), [keyY]: Math.round(snapY) });
      setGuide({
        vertical: Math.abs(snapX - rect.width / 2) < 8,
        horizontal: Math.abs(snapY - rect.height / 2) < 8,
        top: nextY < 8,
        bottom: Math.abs(nextY - (rect.height - 40)) < 8,
        left: nextX < 8,
        right: Math.abs(nextX - (rect.width - 80)) < 8
      });
    }

    function done() {
      setGuide(null);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  function startNavbarLinkDrag(event, index) {
    if (!editing) return;
    if (event.target.closest('input, button, select, label')) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = headerRef.current.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const positions = [...(navbar.linkPositions || [])];
    const current = positions[index] || { x: 360 + index * 86, y: 26 };
    function move(e) {
      const nextX = Math.max(0, Math.min(rect.width - 60, current.x + e.clientX - startX));
      const nextY = Math.max(0, Math.min(rect.height - 30, current.y + e.clientY - startY));
      const snapX = Math.abs(nextX - rect.width / 2) < 8 ? rect.width / 2 : nextX;
      const snapY = Math.abs(nextY - rect.height / 2) < 8 ? rect.height / 2 : nextY;
      const nextPositions = [...(navbar.linkPositions || [])];
      nextPositions[index] = { x: Math.round(snapX), y: Math.round(snapY) };
      onUpdate({ linkPositions: nextPositions });
      setGuide({
        vertical: Math.abs(snapX - rect.width / 2) < 8,
        horizontal: Math.abs(snapY - rect.height / 2) < 8,
        top: nextY < 8,
        bottom: Math.abs(nextY - (rect.height - 30)) < 8,
        left: nextX < 8,
        right: Math.abs(nextX - (rect.width - 60)) < 8
      });
    }
    function done() {
      setGuide(null);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  function startNavbarRotate(event) {
    if (!editing) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = headerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    function move(e) {
      const degrees = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI + 90;
      onUpdate({ rotation: Math.round(degrees) });
    }
    function done() {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  function startNavbarMove(event) {
    if (!editing) return;
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const startOffsetX = navbar.offsetX || 0;
    const startOffsetY = navbar.offsetY || 0;
    function move(e) {
      onUpdate({
        offsetX: Math.round(startOffsetX + e.clientX - startX),
        offsetY: Math.round(startOffsetY + e.clientY - startY)
      });
    }
    function done() {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  function startNavbarResize(event) {
    if (!editing) return;
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = navbar.width || headerRef.current.getBoundingClientRect().width;
    const startHeight = navbar.height || headerRef.current.getBoundingClientRect().height;
    function move(e) {
      onUpdate({
        width: Math.max(220, Math.round(startWidth + e.clientX - startX)),
        height: Math.max(44, Math.round(startHeight + e.clientY - startY))
      });
    }
    function done() {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  return (
    <header ref={headerRef} className={`header nav-${navbar.variant || 'fresh'} ${editing ? 'drawing-mode' : ''}`} id="header-container" style={navStyle}>
      {editing && guide && (
        <>
          {guide.vertical && <span className="nav-guide nav-guide-v">Center X</span>}
          {guide.horizontal && <span className="nav-guide nav-guide-h">Center Y</span>}
          {(guide.top || guide.bottom || guide.left || guide.right) && (
            <span className="nav-guide-badge">
              {guide.top ? 'Top ' : ''}{guide.bottom ? 'Bottom ' : ''}{guide.left ? 'Left ' : ''}{guide.right ? 'Right' : ''}
            </span>
          )}
        </>
      )}
      {editing && (
        <div className="container-tools compact-section-tools navbar-editor-tools">
          <span className="section-toolbar-title">Navbar</span>
          
          <details className="compact-editor-menu">
            <summary>Add</summary>
            <div className="compact-editor-panel component-library" style={{ minWidth: '150px' }}>
              <button className="tool-btn component-btn" onClick={onAddLink}>Link</button>
              {!navbar.cta && (
                <button className="tool-btn component-btn" onClick={onAddButton}>Button</button>
              )}
              {!(navbar.brand || navbar.logoImage) && (
                <button className="tool-btn component-btn" onClick={() => onUpdate({ brand: 'Brand' })}>Logo</button>
              )}
            </div>
          </details>

          <details className="compact-editor-menu">
            <summary>Settings</summary>
            <div className="compact-editor-panel section-settings-panel">
              <label>
                Brand Text
                <input
                  value={navbar.brand || ''}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdate({ brand: event.target.value })}
                />
              </label>
              <label>
                Logo Type
                <select
                  value={navbar.logoType || 'text'}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdate({ logoType: event.target.value })}
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                </select>
              </label>
              <label>
                Logo image
                <input
                  type="file"
                  accept="image/*"
                  onMouseDown={event => event.stopPropagation()}
                  onChange={uploadLogo}
                />
              </label>
              {navbar.cta !== undefined && navbar.cta !== null && navbar.cta !== '' && (
                <label>
                  Button text
                  <input
                    value={navbar.cta || ''}
                    onMouseDown={event => event.stopPropagation()}
                    onChange={event => onUpdate({ cta: event.target.value })}
                  />
                </label>
              )}
              <label>
                Height (px)
                <input
                  type="number"
                  min="44"
                  max="300"
                  value={navbar.height || 108}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdate({ height: Number(event.target.value) })}
                />
              </label>
              <label>
                Width (px)
                <input
                  type="number"
                  min="220"
                  max="1800"
                  value={navbar.width || 1180}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdate({ width: Number(event.target.value) })}
                />
              </label>
              <label>
                Move X
                <input
                  type="number"
                  min="-2000"
                  max="2000"
                  value={navbar.offsetX || 0}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdate({ offsetX: Number(event.target.value) })}
                />
              </label>
              <label>
                Move Y
                <input
                  type="number"
                  min="-2000"
                  max="2000"
                  value={navbar.offsetY || 0}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdate({ offsetY: Number(event.target.value) })}
                />
              </label>
              <label>
                Background
                <input
                  type="color"
                  value={colorInputValue(navbar.backgroundColor, '#ffffff')}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdate({ backgroundColor: event.target.value })}
                />
              </label>
              <label className="navbar-check">
                Sticky
                <input
                  type="checkbox"
                  checked={!!navbar.sticky}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdate({ sticky: event.target.checked })}
                />
              </label>
              <div className="section-action-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginTop: '6px' }}>
                <button className="tool-btn" onMouseDown={startNavbarMove}>Move</button>
                <button className="tool-btn" onMouseDown={startNavbarRotate}>Rotate</button>
                <button
                  className="tool-btn btn-delete-section"
                  onClick={() => onUpdate({ enabled: false })}
                  style={{ gridColumn: 'span 2' }}
                >
                  Delete Navbar
                </button>
              </div>
            </div>
          </details>

          {/* Height range slider direct control */}
          <div className="range-slider-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.7)', padding: '3px 8px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>Height</span>
            <input
              type="range"
              min="44"
              max="300"
              value={navbar.height || 108}
              onMouseDown={event => event.stopPropagation()}
              onChange={event => onUpdate({ height: Number(event.target.value) })}
              style={{ width: '80px', height: '14px', cursor: 'pointer', accentColor: '#2563eb' }}
            />
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#1e293b' }}>{navbar.height || 108}px</span>
          </div>

          <button className="tool-btn btn-delete-section" onClick={() => onUpdate({ enabled: false })}>Remove Navbar</button>
        </div>
      )}
      {editing && <span className="section-move-handle navbar-move-handle" title="Hold and drag to move navbar" onMouseDown={startNavbarMove} />}
      {editing && <span className="section-rotate-handle navbar-rotate-handle" title="Hold and drag to rotate navbar" onMouseDown={startNavbarRotate} />}
      {editing && <span className="section-resize-handle navbar-resize-handle" title="Resize navbar" onMouseDown={startNavbarResize} />}
      <nav className="navbar" id="main-navbar">
        {(navbar.logoImage || navbar.brand) && (
          <div
            className="logo nav-editable-item"
            id="nav-logo"
            style={{ left: navbar.logoX || 72, top: navbar.logoY || 36, display: 'flex', alignItems: 'center' }}
            onMouseDown={event => startNavbarDrag(event, 'logoX', 'logoY')}
          >
            {navbar.logoType === 'image' && navbar.logoImage ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img className="navbar-logo-image" src={navbar.logoImage} alt={navbar.brand || 'Logo'} style={{ pointerEvents: 'none' }} />
                {editing && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onUpdate({ logoImage: '' }); }}
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      border: 'none',
                      background: '#ef4444',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      cursor: 'pointer',
                      padding: 0,
                      lineHeight: 1,
                      zIndex: 10
                    }}
                    aria-label="Remove logo image"
                  >
                    x
                  </button>
                )}
              </div>
            ) : (
              <>
                <span className="fresh-logo-mark">{(navbar.brand || 'L').trim().slice(0, 1).toUpperCase()}</span>
                {editing ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                      className="logo-text-input"
                      value={navbar.brand}
                      onChange={event => onUpdate({ brand: event.target.value })}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: 'inherit',
                        font: 'inherit',
                        fontWeight: 'bold',
                        width: '80px',
                        padding: 0
                      }}
                      aria-label="Brand text"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); onUpdate({ brand: '', logoImage: '' }); }}
                      style={{
                        border: 'none',
                        background: '#ef4444',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        cursor: 'pointer',
                        padding: 0,
                        lineHeight: 1
                      }}
                      aria-label="Remove logo"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <span className="logo-text">{navbar.brand}</span>
                )}
              </>
            )}
          </div>
        )}
        {(navbar.links || []).map((link, index) => {
          const position = (navbar.linkPositions || [])[index] || { x: 360 + index * 86, y: 26 };
          return (
            <span
              className="nav-link nav-link-editable nav-editable-item"
              key={`${link}_${index}`}
              style={{ left: position.x, top: position.y }}
              onMouseDown={event => startNavbarLinkDrag(event, index)}
            >
              {editing ? (
                <>
                  <input value={link} onChange={event => onLinkUpdate(index, event.target.value)} aria-label={`Navbar link ${index + 1}`} />
                  <button onClick={() => onRemoveLink(index)} aria-label={`Remove ${link}`}>x</button>
                </>
              ) : (
                <span>{link}</span>
              )}
            </span>
          );
        })}
        {navbar.cta && (
          <div
            className="nav-actions nav-editable-item"
            style={{ left: navbar.ctaX || 970, top: navbar.ctaY || 36 }}
            onMouseDown={event => startNavbarDrag(event, 'ctaX', 'ctaY')}
          >
            {editing ? (
              <div className="contact-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'move' }}>
                <input
                  className="contact-btn-input"
                  value={navbar.cta}
                  onChange={event => onUpdate({ cta: event.target.value })}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'inherit',
                    font: 'inherit',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '85px',
                    padding: 0,
                    cursor: 'text'
                  }}
                  aria-label="Navbar button text"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); onUpdate({ cta: '' }); }}
                  style={{
                    border: 'none',
                    background: '#ef4444',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                  }}
                  aria-label="Remove button"
                >
                  x
                </button>
              </div>
            ) : (
              <a href="#" className="contact-btn"><span>{navbar.cta}</span></a>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

const componentGroups = [
  {
    label: 'Content',
    items: [
      { type: 'text', label: 'Text' },
      { type: 'badge', label: 'Badge' },
      { type: 'button', label: 'Button' },
      { type: 'input', label: 'Input' }
    ]
  },
  {
    label: 'Layout',
    items: [
      { type: 'box', label: 'Box' },
      { type: 'circle', label: 'Circle' },
      { type: 'divider', label: 'Divider' },
      { type: 'spacer', label: 'Spacer' }
    ]
  },
  {
    label: 'Media',
    items: [
      { type: 'image', label: 'Image/GIF' },
      { type: 'video', label: 'Video' }
    ]
  }
];

function EditorSection({
  section,
  editing,
  selectedId,
  onSelect,
  onAddElement,
  onUpdate,
  onTextUpdate,
  onDelete,
  onUpdateSection,
  onDuplicateSection,
  onMoveSection,
  onDeleteSection,
  snapToGrid,
  showGrid,
  gridSize
}) {
  const sectionRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  function uploadSectionImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpdateSection(section.id, { backgroundImage: reader.result });
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  function startSectionResize(event) {
    event.preventDefault();
    event.stopPropagation();
    const rect = sectionRef.current.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = section.maxWidth || Math.round(rect.width);
    const startHeight = section.height || Math.round(rect.height);
    function move(e) {
      onUpdateSection(section.id, {
        widthMode: 'contained',
        maxWidth: Math.max(320, Math.round(startWidth + e.clientX - startX)),
        height: Math.max(260, Math.round(startHeight + e.clientY - startY))
      });
    }
    function done() {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  function startSectionMove(event) {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const startOffsetX = section.offsetX || 0;
    const startOffsetY = section.offsetY || 0;
    function move(e) {
      onUpdateSection(section.id, {
        offsetX: Math.round(startOffsetX + e.clientX - startX),
        offsetY: Math.round(startOffsetY + e.clientY - startY)
      });
    }
    function done() {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  function startSectionRotate(event) {
    event.preventDefault();
    event.stopPropagation();
    const rect = sectionRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    function move(e) {
      const degrees = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI + 90;
      onUpdateSection(section.id, { rotation: Math.round(degrees) });
    }
    function done() {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  const sectionWidth = section.widthMode === 'full'
    ? '100%'
    : `min(${section.maxWidth || 1180}px, calc(100vw - ${(section.paddingX ?? 20) * 2}px))`;
  const sectionStyle = {
    width: sectionWidth,
    margin: `${section.marginY ?? 28}px auto`,
    boxSizing: 'border-box',
    transform: `translate(${section.offsetX || 0}px, ${section.offsetY || 0}px) rotate(${section.rotation || 0}deg)`,
    transformOrigin: 'center',
    minHeight: `${section.height || 620}px`,
    paddingTop: `${section.paddingY || 0}px`,
    paddingBottom: `${section.paddingY || 0}px`,
    borderRadius: `${section.radius ?? 24}px`,
    borderWidth: `${section.borderWidth ?? 1}px`,
    borderColor: section.borderColor || undefined,
    borderStyle: (section.borderWidth ?? 1) > 0 ? 'solid' : 'none',
    boxShadow: shadows[section.shadow || 'xl'] || shadows.xl,
    opacity: section.opacity ?? 1,
    filter: `blur(${section.blur || 0}px)`,
    backdropFilter: `blur(${section.backdropBlur ?? 18}px) saturate(145%)`,
    WebkitBackdropFilter: `blur(${section.backdropBlur ?? 18}px) saturate(145%)`,
    overflow: section.overflow || 'hidden',
    backgroundColor: section.backgroundColor || undefined,
    backgroundImage: editing && showGrid
      ? `${section.backgroundGradient ? `${section.backgroundGradient}, ` : ''}linear-gradient(rgba(0,123,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,123,255,.12) 1px, transparent 1px)${section.backgroundImage ? `, url(${section.backgroundImage})` : ''}`
      : section.backgroundGradient || (section.backgroundImage ? `url(${section.backgroundImage})` : undefined),
    backgroundSize: editing && showGrid
      ? `${section.backgroundGradient ? 'cover, ' : ''}var(--grid-size) var(--grid-size), var(--grid-size) var(--grid-size)${section.backgroundImage ? `, ${section.backgroundSize || 'cover'}` : ''}`
      : section.backgroundSize || 'cover',
    backgroundPosition: section.backgroundPosition || 'center',
    backgroundRepeat: section.backgroundRepeat || 'no-repeat',
    backgroundAttachment: section.parallax ? 'fixed' : 'scroll',
    '--grid-size': `${gridSize || 10}px`
  };

  return (
    <main ref={sectionRef} className={`workspace ${editing ? 'drawing-mode' : ''}`} style={sectionStyle} onMouseDown={() => editing && onSelect(null)}>
      <SectionDivider type={section.dividerType} position={section.dividerPosition === 'top' || section.dividerPosition === 'both' ? 'top' : 'none'} color={section.dividerColor} height={section.dividerHeight} />
      <SectionDivider type={section.dividerType} position={section.dividerPosition === 'bottom' || section.dividerPosition === 'both' ? 'bottom' : 'none'} color={section.dividerColor} height={section.dividerHeight} />
      {editing && (
        <>
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*,.gif"
            style={{ display: 'none' }}
            onChange={e => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => onAddElement(section.id, 'image', { imageSrc: reader.result });
              reader.readAsDataURL(file);
              e.target.value = '';
            }}
          />
          <input
            type="file"
            ref={videoInputRef}
            accept="video/*"
            style={{ display: 'none' }}
            onChange={e => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => onAddElement(section.id, 'video', { imageSrc: reader.result });
              reader.readAsDataURL(file);
              e.target.value = '';
            }}
          />
        </>
      )}
      <div className="section-label">{section.name}</div>
      {editing && (
        <div className="container-tools compact-section-tools">
          <span className="section-toolbar-title">{section.name}</span>
          <details className="compact-editor-menu">
            <summary>Add</summary>
            <div className="compact-editor-panel component-library" aria-label="Component library">
              {componentGroups.map(group => (
                <div className="component-group" key={group.label}>
                  <span className="component-group-label">{group.label}</span>
                  <div className="component-buttons">
                    {group.items.map(item => (
                      <button
                        key={item.type}
                        className="tool-btn component-btn"
                        onClick={() => {
                          if (item.type === 'image') {
                            imageInputRef.current?.click();
                          } else if (item.type === 'video') {
                            videoInputRef.current?.click();
                          } else {
                            onAddElement(section.id, item.type);
                          }
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>
          <details className="compact-editor-menu">
            <summary>Section</summary>
            <div className="compact-editor-panel section-settings-panel">
              <label>
                Name
                <input
                  className="section-name-input"
                  value={section.name}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { name: event.target.value })}
                  aria-label="Section name"
                />
              </label>
              <label>
                Height
                <input
                  type="number"
                  min="260"
                  max="1400"
                  value={section.height || 620}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { height: Number(event.target.value) })}
                />
              </label>
              <label>
                Width
                <select
                  value={section.widthMode || 'contained'}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { widthMode: event.target.value })}
                >
                  <option value="contained">Contained</option>
                  <option value="full">Full screen</option>
                </select>
              </label>
              <label>
                Max width
                <input
                  type="number"
                  min="320"
                  max="1800"
                  value={section.maxWidth || 1180}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { maxWidth: Number(event.target.value) })}
                />
              </label>
              <label>
                Side gap
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={section.paddingX ?? 20}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { paddingX: Number(event.target.value) })}
                />
              </label>
              <label>
                Top/bottom padding
                <input
                  type="number"
                  min="0"
                  max="180"
                  value={section.paddingY || 0}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { paddingY: Number(event.target.value) })}
                />
              </label>
              <label>
                Section gap
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={section.marginY ?? 28}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { marginY: Number(event.target.value) })}
                />
              </label>
              <label>
                Move X
                <input
                  type="number"
                  min="-2000"
                  max="2000"
                  value={section.offsetX || 0}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { offsetX: Number(event.target.value) })}
                />
              </label>
              <label>
                Move Y
                <input
                  type="number"
                  min="-2000"
                  max="2000"
                  value={section.offsetY || 0}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { offsetY: Number(event.target.value) })}
                />
              </label>
              <label>
                Corners
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={section.radius ?? 24}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { radius: Number(event.target.value) })}
                />
              </label>
              <label>
                Rotate
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={section.rotation || 0}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { rotation: Number(event.target.value) })}
                />
              </label>
              <label>
                Border px
                <input
                  type="number"
                  min="0"
                  max="16"
                  value={section.borderWidth ?? 1}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { borderWidth: Number(event.target.value) })}
                />
              </label>
              <label>
                Border color
                <input
                  type="color"
                  value={colorInputValue(section.borderColor, '#ffffff')}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { borderColor: event.target.value })}
                />
              </label>
              <label>
                Shadow
                <select
                  value={section.shadow || 'xl'}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { shadow: event.target.value })}
                >
                  {Object.keys(shadows).map(shadow => <option key={shadow} value={shadow}>{shadow}</option>)}
                </select>
              </label>
              <label>
                Opacity
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={section.opacity ?? 1}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { opacity: Number(event.target.value) })}
                />
              </label>
              <label>
                Backdrop blur
                <input
                  type="range"
                  min="0"
                  max="64"
                  value={section.backdropBlur ?? 18}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { backdropBlur: Number(event.target.value) })}
                />
              </label>
              <label>
                Overflow
                <select
                  value={section.overflow || 'hidden'}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { overflow: event.target.value })}
                >
                  <option value="hidden">Clip</option>
                  <option value="visible">Visible</option>
                  <option value="auto">Scroll</option>
                </select>
              </label>
              <label>
                Background
                <input
                  type="color"
                  value={colorInputValue(section.backgroundColor, '#fbf8f1')}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { backgroundColor: event.target.value })}
                />
              </label>
              <label>
                BG image
                <input
                  type="file"
                  accept="image/*,.gif"
                  onMouseDown={event => event.stopPropagation()}
                  onChange={uploadSectionImage}
                />
              </label>
              <label>
                BG URL
                <input
                  value={section.backgroundImage?.startsWith('data:') ? '' : section.backgroundImage || ''}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { backgroundImage: event.target.value })}
                  placeholder="https://..."
                />
              </label>
              <label>
                BG size
                <select
                  value={section.backgroundSize || 'cover'}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { backgroundSize: event.target.value })}
                >
                  <option value="cover">Cover</option>
                  <option value="contain">Contain</option>
                  <option value="auto">Auto</option>
                  <option value="100% 100%">Stretch</option>
                </select>
              </label>
              <label>
                BG position
                <select
                  value={section.backgroundPosition || 'center'}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { backgroundPosition: event.target.value })}
                >
                  <option value="center">Center</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="top left">Top left</option>
                  <option value="top right">Top right</option>
                  <option value="bottom left">Bottom left</option>
                  <option value="bottom right">Bottom right</option>
                </select>
              </label>
              <label>
                BG repeat
                <select
                  value={section.backgroundRepeat || 'no-repeat'}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { backgroundRepeat: event.target.value })}
                >
                  <option value="no-repeat">No repeat</option>
                  <option value="repeat">Repeat</option>
                  <option value="repeat-x">Repeat X</option>
                  <option value="repeat-y">Repeat Y</option>
                </select>
              </label>
              <label>
                Parallax
                <input
                  type="checkbox"
                  checked={!!section.parallax}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { parallax: event.target.checked })}
                />
              </label>
              <label>
                Divider Type
                <select
                  value={section.dividerType || 'none'}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { dividerType: event.target.value })}
                >
                  <option value="none">None</option>
                  <option value="waves">Waves</option>
                  <option value="slanted">Slanted</option>
                  <option value="curved">Curved</option>
                </select>
              </label>
              <label>
                Divider Position
                <select
                  value={section.dividerPosition || 'none'}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { dividerPosition: event.target.value })}
                >
                  <option value="none">None</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="both">Both</option>
                </select>
              </label>
              <label>
                Divider Height
                <input
                  type="range"
                  min="20"
                  max="300"
                  value={section.dividerHeight || 80}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { dividerHeight: Number(event.target.value) })}
                />
              </label>
              <label>
                Divider Color
                <input
                  type="color"
                  value={colorInputValue(section.dividerColor, '#ffffff')}
                  onMouseDown={event => event.stopPropagation()}
                  onChange={event => onUpdateSection(section.id, { dividerColor: event.target.value })}
                />
              </label>
              <select
                className="section-select-control"
                value={section.backgroundGradient || ''}
                onMouseDown={event => event.stopPropagation()}
                onChange={event => onUpdateSection(section.id, { backgroundGradient: event.target.value })}
                aria-label="Section gradient"
              >
                <option value="">No gradient</option>
                <option value="linear-gradient(135deg, #ffffff, #eff6ff)">Soft blue</option>
                <option value="linear-gradient(135deg, #ffffff, #f8fafc 45%, #e0f2fe)">Clean sky</option>
                <option value="linear-gradient(135deg, #111827, #1d4ed8)">Dark premium</option>
                <option value="radial-gradient(circle at 20% 20%, #dbeafe, #ffffff 45%, #f8fafc)">Radial light</option>
              </select>
              <div className="section-action-group">
                <button className="tool-btn" onClick={() => onUpdateSection(section.id, { widthMode: 'full', radius: 0, maxWidth: 1800 })}>Full</button>
                <button className="tool-btn" onClick={() => onUpdateSection(section.id, { widthMode: 'contained', radius: 24, maxWidth: 1180, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#ffffff', shadow: 'xl', backdropBlur: 18 })}>Card</button>
                <button className="tool-btn" onMouseDown={startSectionMove}>Hold Move</button>
                <button className="tool-btn" onClick={() => onUpdateSection(section.id, { offsetX: 0, offsetY: 0 })}>Reset Move</button>
                <button className="tool-btn" onMouseDown={startSectionRotate}>Hold Rotate</button>
                <button className="tool-btn" onClick={() => onUpdateSection(section.id, { rotation: 0 })}>Reset Rotate</button>
                <button className="tool-btn" onClick={() => onUpdateSection(section.id, { backgroundColor: 'transparent', backgroundImage: '', backgroundGradient: '', borderWidth: 0, shadow: 'none' })}>Clear BG</button>
                <button className="tool-btn" onClick={() => onDuplicateSection(section.id)}>Duplicate</button>
                <button className="tool-btn" onClick={() => onMoveSection(section.id, -1)}>Move Up</button>
                <button className="tool-btn" onClick={() => onMoveSection(section.id, 1)}>Move Down</button>
                <button className="tool-btn btn-delete-section" onClick={() => onDeleteSection(section.id)}>Delete</button>
              </div>
            </div>
          </details>
        </div>
      )}
      {editing && <span className="section-move-handle" title="Hold and drag to move section" onMouseDown={startSectionMove} />}
      {editing && <span className="section-rotate-handle" title="Hold and drag to rotate section" onMouseDown={startSectionRotate} />}
      {editing && <span className="section-resize-handle" title="Resize section" onMouseDown={startSectionResize} />}
      {section.elements.map(item => (
        <EditableElement
          key={item.id}
          sectionId={section.id}
          item={item}
          editing={editing}
          selected={selectedId === item.id}
          onSelect={onSelect}
          onUpdate={onUpdate}
          onTextUpdate={onTextUpdate}
          onDelete={onDelete}
          snapToGrid={snapToGrid}
          gridSize={gridSize}
        />
      ))}
    </main>
  );
}

function EditableElement({ sectionId, item, editing, selected, onSelect, onUpdate, onTextUpdate, onDelete, snapToGrid, gridSize }) {
  const ref = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  useEffect(() => {
    if (editing) {
      setTiltStyle({});
    }
  }, [editing]);

  function handleMouseMove(e) {
    if (editing || !ref.current) return;
    if (item.hoverEffect === 'tilt') {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const maxTilt = 15;
      const rotateY = ((x - xc) / xc) * maxTilt;
      const rotateX = -((y - yc) / yc) * maxTilt;
      setTiltStyle({
        transform: `perspective(${item.perspective || 900}px) rotate(${item.rotation || 0}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateZ(${item.translateZ || 0}px)`,
        transition: 'transform 0.05s ease',
        transformStyle: 'preserve-3d',
        zIndex: (item.zIndex || 1) + 10
      });
    } else if (item.hoverEffect === 'magnetic') {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const pullX = (x / (rect.width / 2)) * 15;
      const pullY = (y / (rect.height / 2)) * 15;
      setTiltStyle({
        transform: `perspective(${item.perspective || 900}px) rotate(${item.rotation || 0}deg) translate(${pullX}px, ${pullY}px) scale(1.03)`,
        transition: 'transform 0.1s ease-out',
        zIndex: (item.zIndex || 1) + 10
      });
    }
  }

  function handleMouseLeave() {
    if (editing) return;
    if (item.hoverEffect === 'tilt' || item.hoverEffect === 'magnetic') {
      setTiltStyle({
        transform: `perspective(${item.perspective || 900}px) rotate(${item.rotation || 0}deg) rotateX(${item.rotateX || 0}deg) rotateY(${item.rotateY || 0}deg) translateZ(${item.translateZ || 0}px) scale(${item.scale || 1}) skew(${item.skewX || 0}deg, ${item.skewY || 0}deg)`,
        transition: 'transform 0.3s ease'
      });
    }
  }

  const snap = value => snapToGrid ? Math.round(value / gridSize) * gridSize : value;

  function applyQuickLink(mode) {
    const current = item.link || (mode === 'route' ? '/' : 'https://');
    const label = mode === 'route' ? 'React route path' : 'Website URL';
    const nextLink = window.prompt(`${label} for this ${item.type}`, current);
    if (nextLink === null) return;
    onUpdate(sectionId, item.id, {
      isButton: true,
      linkMode: mode,
      link: nextLink.trim()
    });
  }

  function clearQuickLink() {
    onUpdate(sectionId, item.id, {
      isButton: false,
      link: '',
      linkMode: 'url'
    });
  }

  function uploadInlineImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpdate(sectionId, item.id, {
      type: 'image',
      imageSrc: reader.result,
      textLayers: [],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
      shadow: 'none'
    });
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  function openElementLink() {
    if (!item.isButton || !item.link) return;
    const target = item.link.trim();
    if (!target) return;
    if (item.linkMode === 'route' || target.startsWith('/')) {
      window.history.pushState({}, '', target);
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }
    window.open(target, '_blank', 'noopener,noreferrer');
  }

  function fitTextToCard(textEl, layer) {
    if (item.type !== 'text' || !textEl) return;
    const baseSize = layer.baseFontSize || layer.fontSize || 32;
    let nextSize = baseSize;
    textEl.style.fontSize = `${nextSize}px`;
    const maxSteps = 40;
    let steps = 0;
    while ((textEl.scrollWidth > textEl.clientWidth || textEl.scrollHeight > textEl.clientHeight) && nextSize > 10 && steps < maxSteps) {
      nextSize -= 1;
      textEl.style.fontSize = `${nextSize}px`;
      steps += 1;
    }
  }

  useEffect(() => {
    if (item.type !== 'text') return;
    ref.current?.querySelectorAll('.element-text-content').forEach((textEl, index) => {
      fitTextToCard(textEl, item.textLayers[index] || {});
    });
  }, [item.type, item.width, item.height, item.textLayers]);

  function startDrag(event) {
    if (!editing || item.locked || event.target.closest('button,input,select,textarea,label,.resize-handle,.rotate-handle,.element-text-content')) return;
    event.preventDefault();
    event.stopPropagation();
    onSelect(item.id);
    const startX = event.clientX;
    const startY = event.clientY;
    const startLeft = item.left;
    const startTop = item.top;

    function move(e) {
      onUpdate(sectionId, item.id, {
        left: snap(startLeft + e.clientX - startX),
        top: snap(startTop + e.clientY - startY)
      });
    }
    function done() {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  function startResize(event) {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = item.width;
    const startHeight = item.height;
    function move(e) {
      onUpdate(sectionId, item.id, {
        width: Math.max(70, snap(startWidth + e.clientX - startX)),
        height: Math.max(44, snap(startHeight + e.clientY - startY))
      });
    }
    function done() {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  function startRotate(event) {
    event.preventDefault();
    event.stopPropagation();
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    function move(e) {
      const degrees = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI + 90;
      onUpdate(sectionId, item.id, { rotation: Math.round(degrees) });
    }
    function done() {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', done);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', done);
  }

  const style = {
    left: item.left,
    top: item.top,
    width: item.width,
    height: item.height,
    transform: `perspective(${item.perspective || 900}px) rotate(${item.rotation || 0}deg) rotateX(${item.rotateX || 0}deg) rotateY(${item.rotateY || 0}deg) translateZ(${item.translateZ || 0}px) scale(${item.scale || 1}) skew(${item.skewX || 0}deg, ${item.skewY || 0}deg)`,
    transformStyle: 'preserve-3d',
    zIndex: item.zIndex || 1,
    opacity: item.opacity ?? 1,
    backgroundColor: item.backgroundColor || undefined,
    borderColor: item.borderColor || undefined,
    borderWidth: `${item.borderWidth ?? 2}px`,
    borderStyle: item.borderStyle || 'solid',
    borderRadius: item.radius || 0,
    padding: `${item.padding || 0}px`,
    filter: `blur(${item.blur || 0}px) brightness(${item.brightness || 100}%) contrast(${item.contrast || 100}%) saturate(${item.saturate || 100}%) grayscale(${item.grayscale || 0}%) hue-rotate(${item.hueRotate || 0}deg) invert(${item.invert || 0}%) sepia(${item.sepia || 0}%) drop-shadow(0 ${item.dropShadow || 0}px ${Math.max(0, (item.dropShadow || 0) * 2)}px rgba(15, 23, 42, 0.28))`,
    backdropFilter: `blur(${item.backdropBlur || 0}px)`,
    WebkitBackdropFilter: `blur(${item.backdropBlur || 0}px)`,
    boxShadow: shadows[item.shadow || 'none'] || item.shadow || 'none',
    mixBlendMode: item.mixBlendMode || 'normal',
    clipPath: clipPathFor(item.clipShape),
    cursor: item.cursor || undefined,
    animationDuration: `${item.animationDuration || 0.8}s`,
    animationDelay: `${item.animationDelay || 0}s`
  };

  return (
    <div
      ref={ref}
      className={`sandbox-element react-element ${item.type === 'image' ? 'section-image-block' : ''} ${selected ? 'selected' : ''} ${item.locked ? 'is-locked' : ''} anim-${item.animation || 'none'} hover-${item.hoverEffect || 'none'}`}
      style={{ ...style, ...tiltStyle }}
      data-type={item.type}
      onMouseDown={startDrag}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={event => {
        event.stopPropagation();
        if (!editing) openElementLink();
      }}
    >
      {item.type === 'image' && item.imageSrc && <img className="element-img" src={item.imageSrc} alt="" style={{ objectFit: item.objectFit || 'cover', objectPosition: item.objectPosition || 'center' }} />}
      {item.textLayers.map(txt => (
        <div
          key={txt.id}
          className={`element-text-content text-anim-${txt.textAnimation || 'none'} ${txt.textAnimationLoop ? 'text-anim-loop' : ''}`}
          contentEditable={editing && !item.locked}
          suppressContentEditableWarning
          style={{
            left: txt.left,
            top: txt.top,
            width: txt.width,
            height: txt.height,
            fontSize: txt.fontSize,
            fontWeight: txt.fontWeight,
            fontFamily: txt.fontFamily,
            color: txt.color,
            textAlign: txt.textAlign || 'left',
            lineHeight: txt.lineHeight || 1.15,
            letterSpacing: `${txt.letterSpacing || 0}px`,
            textTransform: txt.textTransform || 'none',
            textShadow: txt.textShadow || 'none',
            animationDuration: `${txt.textAnimationDuration || 1.2}s`,
            animationDelay: `${txt.textAnimationDelay || 0}s`
          }}
          onBlur={event => onTextUpdate(sectionId, item.id, txt.id, { text: event.currentTarget.textContent })}
          onInput={event => fitTextToCard(event.currentTarget, txt)}
        >
          {txt.text}
        </div>
      ))}
      {editing && selected && !item.locked && (
        <>
          <div className="card-mini-toolbar" onMouseDown={event => event.stopPropagation()}>
            <span className="card-mini-label">{item.type}</span>
            <button type="button" title="Move this card">Move</button>
            <button type="button" title="Hold and drag to rotate" onMouseDown={startRotate}>Rotate</button>
            <button type="button" title="Reset rotation" onClick={() => onUpdate(sectionId, item.id, { rotation: 0 })}>0 deg</button>
            <button type="button" title="Add or edit a normal URL" onClick={() => applyQuickLink('url')}>Link</button>
            <button type="button" title="Add or edit a React route path" onClick={() => applyQuickLink('route')}>Route</button>
            {item.isButton && item.link && (
              <button type="button" title="Remove link or route" onClick={clearQuickLink}>Unlink</button>
            )}
            {item.type === 'image' && (
              <label className="card-mini-file" title="Replace image or GIF">
                Image
                <input type="file" accept="image/*,.gif" onChange={uploadInlineImage} />
              </label>
            )}
            <button
              type="button"
              className="danger"
              title="Delete this card"
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                onDelete(sectionId, item.id);
              }}
            >
              Delete
            </button>
          </div>
          <span className="rotate-handle rotate-handle-top" title="Hold and drag to rotate" onMouseDown={startRotate} />
          <span className="rotate-handle rotate-handle-left" title="Hold and drag to rotate" onMouseDown={startRotate} />
          <span className="rotate-handle rotate-handle-right" title="Hold and drag to rotate" onMouseDown={startRotate} />
          <span className="rotate-handle rotate-handle-bottom" title="Hold and drag to rotate" onMouseDown={startRotate} />
          <span className="resize-handle" onMouseDown={startResize} />
        </>
      )}
    </div>
  );
}

function Inspector({ selected, onUpdate, onTextUpdate, onPreset, onDelete }) {
  const firstText = selected.textLayers[0];

  function uploadImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpdate({ type: 'image', imageSrc: reader.result, textLayers: [] });
    reader.readAsDataURL(file);
  }

  return (
    <aside className="react-inspector">
      <datalist id="level-scale">
        <option value="-100" label="-100" />
        <option value="0" label="0" />
        <option value="100" label="+100" />
      </datalist>
      <div className="inspector-title">Edit selected</div>
      <div className="inspector-actions preset-actions">
        <button onClick={() => onPreset('cleanCard')}>Card</button>
        <button onClick={() => onPreset('glass')}>Glass</button>
        <button onClick={() => onPreset('glowButton')}>Glow</button>
        <button onClick={() => onPreset('ghost')}>Clear</button>
      </div>
      <button className="inspector-delete-btn" onClick={onDelete}>Delete Selected</button>
      <div className="inspector-grid">
        <label>X <input type="number" value={Math.round(selected.left)} onChange={e => onUpdate({ left: Number(e.target.value) })} /></label>
        <label>Y <input type="number" value={Math.round(selected.top)} onChange={e => onUpdate({ top: Number(e.target.value) })} /></label>
      </div>
      <label>Width <input type="number" value={selected.width} onChange={e => onUpdate({ width: Number(e.target.value) })} /></label>
      <label>Height <input type="number" value={selected.height} onChange={e => onUpdate({ height: Number(e.target.value) })} /></label>
      <div className="inspector-title">3D transform</div>
      <label>Rotate level <input type="range" min="-100" max="100" list="level-scale" value={selected.rotation || 0} onChange={e => onUpdate({ rotation: Number(e.target.value) })} /></label>
      <div className="inspector-grid">
        <label>Rotate X <input type="number" min="-100" max="100" value={selected.rotateX || 0} onChange={e => onUpdate({ rotateX: Number(e.target.value) })} /></label>
        <label>Rotate Y <input type="number" min="-100" max="100" value={selected.rotateY || 0} onChange={e => onUpdate({ rotateY: Number(e.target.value) })} /></label>
      </div>
      <div className="inspector-grid">
        <label>Z depth <input type="number" min="-100" max="100" value={selected.translateZ || 0} onChange={e => onUpdate({ translateZ: Number(e.target.value) })} /></label>
        <label>Perspective <input type="number" min="120" max="3000" value={selected.perspective || 900} onChange={e => onUpdate({ perspective: Number(e.target.value) })} /></label>
      </div>
      <div className="inspector-grid">
        <label>Scale <input type="number" min="0.2" max="3" step="0.05" value={selected.scale || 1} onChange={e => onUpdate({ scale: Number(e.target.value) })} /></label>
        <label>Skew X <input type="number" min="-100" max="100" value={selected.skewX || 0} onChange={e => onUpdate({ skewX: Number(e.target.value) })} /></label>
      </div>
      <label>Skew Y level <input type="range" min="-100" max="100" list="level-scale" value={selected.skewY || 0} onChange={e => onUpdate({ skewY: Number(e.target.value) })} /></label>
      <div className="inspector-actions">
        <button onClick={() => onUpdate({ rotateX: 0, rotateY: 0, translateZ: 0, perspective: 900, scale: 1, skewX: 0, skewY: 0 })}>Reset 3D</button>
        <button onClick={() => onUpdate({ rotateX: 8, rotateY: -12, perspective: 700, translateZ: 18, shadow: '2xl' })}>3D Card</button>
      </div>
      <div className="inspector-grid">
        <label>Layer <input type="number" min="1" value={selected.zIndex || 1} onChange={e => onUpdate({ zIndex: Number(e.target.value) })} /></label>
        <label>Opacity <input type="number" min="0" max="1" step="0.05" value={selected.opacity ?? 1} onChange={e => onUpdate({ opacity: Number(e.target.value) })} /></label>
      </div>
      <label>Opacity slider <input type="range" min="0" max="1" step="0.05" value={selected.opacity ?? 1} onChange={e => onUpdate({ opacity: Number(e.target.value) })} /></label>
      <div className="inspector-title">Tailwind-style effects</div>
      <label>Blur <input type="range" min="0" max="64" value={selected.blur || 0} onChange={e => onUpdate({ blur: Number(e.target.value) })} /></label>
      <label>Backdrop blur <input type="range" min="0" max="64" value={selected.backdropBlur || 0} onChange={e => onUpdate({ backdropBlur: Number(e.target.value) })} /></label>
      <label>Brightness level <input type="range" min="-100" max="100" list="level-scale" value={effectLevel(selected.brightness)} onChange={e => onUpdate({ brightness: effectValue(e.target.value) })} /></label>
      <label>Contrast level <input type="range" min="-100" max="100" list="level-scale" value={effectLevel(selected.contrast)} onChange={e => onUpdate({ contrast: effectValue(e.target.value) })} /></label>
      <label>Saturation level <input type="range" min="-100" max="100" list="level-scale" value={effectLevel(selected.saturate)} onChange={e => onUpdate({ saturate: effectValue(e.target.value) })} /></label>
      <label>Grayscale <input type="range" min="0" max="100" value={selected.grayscale || 0} onChange={e => onUpdate({ grayscale: Number(e.target.value) })} /></label>
      <label>Hue rotate <input type="range" min="0" max="360" value={selected.hueRotate || 0} onChange={e => onUpdate({ hueRotate: Number(e.target.value) })} /></label>
      <label>Invert <input type="range" min="0" max="100" value={selected.invert || 0} onChange={e => onUpdate({ invert: Number(e.target.value) })} /></label>
      <label>Sepia <input type="range" min="0" max="100" value={selected.sepia || 0} onChange={e => onUpdate({ sepia: Number(e.target.value) })} /></label>
      <label>Drop shadow <input type="range" min="0" max="50" value={selected.dropShadow || 0} onChange={e => onUpdate({ dropShadow: Number(e.target.value) })} /></label>
      <label>Shadow
        <select value={selected.shadow || 'none'} onChange={e => onUpdate({ shadow: e.target.value })}>
          {Object.keys(shadows).map(shadow => <option key={shadow} value={shadow}>{shadow}</option>)}
        </select>
      </label>
      <label>Blend mode
        <select value={selected.mixBlendMode || 'normal'} onChange={e => onUpdate({ mixBlendMode: e.target.value })}>
          {blendModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
        </select>
      </label>
      <div className="inspector-title">Box style</div>
      <label>Background <input type="color" value={colorInputValue(selected.backgroundColor, '#ffffff')} onChange={e => onUpdate({ backgroundColor: e.target.value })} /></label>
      <label>Border <input type="color" value={colorInputValue(selected.borderColor, '#111111')} onChange={e => onUpdate({ borderColor: e.target.value })} /></label>
      <div className="inspector-grid">
        <label>Border px <input type="number" min="0" max="16" value={selected.borderWidth ?? 2} onChange={e => onUpdate({ borderWidth: Number(e.target.value) })} /></label>
        <label>Padding <input type="number" min="0" max="80" value={selected.padding || 0} onChange={e => onUpdate({ padding: Number(e.target.value) })} /></label>
      </div>
      <label>Border style
        <select value={selected.borderStyle || 'solid'} onChange={e => onUpdate({ borderStyle: e.target.value })}>
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
          <option value="none">None</option>
        </select>
      </label>
      <label>Corner radius <input type="range" min="0" max="40" value={selected.radius || 0} onChange={e => onUpdate({ radius: Number(e.target.value) })} /></label>
      <label>Tailwind class notes <input readOnly value={`opacity-${Math.round((selected.opacity ?? 1) * 100)} blur-[${selected.blur || 0}px] backdrop-blur-[${selected.backdropBlur || 0}px] shadow-${selected.shadow || 'none'}`} /></label>
      <label>Animation
        <select value={selected.animation || 'none'} onChange={e => onUpdate({ animation: e.target.value })}>
          {animations.map(animation => <option key={animation.value} value={animation.value}>{animation.label}</option>)}
        </select>
      </label>
      <label>Hover effect
        <select value={selected.hoverEffect || 'none'} onChange={e => onUpdate({ hoverEffect: e.target.value })}>
          {hoverEffects.map(effect => <option key={effect} value={effect}>{effect}</option>)}
        </select>
      </label>
      <div className="inspector-grid">
        <label>Anim sec <input type="number" min="0.1" max="10" step="0.1" value={selected.animationDuration || 0.8} onChange={e => onUpdate({ animationDuration: Number(e.target.value) })} /></label>
        <label>Delay <input type="number" min="0" max="10" step="0.1" value={selected.animationDelay || 0} onChange={e => onUpdate({ animationDelay: Number(e.target.value) })} /></label>
      </div>
      <label>Clip shape
        <select value={selected.clipShape || 'none'} onChange={e => onUpdate({ clipShape: e.target.value })}>
          {clipShapes.map(shape => <option key={shape} value={shape}>{shape}</option>)}
        </select>
      </label>
      <label>Cursor
        <select value={selected.cursor || 'default'} onChange={e => onUpdate({ cursor: e.target.value })}>
          {['default', 'pointer', 'grab', 'help', 'move', 'not-allowed', 'zoom-in'].map(cursor => <option key={cursor} value={cursor}>{cursor}</option>)}
        </select>
      </label>
      <label><input type="checkbox" checked={!!selected.locked} onChange={e => onUpdate({ locked: e.target.checked })} /> Lock position</label>
      <label><input type="checkbox" checked={!!selected.isButton} onChange={e => onUpdate({ isButton: e.target.checked, type: e.target.checked ? 'button' : selected.type })} /> Button link</label>
      {selected.isButton && (
        <>
          <label>Link type
            <select value={selected.linkMode || 'url'} onChange={e => onUpdate({ linkMode: e.target.value })}>
              <option value="url">URL</option>
              <option value="route">React route</option>
            </select>
          </label>
          <label>{(selected.linkMode || 'url') === 'route' ? 'Route' : 'URL'} <input value={selected.link || ''} onChange={e => onUpdate({ link: e.target.value })} placeholder={(selected.linkMode || 'url') === 'route' ? '/about' : 'https://example.com'} /></label>
        </>
      )}
      <label>Image/GIF <input type="file" accept="image/*,.gif" onChange={uploadImage} /></label>
      <label>Image/GIF URL <input value={selected.imageSrc?.startsWith('data:') ? '' : selected.imageSrc || ''} onChange={e => onUpdate({ type: 'image', imageSrc: e.target.value, textLayers: [] })} placeholder="https://..." /></label>
      <div className="inspector-grid">
        <label>Image fit
          <select value={selected.objectFit || 'cover'} onChange={e => onUpdate({ objectFit: e.target.value })}>
            {objectFits.map(fit => <option key={fit} value={fit}>{fit}</option>)}
          </select>
        </label>
        <label>Position
          <select value={selected.objectPosition || 'center'} onChange={e => onUpdate({ objectPosition: e.target.value })}>
            {['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'].map(position => <option key={position} value={position}>{position}</option>)}
          </select>
        </label>
      </div>
      <div className="inspector-actions">
        <button onClick={() => onUpdate({ backgroundColor: 'transparent', borderColor: 'transparent' })}>No fill/border</button>
        <button onClick={() => onUpdate({ textLayers: [...(selected.textLayers || []), textLayer('New text', { top: 20 + (selected.textLayers?.length || 0) * 42 })] })}>Add text layer</button>
      </div>

      {firstText && (
        <>
          <div className="inspector-title">Text</div>
          <label>Size <input type="range" min="10" max="80" value={firstText.baseFontSize || firstText.fontSize} onChange={e => onTextUpdate(firstText.id, { fontSize: Number(e.target.value), baseFontSize: Number(e.target.value) })} /></label>
          <label>Weight
            <select value={firstText.fontWeight} onChange={e => onTextUpdate(firstText.id, { fontWeight: e.target.value })}>
              <option value="300">Light</option>
              <option value="400">Regular</option>
              <option value="700">Bold</option>
              <option value="900">Black</option>
            </select>
          </label>
          <label>Font
            <select value={firstText.fontFamily} onChange={e => onTextUpdate(firstText.id, { fontFamily: e.target.value })}>
              {fonts.map(font => <option key={font} value={font}>{font.split(',')[0].replaceAll("'", '')}</option>)}
            </select>
          </label>
          <label>Color <input type="color" value={firstText.color} onChange={e => onTextUpdate(firstText.id, { color: e.target.value })} /></label>
          <label>Align
            <select value={firstText.textAlign || 'left'} onChange={e => onTextUpdate(firstText.id, { textAlign: e.target.value })}>
              {['left', 'center', 'right', 'justify'].map(align => <option key={align} value={align}>{align}</option>)}
            </select>
          </label>
          <div className="inspector-grid">
            <label>Line <input type="number" min="0.8" max="3" step="0.05" value={firstText.lineHeight || 1.15} onChange={e => onTextUpdate(firstText.id, { lineHeight: Number(e.target.value) })} /></label>
            <label>Spacing <input type="number" min="-2" max="12" step="0.5" value={firstText.letterSpacing || 0} onChange={e => onTextUpdate(firstText.id, { letterSpacing: Number(e.target.value) })} /></label>
          </div>
          <label>Transform
            <select value={firstText.textTransform || 'none'} onChange={e => onTextUpdate(firstText.id, { textTransform: e.target.value })}>
              {['none', 'uppercase', 'lowercase', 'capitalize'].map(transform => <option key={transform} value={transform}>{transform}</option>)}
            </select>
          </label>
          <label>Text shadow
            <select value={firstText.textShadow || 'none'} onChange={e => onTextUpdate(firstText.id, { textShadow: e.target.value })}>
              <option value="none">none</option>
              <option value="1px 1px 0 rgba(17,24,39,.18)">soft</option>
              <option value="2px 2px 0 #111111">hard</option>
              <option value="0 0 14px rgba(0,123,255,.65)">glow</option>
            </select>
          </label>
          <div className="inspector-title">Text animation</div>
          <label>Animation
            <select value={firstText.textAnimation || 'none'} onChange={e => onTextUpdate(firstText.id, { textAnimation: e.target.value })}>
              {textAnimations.map(animation => <option key={animation.value} value={animation.value}>{animation.label}</option>)}
            </select>
          </label>
          <div className="inspector-grid">
            <label>Duration <input type="number" min="0.1" max="12" step="0.1" value={firstText.textAnimationDuration || 1.2} onChange={e => onTextUpdate(firstText.id, { textAnimationDuration: Number(e.target.value) })} /></label>
            <label>Delay <input type="number" min="0" max="12" step="0.1" value={firstText.textAnimationDelay || 0} onChange={e => onTextUpdate(firstText.id, { textAnimationDelay: Number(e.target.value) })} /></label>
          </div>
          <label><input type="checkbox" checked={!!firstText.textAnimationLoop} onChange={e => onTextUpdate(firstText.id, { textAnimationLoop: e.target.checked })} /> Loop animation</label>
        </>
      )}
    </aside>
  );
}

export default App;

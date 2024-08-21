const keyframes = {
  'fade-in': {
    '0%': { opacity: '0', transform: 'scale(0.9)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },
  'fade-out': {
    '0%': { opacity: '1', transform: 'scale(1)' },
    '100%': { opacity: '0', transform: 'scale(0.5)' },
  },
  'infinite-slide-original': {
    '0%': { transform: 'translateX(0)' },
    '50%': { transform: 'translateX(-100%)' },
    '50.1%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  'infinite-slide-copy': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-200%)' },
  },
};

export default keyframes;

import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/context';
import { I18nProvider } from '@/lib/i18n/context';

const display = Playfair_Display({
  variable: '--font-aurelis-display',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const sans = Plus_Jakarta_Sans({
  variable: '--font-aurelis-sans',
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'LAURA — Private Luxury Experiences & VIP Access Vietnam',
    template: '%s — LAURA',
  },
  description:
    'Privately curated massage & spa sanctuaries, hidden vintage wine cellars, and after-dark VIP nightclub hosting across Vietnam.',
  keywords: [
    'Luxury Vietnam',
    'Private Spa Saigon',
    'Wine Tasting Cellar Da Nang',
    'VIP Nightclub Table Ho Chi Minh City',
    'Luxury Yacht Phu Quoc',
    'Private Concierge Vietnam',
  ],
};

const extensionShieldScript = `
(function() {
  function shouldSuppressError(err) {
    if (!err) return false;
    var str = '';
    try {
      if (typeof err === 'string') str = err;
      else if (err.stack) str = String(err.stack);
      else if (err.message) str = String(err.message);
      else str = String(err);
    } catch(e) {}
    return (
      str.indexOf('chrome-extension://') !== -1 ||
      str.indexOf('moz-extension://') !== -1 ||
      str.indexOf('safari-extension://') !== -1 ||
      str.indexOf('M_ID') !== -1 ||
      str.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
      str.indexOf('Connection closed') !== -1 ||
      str.indexOf('The operation was aborted') !== -1 ||
      str.indexOf('AbortError') !== -1
    );
  }

  window.addEventListener('unhandledrejection', function(event) {
    if (shouldSuppressError(event.reason)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener('error', function(event) {
    if (shouldSuppressError(event.error) || shouldSuppressError(event.filename) || shouldSuppressError(event.message)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  var originalAddEventListener = window.addEventListener;
  window.addEventListener = function(type, listener, options) {
    if (type === 'unhandledrejection') {
      var wrapped = function(e) {
        if (shouldSuppressError(e.reason)) {
          if (e.preventDefault) e.preventDefault();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          return;
        }
        return typeof listener === 'function' ? listener.apply(this, arguments) : listener.handleEvent(e);
      };
      return originalAddEventListener.call(window, type, wrapped, options);
    }
    if (type === 'error') {
      var wrappedError = function(e) {
        if (shouldSuppressError(e.error) || shouldSuppressError(e.filename) || shouldSuppressError(e.message)) {
          if (e.preventDefault) e.preventDefault();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          return;
        }
        return typeof listener === 'function' ? listener.apply(this, arguments) : listener.handleEvent(e);
      };
      return originalAddEventListener.call(window, type, wrappedError, options);
    }
    return originalAddEventListener.apply(window, arguments);
  };
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: extensionShieldScript }}
        />
      </head>
      <body className="bg-[#050505] text-[#f3eee5] font-sans antialiased selection:bg-[#d4af37] selection:text-black">
        <I18nProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

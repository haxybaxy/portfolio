import { useEffect, useState } from 'react';
import { Mail, Check, Github, Linkedin } from 'lucide-react';
import "../styles/footer.css";

/** Matches the fade-out in footer.css. The icons only move once it has finished. */
const LEAVE_MS = 150;

/** How long the button stays on the tick after a successful copy. */
const COPIED_MS = 1800;

/*
 * Base64 rather than the address itself, and copied to the clipboard rather than linked
 * with mailto:. The point is to keep it away from address harvesters, which scrape
 * mailto: hrefs and anything matching an email in the served HTML and JS — so the
 * literal must not appear in the bundle, the DOM, or any label. Decoded only when
 * somebody actually clicks. This stops scrapers, not a determined human reading the
 * bundle, which is the trade being made.
 */
const EMAIL_B64 = 'emFpZGtzYWhlYkBnbWFpbC5jb20=';

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Denied permission or an insecure context — fall through to the older path.
  }

  try {
    const scratch = document.createElement('textarea');
    scratch.value = text;
    scratch.setAttribute('readonly', '');
    scratch.style.position = 'fixed';
    scratch.style.opacity = '0';
    document.body.appendChild(scratch);
    scratch.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(scratch);
    return copied;
  } catch {
    return false;
  }
}

interface FooterProps {
  /** True while the expanded blog window owns the bottom of the page: the icons move up
   *  into the gap above it, opposite the theme toggle, and fade in there. */
  atTop?: boolean;
}

export default function Footer({ atTop = false }: FooterProps) {
  /*
   * Where the icons are drawn lags where they belong, because a class swap moves them
   * instantly: leaving them to switch ends of the page while visible would read as a
   * teleport. So on the way back they fade out where they are, and only then drop to
   * the bottom — invisible at the moment they actually move, in both directions.
   */
  const [drawnAtTop, setDrawnAtTop] = useState(atTop);
  const leaving = drawnAtTop !== atTop;

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => setDrawnAtTop(atTop), LEAVE_MS);
    return () => clearTimeout(timer);
  }, [leaving, atTop]);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopyEmail = async () => {
    // Stays on the envelope if the copy failed, rather than claiming a success
    if (await copyToClipboard(atob(EMAIL_B64))) setCopied(true);
  };

  return (
    <footer className={`footer ${drawnAtTop ? 'is-top' : ''} ${leaving ? 'is-leaving' : ''}`}>
      <div className="socialIcons">
        <button
          type="button"
          className={`socialLink socialButton ${copied ? 'is-copied' : ''}`}
          aria-label={copied ? 'Email address copied to clipboard' : 'Copy email address'}
          onClick={handleCopyEmail}
        >
          {copied ? <Check size={24} /> : <Mail size={24} />}
        </button>
        {/* Announced rather than shown: the tick is the visual confirmation, and the
            address itself must stay out of the DOM. */}
        <span className="visuallyHidden" role="status">
          {copied ? 'Email address copied to clipboard' : ''}
        </span>
        <a href="https://github.com/haxybaxy" target="_blank" rel="noopener noreferrer" className="socialLink" aria-label="GitHub">
          <Github size={24} />
        </a>
        <a href="https://www.linkedin.com/in/zaidalsaheb" target="_blank" rel="noopener noreferrer" className="socialLink" aria-label="LinkedIn">
          <Linkedin size={24} />
        </a>
      </div>
    </footer>
  );
}

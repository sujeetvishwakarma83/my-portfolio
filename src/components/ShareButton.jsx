import { useState } from 'react';

function ShareButton({ darkMode }) {
  var [open, setOpen] = useState(false);
  var [copied, setCopied] = useState(false);

  // Apna portfolio URL yahan likho — deploy hone ke baad update karna
  var portfolioUrl = window.location.href;
  var portfolioTitle = 'Sujeet Vishwakarma — Full Stack Developer Portfolio';
  var portfolioDesc = 'Check out my portfolio! MCA student, Full Stack Developer. Available for freelance & internship.';

  var shareLinks = [
    {
      name: 'WhatsApp',
      color: '#25D366',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      url: 'https://wa.me/?text=' + encodeURIComponent(portfolioDesc + ' ' + portfolioUrl),
    },
    {
      name: 'Instagram',
      color: '#E1306C',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
      // Instagram direct share nahi hota — copy link se share karo
      url: null,
      action: 'instagram',
    },
    {
      name: 'Facebook',
      color: '#1877F2',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(portfolioUrl),
    },
    {
      name: 'Twitter',
      color: '#1DA1F2',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      url: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(portfolioDesc) + '&url=' + encodeURIComponent(portfolioUrl),
    },
    {
      name: 'Aarattai',
      color: '#FF6B35',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      url: 'https://aarattai.in/share?url=' + encodeURIComponent(portfolioUrl) + '&title=' + encodeURIComponent(portfolioTitle),
    },
    {
      name: 'Copy Link',
      color: '#00f5a0',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      ),
      url: null,
      action: 'copy',
    },
  ];

  var handleShare = function(item) {
    if (item.action === 'copy' || item.action === 'instagram') {
      navigator.clipboard.writeText(portfolioUrl).then(function() {
        setCopied(true);
        setTimeout(function() { setCopied(false); }, 2000);
      });
      if (item.action === 'instagram') {
        alert('Link copy ho gaya! Ab Instagram pe paste karo.');
      }
    } else if (item.url) {
      window.open(item.url, '_blank', 'width=600,height=400');
    }
  };

  var panelBg = darkMode ? '#111118' : '#ffffff';
  var panelBorder = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,150,100,0.15)';
  var labelColor = darkMode ? '#6b6b7a' : '#4a7a65';

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 998,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }}>

      {/* Share Panel — slides in when open */}
      <div style={{
        background: panelBg,
        border: '1px solid ' + panelBorder,
        borderRight: 'none',
        borderRadius: '12px 0 0 12px',
        padding: open ? '1rem 0.75rem' : '0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        overflow: 'hidden',
        width: open ? '52px' : '0px',
        opacity: open ? 1 : 0,
        transition: 'width 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
        boxShadow: darkMode ? '-4px 0 20px rgba(0,0,0,0.3)' : '-4px 0 20px rgba(0,150,100,0.1)',
      }}>
        {shareLinks.map(function(item) {
          return (
            <button
              key={item.name}
              onClick={function() { handleShare(item); }}
              title={item.name}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: item.action === 'copy' && copied ? '#00f5a0' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (item.action === 'copy' && copied ? '#00f5a0' : panelBorder),
                color: item.action === 'copy' && copied ? '#000' : item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={function(e) {
                e.currentTarget.style.background = item.color;
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = item.color;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={function(e) {
                e.currentTarget.style.background = (item.action === 'copy' && copied) ? '#00f5a0' : 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = (item.action === 'copy' && copied) ? '#000' : item.color;
                e.currentTarget.style.borderColor = (item.action === 'copy' && copied) ? '#00f5a0' : panelBorder;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {item.icon}
            </button>
          );
        })}
      </div>

      {/* Main Share Toggle Button */}
      <button
        onClick={function() { setOpen(!open); }}
        title="Share Portfolio"
        style={{
          width: '44px',
          height: '80px',
          background: open ? '#00f5a0' : (darkMode ? '#111118' : '#ffffff'),
          border: '1px solid ' + (open ? '#00f5a0' : panelBorder),
          borderRight: 'none',
          borderRadius: open ? '0' : '8px 0 0 8px',
          color: open ? '#000' : '#00f5a0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          cursor: 'pointer',
          transition: 'all 0.3s',
          boxShadow: darkMode ? '-2px 0 12px rgba(0,0,0,0.3)' : '-2px 0 12px rgba(0,150,100,0.1)',
        }}
        onMouseEnter={function(e) {
          if (!open) {
            e.currentTarget.style.background = 'rgba(0,245,160,0.1)';
            e.currentTarget.style.borderColor = '#00f5a0';
          }
        }}
        onMouseLeave={function(e) {
          if (!open) {
            e.currentTarget.style.background = darkMode ? '#111118' : '#ffffff';
            e.currentTarget.style.borderColor = panelBorder;
          }
        }}
      >
        {/* Share icon */}
        {!open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
        {/* Vertical text */}
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.5rem',
          letterSpacing: '0.1em',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          color: open ? '#000' : '#00f5a0',
        }}>
          {open ? 'CLOSE' : 'SHARE'}
        </span>
      </button>

    </div>
  );
}

export default ShareButton;
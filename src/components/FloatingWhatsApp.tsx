
export default function FloatingWhatsApp() {
  const whatsappNumber = '918305014100';
  const defaultMessage = 'Hi Achal, I saw your portfolio and would like to connect with you regarding a project/consulting opportunity.';
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse effect rings */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-ping pointer-events-none"></span>
      
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 transition-transform group-hover:scale-110"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="M14 9.5c-.3-.3-.8-.3-1.1 0l-.8.8c-.8-.4-1.4-1-1.8-1.8l.8-.8c.3-.3.3-.8 0-1.1L9.6 5c-.3-.3-.8-.3-1.1 0L7.4 6.1c-.6.6-.7 1.5-.3 2.2 1 2.2 2.8 4 5 5 .7.4 1.6.3 2.2-.3l1.1-1.1c.3-.3.3-.8 0-1.1L14 9.5z" />
      </svg>
      
      {/* Tooltip */}
      <span className="absolute right-14 scale-0 transition-all rounded bg-slate-900 px-2 py-1 text-xs text-white group-hover:scale-100 whitespace-nowrap font-medium pointer-events-none shadow-md">
        Chat on WhatsApp
      </span>
    </a>
  );
}

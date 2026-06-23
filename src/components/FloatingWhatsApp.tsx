
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
        fill="currentColor"
        className="w-6 h-6 transition-transform group-hover:scale-110"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.02-5.11-2.881-6.973-1.861-1.863-4.337-2.887-6.971-2.888-5.442 0-9.866 4.42-9.87 9.86-.001 1.777.472 3.511 1.371 5.048L1.171 22.54l4.57-1.198c-.011.008.906-.518.906-.518zm10.967-7.461c-.301-.15-1.779-.877-2.046-.975-.267-.098-.463-.147-.659.15-.196.297-.759.975-.93 1.17-.172.196-.344.22-.645.07-1.129-.566-1.89-1.002-2.645-2.298-.192-.329.192-.305.549-1.018.06-.12.03-.225-.015-.315-.045-.09-.463-1.117-.635-1.529-.168-.402-.336-.347-.463-.353-.119-.006-.256-.007-.393-.007-.137 0-.36.051-.548.257-.188.206-.718.702-.718 1.71 0 1.009.734 1.984.836 2.12.102.137 1.445 2.206 3.5 3.093.489.211.87.337 1.168.431.492.156.94.134 1.294.081.395-.06 1.779-.727 2.03-1.425.252-.699.252-1.299.176-1.424-.075-.125-.27-.196-.57-.346z"/>
      </svg>
      
      {/* Tooltip */}
      <span className="absolute right-14 scale-0 transition-all rounded bg-slate-900 px-2 py-1 text-xs text-white group-hover:scale-100 whitespace-nowrap font-medium pointer-events-none shadow-md">
        Chat on WhatsApp
      </span>
    </a>
  );
}

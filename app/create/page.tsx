export default function CreatePage() {
  return (
    <div className="p-6 max-w-[1400px]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">יצירת תוכן</h1>
        <p className="text-[13px] text-gray-500 font-sans mt-1">כתיבת סקריפטים ואימות מדעי</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="bg-surface border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-w-[500px] w-full p-[60px] text-center">
          <span className="text-[64px] block mb-4">✍️</span>
          <h2 className="font-display text-[28px] font-bold text-foreground mb-3">
            יצירת תוכן עם AI
          </h2>
          <p className="text-sm text-gray-500 font-sans leading-relaxed mb-6">
            Claude כותב סקריפטים, PubMed מאמת מדעית. בקרוב...
          </p>
          <button
            disabled
            className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-400 text-sm font-semibold cursor-not-allowed"
          >
            בבנייה 🚧
          </button>
        </div>
      </div>
    </div>
  );
}

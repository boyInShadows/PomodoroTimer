export default function AuthCard({ title, subtitle, children, footer }) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl px-8 py-10 backdrop-blur-md">
          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-wide">{title}</h1>
              {subtitle && (
                <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
              )}
            </div>
            <div className="w-9 h-9 rounded-xl border border-slate-600 flex items-center justify-center text-sm text-yellow-300">
              ⏱️
            </div>
          </div>
  
          {children}
  
          {footer && (
            <div className="mt-8 text-xs text-slate-400 text-center">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
  
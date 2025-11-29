export default function Header({ isFocus, isRunning, darkMode, toggleDarkMode, textMutedClass }) {
    return (
      <div className="flex justify-between items-center mb-8">
        <div className="text-left">
          <h1 className="text-2xl font-light mb-1">POMODORO</h1>
          <div className={textMutedClass + ' text-sm'}>
            {isFocus ? 'FOCUS TIME' : 'BREAK TIME'}
            {isRunning && ' • RUNNING'}
          </div>
        </div>
  
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    );
  }
  
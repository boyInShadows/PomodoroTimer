export default function ModeSwitch({ isFocus, onSwitch }) {
    return (
      <div className="text-center mb-8">
        <button
          onClick={onSwitch}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors text-xs tracking-wide hover:border-gray-400 dark:hover:border-gray-500"
        >
          {isFocus ? 'SWITCH TO BREAK' : 'SWITCH TO FOCUS'}
        </button>
      </div>
    );
  }
  
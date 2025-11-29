export default function ConnectionStatus({ apiBaseUrl, onRetry }) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🔌</div>
          <h2 className="text-2xl font-bold mb-2 dark:text-white">
            Connection Failed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Cannot connect to backend server.
          </p>
          <button
            onClick={onRetry}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            🔄 Retry Connection
          </button>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Backend: {apiBaseUrl || 'relative /api paths'}
          </div>
        </div>
      </div>
    );
  }
  
export default function StatsSection({ stats, textMutedClass }) {
    return (
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div>
            <div className="text-2xl font-bold text-blue-500">
              {stats.totalSessions}
            </div>
            <div className={textMutedClass + ' text-xs mt-1'}>TOTAL</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">
              {stats.consecutiveSessions}
            </div>
            <div className={textMutedClass + ' text-xs mt-1'}>STREAK</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-500">
              {stats.nextLongBreak}
            </div>
            <div className={textMutedClass + ' text-xs mt-1'}>TO LONG BREAK</div>
          </div>
        </div>
  
        {stats.isLongBreakNext && (
          <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <span className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">
              🎉 Next break will be 15 minutes!
            </span>
          </div>
        )}
      </div>
    );
  }
  
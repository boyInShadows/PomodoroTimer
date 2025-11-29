export default function CircularTimer({
    timeLeft,
    isRunning,
    isFocus,
    textMutedClass,
    progressBg,
    progressFill,
  }) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const totalTime = isFocus ? 25 * 60 : 5 * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
  
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    };
  
    return (
      <div className="relative w-64 h-64 mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={progressBg}
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={progressFill}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
  
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-light tracking-tight">
            {formatTime(timeLeft)}
          </div>
          <div className={textMutedClass + ' text-xs mt-2 tracking-wide'}>
            {isRunning ? 'RUNNING' : 'PAUSED'}
          </div>
        </div>
      </div>
    );
  }
  
export default function Instructions({ textMutedClass }) {
    return (
      <div className="mt-6 text-center">
        <div className={textMutedClass + ' text-xs space-y-1'}>
          <div>25min focus • 5min break</div>
          <div>4 sessions = 15min long break</div>
          <div className="pt-2 font-medium">
            Space: Start/Pause • R: Reset • S: Switch • D: Dark Mode
          </div>
        </div>
      </div>
    );
  }
  
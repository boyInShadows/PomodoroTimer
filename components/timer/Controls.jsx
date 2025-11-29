export default function Controls({
    isRunning,
    onStart,
    onPause,
    onReset,
    styles,
  }) {
    return (
      <div className="flex justify-center space-x-3 mb-8">
        {isRunning ? (
          <button onClick={onPause} className={styles.buttonSecondary}>
            PAUSE
          </button>
        ) : (
          <button onClick={onStart} className={styles.buttonPrimary}>
            START
          </button>
        )}
        <button onClick={onReset} className={styles.buttonSecondary}>
          RESET
        </button>
      </div>
    );
  }
  
import { useState, useEffect } from 'react';

export default function PomodoroTimer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('work'); // work, shortBreak, longBreak

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                        setIsActive(false);
                        if (Notification.permission === 'granted') {
                            new Notification('Timer Finished!', { body: `${mode === 'work' ? 'Work' : 'Break'} session complete.` });
                        }
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, minutes, seconds, mode]);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        if (isActive) {
            document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - Focus`;
        } else {
            document.title = 'Study Planner';
        }
    }, [minutes, seconds, isActive]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'work') setMinutes(25);
        else if (mode === 'shortBreak') setMinutes(5);
        else setMinutes(15);
        setSeconds(0);
    };

    const setTimerMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        if (newMode === 'work') setMinutes(25);
        else if (newMode === 'shortBreak') setMinutes(5);
        else setMinutes(15);
        setSeconds(0);
    };

    const totalSeconds = (mode === 'work' ? 25 : mode === 'shortBreak' ? 5 : 15) * 60;
    const currentSeconds = minutes * 60 + seconds;
    const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;

    // Circular progress calculations
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="pomodoro-card glass-panel">
            <div className="timer-header">
                <button
                    className={mode === 'work' ? 'active' : ''}
                    onClick={() => setTimerMode('work')}
                >Work</button>
                <button
                    className={mode === 'shortBreak' ? 'active' : ''}
                    onClick={() => setTimerMode('shortBreak')}
                >Short Break</button>
                <button
                    className={mode === 'longBreak' ? 'active' : ''}
                    onClick={() => setTimerMode('longBreak')}
                >Long Break</button>
            </div>

            <div className="timer-wrapper">
                <svg className="timer-svg" width="300" height="300" viewBox="0 0 300 300">
                    <circle
                        className="timer-circle-bg"
                        cx="150"
                        cy="150"
                        r={radius}
                    />
                    <circle
                        className="timer-circle-progress"
                        cx="150"
                        cy="150"
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
                <div className="time-display">
                    <span className="time-text">
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                    <span className="mode-text">{mode === 'work' ? 'FOCUS' : 'BREAK'}</span>
                </div>
            </div>

            <div className="timer-controls">
                <button onClick={toggleTimer} className={`btn-primary ${isActive ? 'active' : ''}`}>
                    {isActive ? 'Pause' : 'Start Focus'}
                </button>
                <button onClick={resetTimer} className="btn-secondary" title="Reset Timer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                </button>
            </div>

            <style jsx>{`
        .pomodoro-card {
           padding: 2rem;
           text-align: center;
           margin-top: 2rem;
           position: relative;
           overflow: hidden;
        }
        
        .timer-header {
          display: inline-flex;
          background: rgba(0,0,0,0.3);
          padding: 0.3rem;
          border-radius: 2rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        
        .timer-header button {
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 1.5rem;
          font-size: 0.85rem;
          font-weight: 500;
          transition: var(--transition);
        }
        
        .timer-header button.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.4);
        }
        
        .timer-header button:hover:not(.active) {
            color: var(--text-primary);
        }

        .timer-wrapper {
          position: relative;
          width: 300px;
          height: 300px;
          margin: 0 auto 2rem;
        }

        .timer-svg {
          transform: rotate(-90deg);
        }

        .timer-circle-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.05);
          stroke-width: 10;
        }

        .timer-circle-progress {
          fill: none;
          stroke: var(--primary);
          stroke-width: 10;
          stroke-linecap: round;
          transition: stroke-dashoffset 1s linear;
          filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
        }

        .time-display {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .time-text {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -2px;
          background: linear-gradient(to bottom, #fff, #ccc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mode-text {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: var(--text-secondary);
            margin-top: 0.5rem;
        }

        .timer-controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
          align-items: center;
        }

        .btn-primary {
          background: var(--text-primary);
          color: var(--bg-color);
          padding: 0.8rem 2.5rem;
          border-radius: 2rem;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 20px rgba(255,255,255,0.2);
        }

        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(255,255,255,0.4);
        }
        
        /* Optional: Change button style when active */
        .btn-primary.active {
            background: transparent;
            border: 2px solid var(--text-primary);
            color: var(--text-primary);
            box-shadow: none;
        }

        .btn-secondary {
          background: rgba(255,255,255,0.1);
          color: var(--text-primary);
          padding: 0.8rem;
          border-radius: 50%;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.2);
          transform: rotate(90deg);
        }
      `}</style>
        </div>
    );
}

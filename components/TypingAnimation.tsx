'use client';

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function TypingAnimation({
  text,
  speed = 100,
  delay = 0,
  className = '',
  showCursor = true,
  onComplete
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorBlink, setShowCursorBlink] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
      
      // Hide cursor after completion
      if (showCursor) {
        setTimeout(() => {
          setShowCursorBlink(false);
        }, 2000);
      }
    }
  }, [currentIndex, text, speed, delay, isComplete, onComplete, showCursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && showCursorBlink && (
        <span className="typing-cursor text-primary ml-1 inline-block">|</span>
      )}
    </span>
  );
}

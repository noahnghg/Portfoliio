'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  className?: string;
  loop?: boolean;
}

export default function TypewriterText({
  words,
  speed = 150,
  deleteSpeed = 100,
  delayBetweenWords = 2000,
  className = '',
  loop = true
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => 
            loop ? (prev + 1) % words.length : Math.min(prev + 1, words.length - 1)
          );
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        
        if (currentText === currentWord) {
          if (loop || currentWordIndex < words.length - 1) {
            setIsPaused(true);
          }
        }
      }
    }, isPaused ? delayBetweenWords : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, speed, deleteSpeed, delayBetweenWords, loop]);

  return (
    <span className={className}>
      {currentText}
      <span className="typing-cursor text-primary ml-1 inline-block">|</span>
    </span>
  );
}

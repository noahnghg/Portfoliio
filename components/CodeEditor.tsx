'use client';

import { useState, useEffect } from 'react';

interface CodeEditorProps {
  onComplete?: () => void;
  delay?: number;
}

export default function CodeEditor({ onComplete, delay = 0 }: CodeEditorProps) {
  const [displayCode, setDisplayCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const codeLines = [
    'class Noah:',
    '    """',
    '    A passionate developer who codes dreams into reality',
    '    """',
    '    def __init__(self):',
    '        self.age = 20',
    '        self.height = "5ft 11"',
    '        self.school = "University of Calgary"',
    '        self.location = "Canada"',
    '        self.top_skills = ["Python", "Java", "Machine Learning", "Database"]',
    '        self.passion = "Building unique and cool stuff"',
    '    ',
    '    def code(self, idea):',
    '        """Transform ideas into working software"""',
    '        result = self.creativity + self.skills',
    '        return f"Building {idea} with ❤️"',
    '    ',
    '    def learn(self, technology):',
    '        """Never stop learning new technologies"""',
    '        self.skills.append(technology)',
    '        return "Knowledge expanded! 🚀"',
    '    ',
    '    def collaborate(self, team):',
    '        """Great things happen when we work together"""',
    '        return f"Let\'s build something amazing, {team}!"',
  ];

  const typingSpeed = 100; // milliseconds per character
  const lineDelay = 200; // delay between lines

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      setIsComplete(true);
      setTimeout(() => {
        setShowCursor(false);
        onComplete?.();
      }, 2000);
      return;
    }

    const currentLineText = codeLines[currentLine];
    
    if (currentChar < currentLineText.length) {
      const timeout = setTimeout(() => {
        setDisplayCode(prev => prev + currentLineText[currentChar]);
        setCurrentChar(prev => prev + 1);
      }, currentLine === 0 && currentChar === 0 ? delay : typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      // Line complete, move to next line
      const timeout = setTimeout(() => {
        setDisplayCode(prev => prev + '\n');
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, lineDelay);

      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, delay, onComplete]);

  const renderHighlightedCode = (code: string) => {
    const lines = code.split('\n');
    return lines.map((line, lineIndex) => {
      // Skip empty lines
      if (!line.trim()) {
        return <div key={lineIndex} className="leading-6 h-6">&nbsp;</div>;
      }
      
      // Handle docstring quotes
      if (line.trim() === '"""') {
        return (
          <div key={lineIndex} className="leading-6 h-6">
            <span className="text-green-300">"""</span>
          </div>
        );
      }
      
      // Handle docstring content
      if (line.includes('passionate developer') || line.includes('Transform ideas') || 
          line.includes('Never stop learning') || line.includes('Great things happen')) {
        return (
          <div key={lineIndex} className="leading-6 h-6">
            <span className="text-green-300 italic">{line}</span>
          </div>
        );
      }
      
      // Parse and highlight the line using React components
      const tokens = parseLineToTokens(line);
      
      return (
        <div key={lineIndex} className="leading-6 h-6">
          {tokens.map((token, tokenIndex) => (
            <span key={tokenIndex} className={token.className}>
              {token.text}
            </span>
          ))}
        </div>
      );
    });
  };

  const parseLineToTokens = (line: string) => {
    const tokens: { text: string; className: string }[] = [];
    let currentIndex = 0;
    
    // Define patterns for syntax highlighting
    const patterns = [
      { regex: /\b(class|def|return|import|from|if|else|for|while|try|except|with|as)\b/, className: 'text-blue-400 font-semibold' },
      { regex: /"[^"]*"/, className: 'text-green-400' },
      { regex: /\bself\b/, className: 'text-purple-400' },
      { regex: /\b\d+\b/, className: 'text-orange-400' },
      { regex: /\b(Noah|__init__|code|learn|collaborate)\b/, className: 'text-yellow-300 font-medium' },
      { regex: /\b(append|len|print|range)\b/, className: 'text-cyan-400' },
      { regex: /[=+\[\],:()\.]/, className: 'text-gray-300' },
    ];
    
    while (currentIndex < line.length) {
      let matched = false;
      
      // Try to match each pattern
      for (const pattern of patterns) {
        const regex = new RegExp(pattern.regex.source, 'g');
        regex.lastIndex = currentIndex;
        const match = regex.exec(line);
        
        if (match && match.index === currentIndex) {
          // Add any preceding text as default
          if (currentIndex < match.index) {
            tokens.push({
              text: line.slice(currentIndex, match.index),
              className: 'text-gray-300'
            });
          }
          
          // Add the matched token
          tokens.push({
            text: match[0],
            className: pattern.className
          });
          
          currentIndex = match.index + match[0].length;
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        // Find the next pattern match or end of line
        let nextMatchIndex = line.length;
        for (const pattern of patterns) {
          const regex = new RegExp(pattern.regex.source, 'g');
          regex.lastIndex = currentIndex + 1;
          const match = regex.exec(line);
          if (match && match.index < nextMatchIndex) {
            nextMatchIndex = match.index;
          }
        }
        
        // Add the text until the next match as default
        tokens.push({
          text: line.slice(currentIndex, nextMatchIndex),
          className: 'text-gray-300'
        });
        
        currentIndex = nextMatchIndex;
      }
    }
    
    return tokens;
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
      {/* Editor Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 cursor-pointer"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 cursor-pointer"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 cursor-pointer"></div>
          </div>
          <span className="text-gray-400 text-sm ml-4 font-medium">noah.py</span>
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-xs font-medium">Python 3.11</span>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-gray-900 p-4 font-mono text-sm leading-relaxed min-h-[300px]">
        <div className="flex">
          {/* Line Numbers */}
          <div className="text-gray-500 pr-3 select-none font-mono text-sm text-right min-w-[2.5rem]">
            {displayCode.split('\n').map((_, index) => {
              // Only show line numbers for lines that have content or are not the last empty line
              if (index === displayCode.split('\n').length - 1 && displayCode.endsWith('\n')) {
                return null;
              }
              return (
                <div key={index} className="leading-6 h-6">
                  {index + 1}
                </div>
              );
            })}
          </div>

          {/* Code Content */}
          <div className="flex-1 text-gray-300 font-mono overflow-x-auto">
            <div className="whitespace-pre text-left">
              {renderHighlightedCode(displayCode)}
              {showCursor && (
                <span className="inline-block w-2 h-5 bg-white animate-pulse"></span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 border-t border-gray-700 flex justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-medium">UTF-8</span>
          <span className="font-medium">Python 3.11</span>
          <span className="font-medium">Ln {currentLine + 1}, Col {currentChar + 1}</span>
        </div>
        <div className="flex items-center space-x-2">
          {!isComplete && (
            <>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Typing...</span>
            </>
          )}
          {isComplete && (
            <>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="font-medium">Ready</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';

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

  const codeLines = useMemo(() => [
    'class Noah:',
    '    &quot;&quot;&quot;',
    '    a developer who solves problems with code',
    '    &quot;&quot;&quot;',
    '    def __init__(self):',
    '        self.age = 20',
    '        self.height = "5ft 11"',
    '        self.school = "University of Calgary"',
    '        self.location = "Canada"',
    '        self.skills = ["Python", "Backend", "Machine Learning", "Database"]',
    '        self.passion = "Building solutions with technology"',
    '    ',
    '    def code(self, idea):',
    '        &quot;&quot;&quot;',
    '        identify problems, use code to solve them &quot;',
    '        &quot;&quot;&quot;',
    '        return f"Building {idea} with ❤️"',
    '    ',
    '    def learn(self, technology):',
    '        self.skills.append(technology)',
    '        return "Knowledge expanded! 🚀"',
    '    ',
    '    def collaborate(self, team):',
    '        &quot;&quot;&quot;',
    '        Great things happen when we work together',
    '        &quot;&quot;&quot;',
    '        return f"Let\'s build something amazing, {team}!"',
  ], []);

  const typingSpeed = 5; // milliseconds per character
  const lineDelay = 100; // delay between lines

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
  }, [currentLine, currentChar, delay, onComplete, codeLines]);

  const renderHighlightedCode = (code: string) => {
    const lines = code.split('\n');
    return lines.map((line, lineIndex) => {
      // Skip empty lines
      if (!line.trim()) {
        return <div key={lineIndex} className="leading-4 h-4 sm:leading-5 sm:h-5 md:leading-6 md:h-6">&nbsp;</div>;
      }

      // Handle docstring quotes
      if (line.trim() === '&quot;&quot;&quot;') {
        return (
          <div key={lineIndex} className="leading-4 h-4 sm:leading-5 sm:h-5 md:leading-6 md:h-6">
            <span className="text-green-300">&quot;&quot;&quot;</span>
          </div>
        );
      }

      // Handle docstring content
      if (line.includes('passionate developer') || line.includes('Transform ideas') ||
        line.includes('Never stop learning') || line.includes('Great things happen')) {
        return (
          <div key={lineIndex} className="leading-4 h-4 sm:leading-5 sm:h-5 md:leading-6 md:h-6">
            <span className="text-green-300 italic">{line}</span>
          </div>
        );
      }

      // Parse and highlight the line using React components
      const tokens = parseLineToTokens(line);

      return (
        <div key={lineIndex} className="leading-4 h-4 sm:leading-5 sm:h-5 md:leading-6 md:h-6">
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
    <div className="w-full max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700 scale-95 sm:scale-100 origin-center">
      {/* Editor Header */}
      <div className="bg-gray-800 px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-gray-700 overflow-x-hidden">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink">
          <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full hover:bg-red-400 cursor-pointer"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 cursor-pointer"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full hover:bg-green-400 cursor-pointer"></div>
          </div>
          <span className="text-gray-400 text-xs sm:text-sm ml-2 sm:ml-4 font-medium truncate">noah.py</span>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-[10px] sm:text-xs font-medium hidden sm:inline whitespace-nowrap">Python 3.11</span>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-gray-900 p-1.5 sm:p-3 md:p-4 font-mono text-[10px] xs:text-xs sm:text-sm leading-tight sm:leading-relaxed min-h-[200px] sm:min-h-[250px] md:min-h-[300px] overflow-x-auto max-w-full">
        <div className="flex min-w-0 max-w-full">
          {/* Line Numbers */}
          <div className="text-gray-500 pr-1 sm:pr-2 md:pr-3 select-none font-mono text-[10px] xs:text-xs sm:text-sm text-right min-w-[1.2rem] sm:min-w-[1.5rem] md:min-w-[2.5rem]">
            {displayCode.split('\n').map((_, index) => {
              // Only show line numbers for lines that have content or are not the last empty line
              if (index === displayCode.split('\n').length - 1 && displayCode.endsWith('\n')) {
                return null;
              }
              return (
                <div key={index} className="leading-4 h-4 sm:leading-5 sm:h-5 md:leading-6 md:h-6">
                  {index + 1}
                </div>
              );
            })}
          </div>

          {/* Code Content */}
          <div className="flex-1 text-gray-300 font-mono min-w-0">
            <div className="whitespace-pre sm:whitespace-pre text-left overflow-x-auto">
              {renderHighlightedCode(displayCode)}
              {showCursor && (
                <span className="inline-block w-1.5 h-4 sm:w-2 sm:h-5 bg-white animate-pulse"></span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-800 px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-400 border-t border-gray-700 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="font-medium hidden sm:inline">UTF-8</span>
          <span className="font-medium">Python 3.11</span>
          <span className="font-medium hidden xs:inline">Ln {currentLine + 1}, Col {currentChar + 1}</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          {!isComplete && (
            <>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="font-medium text-[10px] sm:text-xs">Typing...</span>
            </>
          )}
          {isComplete && (
            <>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
              <span className="font-medium text-[10px] sm:text-xs">Ready</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

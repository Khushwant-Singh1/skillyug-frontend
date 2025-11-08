'use client'

import React, { useState, useEffect } from 'react';

interface WordRotatorProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const WordRotator = ({ 
  words, 
  typingSpeed = 150, 
  deletingSpeed = 100, 
  pauseDuration = 2000 
}: WordRotatorProps) => {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    // Blinking cursor effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    // Typewriter effect
    useEffect(() => {
        const currentWord = words[index];
        
        if (!isDeleting && displayText === currentWord) {
            // Pause before deleting
            const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && displayText === '') {
            // Move to next word
            setIsDeleting(false);
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            if (isDeleting) {
                // Delete one character
                setDisplayText(currentWord.substring(0, displayText.length - 1));
            } else {
                // Type one character
                setDisplayText(currentWord.substring(0, displayText.length + 1));
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, index, words, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <div
            style={{
                display: 'inline-block',
                minHeight: '2.5em',
                verticalAlign: 'middle',
                fontSize: "60px",
                color: "#F26F29",
                paddingTop: "2.5rem"
            }}
        >
            <span
                style={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                }}
            >
                {displayText}
                <span 
                    style={{ 
                        opacity: showCursor ? 1 : 0,
                        marginLeft: '2px'
                    }}
                >
                    |
                </span>
            </span>
        </div>
    );
};

export default WordRotator;

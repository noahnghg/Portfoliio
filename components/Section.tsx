'use client';

import React, { useRef, useEffect, useState } from 'react';

interface SectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
    delay?: number;
}

const Section: React.FC<SectionProps> = ({ id, className = '', children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Only animate once
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: '0px 0px -50px 0px', // Trigger slightly before the bottom
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </section>
    );
};

export default Section;

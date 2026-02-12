'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = "", style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`f1-card ${className}`}
        style={style}
    >
        {children}
    </motion.div>
);

export const Button = ({ children, onClick, disabled, className = "" }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean, className?: string }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`f1-button ${className}`}
    >
        {children}
    </button>
);

export const Badge = ({ children, variant = "default", className = "" }: { children: React.ReactNode, variant?: "default" | "winner" | "team", className?: string }) => {
    const variants = {
        default: "bg-f1-gray text-white",
        winner: "bg-f1-red text-white",
        team: "bg-white text-f1-dark",
    };

    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

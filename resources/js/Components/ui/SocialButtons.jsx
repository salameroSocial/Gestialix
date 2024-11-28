// SocialButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function SocialButtons({ href, icon: Icon, label, colorClass }) {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
                href={href}
                className={`w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${colorClass} bg-white hover:bg-gray-50`}
            >
                <Icon size={20} className={`${colorClass} mr-2`} />
                {label}
            </a>
        </motion.div>
    );
}

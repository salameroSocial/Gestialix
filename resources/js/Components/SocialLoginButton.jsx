import { motion } from 'framer-motion';

const SocialLoginButton = ({ href, icon: Icon, text, color }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <a
            href={href}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
            <Icon size={20} className={`mr-2 ${color}`} />
            {text}
        </a>
    </motion.div>
);

export default SocialLoginButton;


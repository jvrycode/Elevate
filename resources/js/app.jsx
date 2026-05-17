import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import SmoothScroll from './Components/SmoothScroll';
import { Toaster, toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Elevate';

function AppWrapper({ children }) {
    const { url, props } = usePage();
    
    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }
        if (props.flash?.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);

    return (
        <>
            <Toaster position="bottom-right" richColors />
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={url.split('?')[0]} // Base URL so query params (like filtering) don't trigger transitions
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));
        page.default.layout = page.default.layout || ((pageComponent) => <AppWrapper>{pageComponent}</AppWrapper>);
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <SmoothScroll>
                <App {...props} />
            </SmoothScroll>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

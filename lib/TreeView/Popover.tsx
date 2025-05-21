import { ReactNode, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

type PopoverProps = {
    content: any;
    children: ReactNode;
    placement?: 'right' | 'bottom';
    triggerStyle: React.CSSProperties | undefined;
    popoverStyle: React.CSSProperties | undefined;
};

export const Popover = ({
    content,
    children,
    placement = 'right',
    triggerStyle,
    popoverStyle
}: PopoverProps) => {
    const [visible, setVisible] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    useEffect(() => {
        if (visible && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const top = placement === 'bottom' ? rect.bottom + 10 : rect.top;
            const left = placement === 'right' ? rect.right + 10 : rect.left;

            setPosition({ top, left });
        }
    }, [visible, placement]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const defaultPopoverStyle: React.CSSProperties = {
        position: 'fixed',
        top: position.top,
        left: position.left,
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        borderRadius: 8,
        zIndex: 9999,
        minWidth: 200,
        padding: 12,
        transition: 'opacity 0.2s ease-in-out',
        fontSize: 14,
        width: "max-content",
        maxWidth: 400
    };

    const defaultTriggerStyle: React.CSSProperties = {
        display: 'inline-block',
        cursor: 'pointer',
    };

    return (
        <>
            <div
                ref={triggerRef}
                style={{ ...defaultTriggerStyle, ...(triggerStyle || {}) }}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
            </div>
            {visible && content &&
                ReactDOM.createPortal(
                    <div style={{ ...defaultPopoverStyle, ...(popoverStyle || {}) }}>
                        {content}
                    </div>,
                    document.body
                )
            }
        </>
    );
};

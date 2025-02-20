type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
};

export const Button = ({ children, onClick, className }: ButtonProps) => (
    <button className={className} onClick={onClick}>
        {children}
    </button>
);
type LabelProps = {
    children: React.ReactNode;
    className?: string;
};

export const Label = ({ children, className }: LabelProps) => (
    <label className={className}>{children}</label>
);
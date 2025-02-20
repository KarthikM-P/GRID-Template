export const Button = ({ children, onClick, className }) => (
    <button className={className} onClick={onClick}>
        {children}
    </button>
);
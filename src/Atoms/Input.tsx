export const Input = ({ value, onChange, placeholder, className }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
    />
);
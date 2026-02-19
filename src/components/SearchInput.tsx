import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onSearch?: (value: string) => void;
  containerClassName?: string;
}

export function SearchInput({
  placeholder = 'Search...',
  className = '',
  containerClassName = '',
  onSearch,
  onChange,
  value,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState('');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    if (inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      nativeInputValueSetter?.call(inputRef.current, '');
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
    onSearch?.('');
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <input
        ref={inputRef}
        type="text"
        className={`w-full pl-10 pr-9 py-2.5 border border-border dark:border-border-light rounded-lg bg-white dark:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-text-muted ${className}`}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        {...props}
      />
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
      />
      {!!currentValue && (
        <div
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer transition-colors"
        >
          <X size={16} />
        </div>
      )}
    </div>
  );
}

export default SearchInput;

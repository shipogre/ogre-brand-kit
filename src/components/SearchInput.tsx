import React from 'react';
import { Search } from 'lucide-react';

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
  ...props
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <input
        type="text"
        className={`w-full pl-10 pr-4 py-2.5 border border-border dark:border-border-light rounded-lg bg-white dark:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-text-muted ${className}`}
        placeholder={placeholder}
        onChange={handleChange}
        {...props}
      />
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
      />
    </div>
  );
}

export default SearchInput;

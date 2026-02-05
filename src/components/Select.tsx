import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  isLoading?: boolean;
}

export function Select({
  label,
  options,
  placeholder,
  error,
  isLoading = false,
  className = '',
  id,
  disabled,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`form-select ${error ? 'border-error' : ''} ${isLoading ? 'pr-12' : ''} ${className}`}
          disabled={disabled || isLoading}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {isLoading ? 'Loading...' : placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="spinner spinner-sm text-primary" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
}

export default Select;

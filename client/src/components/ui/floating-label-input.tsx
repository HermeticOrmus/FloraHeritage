import { useState, useRef, useEffect, forwardRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  children?: React.ReactNode; // For select options
  as?: 'input' | 'select';
  placeholder?: string;
  id?: string;
  'data-testid'?: string;
  disabled?: boolean;
  required?: boolean;
}

/**
 * Heritage-inspired floating label input with GSAP animations
 * Provides sophisticated label transitions that complement Casa Flora's antique glass aesthetic
 */
const FloatingLabelInput = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  FloatingLabelInputProps
>(({
  label,
  type = "text",
  value = "",
  onChange,
  onFocus,
  onBlur,
  className,
  inputClassName,
  labelClassName,
  children,
  as = "input",
  placeholder,
  id,
  'data-testid': dataTestId,
  disabled = false,
  required = false,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  // Check if label should be floating (focused or has value)
  const shouldFloat = isFocused || hasValue || (value && value.toString().length > 0);

  useEffect(() => {
    // Update hasValue when external value changes
    setHasValue(value !== "" && value !== undefined && value !== null);
  }, [value]);

  // Heritage-appropriate GSAP animations with proper context cleanup
  useLayoutEffect(() => {
    if (!labelRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (shouldFloat) {
        // Animate label up and scale down with heritage timing
        gsap.to(labelRef.current, {
          y: -24,
          scale: 0.85,
          color: "rgb(173, 216, 230)",
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        // Animate label back to original position
        gsap.to(labelRef.current, {
          y: 0,
          scale: 1,
          color: "rgb(100, 116, 139)",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }, containerRef.current);

    return () => ctx.revert();
  }, [shouldFloat]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setIsFocused(true);
    
    // Subtle container glow effect
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        boxShadow: "0 0 0 2px rgba(173, 216, 230, 0.3), 0 4px 20px rgba(173, 216, 230, 0.1)",
        duration: 0.2,
        ease: "power2.out"
      });
    }
    
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setIsFocused(false);
    
    // Remove container glow
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        boxShadow: "none",
        duration: 0.2,
        ease: "power2.out"
      });
    }
    
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setHasValue(e.target.value !== "");
    onChange?.(e);
  };

  const baseInputClasses = cn(
    "w-full h-12 px-4 pt-6 pb-2 rounded-lg border transition-all duration-300",
    "bg-foreground/5 border-foreground/20",
    "text-foreground placeholder-transparent",
    "focus:outline-none focus:ring-0 focus:border-stone-warm/50",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    // Heritage glass styling
    "backdrop-blur-sm bg-gradient-to-br from-foreground/8 to-foreground/3",
    "hover:bg-foreground/10 hover:border-foreground/30",
    inputClassName
  );

  const labelClasses = cn(
    "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none",
    "text-foreground/60 font-medium transition-all duration-300",
    "origin-left transform-gpu",
    "font-serif text-sm", // Heritage typography
    labelClassName
  );

  const Element = as;

  return (
    <div 
      ref={containerRef}
      className={cn("relative transition-all duration-300", className)}
    >
      <Element
        ref={(element) => {
          inputRef.current = element;
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            (ref as any).current = element;
          }
        }}
        id={id}
        type={as === 'input' ? type : undefined}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={baseInputClasses}
        placeholder={shouldFloat ? placeholder : ""}
        data-testid={dataTestId}
        disabled={disabled}
        required={required}
        {...props}
      >
        {children}
      </Element>
      
      <label
        ref={labelRef}
        htmlFor={id}
        className={labelClasses}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
    </div>
  );
});

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
import { gsap } from "gsap";

interface RippleOptions {
  color?: string;
  duration?: number;
  size?: number;
  opacity?: number;
  variant?: 'heritage' | 'glass' | 'stone' | 'blue';
}

interface RipplePosition {
  x: number;
  y: number;
}

/**
 * GSAP-powered ripple effect system for Casa Flora heritage interactions
 * Creates warm, sophisticated ripple animations that complement the antique glass aesthetic
 */
export class RippleEffect {
  private static defaultOptions: Required<RippleOptions> = {
    color: 'rgba(168, 153, 138, 0.3)', // stone-warm default
    duration: 0.8,
    size: 100,
    opacity: 0.3,
    variant: 'heritage'
  };

  private static variantColors = {
    heritage: 'rgba(168, 153, 138, 0.25)', // stone-warm
    glass: 'rgba(245, 241, 235, 0.2)',    // stone-cream
    stone: 'rgba(139, 125, 107, 0.3)',    // stone-medium  
    blue: 'rgba(107, 155, 175, 0.25)'     // casa-blue-medium
  };

  /**
   * Creates a heritage-appropriate ripple effect on the target element
   */
  static createRipple(
    event: React.MouseEvent | MouseEvent,
    element: HTMLElement,
    options: RippleOptions = {}
  ): void {
    const finalOptions = { ...this.defaultOptions, ...options };
    
    // Use variant color if specified
    if (finalOptions.variant && this.variantColors[finalOptions.variant]) {
      finalOptions.color = this.variantColors[finalOptions.variant];
    }

    const position = this.getClickPosition(event, element);
    const rippleElement = this.createRippleElement(position, finalOptions);
    
    element.appendChild(rippleElement);
    this.animateRipple(rippleElement, finalOptions);
  }

  /**
   * Creates a ripple effect with a warm glow for heritage buttons
   */
  static createHeritageRipple(
    event: React.MouseEvent | MouseEvent,
    element: HTMLElement,
    options: RippleOptions = {}
  ): void {
    this.createRipple(event, element, { 
      ...options, 
      variant: 'heritage',
      duration: 1.0,
      opacity: 0.25 
    });
  }

  /**
   * Creates a glass-style ripple for navigation elements
   */
  static createGlassRipple(
    event: React.MouseEvent | MouseEvent,
    element: HTMLElement,
    options: RippleOptions = {}
  ): void {
    this.createRipple(event, element, { 
      ...options, 
      variant: 'glass',
      duration: 0.7,
      opacity: 0.2 
    });
  }

  /**
   * Creates a stone-themed ripple for accent elements
   */
  static createStoneRipple(
    event: React.MouseEvent | MouseEvent,
    element: HTMLElement,
    options: RippleOptions = {}
  ): void {
    this.createRipple(event, element, { 
      ...options, 
      variant: 'stone',
      duration: 0.9,
      opacity: 0.3 
    });
  }

  /**
   * Creates a blue-themed ripple for primary actions
   */
  static createBlueRipple(
    event: React.MouseEvent | MouseEvent,
    element: HTMLElement,
    options: RippleOptions = {}
  ): void {
    this.createRipple(event, element, { 
      ...options, 
      variant: 'blue',
      duration: 0.8,
      opacity: 0.25 
    });
  }

  private static getClickPosition(
    event: React.MouseEvent | MouseEvent,
    element: HTMLElement
  ): RipplePosition {
    const rect = element.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  private static createRippleElement(
    position: RipplePosition,
    options: Required<RippleOptions>
  ): HTMLElement {
    const ripple = document.createElement('div');
    
    // Heritage-inspired ripple styling
    ripple.className = 'casa-flora-ripple';
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: ${options.color};
      width: ${options.size}px;
      height: ${options.size}px;
      left: ${position.x - options.size / 2}px;
      top: ${position.y - options.size / 2}px;
      transform: scale(0);
      opacity: ${options.opacity};
      pointer-events: none;
      z-index: 1000;
      backdrop-filter: blur(2px);
      box-shadow: 
        0 0 20px ${options.color},
        inset 0 0 10px rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    return ripple;
  }

  private static animateRipple(
    rippleElement: HTMLElement,
    options: Required<RippleOptions>
  ): void {
    const timeline = gsap.timeline({
      onComplete: () => rippleElement.remove()
    });

    // Heritage-appropriate animation with warm expansion
    timeline
      .to(rippleElement, {
        scale: 4,
        opacity: options.opacity * 0.7,
        duration: options.duration * 0.3,
        ease: "power2.out"
      })
      .to(rippleElement, {
        scale: 6,
        opacity: 0,
        duration: options.duration * 0.7,
        ease: "power3.out"
      }, "-=0.1");

    // Add subtle glow effect for heritage aesthetics
    gsap.to(rippleElement, {
      boxShadow: `
        0 0 40px ${options.color},
        inset 0 0 20px rgba(255, 255, 255, 0.05)
      `,
      duration: options.duration * 0.4,
      ease: "power2.out"
    });
  }
}

/**
 * React hook for easy ripple integration
 */
export const useRippleEffect = (variant: RippleOptions['variant'] = 'heritage') => {
  const createRipple = (event: React.MouseEvent, element?: HTMLElement) => {
    const target = element || (event.currentTarget as HTMLElement);
    
    switch (variant) {
      case 'glass':
        RippleEffect.createGlassRipple(event, target);
        break;
      case 'stone':
        RippleEffect.createStoneRipple(event, target);
        break;
      case 'blue':
        RippleEffect.createBlueRipple(event, target);
        break;
      default:
        RippleEffect.createHeritageRipple(event, target);
        break;
    }
  };

  return { createRipple };
};

// CSS class for ripple container elements
export const rippleContainerClass = 'relative overflow-hidden';
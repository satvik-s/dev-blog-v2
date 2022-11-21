import cn from 'classnames';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from 'styles/mobile-menu.module.css';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    },
  );

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button
        className={cn(styles.burger, 'visible md:hidden')}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            'flex flex-col absolute bg-gray-100 dark:bg-gray-900',
            isMenuRendered && styles.menuRendered,
          )}
        >
          <li
            className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold"
            style={{ transitionDelay: '150ms' }}
          >
            <Link href="/" className="flex w-auto pb-4">
              Home
            </Link>
          </li>
          <li
            className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold"
            style={{ transitionDelay: '175ms' }}
          >
            <Link href="/blog" className="flex w-auto pb-4">
              Blog
            </Link>
          </li>
          <li
            className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold"
            style={{ transitionDelay: '200ms' }}
          >
            <Link href="/dashboard" className="flex w-auto pb-4">
              Dashboard
            </Link>
          </li>
          <li
            className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold"
            style={{ transitionDelay: '225ms' }}
          >
            <Link href="/snippets" className="flex w-auto pb-4">
              Snippets
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}

function MenuIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

interface Options {
  enterDelay?: number;
  exitDelay?: number;
  onUnmount?: () => void;
}

function useDelayedRender(active: boolean = false, options: Options = {}) {
  const [, force] = useState<any>();
  const mounted = useRef(active);
  const rendered = useRef(false);
  const renderTimer = useRef<NodeJS.Timeout | null>(null);
  const unmountTimer = useRef<NodeJS.Timeout | null>(null);
  const prevActive = useRef(active);

  const recalculate = useCallback(() => {
    const { enterDelay = 1, exitDelay = 0 } = options;

    if (prevActive.current) {
      // Mount immediately
      mounted.current = true;
      if (unmountTimer.current) clearTimeout(unmountTimer.current);

      if (enterDelay <= 0) {
        // Render immediately
        rendered.current = true;
      } else {
        if (renderTimer.current) return;

        // Render after a delay
        renderTimer.current = setTimeout(() => {
          rendered.current = true;
          renderTimer.current = null;
          force({});
        }, enterDelay);
      }
    } else {
      // Immediately set to unrendered
      rendered.current = false;

      if (exitDelay <= 0) {
        mounted.current = false;
      } else {
        if (unmountTimer.current) return;

        // Unmount after a delay
        unmountTimer.current = setTimeout(() => {
          mounted.current = false;
          unmountTimer.current = null;
          force({});
        }, exitDelay);
      }
    }
  }, [options]);

  // When the active prop changes, need to re-calculate
  if (active !== prevActive.current) {
    prevActive.current = active;
    // We want to do this synchronously with the render, not in an effect
    // this way when active → true, mounted → true in the same pass
    recalculate();
  }

  return {
    mounted: mounted.current,
    rendered: rendered.current,
  };
}

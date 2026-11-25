import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Lazily registers GSAP plugins on the client and returns gsap + ScrollTrigger.
 */
export function getGsap() {
	if (typeof window !== 'undefined' && !registered) {
		gsap.registerPlugin(ScrollTrigger);
		registered = true;
	}
	return { gsap, ScrollTrigger };
}

/**
 * Checks whether the user permits full motion animations.
 */
export function prefersFullMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
}

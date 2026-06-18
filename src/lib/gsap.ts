import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip);

// Configure default global ScrollTrigger settings
ScrollTrigger.defaults({
  markers: false, // Ensure no debug markers in final implementation
});

export { gsap, ScrollTrigger, Flip };

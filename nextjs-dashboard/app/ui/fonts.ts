import {
  Inter,
  Lusitana,
  Tajawal,
  Great_Vibes,
  Pixelify_Sans,
  Tilt_Neon,
  WindSong,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
// nextJS tutorial font
export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
});
// body font
export const tajawal = Tajawal({
  subsets: ['latin'],
  weight: ['400', '700'],
});
// cursive fonts
export const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
});
export const windSong = WindSong({
  subsets: ['latin'],
  weight: ['400'],
});

// title font
export const tiltNeon = Tilt_Neon({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-sans',
});

// 8-bit retro
export const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-sans',
});

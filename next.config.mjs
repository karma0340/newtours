
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google Auth profile pictures
      },
<<<<<<< HEAD
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost', 
      'res.cloudinary.com', 
      'via.placeholder.com',
      'images.unsplash.com',
      'unsplash.com'
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
}

module.exports = nextConfig
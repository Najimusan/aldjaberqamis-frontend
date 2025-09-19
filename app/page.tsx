'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { productsApi } from '@/lib/api'
import { Product } from '@/types'
import { useEffect, useState, useRef } from 'react'

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const categoriesRef = useRef<HTMLDivElement | null>(null)
  const productsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products?page=1&limit=8')
      if (response.ok) {
        const data = await response.json()
        console.log('Produits chargés:', data.data)
        setFeaturedProducts(data.data || [])
      } else {
        console.error('Erreur lors du chargement des produits:', response.status)
        setFeaturedProducts([])
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
      setFeaturedProducts([])
    } finally {
      setIsLoading(false)
    }
  }

    fetchFeaturedProducts()
  }, [])

  const features = [
    {
      icon: Truck,
      title: 'Livraison rapide',
      description: 'Livraison gratuite en 24-48h dans toute l\'Algérie'
    },
    {
      icon: Shield,
      title: 'Qualité garantie',
      description: 'Produits de qualité supérieure, soigneusement sélectionnés'
    },
    {
      icon: Headphones,
      title: 'Service client',
      description: 'Support client disponible 7j/7 pour vous accompagner'
    }
  ]

  const categories = [
    {
      name: 'Qamis',
      description: 'Qamis élégants pour tous les âges',
      image: '/images/qamis-category.jpg',
      href: '/catalogue?category=qamis'
    },
    {
      name: 'Hidjab',
      description: 'Hidjabs et foulards pour femmes',
      image: '/images/hidjab-category.jpg',
      href: '/catalogue?category=hidjab'
    },
    {
      name: 'Parfum',
      description: 'Parfums et eaux de toilette orientaux',
      image: '/images/parfum-category.jpg',
      href: '/catalogue?category=parfum'
    },
    {
      name: 'Pantalon',
      description: 'Pantalons traditionnels et modernes',
      image: '/images/pantalon-category.jpg',
      href: '/catalogue?category=pantalon'
    },
    {
      name: 'Jabador',
      description: 'Ensembles jabador pour hommes et femmes',
      image: '/images/jabador-category.jpg',
      href: '/catalogue?category=jabador'
    },
    {
      name: 'Accessoires',
      description: 'Tasbih, chapeaux et accessoires',
      image: '/images/accessories-category.jpg',
      href: '/catalogue?category=accessoires'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-black opacity-50" />
          <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
          
          <div className="relative z-10 container-custom section-padding text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                <span className="text-gradient">Al Djaber Qamis</span>
              </h1>
              <p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Découvrez notre collection exclusive de qamis et vêtements musulmans de qualité supérieure, 
                conçus avec soin pour honorer votre foi et votre style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/catalogue" className="btn-primary text-lg px-8 py-4">
                    Découvrir la collection
                    <ArrowRight className="ml-2 inline" size={20} />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
                    Nous contacter
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"
          />
        </section>

        {/* Features Section moved to A Propos */}

        {/* Categories Section (horizontal scroll) */}
        <section className="py-20">
          <div className="container-custom section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nos catégories
              </h2>
              <p className="text-dark-300 text-lg max-w-2xl mx-auto">
                Explorez notre gamme complète de produits soigneusement sélectionnés pour vous.
              </p>
            </motion.div>

            <div className="relative">
              <div className="flex gap-6 overflow-x-auto scroll-smooth pb-2 px-16 scrollbar-hide" ref={categoriesRef}>
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="shrink-0 w-72"
                  >
                    <Link href={category.href} className="block">
                      <div className="relative h-48 bg-dark-800 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {category.name}
                          </h3>
                          <p className="text-dark-300 text-sm">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <button
                aria-label="Défiler vers la gauche"
                onClick={() => categoriesRef.current?.scrollBy({ left: -360, behavior: 'smooth' })}
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur border border-white/30 shadow-lg transition z-20"
              >
                ◀
              </button>
              <button
                aria-label="Défiler vers la droite"
                onClick={() => categoriesRef.current?.scrollBy({ left: 360, behavior: 'smooth' })}
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur border border-white/30 shadow-lg transition z-20"
              >
                ▶
              </button>
            </div>
          </div>
        </section>

        {/* Featured Products Section (horizontal scroll) */}
        <section className="py-20 bg-dark-900">
          <div className="container-custom section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Produits en vedette
              </h2>
              <p className="text-dark-300 text-lg max-w-2xl mx-auto">
                Découvrez nos produits les plus populaires, soigneusement sélectionnés pour leur qualité et leur style.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="flex gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-hide" ref={productsRef}>
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="shrink-0 w-72 bg-dark-800 rounded-xl p-6 animate-pulse">
                    <div className="w-full h-40 bg-dark-700 rounded-lg mb-4" />
                    <div className="h-4 bg-dark-700 rounded mb-2" />
                    <div className="h-4 bg-dark-700 rounded w-3/4 mb-4" />
                    <div className="h-6 bg-dark-700 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto scroll-smooth pb-2 px-16 scrollbar-hide" ref={productsRef}>
                  {featuredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="shrink-0 w-72"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
                <button
                  aria-label="Défiler vers la gauche"
                  onClick={() => productsRef.current?.scrollBy({ left: -360, behavior: 'smooth' })}
                  className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur border border-white/30 shadow-lg transition z-20"
                >
                  ◀
                </button>
                <button
                  aria-label="Défiler vers la droite"
                  onClick={() => productsRef.current?.scrollBy({ left: 360, behavior: 'smooth' })}
                  className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur border border-white/30 shadow-lg transition z-20"
                >
                  ▶
                </button>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/catalogue" className="btn-primary text-lg px-8 py-4">
                Voir tous les produits
                <ArrowRight className="ml-2 inline" size={20} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container-custom section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ce que disent nos clients
              </h2>
              <p className="text-dark-300 text-lg max-w-2xl mx-auto">
                Découvrez les témoignages de nos clients satisfaits qui nous font confiance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Nazim Ab.',
                  location: 'الجزائر',
                  rating: 5,
                  comment: 'خدمة ممتازة ومنتجات عالية الجودة. أنصح بشدة!'
                },
                {
                  name: 'Youcef Deg.',
                  location: 'وهران',
                  rating: 5,
                  comment: 'توصيل سريع وتغليف أنيق. القميص رائع، تماماً كما في الصورة.'
                },
                {
                  name: 'Ramy Hsk.',
                  location: 'قسنطينة',
                  rating: 5,
                  comment: 'خدمة عملاء استثنائية ومنتجات أصيلة. متجر جدير بالثقة!'
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-dark-800 rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                  <p className="text-dark-300 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-dark-400 text-sm">{testimonial.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage



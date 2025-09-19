'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Shield, Award, Users, Clock, MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const AboutPage: React.FC = () => {
  const features = [
    { icon: Clock, title: 'Livraison rapide', description: "Livraison gratuite en 24-48h dans toute l'Algérie" },
    { icon: Shield, title: 'Qualité garantie', description: 'Produits de qualité supérieure, soigneusement sélectionnés' },
    { icon: Users, title: 'Service client', description: 'Support client disponible 7j/7 pour vous accompagner' }
  ]
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Notre passion pour l\'artisanat traditionnel se reflète dans chaque produit que nous créons.'
    },
    {
      icon: Shield,
      title: 'Qualité',
      description: 'Nous nous engageons à offrir des produits de la plus haute qualité, soigneusement sélectionnés.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'L\'excellence dans le service client et la satisfaction de nos clients sont nos priorités.'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Nous construisons une communauté forte autour de valeurs partagées et de traditions respectées.'
    }
  ]

  const team = [
    {
      name: 'Youcef',
      role: 'Fondateur'
    },
    {
      name: 'Ramy',
      role: 'Co-fondateur'
    },
    {
      name: 'Nazim',
      role: 'Développeur'
    }
  ]

  const stats = [
    { number: '500+', label: 'Clients satisfaits' },
    { number: '1000+', label: 'Produits vendus' },
    { number: '48', label: 'Wilayas desservies' }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                À propos de nous
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Une boutique de jeunes très dévoués dédiée à l'excellence dans l'artisanat traditionnel musulman en Algérie.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Nos Réalisations</h2>
              <p className="text-xl text-gray-400">Des chiffres qui témoignent de notre engagement et de notre croissance</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center bg-gray-800 p-8 rounded-lg"
              >
                <div className="text-5xl font-bold text-white mb-4">{stats[0].number}</div>
                <div className="text-xl text-gray-400">{stats[0].label}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center bg-gray-800 p-8 rounded-lg"
              >
                <div className="text-5xl font-bold text-white mb-4">{stats[1].number}</div>
                <div className="text-xl text-gray-400">{stats[1].label}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center bg-gray-800 p-8 rounded-lg"
              >
                <div className="text-5xl font-bold text-white mb-4">{stats[2].number}</div>
                <div className="text-xl text-gray-400">{stats[2].label}</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pourquoi choisir Al Djaber Qamis */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Pourquoi choisir Al Djaber Qamis ?</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">Nous vous offrons la meilleure expérience d'achat avec des produits de qualité et un service exceptionnel.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center bg-gray-900 rounded-lg p-8"
                >
                  <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Localisation */}
        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Où nous trouver</h2>
              <p className="text-xl text-gray-400">Boutique située à Mohammadia, Alger</p>
            </motion.div>

            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Localisation Al Djaber Qamis"
                src="https://www.google.com/maps?q=P4MP%2B525%2C%20Mohammadia&z=17&output=embed"
                width="100%"
                height="420"
                loading="lazy"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="text-center mt-4">
              <a
                href="https://maps.app.goo.gl/TqvaEgCZkbiuWYiC6?g_st=ipc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Ouvrir dans Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Nos Valeurs</h2>
              <p className="text-xl text-gray-400">
                Les principes qui guident notre travail au quotidien
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gray-900 p-6 rounded-lg h-full">
                    <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Notre Équipe</h2>
              <p className="text-xl text-gray-400">
                Les personnes qui font d'Al Djaber Qamis ce qu'elle est aujourd'hui
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-800 p-8 rounded-lg text-center"
                >
                  <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-gray-400 text-lg">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre Engagement */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-white mb-6">Notre Engagement</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Livraison Rapide</h3>
                      <p className="text-gray-400">
                        Livraison gratuite en 24-48h dans toute l'Algérie pour vous offrir 
                        un service de qualité.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Shield className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Qualité Garantie</h3>
                      <p className="text-gray-400">
                        Chaque produit est soigneusement vérifié avant expédition pour garantir 
                        votre satisfaction.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Made in Algeria</h3>
                      <p className="text-gray-400">
                        Nous privilégions les artisans locaux et les matériaux de qualité 
                        pour soutenir l'économie algérienne.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gray-900 p-8 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Contactez-nous</h3>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <strong className="text-white">Adresse :</strong><br />
                    Rue de la Liberté, Alger Centre<br />
                    Alger, Algérie
                  </div>
                  <div>
                    <strong className="text-white">Téléphone :</strong><br />
                    +213 21 12 34 56
                  </div>
                  <div>
                    <strong className="text-white">Email :</strong><br />
                    contact@aldjaberqamis.dz
                  </div>
                  <div>
                    <strong className="text-white">Horaires :</strong><br />
                    Dimanche - Jeudi : 9h00 - 18h00<br />
                    Vendredi : 9h00 - 12h00
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage




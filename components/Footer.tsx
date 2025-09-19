'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    boutique: [
      { name: 'Catalogue', href: '/catalogue' },
    ],
    service: [
      { name: 'À propos', href: '/a-propos' },
    ],
    legal: [
      { name: 'Mentions légales', href: '/mentions-legales' },
      { name: 'Politique de confidentialité', href: '/confidentialite' },
      { name: 'CGV', href: '/cgv' },
      { name: 'FAQ', href: '/faq' },
    ],
  }

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/al_djaber_qamis?igsh=MTh6Zm5rOWZsYzR1bw==' },
  ]

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="container-custom section-padding">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo et description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-dark-700">
                  <Image
                    src="/images/profile-avatar.png"
                    alt="Logo Al Djaber Qamis"
                    fill
                    sizes="32px"
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="text-xl font-bold text-white">Al Djaber Qamis</span>
              </div>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Votre boutique de confiance pour les qamis et vêtements musulmans de qualité en Algérie.
                Nous nous engageons à vous offrir les meilleurs produits avec un service client exceptionnel.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-dark-300">
                  <Mail size={16} />
                  <span>aldjaberqamis@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-dark-300">
                  <Phone size={16} />
                  <span>+213 791 466 224</span>
                </div>
                <div className="flex items-center space-x-3 text-dark-300">
                  <MapPin size={16} />
                  <span>Alger Mohammadia, Algérie</span>
                </div>
              </div>
            </motion.div>

            {/* Liens boutique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-4">Boutique</h3>
              <ul className="space-y-3">
                {footerLinks.boutique.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-dark-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Liens service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-4">Service Client</h3>
              <ul className="space-y-3">
                {footerLinks.service.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-dark-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-dark-300">
                  <Mail size={16} />
                  <span>aldjaberqamis@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-dark-300">
                  <Phone size={16} />
                  <span>+213 791 466 224</span>
                </div>
                <div className="flex items-center space-x-3 text-dark-300">
                  <MapPin size={16} />
                  <span>Alger Mohammadia, Algérie</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Réseaux sociaux */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-dark-800"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <span className="text-dark-300">Suivez-nous :</span>
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-2 bg-dark-800 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700 transition-all duration-300"
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="text-dark-400 text-sm">
                © {currentYear} Al Djaber Qamis. Tous droits réservés.
              </div>
            </div>
            
            {/* Développeur */}
            <div className="mt-4 text-center">
              <p className="text-dark-500 text-sm">
                Développé par <span className="text-white font-medium">Najimu</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer



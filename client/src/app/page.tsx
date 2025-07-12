"use client"

import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect } from 'react';

export default function HomePage() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  const productCategories = [
    { name: "Footwear", image: "/footwear.png", color: "bg-green-100", textColor: "text-green-800" },
    { name: "Accessories", image: "/Accessories.png", color: "bg-yellow-100", textColor: "text-yellow-800" },
    { name: "Clothes", image: "/Clothes.png", color: "bg-pink-100", textColor: "text-pink-800" }
  ];

  const products = [
    { name: "Baggy Pants", image: "/baggy_pants.png", color: "bg-teal-100", textColor: "text-teal-800" },
    { name: "Bangles", image: "/bangles.png", color: "bg-purple-100", textColor: "text-purple-800" },
    { name: "Frock", image: "/frocks.png", color: "bg-red-100", textColor: "text-red-800" },
    { name: "Watch", image: "/watches.png", color: "bg-emerald-100", textColor: "text-emerald-800" },
    { name: "Denim Skirt", image: "/denim_skirt.png", color: "bg-yellow-100", textColor: "text-yellow-800" },
    { name: "Cardigan", image: "/cardigans.png", color: "bg-pink-100", textColor: "text-pink-800" },
    { name: "Mom Jeans", image: "/mom-jeans.png", color: "bg-orange-100", textColor: "text-orange-800" },
    { name: "Jhumkas", image: "/jhumkas.png", color: "bg-cyan-100", textColor: "text-cyan-800" }
  ];

  const teamMembers = [
    { name: "Lokesh", image: "/lokesh_team_member.png" },
    { name: "Prarit", image: "/prarit_team_member.png" },
    { name: "Teena", image: "/teena_team_member.png" },
    { name: "Vaibhav", image: "/vaibhav_team_member.png" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
        <Header />

        {/* Hero Section with Background Gradient */}
        <main className="overflow-hidden">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center">
            {/* Left Side - Content with Yellow Background */}
            <div className="w-full lg:w-1/2 px-6 lg:px-12 z-10 bg-yellow-100 min-h-[90vh] flex items-center justify-center">
              <div className="max-w-2xl mx-auto text-center lg:text-left">\
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.h1
                    className="text-5xl lg:text-7xl font-black mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="text-red-500">ReWea</span>
                    <span className="text-green-500">R</span>
                  </motion.h1>

                  <motion.h2
                    className="text-2xl lg:text-4xl font-bold text-black mb-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    with flair
                  </motion.h2>

                  <motion.h3
                    className="text-xl lg:text-2xl font-semibold text-black mb-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Show your
                  </motion.h3>

                  <motion.h3
                    className="text-3xl lg:text-5xl font-black text-red-500 mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    CaRe
                  </motion.h3>

                  <motion.p
                    className="text-lg text-black mb-8 italic font-medium"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Trade your threads. Refresh your vibe.<br />
                    ReWear fashion that's fresh, fun,<br />
                    and future-ready.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white"
                      >
                        Start SWAP
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="bg-gradient-to-r from-pink-400 to-yellow-300 text-white 
             font-semibold px-6 py-2 rounded-xl shadow-lg 
             hover:from-pink-500 hover:to-yellow-400 transition-all duration-300"
                      >
                        Swap Now
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        className="font-semibold text-gray-800 hover:bg-gray-800/20 px-6 py-2 rounded-xl transition-all duration-300 border border-gray-600"
                      >
                        Learn more
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Right Side - Fashion Image with Pink Background */}
            <motion.div
              className="hidden lg:block w-1/2 relative bg-gradient-to-br from-pink-200 to-pink-300 min-h-[90vh]"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative z-10 p-8 h-full flex items-center">
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    ULTIMATE FASHION<br />
                    <span className="text-2xl">DESTINATION</span>
                  </h2>

                  <motion.div
                    className="relative w-full h-96 mb-6 rounded-2xl overflow-hidden bg-white/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/landing_page_card.png"
                      alt="Fashion Collection"
                      fill
                      className="object-contain p-2"
                      priority
                    />
                  </motion.div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-800">2025 ⭐</span>
                    <span className="text-lg font-bold text-gray-800">NEW COLLECTION</span>
                  </div>

                  <div className="text-center">
                    <motion.span
                      className="bg-gradient-to-r from-yellow-300 to-orange-300 text-black px-6 py-3 rounded-full font-bold text-sm inline-block shadow-lg"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(255, 193, 7, 0.3)",
                          "0 0 30px rgba(255, 193, 7, 0.6)",
                          "0 0 20px rgba(255, 193, 7, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      TRENDING ⭐ 2025 ⭐ NEW COLLECTION
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Moving Tape */}
          <div className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 text-black py-2 overflow-hidden">
            <motion.div
              className="whitespace-nowrap text-lg font-bold"
              animate={{ x: [1000, -1000] }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              ⭐ NEW COLLECTION 2025 ⭐ TRENDING NOW ⭐ NEW COLLECTION 2025 ⭐ TRENDING NOW ⭐ NEW COLLECTION 2025 ⭐ TRENDING NOW ⭐
            </motion.div>
          </div>

          {/* Category Selection */}
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl font-bold text-center mb-12 text-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Category Selection
              </motion.h2>
              <motion.div
                className="grid md:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {productCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`${category.color} border-0 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl rounded-3xl`}>
                      <CardContent className="p-8 text-center">
                        <motion.div
                          className="w-40 h-40 mx-auto mb-6 relative"
                          whileHover={{ rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-contain"
                          />
                        </motion.div>
                        <h3 className={`text-2xl font-bold ${category.textColor}`}>
                          {category.name}
                        </h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Product Listing with Carousel */}
          <section className="py-16 px-6 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-4xl font-bold text-center mb-12 text-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Product Listing
              </motion.h2>

              {/* Carousel */}
              <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                  {products.concat(products).map((product, index) => (
                    <div key={`${product.name}-${index}`} className="embla__slide flex-[0_0_250px] min-w-0 pl-4">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className={`${product.color} border-0 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl rounded-3xl h-full`}>
                          <CardContent className="p-6 text-center">
                            <motion.div
                              className="w-32 h-32 mx-auto mb-4 relative"
                              whileHover={{ rotate: 5 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain"
                              />
                            </motion.div>
                            <Badge variant="secondary" className={`${product.textColor} bg-white/90 font-semibold px-4 py-2 rounded-full`}>
                              {product.name}
                            </Badge>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl font-bold text-center mb-12 text-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                About Us
              </motion.h2>

              {/* Our Story */}
              <motion.div
                className="grid lg:grid-cols-2 gap-8 mb-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                  <Card className="bg-yellow-200 border-0 overflow-hidden hover:shadow-lg transition-all duration-300 rounded-3xl">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-yellow-900 mb-4">
                        Our Story (Why We Started)
                      </h3>
                      <p className="text-yellow-800 leading-relaxed mb-6">
                        Born from the frustration of overflowing wardrobes and underused outfits, ReWear started with a simple idea — what if your forgotten clothes could become someone else's new favorites? We envision fashion cleaner, accessible, and fun.
                      </p>
                      <motion.div
                        className="flex justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-2xl">👥</span>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                  <Card className="bg-pink-200 border-0 overflow-hidden hover:shadow-lg transition-all duration-300 rounded-3xl">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-pink-900 mb-4">
                        The Mission (What We Stand For)
                      </h3>
                      <p className="text-pink-800 leading-relaxed mb-6">
                        ReWear is redefining fashion through community-driven clothing swaps. Look good, reduce waste, and make a positive impact—one outfit at a time.
                      </p>
                      <motion.div
                        className="flex justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-24 h-24 bg-pink-300 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-2xl">🌱</span>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Team */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-8 text-gray-800">
                  Join the Movement
                </h3>
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.name}
                      className="text-center group"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-28 h-28 mx-auto mb-3 relative rounded-full overflow-hidden shadow-lg">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="font-semibold text-gray-700 text-lg">{member.name}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-6 bg-gradient-to-r from-cyan-100 to-blue-100">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                className="text-4xl font-bold mb-8 text-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to Start Your Fashion Journey?
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join thousands of fashion enthusiasts in the sustainable style revolution
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/browse">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-10 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-semibold"
                    >
                      Start Browsing
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/register">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-10 py-4 text-lg border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                    >
                      Join Community
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </SessionProvider>
  );
}

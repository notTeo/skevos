import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Collection from './components/Collection'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { lang } = useLanguage()

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Hero />
          <Collection />
          <About />
          <Contact />
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

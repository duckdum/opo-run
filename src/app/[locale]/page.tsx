import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Packages from '@/components/Packages';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import SignUp from '@/components/SignUp';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <main className="relative">
        <Navigation />
        <Hero />
        <About />
        <Packages />
        <Services />
        <Gallery />
        <SignUp />
        <Partners />
        <Footer />
      </main>
    </>
  );
}

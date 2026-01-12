import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Packages from '@/components/Packages';
import SignUp from '@/components/SignUp';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pacotes | Oporto Running Lab',
  description: 'Escolhe o pacote ideal para ti. Starter, Evolution ou Performance - temos o programa certo para os teus objetivos de corrida.',
};

export default function PackagesPage() {
  return (
    <main className="relative pt-20">
      <Navigation />
      <Packages />
      <SignUp />
      <Footer />
    </main>
  );
}

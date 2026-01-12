export interface BlogPost {
  id: number;
  slug: string;
  title: { pt: string; en: string };
  excerpt: { pt: string; en: string };
  content: { pt: string; en: string };
  author: string;
  date: string;
  readTime: number;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'como-melhorar-tecnica-corrida',
    title: {
      pt: 'Como Melhorar a Tua Técnica de Corrida',
      en: 'How to Improve Your Running Technique',
    },
    excerpt: {
      pt: 'Descobre os princípios fundamentais para correr com mais eficiência e menos risco de lesão. A técnica correta é a base de uma corrida sustentável.',
      en: 'Discover the fundamental principles to run more efficiently and with less risk of injury. Proper technique is the foundation of sustainable running.',
    },
    content: {
      pt: `A técnica de corrida é frequentemente negligenciada por corredores amadores, mas é um dos fatores mais importantes para melhorar performance e prevenir lesões. Neste artigo, vamos explorar os princípios fundamentais que podem transformar a tua forma de correr.

## Postura: A Base de Tudo

A postura correta começa pela cabeça. Mantém o olhar direcionado para a frente, cerca de 10-15 metros à tua frente. Os ombros devem estar relaxados e afastados das orelhas. Um erro comum é tensionar os ombros, especialmente quando estamos cansados.

O tronco deve estar ligeiramente inclinado para a frente, mas a partir dos tornozelos e não da cintura. Esta inclinação natural ajuda a usar a gravidade a nosso favor.

## Cadência: O Ritmo dos Passos

A cadência ideal para a maioria dos corredores situa-se entre 170-180 passos por minuto. Uma cadência mais alta geralmente significa passos mais curtos, o que reduz o impacto nas articulações e melhora a eficiência.

Para verificar a tua cadência, conta quantas vezes o teu pé direito toca o chão em 30 segundos e multiplica por 4. Se estiveres abaixo de 170, tenta aumentar gradualmente.

## Contacto com o Solo

O ponto de contacto ideal é debaixo do centro de gravidade do corpo, não à frente. Quando aterramos muito à frente (overstriding), criamos uma força de travagem que desperdiça energia e aumenta o stress nas articulações.

Imagina que estás a correr sobre uma superfície quente - o objetivo é minimizar o tempo de contacto com o solo.

## Os Braços: Motores Auxiliares

Os braços não são apenas passageiros na corrida. Um movimento eficiente dos braços pode melhorar significativamente a tua performance. Mantém os cotovelos a aproximadamente 90 graus e balança os braços para a frente e para trás, não de lado a lado.

## Exercícios Práticos

1. **Skipping**: Ajuda a melhorar a cadência e o contacto com o solo
2. **Corrida em A**: Melhora a postura e o levantamento dos joelhos
3. **Corrida em B**: Trabalha a extensão da perna e o contacto com o solo

## Conclusão

Melhorar a técnica de corrida é um processo gradual. Foca-te num elemento de cada vez e pratica consistentemente. Com o tempo, estes movimentos tornar-se-ão naturais e automáticos.

Na Oporto Running Lab, trabalhamos individualmente com cada atleta para identificar áreas de melhoria e desenvolver um plano personalizado de correção técnica.`,
      en: `Running technique is often overlooked by amateur runners, but it's one of the most important factors for improving performance and preventing injuries. In this article, we'll explore the fundamental principles that can transform the way you run.

## Posture: The Foundation of Everything

Correct posture starts with your head. Keep your gaze directed forward, about 10-15 meters ahead. Your shoulders should be relaxed and away from your ears. A common mistake is tensing the shoulders, especially when we're tired.

Your torso should be slightly leaning forward, but from the ankles, not the waist. This natural lean helps us use gravity to our advantage.

## Cadence: The Rhythm of Your Steps

The ideal cadence for most runners is between 170-180 steps per minute. A higher cadence generally means shorter steps, which reduces impact on joints and improves efficiency.

To check your cadence, count how many times your right foot hits the ground in 30 seconds and multiply by 4. If you're below 170, try to gradually increase it.

## Ground Contact

The ideal contact point is under your body's center of gravity, not in front of it. When we land too far ahead (overstriding), we create a braking force that wastes energy and increases stress on joints.

Imagine you're running on a hot surface - the goal is to minimize ground contact time.

## Arms: Auxiliary Engines

Arms are not just passengers in running. Efficient arm movement can significantly improve your performance. Keep your elbows at approximately 90 degrees and swing your arms forward and backward, not side to side.

## Practical Exercises

1. **Skipping**: Helps improve cadence and ground contact
2. **A-Skip**: Improves posture and knee lift
3. **B-Skip**: Works on leg extension and ground contact

## Conclusion

Improving running technique is a gradual process. Focus on one element at a time and practice consistently. Over time, these movements will become natural and automatic.

At Oporto Running Lab, we work individually with each athlete to identify areas for improvement and develop a personalized technical correction plan.`,
    },
    author: 'Herval Costa',
    date: '2025-01-20',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    slug: 'importancia-forca-corredores',
    title: {
      pt: 'A Importância do Treino de Força para Corredores',
      en: 'The Importance of Strength Training for Runners',
    },
    excerpt: {
      pt: 'Por que razão o treino de força é essencial para prevenir lesões e melhorar performance. Descobre como integrar musculação na tua rotina.',
      en: 'Why strength training is essential for injury prevention and performance improvement. Learn how to integrate weight training into your routine.',
    },
    content: {
      pt: `Durante muito tempo, os corredores evitaram o ginásio com medo de ganhar massa muscular desnecessária. Hoje sabemos que o treino de força não só não prejudica a corrida, como é essencial para corredores de todos os níveis.

## Por Que Corredores Precisam de Força?

### Prevenção de Lesões

A maioria das lesões em corredores está relacionada com fraqueza muscular ou desequilíbrios. Músculos fortes protegem as articulações e absorvem melhor o impacto repetitivo da corrida.

Os glúteos, em particular, são fundamentais. Glúteos fracos são uma das principais causas de lesões no joelho, anca e síndrome da banda iliotibial.

### Melhoria da Economia de Corrida

A economia de corrida - a quantidade de oxigénio necessária para manter um determinado ritmo - melhora significativamente com treino de força. Músculos mais fortes são mais eficientes, o que significa que consegues correr mais rápido com menos esforço.

### Velocidade e Potência

Para sprints finais, subidas e corridas mais rápidas, precisas de potência. O treino de força desenvolve a capacidade dos teus músculos de gerar força rapidamente.

## Exercícios Essenciais

### Para as Pernas

1. **Agachamento** - O rei dos exercícios. Trabalha quadríceps, glúteos e core.
2. **Lunges** - Excelentes para trabalhar cada perna individualmente e melhorar equilíbrio.
3. **Deadlift Romeno** - Fundamental para fortalecer a cadeia posterior (glúteos e isquiotibiais).
4. **Step-ups** - Simula o movimento da corrida e trabalha força unilateral.

### Para o Core

1. **Prancha** - Base para estabilidade do tronco.
2. **Dead Bug** - Trabalha coordenação e estabilidade.
3. **Pallof Press** - Excelente para resistência anti-rotação.

### Para os Glúteos

1. **Hip Thrust** - O melhor exercício isolado para glúteos.
2. **Clamshell** - Trabalha o glúteo médio, essencial para estabilidade pélvica.
3. **Single-leg Glute Bridge** - Força unilateral específica para corrida.

## Como Integrar na Tua Rotina

Para a maioria dos corredores, 2-3 sessões de força por semana são suficientes. Cada sessão deve durar entre 30-45 minutos.

### Exemplo de Semana

- **Segunda**: Corrida fácil + força (pernas)
- **Terça**: Corrida intervalada
- **Quarta**: Descanso ou natação
- **Quinta**: Corrida fácil + força (core/glúteos)
- **Sexta**: Corrida tempo
- **Sábado**: Corrida longa
- **Domingo**: Descanso ou força leve

## Conclusão

O treino de força é um investimento que todo corredor deve fazer. Não só vais correr mais rápido e com menos esforço, como vais reduzir drasticamente o risco de lesões.

Na Oporto Running Lab, integramos treino de força em todos os nossos programas, adaptado ao nível e objetivos de cada atleta.`,
      en: `For a long time, runners avoided the gym fearing they'd gain unnecessary muscle mass. Today we know that strength training not only doesn't hinder running, but is essential for runners of all levels.

## Why Do Runners Need Strength?

### Injury Prevention

Most running injuries are related to muscle weakness or imbalances. Strong muscles protect joints and better absorb the repetitive impact of running.

The glutes, in particular, are fundamental. Weak glutes are one of the main causes of knee, hip, and IT band injuries.

### Improved Running Economy

Running economy - the amount of oxygen needed to maintain a certain pace - improves significantly with strength training. Stronger muscles are more efficient, meaning you can run faster with less effort.

### Speed and Power

For final sprints, hills, and faster runs, you need power. Strength training develops your muscles' ability to generate force quickly.

## Essential Exercises

### For Legs

1. **Squat** - The king of exercises. Works quadriceps, glutes, and core.
2. **Lunges** - Excellent for working each leg individually and improving balance.
3. **Romanian Deadlift** - Fundamental for strengthening the posterior chain (glutes and hamstrings).
4. **Step-ups** - Simulates running motion and works unilateral strength.

### For Core

1. **Plank** - Foundation for trunk stability.
2. **Dead Bug** - Works coordination and stability.
3. **Pallof Press** - Excellent for anti-rotation resistance.

### For Glutes

1. **Hip Thrust** - The best isolated exercise for glutes.
2. **Clamshell** - Works the gluteus medius, essential for pelvic stability.
3. **Single-leg Glute Bridge** - Running-specific unilateral strength.

## How to Integrate Into Your Routine

For most runners, 2-3 strength sessions per week are sufficient. Each session should last between 30-45 minutes.

### Sample Week

- **Monday**: Easy run + strength (legs)
- **Tuesday**: Interval run
- **Wednesday**: Rest or swimming
- **Thursday**: Easy run + strength (core/glutes)
- **Friday**: Tempo run
- **Saturday**: Long run
- **Sunday**: Rest or light strength

## Conclusion

Strength training is an investment every runner should make. Not only will you run faster with less effort, but you'll drastically reduce your injury risk.

At Oporto Running Lab, we integrate strength training into all our programs, adapted to each athlete's level and goals.`,
    },
    author: 'Felipe Moura',
    date: '2025-01-15',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    slug: 'preparar-primeira-meia-maratona',
    title: {
      pt: 'Como Preparar a Tua Primeira Meia Maratona',
      en: 'How to Prepare for Your First Half Marathon',
    },
    excerpt: {
      pt: 'Um guia completo para quem quer completar os primeiros 21km. Do plano de treino à nutrição e mentalidade no dia da prova.',
      en: 'A complete guide for those who want to complete their first 21km. From training plan to nutrition and race day mindset.',
    },
    content: {
      pt: `Completar uma meia maratona é um objetivo transformador. São 21,097km que representam um desafio significativo, mas absolutamente alcançável com a preparação correta. Este guia vai ajudar-te em cada passo do caminho.

## Tens o Que Precisa?

Antes de começares, certifica-te que tens uma base mínima de corrida. Idealmente, deves conseguir correr confortavelmente 5-8km sem parar. Se ainda não estás nesse nível, dedica algumas semanas a construir essa base primeiro.

## O Plano de Treino

### Duração

Um plano típico de preparação para meia maratona tem entre 10-14 semanas. Se és iniciante, opta por 14 semanas para permitir uma progressão mais gradual.

### Estrutura Semanal

Uma semana típica inclui:
- **3-4 corridas** de diferentes tipos
- **1-2 dias de treino cruzado** (natação, ciclismo)
- **1-2 dias de descanso** completo

### Tipos de Treino

1. **Corrida Longa** - Uma vez por semana, aumenta gradualmente até 18-19km
2. **Corrida Fácil** - Ritmo conversacional, recuperação ativa
3. **Corrida Tempo** - Ritmo "confortavelmente desconfortável"
4. **Intervalos** - Períodos mais rápidos intercalados com recuperação

### Progressão do Volume

Segue a regra dos 10%: não aumentes o volume semanal mais de 10% de uma semana para outra. A cada 3-4 semanas, faz uma semana de descarga reduzindo o volume em 20-30%.

## Nutrição

### Durante o Treino

À medida que as corridas longas aumentam, vais precisar de nutrição durante o exercício. Começa a praticar com gels, barras ou outras opções a partir dos 60-75 minutos de corrida.

### Semana da Prova

Nos 2-3 dias antes da prova, aumenta ligeiramente a ingestão de hidratos de carbono (carb loading). Evita alimentos novos ou pesados.

### Dia da Prova

- Come o pequeno-almoço habitual 2-3 horas antes
- Hidrata bem, mas não exageres
- Leva os gels ou nutrição que testaste nos treinos

## O Dia da Prova

### Antes da Partida

- Chega cedo para evitar stress
- Faz um aquecimento leve de 10-15 minutos
- Usa roupa que já testaste nos treinos
- Aplica vaselina nas zonas de fricção

### Durante a Corrida

**Primeiros 5km**: Começa mais devagar do que achas que deves. A adrenalina engana-te.

**Km 5-15**: Encontra o teu ritmo. Mantém um esforço constante.

**Km 15-21**: Aqui começa o verdadeiro desafio. Divide mentalmente em segmentos mais pequenos. Foca-te no próximo quilómetro.

### A Mentalidade Certa

- Não te compares com outros corredores
- Aceita que haverá momentos difíceis
- Lembra-te porque estás a fazer isto
- Celebra cada quilómetro conquistado

## Recuperação

Após a prova:
- Continua a mover-te - caminha pelo menos 10-15 minutos
- Reidrata e come algo com proteína e hidratos
- Nos dias seguintes, faz recuperação ativa leve
- Espera pelo menos uma semana antes de voltar a correr normalmente

## Conclusão

A tua primeira meia maratona será uma experiência inesquecível. O mais importante não é o tempo - é completar e desfrutar do processo.

Na Oporto Running Lab, oferecemos programas específicos de preparação para meia maratona com acompanhamento personalizado. Vem treinar connosco e conquista os teus 21km.`,
      en: `Completing a half marathon is a transformative goal. The 21.097km represent a significant challenge, but absolutely achievable with proper preparation. This guide will help you every step of the way.

## Do You Have What It Takes?

Before you start, make sure you have a minimum running base. Ideally, you should be able to comfortably run 5-8km without stopping. If you're not at that level yet, spend a few weeks building that base first.

## The Training Plan

### Duration

A typical half marathon preparation plan is between 10-14 weeks. If you're a beginner, opt for 14 weeks to allow for more gradual progression.

### Weekly Structure

A typical week includes:
- **3-4 runs** of different types
- **1-2 days of cross-training** (swimming, cycling)
- **1-2 days of complete rest**

### Types of Training

1. **Long Run** - Once a week, gradually increase to 18-19km
2. **Easy Run** - Conversational pace, active recovery
3. **Tempo Run** - "Comfortably uncomfortable" pace
4. **Intervals** - Faster periods interspersed with recovery

### Volume Progression

Follow the 10% rule: don't increase weekly volume by more than 10% from one week to the next. Every 3-4 weeks, do a recovery week reducing volume by 20-30%.

## Nutrition

### During Training

As long runs increase, you'll need nutrition during exercise. Start practicing with gels, bars, or other options from 60-75 minutes of running.

### Race Week

In the 2-3 days before the race, slightly increase carbohydrate intake (carb loading). Avoid new or heavy foods.

### Race Day

- Eat your usual breakfast 2-3 hours before
- Hydrate well, but don't overdo it
- Bring the gels or nutrition you tested during training

## Race Day

### Before the Start

- Arrive early to avoid stress
- Do a light warm-up of 10-15 minutes
- Wear clothing you've already tested in training
- Apply petroleum jelly to friction areas

### During the Race

**First 5km**: Start slower than you think you should. Adrenaline deceives you.

**Km 5-15**: Find your rhythm. Maintain a constant effort.

**Km 15-21**: Here begins the real challenge. Mentally divide into smaller segments. Focus on the next kilometer.

### The Right Mindset

- Don't compare yourself to other runners
- Accept that there will be difficult moments
- Remember why you're doing this
- Celebrate each kilometer conquered

## Recovery

After the race:
- Keep moving - walk for at least 10-15 minutes
- Rehydrate and eat something with protein and carbs
- In the following days, do light active recovery
- Wait at least a week before returning to normal running

## Conclusion

Your first half marathon will be an unforgettable experience. The most important thing is not the time - it's completing and enjoying the process.

At Oporto Running Lab, we offer specific half marathon preparation programs with personalized coaching. Come train with us and conquer your 21km.`,
    },
    author: 'Gabriela Santos',
    date: '2025-01-10',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80&auto=format&fit=crop',
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

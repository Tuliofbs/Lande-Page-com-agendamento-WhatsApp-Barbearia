import { useState, useEffect, useRef } from 'react';
import {
  Scissors, Beer, Wind, Car, Star, Calendar, Clock,
  User, Phone, CheckCircle, ChevronRight, ChevronLeft,
  MapPin, MessageCircle, Menu, X, Award,
  Sparkles, Crown, Zap, ArrowRight, Quote
} from 'lucide-react';

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

/* ============== DATA ============== */
const services = [
  {
    id: 'cabelo',
    name: 'Corte de Cabelo',
    description: 'Corte moderno ou clássico, com acabamento perfeito',
    price: 'R$ 60',
    icon: Scissors,
    image: '/images/haircut.jpg',
    duration: '45 min'
  },
  {
    id: 'barba',
    name: 'Barba Tradicional',
    description: 'Toalha quente, navalha e produtos premium',
    price: 'R$ 50',
    icon: Zap,
    image: '/images/beard-trim.jpg',
    duration: '35 min'
  },
  {
    id: 'combo',
    name: 'Combo Cavalheiro',
    description: 'Cabelo + Barba, a experiência completa',
    price: 'R$ 95',
    icon: Crown,
    image: '/images/hero-barber.jpg',
    duration: '1h 20min',
    featured: true
  },
  {
    id: 'sobrancelha',
    name: 'Sobrancelha Masculina',
    description: 'Design e acabamento com navalha',
    price: 'R$ 25',
    icon: Sparkles,
    image: '/images/haircut.jpg',
    duration: '15 min'
  }
];

const professionals = [
  { id: 'a', name: 'Rafael "Rafa" Monteiro', specialty: 'Cortes modernos & Degradês', years: 12 },
  { id: 'b', name: 'Thiago "Thi" Silva', specialty: 'Barba clássica & Navalha', years: 8 },
  { id: 'c', name: 'Lucas Almeida', specialty: 'Cortes clássicos & Vintage', years: 15 },
  { id: 'any', name: 'Qualquer Profissional', specialty: 'O primeiro disponível no horário', years: null }
];

const differentials = [
  { icon: Beer, title: 'Cerveja Gelada', desc: 'Enquanto espera ou durante o atendimento, cortesia da casa.' },
  { icon: Award, title: 'Profissionais Premiados', desc: 'Equipe certificada e sempre atualizada com as últimas tendências.' },
  { icon: Wind, title: 'Ambiente Climatizado', desc: 'Espaço aconchegante com ar condicionado, música e decoração premium.' },
  { icon: Car, title: 'Estacionamento Gratuito', desc: 'Vagas exclusivas para clientes, com manobrista aos sábados.' }
];

const testimonials = [
  {
    name: 'Carlos Henrique',
    role: 'Cliente há 3 anos',
    text: 'Simplesmente a melhor barbearia da região. O Rafa faz um degradê impecável e o ambiente é incomparável. Saio de lá me sentindo um novo homem toda vez.',
    rating: 5
  },
  {
    name: 'André Martins',
    role: 'Cliente há 1 ano',
    text: 'Atendimento premium do início ao fim. Cerveja gelada, café de qualidade, e o Thi domina a navalha como ninguém. Preço justo pela experiência.',
    rating: 5
  },
  {
    name: 'Marcelo Souza',
    role: 'Cliente há 5 anos',
    text: 'Fui cliente em diversas barbearias e nada se compara. O combo cavalheiro é ritual sagrado todo sábado. Recomendo de olhos fechados.',
    rating: 5
  }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00'
];

/* Helper: generate dates for next 14 days */
function generateDates() {
  const dates: { date: Date; day: number; weekday: string; month: string; disabled: boolean }[] = [];
  const today = new Date();
  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay();
    dates.push({
      date: d,
      day: d.getDate(),
      weekday: weekdays[dow],
      month: months[d.getMonth()],
      disabled: dow === 0 // closed on Sundays
    });
  }
  return dates;
}

/* ============== COMPONENTS ============== */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Início', href: '#hero' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Agendar', href: '#agendar' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-ink/95 backdrop-blur-md border-b border-ink-border py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <Scissors className="w-5 h-5 text-ink" strokeWidth={2.5} />
          </div>
          <div className="leading-none">
            <div className="font-serif text-xl font-bold text-white tracking-wide">Elite</div>
            <div className="text-[10px] tracking-[0.3em] text-gold uppercase">Barbearia</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-gray-300 hover:text-gold transition-colors font-medium tracking-wide">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#agendar"
          className="hidden lg:inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-ink font-semibold px-5 py-2.5 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-gold/20"
        >
          Agendar Horário
          <ArrowRight className="w-4 h-4" />
        </a>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink-light border-t border-ink-border mt-3 px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-gray-300 hover:text-gold py-2 font-medium">
              {l.label}
            </a>
          ))}
          <a
            href="#agendar"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 bg-gold text-ink font-semibold px-5 py-3 rounded-full mt-2"
          >
            Agendar Horário <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grain-bg">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-barber.jpg"
          alt="Barbearia Elite"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <span className="text-xs tracking-[0.2em] text-gold uppercase font-medium">Desde 2010</span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white">
            Estilo e tradição <br />
            para o <span className="gold-shimmer italic">homem moderno</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed font-light">
            Mais do que uma barbearia, um ritual. Experiência premium com profissionais premiados,
            produtos de alta qualidade e um ambiente pensado para o seu conforto.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#agendar"
              className="group relative inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-ink font-bold px-8 py-4 rounded-full text-base transition-all hover:shadow-2xl hover:shadow-gold/30 hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              Agendar Seu Horário
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-gold/50 text-white font-medium px-8 py-4 rounded-full text-base transition-all hover:bg-white/5"
            >
              Ver Serviços
            </a>
          </div>

          <div className="flex items-center gap-8 pt-6">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}
              </div>
              <div className="text-sm text-gray-400">+2.500 clientes satisfeitos</div>
            </div>
            <div className="w-px h-12 bg-ink-border"></div>
            <div>
              <div className="font-serif text-2xl font-bold text-gold">15+</div>
              <div className="text-sm text-gray-400">Anos de tradição</div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden border-2 border-gold/20">
            <img
              src="/images/barber-portrait.jpg"
              alt="Barbeiro profissional"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-ink-light border border-ink-border p-5 rounded-sm shadow-2xl shadow-black/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Award className="w-6 h-6 text-gold" />
              </div>
              <div>
                <div className="text-xs text-gold tracking-wider uppercase">Certificado</div>
                <div className="text-white font-semibold text-sm">Premium Quality</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-full flex items-center justify-center bg-ink-light">
            <div className="text-center">
              <div className="font-serif text-2xl font-bold text-gold">4.9</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest">Google</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="text-[10px] tracking-[0.3em] text-gold uppercase">Role para baixo</div>
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent"></div>
      </div>
    </section>
  );
}

function Ribbon() {
  const items = ['Corte Premium', 'Barba com Navalha', 'Cerveja Gelada', 'Ambiente Climatizado', 'Produtos Importados', 'Estacionamento Grátis'];
  const doubled = [...items, ...items];
  return (
    <div className="bg-gold text-ink py-4 overflow-hidden relative">
      <div className="flex marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6 font-serif font-bold uppercase tracking-widest text-sm">
            <span>{item}</span>
            <Scissors className="w-4 h-4" strokeWidth={3} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Diferenciais() {
  return (
    <section id="diferenciais" className="relative py-24 md:py-32 bg-ink grain-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.4em] text-gold uppercase mb-4">Por que nos escolher</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            A experiência <span className="italic text-gold">Elite</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Cada detalhe é pensado para proporcionar o melhor atendimento. Na Barbearia Elite,
            você não é só mais um cliente — você é parte da nossa história.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                className="group vintage-card rounded-sm p-8 text-center hover:border-gold/30 transition-all hover:-translate-y-1 duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all">
                  <Icon className="w-7 h-7 text-gold group-hover:text-ink transition-colors" strokeWidth={1.8} />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">{d.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Services({ onBook }: { onBook: (serviceId: string) => void }) {
  return (
    <section id="servicos" className="relative py-24 md:py-32 bg-ink-light grain-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.4em] text-gold uppercase mb-4">Nossos serviços</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Serviços & <span className="italic text-gold">Preços</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Trabalhamos apenas com produtos de primeira linha e técnicas apuradas por anos de experiência.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className={`group relative overflow-hidden rounded-sm border transition-all duration-500 hover:-translate-y-1 ${
                  s.featured
                    ? 'border-gold bg-gradient-to-br from-gold/10 via-ink-light to-ink-light'
                    : 'border-ink-border bg-ink-surface hover:border-gold/40'
                }`}
              >
                {s.featured && (
                  <div className="absolute top-4 right-4 bg-gold text-ink text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                    Mais Popular
                  </div>
                )}
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-40 h-48 sm:h-auto relative overflow-hidden flex-shrink-0">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink-light sm:from-ink-light sm:via-ink-light/80 sm:to-transparent"></div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gold" strokeWidth={2} />
                          </div>
                          <h3 className="font-serif text-xl md:text-2xl font-bold text-white">{s.name}</h3>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 leading-relaxed">{s.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-serif text-3xl font-bold text-gold">{s.price}</div>
                      <button
                        onClick={() => onBook(s.id)}
                        className="inline-flex items-center gap-2 border border-gold/50 text-gold hover:bg-gold hover:text-ink font-semibold px-5 py-2.5 rounded-full text-sm transition-all"
                      >
                        Agendar
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BookingWidget({ preselectedService }: { preselectedService: string | null }) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<string>('');
  const [professional, setProfessional] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dates = useRef(generateDates()).current;

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
      if (step === 1) setStep(2);
    }
  }, [preselectedService]);

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function resetBooking() {
    setStep(1); setService(''); setProfessional(''); setSelectedDate(null);
    setSelectedTime(''); setName(''); setPhone(''); setSubmitted(false);
  }

  const selectedServiceObj = services.find(s => s.id === service);
  const selectedProfessionalObj = professionals.find(p => p.id === professional);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-6">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center animate-[fadeUp_0.6s_ease-out]">
          <CheckCircle className="w-12 h-12 text-gold" strokeWidth={2} />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
          Agendamento <span className="italic text-gold">confirmado!</span>
        </h3>
        <p className="text-gray-300 text-lg mb-2 font-light">
          Obrigado, <span className="text-gold font-semibold">{name}</span>!
        </p>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Você receberá uma confirmação por WhatsApp no número <span className="text-white">{phone}</span>.
          Em breve entraremos em contato se precisarmos de quaisquer ajustes.
        </p>
        <div className="vintage-card rounded-sm p-6 mb-8 text-left space-y-3">
          <div className="flex justify-between text-sm border-b border-ink-border pb-3">
            <span className="text-gray-400">Serviço</span>
            <span className="text-white font-semibold">{selectedServiceObj?.name} — {selectedServiceObj?.price}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-ink-border pb-3">
            <span className="text-gray-400">Profissional</span>
            <span className="text-white font-semibold">{selectedProfessionalObj?.name}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-ink-border pb-3">
            <span className="text-gray-400">Data</span>
            <span className="text-white font-semibold">
              {selectedDate?.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', weekday: 'long' })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Horário</span>
            <span className="text-white font-semibold">{selectedTime}</span>
          </div>
        </div>
        <button
          onClick={resetBooking}
          className="inline-flex items-center gap-2 border border-gold/50 text-gold hover:bg-gold hover:text-ink font-semibold px-6 py-3 rounded-full text-sm transition-all"
        >
          Fazer outro agendamento
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= n ? 'bg-gold text-ink' : 'bg-ink-border text-gray-500'
                }`}
              >
                {step > n ? <CheckCircle className="w-5 h-5" /> : n}
              </div>
              {n < 4 && (
                <div className={`w-12 md:w-24 h-0.5 mx-2 md:mx-3 ${step > n ? 'bg-gold' : 'bg-ink-border'}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] md:text-xs uppercase tracking-widest text-gray-500 px-1">
          <span className={step >= 1 ? 'text-gold' : ''}>Serviço</span>
          <span className={step >= 2 ? 'text-gold' : ''}>Profissional</span>
          <span className={step >= 3 ? 'text-gold' : ''}>Data & Hora</span>
          <span className={step >= 4 ? 'text-gold' : ''}>Seus dados</span>
        </div>
      </div>

      <div className="vintage-card rounded-sm p-6 md:p-10">
        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Escolha o serviço</h3>
            <p className="text-gray-400 mb-8 text-sm">Selecione o serviço desejado:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map(s => {
                const Icon = s.icon;
                const selected = service === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setService(s.id)}
                    className={`text-left p-5 rounded-sm border-2 transition-all ${
                      selected
                        ? 'border-gold bg-gold/10'
                        : 'border-ink-border bg-ink-surface hover:border-gold/40'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gold" strokeWidth={2} />
                      </div>
                      <div className="font-serif text-xl font-bold text-gold">{s.price}</div>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white mb-1">{s.name}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-2">{s.description}</p>
                    <div className="text-[11px] text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {s.duration}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Escolha o profissional</h3>
            <p className="text-gray-400 mb-8 text-sm">Você pode escolher alguém específico ou o primeiro disponível:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {professionals.map(p => {
                const selected = professional === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setProfessional(p.id)}
                    className={`text-left p-5 rounded-sm border-2 transition-all ${
                      selected
                        ? 'border-gold bg-gold/10'
                        : 'border-ink-border bg-ink-surface hover:border-gold/40'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl font-bold ${
                        p.id === 'any' ? 'bg-ink-border text-gray-400' : 'bg-gold/15 border border-gold/30 text-gold'
                      }`}>
                        {p.id === 'any' ? <User className="w-6 h-6" /> : p.name.split(' ')[0][0] + (p.name.split(' ')[1]?.[0] || '')}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-white">{p.name}</h4>
                        {p.years && <div className="text-[11px] text-gold tracking-wider uppercase">{p.years} anos de experiência</div>}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{p.specialty}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Escolha data e horário</h3>
            <p className="text-gray-400 mb-8 text-sm">Selecione o melhor dia e horário para você:</p>

            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Data disponível</h4>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
                {dates.map((d, i) => {
                  const isSelected = selectedDate?.toDateString() === d.date.toDateString();
                  return (
                    <button
                      key={i}
                      disabled={d.disabled}
                      onClick={() => setSelectedDate(d.date)}
                      className={`flex-shrink-0 w-16 py-3 rounded-sm border-2 text-center transition-all ${
                        d.disabled
                          ? 'border-ink-border bg-ink/50 text-gray-600 cursor-not-allowed opacity-40'
                          : isSelected
                          ? 'border-gold bg-gold text-ink'
                          : 'border-ink-border bg-ink-surface text-gray-300 hover:border-gold/40'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider font-medium">{d.weekday}</div>
                      <div className="font-serif text-2xl font-bold my-1">{d.day}</div>
                      <div className="text-[10px] uppercase tracking-wider opacity-70">{d.month}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Horários disponíveis</h4>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {timeSlots.map(t => {
                  // pseudo-random disabled slots based on date
                  const hash = selectedDate ? selectedDate.getDate() + selectedDate.getMonth() * 3 : 0;
                  const disabled = selectedDate ? ((hash + parseInt(t)) % 7 === 0 || (hash + parseInt(t)) % 11 === 0) : true;
                  const isSelected = selectedTime === t;
                  return (
                    <button
                      key={t}
                      disabled={!selectedDate || disabled}
                      onClick={() => setSelectedTime(t)}
                      className={`time-slot py-2.5 rounded-sm border-2 text-sm font-medium ${
                        isSelected
                          ? 'selected'
                          : 'border-ink-border bg-ink-surface text-gray-300'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              {!selectedDate && (
                <p className="text-center text-gray-500 text-sm mt-4 italic">Selecione uma data primeiro para ver os horários disponíveis</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <form onSubmit={handleConfirm}>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Quase lá!</h3>
            <p className="text-gray-400 mb-8 text-sm">Preencha seus dados para confirmar o agendamento:</p>

            {/* Summary */}
            <div className="bg-ink/50 border border-ink-border rounded-sm p-4 mb-8 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Serviço:</span>
                <span className="text-white font-semibold">{selectedServiceObj?.name} — {selectedServiceObj?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Profissional:</span>
                <span className="text-white font-semibold">{selectedProfessionalObj?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data:</span>
                <span className="text-white font-semibold">
                  {selectedDate?.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', weekday: 'short' })} às {selectedTime}
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-semibold">Nome completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="João Silva"
                    className="w-full bg-ink border-2 border-ink-border focus:border-gold outline-none rounded-sm py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-semibold">Telefone (WhatsApp)</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-ink border-2 border-ink-border focus:border-gold outline-none rounded-sm py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 transition-colors"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="sr-only">Confirmar</button>
          </form>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-ink-border">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gold font-medium text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !service) ||
                (step === 2 && !professional) ||
                (step === 3 && (!selectedDate || !selectedTime))
              }
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-ink font-bold px-7 py-3 rounded-full text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-gold/20"
            >
              Próximo
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              type="button"
              disabled={!name || !phone}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-ink font-bold px-7 py-3 rounded-full text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-gold/20"
            >
              <CheckCircle className="w-4 h-4" />
              Confirmar Agendamento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Booking({ preselectedService }: { preselectedService: string | null }) {
  return (
    <section id="agendar" className="relative py-24 md:py-32 bg-ink grain-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[0.4em] text-gold uppercase mb-4">Agende online</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Reserve seu <span className="italic text-gold">horário</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Sem telefonemas, sem espera. Em poucos cliques você garante seu atendimento.
          </p>
        </div>
        <BookingWidget preselectedService={preselectedService} />
      </div>
    </section>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="depoimentos" className="relative py-24 md:py-32 bg-ink-light grain-bg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 barber-stripe h-1 opacity-50"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.4em] text-gold uppercase mb-4">O que dizem sobre nós</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Clientes que <span className="italic text-gold">confiam</span>
          </h2>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <TestimonialCard t={testimonials[idx]} />
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-gold w-8' : 'bg-ink-border'}`}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="testimonial-card vintage-card rounded-sm p-8 relative">
      <Quote className="absolute top-6 right-6 w-10 h-10 text-gold/20" strokeWidth={1.5} />
      <div className="flex gap-1 mb-4">
        {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}
      </div>
      <p className="text-gray-300 leading-relaxed mb-6 font-light italic">
        "{t.text}"
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-ink-border">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif font-bold text-ink text-lg">
          {t.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-serif font-bold text-white">{t.name}</div>
          <div className="text-xs text-gold uppercase tracking-wider">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function LocationFooter() {
  return (
    <section id="contato" className="relative py-24 md:py-32 bg-ink grain-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[0.4em] text-gold uppercase mb-4">Onde estamos</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Venha nos <span className="italic text-gold">visitar</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map placeholder */}
          <div className="relative rounded-sm overflow-hidden border border-ink-border min-h-[400px] group">
            <img
              src="/images/barbershop-interior.jpg"
              alt="Interior da barbearia"
              className="w-full h-full object-cover absolute inset-0 opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="vintage-card rounded-sm p-8 max-w-sm w-full text-center bg-ink/90 backdrop-blur-md">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Barbearia Elite</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  Rua das Tesouras, 245<br />
                  Centro — São Paulo/SP<br />
                  CEP: 01000-000
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-ink font-bold px-6 py-2.5 rounded-full text-sm transition-all"
                >
                  Abrir no Google Maps
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="vintage-card rounded-sm p-8">
              <h3 className="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-gold" />
                Horário de Funcionamento
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { d: 'Segunda a Sexta', h: '09:00 — 20:00' },
                  { d: 'Sábado', h: '08:00 — 19:00' },
                  { d: 'Domingo', h: 'Fechado', closed: true }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-ink-border last:border-0">
                    <span className="text-gray-300 font-medium">{row.d}</span>
                    <span className={row.closed ? 'text-red-400 font-semibold' : 'text-gold font-semibold'}>{row.h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="vintage-card rounded-sm p-8">
              <h3 className="font-serif text-2xl font-bold text-white mb-6">Entre em contato</h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center group-hover:bg-green-500 group-hover:border-green-500 transition-all">
                    <MessageCircle className="w-5 h-5 text-green-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">WhatsApp</div>
                    <div className="text-white font-semibold group-hover:text-gold transition-colors">(11) 99999-9999</div>
                  </div>
                </a>
                <a
                  href="https://instagram.com/barbeariaelite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-orange-400 group-hover:border-transparent transition-all">
                    <Instagram className="w-5 h-5 text-pink-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Instagram</div>
                    <div className="text-white font-semibold group-hover:text-gold transition-colors">@barbeariaelite</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink-light border-t border-ink-border py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <Scissors className="w-5 h-5 text-ink" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-white">Barbearia Elite</div>
              <div className="text-[10px] tracking-[0.3em] text-gold uppercase">Estilo & Tradição</div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-ink-border hover:border-gold hover:bg-gold/10 flex items-center justify-center text-gray-400 hover:text-gold transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-ink-border hover:border-gold hover:bg-gold/10 flex items-center justify-center text-gray-400 hover:text-gold transition-all">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          <div className="text-xs text-gray-500 text-center md:text-right">
            © {new Date().getFullYear()} Barbearia Elite. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a
      href="#agendar"
      className={`fixed bottom-6 right-6 z-40 lg:hidden inline-flex items-center gap-2 bg-gold text-ink font-bold px-5 py-3.5 rounded-full shadow-2xl shadow-gold/30 transition-all ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <Calendar className="w-5 h-5" />
      Agendar
    </a>
  );
}

/* ============== MAIN APP ============== */
export default function App() {
  const [preselectedService, setPreselectedService] = useState<string | null>(null);

  function handleBookService(serviceId: string) {
    setPreselectedService(serviceId);
    setTimeout(() => {
      document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <div className="min-h-screen bg-ink text-gray-200 antialiased">
      <Navbar />
      <Hero />
      <Ribbon />
      <Diferenciais />
      <Services onBook={handleBookService} />
      <Booking preselectedService={preselectedService} />
      <Testimonials />
      <LocationFooter />
      <Footer />
      <FloatingCTA />
    </div>
  );
}

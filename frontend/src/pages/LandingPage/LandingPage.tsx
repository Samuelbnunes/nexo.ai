import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

/* ─── Dados dos planos ─── */
const plans = [
  {
    name: 'Gratuito',
    price: '0',
    period: 'para sempre',
    features: [
      { label: '5 análises de currículo', ok: true },
      { label: 'Exportação em texto', ok: true },
      { label: 'Suporte por e-mail', ok: true },
      { label: 'Análise avançada por nicho', ok: false },
      { label: 'Download em PDF', ok: false },
    ],
    btnText: 'Começar grátis',
    btnStyle: 'outline',
    popular: false,
  },
  {
    name: 'Pro',
    price: '29',
    period: 'por mês',
    features: [
      { label: 'Análises ilimitadas', ok: true },
      { label: 'Exportação em texto', ok: true },
      { label: 'Suporte prioritário', ok: true },
      { label: 'Análise avançada por nicho', ok: true },
      { label: 'Download em PDF', ok: true },
    ],
    btnText: 'Assinar Pro',
    btnStyle: 'filled',
    popular: true,
  },
  {
    name: 'Equipes',
    price: '79',
    period: 'por mês',
    features: [
      { label: 'Análises ilimitadas', ok: true },
      { label: 'Até 10 usuários', ok: true },
      { label: 'Suporte dedicado', ok: true },
      { label: 'Análise avançada por nicho', ok: true },
      { label: 'Download em PDF + relatórios', ok: true },
    ],
    btnText: 'Falar com vendas',
    btnStyle: 'outline',
    popular: false,
  },
];

/* ─── Dados dos passos ─── */
const steps = [
  { icon: '📄', number: '01', title: 'Envie seu currículo', desc: 'Faça upload do seu PDF. Nossa IA extrai o texto automaticamente em segundos.' },
  { icon: '🎯', number: '02', title: 'Informe a vaga alvo', desc: 'Diga para qual cargo ou nicho você está aplicando para uma análise personalizada.' },
  { icon: '✨', number: '03', title: 'A IA reescreve', desc: 'O Gemini 2.5 reescreve suas experiências com métricas e palavras-chave poderosas.' },
  { icon: '🚀', number: '04', title: 'Candidate-se', desc: 'Use o currículo otimizado e aumente drasticamente suas chances de aprovação.' },
];

export default function LandingPage() {
  const revealRefs = useRef<HTMLElement[]>([]);

  /* Scroll Reveal com IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(`.${styles.reveal}`);
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Navbar com fundo ao rolar */
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
      if (navbar) {
        navbar.classList.toggle(styles['navbar--scrolled'], window.scrollY > 20);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={styles.navbar} id="navbar" aria-label="Navegação principal">
        <Link to="/" className={styles.navbar__logo}>
          Nexo<span>.ai</span>
        </Link>
        <div className={styles.navbar__actions}>
          <Link to="/login" className={styles['btn-ghost']}>Entrar</Link>
          <Link to="/register" className={styles['btn-primary']}>Criar conta</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero} aria-label="Apresentação">
        <span className={styles.hero__badge}>✦ Powered by Gemini 2.5 Flash</span>
        <h1 className={styles.hero__title}>
          Seu currículo, <br />
          <span className={styles.highlight}>reescrito pela IA</span>
        </h1>
        <p className={styles.hero__subtitle}>
          O Nexo.ai usa Inteligência Artificial do Google para transformar seu currículo
          em um documento que se destaca em qualquer processo seletivo.
        </p>
        <div className={styles.hero__cta}>
          <Link to="/register" className={styles['btn-cta']}>
            Começar grátis →
          </Link>
          <a href="#como-funciona" className={`${styles['btn-cta']} ${styles['btn-cta--outline']}`}>
            Ver como funciona
          </a>
        </div>

        {/* Mockup animado */}
        <div className={styles.hero__mockup} aria-hidden="true">
          <div className={styles.mockup__bar}>
            <div className={styles.mockup__dot} />
            <div className={styles.mockup__dot} />
            <div className={styles.mockup__dot} />
            <div className={styles.mockup__url}>nexo.ai/app</div>
          </div>
          <div className={styles.mockup__body}>
            <div className={styles.mockup__card}>
              <p className={styles['mockup__card-label']}>Currículo Original</p>
              <p className={styles['mockup__card-title']}>Experiência</p>
              <div className={`${styles.mockup__line} ${styles['mockup__line--full']}`} />
              <div className={`${styles.mockup__line} ${styles['mockup__line--three']}`} />
              <div className={`${styles.mockup__line} ${styles['mockup__line--half']}`} />
              <div className={`${styles.mockup__line} ${styles['mockup__line--full']}`} />
            </div>
            <div className={`${styles.mockup__card} ${styles['mockup__card--ai']}`}>
              <p className={styles['mockup__card-label']}>✨ Sugestão da IA</p>
              <p className={styles['mockup__card-title']}>Experiência Otimizada</p>
              <div className={`${styles.mockup__line} ${styles['mockup__line--full']}`} />
              <div className={`${styles.mockup__line} ${styles['mockup__line--three']}`} />
              <div className={`${styles.mockup__line} ${styles['mockup__line--full']}`} />
              <div className={`${styles.mockup__line} ${styles['mockup__line--half']}`} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className={styles.stats} aria-label="Números do Nexo.ai">
        {[
          { num: '10k+', label: 'Currículos otimizados' },
          { num: '3×', label: 'Mais chamadas para entrevista' },
          { num: '98%', label: 'Taxa de satisfação' },
          { num: '<30s', label: 'Tempo de análise' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className={styles.stat__number}>{stat.num}</div>
            <div className={styles.stat__label}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── COMO FUNCIONA ── */}
      <section id="como-funciona" className={styles.section} aria-labelledby="steps-title">
        <div className={`${styles.section__header} ${styles.reveal}`}>
          <p className={styles.section__tag}>Como funciona</p>
          <h2 className={styles.section__title} id="steps-title">
            De currículo comum para<br />oportunidade real
          </h2>
          <p className={styles.section__subtitle}>
            Quatro passos simples para transformar como recrutadores enxergam você.
          </p>
        </div>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={`${styles['step-card']} ${styles.reveal}`}>
              <div className={styles['step-card__number']}>{step.number}</div>
              <div className={styles['step-card__icon']}>{step.icon}</div>
              <h3 className={styles['step-card__title']}>{step.title}</h3>
              <p className={styles['step-card__desc']}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANOS ── */}
      <section id="planos" className={`${styles.section} ${styles['section--alt']}`} aria-labelledby="plans-title">
        <div className={`${styles.section__header} ${styles.reveal}`}>
          <p className={styles.section__tag}>Planos e Preços</p>
          <h2 className={styles.section__title} id="plans-title">Escolha seu plano</h2>
          <p className={styles.section__subtitle}>
            Comece gratuitamente e evolua conforme sua necessidade.
          </p>
        </div>
        <div className={styles.plans}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${styles['plan-card']} ${plan.popular ? styles['plan-card--popular'] : ''} ${styles.reveal}`}
            >
              {plan.popular && (
                <div className={styles['plan-card__badge']}>⭐ Mais popular</div>
              )}
              <p className={styles['plan-card__name']}>{plan.name}</p>
              <div className={styles['plan-card__price']}>
                <sup>R$</sup>{plan.price}
              </div>
              <p className={styles['plan-card__period']}>{plan.period}</p>
              <ul className={styles['plan-card__features']}>
                {plan.features.map((f) => (
                  <li key={f.label}>
                    <span className={f.ok ? styles.check : styles.cross}>
                      {f.ok ? '✓' : '✕'}
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`${styles['plan-btn']} ${
                  plan.btnStyle === 'filled'
                    ? styles['plan-btn--filled']
                    : styles['plan-btn--outline']
                }`}
              >
                {plan.btnText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className={`${styles['cta-section']} ${styles.reveal}`} aria-label="Call to action">
        <h2 className={styles['cta-section__title']}>
          Pronto para se destacar?
        </h2>
        <p className={styles['cta-section__subtitle']}>
          Junte-se a milhares de profissionais que já turbinaram seus currículos com IA.
        </p>
        <Link to="/register" className={styles['btn-cta']}>
          Criar minha conta gratuita →
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <span className={styles.footer__logo}>Nexo.ai</span>
        <span>© 2025 Nexo.ai — Todos os direitos reservados</span>
        <span>
          <Link to="/login" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            Entrar
          </Link>
          {' · '}
          <Link to="/register" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            Cadastrar
          </Link>
        </span>
      </footer>
    </>
  );
}

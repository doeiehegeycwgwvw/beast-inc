// Beast Inc. — shared site behaviour

document.addEventListener('DOMContentLoaded', () => {

  /* ---- mobile nav ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobilePanel = document.querySelector('.mobile-panel');
  if (hamburger && mobilePanel) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobilePanel.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobilePanel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobilePanel.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- header shadow on scroll ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8 ? '0 8px 24px -18px rgba(8,21,38,0.4)' : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- animated stat counters ---- */
  const statNums = document.querySelectorAll('.stat .num[data-count]');
  if (statNums.length) {
    const animateNum = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = val.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const statIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateNum(entry.target);
            statIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      statNums.forEach(el => statIo.observe(el));
    } else {
      statNums.forEach(animateNum);
    }
  }

  /* ---- contact form (static demo, no backend) ---- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = contactForm.querySelector('.form-status');
      status.textContent = 'Thank you — this is a fictional demo form for a school project, so no message has actually been sent.';
      status.classList.add('visible');
      contactForm.reset();
    });
  }

  /* ---- careers filter ---- */
  const chips = document.querySelectorAll('.filter-chip');
  const jobRows = document.querySelectorAll('.job-row');
  if (chips.length && jobRows.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.filter;
        jobRows.forEach(row => {
          row.style.display = (cat === 'all' || row.dataset.category === cat) ? 'flex' : 'none';
        });
      });
    });
  }

  /* ---- research area filter ---- */
  const rChips = document.querySelectorAll('.research-filter .filter-chip');
  const rCards = document.querySelectorAll('.research-card');
  if (rChips.length && rCards.length) {
    rChips.forEach(chip => {
      chip.addEventListener('click', () => {
        rChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.filter;
        rCards.forEach(card => {
          card.style.display = (cat === 'all' || card.dataset.area === cat) ? 'block' : 'none';
        });
      });
    });
  }
});

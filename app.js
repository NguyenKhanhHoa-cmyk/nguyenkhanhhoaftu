/**
 * HOW I MET YOUR MOTHER - PORTFOLIO INTERACTIVE LOGIC
 * Candidate: Nguyễn Khánh Hoà
 * Theme: "HOW I BECAME LEGEND.. WAIT FOR IT.. DARY" (Sitcom 2005)
 * Background: Yellow Umbrella Signature Theme
 */

// ===================================================================
// 1. AUTHENTIC SITCOM INTRO VIDEO & EPISODE TRANSITION ENGINE
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('intro-overlay');
  const introStartCard = document.getElementById('intro-start-card');
  const btnStartIntro = document.getElementById('btn-start-intro');
  const introVideoContainer = document.getElementById('intro-video-container');
  const himymVideo = document.getElementById('himym-actual-video');
  const episodeTitleScreen = document.getElementById('episode-title-screen');
  const btnSkipIntro = document.getElementById('btn-skip-intro');
  const btnReplayVideo = document.getElementById('btn-replay-video');

  // Helper: Trigger celebratory confetti on landing
  function fireSitcomConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#FFCC00', '#160509', '#E5B000', '#FFFFFF', '#D91E2A', '#0077CC']
      });
    }
  }

  // Helper: Finish the intro sequence and reveal the main portfolio
  function finishIntro() {
    if (himymVideo && !himymVideo.paused) {
      himymVideo.pause();
    }
    if (introOverlay) {
      introOverlay.style.opacity = '0';
      introOverlay.style.pointerEvents = 'none';
      setTimeout(() => {
        introOverlay.classList.add('hidden');
        introOverlay.style.opacity = '';
        introOverlay.style.pointerEvents = '';
        if (episodeTitleScreen) episodeTitleScreen.classList.add('hidden');
        if (introVideoContainer) introVideoContainer.classList.add('hidden');
        if (introStartCard) introStartCard.classList.remove('hidden');
      }, 500);
    }
    fireSitcomConfetti();
  }

  // Helper: Show the Episode Title screen after video concludes
  function showEpisodeTitleScreen() {
    if (episodeTitleScreen) {
      episodeTitleScreen.classList.remove('hidden');
      // Hold episode title card for ~2 seconds for cinematic feel, then enter portfolio
      setTimeout(() => {
        finishIntro();
      }, 2200);
    } else {
      finishIntro();
    }
  }

  // 1. Click Play Video from Clapperboard
  if (btnStartIntro && introVideoContainer && himymVideo) {
    btnStartIntro.addEventListener('click', () => {
      if (introStartCard) introStartCard.classList.add('hidden');
      introVideoContainer.classList.remove('hidden');
      if (episodeTitleScreen) episodeTitleScreen.classList.add('hidden');

      himymVideo.currentTime = 0;
      const playPromise = himymVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Video playback notice:', err);
        });
      }
    });
  }

  // 2. Video End Event -> Transition to Episode Title Screen
  if (himymVideo) {
    himymVideo.addEventListener('ended', () => {
      showEpisodeTitleScreen();
    });
  }

  // 3. Skip Button
  if (btnSkipIntro) {
    btnSkipIntro.addEventListener('click', () => {
      finishIntro();
    });
  }

  // 4. Replay Video from Navbar anytime
  if (btnReplayVideo && introOverlay && introVideoContainer && himymVideo) {
    btnReplayVideo.addEventListener('click', () => {
      introOverlay.classList.remove('hidden');
      introOverlay.style.opacity = '1';
      introOverlay.style.pointerEvents = 'all';

      if (introStartCard) introStartCard.classList.add('hidden');
      if (episodeTitleScreen) episodeTitleScreen.classList.add('hidden');
      introVideoContainer.classList.remove('hidden');

      himymVideo.currentTime = 0;
      himymVideo.play().catch(e => console.warn(e));
    });
  }

  // ===================================================================
  // 2. SUIT UP & VISUAL INTERACTION HANDLERS (NO SYNTHETIC AUDIO)
  // ===================================================================

  // Barney's Suit Up Mode Toggle
  const btnSuitUp = document.getElementById('btn-suit-up');
  if (btnSuitUp) {
    btnSuitUp.addEventListener('click', () => {
      document.body.classList.toggle('suit-up-mode');
      const isSuitUp = document.body.classList.contains('suit-up-mode');
      
      if (isSuitUp) {
        btnSuitUp.innerHTML = '<span class="suit-icon">🍺</span> <span class="suit-label">YELLOW THEME</span>';
      } else {
        btnSuitUp.innerHTML = '<span class="suit-icon">👔</span> <span class="suit-label">SUIT UP!</span>';
      }

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.1 },
          colors: isSuitUp ? ['#00E5FF', '#121B40', '#FFFFFF'] : ['#FFCC00', '#160509', '#E5B000']
        });
      }
    });
  }

  // Barney's "LEGEN... WAIT FOR IT... DARY!" Confetti Button
  const btnLegendary = document.getElementById('btn-legendary');
  if (btnLegendary) {
    btnLegendary.addEventListener('click', () => {
      fireSitcomConfetti();
    });
  }

  // High Five Visual Animated Badge
  const btnHighFive = document.getElementById('btn-high-five');
  if (btnHighFive) {
    btnHighFive.addEventListener('click', (e) => {
      const badge = document.createElement('div');
      badge.textContent = '✋ HIGH FIVE! LEGEN-DARY! 💛';
      badge.style.position = 'fixed';
      badge.style.left = `${e.clientX || window.innerWidth / 2}px`;
      badge.style.top = `${e.clientY || window.innerHeight / 2}px`;
      badge.style.transform = 'translate(-50%, -50%) scale(0.5)';
      badge.style.background = '#FFCC00';
      badge.style.color = '#160509';
      badge.style.border = '2px solid #160509';
      badge.style.fontFamily = 'Montserrat, sans-serif';
      badge.style.fontWeight = '900';
      badge.style.fontSize = '1.15rem';
      badge.style.padding = '12px 24px';
      badge.style.borderRadius = '30px';
      badge.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
      badge.style.zIndex = '99999';
      badge.style.pointerEvents = 'none';
      badge.style.transition = 'all 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

      document.body.appendChild(badge);

      setTimeout(() => {
        badge.style.transform = 'translate(-50%, -110px) scale(1.15)';
        badge.style.opacity = '0';
      }, 50);

      setTimeout(() => badge.remove(), 750);
    });
  }

  // Mobile Menu Toggle
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const navLinks = document.getElementById('nav-links');
  if (btnMobileMenu && navLinks) {
    btnMobileMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active-menu');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('active-menu'));
    });
  }

  // Modal CV Preview & Print
  const cvModal = document.getElementById('cv-modal');
  const btnOpenCvModal = document.getElementById('btn-open-cv-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCloseModalBottom = document.getElementById('btn-close-modal-bottom');
  const btnPrintCvAction = document.getElementById('btn-print-cv-action');

  if (btnOpenCvModal && cvModal) {
    btnOpenCvModal.addEventListener('click', () => {
      cvModal.classList.remove('hidden');
    });
  }

  const closeModal = () => cvModal?.classList.add('hidden');
  btnCloseModal?.addEventListener('click', closeModal);
  btnCloseModalBottom?.addEventListener('click', closeModal);

  cvModal?.addEventListener('click', (e) => {
    if (e.target === cvModal) closeModal();
  });

  btnPrintCvAction?.addEventListener('click', () => {
    window.print();
  });

  // Fast Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <strong>🎉 CẢM ƠN BẠN RẤT NHIỀU!</strong><br>
        Tin nhắn đã được gửi đến Khánh Hoà (<strong>k64.2514410085@ftu.edu.vn</strong>). 
        Khánh Hoà sẽ phản hồi bạn nhanh chóng! True story! ☂️
      `;
      formFeedback.classList.remove('hidden');

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#FFCC00', '#160509', '#E5B000', '#FFFFFF']
        });
      }

      contactForm.reset();
    });
  }

  // ===================================================================
  // 3. BILINGUAL TRANSLATION SYSTEM (VI / EN)
  // ===================================================================
  const i18n = {
    vi: {
      nav_about: "The Gang (Giới Thiệu)",
      nav_experience: "⭐ 2025 Teaching Arc (Kinh Nghiệm)",
      nav_achievements: "The Playbook (Thành Tích)",
      nav_education: "Mosby Academy (Học Vấn & Kỹ Năng)",
      nav_contact: "MacLaren's Booth (Liên Hệ)",
      hero_episode_tag: "SEASON 2025 • EPISODE 1: \"THE NEW ENGLISH LEGEND\"",
      hero_role_teacher: "English Teacher & TA (Since 2025)",
      hero_summary: "Chào mừng các bạn đến với câu chuyện của Khánh Hoà! Từ năm 2025 đến nay, mình trực tiếp làm Giảng viên & Trợ giảng Tiếng Anh (English Teacher & TA), truyền lửa nhiệt huyết cho học viên chinh phục IELTS và các kỳ thi học sinh giỏi bằng phương pháp hiện đại, tràn đầy năng lượng và chuẩn xác như một kế hoạch trong The Playbook!",
      hero_btn_highfive: "HIGH FIVE KHÁNH HOÀ!",
      hero_btn_booth: "MACLAREN'S BOOTH (LIÊN HỆ)",
      hero_btn_cv: "IN / XEM BẢN CV CẬP NHẬT",
      spec_exp_label: "KINH NGHIỆM GIẢNG DẠY",
      exp_lead: "Bước ngoặt rực rỡ từ năm 2025: Trực tiếp đứng lớp và trợ giảng các chương trình Tiếng Anh học thuật, IELTS chuyên sâu và bồi dưỡng thi THPTQG.",
      role_main_title: "Giảng Viên & Trợ Giảng Tiếng Anh (English Teacher & TA)",
      pillar1_title: "Luyện Thi IELTS & Học Thuật Chuyên Sâu",
      pillar1_desc: "Trực tiếp chia sẻ chiến thuật làm bài thực chiến, đặc biệt là bí kíp đạt 9.0 Reading tuyệt đối và 8.0 Listening. Hướng dẫn học viên phương pháp Keyword Transformation & Scanning siêu tốc.",
      pillar2_title: "Phương Pháp Active Learning Sôi Nổi",
      pillar2_desc: "Xóa tan sự nhàm chán bằng các hoạt động tương tác, Debate, Mini-Games (Kahoot, Quizizz). Quản lý lớp học chuyên nghiệp, truyền cảm hứng để mọi học sinh đều hào hứng phát biểu.",
      pillar3_title: "Chấm Chữa Bài Chi Tiết & Chỉnh Phát Âm",
      pillar3_desc: "Chữa bài Writing theo 4 tiêu chí chuẩn khảo thí Cambridge. Luyện phát âm phản xạ 1-1 cho học viên, sửa ngữ điệu tự nhiên và hỗ trợ giải đáp thắc mắc 24/7.",
      pillar4_title: "Theo Dõi Tiến Độ & Đồng Hành Bền Bỉ",
      pillar4_desc: "Quản lý hồ sơ năng lực từng học sinh, báo cáo định kỳ với phụ huynh và xây dựng lộ trình cá nhân hóa giúp các bạn tăng band điểm nhanh chóng sau từng khóa học.",
      umbrella_quote: "\"Mỗi học sinh đều có một chiếc 'ô vàng' tiềm năng của riêng mình. Vai trò của người thầy là giúp các em che chở nỗi sợ hãi và tỏa sáng rực rỡ nhất dưới mọi cơn mưa thử thách!\"",
      playbook_lead: "Các thành tích huyền thoại được chứng thực qua những kỳ thi chuẩn hóa khắc nghiệt nhất.",
      reading_badge_desc: "Điểm số tuyệt đối 40/40 câu hỏi. Master đọc hiểu học thuật & phân tích tư duy phản biện.",
      listening_badge_desc: "Bắt trọn mọi ngữ âm, accent Anh - Mỹ - Úc và các bẫy distractors phức tạp.",
      writing_badge_desc: "Tư duy logic Task 1 & Task 2 chặt chẽ, từ vựng C1-C2 chuẩn văn phong học thuật.",
      speaking_badge_desc: "Phản xạ tự tin, phát âm rõ ràng, diễn đạt ý tưởng mạch lạc và giàu cảm xúc.",
      award_city: "Giải Ba Học Sinh Giỏi Cấp Thành Phố Hà Nội",
      award_cluster: "Giải Ba Học Sinh Giỏi Cấp Cụm Đống Đa",
      award_school: "Giải Nhì Học Sinh Giỏi Cấp Trường THPT Đống Đa",
      edu_lead: "Nền tảng học vấn vững chắc tại ngôi trường kinh tế hàng đầu và bộ kỹ năng sư phạm sắc bén.",
      ftu_details: "Môi trường học tập năng động, rèn luyện tư duy kinh tế toàn cầu, kỹ năng đàm phán và thuyết trình bằng tiếng Anh chuyên ngành ở chuẩn mực cao nhất.",
      dongda_details: "Đạt cú đúp giải thưởng học sinh giỏi môn Tiếng Anh cấp trường, cấp cụm và cấp Thành phố Hà Nội.",
      skill1_note: "Giao tiếp lưu loát, ghi chép và dịch thuật tài liệu học thuật chuẩn xác.",
      skill2_note: "Phương pháp giảng dạy lôi cuốn, tạo bầu không khí học tập tích cực và kỷ luật.",
      skill3_note: "Làm chủ Word, Excel, PowerPoint, Canva, Quizizz, Kahoot, Google Classroom.",
      skill4_note: "Chăm chỉ, chu đáo, luôn theo sát và động viên từng bước tiến của học viên.",
      contact_lead: "Bạn đang tìm một Giảng viên hay Trợ giảng Tiếng Anh giàu năng lượng, tận tâm và có kết quả kiểm chứng? Hãy để lại tin nhắn hoặc gọi ngay nhé!",
      phone_label: "Số điện thoại / Zalo:",
      address_label: "Địa chỉ hiện tại:",
      school_label: "Trường theo học:",
      form_title: "📬 Gửi Lời Nhắn Đến Khánh Hoà",
      form_sub: "Trao đổi về vị trí giảng dạy, trợ giảng hoặc dự án giáo dục tiếng Anh.",
      form_name_label: "Họ tên của bạn / Trung tâm:",
      form_contact_label: "Email hoặc Số điện thoại:",
      form_msg_label: "Nội dung trao đổi:",
      form_submit_btn: "GỬI LỜI NHẮN NGAY (SEND MESSAGE)"
    },
    en: {
      nav_about: "The Gang (About)",
      nav_experience: "⭐ 2025 Teaching Arc (Experience)",
      nav_achievements: "The Playbook (Achievements)",
      nav_education: "Mosby Academy (Education & Skills)",
      nav_contact: "MacLaren's Booth (Contact)",
      hero_episode_tag: "SEASON 2025 • EPISODE 1: \"THE NEW ENGLISH LEGEND\"",
      hero_role_teacher: "English Teacher & TA (Since 2025)",
      hero_summary: "Welcome to Khánh Hoà's story! Since 2025, I have worked as an English Teacher and Teacher Assistant, inspiring students to conquer IELTS and academic contests with modern, high-energy methodologies as foolproof as Barney's Playbook!",
      hero_btn_highfive: "HIGH FIVE KHÁNH HOÀ!",
      hero_btn_booth: "MACLAREN'S BOOTH (CONTACT)",
      hero_btn_cv: "PRINT / VIEW UPDATED CV",
      spec_exp_label: "TEACHING EXPERIENCE",
      exp_lead: "The 2025 plot twist: Direct classroom instruction and TA leadership for Academic English, intensive IELTS preparation, and National High School Exam mastery.",
      role_main_title: "English Teacher & Teacher Assistant (Since 2025)",
      pillar1_title: "Intensive IELTS & Academic Test Prep",
      pillar1_desc: "Sharing practical test-taking strategies with proven secrets for achieving a perfect 9.0 Reading and 8.0 Listening. Mastering keyword transformation & high-speed scanning.",
      pillar2_title: "High-Energy Active Learning",
      pillar2_desc: "Banish classroom boredom through debate drills, interactive multimedia games (Kahoot, Quizizz), and confident public speaking in an encouraging atmosphere.",
      pillar3_title: "Detailed Writing Clinic & Speaking Fix",
      pillar3_desc: "Thorough Cambridge-criteria writing evaluation with step-by-step corrections. Personalized 1-on-1 pronunciation and fluency coaching available 24/7.",
      pillar4_title: "Continuous Progress & Student Mentorship",
      pillar4_desc: "Tracking individual student performance portfolios, maintaining transparent parent updates, and tailoring personalized band-boosting roadmaps.",
      umbrella_quote: "\"Every student has their own yellow umbrella of potential. A teacher's role is to shield them from test anxiety and let them shine brightly in every storm!\"",
      playbook_lead: "Legendary scores and accolades verified across top-tier competitive national examinations.",
      reading_badge_desc: "Flawless 40/40 correct answers. Master of academic reading comprehension & critical reasoning.",
      listening_badge_desc: "Capturing nuanced UK/US/AU accents and decoding complex exam distractors with ease.",
      writing_badge_desc: "Rigorous logical cohesion in Task 1 & Task 2 with advanced C1-C2 academic lexical resource.",
      speaking_badge_desc: "Confident reflex, articulate pronunciation, and expressive natural delivery.",
      award_city: "Hanoi City English Excellence 3rd Prize",
      award_cluster: "Dong Da Cluster English 3rd Prize",
      award_school: "Dong Da High School English 2nd Prize",
      edu_lead: "Rigorous academic training at Vietnam's premier Foreign Trade University paired with pedagogical finesse.",
      ftu_details: "Dynamic environment sharpening global economic foresight, professional English negotiation, and elite public presentations.",
      dongda_details: "Selective high school program with continuous podium honors across city and district English contests.",
      skill1_note: "Flawless oral fluency, academic transcription, and translation precision.",
      skill2_note: "Engaging pedagogical delivery, positive classroom culture, and student rapport.",
      skill3_note: "Command of Microsoft Office, Canva, Quizizz, Kahoot, and Google Classroom.",
      skill4_note: "Hardworking, detail-oriented, with high accountability and dedication to learners.",
      contact_lead: "Looking for an energetic, dedicated English Teacher or TA with verified results? Drop a note or ring my booth!",
      phone_label: "Phone / Zalo:",
      address_label: "Current Address:",
      school_label: "University:",
      form_title: "📬 Send a Message to Khánh Hoà",
      form_sub: "Inquire about teaching, assistantship, or English educational collaborations.",
      form_name_label: "Your Name / Organization:",
      form_contact_label: "Email or Phone Number:",
      form_msg_label: "Message Content:",
      form_submit_btn: "SEND MESSAGE NOW"
    }
  };

  let currentLang = 'vi';

  function switchLanguage(lang) {
    currentLang = lang;
    const dict = i18n[lang];

    document.querySelectorAll('[data-lang-key]').forEach(el => {
      const key = el.getAttribute('data-lang-key');
      if (dict && dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    const langFlag = document.getElementById('lang-flag');
    const langCode = document.getElementById('lang-code');
    if (langFlag && langCode) {
      if (lang === 'vi') {
        langFlag.textContent = '🇻🇳';
        langCode.textContent = 'VI';
      } else {
        langFlag.textContent = '🇬🇧';
        langCode.textContent = 'EN';
      }
    }
  }

  const btnLang = document.getElementById('btn-lang-toggle');
  if (btnLang) {
    btnLang.addEventListener('click', () => {
      const nextLang = currentLang === 'vi' ? 'en' : 'vi';
      switchLanguage(nextLang);
    });
  }
});

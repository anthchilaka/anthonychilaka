import { useState } from 'react'
import './index.css'

// 1. Import Brand Assets
import logo from './assets/brand/logo.webp'
import banner from './assets/brand/banner.webp'
import mobileBanner from './assets/brand/mobile.webp' // <-- New Mobile Banner Import

// 2. Import Icons
import linkedin from './assets/icons/linkedin.webp'
import upwork from './assets/icons/upwork.webp'
import xIcon from './assets/icons/X.webp'
import whatsapp from './assets/icons/whatsapp.webp'

// 3. Import Service & Section Images
import analytics from './assets/images/analytics.webp'
import call from './assets/images/call.webp'
import portfolio from './assets/images/portfolio.webp'
import portfolioloading from './assets/images/portfolioloading.webp'
import sourcing from './assets/images/sourcing.webp'
import training from './assets/images/training.webp'
import voiceover from './assets/images/voiceover.webp'
import webbuild from './assets/images/webbuild.webp'
import walkthrough from './assets/images/walkthrough.webp'
import walkthroughloading from './assets/images/walkthroughloading.webp'

// 4. Import Template Images
import businesstemplate from './assets/images/businesstemplate.webp'
import financetemplate from './assets/images/financetemplate.webp'
import restauranttemplate from './assets/images/restauranttemplate.webp'
import beautyandfashion from './assets/images/beautyandfashion.webp'
import ngoservices from './assets/images/ngoservices.webp'
import enterprise from './assets/images/enterprise.webp'

// 5. Import Voice Over Images
import fireImg from './assets/images/fire.webp'
import hangImg from './assets/images/hang.webp'
import giverImg from './assets/images/giver.webp'
import daddyImg from './assets/images/daddy.webp'

// 6. Import Audio Files
import fireAudio from './assets/audio/Fire.mp3'
import hangAudio from './assets/audio/hang.mp3'
import giverAudio from './assets/audio/giver.mp3'
import daddyAudio from './assets/audio/daddy.mp3'

// Data for the Voiceovers Modal
const VOICEOVERS_DATA = [
  {
    id: 1,
    header: "Male narrating Religion and Spirituality",
    role: "Male voice",
    description: "The perspective on Jesus baptizing with the Holy Spirit and fire The perspective on Jesus baptizing with the Holy Spirit and fire as signifying empowerment, zeal, purification, and the presence Title: ...And Fire!: The Holy Ghost And With Fire! By ANTONIO SHERMAN",
    title: "...And Fire!: The Holy Ghost And With Fire! By ANTONIO SHERMAN",
    genre: "Religion and Spirituality",
    audioSrc: fireAudio,
    imageSrc: fireImg,
    transcript: "Introduction\nRecalling from my earlier walk as a Bible believing Christian. I remember hearing and reading the passage, \"He will baptize you with the Holy Spirit and fire\" reading from the book of (Matthew 1:33). Here, he was repeating what John the Baptist stated. In the book of (John 1:33).\nI began to ponder the passage. I understood a portion of what was being said. As a young Christian, I understood that it was Jesus Christ who baptized us with the Holy Spirit. However, this fire thing was bothering me, as I was unsure of the understanding of what it meant. So, I turn to a more experienced Christian, a leader, and ask what the fire means.\nI recalled the individual saying that it meant the fire of condemnation. Hellfire, to be exact. Even as a young Christian, I felt something was not correct about that response. Why? Initially, it did not seem appropriate given the context of the passage and conversation. Then also because of the other Bible passages where our Lord Jesus Christ said, \"I have not come to destroy the world but to save it.\""
  },
  {
    id: 2,
    header: "African Male narrating ACX audio book",
    role: "Voice over",
    description: "Hang In There!: Successfully Navigating the Christian Faith By Wes Brockway\nThere is no joy in our lives. We no longer enjoy worshiping God and may even wonder if He exists. We wonder what happened, and more than that, we wonder how to get our excitement back.",
    title: "Hang In There!: Successfully Navigating the Christian Faith by By Wes Brockway",
    genre: "Religion and Spirituality",
    audioSrc: hangAudio,
    imageSrc: hangImg,
    transcript: "Crash and Burn\n\nThe first-century Jewish converts were struggling. Their non-messianic kinsmen rejected their conversion to Christianity by viewing them as blasphemers, and the Gentile Christians refused to embrace them with open arms.\nMaybe you can relate to them. Your conversion may not have been from Judaism, but like these struggling Christians, you are trying to navigate your faith journey that sometimes feels like a mountainous road with deadly drop-offs and treacherous turns. You don't know if you'll survive.\nThe writer of Hebrews proposed a two-pronged argument to help us navigate this path. First, the writer appealed to our minds. He shows us that Jesus is superior to the angels, to Moses and the Law, and the high priest. He wanted us to establish the facts first and understand that Jesus is the Son of God. God didn't send angels to be our redeemer; He came Himself. And Christ is currently sitting on an eternal throne at the right hand of God the Father. Our faith finds a firm foundation in these facts.\nThen the writer of Hebrews cuts through the fog by appealing to our emotions. He reminds us of the joy of our salvation-the day when we invited Jesus to guide our path. The author continues to tug at our heartstrings by telling us about the influence we have for the Lord through our giving and acts of service. Few of us see the full extent of our efforts. Realizing we are making a difference helps us grip the steering wheel a little tighter.\nBut facts and feelings alone won't keep us safely on the mountainous road; we must have a good foundation of faith. The writer made it clear: \"Without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him\" (Heb. 11:6). Faith, facts, then feelings. The correct order is essential.\nEven with our faith, facts, and feelings in the correct order, we can still struggle. The Christian journey is a slippery slope with sharp turns, steep inclines, and perilous cliffs. Our ability to competently navigate may sometimes be threatened by a slow drift or an unwanted detour caused by our doubts, leading us away from the path God has for us.\nIf we continue to drift away from Jesus, we may lose the ability to hear the Lord's leading. We may begin doubting God's Word and stop reading it altogether. We may even begin to despise God's Word and not want anything to do with it. We'll avoid gathering with the people of God and stop any activity that reminds us we aren't living how God wants us to. We won't want to be reminded.\nThe author of Hebrews wants to warn believers of the destruction they'll face if they are not sure they are following the sole path to salvation in Jesus Christ. Reading this book is a bit like looking ahead on the road and seeing a frightening sign: 'Bridge Out Ahead!' Bridge Out Ahead!"
  },
  {
    id: 3,
    header: "African Male narrating: the Giver Method",
    role: "Voice over",
    description: "This book is about The GIVER Method which is designed to help you discover your superpowers and use them to enrich both your life and the lives of those around you.",
    title: "The GIVER Method",
    genre: "Religion and Spirituality",
    audioSrc: giverAudio,
    imageSrc: giverImg,
    transcript: "You have superpowers... but you probably think nothing could be further from the truth. Trapped in daily routines, always busy, always stressed, you want to be your best self but feel like you're constantly chasing your own tail. What you really want out of life gets pushed aside by what you feel you have to do. Your superpowers may seem like a fantasy, but they're real. When you unlock them, you open doors to a rich, rewarding life. These aren't Marvel-style powers - they're better! They're the gifts and talents unique to you, giving you the capacity to connect, inspire, and create meaning in every facet of life. The GIVER Method is designed to help you discover these superpowers and use them to enrich both your life and the lives of those around you. Inside this transformative guide, you'll discover:\n● How to identify and nurture your Gifts through self-discovery\n● Ways to use your Influence to create positive change\n● Strategies for creating Value and living with purpose\n● Techniques for Engaging in meaningful interactions\n● Methods to build stronger Relationships using The GIVER Method\n● Essential self-compassion practices to keep your cup full\n● The secret to harnessing emotional intelligence\n● A deeper understanding of The Principle of Reciprocity\n● Practical exercises and worksheets to apply every strategy\nYou don't need to find extra time - simply embrace The GIVER Method and watch the positive ripples spread throughout your life. Change is coming, and you're about to begin the most exciting chapter yet."
  },
  {
    id: 4,
    header: "African Male narrating: the Giver Method",
    role: "Voice over",
    description: "Voice over narration for audio book",
    title: "DADDY NEEDS A DRINK by Robert Wilder .pg 45",
    genre: "eBook",
    audioSrc: daddyAudio,
    imageSrc: daddyImg,
    transcript: "After months of very little repose, my wife and I grew irritable, barking at each other about everything from whose turn it was to sing, \"I See the Moon\" to our daughter at 3am to who - in our sleepwalking states, had placed the baby monitor in the fridge next to the long-forgotten bottle of white wine. We bought a crib from a couple we knew and tried to relocate our daughter from our bed into the new digs, but as soon as she saw her new gated community of one, she wailed like a banshee. Since my wife and I were both sleepy and cowardly, we moved her back in with us.\n\"Mamaaaaa,\" our daughter yelled. We crouched down even lower, as if she had one of those thermal-imaging machines the cops use to see through the walls of homes rented by violent felons. She abandoned what little speech she possessed and regressed to primal screams and cries, the kind we hadn't heard for months. Below the wails, we listened to her rattle the bars of her wooden cage. My wife, eyes closed, whispered softly to herself. Even though she was raised Catholic among Mormons in Utah, my wife is usually not someone who speaks freely to the Lord.\n\"Should I pray, too?\" I asked her in what I believed what a spousal bonding moment. She opened her eyes. \"Pray? I'm swearing, you idiot,\" she said, and I could recognize the mother tongue clearly now."
  }
];

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedVoiceover, setSelectedVoiceover] = useState<any | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Mobile Menu State

  const navigateToSection = (id: string) => {
    setCurrentView('home')
    setIsMobileMenuOpen(false) // Auto-close mobile menu when a link is clicked
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const BackIcon = () => (
    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );

  return (
    <div className="portfolio-container min-h-screen bg-white text-[#0F0F0F] font-body flex flex-col relative">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
          <div className="flex items-center gap-10">
            <a href="#home" onClick={(e) => { e.preventDefault(); navigateToSection('home'); }}>
              <img src={logo} alt="Anthony Chilaka Logo" className="logo-style cursor-pointer" />
            </a>
            
            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex gap-8 font-heading font-semibold text-xs text-gray-800 uppercase tracking-widest">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); navigateToSection('home'); }} className="hover:text-[#C41E3A] transition cursor-pointer">Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateToSection('about'); }} className="hover:text-[#C41E3A] transition cursor-pointer">About</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateToSection('services'); }} className="hover:text-[#C41E3A] transition cursor-pointer">Services</a></li>
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); navigateToSection('portfolio'); }} className="hover:text-[#C41E3A] transition cursor-pointer">Portfolio</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateToSection('contact'); }} className="hover:text-[#C41E3A] transition cursor-pointer">Contact</a></li>
            </ul>
          </div>

          <div className="flex gap-4 items-center">
            {/* Desktop Socials */}
            <div className="hidden md:flex gap-4 items-center border-r border-gray-200 pr-5">
              <a href="https://www.linkedin.com/in/anthonychilaka/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <img src={linkedin} alt="LinkedIn" className="w-5 h-5 opacity-75 hover:opacity-100" />
              </a>
              <a href="https://www.upwork.com/freelancers/~01952cdb9ce3e5b230?s=1017484851352698939" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <img src={upwork} alt="Upwork" className="w-5 h-5 opacity-75 hover:opacity-100" />
              </a>
              <a href="https://x.com/anthonychilaka" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform bg-gray-300/60 p-1 rounded-md flex items-center justify-center">
                <img src={xIcon} alt="X" className="w-4 h-4 opacity-75 hover:opacity-100" />
              </a>
              <a href="https://wa.me/2347015366600?text=Hi%20Anthony,%20I%20have%20viewed%20your%20services%20and%20would%20like%20to%20discuss%20further" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform flex items-center justify-center">
                <img src={whatsapp} alt="WhatsApp" className="w-5 h-5 opacity-75 hover:opacity-100 scale-[2]" />
              </a>
            </div>

            <a href="https://cal.com/anthonychilaka" target="_blank" rel="noopener noreferrer" 
               className="bg-[#0F0F0F] hover:bg-[#C41E3A] text-white px-5 py-2 md:px-6 md:py-2.5 rounded text-sm font-heading font-semibold transition-colors duration-300">
              Book Now
            </a>

            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden text-[#0F0F0F] hover:text-[#C41E3A] focus:outline-none ml-2" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 md:hidden flex flex-col z-50">
            <ul className="flex flex-col font-heading font-semibold text-sm text-gray-800 uppercase tracking-widest divide-y divide-gray-100">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); navigateToSection('home'); }} className="block px-6 py-4 hover:bg-gray-50 hover:text-[#C41E3A] transition cursor-pointer">Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateToSection('about'); }} className="block px-6 py-4 hover:bg-gray-50 hover:text-[#C41E3A] transition cursor-pointer">About</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateToSection('services'); }} className="block px-6 py-4 hover:bg-gray-50 hover:text-[#C41E3A] transition cursor-pointer">Services</a></li>
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); navigateToSection('portfolio'); }} className="block px-6 py-4 hover:bg-gray-50 hover:text-[#C41E3A] transition cursor-pointer">Portfolio</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateToSection('contact'); }} className="block px-6 py-4 hover:bg-gray-50 hover:text-[#C41E3A] transition cursor-pointer">Contact</a></li>
            </ul>
            <div className="px-6 py-5 bg-gray-50 flex gap-6 justify-center items-center border-t border-gray-100">
              <a href="https://www.linkedin.com/in/anthonychilaka/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <img src={linkedin} alt="LinkedIn" className="w-6 h-6 opacity-75 hover:opacity-100" />
              </a>
              <a href="https://www.upwork.com/freelancers/~01952cdb9ce3e5b230?s=1017484851352698939" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <img src={upwork} alt="Upwork" className="w-6 h-6 opacity-75 hover:opacity-100" />
              </a>
              <a href="https://x.com/anthonychilaka" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform bg-gray-300/60 p-1.5 rounded-md flex items-center justify-center">
                <img src={xIcon} alt="X" className="w-5 h-5 opacity-75 hover:opacity-100" />
              </a>
              <a href="https://wa.me/2347015366600?text=Hi%20Anthony,%20I%20have%20viewed%20your%20services%20and%20would%20like%20to%20discuss%20further" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform flex items-center justify-center">
                <img src={whatsapp} alt="WhatsApp" className="w-6 h-6 opacity-75 hover:opacity-100 scale-[2]" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* VIEW 1: MAIN HOME PAGE */}
      {currentView === 'home' && (
        <main className="flex-grow">
          <header id="home" className="hero-viewport relative flex items-center justify-center text-center text-white scroll-mt-20 overflow-hidden">
            
            {/* Desktop Banner (Hidden on Mobile) */}
            <img src={banner} alt="Banner" className="hidden md:block absolute inset-0 w-full h-full object-cover z-0 brightness-50" loading="eager" />
            
            {/* Mobile Banner (Hidden on Desktop) */}
            <img src={mobileBanner} alt="Mobile Banner" className="block md:hidden absolute inset-0 w-full h-full object-cover z-0 brightness-50" loading="eager" />
            
            <div className="relative z-10 max-w-4xl px-4 mt-24"> 
              <p className="text-xl md:text-2xl font-light text-gray-200 mt-[40px]">Bridging Data and Creative Strategy</p>
            </div>

            {/* Bouncing Scroll Indicator (Mobile Only) */}
            <div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-bounce md:hidden cursor-pointer"
              onClick={() => navigateToSection('about')}
            >
              <span className="text-[10px] uppercase tracking-widest font-heading font-semibold text-white/90 mb-1">Scroll to Explore</span>
              <svg className="w-6 h-6 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </header>

          <section id="about" className="py-24 bg-white scroll-mt-20">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1B3022] mb-6">
                Anthony Chilaka | Business Analyst | Citizen Developer | Mentor
              </h2>
              <div className="w-20 h-1 bg-[#C41E3A] mb-8"></div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-10">
                With <strong>+15 years</strong> in corporate brand sourcing and design and a proven track record over <strong>3+ years</strong> in AI-driven business optimization, I offer a comprehensive suite of digital and strategic services.
              </p>
              
              <ul className="space-y-6 text-gray-700 text-base leading-relaxed">
                <li className="flex items-start">
                  <span className="text-[#C41E3A] mr-3 mt-1 font-bold text-xl">•</span>
                  <div>
                    <strong>Business Analytics &amp; Business Intelligence:</strong> I transform raw data into ROI. I specialize in consolidating multi-channel sources - including Shopify, Meta, and Google Ads - into "single-pane-of-glass" dashboards for real-time clarity.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="text-[#C41E3A] mr-3 mt-1 font-bold text-xl">•</span>
                  <div>
                    <strong>Website Development &amp; Analytics:</strong> I build the next generation of web apps on Google Project IDX using React and TypeScript, integrated with insightful data pipelines for a unified view of website performance.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="text-[#C41E3A] mr-3 mt-1 font-bold text-xl">•</span>
                  <div>
                    <strong>Corporate Brand Sourcing:</strong> I provide expert-level talent and brand acquisition backed by <strong>over 15 years</strong> of corporate networking, ensuring timely delivery in line with client requirements.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="text-[#C41E3A] mr-3 mt-1 font-bold text-xl">•</span>
                  <div>
                    <strong>Business Intelligence Training:</strong> I serve as a Lead Mentor for data cohorts, specializing in Excel, MySQL, Power BI, and remote-work readiness.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="text-[#C41E3A] mr-3 mt-1 font-bold text-xl">•</span>
                  <div>
                    <strong>Voice Over:</strong> I offer high-quality voice-over services in the Religion/Spirituality and EduTech niches for audiobooks, YouTube channels, corporate training, and explainer videos. My voice is clear, warm, and professional, perfect for projects that require an authentic <strong>Male Nigerian (African)</strong> accent.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="services" className="py-24 bg-gray-50 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1B3022]">Professional Services</h2>
                <div className="w-20 h-1 bg-[#C41E3A] mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
                  <a href="https://cal.com/anthonychilaka" target="_blank" rel="noopener noreferrer" className="block h-48 overflow-hidden group cursor-pointer" title="click for more">
                    <img src={analytics} alt="Business Analytics" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </a>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 text-[#0F0F0F]">Business Analytics</h3>
                    <p className="text-gray-600 text-sm">Click the thumbnail above for a 1-on-1 session. Gain actionable insights from your complex data to guide your critical corporate strategies.</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
                  <a href="https://wa.me/2347015366600?text=Hi%20Anthony,%20I%20have%20viewed%20your%20services%20and%20would%20like%20to%20discuss%20further" target="_blank" rel="noopener noreferrer" className="block h-48 overflow-hidden group cursor-pointer" title="click for more">
                    <img src={training} alt="BI Training" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </a>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 text-[#0F0F0F]">BI Training</h3>
                    <p className="text-gray-600 text-sm">Click above image to request personalized BI training. Share your team's needs and get top-tier coaching on the latest Business Intelligence tooling and data workflows.</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
                  <a href="https://cal.com/anthonychilaka" target="_blank" rel="noopener noreferrer" className="block h-48 overflow-hidden group cursor-pointer" title="click for more">
                    <img src={sourcing} alt="Corporate Sourcing" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </a>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 text-[#0F0F0F]">Corporate Sourcing</h3>
                    <p className="text-gray-600 text-sm">Click above image for expert corporate sourcing. We bridge the gap between borders to ensure your brand items are delivered reliably and on-brand, every time.</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
                  <a href="#" 
                     onClick={(e) => { e.preventDefault(); setCurrentView('voiceovers'); window.scrollTo(0,0); }} 
                     className="block h-48 overflow-hidden group cursor-pointer" title="click for more">
                    <img src={voiceover} alt="Voice Over" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </a>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 text-[#0F0F0F]">Voice Over</h3>
                    <p className="text-gray-600 text-sm">Click the thumbnail above for voice samples featuring an authentic, professional Male Nigerian accent.</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
                  <a href="#" 
                     onClick={(e) => { e.preventDefault(); setCurrentView('templates'); window.scrollTo(0,0); }} 
                     className="block h-48 overflow-hidden group cursor-pointer" title="click for more">
                    <img src={webbuild} alt="Website Development" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </a>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 text-[#0F0F0F]">Website Development</h3>
                    <p className="text-gray-600 text-sm">Click the image above to view available templates. Please take a screenshot of your choice or share your specific preferences via the social media handles located at the top and bottom of this page.</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
                  <a href="#" 
                     onClick={(e) => { e.preventDefault(); setCurrentView('walkthroughs'); window.scrollTo(0,0); }} 
                     className="block h-48 overflow-hidden group cursor-pointer" title="click to view walkthroughs">
                    <img src={walkthrough} alt="Monthly Project Walkthroughs" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </a>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 text-[#0F0F0F]">Monthly Project Walkthroughs</h3>
                    <p className="text-gray-600 text-sm">Comprehensive step-by-step guides delivered to your inbox. Click the above thumbnail to view and download.</p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <section id="portfolio" className="py-24 bg-white scroll-mt-10">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1B3022] mb-10">Work in Action</h2>
              
              <a href="#" 
                 onClick={(e) => { e.preventDefault(); setCurrentView('portfolio_loading'); window.scrollTo(0,0); }} 
                 className="block max-w-4xl mx-auto rounded-xl overflow-hidden shadow-md mb-12 group cursor-pointer" 
                 title="click to view portfolio">
                <img src={portfolio} alt="Portfolio Header" loading="lazy" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
              </a>

              <p className="text-gray-600 max-w-2xl mx-auto text-lg">Click through to check on past execution workflows, analytic implementations, and published case studies.</p>
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: TEMPLATES PAGE */}
      {currentView === 'templates' && (
         <main className="flex-grow bg-white pt-36 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <button 
              onClick={() => navigateToSection('services')}
              className={`mb-8 text-[#C41E3A] font-semibold flex items-center hover:underline group cursor-pointer`}
            >
              <BackIcon /> Back to Services
            </button>

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1B3022]">Available Templates</h2>
              <div className="w-20 h-1 bg-[#C41E3A] mx-auto mt-4"></div>
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">Explore the layouts below to find the perfect foundation for your project.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl overflow-hidden p-5 flex flex-col items-center border border-gray-100">
                <a href="https://wpastra.com/website-templates/business/" target="_blank" rel="noopener noreferrer" className="w-full h-56 rounded-md overflow-hidden group shadow-sm block cursor-pointer">
                  <img src={businesstemplate} alt="Business Template" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </a>
                <h3 className="text-lg font-heading font-bold mt-5 mb-2 text-[#0F0F0F]">Business Template</h3>
                <a href="https://wpastra.com/website-templates/business/" target="_blank" rel="noopener noreferrer" className="text-[#C41E3A] hover:underline font-semibold text-sm break-words text-center w-full">View Template Live &rarr;</a>
              </div>

              <div className="bg-gray-50 rounded-xl overflow-hidden p-5 flex flex-col items-center border border-gray-100">
                <a href="https://wpastra.com/website-templates/finance/" target="_blank" rel="noopener noreferrer" className="w-full h-56 rounded-md overflow-hidden group shadow-sm block cursor-pointer">
                  <img src={financetemplate} alt="Finance Template" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </a>
                <h3 className="text-lg font-heading font-bold mt-5 mb-2 text-[#0F0F0F]">Finance Template</h3>
                <a href="https://wpastra.com/website-templates/finance/" target="_blank" rel="noopener noreferrer" className="text-[#C41E3A] hover:underline font-semibold text-sm break-words text-center w-full">View Template Live &rarr;</a>
              </div>

              <div className="bg-gray-50 rounded-xl overflow-hidden p-5 flex flex-col items-center border border-gray-100">
                <a href="https://wpastra.com/website-templates/restaurant/" target="_blank" rel="noopener noreferrer" className="w-full h-56 rounded-md overflow-hidden group shadow-sm block cursor-pointer">
                  <img src={restauranttemplate} alt="Restaurant Template" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </a>
                <h3 className="text-lg font-heading font-bold mt-5 mb-2 text-[#0F0F0F]">Restaurant Template</h3>
                <a href="https://wpastra.com/website-templates/restaurant/" target="_blank" rel="noopener noreferrer" className="text-[#C41E3A] hover:underline font-semibold text-sm break-words text-center w-full">View Template Live &rarr;</a>
              </div>

              <div className="bg-gray-50 rounded-xl overflow-hidden p-5 flex flex-col items-center border border-gray-100">
                <a href="https://wpastra.com/website-templates/beauty-fashion/" target="_blank" rel="noopener noreferrer" className="w-full h-56 rounded-md overflow-hidden group shadow-sm block cursor-pointer">
                  <img src={beautyandfashion} alt="Beauty and Fashion" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </a>
                <h3 className="text-lg font-heading font-bold mt-5 mb-2 text-[#0F0F0F]">Beauty and Fashion</h3>
                <a href="https://wpastra.com/website-templates/beauty-fashion/" target="_blank" rel="noopener noreferrer" className="text-[#C41E3A] hover:underline font-semibold text-sm break-words text-center w-full">View Template Live &rarr;</a>
              </div>

              <div className="bg-gray-50 rounded-xl overflow-hidden p-5 flex flex-col items-center border border-gray-100">
                <a href="https://wpastra.com/website-templates/service/" target="_blank" rel="noopener noreferrer" className="w-full h-56 rounded-md overflow-hidden group shadow-sm block cursor-pointer">
                  <img src={ngoservices} alt="NGO/Services" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </a>
                <h3 className="text-lg font-heading font-bold mt-5 mb-2 text-[#0F0F0F]">NGO/Services</h3>
                <a href="https://wpastra.com/website-templates/service/" target="_blank" rel="noopener noreferrer" className="text-[#C41E3A] hover:underline font-semibold text-sm break-words text-center w-full">View Template Live &rarr;</a>
              </div>

              <div className="bg-gray-50 rounded-xl overflow-hidden p-5 flex flex-col items-center border border-gray-100">
                <a href="https://wa.me/2347015366600?text=Hi%20Anthony,%20I%20have%20viewed%20your%20services%20and%20would%20like%20to%20discuss%20further" target="_blank" rel="noopener noreferrer" className="w-full h-56 rounded-md overflow-hidden group shadow-sm block cursor-pointer">
                  <img src={enterprise} alt="Enterprise Solution" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </a>
                <h3 className="text-lg font-heading font-bold mt-5 mb-2 text-[#0F0F0F]">Enterprise Solution?</h3>
                <a href="https://wa.me/2347015366600?text=Hi%20Anthony,%20I%20have%20viewed%20your%20services%20and%20would%20like%20to%20discuss%20further" target="_blank" rel="noopener noreferrer" className="text-[#C41E3A] hover:underline font-semibold text-sm break-words text-center w-full max-w-[200px] truncate">Contact to Discuss &rarr;</a>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 3: VOICE OVERS PAGE */}
      {currentView === 'voiceovers' && (
        <main className="flex-grow bg-white pt-36 pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <button 
              onClick={() => navigateToSection('services')}
              className={`mb-8 text-[#C41E3A] font-semibold flex items-center hover:underline group cursor-pointer`}
            >
              <BackIcon /> Back to Services
            </button>

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1B3022]">Voice Over Portfolio</h2>
              <div className="w-20 h-1 bg-[#C41E3A] mx-auto mt-4"></div>
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">Listen to samples below featuring an authentic, professional Male Nigerian accent.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {VOICEOVERS_DATA.map((vo) => (
                <div 
                  key={vo.id} 
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100 cursor-pointer group"
                  onClick={() => setSelectedVoiceover(vo)}
                  title="Click to play and view details"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img src={vo.imageSrc} alt={vo.header} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 text-[#1B3022] rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform">
                        <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-heading font-bold text-[#0F0F0F]">{vo.header}</h3>
                    <p className="text-sm text-gray-500 mt-2">{vo.genre}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* VIEW 4: WALKTHROUGHS PAGE */}
      {currentView === 'walkthroughs' && (
        <main className="flex-grow bg-white pt-36 pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <button 
              onClick={() => navigateToSection('services')}
              className={`mb-8 text-[#C41E3A] font-semibold flex items-center hover:underline group cursor-pointer`}
            >
              <BackIcon /> Back to Services
            </button>

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1B3022]">Monthly Project Walkthroughs</h2>
              <div className="w-20 h-1 bg-[#C41E3A] mx-auto mt-4"></div>
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">Curated, step-by-step guides for optimizing your business. Coming soon!</p>
            </div>

            <div className="flex justify-center mt-10">
              <div className="max-w-3xl w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <img src={walkthroughloading} alt="Walkthroughs Loading" loading="lazy" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 5: PORTFOLIO LOADING PAGE */}
      {currentView === 'portfolio_loading' && (
        <main className="flex-grow bg-white pt-36 pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <button 
              onClick={() => navigateToSection('portfolio')}
              className={`mb-8 text-[#C41E3A] font-semibold flex items-center hover:underline group cursor-pointer`}
            >
              <BackIcon /> Back to Portfolio
            </button>

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1B3022]">Work in Action</h2>
              <div className="w-20 h-1 bg-[#C41E3A] mx-auto mt-4"></div>
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">Past execution workflows, analytic implementations, and published case studies.</p>
            </div>

            <div className="flex justify-center mt-10">
              <div className="max-w-4xl w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <img src={portfolioloading} alt="Portfolio Content Loading" loading="lazy" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VOICEOVER MODAL */}
      {selectedVoiceover && (
        <div className="fixed inset-0 z-[100] bg-white/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
          <div className="bg-white border border-gray-100 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col pt-10">
            
            <button 
              onClick={() => setSelectedVoiceover(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-red-500 transition"
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="px-10 pb-6 border-b border-gray-100">
              <h2 className="text-3xl font-heading font-bold text-[#0F0F0F] pr-10">{selectedVoiceover.header}</h2>
            </div>

            <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 space-y-8">
                <div>
                  <p className="text-sm text-gray-500">My role. <span className="text-gray-800 font-medium">{selectedVoiceover.role}</span></p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Project description.</p>
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedVoiceover.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Title: {selectedVoiceover.title}</p>
                  <p className="text-sm text-gray-600">Genre: {selectedVoiceover.genre}</p>
                </div>
              </div>

              <div className="lg:col-span-8 bg-gray-50 rounded-xl p-8 border border-gray-100 box-shadow-inner">
                <h3 className="font-heading font-bold text-lg mb-4 text-[#0F0F0F]">
                  {selectedVoiceover.title}
                </h3>

                <audio 
                  controls 
                  src={selectedVoiceover.audioSrc} 
                  className="w-full mb-8 outline-none"
                  controlsList="nodownload"
                  preload="none"
                >
                  Your browser does not support the audio element.
                </audio>

                <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                  <h4 className="font-semibold text-gray-900 uppercase tracking-wider text-xs mb-2">Transcript</h4>
                  {selectedVoiceover.transcript.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DISCOVERY CALL FOOTER */}
      <footer id="contact" className="py-20 bg-[#1B3022] text-white overflow-hidden scroll-mt-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-heading font-bold mb-6">Ready to Optimize?</h2>
            
            <p className="text-gray-300 text-lg mb-10 max-w-md">
              Connect with me directly by booking a slot on my <strong>calendar</strong> (link to the right) or via any of the social media <strong>links</strong> listed below.
            </p>
            
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/anthonychilaka/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform bg-white/10 hover:bg-white/20 p-3 rounded-full">
                <img src={linkedin} alt="LinkedIn" loading="lazy" className="w-5 h-5 opacity-90" />
              </a>
              <a href="https://www.upwork.com/freelancers/~01952cdb9ce3e5b230?s=1017484851352698939" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform bg-white/10 hover:bg-white/20 p-3 rounded-full">
                <img src={upwork} alt="Upwork" loading="lazy" className="w-5 h-5 opacity-90" />
              </a>
              <a href="https://x.com/anthonychilaka" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform bg-white/10 hover:bg-white/20 p-3 rounded-full">
                <img src={xIcon} alt="X" loading="lazy" className="w-5 h-5 opacity-90" />
              </a>
              <a href="https://wa.me/2347015366600?text=Hi%20Anthony,%20I%20have%20viewed%20your%20services%20and%20would%20like%20to%20discuss%20further" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform bg-white/10 hover:bg-white/20 p-3 rounded-full flex items-center justify-center">
                <img src={whatsapp} alt="WhatsApp" loading="lazy" className="w-5 h-5 opacity-90 scale-[2]" />
              </a>
            </div>
          </div>

          <div className="relative cursor-pointer overflow-hidden rounded-2xl group shadow-2xl" onClick={() => window.open('https://cal.com/anthonychilaka', '_blank')}>
            <img src={call} alt="Book a discovery call" loading="lazy" className="brightness-75 group-hover:brightness-100 transition duration-500 w-full object-cover h-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white/80 backdrop-blur-sm text-[#1B3022] px-8 py-3.5 rounded-full font-heading font-bold shadow-lg group-hover:scale-105 transition duration-300">
                schedule 1-on-1
              </span>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-20 border-t border-white/10 pt-8">
          © {new Date().getFullYear()} Anthony Chilaka. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
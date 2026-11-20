"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  PhoneCall,
  Lock,
  CheckCircle2,
  ArrowUpRight,
  BatteryCharging,
  ChevronDown,
  ChevronRight,
  Check,
  Menu,
  X,
  ExternalLink,
  Home,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Clock,
  MapPin,
  Sparkles,
  Shield,
  Send,
  AlertTriangle,
  Radio,
  Smartphone,
  RefreshCw,
  Bell,
  KeyRound,
  ArrowDownLeft,
  Plus,
  Minus,
  Users,
  Zap,
  ArrowRight,
  Eye,
  Layers,
  Cpu,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";
import { CheckSafeLogo, CheckSafeIcon } from "@/components/ui/CheckSafeLogo";
import { SiteFooter } from "@/components/ui/SiteFooter";
import {
  RotatingSecurityStamp,
  RealEstateViewingScene,
  HealthcareCareScene,
  SurveyInspectionScene,
} from "@/components/ui/EditorialScenes";
import { COMPANY_NAME, PRIMARY_DOMAIN, VERIFY_DOMAIN } from "@/lib/domains";
import { COUNTRY_LIST, SUPPORTED_COUNTRIES } from "@/lib/countries";
import { DEFAULT_APP_SETTINGS } from "@/lib/types";

const COUNTRY_FLAGS = {
  GB: "🇬🇧",
  IE: "🇮🇪",
  US: "🇺🇸",
  CA: "🇨🇦",
  AU: "🇦🇺",
  NZ: "🇳🇿",
  DE: "🇩🇪",
};

const TESTIMONIALS_COL_1 = [
  {
    quote:
      "Checksafe completely eliminated the anxiety of meeting unvetted buyers in vacant multi-million pound properties. Clients complete verification on their phones in 60 seconds, and my personal mobile is never compromised.",
    name: "Eleanor Vance",
    role: "Prime Residential Partner · Mayfair",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "This platform helped me streamline my solo inspection protocols, offering a level of automated clarity and duty-of-care structure that fully protects my workflow every single day.",
    name: "Jonathan Reeves",
    role: "Chartered Valuation Surveyor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Working with Checksafe has improved our operational peace of mind in ways we didn't think possible for solo night site inspections and out-of-hours callouts.",
    name: "David Ross",
    role: "Operations Supervisor · Yorkshire",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  },
];

const TESTIMONIALS_COL_2 = [
  {
    quote:
      "I appreciate how practical and covert each failsafe is. When meeting unpredictable individuals in private rooms, having automated cloud timers running silently is essential.",
    name: "Dr. Marcus Thorne",
    role: "Clinical Specialist · Harley St",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "The ghost proxy phone shield is non-negotiable. Clients never see my WhatsApp or personal SIM number, and the triple-tap fake battery screen is the smartest covert escape mechanism.",
    name: "Ethan Morales",
    role: "Commercial Property Valuer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "The system is zero-install, reliable, and instantaneous to adopt. None of our field workers need to carry clunky extra hardware or remember to recharge separate panic pendants.",
    name: "Marcus Wright",
    role: "Community Care Supervisor",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  },
];

const TESTIMONIALS_COL_3 = [
  {
    quote:
      "Surveying derelict commercial basements means zero mobile data. The 1-bar cellular SMS fallback and cloud timer ensure someone knows my exact address if I don't check out in time.",
    name: "Sarah Jenkins",
    role: "Principal Structural Engineer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Visiting high-conflict households alone is a routine reality. Having the unbranded emergency link on my lockscreen means I can trigger immediate silent help without alerting anyone in the room.",
    name: "Rachel Adams",
    role: "Outreach Specialist · Bristol",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Serving contentious notices often triggers hostility. Checksafe's custom secret Duress Code looks like a harmless exit screen while dispatching emergency GPS packets immediately.",
    name: "Daniel Hart",
    role: "Process Server & Field Auditor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
];


const TRADE_USE_CASES = [
  {
    id: "property",
    tabLabel: "Property",
    tabSubtitle: "Estate agents, vacant viewings, surveyors",
    verticalLabel: "ESTATE AGENTS & SURVEYORS",
    categoryTag: "Property & Surveying Protocol",
    emoji: "🏡",
    icon: Home,
    tag: "SECTOR 01 · ESTATE AGENTS & SURVEYORS",
    badge: "Vacant & High-Value Properties",
    headline: "Unaccompanied Viewings & Vacant Asset Inspections",
    hazardContext:
      "Solo estate agents face acute personal vulnerability unlocking vacant residences for unvetted viewers.",
    description1:
      "Solo estate agents face acute personal vulnerability when unlocking vacant residences for unknown viewers without an active safety net.",
    description2:
      "Checksafe mandates automated 3D biometric screening before releasing keys. Inquiries route through a virtual Twilio proxy to keep your personal SIM invisible, with an active cloud countdown.",
    stats: [
      { value: "60s", label: "Veriff Biometric Purge" },
      { value: "100%", label: "Personal SIM Privacy" },
    ],
    ctaLabel: "Protect Estate Viewings",
    testimonial: {
      name: "Eleanor Vance",
      role: "Prime Residential Partner, Mayfair",
    },
    safeguards: [
      {
        title: "Pre-Key Biometric Pass",
        codeBadge: "60s Purge",
        icon: ShieldCheck,
        description:
          "Automated 3D selfie & photo ID screening before property keys or addresses are released. Raw identity data purged within 60s.",
      },
      {
        title: "Dedicated Ghost Proxy Line",
        codeBadge: "100% Privacy",
        icon: PhoneCall,
        description:
          "Calls, SMS, and WhatsApp exchanges route through a virtual Twilio proxy. Your personal mobile number stays 100% private.",
      },
      {
        title: "Active Viewing Countdown",
        codeBadge: "Cloud Sentinel Alert",
        icon: Clock,
        description:
          "Configurable viewing countdown. If safe code isn't entered upon exit, automated peer & agency dispatch alerts fire with coordinates.",
      },
    ],
    pwaMockup: {
      sessionTitle: "Prime Penthouse Viewing",
      clientName: "David Kensington",
      clientTag: "Biometrically Cleared (Veriff 60s)",
      timer: "00:34:12",
      timerLabel: "Viewing Session Active",
      proxyNumber: "+44 20 7946 0912",
      address: "42 Belgrave Square, London SW1X 8PZ",
      emergencyContact: "Mayfair Agency Fleet Dispatch",
      specialFeature: "Zero-Knowledge Geolocation Lock",
    },
    bgImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=960&q=75",
  },
  {
    id: "tuition",
    tabLabel: "Private Tuition",
    tabSubtitle: "In-home tutors, music instructors",
    verticalLabel: "IN-HOME TUTORS & INSTRUCTORS",
    categoryTag: "Education & Private Tutoring",
    emoji: "📚",
    icon: GraduationCap,
    tag: "SECTOR 02 · IN-HOME TUTORS & MENTORS",
    badge: "Domestic Residences & 1-on-1 Sessions",
    headline: "In-Home Academic Mentoring & Evening Music Lessons",
    hazardContext:
      "Independent tutors enter unfamiliar domestic homes, conducting 1-on-1 sessions without institutional back-up.",
    description1:
      "Tutors and instructors routinely travel to unfamiliar domestic addresses without reception or check-in visibility.",
    description2:
      "Checksafe issues a single-use identity pass to the parent prior to lesson 1, backed by an automated 60-minute cloud countdown.",
    stats: [
      { value: "1-Tap", label: "Parent ID Clearance" },
      { value: "60m", label: "Automated Cloud Timer" },
    ],
    ctaLabel: "Secure In-Home Tutoring",
    testimonial: {
      name: "Dr. Julian Hayes",
      role: "Senior Private STEM Tutor, Surrey",
    },
    safeguards: [
      {
        title: "Parent Identity Clearance",
        codeBadge: "HMAC Hash",
        icon: ShieldCheck,
        description:
          "Single-use link verifies parent or guardian identity, cross-checking the Global Safety Hash red-flag registry.",
      },
      {
        title: "Masked Client Communication",
        codeBadge: "Out-of-Hours Mute",
        icon: PhoneCall,
        description:
          "Dedicated virtual proxy numbers mask your personal phone, preventing personal WhatsApp exposure and out-of-hours harassment.",
      },
      {
        title: "Automated Lesson Check-In",
        codeBadge: "60m Cloud Timer",
        icon: Clock,
        description:
          "60-minute cloud session timer. Extend with 1 tap or enter your secret 4-digit PIN to safely complete the session.",
      },
    ],
    pwaMockup: {
      sessionTitle: "Advanced STEM Tutoring",
      clientName: "Parent: Eleanor Wright",
      clientTag: "Identity Verified (HMAC Hash)",
      timer: "00:52:18",
      timerLabel: "Lesson Timer Running",
      proxyNumber: "+44 14 8390 1420",
      address: "18 Richmond Crescent, Surrey KT2 7BB",
      emergencyContact: "Nominated Peer (Sarah Thompson)",
      specialFeature: "Auto-Cancel On Safe Code Exit",
    },
    bgImage:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=960&q=75",
  },
  {
    id: "wellness",
    tabLabel: "Mobile Wellness",
    tabSubtitle: "Domiciliary care, clinical therapy, mobile massage",
    verticalLabel: "DOMICILIARY CARE & CLINICAL",
    categoryTag: "Healthcare & Clinical Practice",
    emoji: "🩺",
    icon: HeartPulse,
    tag: "SECTOR 03 · CLINICAL & DOMICILIARY CARE",
    badge: "Solo Clinical & Home Patient Care",
    headline: "Domiciliary Patient Visits & Solo Clinical Consultations",
    hazardContext:
      "Mobile clinicians and therapists enter private homes alone where patient volatility requires immediate covert protection.",
    description1:
      "Visiting patients in private residences presents lone-worker safety risks. Checksafe arms mobile clinicians with Safety Guidelines covert escalation.",
    description2:
      "Entering your secret Duress Code simulates a normal checkout while silently relaying coordinates. A triple-tap triggers a realistic black Low Battery screen.",
    stats: [
      { value: "2-Stage", label: "Automated Escalation" },
      { value: "Duress", label: "Custom Duress Code" },
    ],
    ctaLabel: "Start Protection for Mobile Wellness",
    testimonial: {
      name: "Dr. Marcus Thorne",
      role: "Consultant Clinical Psychologist, Edinburgh",
    },
    safeguards: [
      {
        title: "Two-Stage Cloud Escalation",
        codeBadge: "5-Min Silent Grace",
        icon: HeartPulse,
        description:
          "Discreet 5-minute silent grace window before automated London cloud dispatch transmits address coordinates to your clinical contact.",
      },
      {
        title: "Custom Secret Duress Code",
        codeBadge: "Zero-Trace Handoff",
        icon: Lock,
        description:
          "Under coercion, silent duress PIN displays an innocent session exit screen while broadcasting coordinates to on-call peers.",
      },
      {
        title: "Covert Low-Battery Blackout",
        codeBadge: "Covert Black Screen",
        icon: BatteryCharging,
        description:
          "Triple-tap renders an unresponsive black 1% battery shutdown graphic while cloud countdown runs independently.",
      },
    ],
    pwaMockup: {
      sessionTitle: "Domiciliary Patient Assessment",
      clientName: "Arthur Vance (Patient Referral)",
      clientTag: "Clinical Screening Cleared",
      timer: "00:26:45",
      timerLabel: "Two-Stage Cloud Armed",
      proxyNumber: "+44 20 7946 0884",
      address: "74 St John's Way, Islington N19 3RL",
      emergencyContact: "Clinical Practice On-Call Desk + 999",
      specialFeature: "Covert Low-Battery Screen Ready",
    },
    bgImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=960&q=75",
  },
  {
    id: "independent",
    tabLabel: "Independent Professionals",
    tabSubtitle: "Consultants, tradespeople, solo home visits",
    verticalLabel: "CONSULTANTS & SOLO TRADES",
    categoryTag: "Engineering & Fieldwork Operations",
    emoji: "💼",
    icon: Briefcase,
    tag: "SECTOR 04 · CONSULTANTS & SITE AUDITS",
    badge: "Solo Consultations & Field Audits",
    headline: "Commercial Site Appraisals & Technical Fieldwork",
    hazardContext:
      "Engineers and tradespeople operate in basements and industrial facilities where cellular data drops to zero.",
    description1:
      "Technical tradespeople operate in basements and remote facilities where 4G/5G cellular data routinely drops to zero.",
    description2:
      "Checksafe operates over 1-bar SMS satellite fallback so cloud timers persist and 'SAFE' codes execute without internet.",
    stats: [
      { value: "1-Bar", label: "SMS Satellite Fallback" },
      { value: "£0", label: "Trusted Client Vault" },
    ],
    ctaLabel: "Deploy Fieldwork Sentinel",
    testimonial: {
      name: "Sophie Campbell",
      role: "Head of Safety & Operations, Manchester",
    },
    safeguards: [
      {
        title: "1-Bar SMS Satellite Fallback",
        codeBadge: "1-Bar Cellular",
        icon: Shield,
        description:
          "Timers run in the London cloud. Send 'SAFE' or 'SOS' over standard 1-bar SMS without requiring 4G or Wi-Fi.",
      },
      {
        title: "Trusted Client Vault (£0)",
        codeBadge: "£0 Free Repeat",
        icon: Lock,
        description:
          "Cryptographic vault stores hashed client fingerprints for instant £0 repeat bookings without recurring check fees.",
      },
      {
        title: "Global Red-Flag Threat List",
        codeBadge: "Zero-Knowledge DB",
        icon: ShieldCheck,
        description:
          "Cross-worker community safety shield immediately red-flags repeat non-payers and hostile aggressors.",
      },
    ],
    pwaMockup: {
      sessionTitle: "Commercial Plant Inspection",
      clientName: "Apex Logistics Hub Manager",
      clientTag: "Trusted Client Vault Token",
      timer: "01:14:30",
      timerLabel: "SMS Satellite Sentinel",
      proxyNumber: "+44 16 1946 0331",
      address: "Unit 9, Trafford Industrial Park, M17 1EH",
      emergencyContact: "Central Dispatch & Peer Supervisor",
      specialFeature: "Works Over 1-Bar Cellular Fallback",
    },
    bgImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=960&q=75",
  },
];

const NAV_SECTORS = [
  {
    id: "property",
    idx: 0,
    brandName: "Property Safety",
    label: "Property Viewings",
    desc: "easy biometric KYC & proxy lines for estate viewings",
    icon: Home,
  },
  {
    id: "tuition",
    idx: 1,
    brandName: "Tuition & Coaching",
    label: "Private Tuition",
    desc: "parent verification pass & automated cloud timers",
    icon: GraduationCap,
  },
  {
    id: "wellness",
    idx: 2,
    brandName: "Clinical & Home Care",
    label: "Clinical & Care",
    desc: "silent duress triggers & covert blackout protection",
    icon: HeartPulse,
  },
  {
    id: "independent",
    idx: 3,
    brandName: "Fieldwork & Surveying",
    label: "Field & Industrial",
    desc: "1-bar cellular fallback for off-grid lone workers",
    icon: Briefcase,
  },
];

export default function EditorialLuxuryPage() {
  const router = useRouter();
  const [settings] = useState(DEFAULT_APP_SETTINGS);
  const [country, setCountry] = useState("GB");
  const [audience, setAudience] = useState("personal");
    
  
  const [activeTradeTab, setActiveTradeTab] = useState(0);
  const [activeNav, setActiveNav] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [footerEmail, setFooterEmail] = useState("");
  

  // GSAP Animation Refs for Hero & Whole Page Scope
  const pageContainerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroCardRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroBgMouseRef = useRef(null);
  const heroBgInnerRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroNotchRef = useRef(null);

  // Live Simulator States
  const [simPhoneNumber, setSimPhoneNumber] = useState("+44 7700 900456");
  const [simVerificationState, setSimVerificationState] = useState("idle");
  const [simTimerSeconds, setSimTimerSeconds] = useState(2052); // 34m 12s
  const [simTimerRunning, setSimTimerRunning] = useState(true);
  const [simTriggerStatus, setSimTriggerStatus] = useState("normal"); // "normal" | "safe_cleared" | "silent_duress" | "grace_warning"
  const [simFakeBattery, setSimFakeBattery] = useState(false);
  const [simActiveTab, setSimActiveTab] = useState("normal");
  const [failsafeBlackout, setFailsafeBlackout] = useState(false);
  const [duressDemoTab, setDuressDemoTab] = useState("peaceful");
  const [activeFailsafeStep, setActiveFailsafeStep] = useState(0);
  const [gsmTransmitted, setGsmTransmitted] = useState(false);

  function handleSelectFailsafeStep(idx) {
    setActiveFailsafeStep(idx);
    if (typeof window !== "undefined") {
      const el = document.getElementById(`failsafe-step-${idx}`);
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -110, duration: 0.8 });
      } else {
        el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }

  const countryCfg = SUPPORTED_COUNTRIES[country];
  
  const currentTrade = TRADE_USE_CASES[activeTradeTab] || TRADE_USE_CASES[0];

  useEffect(() => {
    let ticking = false;
    let cachedOffsets = [];

    const calculateOffsets = () => {
      const sections = [
        { id: "pricing", name: "pricing" },
        { id: "failsafes", name: "architecture" },
        { id: "protocol", name: "protocol" },
        { id: "sectors", name: "sectors" },
        { id: "journey", name: "journey" },
      ];
      cachedOffsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          return el ? { name: s.name, top: el.offsetTop } : null;
        })
        .filter(Boolean);
    };

    calculateOffsets();
    window.addEventListener("resize", calculateOffsets, { passive: true });

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY;
          setIsScrolled((prev) => (sy > 15 ? (prev ? prev : true) : prev ? false : false));

          const scrollPos = sy + 200;
          let matched = false;
          for (const s of cachedOffsets) {
            if (scrollPos >= s.top) {
              setActiveNav((curr) => (curr !== s.name ? s.name : curr));
              matched = true;
              break;
            }
          }
          if (!matched && sy < 300) {
            setActiveNav((curr) => (curr !== "services" && curr !== "home" ? "home" : curr));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateOffsets);
    };
  }, []);

  // GSAP Entrance, Live Parallax & Scroll-Triggered Parallax Animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    let removeMouseListeners = () => { };

    const ctx = gsap.context(() => {
      // 1. Smooth, cinematic entrance animation with intentional breath on reload
      const entranceTl = gsap.timeline({
        delay: 0.25, // Gentle breath after reload so the page finishes paint and layout
        defaults: { ease: "power3.out" },
      });

      // Prevent any flash of un-animated content on reload
      gsap.set(
        [
          heroTitleRef.current,
          heroSubtitleRef.current,
          heroButtonsRef.current,
          heroNotchRef.current,
        ],
        { opacity: 0 }
      );

      entranceTl
        .fromTo(
          heroBgRef.current,
          { scale: 1.15, opacity: 0.75 },
          { scale: 1.05, opacity: 1, duration: 1.5, ease: "power2.out" },
          0
        )
        .fromTo(
          heroTitleRef.current,
          { y: 38, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          0.12
        )
        .fromTo(
          heroSubtitleRef.current,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.28
        )
        .fromTo(
          heroButtonsRef.current,
          { y: 22, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" },
          0.42
        )
        .fromTo(
          heroNotchRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.52
        );

      // 2. Continuous Organic Ambient "Live Camera" Parallax Drift
      // Subtle multi-axis breathing gives the image life even before mouse or scroll
      const ambientAnim = gsap.to(heroBgInnerRef.current, {
        scale: 1.18,
        xPercent: 1.6,
        yPercent: -1.4,
        rotation: 0.35,
        duration: 8.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Pause ambient animation when hero is scrolled out of viewport to preserve mobile GPU/battery
      if (typeof IntersectionObserver !== "undefined" && heroSectionRef.current) {
        const heroObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              ambientAnim.play();
            } else {
              ambientAnim.pause();
            }
          },
          { threshold: 0.05 }
        );
        heroObserver.observe(heroSectionRef.current);
      }

      // 3. Interactive Mouse-Move 3D Depth Parallax
      // Background and foreground move in counter-perspective when hovering over hero
      if (window.matchMedia("(hover: hover)").matches && heroCardRef.current) {
        const bgXTo = gsap.quickTo(heroBgMouseRef.current, "x", {
          duration: 0.8,
          ease: "power2.out",
        });
        const bgYTo = gsap.quickTo(heroBgMouseRef.current, "y", {
          duration: 0.8,
          ease: "power2.out",
        });
        const contentXTo = gsap.quickTo(heroContentRef.current, "x", {
          duration: 0.7,
          ease: "power2.out",
        });
        const contentYTo = gsap.quickTo(heroContentRef.current, "y", {
          duration: 0.7,
          ease: "power2.out",
        });

        const handleMouseMove = (e) => {
          if (!heroCardRef.current) return;
          const rect = heroCardRef.current.getBoundingClientRect();
          // Normalized -0.5 to 0.5 from center of the hero card
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          // Background moves away from cursor (deep perspective)
          bgXTo(relX * -34);
          bgYTo(relY * -22);

          // Foreground text drifts gently toward cursor (floating layer)
          contentXTo(relX * 12);
          contentYTo(relY * 8);
        };

        const handleMouseLeave = () => {
          bgXTo(0);
          bgYTo(0);
          contentXTo(0);
          contentYTo(0);
        };

        const cardEl = heroCardRef.current;
        cardEl.addEventListener("mousemove", handleMouseMove, { passive: true });
        cardEl.addEventListener("mouseleave", handleMouseLeave, { passive: true });

        removeMouseListeners = () => {
          cardEl.removeEventListener("mousemove", handleMouseMove);
          cardEl.removeEventListener("mouseleave", handleMouseLeave);
        };
      }

      // 4. Silky-smooth ScrollTrigger Parallax (scrub: 1.0 for responsive damping)
      // Background building pans with optical depth
      const sectorsSection = document.getElementById("sectors");
      const heroSlide = heroSectionRef.current;
      if (sectorsSection && heroSlide && heroCardRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroSlide,
            start: "top 64px",
            endTrigger: sectorsSection,
            end: "top 64px",
            scrub: 1.0,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        // Left text content drifts up and eases away
        gsap.to(heroContentRef.current, {
          yPercent: -14,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: heroSlide,
            start: "top 64px",
            endTrigger: sectorsSection,
            end: "top 64px",
            scrub: 1.0,
            fastScrollEnd: true,
          },
        });

        // =========================================================================
        // 4. GSAP HERO-TO-SECTION-2 STACKED SLIDE SCROLL ANIMATION
        // Fixed header + container pt-16 provides rock-solid viewport coordinates.
        // Hero pins precisely at top 64px with zero jump on load.
        // As user scrolls down, Section 2 (#sectors, z-20) glides up over Hero while
        // Hero card smoothly scales to 0.7 and fades to 0.
        // =========================================================================
        gsap.timeline({
          scrollTrigger: {
            trigger: heroSlide,
            start: "top 64px",
            endTrigger: sectorsSection,
            end: "top 64px",
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
          .fromTo(
            heroCardRef.current,
            { scale: 1, opacity: 1 },
            { scale: 0.7, opacity: 0, ease: "none" }
          );
      }

      // =========================================================================
      // 5. TAILORED GSAP SCROLL REVEAL ANIMATIONS FOR ALL SECTIONS
      // Respect user OS accessibility preference for reduced motion
      // =========================================================================
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // -------------------------------------------------------------------------
      // SECTION 1: #sectors (TRADE TABS & USE CASES)
      // Distinct Animation: 3D Perspective Card Tilt + Tab Blur Clear
      // -------------------------------------------------------------------------
      const sectorsHeader = document.querySelector("#sectors .sector-header-reveal");
      if (sectorsHeader) {
        gsap.fromTo(
          sectorsHeader,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectorsHeader,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      const sectorsTabs = document.querySelector("#sectors .sector-tabs-reveal");
      if (sectorsTabs) {
        gsap.fromTo(
          sectorsTabs,
          { scale: 0.94, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectorsTabs,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      const sectorsCard = document.querySelector("#sectors .sector-card-reveal");
      if (sectorsCard) {
        gsap.fromTo(
          sectorsCard,
          { y: 70, opacity: 0, rotationX: 6, transformPerspective: 1200 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectorsCard,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Stagger inner safeguards cards
        const innerSafeguards = sectorsCard.querySelectorAll(".sector-safeguard-card");
        if (innerSafeguards.length > 0) {
          gsap.fromTo(
            innerSafeguards,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: sectorsCard,
                start: "top 78%",
                once: true,
              },
            }
          );
        }
      }

      // -------------------------------------------------------------------------
      // SECTION 2: #protocol (THE 4-STAGE SAFETY PROTOCOL)
      // Distinct Animation: Cascading Domino Stagger with Rotation & Arc Button Pop
      // -------------------------------------------------------------------------
      const protocolHeader = document.querySelector("#protocol .protocol-header-reveal");
      if (protocolHeader) {
        gsap.fromTo(
          protocolHeader,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: protocolHeader,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // -------------------------------------------------------------------------
      // SECTION 3: #failsafes (IN-FIELD 5-LAYER DEFENSE MATRIX)
      // Distinct Animation: Split Kinetic Horizon (Left Glides From Left, Right Steps Cascade From Right)
      // -------------------------------------------------------------------------
      const failsafesLeft = document.querySelector("#failsafes .failsafes-left-reveal");
      if (failsafesLeft) {
        gsap.fromTo(
          failsafesLeft,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: failsafesLeft,
              start: "top 84%",
              once: true,
            },
          }
        );
      }

      const failsafesSteps = document.querySelectorAll("#failsafes .failsafe-step-reveal");
      if (failsafesSteps.length > 0) {
        gsap.fromTo(
          failsafesSteps,
          { x: 45, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#failsafes .failsafes-right-reveal",
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // -------------------------------------------------------------------------
      // SECTION 5: #pricing (SIMPLE, TRANSPARENT PRICING)
      // Distinct Animation: Symmetrical Tri-Fold Convergence (Left -> Center <- Right)
      // -------------------------------------------------------------------------
      const pricingHeader = document.querySelector("#pricing .pricing-header-reveal");
      if (pricingHeader) {
        gsap.fromTo(
          pricingHeader,
          { scale: 0.93, y: 30, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pricingHeader,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      const pricingControls = document.querySelector("#pricing .pricing-controls-reveal");
      if (pricingControls) {
        gsap.fromTo(
          pricingControls,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: pricingControls,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      const pricingCardBase = document.querySelector("#pricing .pricing-card-base");
      const pricingCardPro = document.querySelector("#pricing .pricing-card-pro");
      const pricingCardEnterprise = document.querySelector("#pricing .pricing-card-enterprise");

      if (pricingCardBase) {
        gsap.fromTo(
          pricingCardBase,
          { x: -40, y: 30, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#pricing .pricing-cards-container",
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      if (pricingCardPro) {
        gsap.fromTo(
          pricingCardPro,
          { y: 65, scale: 0.92, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.0,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: "#pricing .pricing-cards-container",
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      if (pricingCardEnterprise) {
        gsap.fromTo(
          pricingCardEnterprise,
          { x: 40, y: 30, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#pricing .pricing-cards-container",
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      const pricingAddons = document.querySelectorAll("#pricing .pricing-addon-reveal");
      if (pricingAddons.length > 0) {
        gsap.fromTo(
          pricingAddons,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#pricing .pricing-addons-container",
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // -------------------------------------------------------------------------
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      removeMouseListeners();
    };
  }, [activeTradeTab]);

  // Simulator ticking
  useEffect(() => {
    if (!simTimerRunning || simTriggerStatus === "safe_cleared") return;
    const interval = setInterval(() => {
      setSimTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [simTimerRunning, simTriggerStatus]);

  function formatSimTimer(secs) {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  }

  function handleTriggerDemoLink() {
    setSimVerificationState("sending");
    setTimeout(() => {
      setSimVerificationState("verified");
    }, 1100);
  }

  function handleResetSimulator() {
    setSimTriggerStatus("normal");
    setSimTimerSeconds(2052);
    setSimTimerRunning(true);
    setSimFakeBattery(false);
    setSimVerificationState("idle");
    setSimActiveTab("normal");
  }

  

  

  return (
    <div ref={pageContainerRef} className="min-h-screen bg-white text-[#111215] flex flex-col font-sans antialiased selection:bg-[#111215] selection:text-white pt-16 overflow-x-clip">
      {/* ========================================================================= */}
      {/* 1. CLEAN FLAT WHITE HEADER (SEPARATED FROM HERO, NO SHADOW/BORDER) */}
      {/* ========================================================================= */}
      <header
        onMouseLeave={() => setSectorsOpen(false)}
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-200 ${
          isScrolled ? "shadow-xs border-b border-slate-100" : "border-b border-slate-100/60"
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between gap-4">
          {/* Left: Real Checksafe Logo (Icon only on mobile, full text on tablet & desktop) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" aria-label="Checksafe Home" className="flex items-center hover:opacity-90 transition-opacity">
              <div className="sm:hidden">
                <CheckSafeIcon className="h-8 w-8" />
              </div>
              <div className="hidden sm:block">
                <CheckSafeLogo darkSurface={false} size="sm" />
              </div>
            </Link>
          </div>

          {/* Center: Clean Text Nav Links with Tight Underline & Wide Mega-Dropdown */}
          <nav className="hidden lg:flex items-center gap-1 lg:gap-2 xl:gap-3 text-[13px] font-semibold text-slate-600">
            {/* 1. Services with Wide Bar Dropdown */}
            <div
              className="relative h-16 flex items-center"
              onMouseEnter={() => setSectorsOpen(true)}
            >
              <a
                href="#sectors"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav("services");
                  setSectorsOpen((prev) => !prev);
                }}
                className={`relative h-16 flex items-center gap-1 px-3 transition-colors duration-200 cursor-pointer ${
                  activeNav === "services" || sectorsOpen
                    ? "text-[#0B2545] font-bold"
                    : "text-slate-600 hover:text-[#0B2545]"
                }`}
              >
                <span className="relative inline-block pb-0.5">
                  <span>Services</span>
                  {(activeNav === "services" || activeNav === "sectors") && (
                    <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)] animate-in fade-in zoom-in-95 duration-150" />
                  )}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    sectorsOpen ? "rotate-180 text-slate-900" : ""
                  }`}
                />
              </a>
            </div>

            {/* 2. How It Works */}
            <a
              href="#journey"
              onClick={() => {
                setActiveNav("journey");
                setSectorsOpen(false);
              }}
              className={`relative h-16 flex items-center px-3 transition-colors duration-200 cursor-pointer ${
                activeNav === "journey"
                  ? "text-[#0B2545] font-bold"
                  : "text-slate-600 hover:text-[#0B2545]"
              }`}
            >
              <span className="relative inline-block pb-0.5">
                <span>How It Works</span>
                {activeNav === "journey" && (
                  <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)] animate-in fade-in zoom-in-95 duration-150" />
                )}
              </span>
            </a>

            {/* 3. Safety Protocol */}
            <a
              href="#protocol"
              onClick={() => {
                setActiveNav("protocol");
                setSectorsOpen(false);
              }}
              className={`relative h-16 flex items-center px-3 transition-colors duration-200 cursor-pointer ${
                activeNav === "protocol"
                  ? "text-[#0B2545] font-bold"
                  : "text-slate-600 hover:text-[#0B2545]"
              }`}
            >
              <span className="relative inline-block pb-0.5">
                <span>Protocol</span>
                {activeNav === "protocol" && (
                  <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)] animate-in fade-in zoom-in-95 duration-150" />
                )}
              </span>
            </a>

            {/* 4. Zero-Trace Tech */}
            <a
              href="#architecture"
              onClick={() => {
                setActiveNav("architecture");
                setSectorsOpen(false);
              }}
              className={`relative h-16 flex items-center px-3 transition-colors duration-200 cursor-pointer ${
                activeNav === "architecture"
                  ? "text-[#0B2545] font-bold"
                  : "text-slate-600 hover:text-[#0B2545]"
              }`}
            >
              <span className="relative inline-block pb-0.5">
                <span>Zero-Trace Tech</span>
                {activeNav === "architecture" && (
                  <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)] animate-in fade-in zoom-in-95 duration-150" />
                )}
              </span>
            </a>

            {/* 5. Pricing */}
            <a
              href="#pricing"
              onClick={() => {
                setActiveNav("pricing");
                setSectorsOpen(false);
              }}
              className={`relative h-16 flex items-center px-3 transition-colors duration-200 cursor-pointer ${
                activeNav === "pricing"
                  ? "text-[#0B2545] font-bold"
                  : "text-slate-600 hover:text-[#0B2545]"
              }`}
            >
              <span className="relative inline-block pb-0.5">
                <span>Pricing</span>
                {activeNav === "pricing" && (
                  <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)] animate-in fade-in zoom-in-95 duration-150" />
                )}
              </span>
            </a>

            {/* 6. Compliance */}
            <Link
              href="/compliance"
              className="relative h-16 flex items-center px-3 text-slate-600 hover:text-[#0B2545] transition-colors duration-200"
            >
              <span>Compliance</span>
            </Link>

            

            {/* 8. Contact Us */}
            <Link
              href="/contact"
              className="relative h-16 flex items-center px-3 text-slate-600 hover:text-[#0B2545] transition-colors duration-200"
            >
              <span>Contact Us</span>
            </Link>

            {/* 9. Worker Console */}
            <Link
              href="/dashboard"
              className="relative h-16 hidden xl:flex items-center gap-1.5 px-3 text-slate-600 hover:text-[#0B2545] transition-colors duration-200"
            >
              <span>Worker Console</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                Live
              </span>
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Country Selector */}
            <div className="relative inline-flex items-center">
              <label htmlFor="country-select-checksafe" className="sr-only">
                Country
              </label>
              <select
                id="country-select-checksafe"
                value={country}
                aria-label="Select Operating Jurisdiction"
                onChange={(e) => setCountry(e.target.value)}
                className="appearance-none bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold rounded-full pl-3 pr-7 py-2 cursor-pointer focus:outline-hidden transition"
              >
                {COUNTRY_LIST.map((c) => (
                  <option key={c.code} value={c.code} className="text-slate-900 bg-white">
                    {COUNTRY_FLAGS[c.code]} {c.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>

            <Link
              href="/login"
              className="text-xs font-semibold text-slate-600 hover:text-[#0B2545] px-2 py-2 transition hidden sm:inline-block"
            >
              Sign in
            </Link>

            <Link
              href={`/signup?country=${country}`}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#0B2545] hover:bg-[#111827] text-white text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              <span>Start Protection</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00E08C]" />
            </Link>

            {/* Mobile & Tablet Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Full-Width Dropdown Bar */}
        {sectorsOpen && (
          <div
            onMouseEnter={() => setSectorsOpen(true)}
            onMouseLeave={() => setSectorsOpen(false)}
            className="absolute top-full left-0 right-0 w-full bg-white border-t border-slate-100 border-b border-slate-200/80 shadow-md z-50 animate-in fade-in slide-in-from-top-1 duration-150"
          >
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-7 sm:py-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-14">
                {/* Far Left: / products */}
                <div className="shrink-0 lg:w-44 pt-0.5">
                  <span className="text-xl font-medium text-slate-900 tracking-tight flex items-center">
                    <span className="text-slate-400 font-light mr-2">/</span>
                    <span>services</span>
                  </span>
                </div>

                {/* 4 Horizontal Columns image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 flex-1">
                  {NAV_SECTORS.map((item) => (
                    <a
                      key={item.id}
                      href="#sectors"
                      onClick={() => {
                        setActiveTradeTab(item.idx);
                        setActiveNav("services");
                        setSectorsOpen(false);
                      }}
                      className="group flex items-start gap-2.5 cursor-pointer"
                    >
                      {/* Exact sleek slanted lozenge/pebble mark */}
                      <span className="inline-block w-2.5 h-2.5 bg-black rounded-[2px] -rotate-12 mt-1 shrink-0 group-hover:bg-[#00E08C] transition-colors" />
                      <div>
                        <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#00E08C] transition-colors tracking-tight leading-tight">
                          {item.brandName}
                        </div>
                        <p className="text-[12px] text-slate-500 group-hover:text-slate-700 mt-1 leading-snug transition-colors">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile & Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-md px-5 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 shadow-lg">
            <a
              href="#journey"
              onClick={() => {
                setActiveNav("journey");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl transition ${
                activeNav === "journey"
                  ? "text-[#0B2545] font-bold bg-[#0B2545]/5 border-l-4 border-[#00E08C]"
                  : "font-semibold text-slate-700 hover:text-black hover:bg-slate-50"
              }`}
            >
              <Layers className="w-4 h-4 text-[#00E08C]" />
              <span>How It Works</span>
            </a>
            <a
              href="#sectors"
              onClick={() => {
                setActiveNav("sectors");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl transition ${
                activeNav === "sectors"
                  ? "text-[#0B2545] font-bold bg-[#0B2545]/5 border-l-4 border-[#00E08C]"
                  : "font-semibold text-slate-700 hover:text-black hover:bg-slate-50"
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#00E08C]" />
              <span>Sectors &amp; Use Cases</span>
            </a>
            <a
              href="#protocol"
              onClick={() => {
                setActiveNav("protocol");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl transition ${
                activeNav === "protocol"
                  ? "text-[#0B2545] font-bold bg-[#0B2545]/5 border-l-4 border-[#00E08C]"
                  : "font-semibold text-slate-700 hover:text-black hover:bg-slate-50"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#00E08C]" />
              <span>Safety Protocol</span>
            </a>
            <a
              href="#architecture"
              onClick={() => {
                setActiveNav("architecture");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl transition ${
                activeNav === "architecture"
                  ? "text-[#0B2545] font-bold bg-[#0B2545]/5 border-l-4 border-[#00E08C]"
                  : "font-semibold text-slate-700 hover:text-black hover:bg-slate-50"
              }`}
            >
              <Cpu className="w-4 h-4 text-[#00E08C]" />
              <span>Zero-Trace Technology</span>
            </a>
            <a
              href="#pricing"
              onClick={() => {
                setActiveNav("pricing");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl transition ${
                activeNav === "pricing"
                  ? "text-[#0B2545] font-bold bg-[#0B2545]/5 border-l-4 border-[#00E08C]"
                  : "font-semibold text-slate-700 hover:text-black hover:bg-slate-50"
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#00E08C]" />
              <span>Pricing Plans</span>
            </a>
            <Link
              href="/compliance"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 hover:text-black py-2 px-3 rounded-xl hover:bg-slate-50"
            >
              <ShieldCheck className="w-4 h-4 text-[#00E08C]" />
              <span>Safety Standards</span>
            </Link>
            
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 hover:text-black py-2 px-3 rounded-xl hover:bg-slate-50"
            >
              <PhoneCall className="w-4 h-4 text-[#00E08C]" />
              <span>Contact Us</span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-bold text-emerald-700 hover:text-emerald-800 py-2 px-3 rounded-xl hover:bg-slate-50"
            >
              <span className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                <span>Worker Console</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                Live
              </span>
            </Link>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-slate-700 hover:text-black px-2 py-2"
              >
                Sign in
              </Link>
              <Link
                href={`/signup?country=${country}`}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#0B2545] text-white text-xs font-bold"
              >
                <span>Start Protection</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#00E08C]" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 1. ROUNDED HERO CONTAINER (PINNED SLIDE 1) */}
      {/* ========================================================================= */}
      <section
        ref={heroSectionRef}
        className="slide-panel-hero w-full h-[75svh] sm:h-[calc(100vh-64px)] min-h-[430px] sm:min-h-[560px] max-h-[620px] sm:max-h-[920px] flex justify-center items-start overflow-hidden bg-white z-10 px-2.5 sm:px-3 lg:px-4 pt-1 pb-2"
      >
        <div className="w-full h-full flex items-start justify-center">
          {/* Large Rounded Hero Container Card: Flat, No Shadow, Dark Blue, Full Visibility */}
          <div
            ref={heroCardRef}
            className="w-full h-full relative rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden bg-[#0B2545] flex items-center justify-center sm:justify-start will-change-transform shadow-sm"
          >
            {/* Multi-layered Living Parallax Background Image */}
            <div
              ref={heroBgRef}
              className="absolute -inset-6 sm:-inset-16 pointer-events-none will-change-transform overflow-hidden"
            >
              <div
                ref={heroBgMouseRef}
                className="w-full h-full"
              >
                <div
                  ref={heroBgInnerRef}
                  className="w-full h-full bg-cover bg-[72%_center] sm:bg-right lg:bg-[center_right_-2rem] scale-110"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=75')",
                  }}
                />
              </div>
            </div>

            {/* Living Ambient Atmospheric Radial Glow */}
            <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#00E08C]/10 blur-[100px] pointer-events-none" />

            {/* 50% Visible / 50% Transparent Gradient Mask (Matches Desktop Split on All Screens) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/90 via-[#0B2545]/50 to-transparent w-full lg:w-[65%] pointer-events-none" />

            {/* Left Column (Centered on Mobile): Clean Atmospheric Headline & Prose */}
            <div
              ref={heroContentRef}
              className="relative z-10 w-full px-5 py-6 sm:p-10 lg:p-14 xl:p-16 flex flex-col items-center text-center sm:items-start sm:text-left justify-center max-w-2xl text-white"
            >
              {/* Mobile Compact Status Pill */}
              <div className="sm:hidden mb-3.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E08C]/15 border border-[#00E08C]/35 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C] animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00E08C]">
                  UK Lone-Worker Sentinel
                </span>
              </div>

              <h1
                ref={heroTitleRef}
                className="text-4xl leading-[1.06] sm:text-5xl lg:text-[68px] font-extrabold tracking-tight text-white sm:leading-[1.08]"
              >
                Protecting Your
                <br />
                Next Meeting.
              </h1>

              <p
                ref={heroSubtitleRef}
                className="mt-3.5 sm:mt-5 text-sm sm:text-base lg:text-lg text-white/90 max-w-md sm:max-w-lg leading-relaxed font-normal"
              >
                Where Solo Workers Meet Clients with Absolute Peace of Mind. Bank-grade biometric KYC before you meet, ghost proxy numbers, and automated cloud timers.
              </p>

              {/* Dual Buttons - Centered side-by-side on mobile, larger pills on desktop */}
              <div
                ref={heroButtonsRef}
                className="mt-6 sm:mt-10 w-full sm:w-auto grid grid-cols-2 sm:flex sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-4"
              >
                <Link
                  href={`/signup?country=${country}`}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white text-[#111827] hover:bg-slate-100 text-[13px] sm:text-base font-bold transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>Start Protection</span>
                  <ArrowUpRight className="w-4 h-4 text-[#111827] shrink-0" />
                </Link>

                <a
                  href="#interactive-demo"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-3.5 sm:py-4 rounded-full bg-[#00E08C] hover:bg-[#00f298] text-[#0B2545] text-[13px] sm:text-base font-bold transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <span className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#0B2545]/15 text-[#0B2545] flex items-center justify-center text-[9px] sm:text-[10px] shrink-0">
                    ▶
                  </span>
                  <span>Live Simulator</span>
                </a>
              </div>

              {/* Mobile Inline Rating Badge (< 640px) */}
              <div className="sm:hidden mt-5 inline-flex items-center justify-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=75"
                    alt="Worker"
                    width={22}
                    height={22}
                    loading="lazy"
                    decoding="async"
                    className="inline-block h-5.5 w-5.5 rounded-full ring-1 ring-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=75"
                    alt="Worker"
                    width={22}
                    height={22}
                    loading="lazy"
                    decoding="async"
                    className="inline-block h-5.5 w-5.5 rounded-full ring-1 ring-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=75"
                    alt="Worker"
                    width={22}
                    height={22}
                    loading="lazy"
                    decoding="async"
                    className="inline-block h-5.5 w-5.5 rounded-full ring-1 ring-white object-cover"
                  />
                </div>
                <div className="text-[11px] font-bold text-white leading-tight">
                  <span>Zero-Install PWA</span>
                  <span className="text-[#00E08C] ml-1.5">• Lone Worker Protection</span>
                </div>
              </div>
            </div>

            {/* Bottom-Right Inset Notch (Desktop & Tablet >= 640px) */}
            <div
              ref={heroNotchRef}
              className="hidden sm:flex absolute bottom-0 right-0 bg-white rounded-tl-[32px] sm:rounded-tl-[44px] pt-4 pl-6 pb-3 pr-6 sm:pt-5 sm:pl-8 sm:pb-4 sm:pr-8 items-center gap-3.5 z-20"
            >
              {/* Top Concave Fillet */}
              <svg
                className="absolute -top-7 right-0 w-7 h-7 text-white fill-current pointer-events-none"
                viewBox="0 0 28 28"
                aria-hidden="true"
              >
                <path d="M0 28 Q 28 28 28 0 L 28 28 Z" />
              </svg>

              {/* Left Concave Fillet */}
              <svg
                className="absolute -left-7 bottom-0 w-7 h-7 text-white fill-current pointer-events-none"
                viewBox="0 0 28 28"
                aria-hidden="true"
              >
                <path d="M0 28 Q 28 28 28 0 L 28 28 Z" />
              </svg>

              {/* Overlapping Real Worker Face Avatars */}
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=75"
                  alt="Prime Residential Partner"
                  width={36}
                  height={36}
                  decoding="async"
                  className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=75"
                  alt="Clinical Psychologist"
                  width={36}
                  height={36}
                  decoding="async"
                  className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=75"
                  alt="Structural Site Surveyor"
                  width={36}
                  height={36}
                  decoding="async"
                  className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=75"
                  alt="Independent Consultant"
                  width={36}
                  height={36}
                  decoding="async"
                  className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover"
                />
              </div>

              {/* Rating & Stats */}
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-[#111827]">
                  Lone Worker Protection
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#00E08C] animate-pulse" />
                  <span>Independent UK Lone-Worker Sentinel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRADE TABS & USE CASES (SECTION 2 - SLIDES OVER HERO, THEN NORMAL FLOW) */}
      {/* ========================================================================= */}
      <section
        id="sectors"
        className="relative z-20 pt-6 sm:pt-8 pb-8 sm:pb-10 bg-white scroll-mt-14"
      >
        <div className="w-[96%] max-w-[1800px] mx-auto px-2 sm:px-4">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-8 sector-header-reveal">
            <div className="max-w-2xl">
              {/* Badge with Solid Circle Icon */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B2545]/5 border border-[#0B2545]/20 text-[#0B2545] text-xs font-extrabold tracking-wider uppercase mb-4 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#00E08C] animate-pulse" />
                </div>
                <span>Trade Use Cases &amp; Sectors</span>
              </div>
              {/* Bold Uppercase Heading in Dark Blue & Black */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight uppercase leading-[1.08]">
                Engineered For<br />
                <span className="text-[#111827]">High-Consequence Lone Work.</span>
              </h2>
            </div>

            {/* Right Aligned Descriptive Text Block */}
            <div className="max-w-md xl:max-w-lg lg:pb-1">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                <span className="font-bold text-[#111827]">Specialized threat architectures:</span> Four custom operational configurations designed around the unique threat models of solo visits—from unaccompanied estate viewings to clinical home visits.
              </p>
            </div>
          </div>

          {/* Segmented Controller Tab Bar (4 Tabs) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-slate-100/90 border border-slate-200/80 mb-8 sm:mb-10 sector-tabs-reveal">
            {TRADE_USE_CASES.map((trade, idx) => {
              const Icon = trade.icon;
              const isActive = activeTradeTab === idx;
              return (
                <button
                  key={trade.id}
                  type="button"
                  onClick={() => setActiveTradeTab(idx)}
                  className={`flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer text-left ${isActive
                    ? "bg-[#0B2545] text-white shadow-md scale-[1.01]"
                    : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                >
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs shrink-0 transition ${isActive
                      ? "bg-[#00E08C] text-[#0B2545]"
                      : "bg-slate-200/80 text-slate-600"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                  <div className="truncate">
                    <div className="leading-tight truncate flex items-center gap-1.5">
                      <span>{trade.tabLabel}</span>
                    </div>
                    <div
                      className={`hidden xl:block text-[10px] font-normal truncate mt-0.5 ${isActive ? "text-slate-300" : "text-slate-500"
                        }`}
                    >
                      {trade.tabSubtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Master Showcase Card (Hero Impression: Full BG Photography, Dark Navy Glass Gradient, Split Layout) */}
          <div className="relative rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden text-white border border-slate-200/40 shadow-2xl p-6 sm:p-9 lg:p-12 xl:p-14 min-h-[580px] sm:min-h-[640px] lg:min-h-[660px] flex flex-col justify-between sector-card-reveal">
            {/* Full High-Resolution Background Photography */}
            {/* Full High-Resolution Background Photography with Smooth Crossfade */}
            {TRADE_USE_CASES.map((trade, idx) => (
              <div
                key={trade.id}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-out scale-[1.02] ${
                  activeTradeTab === idx ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{ backgroundImage: `url('${trade.bgImage}')` }}
              />
            ))}
            {/* Multi-stage High-Contrast Dark Navy / Charcoal Glass Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07192F]/98 via-[#0B2545]/92 to-[#040D1A]/85 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0B2545]/40 to-black/60 pointer-events-none" />
            {/* Ambient Green Security Glow */}
            <div className="absolute top-1/3 -right-16 w-[400px] h-[400px] rounded-full bg-[#00E08C]/15 blur-[120px] pointer-events-none" />

            {/* Showcase Card Content */}
            <div key={activeTradeTab} className="animate-tab-content relative z-10 w-full space-y-5 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C] animate-pulse" />
                  {currentTrade.badge}
                </span>
              </div>

              <div className="max-w-3xl">
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#00E08C] font-mono flex items-center gap-2 mb-1.5">
                  <span>{currentTrade.emoji}</span>
                  <span>{currentTrade.tabSubtitle}</span>
                </div>
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.14]">
                  {currentTrade.headline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200/95 leading-relaxed mt-2.5 font-normal">
                  {currentTrade.hazardContext}
                </p>
              </div>

              {/* 3 Key Safeguards in Glass Grid - Full Width & Substantial Presence */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 xl:gap-7 pt-2 w-full">
                {currentTrade.safeguards.map((item, sIdx) => (
                  <div
                    key={sIdx}
                    style={{ animationDelay: `${sIdx * 65 + 60}ms` }}
                    className="animate-safeguard-card p-6 sm:p-7 lg:p-8 min-h-[190px] sm:min-h-[210px] lg:min-h-[230px] rounded-2xl sm:rounded-3xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 backdrop-blur-md transition-all duration-200 flex flex-col justify-between group shadow-md hover:border-[#00E08C]/50 hover:shadow-lg sector-safeguard-card"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00E08C] text-[#0B2545] font-black flex items-center justify-center text-xs sm:text-sm shadow-sm group-hover:scale-105 transition-transform">
                          0{sIdx + 1}
                        </div>
                        {item.codeBadge && (
                          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-white/10 text-[#00E08C] border border-[#00E08C]/40 backdrop-blur-sm">
                            {item.codeBadge}
                          </span>
                        )}
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#00E08C] transition-colors">
                        {item.title}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed mt-2.5 font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Compliance Strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] sm:text-xs text-slate-300/85 font-mono pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C] animate-pulse" />
                  <span>Fail-Safe Cloud Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C]" />
                  <span>Zero-Knowledge Confidentiality</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C]" />
                  <span>Emergency Relay &lt; 3s</span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="pt-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <Link
                  href={`/signup?country=${country}&trade=${currentTrade.id}`}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-[#00E08C] hover:bg-[#00f298] text-[#0B2545] font-bold text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
                >
                  <span>Start Protection for {currentTrade.tabLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0B2545]" />
                </Link>

                <a
                  href="#interactive-demo"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition border border-white/20 backdrop-blur-md cursor-pointer"
                >
                  <span className="text-[#00E08C]">▶</span>
                  <span>Test in Live Simulator</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 4-STAGE SAFETY PROTOCOL */}
      {/* ========================================================================= */}
      <section
        id="protocol"
        className="section-defer pt-8 sm:pt-10 pb-16 sm:pb-24 bg-white scroll-mt-20 relative z-20"
      >
        {/* Navigation Anchor Aliases for seamless in-page links */}
        <div id="journey" className="absolute -top-20 left-0 pointer-events-none" />
        <div id="interactive-demo" className="absolute -top-20 left-0 pointer-events-none" />

        <div className="w-[96%] max-w-[1800px] mx-auto px-2 sm:px-4">
          {/* Master 4-Stage Stepper Container (Flat Clean Layout - No Section Rounded / No Shadow) */}
          <div className="relative bg-white pt-0 pb-4 sm:pb-6">

            {/* Container Header */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-14 protocol-header-reveal">
              <div className="max-w-2xl">
                {/* Badge with Solid Circle Icon */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B2545]/5 border border-[#0B2545]/20 text-[#0B2545] text-xs font-extrabold tracking-wider uppercase mb-4 shadow-2xs">
                  <div className="w-5 h-5 rounded-full bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#00E08C] stroke-[3]" />
                  </div>
                  <span>End-to-End Operational Lifecycle</span>
                </div>
                {/* Bold Uppercase Heading in Dark Blue & Black */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight uppercase leading-[1.08]">
                  The 4-Stage<br />
                  <span className="text-[#111827]">Safety Protocol.</span>
                </h2>
              </div>

              {/* Right Aligned Descriptive Text Block */}
              <div className="max-w-md xl:max-w-lg lg:pb-1">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  <span className="font-bold text-[#111827]">Zero data stored, zero personal SIM exposure:</span> From initial client clearance to post-visit departure, certified cloud emergency escalation protects your identity and coordinates at every phase.
                </p>
              </div>
            </div>

            {/* Inset-Notched Cards with Blue-Black Gradient and Brand Green Circles (Zero Card Border) */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 protocol-cards-grid">
              {/* Card 01 */}
              <div className="relative bg-gradient-to-b from-[#0B2545] via-[#07192F] to-[#02060D] rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 min-h-[290px] sm:min-h-[310px] text-white flex flex-col justify-end overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 protocol-card-reveal">
                {/* Generous Scooped Inset Notch Hugging the Floating Circle */}
                <div className="absolute top-0 right-0 bg-white rounded-bl-[32px] w-20 h-20 flex items-center justify-center z-10">
                  {/* Left Concave Fillet */}
                  <svg
                    className="absolute -left-7 top-0 w-7 h-7 text-white fill-current pointer-events-none"
                    viewBox="0 0 28 28"
                  >
                    <path d="M0 0 L28 0 L28 28 C28 12.54 15.46 0 0 0 Z" />
                  </svg>

                  {/* Bottom Concave Fillet */}
                  <svg
                    className="absolute right-0 -bottom-7 w-7 h-7 text-white fill-current pointer-events-none"
                    viewBox="0 0 28 28"
                  >
                    <path d="M28 28 L28 0 L0 0 C12.54 0 28 15.46 28 28 Z" />
                  </svg>

                  {/* Circular Button in Vibrant Brand Green with Dark Navy Arrow */}
                  <div className="w-11 h-11 rounded-full bg-[#00E08C] hover:bg-[#00f298] text-[#0B2545] flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110 cursor-pointer protocol-notch-btn">
                    <ArrowDownLeft className="w-5 h-5 text-[#0B2545]" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-snug">
                    Single-Use ID Clearance
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed mt-2.5 font-normal">
                    Client verifies via automated 3D selfie & biometric ID scan before keys or doors unlock. Raw documents and selfies shredded in 60s.
                  </p>
                  <div className="mt-3.5 pt-2.5 flex items-center gap-1.5 text-[11px] font-mono text-[#00E08C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C]" />
                    <span>Veriff API · HMAC-SHA256</span>
                  </div>
                </div>
              </div>

              {/* Card 02 */}
              <div className="relative bg-gradient-to-b from-[#0B2545] via-[#07192F] to-[#02060D] rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 min-h-[290px] sm:min-h-[310px] text-white flex flex-col justify-end overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 protocol-card-reveal">
                {/* Generous Scooped Inset Notch */}
                <div className="absolute top-0 right-0 bg-white rounded-bl-[32px] w-20 h-20 flex items-center justify-center z-10">
                  <svg
                    className="absolute -left-7 top-0 w-7 h-7 text-white fill-current pointer-events-none"
                    viewBox="0 0 28 28"
                  >
                    <path d="M0 0 L28 0 L28 28 C28 12.54 15.46 0 0 0 Z" />
                  </svg>
                  <svg
                    className="absolute right-0 -bottom-7 w-7 h-7 text-white fill-current pointer-events-none"
                    viewBox="0 0 28 28"
                  >
                    <path d="M28 28 L28 0 L0 0 C12.54 0 28 15.46 28 28 Z" />
                  </svg>
                  <div className="w-11 h-11 rounded-full bg-[#00E08C] hover:bg-[#00f298] text-[#0B2545] flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110 cursor-pointer protocol-notch-btn">
                    <ArrowDownLeft className="w-5 h-5 text-[#0B2545]" />
                  </div>
                </div>

                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-snug">
                    Ghost Proxy Line
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed mt-2.5 font-normal">
                    All calls and SMS route through dedicated virtual Twilio proxy numbers. Your personal mobile number and private WhatsApp stay hidden.
                  </p>
                  <div className="mt-3.5 pt-2.5 flex items-center gap-1.5 text-[11px] font-mono text-[#00E08C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C]" />
                    <span>Twilio Proxy · Auto-Wiped Vault</span>
                  </div>
                </div>
              </div>

              {/* Card 03 */}
              <div className="relative bg-gradient-to-b from-[#0B2545] via-[#07192F] to-[#02060D] rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 min-h-[290px] sm:min-h-[310px] text-white flex flex-col justify-end overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 protocol-card-reveal">
                {/* Generous Scooped Inset Notch */}
                <div className="absolute top-0 right-0 bg-white rounded-bl-[32px] w-20 h-20 flex items-center justify-center z-10">
                  <svg
                    className="absolute -left-7 top-0 w-7 h-7 text-white fill-current pointer-events-none"
                    viewBox="0 0 28 28"
                  >
                    <path d="M0 0 L28 0 L28 28 C28 12.54 15.46 0 0 0 Z" />
                  </svg>
                  <svg
                    className="absolute right-0 -bottom-7 w-7 h-7 text-white fill-current pointer-events-none"
                    viewBox="0 0 28 28"
                  >
                    <path d="M28 28 L28 0 L0 0 C12.54 0 28 15.46 28 28 Z" />
                  </svg>
                  <div className="w-11 h-11 rounded-full bg-[#00E08C] hover:bg-[#00f298] text-[#0B2545] flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110 cursor-pointer protocol-notch-btn">
                    <ArrowDownLeft className="w-5 h-5 text-[#0B2545]" />
                  </div>
                </div>

                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-snug">
                    Cloud Safety Countdown
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed mt-2.5 font-normal">
                    30-minute to 4-hour countdown executes in the London cloud (eu-west-2) with backup checks. Runs even if your device dies or drops signal.
                  </p>
                  <div className="mt-3.5 pt-2.5 flex items-center gap-1.5 text-[11px] font-mono text-[#00E08C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C]" />
                    <span>AWS eu-west-2 · 1-Min Fail-Safe</span>
                  </div>
                </div>
              </div>

              {/* Card 04 */}
              <div className="relative bg-gradient-to-b from-[#0B2545] via-[#07192F] to-[#02060D] rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 min-h-[290px] sm:min-h-[310px] text-white flex flex-col justify-end overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 protocol-card-reveal">
                {/* Generous Scooped Inset Notch */}
                <div className="absolute top-0 right-0 bg-white rounded-bl-[32px] w-20 h-20 flex items-center justify-center z-10">
                  <svg
                    className="absolute -left-7 top-0 w-7 h-7 text-white fill-current pointer-events-none"
                    viewBox="0 0 28 28"
                  >
                    <path d="M0 0 L28 0 L28 28 C28 12.54 15.46 0 0 0 Z" />
                  </svg>
                  <svg
                    className="absolute right-0 -bottom-7 w-7 h-7 text-white fill-current pointer-events-none"
                    viewBox="0 0 28 28"
                  >
                    <path d="M28 28 L28 0 L0 0 C12.54 0 28 15.46 28 28 Z" />
                  </svg>
                  <div className="w-11 h-11 rounded-full bg-[#00E08C] hover:bg-[#00f298] text-[#0B2545] flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110 cursor-pointer protocol-notch-btn">
                    <ArrowDownLeft className="w-5 h-5 text-[#0B2545]" />
                  </div>
                </div>

                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-snug">
                    2-Stage Escalation & Duress
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed mt-2.5 font-normal">
                    5-minute private vibration grace warning upon timer lapse before SMS dispatch with GPS address. Custom secret Duress Code triggers dispatch instantly.
                  </p>
                  <div className="mt-3.5 pt-2.5 flex items-center gap-1.5 text-[11px] font-mono text-[#00E08C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C]" />
                    <span>Custom Duress Code Handoff</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. IN-FIELD 5-LAYER DEFENSE MATRIX (DEVELOPER SCOPE §4, §5.3, §5.4, §6.2, §6.4) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 5. IN-FIELD 5-LAYER DEFENSE MATRIX (HOW CHECKSAFE PROTECTS WHEN YOU CANNOT SPEAK) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 5. IN-FIELD 5-LAYER DEFENSE MATRIX (HOW CHECKSAFE PROTECTS WHEN YOU CANNOT SPEAK) */}
      {/* ========================================================================= */}
      <section id="failsafes" className="py-20 sm:py-28 bg-[#F8FAFC] scroll-mt-20 border-t border-slate-200/60 relative">
        {/* Navigation Anchor Aliases */}
        <div id="architecture" className="absolute -top-20 left-0 pointer-events-none" />
        <div className="w-[96%] max-w-[1800px] mx-auto px-2 sm:px-4">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-stretch">

            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN: Sticky Anchor & Strategic Overview (Pins Across All 5 Cards) */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="failsafes-left-reveal space-y-6">
              {/* Badge with Solid Circle Icon style */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B2545]/5 border border-[#0B2545]/20 text-[#0B2545] text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                  <Shield className="w-3 h-3 text-[#00E08C]" />
                </div>
                <span>5-Layer Solo Worker Defense</span>
              </div>

              {/* Bold Uppercase Heading in Dark Blue & Black */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight uppercase leading-[1.08]">
                How Checksafe<br />Protects When You<br />
                <span className="text-[#111827]">Cannot Speak.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                <span className="font-bold text-[#111827]">Zero-compromise covert defense:</span> Aggressors demand compliance and watch phones closely. Checksafe replaces loud panic alarms with deceptive covert decoys, zero-internet GSM failovers, and zero-knowledge cryptographic vaults engineered to UK lone-worker safeguarding principles.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/signup?country=${country}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#0B2545] hover:bg-[#07192F] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Start Protection</span>
                  <ArrowRight className="w-4 h-4 text-[#00E08C]" />
                </Link>

                <a
                  href="#interactive-demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition shadow-2xs"
                >
                  <span>Interactive Simulator</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              {/* Verified Architecture Micro-Badges */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>London eu-west-2 AWS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Fail-Safe Protocol</span>
                </div>
                <div className="flex items-center gap-2">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  <span>HMAC-SHA256 Vault</span>
                </div>
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-purple-600" />
                  <span>1-Bar GSM Fallback</span>
                </div>
              </div>
            </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: All 5 Connected Cards Open in Natural Document Flow   */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-7 relative failsafes-right-reveal">
              {/* Top Micro-Header for the 5-Layer Stack */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-2.5 mb-6 border-b border-slate-200/80">
                <span className="font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C] animate-pulse" />
                  <span>5-Layer Connected Safeguards Architecture</span>
                </span>
                <span className="text-slate-400">All 5 layers continuously active</span>
              </div>

              {/* Connected 5-Layer Stack - All Cards Open & Natural Document Flow */}
              <div
                id="failsafes-scroll-container"
                className="space-y-6 sm:space-y-8 relative"
              >
                {/* ------------------------------------------------------------- */}
                {/* LAYER 01: TRIPLE-TAP FAKE LOW-BATTERY SCREEN                   */}
                {/* ------------------------------------------------------------- */}
                <div id="failsafe-step-0" className="relative flex items-start gap-3.5 sm:gap-4 group scroll-mt-28 failsafe-step-reveal">
                  {/* Continuous Vertical Connecting Line to Step 02 */}
                  <div className="block absolute left-[17px] sm:left-[19px] top-6 -bottom-8 w-[2px] bg-slate-200/90 pointer-events-none z-0" />

                  {/* Step Node */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full font-mono text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 z-10 bg-[#0B2545] text-[#00E08C] ring-4 ring-emerald-400/20 shadow-md border border-[#00E08C]/40">
                    01
                  </div>

                  <div className="flex-1 rounded-2xl sm:rounded-3xl bg-[#0B2545] text-white p-5 sm:p-7 shadow-xl border border-[#0B2545] ring-2 ring-[#00E08C]/30 transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 pr-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 border border-amber-400/40 text-amber-300">
                            Scope §5.3 · Covert Screen Disguise
                          </span>
                          <h3 className="text-base sm:text-lg font-black tracking-wide text-white uppercase leading-snug">
                            Triple-Tap Fake Low-Battery Screen
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed">
                            Triple-tap anywhere on the top-left of your screen to immediately show a full-screen, pitch-black &ldquo;1% Low Battery&rdquo; shutdown graphic. Aggressors believe your device powered down, while your countdown keeps executing independently on our London AWS cloud servers.
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#00E08C] text-[#0B2545] flex items-center justify-center shrink-0 shadow-md">
                          <BatteryCharging className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Active Expanded Simulation Widget */}
                      <div className="mt-5 pt-4 border-t border-white/10 space-y-3.5">
                        <div className="rounded-2xl bg-[#030712] border border-slate-800 p-4 sm:p-5 relative overflow-hidden shadow-2xl">
                          {/* Top Status Bar with Dynamic Island */}
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-3 mb-2 border-b border-slate-800/80">
                            <span className="font-bold text-slate-300">09:41</span>
                            <div className="w-16 h-3 bg-slate-900 rounded-full border border-slate-800" />
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <span className="text-[10px]">5G</span>
                              <span className="w-3.5 h-2 rounded-xs border border-rose-500/80 flex items-center p-0.5">
                                <span className="h-full w-0.5 bg-rose-500 rounded-2xs" />
                              </span>
                            </div>
                          </div>

                          {failsafeBlackout ? (
                            <div
                              onClick={() => setFailsafeBlackout(false)}
                              className="py-6 sm:py-8 flex flex-col items-center justify-center text-center cursor-pointer select-none rounded-xl bg-black border border-slate-900 transition-all hover:border-slate-800 group"
                            >
                              <div className="w-10 h-16 rounded-xl border-2 border-rose-600/70 p-1 flex flex-col justify-end items-center mb-3 group-hover:scale-105 transition-transform">
                                <div className="w-full h-1.5 bg-rose-500 rounded-xs animate-pulse" />
                              </div>
                              <div className="text-xs font-mono font-bold text-slate-300 tracking-wide">
                                Device Display Powered Down
                              </div>
                              <div className="mt-2 text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1.5 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>London AWS Sentinel Running (34:12)</span>
                              </div>
                              <span className="mt-3 text-[10px] text-slate-500 underline decoration-slate-700 group-hover:text-slate-300 transition">
                                Tap anywhere to wake simulator
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-4 py-1">
                              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 flex flex-col items-center text-center shadow-lg">
                                <div className="w-10 h-10 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-2">
                                  <BatteryCharging className="w-5 h-5 animate-pulse" />
                                </div>
                                <div className="text-sm font-bold text-white">
                                  Low Battery (1% Remaining)
                                </div>
                                <p className="text-[11px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                                  Device will enter emergency shutdown. Checksafe cloud timer persists independently on London eu-west-2 servers.
                                </p>

                                <div className="w-full mt-3.5 space-y-1.5">
                                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                    <span>Battery Cell Level</span>
                                    <span className="text-rose-400 font-bold">1% Critical</span>
                                  </div>
                                  <div className="grid grid-cols-10 gap-1 h-2 bg-black p-0.5 rounded-md border border-slate-800">
                                    <div className="bg-rose-500 rounded-xs animate-pulse" />
                                    {[...Array(9)].map((_, i) => (
                                      <div key={i} className="bg-slate-800/60 rounded-xs" />
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFailsafeBlackout(true);
                                }}
                                className="w-full py-2.5 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>Simulate Covert Blackout Screen</span>
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-300">
                          <span>Activation: 3 Quick Taps</span>
                          <span className="text-[#00E08C] font-bold">AWS eu-west-2 Persistence ✓</span>
                        </div>
                      </div>
                    </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* LAYER 02: CUSTOM SECRET DURESS CODE & DECOY RESOLUTION        */}
                {/* ------------------------------------------------------------- */}
                <div id="failsafe-step-1" className="relative flex items-start gap-3.5 sm:gap-4 group scroll-mt-28 failsafe-step-reveal">
                  {/* Continuous Vertical Connecting Line to Step 03 */}
                  <div className="block absolute left-[17px] sm:left-[19px] top-6 -bottom-8 w-[2px] bg-slate-200/90 pointer-events-none z-0" />

                  {/* Step Node */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full font-mono text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 z-10 bg-[#0B2545] text-[#00E08C] ring-4 ring-emerald-400/20 shadow-md border border-[#00E08C]/40">
                    02
                  </div>

                  <div className="flex-1 rounded-2xl sm:rounded-3xl bg-[#0B2545] text-white p-5 sm:p-7 shadow-xl border border-[#0B2545] ring-2 ring-[#00E08C]/30 transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 pr-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-400/20 border border-rose-400/40 text-rose-300">
                            Scope §5.3 & §6.2 · Decoy Resolution
                          </span>
                          <h3 className="text-base sm:text-lg font-black tracking-wide text-white uppercase leading-snug">
                            Custom Secret Duress Code & Decoy
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed">
                            If an aggressor forces you to unlock your phone and cancel your safety alarm, enter your custom secret Duress Code. The app immediately displays an innocent &ldquo;Session Closed Safely&rdquo; screen to calm hostility, while silently broadcasting emergency coordinates to on-call peers.
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#00E08C] text-[#0B2545] flex items-center justify-center shrink-0 shadow-md">
                          <KeyRound className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Active Expanded Simulation Widget */}
                      <div className="mt-5 pt-4 border-t border-white/10 space-y-3.5">
                        <div className="rounded-2xl bg-[#030712] border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-3.5">
                          {/* Top Segmented Mode Switcher & PIN Display */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDuressDemoTab("peaceful");
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                                  duressDemoTab === "peaceful"
                                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                                    : "text-slate-400 hover:text-white"
                                }`}
                              >
                                <span>👁️ Aggressor View</span>
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDuressDemoTab("dispatch");
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                                  duressDemoTab === "dispatch"
                                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                                    : "text-slate-400 hover:text-white"
                                }`}
                              >
                                <span>🚨 Police GPS Pack</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Secret Duress Code:</span>
                              <div className="flex items-center gap-1">
                                {["4", "1", "8", "2"].map((digit, i) => (
                                  <span
                                    key={i}
                                    className="w-6 h-6 rounded-md bg-rose-500/20 border border-rose-500/50 text-rose-300 font-mono text-xs font-black flex items-center justify-center shadow-xs"
                                  >
                                    {digit}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Dual Reality Live Card Preview */}
                          {duressDemoTab === "peaceful" ? (
                            <div className="rounded-xl bg-gradient-to-br from-emerald-950/70 via-[#062419] to-slate-950 border border-emerald-500/40 p-4 sm:p-5 text-white space-y-3.5 shadow-lg">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-[#00E08C] flex items-center justify-center shrink-0">
                                    <Check className="w-5 h-5 stroke-[3]" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-white flex items-center gap-2">
                                      <span>Session Closed Safely</span>
                                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">14:32 GMT</span>
                                    </div>
                                    <div className="text-xs text-emerald-200/80 mt-0.5 font-normal">
                                      Appointment checked out. Client verified with zero incident flags.
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="p-3 rounded-lg bg-black/40 border border-emerald-900/40 text-[11px] text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
                                <span className="text-emerald-400">✓ On-screen status: Completely Calm</span>
                                <span className="text-slate-400">Receipt Ref: #CS-8921-OK</span>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-xl bg-gradient-to-br from-rose-950/80 via-[#260A0E] to-slate-950 border border-rose-500/50 p-4 sm:p-5 text-white space-y-3.5 shadow-lg">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/60 text-rose-400 flex items-center justify-center shrink-0 animate-pulse">
                                    <AlertTriangle className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-white flex items-center gap-2">
                                      <span>Silent Emergency Broadcast Fired</span>
                                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold">PRIORITY 1</span>
                                    </div>
                                    <div className="text-xs text-rose-200/90 mt-0.5 font-normal">
                                      GPS coordinate telemetry and rolling microphone packets relayed to peer network.
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                                <div className="p-2.5 rounded-lg bg-black/40 border border-rose-900/40 text-slate-300">
                                  <div className="text-slate-400 text-[10px]">LIVE GPS LOCATION</div>
                                  <div className="text-rose-400 font-bold mt-0.5">51.5074° N, 0.1278° W (±3m)</div>
                                </div>
                                <div className="p-2.5 rounded-lg bg-black/40 border border-rose-900/40 text-slate-300">
                                  <div className="text-slate-400 text-[10px]">ON-CALL RECIPIENTS</div>
                                  <div className="text-emerald-400 font-bold mt-0.5">3 Peers + 999 Police Pack</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-300">
                          <span>Display: Peaceful Exit Screen</span>
                          <span className="text-rose-400 font-bold">Silent Emergency Broadcast ✓</span>
                        </div>
                      </div>
                    </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* LAYER 03: 1-BAR CELLULAR GSM SATELLITE RELAY                  */}
                {/* ------------------------------------------------------------- */}
                <div id="failsafe-step-2" className="relative flex items-start gap-3.5 sm:gap-4 group scroll-mt-28 failsafe-step-reveal">
                  {/* Continuous Vertical Connecting Line to Step 04 */}
                  <div className="block absolute left-[17px] sm:left-[19px] top-6 -bottom-8 w-[2px] bg-slate-200/90 pointer-events-none z-0" />

                  {/* Step Node */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full font-mono text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 z-10 bg-[#0B2545] text-[#00E08C] ring-4 ring-emerald-400/20 shadow-md border border-[#00E08C]/40">
                    03
                  </div>

                  <div className="flex-1 rounded-2xl sm:rounded-3xl bg-[#0B2545] text-white p-5 sm:p-7 shadow-xl border border-[#0B2545] ring-2 ring-[#00E08C]/30 transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 pr-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-400/20 border border-blue-400/40 text-blue-300">
                            Scope §5.4 & §6.4 · Zero-Internet Failover
                          </span>
                          <h3 className="text-base sm:text-lg font-black tracking-wide text-white uppercase leading-snug">
                            1-Bar Cellular SMS Fallback & SOS
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed">
                            Operating in basements, rural estates, or thick concrete with zero 4G/5G data signal? Checksafe executes across standard GSM 2G voice & SMS networks. A single text &ldquo;SOS&rdquo; to your virtual proxy line or an unbranded home-screen panic link immediately fires emergency dispatch without requiring login.
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#00E08C] text-[#0B2545] flex items-center justify-center shrink-0 shadow-md">
                          <Radio className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Active Expanded Simulation Widget */}
                      <div className="mt-5 pt-4 border-t border-white/10 space-y-3.5">
                        <div className="rounded-2xl bg-[#030712] border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-3">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2.5 border-b border-slate-800/80">
                            <div className="flex items-center gap-2 text-blue-300">
                              <span className="text-xs">📶</span>
                              <span className="font-bold">1-Bar 2G GSM Gateway</span>
                            </div>
                            <span className="text-amber-300 font-bold bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded text-[10px]">
                              Data Offline · SMS Relay Active
                            </span>
                          </div>

                          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                            <div className="text-[10px] font-mono text-center text-slate-500 uppercase tracking-wider">
                              Encrypted Gateway Session · Virtual Line +44 7700 900142
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-2xl rounded-tr-xs shadow-md">
                                SOS
                              </div>
                              <span className="text-[9px] font-mono text-slate-400">
                                14:31 GMT · Sent via GSM SMS ✓✓
                              </span>
                            </div>

                            <div className="flex flex-col items-start gap-1">
                              <div className="bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs p-3.5 rounded-2xl rounded-tl-xs shadow-md space-y-2 max-w-[92%] sm:max-w-[85%]">
                                <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-xs">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  <span>Emergency Acknowledged (Zero-Login)</span>
                                </div>
                                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                                  Coordinates and satellite breadcrumbs dispatched to 3 nominated peers and on-call desk.
                                </p>
                                <div className="p-2 rounded-lg bg-black/50 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between gap-2">
                                  <span className="truncate">📍 51.5074° N, 0.1278° W</span>
                                  <span className="text-[#00E08C] shrink-0">Relay: 18ms</span>
                                </div>
                              </div>
                              <span className="text-[9px] font-mono text-slate-400">
                                14:31:02 GMT · London Cloud eu-west-2
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-300">
                          <span>Network: 1-Bar GSM Only</span>
                          <span className="text-[#00E08C] font-bold">No 4G/5G Data Required ✓</span>
                        </div>
                      </div>
                    </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* LAYER 04: CS-IDGATE HMAC-SHA256 VAULT                        */}
                {/* ------------------------------------------------------------- */}
                <div id="failsafe-step-3" className="relative flex items-start gap-3.5 sm:gap-4 group scroll-mt-28 failsafe-step-reveal">
                  {/* Continuous Vertical Connecting Line to Step 05 */}
                  <div className="block absolute left-[17px] sm:left-[19px] top-6 -bottom-8 w-[2px] bg-slate-200/90 pointer-events-none z-0" />

                  {/* Step Node */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full font-mono text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 z-10 bg-[#0B2545] text-[#00E08C] ring-4 ring-emerald-400/20 shadow-md border border-[#00E08C]/40">
                    04
                  </div>

                  <div className="flex-1 rounded-2xl sm:rounded-3xl bg-[#0B2545] text-white p-5 sm:p-7 shadow-xl border border-[#0B2545] ring-2 ring-[#00E08C]/30 transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 pr-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-400/20 border border-emerald-400/40 text-emerald-300">
                            Scope §5.3 · Trusted Client Vault
                          </span>
                          <h3 className="text-base sm:text-lg font-black tracking-wide text-white uppercase leading-snug">
                            Verified Once, Protected Forever. Repeat Sessions for £0.
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed">
                            Never pay twice for dependable repeat clients. When a client passes Veriff 3D biometric screening once, a non-reversible cryptographic HMAC-SHA256 fingerprint is registered in your private vault for £0 repeat sessions.
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#00E08C] text-[#0B2545] flex items-center justify-center shrink-0 shadow-md">
                          <Lock className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Active Expanded Simulation Widget */}
                      <div className="mt-5 pt-4 border-t border-white/10 space-y-3.5">
                        <div className="rounded-2xl bg-[#030712] border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-3.5">
                          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 font-mono text-xs">
                            <div className="flex items-center gap-2 text-slate-200">
                              <KeyRound className="w-4 h-4 text-[#00E08C] shrink-0" />
                              <span className="truncate">HMAC-SHA256: 7f83b165...e49c</span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-[#00E08C]/15 border border-[#00E08C]/40 text-[#00E08C] font-bold text-[10px] shrink-0 self-start sm:self-auto flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C] animate-pulse" />
                              <span>£0 Token Fee · Vault Match</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-200">
                            <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-start gap-2.5">
                              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-[#00E08C] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                              <span><strong>£0 Repeat Bookings:</strong> Re-enter the client&apos;s phone number to match the hash with zero check tokens deducted.</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-start gap-2.5">
                              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-[#00E08C] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                              <span><strong>60-Second Zero-Trace Shredder:</strong> Raw passport photos and facial scans are irreversibly destroyed via API within 60s.</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-start gap-2.5">
                              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-[#00E08C] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                              <span><strong>Bank-Grade RLS Privacy:</strong> Your client records are isolated by Row-Level Security — unreadable even to company staff.</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-300">
                          <span>Cryptographic Standard: HMAC-SHA256</span>
                          <span className="text-[#00E08C] font-bold">Zero Raw ID Stored on Disk ✓</span>
                        </div>
                      </div>
                    </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* LAYER 05: COLLECTIVE RED-FLAG PROTOCOL (COMMUNITY SHIELD)     */}
                {/* ------------------------------------------------------------- */}
                <div id="failsafe-step-4" className="relative flex items-start gap-3.5 sm:gap-4 group scroll-mt-28 failsafe-step-reveal">
                  {/* Step Node */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full font-mono text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 z-10 bg-[#0B2545] text-[#00E08C] ring-4 ring-emerald-400/20 shadow-md border border-[#00E08C]/40">
                    05
                  </div>

                  <div className="flex-1 rounded-2xl sm:rounded-3xl bg-[#0B2545] text-white p-5 sm:p-7 shadow-xl border border-[#0B2545] ring-2 ring-[#00E08C]/30 transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 pr-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-400/20 border border-rose-400/40 text-rose-300">
                            Scope §4 & §5.3 · Global Safety Hash
                          </span>
                          <h3 className="text-base sm:text-lg font-black tracking-wide text-white uppercase leading-snug">
                            Cross-Worker Community Shield. Aggressors Blacklisted Instantly.
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed">
                            Protecting lone workers across the UK from repeat predatory behavior. If a practitioner experiences an incident, the aggressor is reported in 3 confidential categories and permanently blacklisted across our network.
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#00E08C] text-[#0B2545] flex items-center justify-center shrink-0 shadow-md">
                          <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Active Expanded Simulation Widget */}
                      <div className="mt-5 pt-4 border-t border-white/10 space-y-3.5">
                        <div className="rounded-2xl bg-[#030712] border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-3.5">
                          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 font-mono text-xs">
                            <div className="flex items-center gap-2 text-rose-300">
                              <Shield className="w-4 h-4 text-rose-400 shrink-0" />
                              <span className="truncate">Decentralized Threat Registry · UK Collective</span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 font-bold text-[10px] shrink-0 self-start sm:self-auto flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                              <span>Live Blacklist Shield Active</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-200">
                            <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/40 flex items-start gap-2.5">
                              <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                                !
                              </span>
                              <span><strong>Severe Safety / Conduct Breach:</strong> Aggressor&apos;s phone hash is permanently locked into the server&apos;s Global Safety Hash.</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-900/40 flex items-start gap-2.5">
                              <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                                !
                              </span>
                              <span><strong>Non-Payment / Financial Fraud:</strong> Flags fraudulent callers attempting to exploit independent lone contractors.</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-900/40 flex items-start gap-2.5">
                              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                                !
                              </span>
                              <span><strong>Instant High-Risk Warning:</strong> If that individual attempts to verify with any other Checksafe worker, a High-Risk alert fires immediately.</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-300">
                          <span>Server-Side Red-Flag Database</span>
                          <span className="text-rose-400 font-bold">Cross-Worker Collective Shield ✓</span>
                        </div>
                      </div>
                    </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

            <section id="testimonials" className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200/60 scroll-mt-20">
        <div className="w-[96%] max-w-[1400px] mx-auto px-4 sm:px-6">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2545]/5 border border-[#0B2545]/15 text-[#0B2545] text-xs font-extrabold tracking-wider uppercase mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#00E08C] animate-pulse" />
              <span>Verified Lone Worker Safeguards</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.12]">
              What our active users &amp; solo workers are saying
            </h2>
            <p className="mt-3.5 text-slate-500 text-sm sm:text-base font-normal leading-relaxed max-w-xl mx-auto">
              Real-world feedback from solo professionals who depend on Checksafe cloud sentinels and ghost lines every day.
            </p>
          </div>

          {/* 3-Column Vertical Slider Marquee (GPU-Accelerated, 2 columns on tablet md, 3 on lg desktop) */}
          <div
            className="relative h-[620px] sm:h-[680px] overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          >
            {/* Grid of Columns: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 h-full">

              {/* Column 1: Upward Marquee */}
              <div className="relative overflow-hidden h-full">
                <div className="flex flex-col gap-6 animate-marquee-vertical marquee-column-gpu hover:[animation-play-state:paused] cursor-pointer">
                  {[...TESTIMONIALS_COL_1, ...TESTIMONIALS_COL_1].map((item, idx) => (
                    <div
                      key={`col1-${idx}`}
                      className="testimonial-card-gpu bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[#00E08C] select-none mb-3">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-5 mt-5 border-t border-slate-100">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-slate-100"
                          loading="lazy"
                        />
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#111827]">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">
                            {item.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Reverse (Downward) Marquee */}
              <div className="relative overflow-hidden h-full">
                <div className="flex flex-col gap-6 animate-marquee-vertical-reverse marquee-column-gpu hover:[animation-play-state:paused] cursor-pointer">
                  {[...TESTIMONIALS_COL_2, ...TESTIMONIALS_COL_2].map((item, idx) => (
                    <div
                      key={`col2-${idx}`}
                      className="testimonial-card-gpu bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[#00E08C] select-none mb-3">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-5 mt-5 border-t border-slate-100">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-slate-100"
                          loading="lazy"
                        />
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#111827]">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">
                            {item.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Slower Upward Marquee (Hidden on tablet md, visible on lg desktop) */}
              <div className="hidden lg:block relative overflow-hidden h-full">
                <div className="flex flex-col gap-6 animate-marquee-vertical-slow marquee-column-gpu hover:[animation-play-state:paused] cursor-pointer">
                  {[...TESTIMONIALS_COL_3, ...TESTIMONIALS_COL_3].map((item, idx) => (
                    <div
                      key={`col3-${idx}`}
                      className="testimonial-card-gpu bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[#00E08C] select-none mb-3">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-5 mt-5 border-t border-slate-100">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-slate-100"
                          loading="lazy"
                        />
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#111827]">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">
                            {item.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <section id="pricing" className="section-defer py-20 sm:py-28 bg-[#F7F9FD] scroll-mt-20">
        <div className="w-[96%] max-w-[1400px] mx-auto px-4 sm:px-6">

          {/* Centered Header image */}
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 pricing-header-reveal">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base font-normal">
              No contracts. No surprise fees.
            </p>

            {/* Operating Country Selector */}
            <div className="mt-7 inline-flex items-center justify-center pricing-controls-reveal">
              <div className="relative inline-flex items-center">
                <label htmlFor="pricing-country-select" className="sr-only">Select Operating Country</label>
                <select
                  id="pricing-country-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="appearance-none bg-white font-bold text-xs text-[#111827] pl-4 pr-9 py-2.5 rounded-full border border-slate-200/80 cursor-pointer shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#00E08C] transition"
                >
                  {COUNTRY_LIST.map((c) => (
                    <option key={c.code} value={c.code}>
                      {COUNTRY_FLAGS[c.code]} {c.name} ({c.currency} · {c.symbol})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 3 Pricing Cards: Base (Left), Elevated Pro (Center with Blue/Black Gradient & Generous Width), Enterprise (Right) */}
          <div className="w-full max-w-[1550px] mx-auto pricing-cards-container">
            {/* White Rounded Container Box */}
            <div className="bg-white rounded-[28px] sm:rounded-[44px] shadow-[0_20px_60px_rgba(80,108,240,0.06)] border border-slate-100/90 p-5 sm:p-10 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-6 lg:gap-10 items-center">

                {/* Card 1: Core Worker (£29/mo) */}
                <div className="flex flex-col justify-between h-full py-4 lg:py-6 pricing-card-base">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
                        {countryCfg.symbol}{settings.core_price_gbp}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-400">/month</span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#111827] mt-5">Core</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal leading-relaxed">
                      For solo practitioners requiring dedicated ghost proxy phone masking.
                    </p>

                    {/* Checklist */}
                    <div className="mt-8 space-y-3.5 text-xs sm:text-sm text-slate-600 font-medium">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0B2545]/8 text-[#0B2545] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">1 Dedicated Ghost Proxy Line</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0B2545]/8 text-[#0B2545] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">Automated 2-Stage Cloud Timer</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0B2545]/8 text-[#0B2545] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">1-Bar Cellular SMS Fallback</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0B2545]/8 text-[#0B2545] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">Custom Secret Duress Code</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0B2545]/8 text-[#0B2545] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">3 Emergency Peer Contacts</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Link
                      href={`/signup?plan=core&country=${country}`}
                      className="w-full inline-flex items-center justify-center py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B2545] text-xs font-bold uppercase tracking-wider transition"
                    >
                      Get Started with Core
                    </Link>
                  </div>
                </div>

                {/* Card 2: Pro (Elevated Centerpiece with Dark Blue/Black Background) (£59/mo) */}
                <div className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#0B2545] via-[#07192F] to-[#02060D] text-white p-7 sm:p-10 lg:p-11 shadow-2xl flex flex-col justify-between h-full transform lg:-translate-y-2 border border-white/10 pricing-card-pro">
                  {/* Popular Badge */}
                  <div className="absolute -top-3.5 right-8">
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00E08C] text-[#0B2545] shadow-xs">
                      Most Popular
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        {countryCfg.symbol}{settings.pro_price_gbp}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-white/70">/month</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mt-5">Pro</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal leading-relaxed">
                      For most businesses that want to verify clients and automate lone-worker safety.
                    </p>

                    {/* Checklist */}
                    <div className="mt-8 space-y-3.5 text-xs sm:text-sm text-slate-200 font-medium">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00E08C]/20 text-[#00E08C] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">2 Dedicated Ghost Proxy Lines</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00E08C]/20 text-[#00E08C] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">Covert Low-Battery Screen Disguise</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00E08C]/20 text-[#00E08C] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">Custom Secret Duress Code &amp; Decoy</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00E08C]/20 text-[#00E08C] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">Unbranded cs-idgate.com Client Links</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00E08C]/20 text-[#00E08C] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">Biometric Verification Pass</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00E08C]/20 text-[#00E08C] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">Automated 2-Stage Cloud Timer</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Link
                      href={`/signup?plan=pro&country=${country}`}
                      className="w-full inline-flex items-center justify-center py-3.5 rounded-full bg-[#00E08C] hover:bg-[#00f298] text-[#0B2545] text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-[#00E08C]/20"
                    >
                      Get Started with Pro
                    </Link>
                  </div>
                </div>

                {/* Card 3: Elite (£119/mo) */}
                <div className="flex flex-col justify-between h-full py-4 lg:py-6 pricing-card-enterprise">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
                        {countryCfg.symbol}{settings.elite_price_gbp}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-400">/month</span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#111827] mt-5">Elite</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal leading-relaxed">
                      For agencies and firms managing multi-worker fleet safeguarding.
                    </p>

                    {/* Checklist */}
                    <div className="mt-8 space-y-3.5 text-xs sm:text-sm text-slate-600 font-medium">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0B2545]/8 text-[#0B2545] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">5 Dedicated Ghost Proxy Lines</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0B2545]/8 text-[#0B2545] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">All Pro Covert Safeguards Included</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0B2545]/8 text-[#0B2545] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">Multi-line Call &amp; SMS Routing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0B2545]/8 text-[#0B2545] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">Unlimited Automated Cloud Timers</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0B2545]/8 text-[#0B2545] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="sm:whitespace-nowrap">Priority Multi-Contact Escalation Protocol</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Link
                      href={`/signup?plan=elite&country=${country}`}
                      className="w-full inline-flex items-center justify-center py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B2545] text-xs font-bold uppercase tracking-wider transition"
                    >
                      Get Started with Elite
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Supplementary Ecosystem Addons (Hibernation, Top-Ups & Agency Fleet) */}
          <div className="mt-16 sm:mt-20 max-w-6xl mx-auto space-y-8 pricing-addons-container">

            {/* Hibernation Mode Banner */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 pricing-addon-reveal">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#111827]">Taking Time Off or Parental Leave?</h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                    Switch to Hibernation Mode ({countryCfg.symbol}{settings.hibernation_1_price_gbp}/mo for 1 number · {countryCfg.symbol}{settings.hibernation_2_price_gbp}/mo for 2 numbers · {countryCfg.symbol}{settings.hibernation_5_price_gbp}/mo for 5 numbers kept) to keep your dedicated proxy numbers active so callers never reach a disconnected line.
                  </p>
                </div>
              </div>
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold shrink-0 transition"
              >
                Manage Numbers
              </Link>
            </div>

            {/* Token Top-Ups Container */}
            <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-slate-200/80 shadow-xs pricing-addon-reveal max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0B2545]">
                    <Zap className="w-4 h-4 text-[#00E08C]" />
                    <span>Instant Biometric KYC Top-Ups</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#111827] mt-1.5">
                    Need extra client screenings?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
                    Top-up verification tokens never expire. Screen unknown clients before private meetings with automated 3D biometric ID checks.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 self-start md:self-auto">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>60s Biometric Shredder · Certified UK-GDPR</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:border-slate-200 transition">
                  <div className="text-xs text-slate-400 font-bold uppercase">5 Checks</div>
                  <div className="text-2xl font-black text-[#111827] mt-1">{countryCfg.symbol}{settings.topup_5_price_gbp}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{countryCfg.symbol}{(settings.topup_5_price_gbp / 5).toFixed(2)} / check</p>
                  <Link href={`/signup?topup=5&country=${country}`} className="mt-3 block py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0B2545] hover:bg-slate-100 transition">Buy Token Pack →</Link>
                </div>
                <div className="p-4 rounded-2xl bg-white border-2 border-[#00E08C] text-center relative shadow-sm">
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#00E08C] text-[#0B2545] text-[9px] font-black rounded-full uppercase tracking-wider">MOST POPULAR</span>
                  <div className="text-xs text-[#0B2545] font-bold uppercase">15 Checks</div>
                  <div className="text-2xl font-black text-[#0B2545] mt-1">{countryCfg.symbol}{settings.topup_15_price_gbp}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{countryCfg.symbol}{(settings.topup_15_price_gbp / 15).toFixed(2)} / check</p>
                  <Link href={`/signup?topup=15&country=${country}`} className="mt-3 block py-2 rounded-xl bg-[#00E08C] hover:bg-[#00c97d] text-xs font-bold text-[#0B2545] transition">Buy Token Pack →</Link>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:border-slate-200 transition">
                  <div className="text-xs text-slate-400 font-bold uppercase">50 Checks</div>
                  <div className="text-2xl font-black text-[#111827] mt-1">{countryCfg.symbol}{settings.topup_50_price_gbp}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{countryCfg.symbol}{(settings.topup_50_price_gbp / 50).toFixed(2)} / check</p>
                  <Link href={`/signup?topup=50&country=${country}`} className="mt-3 block py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0B2545] hover:bg-slate-100 transition">Buy Token Pack →</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SITE FOOTER */}
      {/* ========================================================================= */}
      <SiteFooter />
    </div>
  );
}

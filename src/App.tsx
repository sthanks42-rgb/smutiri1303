import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Trophy, 
  Timer, 
  Check, 
  X, 
  RotateCcw, 
  Users, 
  Plus, 
  Trash2, 
  Award, 
  Zap, 
  Sparkles, 
  ArrowLeft, 
  HelpCircle, 
  Calendar, 
  BookOpen, 
  Compass, 
  Clock, 
  Volume2, 
  VolumeX, 
  Flame, 
  ArrowRight,
  Info
} from 'lucide-react';
import { Category, Difficulty, Question, Team, GameConfig, GamePhase } from './types';
import { CATEGORY_LABELS, DIFFICULTY_LABELS, getRandomQuestions, QUESTIONS_BANK } from './questions';

// === Confetti Particle Component ===
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  spin: number;
  speed: number;
}

const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444'];
    const initialParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: -10 - Math.random() * 20, // percentage above screen
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6, // size in px
      angle: Math.random() * 360,
      spin: Math.random() * 10 - 5,
      speed: Math.random() * 3 + 2,
    }));
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => {
          const nextY = p.y + p.speed;
          const nextX = p.x + Math.sin(nextY / 10) * 0.5;
          return {
            ...p,
            y: nextY > 110 ? -10 : nextY,
            x: nextX < 0 ? 100 : nextX > 100 ? 0 : nextX,
            angle: p.angle + p.spin
          };
        })
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm opacity-90 transition-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            transform: `rotate(${p.angle}deg)`,
          }}
        />
      ))}
    </div>
  );
};

// Available Avatars
const AVATARS = ['🚀', '🦁', '🦅', '🦊', '🧠', '👑', '⚡', '💎', '🎯', '🦄', '🔥', '🏆', '🐼', '🐺', '🦉'];

// Available Team Theme Colors
const COLORS_PESS = [
  { name: 'أزرق ملكي', value: 'border-blue-500 text-blue-400 bg-blue-500/10 shadow-blue-500/20 shadow-sm', main: '#3b82f6', fill: 'bg-blue-500' },
  { name: 'ذهبي متوهج', value: 'border-amber-500 text-amber-400 bg-amber-500/10 shadow-amber-500/20 shadow-sm', main: '#f59e0b', fill: 'bg-amber-500' },
  { name: 'أخضر زمردي', value: 'border-emerald-500 text-emerald-400 bg-emerald-500/10 shadow-emerald-500/20 shadow-sm', main: '#10b981', fill: 'bg-emerald-500' },
  { name: 'بنفسجي الإمبراطور', value: 'border-purple-500 text-purple-400 bg-purple-500/10 shadow-purple-500/20 shadow-sm', main: '#8b5cf6', fill: 'bg-purple-500' },
  { name: 'وردي نيون', value: 'border-pink-500 text-pink-400 bg-pink-500/10 shadow-pink-500/20 shadow-sm', main: '#ec4899', fill: 'bg-pink-500' },
  { name: 'أحمر قرمزي', value: 'border-rose-500 text-rose-400 bg-rose-500/10 shadow-rose-500/20 shadow-sm', main: '#f43f5e', fill: 'bg-rose-500' },
];

export default function App() {
  // --- STATE ---
  const [phase, setPhase] = useState<GamePhase>('setup');
  
  // Audio indicator (purely client UI sound visual toggle)
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Teams lists
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 'team_1',
      name: 'فريق الخوارزمي',
      score: 0,
      color: 'border-blue-500 text-blue-400 bg-blue-500/10 shadow-blue-500/20 shadow-sm',
      avatar: '🧠',
      lifelines: { deleteTwoUsed: false, doublePointsUsed: false }
    },
    {
      id: 'team_2',
      name: 'فريق ابن سينا',
      score: 0,
      color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10 shadow-emerald-500/20 shadow-sm',
      avatar: '🔬',
      lifelines: { deleteTwoUsed: false, doublePointsUsed: false }
    }
  ]);

  // Current adding team form state
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamAvatar, setNewTeamAvatar] = useState('🚀');
  const [newTeamColorIndex, setNewTeamColorIndex] = useState(0);

  // Game config
  const [config, setConfig] = useState<GameConfig>({
    winningScore: 100,
    timePerQuestion: 30,
    selectedCategories: ['islamic', 'science', 'general', 'geography', 'sports', 'literature'],
    difficultyFilter: ['easy', 'medium', 'hard']
  });

  // Game play States
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);

  // Interaction States
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);
  const [doublePointsActive, setDoublePointsActive] = useState(false);
  const [answerSuccess, setAnswerSuccess] = useState<boolean | null>(null);
  const [isTimeOut, setIsTimeOut] = useState(false);

  // Final Winning team
  const [winnerTeam, setWinnerTeam] = useState<Team | null>(null);

  // Historical statistics
  const [historyStats, setHistoryStats] = useState<{
    correctCount: number;
    incorrectCount: number;
    lifelinesUsed: number;
    totalRounds: number;
  }>({
    correctCount: 0,
    incorrectCount: 0,
    lifelinesUsed: 0,
    totalRounds: 1
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- EFFECT: Countdown Timer ---
  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      handleTimeOut();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, timerRunning]);

  // --- EFFECT: Capacitor Android Back Button Handling ---
  useEffect(() => {
    let backButtonListener: any = null;
    const initBackButton = async () => {
      try {
        const { App: CapApp } = await import('@capacitor/app');
        backButtonListener = await CapApp.addListener('backButton', () => {
          if (phase !== 'setup') {
            setPhase('setup');
          } else {
            CapApp.exitApp();
          }
        });
      } catch (err) {
        console.log('Capacitor back button listener skipped (not a native platform):', err);
      }
    };
    initBackButton();
    return () => {
      if (backButtonListener && typeof backButtonListener.remove === 'function') {
        backButtonListener.remove();
      }
    };
  }, [phase]);

  // --- ACTIONS ---

  // Handle addition of a new team
  const handleAddTeam = () => {
    if (!newTeamName.trim()) return;
    const colorObj = COLORS_PESS[newTeamColorIndex];
    const newTeam: Team = {
      id: `team_${Date.now()}`,
      name: newTeamName.trim(),
      score: 0,
      color: colorObj.value,
      avatar: newTeamAvatar,
      lifelines: { deleteTwoUsed: false, doublePointsUsed: false }
    };
    setTeams([...teams, newTeam]);
    setNewTeamName('');
    // pick a random avatar for next suggestion
    const index = Math.floor(Math.random() * AVATARS.length);
    setNewTeamAvatar(AVATARS[index]);
    setNewTeamColorIndex((newTeamColorIndex + 1) % COLORS_PESS.length);
  };

  const handleRemoveTeam = (id: string) => {
    setTeams(teams.filter(t => t.id !== id));
  };

  // Start game challenge
  const handleStartGame = () => {
    if (teams.length < 2) {
      // visual buzz or notice
      alert('الرجاء إضافة فريقين متباريين على الأقل لبدء التحدي!');
      return;
    }
    if (config.selectedCategories.length === 0) {
      alert('الرجاء اختيار تصنيف واحد على الأقل للأسئلة!');
      return;
    }
    if (config.difficultyFilter.length === 0) {
      alert('الرجاء اختيار نطاق صعوبة واحد على الأقل للمسابقة!');
      return;
    }

    // Load matching questions shuffled
    const loadedQuestions = getRandomQuestions(config.selectedCategories, config.difficultyFilter, 50);
    setQuestions(loadedQuestions);
    setCurrentQuestionIndex(0);
    setCurrentTeamIndex(0);
    
    // Reset all team scores & lifelines
    setTeams(prev => prev.map(t => ({
      ...t,
      score: 0,
      lifelines: { deleteTwoUsed: false, doublePointsUsed: false }
    })));

    setWinnerTeam(null);
    setHistoryStats({
      correctCount: 0,
      incorrectCount: 0,
      lifelinesUsed: 0,
      totalRounds: 1
    });

    prepareQuestion(0, loadedQuestions);
  };

  // Setup current question configuration
  const prepareQuestion = (index: number, questionsList: Question[]) => {
    if (questionsList.length === 0) return;
    
    const currQ = questionsList[index % questionsList.length];
    setSelectedAnswerIndex(null);
    setEliminatedIndices([]);
    setDoublePointsActive(false);
    setAnswerSuccess(null);
    setIsTimeOut(false);
    setTimeLeft(config.timePerQuestion);
    setPhase('playing');
    setTimerRunning(config.timePerQuestion > 0);
  };

  // Time Out handler
  const handleTimeOut = () => {
    setTimerRunning(false);
    setIsTimeOut(true);
    setAnswerSuccess(false);
    setHistoryStats(prev => ({ ...prev, incorrectCount: prev.incorrectCount + 1 }));
    setPhase('answer_result');

    // Visual effect: buzzer vibration cue
    triggerBuzzerVisual();
  };

  const triggerBuzzerVisual = () => {
    // Visual vibrator on screen elements if wanted, through styling states
  };

  // Use 50:50 Lifeline (حذف إجابتين)
  const handleUse5050 = () => {
    const activeTeam = teams[currentTeamIndex];
    if (activeTeam.lifelines.deleteTwoUsed) return;
    if (selectedAnswerIndex !== null) return; // Answer already selected
    
    const currentQuestion = questions[currentQuestionIndex % questions.length];
    const correctIdx = currentQuestion.correctAnswerIndex;
    
    // Pick 2 random incorrect options to eliminate
    const incorrectIndices: number[] = [];
    currentQuestion.options.forEach((_, idx) => {
      if (idx !== correctIdx) {
        incorrectIndices.push(idx);
      }
    });

    // Shuffle incorrect list and pick first 2
    const shuffledIncorrect = [...incorrectIndices].sort(() => Math.random() - 0.5);
    const toEliminate = shuffledIncorrect.slice(0, 2);

    setEliminatedIndices(toEliminate);

    // Update team lifeline state
    setTeams(prev => prev.map((t, idx) => {
      if (idx === currentTeamIndex) {
        return {
          ...t,
          lifelines: {
            ...t.lifelines,
            deleteTwoUsed: true
          }
        };
      }
      return t;
    }));

    setHistoryStats(prev => ({ ...prev, lifelinesUsed: prev.lifelinesUsed + 1 }));
  };

  // Use Double Points Lifeline (مضاعفة النقاط)
  const handleUseDoublePoints = () => {
    const activeTeam = teams[currentTeamIndex];
    if (activeTeam.lifelines.doublePointsUsed) return;
    if (selectedAnswerIndex !== null) return; // Answer already selected

    setDoublePointsActive(true);

    setTeams(prev => prev.map((t, idx) => {
      if (idx === currentTeamIndex) {
        return {
          ...t,
          lifelines: {
            ...t.lifelines,
            doublePointsUsed: true
          }
        };
      }
      return t;
    }));

    setHistoryStats(prev => ({ ...prev, lifelinesUsed: prev.lifelinesUsed + 1 }));
  };

  // Select an Answer
  const handleSelectAnswer = (optionIndex: number) => {
    if (selectedAnswerIndex !== null || isTimeOut) return; // already answered
    setTimerRunning(false);
    setSelectedAnswerIndex(optionIndex);

    const currentQuestion = questions[currentQuestionIndex % questions.length];
    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    setAnswerSuccess(isCorrect);

    // Calculate points
    let points = currentQuestion.points;
    if (doublePointsActive) {
      points *= 2;
    }

    if (isCorrect) {
      // Add points to current team
      setTeams(prev => prev.map((t, idx) => {
        if (idx === currentTeamIndex) {
          const updatedScore = t.score + points;
          return { ...t, score: updatedScore };
        }
        return t;
      }));
      setHistoryStats(prev => ({ ...prev, correctCount: prev.correctCount + 1 }));
    } else {
      setHistoryStats(prev => ({ ...prev, incorrectCount: prev.incorrectCount + 1 }));
    }

    setPhase('answer_result');
  };

  // Next Turn action
  const handleNextTurn = () => {
    const currentQuestion = questions[currentQuestionIndex % questions.length];
    
    // Check if any team has reached or exceeded winning score
    const winningTeams = teams.filter(t => t.score >= config.winningScore);
    
    if (winningTeams.length > 0) {
      // Find team with highest score
      const sortedWinners = [...teams].sort((a, b) => b.score - a.score);
      setWinnerTeam(sortedWinners[0]);
      setPhase('game_over');
      return;
    }

    // Determine next team index
    const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
    setCurrentTeamIndex(nextTeamIndex);
    
    // Increment question index
    const nextQIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQIndex);

    if (nextTeamIndex === 0) {
      setHistoryStats(prev => ({ ...prev, totalRounds: prev.totalRounds + 1 }));
    }

    prepareQuestion(nextQIndex, questions);
  };

  // Setup change handlers
  const toggleCategory = (category: Category) => {
    const current = [...config.selectedCategories];
    if (current.includes(category)) {
      setConfig({
        ...config,
        selectedCategories: current.filter(c => c !== category)
      });
    } else {
      setConfig({
        ...config,
        selectedCategories: [...current, category]
      });
    }
  };

  const toggleDifficulty = (difficulty: Difficulty) => {
    const current = [...config.difficultyFilter];
    if (current.includes(difficulty)) {
      setConfig({
        ...config,
        difficultyFilter: current.filter(d => d !== difficulty)
      });
    } else {
      setConfig({
        ...config,
        difficultyFilter: [...current, difficulty]
      });
    }
  };

  // Get difficulty color code
  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'easy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/25';
      case 'hard': return 'text-rose-400 bg-rose-500/10 border-rose-500/25';
    }
  };

  // Current Question accessor safely
  const currentQuestion: Question | undefined = questions[currentQuestionIndex % questions.length];

  // Colors mapping for background avatars in play
  const getTeamRGBColor = (colorClass: string) => {
    if (colorClass.includes('blue')) return '#3b82f6';
    if (colorClass.includes('emerald')) return '#10b981';
    if (colorClass.includes('amber')) return '#f59e0b';
    if (colorClass.includes('purple')) return '#8b5cf6';
    if (colorClass.includes('pink')) return '#ec4899';
    if (colorClass.includes('rose')) return '#f43f5e';
    return '#f59e0b';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between bg-quiz-glowing font-sans relative lg:py-6 lg:px-4">
      
      {/* Decorative ambient neon orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-900/10 blur-3xl ambient-glow-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl ambient-glow-2 pointer-events-none" />

      {/* Main Wrapper matching the 1024x768 board aesthetic on desktop */}
      <div className="w-full max-w-[1024px] min-h-[680px] lg:min-h-[768px] mx-auto flex-grow flex flex-col justify-between p-4 sm:p-6 space-y-6 bg-slate-900/40 rounded-3xl border border-indigo-950/60 shadow-2xl backdrop-blur-sm relative overflow-hidden transition-all duration-300">

        {/* --- HEADER --- */}
        <header className="bg-[#4C35B5] p-4 rounded-2xl shadow-inner border border-indigo-500/20 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFD700] to-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <Trophy className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <h1 id="app-title" className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>تحدي الفرق</span>
                  <span className="text-xs px-2.5 py-1 rounded bg-[#FFD700] text-[#1F2937] font-black shadow-sm">المسرح التفاعلي</span>
                </h1>
                <p className="text-[10px] text-indigo-100 hidden sm:block font-medium">مسابقات جماعية وتصفيات ثنائية مشوقة ببطاقات إلكترونية متطورة</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Quick stats in header when playing */}
              {phase !== 'setup' && (
                <div className="hidden md:flex items-center gap-3 text-xs bg-slate-950/45 rounded-lg px-3 py-1.5 border border-[#3b2796]/60">
                  <span className="text-indigo-200">الجولة: <strong className="text-white font-extrabold">{historyStats.totalRounds}</strong></span>
                  <span className="text-[#3b2796]">|</span>
                  <span className="text-indigo-200">الهدف: <strong className="text-[#FFD700] font-black">{config.winningScore} 🎯</strong></span>
                </div>
              )}

              {/* Sound Toggle HUD */}
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 h-9 w-9 rounded-lg border border-[#3b2796] bg-slate-950/20 hover:bg-slate-950/40 text-indigo-200 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                title={soundEnabled ? 'إيقاف المؤثرات البصرية' : 'تفعيل المؤثرات البصرية'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* --- MAIN STAGE --- */}
        <main className="flex-grow flex flex-col justify-center space-y-8 py-2 z-10 w-full relative">
        
        <AnimatePresence mode="wait">
          
          {/* ==================================== */}
          {/* 1. SETUP PHASE (صالة تجهيز الفرق والخيارات) */}
          {/* ==================================== */}
          {phase === 'setup' && (
            <motion.div
              key="setup-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Right Side: Teams Settings */}
              <div className="lg:col-span-7 bg-slate-900/50 border border-indigo-950/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-indigo-950 pb-3">
                  <Users className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-bold text-white">تجهيز الفرق المتبارية</h2>
                </div>

                {/* List of Added Teams */}
                <div className="space-y-2.5 mb-6 max-h-[220px] overflow-y-auto pr-1">
                  {teams.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 bg-slate-950/40 rounded-xl border border-dashed border-slate-800">
                      <Users className="w-10 h-10 mx-auto opacity-20 mb-2" />
                      <p className="text-sm">لم يتم تسجيل أي فريق بعد.</p>
                      <p className="text-xs opacity-75 mt-0.5">أضف فريقين على الأقل للبدء.</p>
                    </div>
                  ) : (
                    teams.map((t, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={t.id} 
                        className={`flex items-center justify-between p-3 rounded-xl border ${t.color}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl w-10 h-10 rounded-lg bg-slate-950/60 flex items-center justify-center">
                            {t.avatar}
                          </span>
                          <div>
                            <span className="font-bold text-sm block text-white">{t.name}</span>
                            <span className="text-[10px] opacity-75 block">الفريق المتبارى رقم {idx + 1}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveTeam(t.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 transition-colors bg-slate-950/45 rounded-lg hover:bg-slate-950"
                          title="حذف الفريق"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Team Add Form */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-indigo-950/50">
                  <h3 className="text-xs font-semibold text-slate-400 mb-3 block">إضافة فريق جديد</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block">اسم الفريق</label>
                      <input
                        type="text"
                        placeholder="مثال: النشامى، الرواد..."
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTeam()}
                        maxLength={24}
                        className="w-full text-sm bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 focus:outline-none focus:border-amber-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block">شعار الفريق (أيقونة)</label>
                      <div className="flex gap-1 overflow-x-auto bg-slate-900 p-1 border border-slate-800 rounded-lg max-w-full">
                        {AVATARS.map(emoji => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setNewTeamAvatar(emoji)}
                            className={`text-lg p-1.5 rounded-md hover:bg-slate-800 transition-all shrink-0 ${newTeamAvatar === emoji ? 'bg-amber-500 text-slate-950 scale-110' : 'text-slate-300'}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-xs text-slate-400 mb-1.5 block">سمة لون الفريق (ألوان العرض)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {COLORS_PESS.map((col, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setNewTeamColorIndex(index)}
                          className={`py-2 px-1 text-[10px] rounded border font-medium text-center truncate ${col.value} ${newTeamColorIndex === index ? 'ring-2 ring-amber-400 border-amber-400 scale-102' : 'opacity-70'}`}
                        >
                          {col.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddTeam}
                    disabled={!newTeamName.trim()}
                    className="w-full text-xs font-bold py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>تسـجيل وإضافة الفريق للقائمة</span>
                  </button>
                </div>
              </div>

              {/* Left Side: Game Configurations */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* 1. Point Goals & Time Limit */}
                <div className="bg-slate-900/50 border border-indigo-950/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4 border-b border-indigo-950 pb-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h2 className="text-base font-bold text-white">قوانين وجولات المقابلة</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Points limit selector */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-400 font-medium">حد الفوز بالنقاط</span>
                        <span className="text-amber-400 font-bold">{config.winningScore} نقطة 🎯</span>
                      </div>
                      <div className="flex gap-2">
                        {[50, 100, 150, 200].map(pt => (
                          <button
                            key={pt}
                            type="button"
                            onClick={() => setConfig({ ...config, winningScore: pt })}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all border ${config.winningScore === pt ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-950/30' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
                          >
                            {pt} pts
                          </button>
                        ))}
                        <input
                          type="number"
                          placeholder="مخصص"
                          min="30"
                          max="1000"
                          value={config.winningScore}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 30;
                            setConfig({ ...config, winningScore: Math.max(10, val) });
                          }}
                          className="w-20 bg-slate-950 border border-slate-800 text-white text-center rounded-lg text-xs"
                          title="نقاط مخصصة"
                        />
                      </div>
                    </div>

                    {/* Time limit selector */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-400 font-medium">زمن التفكير لكل سؤال</span>
                        <span className="text-amber-400 font-bold">{config.timePerQuestion === 0 ? 'بلا وقت محدد' : `${config.timePerQuestion} ثانية ⏱️`}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[15, 30, 45, 0].map(tVal => (
                          <button
                            key={tVal}
                            type="button"
                            onClick={() => setConfig({ ...config, timePerQuestion: tVal })}
                            className={`py-1.5 text-xs font-bold rounded-lg transition-all border ${config.timePerQuestion === tVal ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-950/30' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
                          >
                            {tVal === 0 ? 'بلا وقت' : `${tVal} ث`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Categories Selection */}
                <div className="bg-slate-900/50 border border-indigo-950/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3 border-b border-indigo-950 pb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-amber-400" />
                      <h2 className="text-base font-bold text-white">تحديد المواضيع</h2>
                    </div>
                    {/* Quick check/uncheck */}
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setConfig({ ...config, selectedCategories: ['islamic', 'science', 'general', 'geography', 'sports', 'literature'] })}
                        className="text-[10px] text-indigo-400 hover:underline"
                      >
                        تحديد الكل
                      </button>
                      <button 
                        type="button"
                        onClick={() => setConfig({ ...config, selectedCategories: [] })}
                        className="text-[10px] text-slate-400 hover:underline"
                      >
                        إلغاء الكل
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(CATEGORY_LABELS).map(([key, info]) => {
                      const isSelected = config.selectedCategories.includes(key as Category);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleCategory(key as Category)}
                          className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold border transition-all ${isSelected ? 'bg-slate-950 border-amber-500/60 shadow-lg shadow-slate-950/50' : 'opacity-40 border-slate-800 bg-slate-950/40 text-slate-400'}`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="text-base">{info.icon}</span>
                            <span className={isSelected ? 'text-white' : 'text-slate-400'}>{info.label}</span>
                          </span>
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Difficulties */}
                <div className="bg-slate-900/50 border border-indigo-950/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3 border-b border-indigo-950 pb-2">
                    <Flame className="w-5 h-5 text-amber-400" />
                    <h2 className="text-base font-bold text-white">مستويات الصعوبة</h2>
                  </div>

                  <div className="flex gap-2">
                    {Object.entries(DIFFICULTY_LABELS).map(([key, info]) => {
                      const isSelected = config.difficultyFilter.includes(key as Difficulty);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleDifficulty(key as Difficulty)}
                          className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-bold transition-all ${isSelected ? 'bg-slate-950 border-amber-500/60 text-white' : 'opacity-40 border-slate-800 text-slate-400 bg-slate-950/40'}`}
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${key === 'easy' ? 'bg-green-500' : key === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                            <span>{info.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ultimate START button */}
                <button
                  type="button"
                  onClick={handleStartGame}
                  className="w-full py-4 bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1F2937] font-black text-lg rounded-2xl transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2 glow-gold cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>ابدأ تحدي المجموعات الآن</span>
                </button>
              </div>

            </motion.div>
          )}

          {/* ==================================== */}
          {/* 2. PLAYING / QUESTION PHASE (ساحة اللعب والأسئلة) */}
          {/* ==================================== */}
          {(phase === 'playing' || phase === 'answer_result') && currentQuestion && (
            <motion.div
              key="play-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 w-full"
            >
              {/* Scoreboard and HUD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {teams.map((t, idx) => {
                  const isTurn = idx === currentTeamIndex;
                  const isWinnerCandidate = t.score >= config.winningScore;
                  return (
                    <div
                      key={t.id}
                      style={{ borderColor: isTurn ? '#FFD700' : '#1e293b' }}
                      className={`relative bg-slate-900/60 backdrop-blur-sm border-2 rounded-2xl p-3.5 transition-all flex flex-col justify-between ${isTurn ? 'border-4 border-[#FFD700] shadow-[0_0_15px_#FFD700] scale-102 bg-slate-900' : 'opacity-80 border-slate-800'}`}
                    >
                      {/* Active indicator */}
                      {isTurn && (
                        <span className="absolute -top-2.5 right-4 bg-[#FFD700] text-[#1F2937] text-[9px] px-2.5 py-0.5 rounded-full font-black shadow animate-bounce">
                          دور الفريق الحالي 🚨
                        </span>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl w-9 h-9 rounded-lg bg-slate-950/80 flex items-center justify-center border border-slate-800">
                            {t.avatar}
                          </span>
                          <div>
                            <h3 className="font-bold text-sm text-white truncate max-w-[120px]">{t.name}</h3>
                            <span className="text-[10px] text-slate-400">فريق متباري</span>
                          </div>
                        </div>

                        {/* Point Value Displays as Score Badge */}
                        <div className="text-left">
                          <span className="bg-[#FFD700] text-[#1F2937] text-sm px-2.5 py-0.5 rounded-full font-black tracking-tight">{t.score} ن</span>
                        </div>
                      </div>

                      {/* Score Goal Progress Bar */}
                      <div className="w-full bg-[#1e293b] h-2 rounded-full overflow-hidden mb-3 border border-slate-805">
                        <div 
                          className="h-full rounded-full transition-all duration-500 bg-amber-500"
                          style={{ width: `${Math.min(100, (t.score / config.winningScore) * 100)}%` }}
                        />
                      </div>

                      {/* Lifeline Status Indicators */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/60 pt-2 bg-slate-950/25 px-1">
                        <span>وسائل المساعدة:</span>
                        <div className="flex gap-2">
                          <span 
                            className={`px-1.5 py-0.5 rounded text-[8px] font-black ${t.lifelines.deleteTwoUsed ? 'bg-slate-950 text-slate-600 line-through' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}
                            title="حذف إجابتين (50:50)"
                          >
                            50:50
                          </span>
                          <span 
                            className={`px-1.5 py-0.5 rounded text-[8px] font-black ${t.lifelines.doublePointsUsed ? 'bg-slate-950 text-slate-600 line-through' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}
                            title="مضاعفة العلامة"
                          >
                            مضاعفة x2
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Playing Board */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* 1. Main Trivia Screen (lg:9 cols with beautiful White Card styling) */}
                <div className="lg:col-span-8 flex flex-col justify-between bg-white border border-[#E5E7EB] rounded-[24px] p-5 sm:p-7 shadow-[0_10px_25px_rgba(0,0,0,0.2)] relative overflow-hidden text-[#1F2937] z-10">
                  
                  {/* Decorative yellow-400 corner ribbon within the question card */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD700] -mr-12 -mt-12 rotate-45 shadow-sm pointer-events-none z-20" />
                  
                  {/* Decorative watermarked category visual */}
                  <div className="absolute -top-10 -left-10 text-indigo-50/50 opacity-20 pointer-events-none text-9xl">
                    {CATEGORY_LABELS[currentQuestion.category]?.icon || '❓'}
                  </div>

                  {/* Header Area: Question metadata */}
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-5 z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{CATEGORY_LABELS[currentQuestion.category]?.icon}</span>
                      <span className="text-xs font-black text-[#4C35B5]">
                        {CATEGORY_LABELS[currentQuestion.category]?.label}
                      </span>
                      <span className="text-[#E5E7EB] text-xs">|</span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${getDifficultyColor(currentQuestion.difficulty)}`}>
                        {DIFFICULTY_LABELS[currentQuestion.difficulty]?.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {doublePointsActive && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black animate-pulse flex items-center gap-1 shadow-md shadow-amber-950/40">
                          <Zap className="w-3.5 h-3.5 fill-slate-950" />
                          مضاعفة النقاط نشطة! (+{currentQuestion.points * 2} نقطة)
                        </span>
                      )}
                      {!doublePointsActive && (
                        <span className="text-slate-500 font-bold">
                          نقاط السؤال: <strong className="text-[#4C35B5] font-black">{currentQuestion.points}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Countdown Bar */}
                  {config.timePerQuestion > 0 && phase === 'playing' && (
                    <div className="w-full bg-[#F3F4F6] h-2.5 rounded-full mb-6 overflow-hidden border border-[#E5E7EB]">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-red-500 animate-pulse' : timeLeft <= 12 ? 'bg-amber-500' : 'bg-[#4C35B5]'}`}
                        style={{ width: `${(timeLeft / config.timePerQuestion) * 100}%` }}
                      />
                    </div>
                  )}

                  {/* Question Display Screen */}
                  <div className="text-center py-6 sm:py-8 z-10">
                    {config.timePerQuestion > 0 && phase === 'playing' && (
                      <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center border-4 mb-4 transition-all ${timeLeft <= 5 ? 'border-red-500 text-red-500 animate-pulse duration-500 font-black' : 'border-[#E5E7EB] text-[#4C35B5] font-black'}`}>
                        <span className="text-lg font-black">{timeLeft}</span>
                      </div>
                    )}

                    <h2 className="text-xl sm:text-2xl font-black text-[#1F2937] leading-relaxed max-w-2xl mx-auto block px-4">
                      {currentQuestion.questionText}
                    </h2>
                  </div>

                  {/* Answer Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4 z-10">
                    {currentQuestion.options.map((option, idx) => {
                      const LetterIcon = ['أ', 'ب', 'ج', 'د'][idx];
                      const isEliminated = eliminatedIndices.includes(idx);
                      
                      // Highlight correct/incorrect states after submission
                      const isSelected = selectedAnswerIndex === idx;
                      const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;
                      
                      let choiceClasses = "bg-[#F3F4F6] text-[#1F2937] border-3 border-transparent hover:bg-[#E5E7EB] hover:border-[#4C35B5]";
                      let letterColorClasses = "bg-white border border-[#E5E7EB] text-[#4C35B5] font-black";

                      if (phase === 'answer_result') {
                        if (isCorrectAnswer) {
                          choiceClasses = "border-3 border-emerald-500 bg-emerald-50 text-emerald-800 glow-emerald font-black";
                          letterColorClasses = "bg-emerald-500 text-white font-bold border-emerald-600";
                        } else if (isSelected) {
                          choiceClasses = "border-3 border-rose-500 bg-rose-50 text-rose-800 glow-rose font-black";
                          letterColorClasses = "bg-rose-500 text-white font-bold border-rose-600";
                        } else {
                          choiceClasses = "opacity-30 bg-[#F3F4F6] text-[#1F2937]/50 border-3 border-transparent cursor-not-allowed";
                        }
                      } else if (isEliminated) {
                        choiceClasses = "opacity-15 bg-[#F3F4F6] text-slate-400 border-3 border-transparent cursor-not-allowed pointer-events-none line-through";
                        letterColorClasses = "bg-transparent text-slate-300";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => !isEliminated && phase === 'playing' && handleSelectAnswer(idx)}
                          disabled={phase !== 'playing' || isEliminated}
                          className={`group w-full p-4 rounded-2xl text-right transition-all duration-200 flex items-center justify-between text-sm sm:text-base font-extrabold cursor-pointer ${choiceClasses}`}
                        >
                          <span className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border text-xs transition-colors ${letterColorClasses}`}>
                              {LetterIcon}
                            </span>
                            <span className="leading-snug">{option}</span>
                          </span>

                          {/* Interactive feedback icons in options list */}
                          {phase === 'answer_result' && isCorrectAnswer && (
                            <Check className="w-5 h-5 text-emerald-600 shrink-0 stroke-[3]" />
                          )}
                          {phase === 'answer_result' && isSelected && !isCorrectAnswer && (
                            <X className="w-5 h-5 text-rose-600 shrink-0 stroke-[3]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Interactive response overlay result & explanations */}
                  <AnimatePresence>
                    {phase === 'answer_result' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-6 p-4 rounded-2xl border bg-[#F3F4F6] border-[#E5E7EB] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-10 text-[#1F2937]"
                      >
                        <div className="flex-grow space-y-1">
                          <div className="flex items-center flex-wrap gap-2">
                            {answerSuccess ? (
                              <span className="flex items-center gap-1 text-emerald-700 bg-[#E8F5E9] border border-emerald-200 px-2.5 py-1 rounded font-black text-xs">
                                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                                إجابة صحيحة!
                              </span>
                            ) : isTimeOut ? (
                              <span className="flex items-center gap-1 text-red-700 bg-[#FFEBEE] border border-red-200 px-2.5 py-1 rounded font-black text-xs">
                                <Clock className="w-3.5 h-3.5 text-red-600 animate-spin" />
                                انتهى وقت التفكير!
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-rose-700 bg-[#FFEBEE] border border-rose-200 px-2.5 py-1 rounded font-black text-xs">
                                <X className="w-3.5 h-3.5 text-rose-600 stroke-[3]" />
                                إجابة خاطئة!
                              </span>
                            )}

                            <span className="text-xs text-slate-500 font-bold">
                              الإصابة الصحيحة كانت الخيار: <strong className="text-[#4C35B5] font-black">{['أ', 'ب', 'ج', 'د'][currentQuestion.correctAnswerIndex]}</strong>
                            </span>
                          </div>

                          {currentQuestion.explanation && (
                            <div className="text-xs text-slate-700 leading-relaxed bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-2 flex items-start gap-1.5">
                              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <p className="font-semibold">{currentQuestion.explanation}</p>
                            </div>
                          )}
                        </div>

                        {/* Continue Button */}
                        <button
                          type="button"
                          onClick={handleNextTurn}
                          className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#4C35B5] hover:bg-[#4C35B5]/90 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer text-center"
                        >
                          <span>السـؤال التالي ودور الفريق القادم</span>
                          <ArrowRight className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* 2. Side Stage Console for lifelines (lg:4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  
                  {/* Active team focus card */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-md text-center shrink-0">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">الفريق الموجه إليه السؤال</span>
                    
                    <div className="my-3">
                      <span className="text-5xl inline-block p-4 rounded-2xl bg-slate-950/80 border border-slate-800 float-slow shadow-lg">
                        {teams[currentTeamIndex]?.avatar}
                      </span>
                    </div>

                    <h2 className="text-lg font-black text-white">
                      {teams[currentTeamIndex]?.name}
                    </h2>
                    
                    <p className="text-xs text-slate-400 mt-1">
                      الترتيب الحالي: المرتبة رقم {teams.map((t, idx) => ({ id: t.id, score: t.score, idx })).sort((a,b) => b.score - a.score).findIndex(x => x.id === teams[currentTeamIndex]?.id) + 1}
                    </p>

                    <div className="mt-2.5">
                      <span className="inline-block bg-[#FFD700] text-[#1F2937] text-[11px] px-3.5 py-1 font-black rounded-full shadow-md animate-pulse">
                        النقاط الحالية: {teams[currentTeamIndex]?.score} ن
                      </span>
                    </div>
                  </div>

                  {/* Lifelines board (لوحة تفعيل المساعدات) */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2.5">
                        <HelpCircle className="w-5 h-5 text-amber-400 animate-bounce" />
                        <h2 className="text-sm font-bold text-white">لوحة وسائل المساعدة المتوفرة</h2>
                      </div>
                      
                      <p className="text-xs text-slate-400 mb-4 leading-normal">
                        صممت لزيادة حدة المنافسة وتجنب الخروج الفوري. كل وسيلة مساعدة قابلة للاستخدام <strong>مرة واحدة فقط</strong> طيلة المسابقة لكل فريق.
                      </p>

                      <div className="space-y-3">
                        
                        {/* Lifeline 1: Delete Two (50:50) with Red-Orange #FF4500 12px rounded-xl styling */}
                        <button
                          type="button"
                          onClick={handleUse5050}
                          disabled={
                            teams[currentTeamIndex]?.lifelines.deleteTwoUsed || 
                            phase !== 'playing' || 
                            eliminatedIndices.length > 0
                          }
                          className={`w-full p-3.5 rounded-xl border-2 text-right transition-all flex items-center justify-between group cursor-pointer ${
                            teams[currentTeamIndex]?.lifelines.deleteTwoUsed 
                              ? 'bg-slate-950/40 border-slate-900 opacity-30 cursor-not-allowed text-slate-500'
                              : phase !== 'playing'
                              ? 'border-slate-800 text-slate-400 cursor-not-allowed opacity-80'
                              : 'bg-[#FF4500] hover:bg-[#FF8C00] border-[#FF4500] hover:scale-[1.01] hover:-translate-y-0.5 text-white shadow-lg shadow-[#FF4500]/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                              teams[currentTeamIndex]?.lifelines.deleteTwoUsed 
                                ? 'bg-slate-900 border-slate-950 text-slate-600'
                                : 'bg-white/10 border-white/20 text-white font-black group-hover:scale-105'
                            }`}>
                              <span className="text-xs font-black">50:50</span>
                            </div>
                            <div>
                              <span className="text-xs font-black block">حذف إجابتين تلقائيتين</span>
                              <span className="text-[10px] text-white/80 block mt-0.5 font-medium">تبقي على خيارين فقط لتسهيل الإجابة</span>
                            </div>
                          </div>
                          
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                            teams[currentTeamIndex]?.lifelines.deleteTwoUsed
                              ? 'bg-red-950/50 text-red-400 border border-red-900'
                              : 'bg-white text-[#FF4500]'
                          }`}>
                            {teams[currentTeamIndex]?.lifelines.deleteTwoUsed ? 'مستعملة ❌' : 'متاحة ✨'}
                          </span>
                        </button>

                        {/* Lifeline 2: Double Stakes with Red-Orange #FF4500 12px rounded-xl styling */}
                        <button
                          type="button"
                          onClick={handleUseDoublePoints}
                          disabled={
                            teams[currentTeamIndex]?.lifelines.doublePointsUsed || 
                            phase !== 'playing' || 
                            doublePointsActive
                          }
                          className={`w-full p-3.5 rounded-xl border-2 text-right transition-all flex items-center justify-between group cursor-pointer ${
                            teams[currentTeamIndex]?.lifelines.doublePointsUsed 
                              ? 'bg-slate-950/40 border-slate-900 opacity-30 cursor-not-allowed text-slate-500'
                              : phase !== 'playing'
                              ? 'border-slate-800 text-slate-400 cursor-not-allowed opacity-80'
                              : 'bg-[#FF4500] hover:bg-[#FF8C00] border-[#FF4500] hover:scale-[1.01] hover:-translate-y-0.5 text-white shadow-lg shadow-[#FF4500]/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                              teams[currentTeamIndex]?.lifelines.doublePointsUsed 
                                ? 'bg-slate-900 border-slate-950 text-slate-600'
                                : 'bg-white/10 border-white/20 text-white font-black group-hover:scale-105'
                            }`}>
                              <Zap className="w-4 h-4 fill-white text-white shrink-0" />
                            </div>
                            <div>
                              <span className="text-xs font-black block">مضاعفة نقاط السؤال جهاراً</span>
                              <span className="text-[10px] text-white/80 block mt-0.5 font-medium">تضاعف أرباح العلامة عند الإصابة</span>
                            </div>
                          </div>
                          
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                            teams[currentTeamIndex]?.lifelines.doublePointsUsed
                              ? 'bg-red-950/50 text-red-400 border border-red-900'
                              : 'bg-white text-[#FF4500]'
                          }`}>
                            {teams[currentTeamIndex]?.lifelines.doublePointsUsed ? 'مستعملة ❌' : 'متاحة ✨'}
                          </span>
                        </button>

                      </div>
                    </div>

                    {/* Game control info */}
                    <div className="mt-4 p-3 bg-slate-950/70 border border-slate-850 rounded-2xl text-[10px] text-slate-400 space-y-1.5 leading-normal">
                      <div className="flex justify-between">
                        <span>إجمالي الأسئلة المحملة:</span>
                        <strong className="text-slate-300">{questions.length} أسئلة متنوعة</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>نوع السؤال المعروض:</span>
                        <strong className="text-indigo-400">اختيار من متعدد (4 خيارات)</strong>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ==================================== */}
          {/* 3. GAME OVER / WINNER SCREEN (تتويج بطل المسابقة) */}
          {/* ==================================== */}
          {phase === 'game_over' && winnerTeam && (
            <motion.div
              key="gameover-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto bg-slate-900 border border-indigo-950 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative glow-gold overflow-hidden"
            >
              
              {/* Confetti Visualizer */}
              {soundEnabled && <Confetti />}

              <div className="relative z-10 space-y-6">
                
                {/* Winner Crown Banner */}
                <div className="mx-auto w-24 h-24 rounded-full bg-amber-500/10 border-4 border-amber-500 flex items-center justify-center animate-bounce shadow-lg float-slow">
                  <span className="text-6xl">{winnerTeam.avatar}</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs text-amber-400 font-extrabold tracking-widest block py-1 bg-amber-500/10 border border-amber-500/20 max-w-[140px] mx-auto rounded-full">
                    بطل المسابقة 👑
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {winnerTeam.name}
                  </h2>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    بعد منافسة قوية وحماسية استطاع الفريق انتزاع الصدارة وتخطي سقف النقاط القياسي!
                  </p>
                </div>

                {/* Main Scored Panel */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex justify-around items-center">
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{winnerTeam.score}</span>
                    <span className="text-[10px] text-slate-400 block">إجمالي النقاط المسجلة</span>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl font-black text-indigo-400 tracking-tight">{historyStats.totalRounds}</span>
                    <span className="text-[10px] text-slate-400 block">الجولات المستغرقة</span>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                      {Math.round((historyStats.correctCount / (historyStats.correctCount + historyStats.incorrectCount || 1)) * 100)}%
                    </span>
                    <span className="text-[10px] text-slate-400 block">دقة الأجوبة الإجمالية</span>
                  </div>
                </div>

                {/* Scoreboard stand-offs */}
                <div className="space-y-2.5">
                  <h3 className="text-xs text-right font-bold text-slate-400 px-1">الترتيب النهائي للفرق متبارية:</h3>
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                    {[...teams].sort((a,b) => b.score - a.score).map((t, idx) => (
                      <div 
                        key={t.id} 
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-sm ${idx === 0 ? 'bg-amber-500/5 border-amber-500/30' : 'bg-slate-950/50 border-slate-850'}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${idx === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                            {idx + 1}
                          </span>
                          <span className="text-lg">{t.avatar}</span>
                          <span className="font-extrabold text-white">{t.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white">{t.score} نقطة</span>
                          {idx === 0 && <span className="text-xs">🏆</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rematch trigger */}
                <div className="border-t border-slate-800 pt-5 flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setPhase('setup');
                    }}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-700 bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-900 transition-all text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>تغيير الإعدادات والفرق</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStartGame}
                    className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-950/50 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>أعد التحدي بنفس الإعدادات</span>
                  </button>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-indigo-950 bg-slate-950/60 py-4 text-center text-[10px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>تطبيق مسابقات الفرق الرقمي الاحترافي © 2026</span>
          <div className="flex items-center gap-3">
            <span>عدد أسئلة البنك: <strong className="text-slate-400">{QUESTIONS_BANK.length} سؤال</strong></span>
            <span>|</span>
            <span>صمم تلبيةً لمستويات التقييم المتقدمة</span>
          </div>
        </div>
      </footer>

    </div>
  </div>
  );
}

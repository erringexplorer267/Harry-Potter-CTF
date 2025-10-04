import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Star, Zap, Code, Clock, Trophy, Sparkles } from 'lucide-react';

const HarryPotterCTF = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState([0]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [attempts, setAttempts] = useState({});
  const [floatingSpells, setFloatingSpells] = useState([]);

  const levels = [
    {
      id: 0,
      name: "The Sorting Circuit",
      house: "Gryffindor",
      difficulty: "Easy",
      points: 100,
      question: "What is the output of a 2-input AND gate when both inputs are HIGH?",
      hint: "Think about when the gate allows current to pass through...",
      answer: "1",
      description: "Begin your journey at the Sorting Hat's chamber"
    },
    {
      id: 1,
      name: "Potions Class Logic",
      house: "Slytherin",
      difficulty: "Easy",
      points: 150,
      question: "In a half-adder circuit, which two outputs are produced?",
      hint: "One is the result, one is what you carry forward...",
      answer: "sum and carry",
      description: "Professor Snape's arithmetic challenges await"
    },
    {
      id: 2,
      name: "Charms of Multiplexing",
      house: "Ravenclaw",
      difficulty: "Medium",
      points: 200,
      question: "How many select lines are needed for an 8:1 multiplexer?",
      hint: "2^n = 8, solve for n...",
      answer: "3",
      description: "Flitwick's magical selection circuits"
    },
    {
      id: 3,
      name: "Defense Against Dark Circuits",
      house: "Hufflepuff",
      difficulty: "Medium",
      points: 250,
      question: "What type of flip-flop toggles its output when both inputs are 1?",
      hint: "It's named after its toggling behavior...",
      answer: "jk",
      description: "Protected storage elements await discovery"
    },
    {
      id: 4,
      name: "The Forbidden Forest of Karnaugh",
      house: "Gryffindor",
      difficulty: "Hard",
      points: 300,
      question: "In a K-map, what is the maximum number of cells that can be grouped for a 4-variable expression?",
      hint: "Think of the largest power of 2 within 16...",
      answer: "16",
      description: "Navigate the maze of logic minimization"
    },
    {
      id: 5,
      name: "The Chamber of Sequential Secrets",
      house: "Slytherin",
      difficulty: "Hard",
      points: 350,
      question: "What is the modulus of a counter with 6 states?",
      hint: "Modulus equals the number of unique states...",
      answer: "6",
      description: "Ancient sequential magic lies within"
    },
    {
      id: 6,
      name: "The Triwizard Memory Tournament",
      house: "Ravenclaw",
      difficulty: "Expert",
      points: 400,
      question: "How many address lines are needed to address 1KB of memory?",
      hint: "1KB = 1024 bytes, find log₂(1024)...",
      answer: "10",
      description: "The ultimate test of circuit mastery"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingSpells(prev => [...prev, {
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2
      }].slice(-10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    const level = levels[selectedLevel.id];
    const normalizedAnswer = answer.toLowerCase().trim();
    const correctAnswers = level.answer.toLowerCase().split(',').map(a => a.trim());
    
    if (correctAnswers.some(correct => normalizedAnswer === correct || normalizedAnswer.includes(correct))) {
      setScore(score + level.points);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      if (selectedLevel.id + 1 < levels.length && !unlockedLevels.includes(selectedLevel.id + 1)) {
        setUnlockedLevels([...unlockedLevels, selectedLevel.id + 1]);
        setCurrentLevel(selectedLevel.id + 1);
      }
      
      setAnswer('');
      setSelectedLevel(null);
    } else {
      setAttempts({...attempts, [selectedLevel.id]: (attempts[selectedLevel.id] || 0) + 1});
      alert('Incorrect! The magic fizzles... Try again!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const houseColors = {
    Gryffindor: 'from-red-900 to-yellow-800',
    Slytherin: 'from-green-900 to-emerald-800',
    Ravenclaw: 'from-blue-900 to-indigo-800',
    Hufflepuff: 'from-yellow-900 to-amber-800'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-black text-amber-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingSpells.map(spell => (
          <div
            key={spell.id}
            className="absolute w-2 h-2 bg-amber-400 rounded-full animate-pulse"
            style={{
              left: `${spell.left}%`,
              top: '-10px',
              animation: `fall ${8 + spell.delay}s linear forwards`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .glow-border {
          animation: glow 2s ease-in-out infinite;
        }
        .float-anim {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <header className="border-b-2 border-amber-600 bg-black bg-opacity-50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="text-amber-400 w-8 h-8" />
              <h1 className="text-3xl font-bold text-amber-400 tracking-wider">
                The Circuit Trials of Hogwarts
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-amber-900 bg-opacity-30 px-4 py-2 rounded-lg border border-amber-600">
                <Trophy className="text-amber-400 w-5 h-5" />
                <span className="font-semibold text-amber-300">{score} Points</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-900 bg-opacity-30 px-4 py-2 rounded-lg border border-blue-600">
                <Star className="text-blue-400 w-5 h-5" />
                <span className="font-semibold text-blue-300">Level {currentLevel + 1}/{levels.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-lg shadow-2xl border-2 border-green-400 glow-border">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-bold">Magic Successful! Level Unlocked!</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {!selectedLevel ? (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-amber-400 mb-4 float-anim inline-block">
                ⚡ Marauder's Map of Circuits ⚡
              </h2>
              <p className="text-amber-200 text-lg">
                "I solemnly swear that I am up to solving circuits"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((level) => {
                const isUnlocked = unlockedLevels.includes(level.id);
                const isCompleted = unlockedLevels.includes(level.id + 1) || (level.id === levels.length - 1 && score >= 400);
                
                return (
                  <div
                    key={level.id}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      isUnlocked 
                        ? `border-amber-500 bg-gradient-to-br ${houseColors[level.house]} bg-opacity-50 hover:scale-105 cursor-pointer shadow-xl hover:shadow-2xl` 
                        : 'border-gray-700 bg-gray-800 bg-opacity-50 cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => isUnlocked && setSelectedLevel(level)}
                  >
                    {isCompleted && (
                      <div className="absolute top-2 right-2 bg-green-500 rounded-full p-2 z-10">
                        <Star className="w-5 h-5 text-white fill-white" />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {isUnlocked ? (
                            <Unlock className="text-amber-400 w-6 h-6" />
                          ) : (
                            <Lock className="text-gray-500 w-6 h-6" />
                          )}
                          <span className="text-sm font-semibold text-amber-300">
                            Level {level.id + 1}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          level.difficulty === 'Easy' ? 'bg-green-600' :
                          level.difficulty === 'Medium' ? 'bg-yellow-600' :
                          level.difficulty === 'Hard' ? 'bg-orange-600' :
                          'bg-red-600'
                        }`}>
                          {level.difficulty}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-amber-100 mb-2">
                        {level.name}
                      </h3>
                      
                      <p className="text-amber-200 text-sm mb-4">
                        {level.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-amber-700">
                        <div className="flex items-center gap-2">
                          <Code className="w-4 h-4 text-amber-400" />
                          <span className="text-sm text-amber-300">{level.house}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-amber-400" />
                          <span className="text-sm font-bold text-amber-300">{level.points} pts</span>
                        </div>
                      </div>

                      {attempts[level.id] > 0 && (
                        <div className="mt-3 text-xs text-red-400">
                          Attempts: {attempts[level.id]}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedLevel(null)}
              className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-amber-300"
            >
              ← Back to Map
            </button>

            <div className={`bg-gradient-to-br ${houseColors[selectedLevel.house]} bg-opacity-70 rounded-xl border-2 border-amber-500 overflow-hidden shadow-2xl glow-border`}>
              <div className="bg-black bg-opacity-50 p-6 border-b-2 border-amber-600">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-amber-400">
                    {selectedLevel.name}
                  </h2>
                  <div className="flex gap-4">
                    <span className={`px-4 py-2 rounded-lg font-bold ${
                      selectedLevel.difficulty === 'Easy' ? 'bg-green-600' :
                      selectedLevel.difficulty === 'Medium' ? 'bg-yellow-600' :
                      selectedLevel.difficulty === 'Hard' ? 'bg-orange-600' :
                      'bg-red-600'
                    }`}>
                      {selectedLevel.difficulty}
                    </span>
                    <span className="px-4 py-2 bg-amber-600 rounded-lg font-bold">
                      {selectedLevel.points} Points
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-amber-300">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    <span>{selectedLevel.house} House</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Level {selectedLevel.id + 1}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="bg-black bg-opacity-40 rounded-lg p-6 mb-6 border border-amber-700">
                  <h3 className="text-xl font-bold text-amber-400 mb-4">
                    🔮 The Circuit Challenge
                  </h3>
                  <p className="text-lg text-amber-100 leading-relaxed">
                    {selectedLevel.question}
                  </p>
                </div>

                <div className="bg-blue-900 bg-opacity-30 rounded-lg p-4 mb-6 border border-blue-600">
                  <h4 className="text-sm font-bold text-blue-300 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Magical Hint
                  </h4>
                  <p className="text-sm text-blue-200">{selectedLevel.hint}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-300 font-semibold mb-2">
                      Cast Your Answer:
                    </label>
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your solution..."
                      className="w-full px-4 py-3 bg-black bg-opacity-50 border-2 border-amber-600 rounded-lg text-amber-100 placeholder-amber-700 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
                  >
                    ⚡ Cast Spell ⚡
                  </button>
                </div>

                {attempts[selectedLevel.id] > 0 && (
                  <div className="mt-4 text-center text-red-400 text-sm">
                    Previous attempts: {attempts[selectedLevel.id]}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-16 border-t-2 border-amber-600 bg-black bg-opacity-50 py-6">
        <div className="container mx-auto px-4 text-center text-amber-300">
          <p className="text-sm">
            "After all this time?" - "Always solving circuits." ⚡
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HarryPotterCTF;
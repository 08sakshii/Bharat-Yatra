// components/common/OnboardingTutorial.jsx - Interactive Onboarding

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const OnboardingTutorial = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(true);

  const steps = [
    {
      title: "Welcome to India Tourism! 🗺️",
      description: "Let's take a quick tour to help you get started with planning your perfect Indian adventure.",
      image: "🎉",
      highlight: null
    },
    {
      title: "Discover Places",
      description: "Browse and discover amazing tourist destinations across India. Use the map view or list view to explore.",
      image: "📍",
      highlight: "map-toggle"
    },
    {
      title: "Plan Your Route",
      description: "Select multiple places and our AI will optimize the best route for you, saving time and distance!",
      image: "🛣️",
      highlight: "plan-trip"
    },
    {
      title: "Keep a Travel Journal",
      description: "Document your journey with photos, notes, and memories. Link entries to routes for easy organization.",
      image: "📔",
      highlight: "journal"
    },
    {
      title: "You're All Set!",
      description: "Start exploring India's incredible destinations. Happy traveling!",
      image: "✨",
      highlight: null
    }
  ];

  useEffect(() => {
    // Check if user has seen tutorial
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenTutorial) {
      setShow(false);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setShow(false);
    if (onComplete) onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setShow(false);
  };

  if (!show) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-8 bg-primary'
                      : index < currentStep
                      ? 'w-2 bg-primary'
                      : 'w-2 bg-neutral-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleSkip}
              className="text-neutral-500 hover:text-neutral-700 text-sm font-semibold"
            >
              Skip
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="text-8xl mb-6">{step.image}</div>
          <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
            {step.title}
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            {step.description}
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentStep === 0
                ? 'text-neutral-400 cursor-not-allowed'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <span className="text-sm text-neutral-600">
            {currentStep + 1} of {steps.length}
          </span>

          <button
            onClick={handleNext}
            className="btn-primary flex items-center space-x-2"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            {currentStep === steps.length - 1 ? (
              <Check className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
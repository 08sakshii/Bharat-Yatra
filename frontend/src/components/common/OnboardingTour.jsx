// components/common/OnboardingTour.jsx - First-time User Tour

import { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';

const OnboardingTour = ({ page = 'explore' }) => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour
    const hasSeenTour = localStorage.getItem(`tour_${page}_seen`);
    if (!hasSeenTour) {
      setTimeout(() => setRun(true), 1000);
    }
  }, [page]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem(`tour_${page}_seen`, 'true');
      setRun(false);
    }
  };

  const tourSteps = {
    explore: [
      {
        target: 'body',
        content: 'Welcome to India Tourism! 🗺️ Let me show you around.',
        placement: 'center',
      },
      {
        target: '.map-view-toggle',
        content: 'Toggle between Map view and List view to explore places.',
      },
      {
        target: '.search-places',
        content: 'Search for specific places or filter by category.',
      },
      {
        target: '.place-card:first-child',
        content: 'Click on any place to see details, save it, or add to your trip!',
      },
      {
        target: 'a[href="/plan-trip"]',
        content: 'Ready to plan? Click here to create your custom route! ✈️',
      },
    ],
    plan: [
      {
        target: 'body',
        content: 'Let\'s plan your perfect trip! 🎯',
        placement: 'center',
      },
      {
        target: '.available-places',
        content: 'Browse available tourist places here.',
      },
      {
        target: '.route-builder',
        content: 'Selected places appear here. Drag to reorder them!',
      },
      {
        target: '.optimize-button',
        content: 'Click "Optimize Route" to find the shortest path! 🚀',
      },
      {
        target: '.save-route-button',
        content: 'Save your route to access it anytime from "My Routes".',
      },
    ],
    routes: [
      {
        target: 'body',
        content: 'Your saved routes live here! 📍',
        placement: 'center',
      },
      {
        target: '.route-card:first-child',
        content: 'Each card shows distance, time, and estimated costs.',
      },
      {
        target: '.view-details-button',
        content: 'View complete route details including cost breakdown.',
      },
      {
        target: '.write-note-button',
        content: 'Document your journey in your travel journal! 📔',
      },
    ],
    journal: [
      {
        target: 'body',
        content: 'Your personal travel diary! ✍️',
        placement: 'center',
      },
      {
        target: '.new-entry-button',
        content: 'Click here to create a new journal entry.',
      },
      {
        target: '.journal-stats',
        content: 'Track your travel statistics here.',
      },
      {
        target: '.entry-card:first-child',
        content: 'Your travel memories with photos, notes, and ratings!',
      },
    ],
  };

  const steps = tourSteps[page] || tourSteps.explore;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#0B6E66',
          textColor: '#1A202C',
          backgroundColor: '#ffffff',
          arrowColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: '#FF8C42',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: 600,
        },
        buttonBack: {
          color: '#0B6E66',
          marginRight: 10,
        },
        buttonSkip: {
          color: '#718096',
        },
        tooltip: {
          borderRadius: '12px',
          padding: '20px',
        },
        tooltipContent: {
          padding: '10px 0',
          fontSize: '15px',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip Tour',
      }}
    />
  );
};

export default OnboardingTour;
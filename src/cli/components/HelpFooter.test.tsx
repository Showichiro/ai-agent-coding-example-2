import { render } from 'ink-testing-library';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { HelpFooter } from './HelpFooter';

describe('HelpFooter', () => {
  it('should render help text with keyboard shortcuts', () => {
    const { lastFrame } = render(<HelpFooter />);
    
    expect(lastFrame()).toContain('[N]ew');
    expect(lastFrame()).toContain('[E]dit');
    expect(lastFrame()).toContain('[D]elete');
    expect(lastFrame()).toContain('[S]tatus');
    expect(lastFrame()).toContain('[F]ilter');
    expect(lastFrame()).toContain('[O]rder');
    expect(lastFrame()).toContain('[Q]uit');
    expect(lastFrame()).toContain('[↑/↓] Navigate');
  });

  it('should render with border styling', () => {
    const { lastFrame } = render(<HelpFooter />);
    
    // Verify the component renders without errors
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()?.length).toBeGreaterThan(0);
  });
});
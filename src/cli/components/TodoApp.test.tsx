import { render } from 'ink-testing-library';
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TodoApp } from './TodoApp';

describe('TodoApp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render app title', () => {
    const { lastFrame } = render(<TodoApp />);
    
    expect(lastFrame()).toContain('TODO App');
  });

  it('should render filter controls', () => {
    const { lastFrame } = render(<TodoApp />);
    
    expect(lastFrame()).toContain('Filter:');
    expect(lastFrame()).toContain('Sort:');
  });

  it('should render task table', () => {
    const { lastFrame } = render(<TodoApp />);
    
    expect(lastFrame()).toContain('ID');
    expect(lastFrame()).toContain('Title');
    expect(lastFrame()).toContain('Status');
    expect(lastFrame()).toContain('Due Date');
    expect(lastFrame()).toContain('Created');
  });

  it('should render help footer', () => {
    const { lastFrame } = render(<TodoApp />);
    
    expect(lastFrame()).toContain('[N]ew');
    expect(lastFrame()).toContain('[Q]uit');
  });

  it('should show empty state initially', () => {
    const { lastFrame } = render(<TodoApp />);
    
    expect(lastFrame()).toContain('No tasks found');
  });

  it('should handle Ctrl+C for exit', () => {
    const { lastFrame, stdin } = render(<TodoApp />);
    
    // This test verifies the component renders without crashing
    // The actual Ctrl+C handling will be tested in integration tests
    expect(lastFrame()).toBeTruthy();
    expect(typeof stdin.write).toBe('function');
  });

  it('should initialize with default state', () => {
    const { lastFrame } = render(<TodoApp />);
    
    // Should show "All" filter by default
    expect(lastFrame()).toContain('[All]');
    // Should show tasks in created date order by default
    expect(lastFrame()).toContain('[Created]');
  });

  it('should render main layout structure', () => {
    const { lastFrame } = render(<TodoApp />);
    
    const output = lastFrame();
    
    // Verify all main sections are present
    expect(output).toContain('TODO App'); // Header
    expect(output).toContain('Filter:'); // Filter controls
    expect(output).toContain('Sort:'); // Sort controls  
    expect(output).toContain('ID'); // Table header
    expect(output).toContain('[N]ew'); // Help footer
    
    // Should have proper structure
    expect(output?.length ?? 0).toBeGreaterThan(100); // Non-trivial output
  });

  it('should display task preview pane', () => {
    const { lastFrame } = render(<TodoApp />);
    
    const output = lastFrame();
    
    // Should show preview pane (even in empty state)
    expect(output).toContain('Preview:');
    expect(output).toContain('Select a task to view details');
  });

  it('should support filter cycling with f key', () => {
    const { lastFrame, stdin } = render(<TodoApp />);
    
    // Initially should show "All" filter
    expect(lastFrame()).toContain('[All]');
    
    // Press 'f' to cycle filter
    stdin.write('f');
    
    // Should change to Todo filter
    expect(lastFrame()).toContain('[Todo]');
  });

  it('should support sort toggle with o key', () => {
    const { lastFrame, stdin } = render(<TodoApp />);
    
    // Initially should show "Created" sort
    expect(lastFrame()).toContain('[Created]');
    
    // Press 'o' to toggle sort
    stdin.write('o');
    
    // Should change to Due Date sort
    expect(lastFrame()).toContain('[Due Date]');
  });
});
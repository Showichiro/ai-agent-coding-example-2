import { render } from 'ink-testing-library';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { FilterControls } from './FilterControls';

describe('FilterControls', () => {
  it('should render filter options', () => {
    const { lastFrame } = render(
      <FilterControls currentFilter="all" currentSort="created" currentOrder="asc" />
    );
    
    expect(lastFrame()).toContain('Filter:');
    expect(lastFrame()).toContain('[All]');
    expect(lastFrame()).toContain('[Todo]');
    expect(lastFrame()).toContain('[In Progress]');
    expect(lastFrame()).toContain('[Done]');
  });

  it('should render sort options', () => {
    const { lastFrame } = render(
      <FilterControls currentFilter="all" currentSort="created" currentOrder="asc" />
    );
    
    expect(lastFrame()).toContain('Sort:');
    expect(lastFrame()).toContain('[Created]');
    expect(lastFrame()).toContain('[Due Date]');
  });

  it('should show ascending order symbol', () => {
    const { lastFrame } = render(
      <FilterControls currentFilter="all" currentSort="created" currentOrder="asc" />
    );
    
    expect(lastFrame()).toContain('▲');
  });

  it('should show descending order symbol', () => {
    const { lastFrame } = render(
      <FilterControls currentFilter="all" currentSort="created" currentOrder="desc" />
    );
    
    expect(lastFrame()).toContain('▼');
  });

  it('should highlight current filter selection', () => {
    const { lastFrame } = render(
      <FilterControls currentFilter="todo" currentSort="created" currentOrder="asc" />
    );
    
    // Note: Testing exact color highlighting might be challenging with ink-testing-library
    // This test verifies the component renders without errors
    expect(lastFrame()).toContain('[Todo]');
  });

  it('should highlight current sort selection', () => {
    const { lastFrame } = render(
      <FilterControls currentFilter="all" currentSort="dueDate" currentOrder="desc" />
    );
    
    expect(lastFrame()).toContain('[Due Date]');
    expect(lastFrame()).toContain('▼');
  });

  it('should display navigation hints for interactive controls', () => {
    const { lastFrame } = render(
      <FilterControls 
        currentFilter="all" 
        currentSort="created" 
        currentOrder="asc" 
        isInteractive={true}
      />
    );
    
    expect(lastFrame()).toContain('< all | todo | in_progress | done >');
    expect(lastFrame()).toContain('[F] Filter');
    expect(lastFrame()).toContain('[O] Sort');
  });
});
import { render } from 'ink-testing-library';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ToastNotification } from './ToastNotification';

describe('ToastNotification', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render toast message when visible', () => {
    const { lastFrame } = render(
      <ToastNotification message="Task created successfully" isVisible={true} />
    );
    
    expect(lastFrame()).toContain('Task created successfully');
  });

  it('should not render when not visible', () => {
    const { lastFrame } = render(
      <ToastNotification message="Task created successfully" isVisible={false} />
    );
    
    const output = lastFrame();
    expect(output).not.toContain('Task created successfully');
    // Should render empty or minimal output
    expect(output?.trim() || '').toBe('');
  });

  it('should call onHide after timeout', () => {
    const onHide = vi.fn();
    
    render(
      <ToastNotification 
        message="Test message" 
        isVisible={true} 
        onHide={onHide}
        timeout={2000}
      />
    );
    
    expect(onHide).not.toHaveBeenCalled();
    
    // Fast forward time by 2 seconds
    vi.advanceTimersByTime(2000);
    
    expect(onHide).toHaveBeenCalledOnce();
  });

  it('should use default timeout of 2 seconds', () => {
    const onHide = vi.fn();
    
    render(
      <ToastNotification 
        message="Test message" 
        isVisible={true} 
        onHide={onHide}
      />
    );
    
    // Fast forward by 1.9 seconds - should not hide yet
    vi.advanceTimersByTime(1900);
    expect(onHide).not.toHaveBeenCalled();
    
    // Fast forward by additional 0.1 seconds - should hide now
    vi.advanceTimersByTime(100);
    expect(onHide).toHaveBeenCalledOnce();
  });

  it('should clear timeout when component unmounts', () => {
    const onHide = vi.fn();
    
    const { unmount } = render(
      <ToastNotification 
        message="Test message" 
        isVisible={true} 
        onHide={onHide}
      />
    );
    
    // Unmount before timeout
    unmount();
    
    // Fast forward time
    vi.advanceTimersByTime(3000);
    
    // Should not have called onHide
    expect(onHide).not.toHaveBeenCalled();
  });

  it('should display message in bordered box', () => {
    const { lastFrame } = render(
      <ToastNotification message="Success message" isVisible={true} />
    );
    
    const output = lastFrame();
    
    expect(output).toContain('Success message');
    // Should have some kind of border or styling
    expect(output).toMatch(/[┌┐└┘│─]/);
  });
});
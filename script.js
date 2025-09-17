// Frontend Mentor - Launch countdown timer solution

class CountdownTimer {
  constructor(targetDate) {
    this.targetDate = new Date(targetDate);
    this.elements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    };
    
    this.init();
  }
  
  init() {
    // Update immediately
    this.updateTimer();
    
    // Update every second
    this.interval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }
  
  updateTimer() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;
    
    if (distance < 0) {
      // Timer has expired
      this.elements.days.textContent = '00';
      this.elements.hours.textContent = '00';
      this.elements.minutes.textContent = '00';
      this.elements.seconds.textContent = '00';
      clearInterval(this.interval);
      return;
    }
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update DOM elements with formatted values
    this.elements.days.textContent = this.formatNumber(days);
    this.elements.hours.textContent = this.formatNumber(hours);
    this.elements.minutes.textContent = this.formatNumber(minutes);
    this.elements.seconds.textContent = this.formatNumber(seconds);
  }
  
  formatNumber(num) {
    return num.toString().padStart(2, '0');
  }
  
  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// Initialize countdown timer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set target date to 14 days from now (typical Frontend Mentor challenge duration)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 14);
  
  // Initialize the countdown timer
  const timer = new CountdownTimer(targetDate);
  
  // Add smooth entrance animation
  const container = document.querySelector('.container');
  container.style.opacity = '0';
  container.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    container.style.transition = 'all 0.8s ease';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 100);
  
  // Add flip animation effect when numbers change
  const flipCards = document.querySelectorAll('.flip-card-inner');
  let previousValues = {
    days: timer.elements.days.textContent,
    hours: timer.elements.hours.textContent,
    minutes: timer.elements.minutes.textContent,
    seconds: timer.elements.seconds.textContent
  };
  
  // Check for changes every second and add flip animation
  setInterval(() => {
    const currentValues = {
      days: timer.elements.days.textContent,
      hours: timer.elements.hours.textContent,
      minutes: timer.elements.minutes.textContent,
      seconds: timer.elements.seconds.textContent
    };
    
    Object.keys(currentValues).forEach((key, index) => {
      if (currentValues[key] !== previousValues[key]) {
        flipCards[index].style.animation = 'flip 0.6s ease-in-out';
        setTimeout(() => {
          flipCards[index].style.animation = '';
        }, 600);
      }
    });
    
    previousValues = { ...currentValues };
  }, 1000);
});

// Add CSS animation for flip effect
const style = document.createElement('style');
style.textContent = `
  @keyframes flip {
    0% { transform: rotateX(0); }
    50% { transform: rotateX(-90deg); }
    100% { transform: rotateX(0); }
  }
`;
document.head.appendChild(style);
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  // Scroll to authentication section
  scrollToAuth() {
    const authSection = document.querySelector('#auth-section');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Scroll to AI insights section
  scrollToAIInsights() {
    const aiSection = document.querySelector('#ai-insights-section');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Scroll to demo section
  scrollToDemo() {
    const demoSection = document.querySelector('#experience-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

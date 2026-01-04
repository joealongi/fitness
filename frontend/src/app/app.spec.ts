import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Api } from './api';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('App', () => {
  let mockApi: { getHealth: any; getNorseTest: any; postWorkout: any; getWorkouts: any };

  beforeEach(async () => {
    mockApi = {
      getHealth: vi.fn().mockReturnValue(of({})),
      getNorseTest: vi.fn().mockReturnValue(of({})),
      postWorkout: vi.fn(),
      getWorkouts: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: Api, useValue: mockApi }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Airwave');
  });
});

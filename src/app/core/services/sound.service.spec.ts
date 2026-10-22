import { TestBed } from '@angular/core/testing';
import { SoundService } from './sound.service';

describe('SoundService', () => {
  let service: SoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle mute state', () => {
    expect(service.muted).toBe(false);
    service.toggleMute();
    expect(service.muted).toBe(true);
    service.toggleMute();
    expect(service.muted).toBe(false);
  });

  it('should safely execute playClick without throwing', () => {
    expect(() => service.playClick()).not.toThrow();
  });
});

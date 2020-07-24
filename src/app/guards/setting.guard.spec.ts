import { TestBed } from '@angular/core/testing';

import { SettingGuard } from './setting.guard';

describe('SettingGuard', () => {
  let guard: SettingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SettingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

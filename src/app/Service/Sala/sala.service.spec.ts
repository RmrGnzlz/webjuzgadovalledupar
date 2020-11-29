import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastDefaults, SnotifyService } from 'ng-snotify';

import { SalaService } from './sala.service';

describe('SalaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule],
    providers: [],
  }));

  it('should be created', () => {
    const service: SalaService = TestBed.get(SalaService);
    expect(service).toBeTruthy();
  });
});

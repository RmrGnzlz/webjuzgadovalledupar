import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DespachoService } from './despacho.service';

describe('DespachoService', () => {
  let service: DespachoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DespachoService);
  });

  it('should be created sssss', () => {
    expect(service).toBeTruthy();
  });
});

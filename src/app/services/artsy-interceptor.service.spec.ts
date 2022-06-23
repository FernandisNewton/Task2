import { TestBed } from '@angular/core/testing';

import { ArtsyInterceptorService } from './artsy-interceptor.service';

describe('ArtsyInterceptorService', () => {
  let service: ArtsyInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtsyInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

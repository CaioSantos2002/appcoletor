import { TestBed } from '@angular/core/testing';

import { NomeProviderService } from './nome-provider.service';

describe('NomeProviderService', () => {
  let service: NomeProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomeProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

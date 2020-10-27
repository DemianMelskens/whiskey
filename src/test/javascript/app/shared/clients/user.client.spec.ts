import {TestBed} from '@angular/core/testing';
import {UserClient} from '../../../../../main/javascript/app/shared/clients/authentication.client';

describe('AuthenticationService', () => {
  let service: UserClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

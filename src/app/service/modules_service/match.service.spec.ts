import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchService, baseUrl } from './match.service';
import { Match } from './../../models/match.model';


describe('MatchService', () => {
  let service: MatchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MatchService]
    });
    service = TestBed.inject(MatchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an array of matches', () => {
      const mockMatches: Match[] = [
        { id: 1, homeTeam: 'Team 1', visitTeam: 'Team 2', date: new Date().toISOString() },
        { id: 2, homeTeam: 'Team 3', visitTeam: 'Team 4', date: new Date().toISOString() }
      ];

      service.getAll().subscribe(matches => {
        expect(matches.length).toBe(2);
        expect(matches).toEqual(mockMatches);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockMatches);
    });
  });

  describe('get', () => {
    it('should return a single match', () => {
      const mockMatch: Match = { id: 1, homeTeam: 'Team 1', visitTeam: 'Team 2', date: new Date().toISOString() };

      service.get(1).subscribe(match => {
        expect(match).toEqual(mockMatch);
      });

      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMatch);
    });
  });

  describe('create', () => {
    it('should create a new match', () => {
      const mockMatch: Match = { id: 1, homeTeam: 'Team 1', visitTeam: 'Team 2', date: new Date().toISOString() };

      service.create(mockMatch).subscribe(match => {
        expect(match).toEqual(mockMatch);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockMatch);
    });
  });

  describe('update', () => {
    it('should update an existing match', () => {
      const mockMatch: Match = { id: 1, homeTeam: 'Team 1', visitTeam: 'Team 2', date: new Date().toISOString() };

      service.update(1, mockMatch).subscribe(match => {
        expect(match).toEqual(mockMatch);
      });

      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockMatch);
    });
  });

  describe('delete', () => {
    it('should delete an existing match', () => {
      service.delete(1).subscribe(() => {
        // do nothing
      });

      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('deleteAll', () => {
    it('should delete all matches', () => {
      service.deleteAll().subscribe(() => {
        // do nothing
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});

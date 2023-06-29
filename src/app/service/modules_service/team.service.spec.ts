import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeamService, baseUrl } from './team.service';
import { Team } from './../../models/team.model';

describe('TeamService', () => {
  let service: TeamService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamService]
    });
    service = TestBed.inject(TeamService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an array of teams', () => {
      const teams: Team[] = [
        { id: 1, name: 'Team 1' },
        { id: 2, name: 'Team 2' }
      ];
      service.getAll().subscribe(data => {
        expect(data).toEqual(teams);
      });
      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(teams);
    });
  });

  describe('get', () => {
    it('should return a single team', () => {
      const team: Team = { id: 1, name: 'Team 1' };
      service.get(1).subscribe(data => {
        expect(data).toEqual(team);
      });
      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(team);
    });
  });

  describe('create', () => {
    it('should create a new team', () => {
      const team: Team = { id: 1, name: 'Team 1' };
      service.create(team).subscribe(data => {
        expect(data).toEqual(team);
      });
      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      req.flush(team);
    });
  });

  describe('update', () => {
    it('should update an existing team', () => {
      const team: Team = { id: 1, name: 'Team 1' };
      service.update(1, team).subscribe(data => {
        expect(data).toEqual(team);
      });
      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(team);
    });
  });

  describe('delete', () => {
    it('should delete an existing team', () => {
      service.delete(1).subscribe(data => {
        expect(data).toBeNull();
      });
      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('deleteAll', () => {
    it('should delete all teams', () => {
      service.deleteAll().subscribe(data => {
        expect(data).toBeNull();
      });
      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  // describe('findByName', () => {
  //   it('should return an array of teams with the given name', () => {
  //     const teams: Team[] = [
  //       { id: 1, name: 'Team 1' },
  //       { id: 2, name: 'Team 2' }
  //     ];
  //     service.findByName('Team 1').subscribe(data => {
  //       expect(data).toEqual([teams[0]]);
  //     });
  //     const req = httpMock.expectOne(`${baseUrl}?name=Team 1`);
  //     expect(req.request.method).toBe('GET');
  //     req.flush(teams);
  //   });
  // });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlayerService, baseUrl } from './player.service';
import { Player } from './../../models/player.model';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayerService]
    });
    service = TestBed.inject(PlayerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an array of players', () => {
      const mockPlayers: Player[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', team: 'New York' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', team: 'Los Angeles' }
      ];

      service.getAll().subscribe(players => {
        expect(players).toEqual(mockPlayers);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockPlayers);
    });
  });

  describe('get', () => {
    it('should return a player by id', () => {
      const mockPlayer: Player = { id: 1, firstName: 'John', lastName: 'Doe', team: 'New York' };

      service.get(1).subscribe(player => {
        expect(player).toEqual(mockPlayer);
      });

      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPlayer);
    });
  });

  describe('create', () => {
    it('should create a new player', () => {
      const mockPlayer: Player = { id: 1, firstName: 'John', lastName: 'Doe', team: 'New York' };

      service.create(mockPlayer).subscribe(player => {
        expect(player).toEqual(mockPlayer);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockPlayer);
    });
  });

  describe('update', () => {
    it('should update an existing player', () => {
      const mockPlayer: Player = { id: 1, firstName: 'John', lastName: 'Doe', team: 'New York' };

      service.update(1, mockPlayer).subscribe(player => {
        expect(player).toEqual(mockPlayer);
      });

      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockPlayer);
    });
  });

  describe('delete', () => {
    it('should delete a player by id', () => {
      service.delete(1).subscribe(() => {
        // do nothing
      });

      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('deleteAll', () => {
    it('should delete all players', () => {
      service.deleteAll().subscribe(() => {
        // do nothing
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('findBylastName', () => {
    it('should return an array of players with the given last name', () => {
      const mockPlayers: Player[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', team: 'New York' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', team: 'Los Angeles' }
      ];

      service.findBylastName('Doe').subscribe(players => {
        expect(players).toEqual(mockPlayers);
      });

      const req = httpMock.expectOne(`${baseUrl}?lastname=Doe`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPlayers);
    });
  });
});

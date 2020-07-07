import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataloaderService } from './dataloader.service';
import { Question, Adventure } from 'src/app/models/model';
import { environment } from 'src/environments/environment';

describe('DataloaderService', () => {
  let service: DataloaderService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DataloaderService);
    httpMock = TestBed.inject(HttpTestingController);
    environment.apiConfig = { extn: '', url: 'http://testlocation' };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAdventures', () => {
    it('should download the list of adventures', () => {
      service.getAdventures().subscribe(adventures => {
        expect(adventures).toBeTruthy();
        expect(adventures.length).toBeGreaterThan(0);
      });
      const adventureRequest = httpMock.expectOne('http://testlocation');
      adventureRequest.flush({ adventures: [new Adventure()] });
      httpMock.verify();
    });
  });

  describe('loadAdventure', () => {
    it('should download the adventure data', () => {
      service.loadAdventure('test-adventure').subscribe(questions => {
        expect(questions).toBeTruthy();
        expect(questions.length).toBeGreaterThan(0);
      });
      const adventureRequest = httpMock.expectOne('http://testlocation/test-adventure');
      adventureRequest.flush({ questions: [new Question()] });
      httpMock.verify();
    });
  });

  describe('getAdventure', () => {
    it('should throw error for invalid input', () => {
      expect(() => service.getAdventure('')).toThrowError();
      expect(() => service.getAdventure(undefined)).toThrowError();
      expect(() => service.getAdventure(null)).toThrowError();
    });

    it('should throw error if adventures are not loaded from server', () => {
      expect(() => service.getAdventure('test-adventure')).toThrowError();
    });

    it('should return null when adventure is not found in local cache', () => {
      // tslint:disable-next-line: prefer-const
      let data: Adventure[];
      service.getAdventures().subscribe(_ => data);
      const adventureRequest = httpMock.expectOne('http://testlocation');
      adventureRequest.flush({ adventures: [new Adventure()] });
      httpMock.verify();
      expect(service.getAdventure('test-adventure')).toBeNull();
    });

    it('should return adventure from local cache', () => {
      // tslint:disable-next-line: prefer-const
      let data: Adventure[];
      service.getAdventures().subscribe(_ => data);
      const adventureRequest = httpMock.expectOne('http://testlocation');
      const adventure: Adventure = { name: 'test-adventure', description: 'test adventure' };
      adventureRequest.flush({ adventures: [adventure] });
      httpMock.verify();
      expect(service.getAdventure('test-adventure')).toEqual(adventure);
    });

  });
});

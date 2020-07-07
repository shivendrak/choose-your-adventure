import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameComponent } from './game.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Adventure, Question } from 'src/app/models/model';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'dashboard', component: DashboardComponent }]),
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: (num) => 'test-adventure' } } }
        }
      ],
      declarations: [
        GameComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should attempt to initialise game', () => {
      spyOn(component, 'loadAdventure');
      expect(component.isLoading).toBeFalsy();
      fixture.detectChanges();
      expect(component.isLoading).toBeTrue();
      expect(component.loadAdventure).toHaveBeenCalled();
    });
  });

  describe('loadAdventure', () => {
    it('should navigate to dashboard if input param is invalid', () => {
      spyOn(component.dataLoaderService, 'getAdventure').and.returnValue(null);
      spyOn(component.router, 'navigate');
      component.loadAdventure();
      expect(component.router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should initialise current adventure if available', () => {
      const adventure = new Adventure();
      spyOn(component.dataLoaderService, 'getAdventure').and.returnValue(adventure);
      spyOn(component.dataLoaderService, 'loadAdventure').and.returnValue(of([]));
      spyOn(component.gameService, 'loadAdventure');
      spyOn(component.gameService, 'startAdventure');
      spyOn(component, 'beginGame');

      component.loadAdventure();
      expect(component.adventure).toEqual(adventure);
    });

    it('should initilise game service if input param is valid', () => {
      const question: Question = { id: 1, description: 'test question', options: [] };
      const questions = [question];
      const adventure: Adventure = { name: 'test-adventure', description: '' };
      spyOn(component.dataLoaderService, 'getAdventure').and.returnValue(adventure);
      spyOn(component.dataLoaderService, 'loadAdventure').and.returnValue(of(questions));
      spyOn(component.gameService, 'loadAdventure');
      spyOn(component.gameService, 'startAdventure');
      spyOn(component, 'beginGame');

      component.loadAdventure();
      expect(component.dataLoaderService.loadAdventure).toHaveBeenCalledWith('test-adventure');
      expect(component.gameService.loadAdventure).toHaveBeenCalledWith('test-adventure', questions);
      expect(component.gameService.startAdventure).toHaveBeenCalled();
      expect(component.beginGame).toHaveBeenCalled();
    });

    it('should subscribe to question change', () => {
      // TODO: add the test case.
    });
  });

  describe('onExit', () => {
    it('should end the game with game service', () => {
      // TODO: add the test case.
    });

    it('should navigate to dashboard', () => {
      // TODO: add the test case.
    });
  });

  describe('onStartOver', () => {
    it('should end the game with game service', () => {
      // TODO: add the test case.
    });

    it('should navigate to dashboard', () => {
      // TODO: add the test case.
    });

  });
});

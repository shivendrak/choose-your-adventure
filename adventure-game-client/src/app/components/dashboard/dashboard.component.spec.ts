import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Adventure } from 'src/app/models/model';
import { environment } from 'src/environments/environment';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should attempt to initialise adventures list', () => {
      spyOn(component, 'getAdventures');
      component.ngOnInit();
      expect(component.getAdventures).toHaveBeenCalled();
    });
  });

  describe('getAdventures', () => {
    it('should fetch all adventures on init', () => {
      const arrAdventures = [];
      arrAdventures.push(new Adventure());
      spyOn(component.dataLoadSvc, 'getAdventures').and.returnValue(of(arrAdventures));
      component.getAdventures();
      expect(component.adventures).not.toBeNull();
      expect(component.adventures.length).toEqual(1);
    });
  });

  describe('loadAdventure', () => {
    it('should navigate to game page with id', () => {
      environment.apiConfig = { extn: '', url: 'http://testlocation' };
      const adventure = new Adventure();
      adventure.name = 'test-advenure';
      spyOn(component.router, 'navigate');
      component.loadAdventure(adventure);
      expect(component.router.navigate).toHaveBeenCalledWith(['/game/test-advenure']);
    });
  });
});

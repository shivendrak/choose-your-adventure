import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultViewComponent } from './result-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Adventure } from 'src/app/models/model';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('ResultViewComponent', () => {
  let component: ResultViewComponent;
  let fixture: ComponentFixture<ResultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ResultViewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: (num) => 'test-adventure' } } }
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultViewComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.returnValue();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

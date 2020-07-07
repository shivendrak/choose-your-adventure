import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [WelcomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLogin', () => {
    it('should set error for blank field', () => {
      component.userName = '';
      spyOn(component.userService, 'setUserName');
      component.onLogin();
      expect(component.isError).toBeTrue();
      expect(component.userService.setUserName).not.toHaveBeenCalled();
    });

    it('should set username when field is set', () => {
      component.userName = 'test-user';
      spyOn(component.userService, 'setUserName');
      spyOn(component.router, 'navigate');
      component.onLogin();
      expect(component.isError).toBeFalsy();
      expect(component.userService.setUserName).toHaveBeenCalledWith(component.userName);
      expect(component.router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });
});

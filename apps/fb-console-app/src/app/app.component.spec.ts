import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import SpyObj = jasmine.SpyObj;


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(fakeAsync(() => {
  

    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: []     
    })
      .overrideComponent(AppComponent, {
        add: {
          imports: [
            //TODO RIMUOVERE override se non ho copmponenti da stubbare
          ]
        }
      })
      .compileComponents()
      .then(() => {
      });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('App component', fakeAsync(() => {

  }));
});

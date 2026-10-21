import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabNavComponent } from './tab-nav.component';

describe('TabNavComponent', () => {
  let component: TabNavComponent;
  let fixture: ComponentFixture<TabNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabNavComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activeTab', 'resume');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 navigation tabs', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.glass-tab-btn');
    expect(buttons.length).toBe(3);
  });

  it('should emit tabChange event when a tab is clicked', () => {
    const spy = vi.spyOn(component.tabChange, 'emit');
    component.selectTab('projects');
    expect(spy).toHaveBeenCalledWith('projects');
  });
});

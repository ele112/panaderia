import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlToDataComponent } from './xml-to-data.component';

describe('XmlToDataComponent', () => {
  let component: XmlToDataComponent;
  let fixture: ComponentFixture<XmlToDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmlToDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlToDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

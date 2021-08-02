import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropUploadComponent } from './drag-and-drop-upload.component';

describe('DragAndDropUploadComponent', () => {
  let component: DragAndDropUploadComponent;
  let fixture: ComponentFixture<DragAndDropUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

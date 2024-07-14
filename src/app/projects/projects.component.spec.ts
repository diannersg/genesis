import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import {NzModalRef} from "ng-zorro-antd/modal";
import createSpyObj = jasmine.createSpyObj;

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to update page', () => {
    component.updateCurrentPage([
      {id: '1', name: 'name', code: 'code', description: 'description'},
      {id: '2', name: 'name2', code: 'code2', description: 'description2'},
    ])
    expect(component.listOfCurrentPageData().length).toEqual(2);
  });

  it('should be able to open add modal', () => {
    component.addModal();
    const type = component.tabTitle[component.tab()]
    expect(component.form.controls.type.value).toEqual(type);
    expect(component.form.controls.code.enabled).toBeTrue();
    expect(component.isVisible).toBeTrue();
  });

  it('should be able to open edit modal', () => {
    component.editModal({id: '1', name: 'name', code: 'code', description: 'description'},);
    const type = component.tabTitle[component.tab()]
    expect(component.form.controls.type.value).toEqual(type);
    expect(component.form.controls.name.value).toEqual('name');
    expect(component.form.controls.code.disabled).toBeTrue();
    expect(component.isVisible).toBeTrue();
  });

  it('should be able to close modal', () => {
    component.closeModal();
    expect(component.isVisible).toBeFalse();
  });

  it('should be able to add project', () => {
    const data = {name: 'name', code: 'code', description: 'description'};
    component.form.patchValue(data);
    const modalRef = NzModalRef.prototype;
    const ref = spyOn(modalRef, 'destroy');
    component.submitForm(modalRef);
    expect(component.listOfData().length).toEqual(17);
    expect(component.isVisible).toBeFalse()
    expect(ref).toHaveBeenCalled();
  });

  it('should be able to update project', () => {
    const data = component.listOfData()[1];
    component.form.patchValue({
      ...data,
      name: 'name'
    });
    const modalRef = NzModalRef.prototype;
    const ref = spyOn(modalRef, 'destroy');
    component.submitForm(modalRef);

    expect(component.listOfData()[1].name).toEqual('name');
    expect(component.isVisible).toBeFalse()
    expect(ref).toHaveBeenCalled();
  });
});

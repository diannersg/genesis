import { Component, input, OnInit, signal} from '@angular/core';
import {
  NzCellBreakWordDirective,
  NzCustomColumnDirective,
  NzTableModule,
  NzThMeasureDirective
} from "ng-zorro-antd/table";
import {DatePipe, NgTemplateOutlet} from "@angular/common";
import { NzTabLinkTemplateDirective, NzTabsModule} from "ng-zorro-antd/tabs";
import {RouterLink} from "@angular/router";
import { NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {Project} from "./project.interface";
import { NzModalModule, NzModalRef} from "ng-zorro-antd/modal";
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  NzFormDirective,
  NzFormModule
} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzAutosizeDirective, NzInputDirective} from "ng-zorro-antd/input";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NzThMeasureDirective,
    NzTabsModule,
    NzTableModule,
    RouterLink,
    NzTabLinkTemplateDirective,
    NgTemplateOutlet,
    NzButtonModule,
    NzCustomColumnDirective,
    NzDividerComponent,
    NzCellBreakWordDirective,
    NzModalModule,
    DatePipe,
    NzFormDirective,
    ReactiveFormsModule,
    NzFormModule,
    NzColDirective,
    NzInputDirective,
    NzAutosizeDirective,
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit{
  readonly nameValidation = /^[\p{L}\p{N}.,\-'()\[\]"_&\s]{1,100}$/u;
  readonly codeValidation = /^[a-zA-Z0-9_-]{1,12}$/;
  readonly descriptionValidation = /^[\p{L}\p{N}.,?!:;'\-()\[\]_"& /<>]{0,2000}$/u;

  type = input();
  tab = input(0, {
    transform: (value) => value === 'development' ? 0 : 1
  })
  listOfData = signal<Project[]>([]);
  listOfCurrentPageData = signal<Project[]>([]);

  isVisible = false;
  modalAction = '';
  form: FormGroup<{
    id: FormControl<string | null>;
    type: FormControl<string>;
    name: FormControl<string>;
    code: FormControl<string>;
    description: FormControl<string | null>;
  }>

  pageSize = 5;
  pageIndex =  1;
  tabTitle = [
    $localize`Model Development`,
    $localize`Model Validation`
  ]
  columns: string[] = [
    $localize`Name`,
    $localize`Code`,
    $localize`Description`,
    $localize`Created`,
    $localize`Actions`,
  ]

  constructor(
  ) {
    this.form = new FormGroup({
      id: new FormControl(''),
      type: new FormControl({value: '', disabled: true}, {nonNullable: true}),
      name: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.pattern(this.nameValidation)]}),
      code: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.pattern(this.codeValidation)]}),
      description: new FormControl('', [Validators.pattern(this.descriptionValidation)]),
    });
  }

  ngOnInit(): void {
    const list = Array.from({ length: 16 }, (_, k) => {
      const num = (k + 1) > 9 ? k + 1 : '0' + (k + 1);
      return {
        id: `${num}`,
        name: $localize`Project ${k + 1}`,
        code: $localize`PROJECT_${k + 1}`,
        description: $localize`This is project ${k + 1}`,
        created: `2024-01-${num}T${num}:00:00.00Z`
      }
    });
    this.listOfData.update(() => list);
  }

  updateCurrentPage(list: ReadonlyArray<Project>): void {
    this.listOfCurrentPageData.update(() => list.map(list => list));
  }

  addModal() {
    this.modalAction = $localize`Add Genesis Project`
    this.form.patchValue({
      type: this.tabTitle[this.tab()]
    });
    this.form.controls.code.enable();
    this.isVisible = true;
  }

  editModal(data: Project) {
    this.modalAction = $localize`Edit Genesis Project`;
    this.form.patchValue({
      ...data,
      type: this.tabTitle[this.tab()]
    });
    this.form.controls.code.disable();
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  submitForm(ref: NzModalRef) {
    if (this.form.valid) {
      const value = this.form.getRawValue() as Project;

      if (value.id) {
        this.updateProject(value);
      } else {
        this.addProject(value)
      }

      ref.destroy();
    }
  }

  private addProject(value: Project) {
    const newProject: Project = {
      id: `${this.listOfData().length + 1}`,
      name: value.name,
      code: value.code,
      description: value.description,
      created: new Date().toISOString()
    }
    this.listOfData.update((list) => [...list, newProject]);
    this.pageIndex = Math.ceil(this.listOfData().length / this.pageSize);
    this.form.reset();
  }

  private updateProject(value: Project) {
    this.listOfData.update((list) => {
      const newList = [...list];
      const index = newList.findIndex(item => item.id === value.id)
      if (index > -1) {
        newList[index] = {
          ...value,
          created: newList[index].created
        }
      }

      return newList
    })

    this.form.reset();
  }
}

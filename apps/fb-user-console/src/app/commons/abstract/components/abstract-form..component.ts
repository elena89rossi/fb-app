import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

export abstract class AbstractFormComponent<T>{
  public form!: FormGroup;
  protected  destroy$: Subject<boolean> = new Subject<boolean>()
  protected constructor(
    protected formBuilder: FormBuilder,
    protected itemId: number | null
  ) {}

  public get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  protected markAllAsTouched(): void {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  protected clear(): void {
    this.form.reset();
    this.form.markAsPristine();
    if (this.itemId) {
      this.handleFormForEdit(this.itemId);
    }
  }


  private checkBeforeSave() {
    if (!this.form.invalid) {
      this.save();
    } else {
      this.markAllAsTouched();
    }
  }

  protected abstract initializeForm(): void;

  protected abstract save(): void;

  protected abstract handleFormForEdit(id: number): void;

  protected abstract getControlsConfig(): { [key: string]: FormControl };

  protected abstract setFormValue(baseEntity: object): void;

  protected abstract getSavePrivileges(privilege: string): string[];
}

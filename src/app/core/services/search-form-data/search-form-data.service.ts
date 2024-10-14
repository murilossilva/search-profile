import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SearchFormDataService {
  private _searchProfileForm: FormGroup = new FormGroup({
    searchProfileForm: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(39),
      this.checkIfUsernameIsStandardized()
    ]),
  });

  checkIfUsernameIsStandardized(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value;

        const hasSpecialCharacters = /[^a-zA-Z0-9-]/g.test(value);
        const checkHiphenPosition = /(-)$|^(-)|--/.test(value);

        const isValid = hasSpecialCharacters || checkHiphenPosition;

        return isValid ? { validate: true } : null;
    }
  }

  public get getCurrentFormGroupSearchProfile(): FormGroup {
    return this._searchProfileForm;
  }
}

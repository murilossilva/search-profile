import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchFormDataService } from '../search-form-data/search-form-data.service';

@Injectable({
    providedIn: 'root'
})
export class SearchFormService {
    constructor(
        private _searchFormDataService: SearchFormDataService
    ) {}

    get hasSpecialStrings() {
        return this.currentSearchFieldForm.controls['searchProfileForm'].value.match(/[^a-zA-Z0-9-]/g)
    }

    get getHiphensPosition() {
        return this.currentSearchFieldForm.controls['searchProfileForm'].value.match('(-)$|^(-)|--')
    }

    get currentSearchFieldForm(): FormGroup {
        return this._searchFormDataService.getCurrentFormGroupSearchProfile;
    }
    
    public validateField() {
        if (
            this.currentSearchFieldForm.controls['searchProfileForm'].value === null ||
            this.currentSearchFieldForm.controls['searchProfileForm'].value === '' ||
            this.currentSearchFieldForm.controls['searchProfileForm'].value === undefined ||
            this.currentSearchFieldForm.controls['searchProfileForm'].value.length > 39 ||
            this.hasSpecialStrings ||
            this.getHiphensPosition
        ) {
            return false
        }
        return true
    }
}
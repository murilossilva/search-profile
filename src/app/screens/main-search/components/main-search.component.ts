import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchFormService } from 'src/app/core/services/search-form/search-form.service';
import { map } from 'rxjs';
import { SearchReposService } from 'src/app/core/services/search-repos/search-repos.service';
import { Router } from '@angular/router';
import { IRepoDetails } from 'src/app/core/interfaces/repo-details.interface';
import { CacheRepositoriesService } from 'src/app/core/services/cache-repos/cache-repos.service';

@Component({
  selector: 'ui-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
})
export class MainSearchComponent implements OnInit {
  searchIcon = faSearch;
  infoIcon = faInfoCircle;

  searchForm: FormGroup = this._searchFormService.currentSearchFieldForm;
  isFormValid: boolean = undefined;
  retrySendRequest: boolean = false;
  tooltipEnable: boolean = false;

  isLoading$ = this._searchRepositoriesService.loading$.pipe(
    map((loading) => {
      return loading;
    })
  );

  isError$ = this._searchRepositoriesService.error$.pipe(
    map((error) => {
      return error;
    })
  );

  isUserInexistentError$ =
    this._searchRepositoriesService.inexistentUserError$.pipe(
      map((userError) => {
        return userError;
      })
    );

  isConnectionError$ = this._searchRepositoriesService.connectionError$.pipe(
    map((connectionError) => {
      this.retrySendRequest = connectionError;
      return connectionError;
    })
  );

  hasUserInCache$ = this._cacheRepositoriesService.cacheUser$.pipe(
    map((hasCache) => {
      return hasCache;
    })
  );

  private get getUsername() {
    return this.searchForm?.controls['searchProfileForm'].value;
  }

  constructor(
    private _searchFormService: SearchFormService,
    private _searchRepositoriesService: SearchReposService,
    private _cacheRepositoriesService: CacheRepositoriesService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  validateSearchField() {
    this.isFormValid = this._searchFormService.validateField();
  }

  searchProfile() {
    if (
      this.isFormValid &&
      (this.getUsername !== this._searchRepositoriesService.requestUsername ||
        this.retrySendRequest)
    ) {
      this._searchRepositoriesService
        .requestToSearchUser(this.getUsername)
        .subscribe(
          (next: IRepoDetails[]) => {
            next ? this._router.navigateByUrl('result') : '';
          },
          (error) => {
            console.log('error', error);
            if (error['status'] == 0) {
              this._cacheRepositoriesService.checkIfHasDataInCache(
                this.getUsername
              );

              this.hasUserInCache$.subscribe((hasCache) => {
                hasCache
                  ? this._router.navigateByUrl('result')
                  : this._searchRepositoriesService.setConnectionError();
              });
            } else if (error['status'] == 404) {
              this._searchRepositoriesService.setInexistentUserError();
            } else {
              this._searchRepositoriesService.setError();
            }
            this._searchRepositoriesService.unsetLoading();
          }
        );
    }
  }

  showTooltip() {
    this.tooltipEnable = !this.tooltipEnable
  }
}

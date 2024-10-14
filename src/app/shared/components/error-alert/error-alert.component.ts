import { Component, Input, OnInit } from '@angular/core';
import { faExclamationCircle, faWifi, faXmark } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { SearchReposService } from 'src/app/core/services/search-repos/search-repos.service';

@Component({
  selector: 'ui-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent implements OnInit {
  @Input() showAlert: boolean;
  
  isConnectionError$ = this._searchReposService.connectionError$.pipe(
    map((connectionError) => {
      return connectionError;
    }
  ));

  isUserInexistentError$ = this._searchReposService.inexistentUserError$.pipe(
    map((userError) => {
      return userError;
    }
  ));

  isError$ = this._searchReposService.error$.pipe(
    map((error) => {
      return error;
    }
  ));

  exclamationCircleIcon = faExclamationCircle;
  xMarkIcon = faXmark;
  wifiIcon = faWifi;
  
  constructor(
    private _searchReposService: SearchReposService
  ) { }

  ngOnInit(): void {}

  closeAlert() {
    this.showAlert = false;
  }
}

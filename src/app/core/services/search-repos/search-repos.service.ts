import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { apiDomains } from 'src/app/shared/enums/api-domains';
import { environment } from 'src/environments/environment';
import { RepoData } from '../../models/repo-data.model';
import { IRepoDetails } from '../../interfaces/repo-details.interface';
import { IUserDetails } from '../../interfaces/user-details.interface';
import { UserData } from '../../models/user-data.model';

@Injectable({
  providedIn: 'root',
})
export class SearchReposService {
  private _searchRepoData: RepoData = new RepoData();
  private _userRepoData: UserData = new UserData();

  baseUrl: string = environment.API_URL;
  requestUsername: string;

  private _loadingSubject = new BehaviorSubject(false);
  loading$ = this._loadingSubject.asObservable();

  private _errorSubject = new BehaviorSubject(false);
  error$ = this._errorSubject.asObservable();

  private _inexistentUserErrorSubject = new BehaviorSubject(false);
  inexistentUserError$ = this._inexistentUserErrorSubject.asObservable();

  private _connectionErrorSubject = new BehaviorSubject(false);
  connectionError$ = this._connectionErrorSubject.asObservable();

  get repoData() {
    return this._searchRepoData;
  }

  get userData() {
    return this._userRepoData;
  }

  constructor(
    private _httpClient: HttpClient
  ) {}

  // busca o usuário
  requestToSearchUser(username: string): Observable<IRepoDetails[]> {
    this.resetSubjectsOnRequest();
    this.requestUsername = username;

    return this._httpClient
      .get<IUserDetails>(
        this.baseUrl +
          apiDomains.USERS_PATH +
          username
      )
      .pipe(
        switchMap((response: IUserDetails) => {
          this._loadingSubject.next(false);
          this._userRepoData.setUserData(response);
          return this.requestToSearchRepositories(response);
        })
      )
  }

  // busca repositórios do usuário
  requestToSearchRepositories(userInfos: IUserDetails): Observable<IRepoDetails[]> {
    return this._httpClient.get<IRepoDetails[]>(
      userInfos.repos_url
    ).pipe(
      map((response: IRepoDetails[]) => {
        this._searchRepoData.setRepoData(response)
        return response
      })
    )
  }

  resetSubjectsOnRequest() {
    this._loadingSubject.next(true);
    this._errorSubject.next(false);
    this._inexistentUserErrorSubject.next(false);
    this._connectionErrorSubject.next(false);
  }

  unsetLoading() {
    this._loadingSubject.next(false);
  }

  setError() {
    this._errorSubject.next(true);
  }

  setInexistentUserError() {
    this._inexistentUserErrorSubject.next(true);
  }

  setConnectionError(){
    this._connectionErrorSubject.next(true);
  }
}

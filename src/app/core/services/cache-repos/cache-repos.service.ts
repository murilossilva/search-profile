import { Injectable } from '@angular/core';
import { RepoData } from '../../models/repo-data.model';
import { IUserDetails } from '../../interfaces/user-details.interface';
import { UserData } from '../../models/user-data.model';
import { SearchReposService } from '../search-repos/search-repos.service';
import { BehaviorSubject } from 'rxjs';
import { IRepoDetails } from '../../interfaces/repo-details.interface';

@Injectable({
  providedIn: 'root',
})
export class CacheRepositoriesService {
  private _searchRepoData: RepoData
  private _userRepoData: UserData

  private _cacheUserSubject = new BehaviorSubject(false);
  cacheUser$ = this._cacheUserSubject.asObservable();

  get userData() {
    return this._userRepoData;
  }

  constructor(
    private _searchRepoService: SearchReposService
  ) {}

  // busca o usuário em cache
  checkIfHasDataInCache(username: string) {
    this._cacheUserSubject.next(false);
    this._userRepoData = this._searchRepoService.userData;
    this._searchRepoData = this._searchRepoService.repoData;

    const CACHED_USERS: IUserDetails[] = JSON.parse(localStorage.getItem('userDetails'))
    const CACHED_REPOS: IRepoDetails[] = JSON.parse(localStorage.getItem('repoDetails'));

    let userRepos: IRepoDetails[] = []
    
    CACHED_USERS?.forEach((user) => {
      if(user.login == username) {
        this._userRepoData.setUserData(user);
        this._cacheUserSubject.next(true);
      }
    });
    
    CACHED_REPOS?.forEach((cachedRepo) => {
      if(cachedRepo.owner.login == username) {
        userRepos.push(cachedRepo);
      }
    });

    this._searchRepoData.setRepoData(userRepos);
  }
}

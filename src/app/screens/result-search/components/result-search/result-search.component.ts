import { Component, OnInit } from '@angular/core';
import { RepoData } from 'src/app/core/models/repo-data.model';
import { UserData } from 'src/app/core/models/user-data.model';
import { SearchReposService } from 'src/app/core/services/search-repos/search-repos.service';
import { faLocationDot, faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';

@Component({
  selector: 'ui-main-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss'],
})
export class ResultSearchComponent implements OnInit {
  followIcon = faUserPlus;
  starIcon = faStar;
  locationIcon = faLocationDot;

  private repoData: RepoData;
  private userData: UserData;

  isConnectionError$ = this._searchRepositoriesService.connectionError$.pipe(
    map((connectionError) => {
      return connectionError;
    })
  );

  get numberOfStars() {
    return this.repoData.repoStars;
  }

  get repositories() {
    return this.repoData.repoDetails;
  }

  get userDetails() {
    return this.userData.userDetails;
  }

  constructor(
    private _searchRepositoriesService: SearchReposService
  ) {}

  ngOnInit(): void {
    this.repoData = this._searchRepositoriesService.repoData;
    this.userData = this._searchRepositoriesService.userData;
  }
  
}

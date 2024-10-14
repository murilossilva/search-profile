import { Component, OnInit } from '@angular/core';
import { RepoData } from 'src/app/core/models/repo-data.model';
import { UserData } from 'src/app/core/models/user-data.model';
import { SearchReposService } from 'src/app/core/services/search-repos/search-repos.service';
import { faLocationDot, faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons';

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
    private _searchReposService: SearchReposService
  ) {}

  ngOnInit(): void {
    this.repoData = this._searchReposService.repoData;
    this.userData = this._searchReposService.userData;
  }
  
}

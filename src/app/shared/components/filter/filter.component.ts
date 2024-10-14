import { Component, Input, OnInit } from '@angular/core';
import { faFilter, faSortAlphaAsc, faSortAlphaDesc, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { IRepoDetails } from 'src/app/core/interfaces/repo-details.interface';

@Component({
  selector: 'ui-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() repoData: IRepoDetails[]
  hasFiltersToShow: boolean;

  starIcon = faStar;
  starHalfIcon = faStarHalfAlt;
  alphaAsc = faSortAlphaAsc;
  alphaDesc = faSortAlphaDesc;
  filterIcon = faFilter;

  ngOnInit(): void {}

  showFilters() {
    this.hasFiltersToShow = !this.hasFiltersToShow
  }

  orderByStarAsc() {
    this.repoData.sort((a, b) => {
      if(a.stargazers_count < b.stargazers_count) {
        return 1
      } else if (a.stargazers_count > b.stargazers_count) {
        return -1
      } else {
        return 0
      }
    })
  }

  orderByStarDesc() {
    this.repoData.sort((a, b) => {
      if(a.stargazers_count > b.stargazers_count) {
        return 1
      } else if (a.stargazers_count < b.stargazers_count) {
        return -1
      } else {
        return 0
      }
    })
  }

  orderByNameAsc() {
    this.repoData.sort((a, b) => {
      if(a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1
      } else if (a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase()) {
        return -1
      } else {
        return 0
      }
    })
  }

  orderByNameDesc() {
    this.repoData.sort((a, b) => {
      if(a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase()) {
        return 1
      } else if (a.name.toLocaleUpperCase() > b.name.toLocaleUpperCase()) {
        return -1
      } else {
        return 0
      }
    })
  }
}

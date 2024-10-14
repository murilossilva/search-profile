import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IRepoDetails } from 'src/app/core/interfaces/repo-details.interface';
import { SearchReposService } from 'src/app/core/services/search-repos/search-repos.service';

@Component({
  selector: 'ui-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss'],
})
export class RepoCardComponent implements OnInit {
  @Input() repoData: IRepoDetails

  starIcon = faStar

  constructor(
  ) {}

  ngOnInit(): void {
  }
}

  

import { ICacheRepoDetails, IRepoDetails } from "../interfaces/repo-details.interface";

export class RepoData {
    private _repoDetails: IRepoDetails[];
    private _repoStars: number = 0;

    get repoDetails() {
        return this._repoDetails;
    }

    get repoStars() {
        return this._repoStars;
    }

    setRepoData(repoDetails: IRepoDetails[]) {
        this._repoDetails = repoDetails
        this._repoStars = 0;

        if(repoDetails.length > 0) {
            this.setRepoDetailsInStorage(repoDetails);
        }

        this.countRepoStars();
    }

    countRepoStars() {
        this._repoDetails.forEach((repo) => {
            this._repoStars += repo.stargazers_count;
        })
    }

    setRepoDetailsInStorage(repoDetails: IRepoDetails[]) {
        const CACHE_REPO_DATA: IRepoDetails[] = JSON.parse(localStorage.getItem('repoDetails'));

        let index = CACHE_REPO_DATA?.findIndex( (repo) => repo.owner.login == repoDetails[0].owner.login )

        if(index == -1) {
            repoDetails.forEach((repo) => {
                CACHE_REPO_DATA.push(repo);
            })

            localStorage.setItem('repoDetails', JSON.stringify(CACHE_REPO_DATA));
        }
        else if(index > -1) {
            CACHE_REPO_DATA.forEach((cacheRepo, index) => {
                if(cacheRepo.owner.login == repoDetails[0].owner.login) {
                    CACHE_REPO_DATA.splice(index);
                }
            })

            repoDetails.forEach((repo) => {
                CACHE_REPO_DATA.push(repo)
            })

            localStorage.setItem('repoDetails', JSON.stringify(CACHE_REPO_DATA));
        }

        if (!CACHE_REPO_DATA) {
            localStorage.setItem('repoDetails', JSON.stringify(repoDetails));
        }
    }
}
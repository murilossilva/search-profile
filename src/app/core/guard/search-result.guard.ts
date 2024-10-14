import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { SearchReposService } from "../services/search-repos/search-repos.service"

export const searchGuard = () => {
    const searchReposService = inject(SearchReposService);
    const router = inject(Router);

    if(Object.keys(searchReposService.userData).length !== 0) {
        return true;
    } else {
        router.navigateByUrl('');
        return false;
    }
}
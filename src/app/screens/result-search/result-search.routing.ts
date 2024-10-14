import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ResultSearchComponent } from "./components/result-search/result-search.component";
import { searchGuard } from "src/app/core/guard/search-result.guard";

const routes: Routes = [
    { path: '', component: ResultSearchComponent, canActivate: [searchGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ResultSearchRouting {}
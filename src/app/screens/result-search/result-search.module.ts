import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { ResultSearchRouting } from "./result-search.routing";
import { ResultSearchComponent } from "./components/result-search/result-search.component";
import { RepoCardComponent } from "./components/repo-card/repo-card.component";

@NgModule({
    declarations: [
        ResultSearchComponent,
        RepoCardComponent
    ],
    imports: [
        ResultSearchRouting,
        SharedModule
    ],
    exports: [],
    providers: []
})

export class ResultSearchModule {}
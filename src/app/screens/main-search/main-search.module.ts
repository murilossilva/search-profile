import { NgModule } from "@angular/core";
import { MainSearchComponent } from "./components/main-search.component";
import { MainSearchRouting } from "./main-search.routing";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [
        MainSearchComponent
    ],
    imports: [
        MainSearchRouting,
        SharedModule
    ],
    exports: [],
    providers: []
})

export class MainSearchModule {}
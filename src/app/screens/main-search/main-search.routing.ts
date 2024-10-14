import { RouterModule, Routes } from "@angular/router";
import { MainSearchComponent } from "./components/main-search.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: MainSearchComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainSearchRouting {}
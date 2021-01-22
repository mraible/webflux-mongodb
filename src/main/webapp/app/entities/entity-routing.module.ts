import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'division',
        data: { pageTitle: 'sampleWebfluxMongodbApp.testRootDivision.home.title' },
        loadChildren: () => import('./test-root/division/division.module').then(m => m.DivisionModule),
      },
      {
        path: 'place',
        data: { pageTitle: 'sampleWebfluxMongodbApp.testRootPlace.home.title' },
        loadChildren: () => import('./test-root/place/place.module').then(m => m.PlaceModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}

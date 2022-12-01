import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post, Query } from './types';

@Component({
  selector: 'app-list',
  template: `
  <main>
  <section step class="step present">
    <div class="form-container">
      <header>
        <h2>{{ 'Test Button' }}</h2>
      </header>

      <ul class="present__options" (click)="clickHandler($event)">
        <li class="google present__option present__option-active">
          <button class="present__btn btn">
            <span class="present__btn-text" >Test GraphQL</span>
          </button>
        </li>
      </ul>

    </div>
  </section>
</main>


  `,
})
export class ListComponent implements OnInit {
  posts: Observable<Post[]>;
  graphQlData: any;
  loadingGraphQL: any;
  error: any;
  public geoJSON: string = `{"type":"Polygon","coordinates":[[[526231.2106596666,6099691.205136125],[526231.2106596666,6100106.614643483],[526898.2189536168,6100106.614643483],[526898.2189536168,6099691.205136125],[526231.2106596666,6099691.205136125]]]}`;

  constructor(private apollo: Apollo) {}



  public clickHandler(event: any) {
    console.log('hello world');
    const result$ = this.executeGeographicSearchQueryTotalCountForPagination(this.geoJSON);
    result$.subscribe((res) => {
      console.log('Result', res)
    })
  }


  public executeGeographicSearchQueryTotalCountForPagination(geoJSON: string) {
    //sessionStorage.setItem('signedToken', JSON.stringify(this.authService.getTokenForGraphQL()))

    const coordinates = JSON.parse(geoJSON).coordinates;
    // this.setSearchQueryFilters(payLoad);
    const query = gql`
    query (
        $searchCoordinates: [[Position]],
        )
    {
    vurderingsejendomNuPolygon(searchArea: { 
        type: Polygon, 
        coordinates: $searchCoordinates,
        crs: 25832 })
        {
            totalCount
        }
    }
    `;
    console.log(query);
    var subject = new Subject<any>();
    this.apollo
      .query<any>({
        query: query,
        variables: {
          searchCoordinates: coordinates,
        },
        fetchPolicy: 'no-cache',
      })

      .subscribe(({ data, loading, errors }) => {
        this.graphQlData = data;
        this.loadingGraphQL = loading;
        this.error = errors;
        subject.next(this.graphQlData);
      });
    return subject.asObservable();
  }

  ngOnInit() {
    // this.posts = this.apollo
    //   .watchQuery<Query>({
    //     query: gql`
    //       query allPosts {
    //         posts {
    //           id
    //           title
    //           votes
    //           author {
    //             id
    //             firstName
    //             lastName
    //           }
    //         }
    //       }
    //     `,
    //   })
    //   .valueChanges.pipe(map((result) => result.data.posts));
  }
}

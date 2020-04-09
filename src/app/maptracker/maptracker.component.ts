import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-maptracker',
  templateUrl: './maptracker.component.html',
  styleUrls: ['./maptracker.component.css']
})
export class MaptrackerComponent implements AfterViewInit {

  displayedColumns: string[] = ['displayName', 'firstSeenTimestamp', 'lastSeenTimestamp'];
  //exampleDatabase: ExampleHttpDatabase | null;
  //data: GithubIssue[] = [];
  dynatraceApplicationAPI: DynatraceApplicationAPI | null;
  data: DynatraceApplication[] = [];
  apiToken = "zkahzlL9STGyhLAVf9xgd";
  timeStamp = "3days";

  //resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) {}




  ngAfterViewInit() {
    //this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
    this.dynatraceApplicationAPI = new DynatraceApplicationAPI(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          //return this.exampleDatabase!.getRepoIssues(this.sort.active, this.sort.direction, this.paginator.pageIndex);
          return this.dynatraceApplicationAPI!.getDynatraceApplications(this.timeStamp, this.apiToken);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          //this.resultsLength = data.total_count;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

}

/*
export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}
*/

/*
export interface DynatraceAPI {
  items: DynatraceApplication[];
}
*/

export interface DynatraceApplication {
  displayName: string;
  firstSeenTimestamp: number;
}

/** An example database that the data source uses to retrieve data for the table. */
/*
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
        `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
*/

export class DynatraceApplicationAPI {
  constructor(private _httpClient: HttpClient) {}

  getDynatraceApplications(timestamp: string, token: string): Observable<DynatraceApplication[]> {
    const href = 'https://kcy25048.live.dynatrace.com/api/v1/entity/applications';
    const requestUrl =
        //`${href}?relativeTime=${timestamp}&includeDetails=true&api-token=${token}`;
        `${href}?includeDetails=true&api-token=${token}`;

    return this._httpClient.get<DynatraceApplication[]>(requestUrl);
  }
}
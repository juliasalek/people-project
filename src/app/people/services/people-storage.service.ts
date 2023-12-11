import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, expand, retry } from 'rxjs';
import { Person } from '../../shared/interfaces';
import { ApiService } from './api.service';
import { filter, includes, toLower } from 'lodash';

@Injectable()
export class PeopleStorageService {
  private peopleSubject$: BehaviorSubject<Person[]> = new BehaviorSubject(
    [] as Person[]
  );
  public readonly people$: Observable<Person[]> =
    this.peopleSubject$.asObservable();
  private peopleArr: Person[] = [];

  constructor(private apiService: ApiService) {
    this.loadAllData();
  }

  public searchPeople(text: string): void {
    const sortedArr = filter(this.peopleArr, function (person) {
      return includes(toLower(person.name), toLower(text));
    });
    this.peopleSubject$.next(sortedArr);
  }

  public loadAllData(): void {
    this.apiService
      .getPeopleByUrl()
      .pipe(
        retry(2),
        expand((previousData) => {
          this.peopleArr = this.peopleArr.concat(previousData.results);
          this.peopleSubject$.next(this.peopleArr);
          return previousData.next
            ? this.apiService.getPeopleByUrl(previousData.next)
            : EMPTY;
        })
      )
      .subscribe();
  }
}

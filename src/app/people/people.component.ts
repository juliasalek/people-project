import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ReplaySubject,
  Subject,
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ApiService } from './services/api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../shared/interfaces';
import { PeopleStorageService } from './services/people-storage.service';
import { sortBy } from 'lodash';
import { ModalService } from '../shared/modal/services/modal.service';

@Component({
  selector: 'people-view',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  providers: [ApiService, PeopleStorageService],
})
export class PeopleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) public sort!: MatSort;
  public readonly displayedColumns = [
    'name',
    'height',
    'mass',
    'created',
    'edited',
    'planetName',
  ];
  public people?: Person[];
  public dataSource = new MatTableDataSource();
  public title = 'People Table';
  public searchValue = '';
  private _dialogTitle = 'Planet Details';
  private _searchText$ = new Subject<string>();
  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private _peopleStorage: PeopleStorageService,
    private _apiService: ApiService,
    private _modalService: ModalService
  ) {}

  public ngOnInit(): void {
    this._peopleStorage.people$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((data: Person[]) => {
        this.people = data;
        this.sortPeople();
        this.dataSource.data = this.people;
      });
    this._searchText$
      .pipe(
        takeUntil(this._destroyed$),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(async (text) => this._peopleStorage.searchPeople(text))
      )
      .subscribe();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  public sortPeople(): void {
    if (this.sort?.active) {
      const arrToSort = this.people;
      this.people = sortBy(arrToSort, this.sort.active, this.sort.direction);
      this.dataSource.data = this.people;
    }
  }

  public search(text: string): void {
    this._searchText$.next(text);
  }

  public async showPlanet(
    modalTemplate: TemplateRef<any>,
    person: Person
  ): Promise<void> {
    const planetData = await firstValueFrom(
      this._apiService.getPlanetByPersonId(person.homeworld)
    );
    if (planetData) {
      this._modalService
        .open(modalTemplate, { title: this._dialogTitle, data: planetData })
        .subscribe(() => {});
    }
  }
}

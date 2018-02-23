import { DataSource } from '@angular/cdk/collections';
import { CollectionViewer } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';

export class TableDataSource extends DataSource<any> {
  constructor(public data: Observable<Object[]>) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Object[]> {
    return this.data;
  }

  disconnect(collectionViewer: CollectionViewer): void {}
}

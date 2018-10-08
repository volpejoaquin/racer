// angular
import { Pipe, PipeTransform } from '@angular/core';

// libs
import * as lodash from 'lodash';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], fieldName: string = '', searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    let value = '';
    searchText = lodash.toLower(searchText);

    return lodash.filter(items, (item) => {
      if (!fieldName) {
        value = item;
      } else {
        value = item[fieldName].toString();
      }

      value = lodash.toLower(value);

      return value.indexOf(searchText) >= 0;
    });
  }
}

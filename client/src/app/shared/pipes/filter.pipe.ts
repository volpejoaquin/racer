// angular
import { Pipe, PipeTransform } from '@angular/core';

// libs
import * as lodash from 'lodash';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return lodash.filter(items, (item) => {
      const numberString = item.number ? item.number.toString() : '';
      return numberString.indexOf(searchText) >= 0;
    });
  }
}

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

    searchText = lodash.toLower(searchText);
    const searchTextArray = searchText ? searchText.split(' ') : [''];

    let value = '';
    return lodash.filter(items, (item) => {
      if (!fieldName) {
        value = item;
      } else {
        value = item[fieldName].toString();
      }

      value = lodash.toLower(value);
      let response = false;

      searchTextArray.forEach((sText: string) => {
        response = response || value.indexOf(sText) >= 0;
      });

      return response;
    });
  }
}

// angular
import { Pipe, PipeTransform } from '@angular/core';

// libs
import * as lodash from 'lodash';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {
  transform(value: any[], orderBy: string | string[], orders: string | string[]): any[] {
    if (!value) {
      return [];
    }

    return lodash.orderBy(value, orderBy, orders);
  }
}

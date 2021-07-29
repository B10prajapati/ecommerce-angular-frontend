import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class BaseService {
  protected handleError(error: HttpErrorResponse, name?: string, data?: any) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(
        `[${name}]: An error occurred:`,
        error.error,
        data ? 'Data:' : undefined,
        data
      );
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `[${name}]: Backend returned code ${error.status}, body was: `,
        error.error,
        data ? 'Data:' : undefined,
        data
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}

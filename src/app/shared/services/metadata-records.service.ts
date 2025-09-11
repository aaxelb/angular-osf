import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ENVIRONMENT } from '@osf/core/constants/environment.token';

import { MetadataRecordFormat } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class MetadataRecordsService {
  #http = inject(HttpClient);
  #env = inject(ENVIRONMENT);

  metadataRecordUrl(osfid: string, format: MetadataRecordFormat): string {
    return `${this.#env.webUrl}/metadata/${osfid}/?format=${format}`;
  }

  fetchMetadataRecord(osfid: string, format: MetadataRecordFormat): Observable<string> {
    return this.#http.get(this.metadataRecordUrl(osfid, format), { responseType: 'text' });
  }
}

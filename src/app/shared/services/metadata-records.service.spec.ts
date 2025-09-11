import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ENVIRONMENT } from '@osf/core/constants/environment.token';
import { MetadataRecordFormat } from '@osf/shared/enums';

import { MetadataRecordsService } from './metadata-records.service';

describe('MetadataRecordsService', () => {
  let service: MetadataRecordsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        {
          provide: ENVIRONMENT,
          useValue: {
            webUrl: 'http://osf.example',
          },
        },
      ],
    });
    service = TestBed.inject(MetadataRecordsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build metadata record urls', () => {
    expect(service.metadataRecordUrl('blargl', MetadataRecordFormat.Turtle)).toBe(
      'http://osf.example/metadata/blargl/?format=turtle'
    );
    expect(service.metadataRecordUrl('blergl', MetadataRecordFormat.SchemaDotOrgDataset)).toBe(
      'http://osf.example/metadata/blergl/?format=google-dataset-json-ld'
    );
    expect(service.metadataRecordUrl('glarbl', MetadataRecordFormat.DataciteJson)).toBe(
      'http://osf.example/metadata/glarbl/?format=datacite-json'
    );
    expect(service.metadataRecordUrl('glorbl', MetadataRecordFormat.DataciteXml)).toBe(
      'http://osf.example/metadata/glorbl/?format=datacite-xml'
    );
    httpMock.expectNone();
  });

  it('should fetch metadata records', (done) => {
    const recordText = '{"@id":"http://osf.example/blerg","etc":"etc"}';
    const received = [];
    service.fetchMetadataRecord('blerg', MetadataRecordFormat.SchemaDotOrgDataset).subscribe({
      next: received.push,
      complete: () => {
        expect(recieved).toBe([recordText]);
        done();
      },
    });
    const mockReq = httpMock.expectOne('http://osf.example/metadata/blergl/?format=google-dataset-json-ld');
    expect(mockReq.request.method).toBe('GET');
    reqGet.flush(recordText);
  });
});

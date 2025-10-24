import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BikeService } from './bike.service';

describe('BikeService', () => {
  let service: BikeService;
  let httpTestingController: HttpTestingController;

  const mockBikes = [
    {
      id: 1,
      brand: 'Honda',
      model: 'CBR500R',
      type: 'Sport Bike',
      costPerDay: 100,
      availableStatus: 'Yes',
      contactNumber: '1234567890',
    },
    {
      id: 2,
      brand: 'Kawasaki',
      model: 'Ninja 300',
      type: 'Sport Bike',
      costPerDay: 80,
      availableStatus: 'No',
      contactNumber: '9876543210',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BikeService],
    });
    service = TestBed.inject(BikeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  fit('should create BikeService', () => {
    expect(service).toBeTruthy();
  });

  fit('should retrieve bikes from the API via GET', () => {
    spyOn((service as any), 'getBikes').and.callThrough();
    (service as any).getBikes().subscribe((bikes: any) => {
      expect(bikes).toEqual(mockBikes);
    });

    const req = httpTestingController.expectOne((request) => request.method === 'GET');
    req.flush(mockBikes);

    expect((service as any).getBikes).toHaveBeenCalled();
  });

  fit('should add a bike via POST', () => {
    const newBike = {
      brand: 'Suzuki',
      model: 'Access',
      type: 'Scooter',
      costPerDay: 560,
      availableStatus: 'Yes',
      contactNumber: '1234567890',
    };

    (service as any).addBike(newBike).subscribe((bike: any) => {
      expect(bike).toEqual(newBike);
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('POST');
    req.flush(newBike);
  });

  fit('should delete a bike via DELETE', () => {
    const bikeId = 1;

    (service as any).deleteBike(bikeId).subscribe(() => {});

    const req = httpTestingController.expectOne(`${(service as any)['backendUrl']}/${bikeId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});


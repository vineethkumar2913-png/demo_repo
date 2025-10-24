import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeListComponent } from './bike-list.component';
import { BikeService } from '../services/bike.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BikeListComponent', () => {
  let component: BikeListComponent;
  let fixture: ComponentFixture<BikeListComponent>;
  let service: BikeService;

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
      declarations: [BikeListComponent],
      providers: [BikeService],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(BikeListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BikeService);
  });

  fit('should create BikeListComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should call getBikes', () => {
    spyOn((service as any), 'getBikes').and.returnValue(of(mockBikes));
    (component as any).getBikes();
    expect((component as any).getBikes).toBeDefined();
    expect((component as any).getBikes instanceof Function).toBeTruthy();
    expect((service as any).getBikes).toHaveBeenCalled();
  });

  fit('should call deleteBike', () => {
    spyOn((service as any), 'deleteBike').and.returnValue(of());
    (component as any).deleteBike(1); // You can pass a valid bike ID
    expect((component as any).deleteBike).toBeDefined();
    expect((component as any).deleteBike instanceof Function).toBeTruthy();
    expect((service as any).deleteBike).toHaveBeenCalledWith(1);
  });

  fit('should have sortByPrice method', () => {
    expect((component as any).sortByPrice).toBeDefined();
    expect((component as any).sortByPrice instanceof Function).toBeTruthy();
  });

  fit('should sort bikes by price', () => {
    (component as any).bikes = [...mockBikes]; // Initialize the component's bikes with mock data
  
    // Call the sortByPrice method
    (component as any).sortByPrice();
  
    // Expected sorted bikes by costPerDay in ascending order
    const sortedBikes = [
      {
        id: 2,
        brand: 'Kawasaki',
        model: 'Ninja 300',
        type: 'Sport Bike',
        costPerDay: 80,
        availableStatus: 'No',
        contactNumber: '9876543210',
      },
      {
        id: 1,
        brand: 'Honda',
        model: 'CBR500R',
        type: 'Sport Bike',
        costPerDay: 100,
        availableStatus: 'Yes',
        contactNumber: '1234567890',
      },
    ];
  
    expect((component as any).bikes).toEqual(sortedBikes);
  });
});
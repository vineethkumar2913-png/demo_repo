import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { AddBikeComponent } from './add-bike.component';
import { BikeService } from '../services/bike.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddBikeComponent', () => {
  let component: AddBikeComponent;
  let fixture: ComponentFixture<AddBikeComponent>;
  let service: BikeService;
  let debugElement: DebugElement;
  let formBuilder: FormBuilder;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBikeComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [BikeService],
    });

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(AddBikeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BikeService);
    fixture.detectChanges();
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
  });

  fit('should create AddBikeComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should add a new bike when form is valid', () => {
    const mockBike = {
      brand: 'Honda',
      model: 'CBR 250R',
      type: 'Sportbike',
      costPerDay: 800,
      availableStatus: 'Yes',
      contactNumber: '9876543210',
    };

    spyOn((service as any), 'addBike').and.returnValue(of(mockBike));
  (component as any).bikeForm.setValue(mockBike); // Set form values
    (component as any).addNewBike(); // Trigger the addNewResort method
    
    expect((component as any).bikeForm.valid).toBeTruthy();
    expect((service as any).addBike).toHaveBeenCalledWith(mockBike);
  });

  fit('should require all form fields to be filled in', () => {
    const form = (component as any).bikeForm;

    form.setValue({
      brand: '',
      model: '',
      type: '',
      costPerDay: '',
      availableStatus: '',
      contactNumber: '',
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('brand')?.hasError('required')).toBeTruthy();
    expect(form.get('model')?.hasError('required')).toBeTruthy();
    expect(form.get('type')?.hasError('required')).toBeTruthy();
    expect(form.get('costPerDay')?.hasError('required')).toBeTruthy();
    expect(form.get('availableStatus')?.hasError('required')).toBeTruthy();
    expect(form.get('contactNumber')?.hasError('required')).toBeTruthy();
  });

  fit('should validate bike contact number format', () => {
    const form = (component as any).bikeForm;

    form.setValue({
      brand: 'Honda',
      model: 'CBR 250R',
      type: 'Sportbike',
      costPerDay: 800,
      availableStatus: 'Yes',
      contactNumber: '1234567890', // Valid contact number
    });

    expect(form.valid).toBeTruthy();
    expect(form.get('contactNumber')?.hasError('pattern')).toBeFalsy();

    form.setValue({
      brand: 'Honda',
      model: 'CBR 250R',
      type: 'Sportbike',
      costPerDay: 800,
      availableStatus: 'Yes',
      contactNumber: '123456', // Invalid contact number
    });

    expect(form.invalid).toBeTruthy();
    expect(form.get('contactNumber')?.hasError('pattern')).toBeTruthy();
  });
});

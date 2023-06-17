import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BanApiService } from './ban-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private formBuilder: FormBuilder, public banApi : BanApiService) {}

  title = 'questionnaireSNCFtickets';
  modalBooleanFirst: boolean = true;
  enfantCount: boolean = false;
  modalBooleanError: boolean = false;
  errorNumberChirldren: boolean = false;
  modalEcho: boolean = false;
  adressName: string = '';
  adressApi!: any;
  hasAdressApi: boolean = false;

  familyLinkArray = [
    { name: 'Conjoint(e)', value: 'Conjoint(e)' },
    { name: 'Ascendant(e)', value: 'Ascendant(e)' },
    { name: 'Descendant(e)', value: 'Descendant(e)' },
  ];
  addMemberForm = this.formBuilder.group({
    firstname: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    ],
    lastname: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    ],
    email: ['', [Validators.required, Validators.email]],
    birthdate: ['', [Validators.required]],
    adress: ['', [Validators.required]],
    children: ['', [Validators.required]],
    littleChildren: ['', [Validators.required]],
    familyLink: ['', Validators.required],
  });

  // shortcut for html
  get fc() {
    return this.addMemberForm.controls;
  }
  get f() {
    return this.addMemberForm;
  }

  ngOnInit() {
    setTimeout(() => {
      this.modalBooleanFirst = false;
    }, 3000);
  }

  enfantCountChange() {
    this.enfantCount = true;
  }

  closeModalAndSendResponseIfExist() {
    this.modalBooleanError = false;
    this.errorNumberChirldren = true;
  }

  lancerModalEcho() {
    if (this.errorNumberChirldren) {
      this.modalEcho = true;
    }
  }

  searchAdress(value: string): void {
    this.banApi.getAdress(value).subscribe((adress) => {
      this.adressApi = adress.features;
    });
  }
  displayAdress(): void {
    this.hasAdressApi = !this.hasAdressApi;
  }
  getAdress(valueName: string): void {
    this.adressName = valueName;
    this.adressApi = [];
    this.addMemberForm.value.adress = valueName;
  }

  onSubmitAddMemberFamily() {
    if (this.addMemberForm.valid) {
      this.modalBooleanError = true;
    }
  }
}

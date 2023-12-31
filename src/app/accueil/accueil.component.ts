import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BanApiService } from '../ban-api.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  constructor(private formBuilder: FormBuilder, public banApi: BanApiService) {}

  title = 'questionnaireSNCFtickets';
  modalBooleanFirst: boolean = true;
  enfantCount: boolean = false;
  modalBooleanError: boolean = false;
  errorNumberChirldren: boolean = false;
  gallery: boolean = false;
  modalEcho: boolean = false;
  adressName: string = '';
  adressApi!: any;
  hasAdressApi: boolean = false;
  numberDisplay!: any;

  imagesArray = [
    { src: '../../assets/gallery/159682704_0.jpg' },
    { src: '../../assets/gallery/159682780_0.jpg' },
    { src: '../../assets/gallery/159682924_0.jpg' },
    { src: '../../assets/gallery/159682954_0.jpg' },
    { src: '../../assets/gallery/159682990_0.jpg' },
    { src: '../../assets/gallery/159683090_0.jpg' },
    { src: '../../assets/gallery/159683333_0.jpg' },
    { src: '../../assets/gallery/159683650_0.jpg' },
    { src: '../../assets/gallery/159683802_0.jpg' },
    { src: '../../assets/gallery/159683925_0.jpg' },
    { src: '../../assets/gallery/159684052_0.jpg' },
    { src: '../../assets/gallery/159684096_0.jpg' },
    { src: '../../assets/gallery/159684560_0.jpg' },
    { src: '../../assets/gallery/159684888_0.jpg' },
    { src: '../../assets/gallery/159685110_0.jpg' },
    { src: '../../assets/gallery/159682704_0.jpg' },
    { src: '../../assets/gallery/159685237_0.jpg' },
  ];

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

  changeGallery(){
    this.gallery = true
    this.modalEcho = false
  }

  onSubmitAddMemberFamily() {
    if (this.addMemberForm.valid) {
      this.numberDisplay = this.addMemberForm.value.littleChildren;
      this.modalBooleanError = true;
    }
  }
}

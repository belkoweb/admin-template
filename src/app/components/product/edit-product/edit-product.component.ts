import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DiseaseFacade } from 'src/app/facades/disease.facade';
import { Disease } from 'src/app/models/disease';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  symptoms: string;
  conditions: string;
  management: string;
  control: string;
  disease: Disease;
  public form = new FormGroup({
    nom: new FormControl(null, [Validators.required]),
    nomScientifique: new FormControl(null, [Validators.required]),
    langue: new FormControl(null, []),
  });
  public Editor = ClassicEditor;
  constructor(
    private diseaseFacade: DiseaseFacade,
    private route: ActivatedRoute
  ) {}
  public onChange({ editor }: ChangeEvent) {
    /*  const data = editor.getData();
    this.contenu = data; */
  }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.disease = this.diseaseFacade.findById(+id);
    this.symptoms = this.disease.symptoms;
    this.conditions = this.disease.conditions;
    this.management = this.disease.management;
    this.control = this.disease.control;
    console.log(this.disease);
    this.form.setValue({
      nom: this.disease.nom,
      nomScientifique: this.disease.nomScientifique,
      langue: '',
    });
  }
  get nom() {
    return this.form.get('nom');
  }
  get nomScientifique() {
    return this.form.get('nomScientifique');
  }
  public onChangeSymptoms({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.symptoms = data;
  }
  public onChangeConditions({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.conditions = data;
  }
  public onChangeManagement({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.management = data;
  }
  public onChangeControl({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.control = data;
  }
  submit() {
    this.diseaseFacade.updateDisease({
      id: this.disease.id,
      nom: this.nom.value,
      conditions: this.conditions,
      symptoms: this.symptoms,
      management: this.management,
      control: this.control,
      nomScientifique: this.nomScientifique.value,
    });
  }
}

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
  contenu: string;
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
    const data = editor.getData();
    this.contenu = data;
  }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.disease = this.diseaseFacade.findById(+id);
    this.contenu = this.disease.contenu;
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
  submit() {
    this.diseaseFacade.updateDisease({
      id: this.disease.id,
      nom: this.nom.value,
      contenu: this.contenu,
      nomScientifique: this.nomScientifique.value,
    });
  }
}

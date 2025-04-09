import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import { Router } from '@angular/router';
import {SchemaServiceService} from "../../services/schema-service.service";

@Component({
  selector: 'app-index',
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  srcResult: any;
  donnees: any = [];

  constructor(private router: Router, private schemaservice: SchemaServiceService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;

        // Convertir ArrayBuffer en string
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(arrayBuffer);

        // Permet de Parser
        const json = JSON.parse(text);
        console.log('✅ Fichier JSON :', json);

        this.schemaservice.setData(json);

        this.srcResult = text;
        this.donnees = json;

      } catch (err) {
        console.error('❌ Erreur de parsing JSON :', err);
      }
    };

    // Renvoie sur la route du formulaire
    reader.readAsArrayBuffer(file);
    this.router.navigate(['/main']);
  }

}

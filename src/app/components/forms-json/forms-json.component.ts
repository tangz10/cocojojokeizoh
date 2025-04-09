import {Component, OnInit} from '@angular/core';
import {generateDefaultUISchema, isDateTimeControl, RankedTester, rankWith} from "@jsonforms/core";
import {angularMaterialRenderers, JsonFormsAngularMaterialModule} from "@jsonforms/angular-material";
import {DateTimeRendererComponent} from "../../renderers/date-time-renderer/date-time-renderer.component";
import {SchemaServiceService} from "../../services/schema-service.service";
import {MatButton} from "@angular/material/button";
import {Router, ActivatedRoute, RouterModule} from "@angular/router";


@Component({
  selector: 'app-forms-json',
  imports: [
    MatButton,
    JsonFormsAngularMaterialModule
  ],
  templateUrl: './forms-json.component.html',
  styleUrl: './forms-json.component.css'
})
export class FormsJsonComponent implements OnInit {

  schema: any;
  uischema: any
  data = {}

  debug: boolean = false;

  dateTimeTester: RankedTester = rankWith(5, isDateTimeControl);

  renderers = [
    ...angularMaterialRenderers,
    { tester: this.dateTimeTester, renderer: DateTimeRendererComponent }
  ];

  constructor(private schemaService: SchemaServiceService, private route: ActivatedRoute) {
  }

  // Récupération du Schema par un Service
  ngOnInit() {

    // Récupération des données envoyé par un IMPORT
    this.schemaService.getData().subscribe(
      data => {
        if (!this.debug) {
          this.data = data;
        }
      }
    )

    this.schemaService.loadSchema().subscribe((schema) => {
      this.schema = schema;
      this.uischema = generateDefaultUISchema(schema);

      // Debug par SCOPE
      if (this.debug) {
        this.uischema = {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/incident/properties/incidentSubmission',
                options: {
                  description: 'Type de soumission',
                  format: 'string'
                }
              },
              {
                type: 'Control',
                scope: '#/properties/incident/properties/incidentOccurrenceDateTime',
                options: {
                  format: 'date-time',
                  description: 'Date de l’incident'
                }
              },
            ]
        };
      }

    });
  }

  // Récupération des données remplit dans le formulaire
  onDataChanged($event: any) {
    this.data = $event;
  }

  // Envoie du formulaire avec téléchargement des données dans un fichier JSON
  onSubmit(): void {
    console.log(this.data);

    const donneesFormulaire = this.data;
    const donneesJSON = JSON.stringify(donneesFormulaire, null, 2);
    const blob = new Blob([donneesJSON], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const lien = document.createElement('a');
    lien.href = url;
    lien.download = 'DORA_IR_Completed.json';
    lien.click();

    window.URL.revokeObjectURL(url);
  }
}

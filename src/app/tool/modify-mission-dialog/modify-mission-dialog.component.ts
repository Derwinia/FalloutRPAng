import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup , FormControlName} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MissionModel} from 'src/app/models/mission.model';

@Component({
  selector: 'app-modify-mission-dialog',
  templateUrl: './modify-mission-dialog.component.html',
  styleUrls: ['./modify-mission-dialog.component.scss']
})
export class ModifyMissionDialogComponent {

  form! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModifyMissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MissionModel,
  ){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: this.data.id,
      name: [this.data.name,[]],
      shortDescription:[this.data.shortDescription,[]],
      description:[this.data.description,[]],
      status:[this.data.status,[]],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
}

  close() {
      this.dialogRef.close();
  }
}

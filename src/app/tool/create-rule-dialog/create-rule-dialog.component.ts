import { Component , Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-create-rule-dialog',
  templateUrl: './create-rule-dialog.component.html',
  styleUrls: ['./create-rule-dialog.component.scss']
})
export class CreateRuleDialogComponent {

  form! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [,[]],
      shortDescription:[,[]],
      description:[,[]],
      path:this.data,
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}

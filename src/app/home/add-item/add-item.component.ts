import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebshopItem } from 'src/app/models/models';
import { WebshopService } from 'src/app/services/webshop.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  title:String = '';
  description:String = '';

  constructor(
    private service: WebshopService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WebshopItem,
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.title = this.data.title;
      this.description = this.data.description;
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  onSaveClick(){
    if(this.data){
      this.service.updateWebshopItem(this.data.id, this.title,this.description).subscribe(data =>{
        this.dialogRef.close();
      }, err =>{
        this.dialogRef.close();
        this.snackbar.open(err.error.message, "Close");
      })
    } else {
      this.service.addWebshopItem(this.title,this.description).subscribe(data=>{
        this.dialogRef.close();
      }, err => {
        this.dialogRef.close();
        this.snackbar.open(err.error.message, "Close");
      })
    }
  }
}

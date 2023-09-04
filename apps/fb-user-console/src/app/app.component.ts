import { Component, OnInit } from "@angular/core";
import { IUser } from "./features/user-session/models/user.interface";
import { Observable } from "rxjs";

@Component({
  standalone: false,
  selector: "fb-console-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit{
  title = "fb-user-console";
  constructor() {}
  ngOnInit(): void {
  }
}
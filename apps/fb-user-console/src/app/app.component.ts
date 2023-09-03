import { Component, OnInit } from "@angular/core";
import { UserApiService } from "./features/user-session/services/api/user-api.service";
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
  users$!: Observable<IUser[]>;
  constructor(private userApiService: UserApiService) {}
  ngOnInit(): void {
      this.users$ = this.userApiService.getAllUsers();
  }
}
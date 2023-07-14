import { Pipe, PipeTransform } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "src/app/app.component";
import { MemberComponent } from "src/app/member/member.component";

@Pipe
({
name:"searchFilter"
})

export class SerachFilterPipe implements PipeTransform{
    transform(value: any, ...args: any):any {
        if((!value)) return null;
        if((!args)) return value;

        //args=args.toLowerCase();
        debugger;
        return value.filter(function(item: any)
        {
            return JSON.stringify(item)
            .toLowerCase()
            .includes(args);
        });
        
    }
}
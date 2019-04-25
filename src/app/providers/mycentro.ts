import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Util } from './util';
import {Answer} from './answers/Answer';
import {LoadingController} from '@ionic/angular';
import {AnswerLogin} from './answers/AnswerLogin';
import {User} from './POJO/User';
import {AnswerGetGuideById} from './answers/AnswerGetGuideById';
import {AnswerGetGuidesByUserId} from './answers/AnswerGetGuidesByUserId';
import {AnswerGetStep} from './answers/AnswerGetStep';
import {AnswerGetSchools} from './answers/AnswerGetSchools';
import {AnswerGetSchool} from './answers/AnswerGetSchool';
import {AnswerGetCourses} from './answers/AnswerGetCourses';




@Injectable()
export class MyCentro {
    constructor(
        private api: ApiService,
        private util: Util,
        private loadingCtrl:LoadingController
    ) {
    }


    async login(body:any){
        const dialog = await this.loadingCtrl.create({message: "Logging"});
        await dialog.present();
        let call =this.api.post('login', body);
            call.subscribe(
                (res:AnswerLogin)=>{return res;},
                ()=>{},
                ()=>{dialog.dismiss();}
            );
        return call;
    }

    async getGuidesByUserId(userId:number){
        const dialog = await this.loadingCtrl.create({message: "Getting"});
        await dialog.present();
        let call =this.api.get(`studentsHasGuides/findByUserId?id=${userId}`, {});
        call.subscribe(
            (res:AnswerGetGuidesByUserId)=>{return res;},
            ()=>{},
            ()=>{dialog.dismiss();}
        );
        return call;
    }

    async getGuideById(guideId:number){
        const dialog = await this.loadingCtrl.create({message: "Getting"});
        await dialog.present();
        const body={};
        let call =this.api.get(`guides/${guideId}`, body);
        call.subscribe(
            (res:AnswerGetGuideById)=>{return res;},
            ()=>{},
            ()=>{dialog.dismiss();}
        );
        return call;
    }

    async getStep(stepId:number){
        const dialog = await this.loadingCtrl.create({message: "Getting"});
        await dialog.present();
        const body={};
        let call =this.api.get(`steps/${stepId}`, body);
        call.subscribe(
            (res:AnswerGetStep)=>{return res;},
            ()=>{},
            ()=>{dialog.dismiss();}
        );
        return call;
    }



    async finishStep(step:number, guideId:number){
        const dialog = await this.loadingCtrl.create({message: "Finishing"});
        await dialog.present();
        const user:User = JSON.parse(this.util.getPreference(this.util.constants.user));
        const body={
            step: step,
            guideId: guideId,
            userId: user.id
        };
        let call =this.api.post('studentsHasGuides/finishStep', body);
        call.subscribe(
            (res)=>{return res;},
            ()=>{},
            ()=>{dialog.dismiss();}
        );
        return call;
    }

    async getSchools(){
        const dialog = await this.loadingCtrl.create({message: "Getting"});
        await dialog.present();
        let call =this.api.get(`schools`, {});
        call.subscribe(
            (res:AnswerGetSchools)=>{return res;},
            ()=>{},
            ()=>{dialog.dismiss();}
        );
        return call;
    }

    async getSchool(schoolId:number){
        const dialog = await this.loadingCtrl.create({message: "Getting"});
        await dialog.present();
        let call =this.api.get(`schools/${schoolId}`, {});
        call.subscribe(
            (res:AnswerGetSchool)=>{return res;},
            ()=>{},
            ()=>{dialog.dismiss();}
        );
        return call;
    }

    async getCoursesBySchoolId(schoolId:number){
        const dialog = await this.loadingCtrl.create({message: "Getting"});
        await dialog.present();
        let call =this.api.get(`courses/findBySchoolId?id=${schoolId}`, {});
        call.subscribe(
            (res:AnswerGetCourses)=>{return res;},
            ()=>{},
            ()=>{dialog.dismiss();}
        );
        return call;
    }

}

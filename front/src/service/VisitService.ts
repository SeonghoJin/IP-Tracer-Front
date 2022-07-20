import {toBoolean} from "../util/toBoolean";

export interface IVisitService {
    isVisitSendOpinion(): boolean;
    isVisitOptionTerminal(): boolean;
    isVisitIpTracerApp(): boolean;
}

export class VisitService implements IVisitService {
    constructor() {}

    private readonly sendOpinionVisitKey = '__send_opinion_visit_key__';
    private readonly optionTerminalVisit = '__option_terminal_visit_key__';
    private readonly ipTracerAppVisit = '__ip_tracer_app_visit_key__';

    isVisitIpTracerApp(): boolean {
        const visitFlag = window.localStorage.getItem(this.ipTracerAppVisit);
        const pipedVisitFlag = toBoolean(visitFlag);

        if(pipedVisitFlag){
            return true;
        }

        window.localStorage.setItem(this.ipTracerAppVisit, JSON.stringify(true));
        return false;
    }

    isVisitOptionTerminal(): boolean {
        const visitFlag = window.localStorage.getItem(this.optionTerminalVisit);
        const pipedVisitFlag = toBoolean(visitFlag);

        if(pipedVisitFlag){
            return true;
        }

        window.localStorage.setItem(this.optionTerminalVisit, JSON.stringify(true));
        return false;
    }

    isVisitSendOpinion(): boolean {
        const visitFlag = window.localStorage.getItem(this.sendOpinionVisitKey);
        const pipedVisitFlag = toBoolean(visitFlag);

        if(pipedVisitFlag){
            return true;
        }

        window.localStorage.setItem(this.sendOpinionVisitKey, JSON.stringify(true));
        return false;
    }

}

import dataFetcher from './dataFatcher';
import dataFatcher_staging from './dataFatcher_staging';

export function gethomedata() {
    return dataFetcher('GET', 'prod/gethomedata');
}

export function getsearchresult(formdata: SearchFormdata) {
    return dataFetcher('POST', 'prod/getsearchresult', formdata);
}

export function getgamedetails(formdata: GameDetailsFormdata) {
    return dataFetcher('POST', 'prod/getgamedetails', formdata);
}
export function getLegalInfo(formdata: LegalFormdata) {
    return dataFetcher('POST', 'prod/getLegalInfo', formdata);
}
export function getgamesbycategory(formdata: CategoryFormdata) {
    return dataFetcher('POST', 'prod/getgamesbycategory', formdata);
}
export function loginApi(formdata: LoginFormdata) {
    return dataFetcher('POST', 'prod/login', formdata);
}
export function signupApi(formdata: SignupFormdata) {
    return dataFetcher('POST', 'prod/signup', formdata);
}

export function getsubschemes(formdata: SubFormdata) {
    return dataFetcher('POST', 'prod/getsubschemes', formdata);
}
export function getsdpurl(formdata: SubReqFormdata) {
    return dataFetcher('POST', 'subscribe/getsdpurl', formdata);
}
export function unsub(formdata: UnsubReqFormdata) {
    return dataFetcher('POST', 'subscribe/unsub', formdata);
}

//Quiz API
export function getQuizTerm(formdata: { msisdn: string }) {
    return dataFatcher_staging('POST', 'api/quiz-terms-accept/view', formdata);
}
export function quizTermAccept(formdata: {
    msisdn: string;
    is_accept: boolean;
}) {
    return dataFatcher_staging('POST', 'api/quiz-terms-accept', formdata);
}
export function checkEligibility(formdata: { msisdn: string }) {
    return dataFatcher_staging('POST', 'api/check-eligibility', formdata);
}
export function leaderboard(formdata: { msisdn: string; date?: string }) {
    return dataFatcher_staging('POST', 'api/leaderboard', formdata);
}
export function fetchQuestion(formdata: FetchQuestion) {
    return dataFatcher_staging('POST', 'api/questions', formdata);
}

interface FetchQuestion {
    msisdn: string;
    is_start: boolean;
    question_id?: number;
    selected_option?: number;
    answer_in_ms?: number;
}

interface SearchFormdata {
    keyword: string;
    page?: string;
}
interface GameDetailsFormdata {
    gameid: string;
    userid?: string;
}
interface LegalFormdata {
    keyword: string;
}
interface CategoryFormdata {
    catcode: string;
    page: number;
}
interface LoginFormdata {
    msisdn: string;
    password?: string;
    haspin: string;
}
interface SignupFormdata {
    msisdn: string;
}
interface SubFormdata {
    msisdn?: string;
    appname: string;
}
interface SubReqFormdata {
    msisdn: string;
    pack: string;
    renew: string;
}
interface UnsubReqFormdata {
    msisdn: string;
    pack: string;
}

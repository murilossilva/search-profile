import { IUserDetails } from "../interfaces/user-details.interface";

export class UserData {
    private _userDetails: IUserDetails;

    get userDetails() {
        return this._userDetails;
    }

    setUserData(userDetails: IUserDetails) {
        this._userDetails = userDetails
        this.setUserDetailsInStorage(userDetails);
    }

    setUserDetailsInStorage(userDetails: IUserDetails) {
        const CACHE_USER_DATA: IUserDetails[] = JSON.parse(localStorage.getItem('userDetails'));

        let index = CACHE_USER_DATA?.findIndex( user => user.login == userDetails.login )

        if(index == -1) {
            CACHE_USER_DATA.push(userDetails);
            localStorage.setItem('userDetails', JSON.stringify(CACHE_USER_DATA))
        } 
        else if (index >= 0) {
            CACHE_USER_DATA[index] = userDetails;
        }
        else if (!CACHE_USER_DATA) {
            localStorage.setItem('userDetails', JSON.stringify([userDetails]));
        }
    }
}
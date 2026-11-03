import {createContext} from "react";
export const UserContent=
createContent();
export function
UserProvider({children}){
    const user ="Rahul";
    return(
        <UserContent.Provider value={user}>
            {children}
        </UserContent.Provider>
    );
}
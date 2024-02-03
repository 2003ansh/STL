import React, { createContext,useContext, useState } from 'react';

const Student_Profile = createContext();
export const useProfile = () => {
    return useContext(Student_Profile);
  };

  export const Student_ProfileProvider = ({ children }) => {

    const [student_profile, setStudent_Profile] = useState(null);

    
    const profile=(data)=>{
        setStudent_Profile(data)
        console.log(student_profile);
    }


    const value = {
        student_profile,
        profile,
    };

    return <Student_Profile.Provider value={value}>{children}</Student_Profile.Provider>;
  }
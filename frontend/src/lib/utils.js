export function formatData(date){
    return date.toLocaleDateString('en-US',{
        month:'short',
        day:'numeric',
        year:'numeric',
    })
}

export const calculateAge = (Emp_DOB) => {
  if (!Emp_DOB) return "—";
  const birthYear = new Date(Emp_DOB).getFullYear();
  return new Date().getFullYear() - birthYear;
};

export const calculateYearsOnJob = (Emp_Joining_Date) => {
  if (!Emp_Joining_Date) return "—";
  const joinYear = new Date(Emp_Joining_Date).getFullYear();
  return new Date().getFullYear() - joinYear;
};

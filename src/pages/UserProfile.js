import { ClientProfile } from "./ClientProfile";
import { CoachProfile } from "./CoachProfile";

export function UserProfile(){
  const userType = localStorage.getItem('userKind')
  return(
    <>
    {!!userType && userType === 'coach' && <CoachProfile isPublic={false} />}
    {!!userType && userType === 'client' && <ClientProfile />}
    </>
  )
}
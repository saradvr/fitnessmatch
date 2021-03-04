import {CoachCard} from './CoachCard';

export function CoachesList ({ coaches }) {
  return (
    <section>
      {!!coaches && coaches.length > 0 ? coaches.map(({
        _id, 
        name, 
        specializations, 
        disciplines, 
        experienceYears, 
        appointmentFee,
        profilePicture,
      }) => {
        return(
          <CoachCard
            key={_id}
            name={name}
            specializations={specializations}
            disciplines={disciplines}
            experienceYears={experienceYears}
            appointmentFee={appointmentFee}
            profilePicture={profilePicture}
          />
        )
      }):
          <p>No se encontraron coaches</p>
      }
    </section>
  );
}
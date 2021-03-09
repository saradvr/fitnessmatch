import { Link } from 'react-router-dom';
import {StyledArticle, StyledH2} from './styles';
export function CoachCard ({ _idUserType, name, specializations, disciplines, experienceYears, appointmentFee, profilePicture, seeProfile}) {
  
  return (
    <StyledArticle>
      <table>
        <thead>
          <tr>
            <td>
              <StyledH2>{name}</StyledH2>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img alt="Foto de perfil" src={profilePicture}/>
            </td>
            <td>
              <h3>Años de experiencia: {experienceYears}</h3>
              <p>Especialidades: {specializations.join(', ')}</p>
              <p>Disciplinas: {disciplines.join(', ')}</p>
              <p>Precio de la cita: ${new Intl.NumberFormat('co-CO', { style: 'currency', currency: 'COP' }).format(appointmentFee)}</p>
              <Link to={`/coach/${_idUserType}`}>
                Ver Perfil
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </StyledArticle>
  );
}
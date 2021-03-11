import { LinkButton } from '../LinkButton';
import LogoPeq from './LogoPeq.png'
import {StyledArticle, StyledTd, StyledH2} from './styles';
export function CoachCard ({ _idUserType, name, specializations, disciplines, experienceYears, appointmentFee, profilePicture, seeProfile}) {
  
  return (
    <StyledArticle>
      <table>
        <tbody>
          <tr>
            <StyledTd rowSpan="5" alignCenter={true}>
              <img alt="Foto de perfil" src={profilePicture} width="100%"/>
            </StyledTd>
            <StyledTd>
              <StyledH2>{name}</StyledH2>
            </StyledTd>
          </tr>
          <tr>
            <StyledTd>
              <strong>Especialidades:</strong> {specializations.join(', ')}
            </StyledTd>
          </tr>
          <tr>
            <StyledTd>
              <strong>Disciplinas:</strong> {disciplines.join(', ')}
            </StyledTd>
          </tr>
          <tr>
            <StyledTd>
              <strong>Años de experiencia:</strong> {experienceYears}
            </StyledTd>
          </tr>
          <tr>
            <StyledTd>
              <strong>Precio de la cita:</strong> ${new Intl.NumberFormat('co-CO', { style: 'currency', currency: 'COP' }).format(appointmentFee)}
            </StyledTd>
          </tr>
          <tr>
            <StyledTd alignCenter={true}>
              <LinkButton to={`/coach/${_idUserType}`} green="true">
                Ver Perfil
              </LinkButton>
            </StyledTd>
            <StyledTd alignRight={true}>
              <img alt="Logo Fitness Match" src={LogoPeq} width="60px"/>
            </StyledTd>
          </tr>
        </tbody>
      </table>
    </StyledArticle>
  );
}
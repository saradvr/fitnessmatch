import { LinkButton } from '../LinkButton';
import LogoPeq from './LogoPeq-negro.png'
import {StyledArticle, StyledTd, StyledH2, StyledImg, StyledTable} from './styles';
export function CoachCard ({ _idUserType, name, specializations, disciplines, experienceYears, appointmentFee, profilePicture}) {
  
  return (
    <StyledArticle>
      <StyledTable>
        <tbody>
          <tr>
            <StyledTd rowSpan="5" alignCenter>
              <StyledImg alt="Foto de perfil" src={profilePicture} width="100%"/>
            </StyledTd>
            <StyledTd>
              <StyledH2>{name.toUpperCase()}</StyledH2>
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
            <StyledTd alignCenter>
              <LinkButton to={`/coach/${_idUserType}`} green="true">
                Ver Perfil
              </LinkButton>
            </StyledTd>
            <StyledTd alignRight>
              <img alt="Logo Fitness Match" src={LogoPeq} width="60px"/>
            </StyledTd>
          </tr>
        </tbody>
      </StyledTable>
    </StyledArticle>
  );
}
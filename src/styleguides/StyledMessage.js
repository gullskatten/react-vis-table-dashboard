import styled, { css } from 'styled-components';


const StyledMessage = styled.span`
    font-size: 1.3rem;
    font-family: 'Bai Jamjuree', sans-serif;
    
    ${props => props.secondary && css`color: ${props => props.theme.secondary}`}
    ${props => props.tertiary && css`color: ${props => props.theme.tertiary}`}
    ${props => props.error && css`color: ${props => props.theme.error}`}
    ${props => props.warn && css`color: ${props => props.theme.warn}`}
    ${props => props.white && css`color: ${props => props.theme.offWhite}`}
    ${props => props.success && css`color: ${props => props.theme.success}`}
    ${props => props.thin && css`font-weight: 300`}
`;

export default StyledMessage;
import styled, { css } from "styled-components";

export const TitleHuge = styled.h1`
    color: ${props => props.theme.primary}
    font-size: 3rem;
    font-family: 'Bai Jamjuree', sans-serif;
    margin: 0;

    span {
        font-size: 2.8rem;
        margin-right: 5px;
    }

    ${props => props.secondary && css`color: ${props => props.theme.secondary}`}
    ${props => props.tertiary && css`color: ${props => props.theme.tertiary}`}
    ${props => props.error && css`color: ${props => props.theme.error}`}
    ${props => props.warn && css`color: ${props => props.theme.warn}`}
    ${props => props.success && css`color: ${props => props.theme.success}`}
    ${props => props.thin && css`font-weight: 300`}
    `;

export const TitleLarge = styled.h2`
    color: ${props => props.theme.primary}
    font-size: 2.5rem;
    font-family: 'Bai Jamjuree', sans-serif;
    margin: 0;
    
    span {
        font-size: 2.3rem;
        margin-right: 5px;
    }

    ${props => props.secondary && css`color: ${props => props.theme.secondary}`}
    ${props => props.tertiary && css`color: ${props => props.theme.tertiary}`}
    ${props => props.error && css`color: ${props => props.theme.error}`}
    ${props => props.warn && css`color: ${props => props.theme.warn}`}
    ${props => props.success && css`color: ${props => props.theme.success}`}
    ${props => props.thin && css`font-weight: 300`}
`;

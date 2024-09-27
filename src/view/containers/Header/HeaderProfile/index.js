import React from 'react';
import { paths } from '../../../../constants';
import stringToColor from '../../../../helpers/common/stringToColor';
import getImageFullUrl from '../../../../helpers/common/getImageFullUrl';
import { StyledAvatar, StyledLink } from './styledComponents';

export default function HeaderProfile({ user }) {
    const bgcolor = stringToColor(user.name);

    return (
        <StyledLink to={paths.profile}>
            <StyledAvatar
                alt={user.name.toUpperCase()}
                src={getImageFullUrl(user.avatar)}
                bgcolor={bgcolor}
            />
        </StyledLink>
    );
}

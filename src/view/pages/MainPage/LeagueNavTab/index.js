import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from '@mui/material';
import LeagueLogo from '../../../components/LeagueLogo';
import { paths } from '../../../../constants';
import { useMediaQuery } from '@mui/material';
import Flickity from 'react-flickity-component'
import { SlideContainer, StyledPaper, StyledTab } from './styledComponents';

export default function LeagueNavTab({ leagues, slug, userToWatch }) {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const isMobile = useMediaQuery('(max-width: 1000px)');

    useEffect(() => {
        if (leagues.length) {
            const index = leagues.map(league => league.slug).indexOf(slug);
            setValue(index);
        }
    }, [leagues, slug]);

    const handleTabClick = (newSlug) => {
        const index = leagues.findIndex(league => league.slug === newSlug);
        setValue(index);

        const url = paths.main + '/' + newSlug;

        navigate(
            userToWatch ?
                url + '?user=' + userToWatch :
                url
        );
    };

    const flickityOptions = {
        wrapAround: true,
        initialIndex: value,
        prevNextButtons: false,
        pageDots: false,
        percentPosition: false,
        selectedAttraction: 0.8,
        friction: 1,
        dragThreshold: 1
    }

    return (
        <StyledPaper square>
            {isMobile ?
                <Flickity
                    options={flickityOptions}
                    disableImagesLoaded={true}
                    reloadOnUpdate
                >
                    {leagues.map((league) => (
                        <SlideContainer key={league.id} onClick={() => handleTabClick(league.slug)}>
                            <LeagueLogo src={league.logo} alt={league.slug} />
                        </SlideContainer>
                    ))}
                </Flickity>
                :
                <Tabs
                    centered
                    value={value}
                    indicatorColor="secondary"
                    aria-label="leagues tab"
                >
                    {leagues.map(league => (
                        <StyledTab
                            onClick={() => handleTabClick(league.slug)}
                            key={league.id}
                            icon={<LeagueLogo src={league.logo} alt={league.slug} />}
                        />
                    ))}
                </Tabs>
            }
        </StyledPaper >
    );
}

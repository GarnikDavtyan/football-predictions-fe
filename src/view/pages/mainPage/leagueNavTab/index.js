import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import LeagueLogo from '../../../components/LeagueLogo';
import { paths } from '../../../../constants';

const StyledPaper = styled(Paper)({
  backgroundColor: 'transparent',
  paddingTop: '10px',
  marginBottom: '10px',
});

const StyledTab = styled(Tab)({
  minWidth: 200,
  backgroundColor: '#fff',
  borderRadius: '10px',
  margin: '10px',
});

export default function LeagueNavTab({ leagues, slug }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (leagues.length) {
      setValue(leagues.map(league => league.slug).indexOf(slug));
    }
  }, [leagues, slug]);

  const handleTabClick = (newSlug) => {
    const index = leagues.findIndex(league => league.slug === newSlug);
    setValue(index);
    navigate(paths.main + '/' + newSlug);
  };
  
  return (
    <StyledPaper square>
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
            label={league.name}
            icon={<LeagueLogo src={league.logo} alt={league.slug} />}
          />
        ))}
      </Tabs>
    </StyledPaper>
  );
}
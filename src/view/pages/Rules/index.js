import React from 'react';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.61)',
    padding: '20px',
    borderRadius: '10px'
});

const Heading = styled('h1')({
    textAlign: 'center'
});

const OlLists = styled('ol')({
    marginLeft: '10px',
});

const UlLists = styled('ul')({
    marginLeft: '20px',
});

const Li = styled('li')({
    marginBottom: '20px',
});

export default function Rules() {
    return (
        <Container>
            <Heading>Rules of the Game</Heading>
            <Heading as={"p"}>Welcome to our Football Score Prediction Challenge! Below are the rules that guide how you earn points and participate in the competition.</Heading>
            <OlLists>
                <Li><strong>Make Your Predictions:</strong>
                <UlLists>
                    <Li>Before each round of matches, you will have the opportunity to predict the scores of each game.</Li>
                </UlLists>
                </Li>
                <Li><strong>Scoring System:</strong>
                <UlLists>
                    <Li><strong>Exact Score Prediction (5 Points):</strong> If you correctly predict the exact score of the match, you will earn 5 points.</Li>
                    <Li><strong>Goal Difference Prediction (3 Points):</strong> If you don't get the exact score but correctly predict the goal difference between the two teams, you will earn 3 points.</Li>
                    <Li><strong>Correct Result Prediction (1 Point):</strong> If you only predict the correct result (win, lose, or draw) but not the exact score or goal difference, you will earn 1 point.</Li>
                </UlLists>
                </Li>
                <Li><strong>Leaderboard:</strong>
                <UlLists>
                    <Li>Points accumulate over the course of the season, and the leaderboard will show the top players based on their total points.</Li>
                    <Li>You can track your progress and see how you rank against other players in both individual rounds, leagues and overall.</Li>
                </UlLists>
                </Li>
                <Li><strong>Deadlines:</strong>
                <UlLists>
                    <Li>Predictions must be submitted before the kickoff of each match. Any predictions made after the match has started will not be counted.</Li>
                </UlLists>
                </Li>
                <Li><strong>Fair Play:</strong>
                <UlLists>
                    <Li>Any attempt to manipulate the system will result in disqualification.</Li>
                </UlLists>
                </Li>
            </OlLists>
            <Heading as="h2">Good Luck!</Heading>
            <p className={Heading}>Remember, it's all about having fun. Good luck with your predictions, and may the best predictor win!</p>
        </Container>
    );
}

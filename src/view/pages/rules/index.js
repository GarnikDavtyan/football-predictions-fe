import { Paper, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    container: {
      maxWidth: '800px',
      margin: 'auto',
      backgroundColor: 'rgba(255, 255, 255, 0.61)',
      padding: '20px',
      borderRadius: '10px'
    },
    heading: {
      textAlign: 'center'
    },

    olul: {
      marginLeft: '10px',
    },
    li: {
      marginBottom: '10px',
    }
  });

export default function Rules(){
    const classes = useStyles();

    return  (
        <div className={classes.container}>
            <h1 className={classes.heading}>Rules of the Game</h1>

            <p className={classes.heading}>Welcome to our Football Score Prediction Challenge! Below are the rules that guide how you earn points and participate in the competition.</p>

            <ol className={classes.olul}>
                <li><strong>Make Your Predictions:</strong>
                <ul className={classes.olul}>
                    <li className={classes.li}>Before each round of matches, you will have the opportunity to predict the scores of each game.</li>
                </ul>
                </li>
                <li><strong>Scoring System:</strong>
                <ul className={classes.olul}>
                    <li className={classes.li}><strong>Exact Score Prediction (5 Points):</strong> If you correctly predict the exact score of the match, you will earn 5 points.</li>
                    <li className={classes.li}><strong>Goal Difference Prediction (3 Points):</strong> If you don't get the exact score but correctly predict the goal difference between the two teams, you will earn 3 points.</li>
                    <li className={classes.li}><strong>Correct Result Prediction (1 Point):</strong> If you only predict the correct result (win, lose, or draw) but not the exact score or goal difference, you will earn 1 point.</li>
                </ul>
                </li>
                <li><strong>Leaderboard:</strong>
                <ul className={classes.olul}>
                    <li className={classes.li}>Points accumulate over the course of the season, and the leaderboard will show the top players based on their total points.</li>
                    <li className={classes.li}>You can track your progress and see how you rank against other players in both individual rounds, leagues and overall.</li>
                </ul>
                </li>
                <li><strong>Deadlines:</strong>
                <ul className={classes.olul}>
                    <li className={classes.li}>Predictions must be submitted before the kickoff of each match. Any predictions made after the match has started will not be counted.</li>
                </ul>
                </li>
                <li><strong>Fair Play:</strong>
                <ul className={classes.olul}>
                    <li className={classes.li}>Any attempt to manipulate the system will result in disqualification.</li>
                </ul>
                </li>
            </ol>

            <h2 className={classes.heading}>Good Luck!</h2>
            <p className={classes.heading}>Remember, it's all about having fun. Good luck with your predictions, and may the best predictor win!</p>
        </div>
    );
}
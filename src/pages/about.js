import React from 'react'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/Button'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ShopIcon from '@mui/icons-material/Shop';
import HorizontalCard from '../components/horizontal_card.js'
import MiniCard from '../components/mini_card.js'
import Box from '@mui/material/Box'
import data from '../constants.js'
import full_body from '../other_images/full_body_placeholder.png'

const jobs = data.jobs
const projects = data.projects
const education = data.education
const games = data.games

class AboutMe extends React.Component {
    render() {
        var timeout = 500
        // horizontal cards for education
        const current_education_cards = []
        for (let school of education) {
            current_education_cards.push((<HorizontalCard labor={school} timeout={timeout} is_job={true} />))
            timeout += 500
        }
        // horizontal cards for current job(s)
        const current_job_cards = []
        const current_jobs = jobs.filter(function (job) {
            return job.currently_working
        })
        for (let job of current_jobs) {
            current_job_cards.push((<HorizontalCard labor={job} timeout={timeout} is_job={true} />))
            timeout += 500
        }
        // horizontal cards for current projects
        const current_project_cards = []
        const current_projects = projects.filter(function (project) {
            return project.currently_maintaining
        })
        for (let project of current_projects) {
            current_project_cards.push((<MiniCard labor={project} timeout={timeout} is_game={false} />))
            timeout += 500
        }
        // row of current games
        const current_game_cards = []
        for (let game of games) {
            current_game_cards.push((<MiniCard labor={game} timeout={timeout} is_game={true} />))
            timeout += 500
        }

        return [(
            <div>
                <div className="mt-20" />
                <Box elevation='0' sx={{ display: { xs: 'none', sm: 'block' }, transition: 'all 0.25s linear' }}>
                    <div className={"m-auto sm:w-full md:w-3/4 lg:w-3/4 xl:w-1/2 grid grid-cols-2"}>
                        <div className="max-h-screen inline-block text-center">
                            <div>
                                <Typography variant="subtitle1" color="text.primary" className='pb-2'>Charles Zawacki</Typography>
                                <IconButton onClick={() => window.open('https://linkedin.com/in/charleszawacki')} color="info" aria-label="LinkedIn" component="span">
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton onClick={() => window.open('https://github.com/cazwacki')} color="info" aria-label="LinkedIn" component="span">
                                    <GitHubIcon />
                                </IconButton>
                                <IconButton onClick={() => window.open('https://itch.io/profile/czawacki')} color="info" aria-label="LinkedIn" component="span">
                                    <SportsEsportsIcon />
                                </IconButton>
                                <IconButton onClick={() => window.open('https://play.google.com/store/apps/developer?id=Charles+Z.')} color="info" aria-label="LinkedIn" component="span">
                                    <ShopIcon />
                                </IconButton>
                            </div>
                            <img id="silhouette" src={full_body} className="h-5/6 m-auto" alt="Charles Zawacki" />
                        </div>
                        <div className="inline-block text-center max-h-3/4">
                            <Typography variant="h5" color="text.primary" className='pb-2'>Education and Current Work</Typography>
                            {current_education_cards}
                            <Divider sx={{ margin: '0.5em' }} />
                            {current_job_cards}
                            <Divider sx={{ margin: '0.5em' }} />
                            <Typography variant="h5" color="text.primary" className='pb-2'>Personal Projects I'm Maintaining</Typography>
                            <div className="grid grid-cols-3 w-full gap-5">
                                {current_project_cards}
                            </div>
                            <Divider sx={{ margin: '0.5em' }} />
                            <Typography variant="h5" color="text.primary" className='pb-2'>Games I'm Playing</Typography>
                            <div className="grid grid-cols-3 w-full gap-5">
                                {current_game_cards}
                            </div>
                            <Divider sx={{ margin: '0.5em' }} />
                        </div>
                    </div>
                </Box >
                <Box elevation='0' sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <div className="inline-block text-center max-h-3/4">
                        <Typography variant="h6" color="text.primary">Education and Current Work</Typography>
                        {current_education_cards}
                        <Divider sx={{ margin: '0.5em' }} />
                        {current_job_cards}
                        <Divider sx={{ margin: '0.5em' }} />
                        <Typography variant="h6" color="text.primary">Personal Projects I'm Maintaining</Typography>
                        <div className="grid grid-cols-3 w-full gap-5">
                            {current_project_cards}
                        </div>
                        <Divider sx={{ margin: '0.5em' }} />
                        <Typography variant="h6" color="text.primary">Games I'm Playing</Typography>
                        <div className="grid grid-cols-3 w-full gap-5">
                            {current_game_cards}
                        </div>
                        <Divider sx={{ margin: '0.5em' }} />
                    </div>
                </Box>
            </div >
        ),
        ]
    }
}

export default AboutMe;
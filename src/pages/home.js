import React from 'react';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import TopVideo from '../other_images/front-video.mp4'
import Fade from 'react-reveal/Fade'
import lifelong_learner_1 from '../other_images/lifelong-learner/book.gif'
import lifelong_learner_2 from '../other_images/lifelong-learner/mortarboard.gif'
import lifelong_learner_3 from '../other_images/lifelong-learner/verified.gif'
import problem_solver_1 from '../other_images/problem-solver/timeline.gif'
import problem_solver_2 from '../other_images/problem-solver/communicate.gif'
import problem_solver_3 from '../other_images/problem-solver/flow-chart.gif'
import creator_1 from '../other_images/creator/music.gif'
import creator_2 from '../other_images/creator/model.gif'
import creator_3 from '../other_images/creator/video.gif'
class Home extends React.Component {


    render() {
        this.myRef = React.createRef();

        return (
            <div>
                <div className="relative">
                    <div className="relative top-0 left-0 h-full w-full object-cover">
                        <video className="h-full w-full" autoPlay muted loop>
                            <source src={TopVideo} type="video/mp4" />
                        </video>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-75 overflow-hidden hidden lg:block text-center">
                        <div ref={this.myRef}>
                            <Slide direction="right" in={true} timeout={1500}>
                                <div>
                                    <Typography variant="h3" color="secondary.main">CHARLES ZAWACKI</Typography>
                                    <Typography variant="h5" color="secondary.dark">⚜️ Engineer ⚜️ Architect ⚜️ Student ⚜️</Typography>
                                </div>
                            </Slide>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-90 overflow-hidden block lg:hidden w-3/4">
                        <div ref={this.myRef}>
                            <Slide direction="right" in={true} timeout={1500}>
                                <div>
                                    <Typography variant="h5" color="secondary.main">CHARLES ZAWACKI</Typography>
                                    <Typography variant="h6" color="secondary.dark">⚜️ Engineer</Typography>
                                    <Typography variant="h6" color="secondary.dark">⚜️ Architect</Typography>
                                    <Typography variant="h6" color="secondary.dark">⚜️ Student</Typography>
                                </div>
                            </Slide>
                        </div>
                    </div>
                </div>
                <div className="pt-20" />
                <div className="grid grid-rows-3 gap-5 text-center w-5/6 m-auto">
                    <Fade bottom>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2">
                            <div className="w-3/4 m-auto">
                                <Typography variant="h4" display="inline" color="text.primary">Life-long Learner</Typography>
                                <Typography className="text-left p-5" color="text.secondary">When I'm not working or in formal education, I love taking on different side projects. Research projects, quality of life projects, streaming services, and automation are a few of many interests in computer science I've pursued. I'm attending Georgia Tech to master parallel computation and distributed computing to learn how to handle huge workloads as effectively as possible.</Typography>
                            </div>
                            <div className="icon-set grid grid-cols-3 w-5/6 md:w-1/2 m-auto hidden md:flex">
                                <img src={lifelong_learner_1} className="m-auto" alt="Studying" />
                                <img src={lifelong_learner_2} className="m-auto" alt="Graduation" />
                                <img src={lifelong_learner_3} className="m-auto" alt="Degree" />
                            </div>
                        </div>
                    </Fade>
                    <Fade bottom>
                        <div>
                            <Divider />
                            <br />
                            <br />
                            <div className="grid sm:grid-cols-1 md:grid-cols-2">
                                <div className="icon-set grid grid-cols-3 w-5/6 md:w-1/2 m-auto hidden md:flex">
                                    <img src={problem_solver_1} className="m-auto" alt="Network" />
                                    <img src={problem_solver_2} className="m-auto" alt="Connect" />
                                    <img src={problem_solver_3} className="m-auto" alt="Process" />
                                </div>
                                <div className="w-3/4 m-auto">
                                    <Typography variant="h4" display="inline" color="text.primary">Problem Solver</Typography>
                                    <Typography className="text-left p-5" color="text.secondary">Problem solving in software is often complex. Balancing business intent, cost-effectiveness, performance, and other requirements can make projects get complicated quickly. I have experience helping make important design decisions in products that are mission critical and generate the majority of business revenue. In my personal time, I make those decisions when hosting content, running servers, and developing self-made products.</Typography>
                                </div>
                            </div>
                        </div>
                    </Fade>
                    <Fade bottom>
                        <div>
                            <Divider />
                            <br />
                            <br />
                            <div className="grid sm:grid-cols-1 md:grid-cols-2">
                                <div className="w-3/4 m-auto">
                                    <Typography variant="h4" display="inline" color="text.primary">Creator</Typography>
                                    <Typography className="text-left p-5" color="text.secondary">Creativity is an essential component of development, especially in today's rapidly moving world of technology. If you can't find an easy solution, why not create it? I've created 3D models to substitute for missing parts, music and videos for personal enjoyment or game design, and software for personal enjoyment and creating new solutions that haven't been considered before, such as my Nintendo Switch remote play project.</Typography>
                                </div>
                                <div className="icon-set grid grid-cols-3 w-5/6 md:w-1/2 m-auto hidden md:flex">
                                    <img src={creator_1} className="m-auto" alt="Music" />
                                    <img src={creator_2} className="m-auto" alt="Model" />
                                    <img src={creator_3} className="m-auto" alt="Video" />
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
                <Fade bottom>
                    <div className="w-full text-center mb-20">
                        <Divider />
                        <br />
                        <br />
                        <Typography variant="h3" color="text.primary">Let's Talk</Typography>
                        <div className="m-auto">
                            <IconButton onClick={() => window.open('https://linkedin.com/in/charleszawacki')} color="info" aria-label="LinkedIn" component="span">
                                <LinkedInIcon />
                            </IconButton>
                            <IconButton onClick={() => window.open('https://github.com/cazwacki')} color="info" aria-label="LinkedIn" component="span">
                                <GitHubIcon />
                            </IconButton>
                        </div>
                        <div className="m-auto">
                            <Typography variant="h6" color="text.primary">cazwacki@gmail.com</Typography>
                        </div>
                    </div>
                    <div className="w-full text-center">
                        <a href="https://www.flaticon.com/free-animated-icons/book">
                            <Typography color="text.disabled">Animated icons created by Freepik - Flaticon</Typography>
                        </a>
                    </div>
                </Fade>
                <div className="mb-10" />
            </div>
        )
    }
}

export default Home
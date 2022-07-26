import React from 'react'

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Day from 'dayjs'
import LaborModal from './labor_modal.js'
import Typography from '@mui/material/Typography';

class Labor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.labor = props.labor
        this.timeout = props.timeout
        this.is_job = props.is_job
    }

    showModal() {
        this.setState({ show: true })
    }

    hideModal() {
        this.setState({ show: false })
    }

    render() {
        let duration = require('dayjs/plugin/duration')
        Day.extend(duration)

        const formatted_info = []
        for (let i in this.labor.info) {
            formatted_info.push(<Typography variant="body1" color="text.secondary" className='pb-2'>{'\u2022 '}{this.labor.info[i]}</Typography>)
        }

        var start_date, end_date, duration_in_months, duration_full_years, duration_remaining_months, formatted_date_range, formatted_duration
        let current = false;
        current = this.is_job ? this.labor.currently_working : this.labor.currently_maintaining

        start_date = Day(this.labor.start_date, "MM/DD/YYYY")
        if (this.is_job) {
            end_date = this.labor.currently_working ? Day() : Day(this.labor.end_date, "MM/DD/YYYY")
        } else {
            end_date = Day(this.labor.last_updated, "MM/DD/YYYY")
        }
        duration_in_months = Math.floor(Day.duration(end_date.diff(start_date)).asMonths())
        duration_full_years = Math.floor(duration_in_months / 12)
        duration_remaining_months = duration_in_months % 12

        formatted_date_range = start_date.format('MMMM YYYY') + ' - ' + (current ? 'Present' : end_date.format('MMMM YYYY'))
        formatted_duration = (duration_full_years > 0 ? duration_full_years + ' yr. ' : '') + duration_remaining_months + ' mo.'

        const formatted_tools_used = [];
        for (let i in this.labor.tools_used) {
            let category = this.labor.tools_used[i]
            const category_title = (
                <div className="text-center">
                    {category.icon}
                    <Typography display="inline">{'\u00A0'}{category.category}</Typography>
                </div>
            )
            const category_data = []
            for (let j in category.tools) {
                category_data.push((
                    <Typography variant="subtitle1">&bull;{'\u00A0'}{category.tools[j]}</Typography>
                ))
            }
            formatted_tools_used.push((
                <div className="inline-block align-top">
                    {category_title}
                    <div className="text-left inline-block">
                        {category_data}
                    </div>
                </div>
            ))
        }

        return (
            // <Grow in={true} timeout={this.timeout}>
            <Card sx={{ transition: 'all 0.25s linear', animation: 'fadein ' + this.timeout + 'ms ease-in' }}>
                <CardActionArea style={{ height: '100%', textAlign: 'left' }} onClick={this.showModal}>
                    <CardMedia
                        component="img"
                        alt={this.labor.company}
                        height="140"
                        image={this.labor.card_image}
                    />
                    <CardContent>
                        <Typography variant="h6" color="text.primary" style={{ transition: 'all 0.25s linear' }}>{this.labor.title}</Typography>
                        <Typography variant="subtitle2" color="text.subtitle" style={{ transition: 'all 0.25s linear' }}>
                            {this.is_job ? this.labor.company + ' \u2022 ' + this.labor.employment_type : 'Created ' + start_date.format("MMMM YYYY")}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2" color="text.subtitle" style={{ transition: 'all 0.25s linear' }}>
                            {this.is_job ? formatted_date_range + ' \u2022 ' + formatted_duration : 'Last Updated ' + Day(this.labor.last_updated, "MM/DD/YYYY").format("MMMM YYYY")}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" style={{ transition: 'all 0.25s linear' }}>{this.labor.one_liner}</Typography>
                    </CardContent>
                </CardActionArea>
                <LaborModal show={this.state.show} handleClose={this.hideModal} is_job={this.is_job} labor={this.labor} formatted_date_range={formatted_date_range} formatted_duration={formatted_duration} formatted_info={formatted_info} />
            </Card>
            // </Grow>
        )
    }
}

export default Labor
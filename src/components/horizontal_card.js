import React from 'react'
import Grow from '@mui/material/Grow';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Day from 'dayjs'
import Typography from '@mui/material/Typography';
import LaborModal from './labor_modal.js'

class HorizontalCard extends React.Component {
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
        start_date = Day(this.labor.start_date, "MM/DD/YYYY")
        end_date = this.labor.currently_working ? Day() : Day(this.labor.end_date, "MM/DD/YYYY")
        duration_in_months = Math.floor(Day.duration(end_date.diff(start_date)).asMonths())
        duration_full_years = Math.floor(duration_in_months / 12)
        duration_remaining_months = duration_in_months % 12

        formatted_date_range = start_date.format('MMMM YYYY') + ' - ' + (this.labor.currently_working ? 'Present' : end_date.format('MMMM YYYY'))
        formatted_duration = (duration_full_years > 0 ? duration_full_years + ' yr. ' : '') + duration_remaining_months + ' mo.'

        var preview_text
        if (!this.is_job) {
            preview_text = (
                <div className="inline col-span-4 text-left">
                    <Typography variant="subtitle1" display="inline" style={{ transition: 'all 0.25s linear' }}>{this.labor.title}  </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ transition: 'all 0.25s linear' }}>{this.labor.company}</Typography>
                    <Typography variant="body2" color="text.secondary" style={{ transition: 'all 0.25s linear' }}>{this.labor.one_liner}</Typography>
                </div>
            )
        } else {
            preview_text = (
                <div className="inline col-span-4 text-left">
                    <Typography variant="subtitle1" style={{ transition: 'all 0.25s linear' }}>{this.labor.title}</Typography>
                    <Typography variant="body2" color="text.secondary" style={{ transition: 'all 0.25s linear' }}>{this.labor.one_liner}</Typography>
                </div>
            )
        }

        return (
            // <Grow in={true} timeout={this.timeout}>
            <Card sx={{ transition: 'all 0.25s linear', animation: 'fadein 0.75s ease-in' }}>
                <CardActionArea style={{ height: '100%', textAlign: 'left' }} onClick={this.showModal}>
                    <CardContent>
                        <div className="m-auto grid grid-cols-5">
                            {preview_text}
                        </div>
                    </CardContent>
                </CardActionArea>
                <LaborModal show={this.state.show} handleClose={this.hideModal} is_job={this.is_job} labor={this.labor} formatted_date_range={formatted_date_range} formatted_duration={formatted_duration} formatted_info={formatted_info} />
            </Card>
            // </Grow>
        )
    }
}

export default HorizontalCard
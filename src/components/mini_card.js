import React from 'react'

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Day from 'dayjs'
import LaborModal from './labor_modal.js'
import Typography from '@mui/material/Typography';

class MiniCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.labor = props.labor
        this.timeout = props.timeout
        this.is_game = props.is_game
    }

    showModal() {
        if (!this.is_game) {
            this.setState({ show: true })
        } else {
            window.open(this.labor.title_link)
        }
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
        const formatted_tools_used = [];
        var modal_optional = null
        if (!this.is_game) {
            start_date = Day(this.labor.start_date, "MM/DD/YYYY")
            end_date = this.labor.currently_working ? Day() : Day(this.labor.end_date, "MM/DD/YYYY")
            duration_in_months = Math.floor(Day.duration(end_date.diff(start_date)).asMonths())
            duration_full_years = Math.floor(duration_in_months / 12)
            duration_remaining_months = duration_in_months % 12

            formatted_date_range = start_date.format('MMMM YYYY') + ' - ' + (this.labor.currently_working ? 'Present' : end_date.format('MMMM YYYY'))
            formatted_duration = (duration_full_years > 0 ? duration_full_years + ' yr. ' : '') + duration_remaining_months + ' mo.'



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

            modal_optional = (<LaborModal show={this.state.show} handleClose={this.hideModal} is_job={false} labor={this.labor} formatted_date_range={formatted_date_range} formatted_duration={formatted_duration} formatted_info={formatted_info} />)
        }

        return (
            //Grow in={true} timeout={this.timeout}>
            <Card sx={{ transition: 'all 0.25s linear', animation: 'fadein 0.75s ease-in' }}>
                <CardActionArea style={{ height: '100%' }} onClick={this.showModal}>
                    <CardMedia
                        component="img"
                        alt={this.labor.title}
                        image={this.labor.card_image}
                    />
                    <CardContent>
                        <Typography variant="body2" style={{ transition: 'all 0.25s linear' }}>
                            {this.labor.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {modal_optional}
            </Card>
            //</Grow>
        )
    }
}

export default MiniCard